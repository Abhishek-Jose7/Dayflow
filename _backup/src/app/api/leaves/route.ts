import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const leaves = await prisma.leaveRequest.findMany({
            include: {
                employee: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const formatted = leaves.map(req => ({
            id: req.id,
            name: `${req.employee.firstName} ${req.employee.lastName}`,
            type: req.type, // e.g., 'Sick Leave'
            dates: `${new Date(req.startDate).toLocaleDateString()} - ${new Date(req.endDate).toLocaleDateString()}`,
            days: Math.ceil(Math.abs(new Date(req.endDate).getTime() - new Date(req.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1,
            status: req.status.charAt(0).toUpperCase() + req.status.slice(1).toLowerCase(), // PENDING -> Pending
            avatar: req.employee.photoUrl || '#E0E7FF', // Placeholder
            initials: `${req.employee.firstName[0]}${req.employee.lastName[0]}`.toUpperCase(),
            employeeId: req.employee.employeeId
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error('Error fetching leaves:', error);
        return NextResponse.json({ error: 'Failed to fetch leaves' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { employeeId, type, startDate, endDate, reason } = body; // employeeId here refers to the UNIQUE string ID, not db UUID

        // Find the employee profile first
        const employee = await prisma.employeeProfile.findUnique({
            where: { employeeId: employeeId }
        });

        if (!employee) {
            return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
        }

        const newLeave = await prisma.leaveRequest.create({
            data: {
                employeeId: employee.id, // Connect using DB UUID
                type,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                reason,
                status: 'PENDING'
            }
        });

        return NextResponse.json(newLeave, { status: 201 });
    } catch (error) {
        console.error('Error applying for leave:', error);
        return NextResponse.json({ error: 'Failed to apply for leave' }, { status: 500 });
    }
}
