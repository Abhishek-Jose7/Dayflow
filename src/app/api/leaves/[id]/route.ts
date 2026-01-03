import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { status, remarks, adminEmail } = await req.json(); // status: APPROVED | REJECTED

        // 1. Update Leave Status
        const leave = await prisma.leaveRequest.update({
            where: { id },
            data: {
                status,
                rejectionReason: remarks,
                approvedBy: adminEmail || 'Admin'
            },
            include: { employee: { include: { user: true } } }
        });

        // 2. Create Notification for Employee
        await prisma.notification.create({
            data: {
                userId: leave.employee.userId,
                title: `Leave Request ${status}`,
                message: `Your leave request from ${new Date(leave.startDate).toLocaleDateString()} to ${new Date(leave.endDate).toLocaleDateString()} has been ${status}. ${remarks ? `Remarks: ${remarks}` : ''}`,
                type: status === 'APPROVED' ? 'SUCCESS' : 'ERROR'
            }
        });

        return NextResponse.json({ success: true, data: leave });

    } catch (error) {
        console.error('Update Leave Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to update leave request' }, { status: 500 });
    }
}
