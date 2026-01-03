import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');
        const month = parseInt(searchParams.get('month') || (new Date().getMonth() + 1).toString());
        const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());

        if (!email) {
            return NextResponse.json({ success: false, error: 'Email required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
            include: { profile: true }
        });

        if (!user || !user.profile) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const attendance = await prisma.attendance.findMany({
            where: {
                employeeId: user.profile.id,
                date: {
                    gte: startDate,
                    lte: endDate
                }
            },
            orderBy: { date: 'desc' }
        });

        // Calculate summary stats
        const daysPresent = attendance.filter((a: any) => a.status === 'PRESENT' || a.status === 'ON-TIME' || a.status === 'LATE').length;

        // Count leaves (this would usually query LeaveRequest, but for now we look at status)
        const leaves = attendance.filter((a: any) => a.status === 'LEAVE' || a.status === 'ABSENT').length;

        // Total working days in month (excluding weekends)
        let totalWorkingDays = 0;
        const tempDate = new Date(startDate);
        while (tempDate <= endDate) {
            const day = tempDate.getDay();
            if (day !== 0 && day !== 6) totalWorkingDays++;
            tempDate.setDate(tempDate.getDate() + 1);
        }

        return NextResponse.json({
            success: true,
            data: {
                history: attendance,
                stats: {
                    daysPresent,
                    leaves,
                    totalWorkingDays
                }
            }
        });

    } catch (error) {
        console.error('Attendance API Error:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}

// Check-in / Check-out logic
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, action } = body; // action: 'CHECK_IN' or 'CHECK_OUT'

        const user = await prisma.user.findUnique({
            where: { email },
            include: { profile: true }
        });

        if (!user || !user.profile) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existing = await prisma.attendance.findFirst({
            where: {
                employeeId: user.profile.id,
                date: today
            }
        });

        if (action === 'CHECK_IN') {
            if (existing) {
                return NextResponse.json({ success: false, error: 'Already checked in today' }, { status: 400 });
            }

            const now = new Date();
            const hour = now.getHours();
            const status = hour < 10 ? 'PRESENT' : 'LATE';

            const record = await prisma.attendance.create({
                data: {
                    employeeId: user.profile.id,
                    date: today,
                    checkIn: now,
                    status: status
                }
            });

            return NextResponse.json({ success: true, data: record });
        } else {
            // CHECK_OUT
            if (!existing || !existing.checkIn) {
                return NextResponse.json({ success: false, error: 'No check-in found for today' }, { status: 400 });
            }

            const now = new Date();
            const workHours = (now.getTime() - existing.checkIn.getTime()) / (1000 * 60 * 60);
            const extraHours = Math.max(0, workHours - 8);

            const record = await prisma.attendance.update({
                where: { id: existing.id },
                data: {
                    checkOut: now,
                    workHours,
                    extraHours
                }
            });

            return NextResponse.json({ success: true, data: record });
        }

    } catch (error) {
        console.error('Check-in Error:', error);
        return NextResponse.json({ success: false, error: 'Operation failed' }, { status: 500 });
    }
}
