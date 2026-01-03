import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { email, type, startDate, endDate, reason } = await req.json();

        // 1. Get Employee Profile ID
        const user = await prisma.user.findUnique({
            where: { email },
            include: { profile: true }
        });

        if (!user || !user.profile) {
            return NextResponse.json({ success: false, error: 'User profile not found' }, { status: 404 });
        }

        // 2. Create Leave Request
        const leave = await prisma.leaveRequest.create({
            data: {
                employeeId: user.profile.id,
                type,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                reason,
                status: 'PENDING'
            }
        });

        // 3. Notify Admin? (Optional: could create a notification for admin users here)
        // For simplicity, we just return success.

        return NextResponse.json({ success: true, data: leave });

    } catch (error) {
        console.error('Create Leave Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to create leave request' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');
        const role = searchParams.get('role'); // If ADMIN, fetch all PENDING

        if (role === 'ADMIN') {
            const leaves = await prisma.leaveRequest.findMany({
                where: { status: 'PENDING' },
                include: { employee: true },
                orderBy: { createdAt: 'desc' }
            });
            return NextResponse.json({ success: true, data: leaves });
        }

        if (email) {
            const user = await prisma.user.findUnique({
                where: { email },
                include: { profile: true }
            });

            if (!user || !user.profile) return NextResponse.json({ success: false, data: [] });

            const leaves = await prisma.leaveRequest.findMany({
                where: { employeeId: user.profile.id },
                orderBy: { createdAt: 'desc' }
            });
            return NextResponse.json({ success: true, data: leaves });
        }

        return NextResponse.json({ success: false, error: 'Email or Role required' }, { status: 400 });

    } catch (error) {
        console.error('Fetch Leaves Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch leaves' }, { status: 500 });
    }
}
