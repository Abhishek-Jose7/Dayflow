import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const body = await req.json();
        const { status } = body; // 'APPROVED' | 'REJECTED'

        const updatedLeave = await prisma.leaveRequest.update({
            where: { id },
            data: {
                status: status.toUpperCase()
            }
        });

        return NextResponse.json(updatedLeave);
    } catch (error) {
        console.error('Error updating leave status:', error);
        return NextResponse.json({ error: 'Failed to update leave' }, { status: 500 });
    }
}
