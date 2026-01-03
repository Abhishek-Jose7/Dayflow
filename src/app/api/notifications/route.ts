import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ success: false, error: 'Email required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                notifications: {
                    orderBy: { createdAt: 'desc' },
                    take: 10
                }
            }
        });

        if (!user) return NextResponse.json({ success: false, data: [] });

        return NextResponse.json({ success: true, data: user.notifications });

    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch notifications' }, { status: 500 });
    }
}
