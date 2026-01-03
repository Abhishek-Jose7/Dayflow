import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const dateStr = searchParams.get('date') || new Date().toISOString().split('T')[0];
        const search = searchParams.get('search') || '';

        const filterDate = new Date(dateStr);
        filterDate.setHours(0, 0, 0, 0);

        const attendance = await prisma.attendance.findMany({
            where: {
                date: filterDate,
                employee: {
                    OR: [
                        { firstName: { contains: search } },
                        { lastName: { contains: search } },
                        { employeeId: { contains: search } }
                    ]
                }
            },
            include: {
                employee: true
            },
            orderBy: {
                employee: {
                    firstName: 'asc'
                }
            }
        });

        // Transform for UI
        const data = attendance.map((a: any) => ({
            id: a.id,
            employeeId: a.employee.employeeId,
            name: `${a.employee.firstName} ${a.employee.lastName}`,
            checkIn: a.checkIn ? a.checkIn.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-',
            checkOut: a.checkOut ? a.checkOut.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-',
            workHours: a.workHours ? a.workHours.toFixed(2) : '0.00',
            extraHours: a.extraHours ? a.extraHours.toFixed(2) : '0.00',
            status: a.status
        }));

        return NextResponse.json({ success: true, data });

    } catch (error) {
        console.error('Admin Attendance API Error:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}
