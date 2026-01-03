import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { AuthService } from '@/lib/auth-service';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        console.log(`[Login Attempt] Email: ${email}`);

        // 1. Find User
        const user = await prisma.user.findUnique({
            where: { email },
            include: { profile: true }
        });

        if (!user) {
            console.log('[Login Failed] User not found in DB');
            // Helpful debug: List all users?
            // const count = await prisma.user.count();
            // console.log(`Total users in DB: ${count}`);
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 401 });
        }

        // 2. Validate Password
        // Check against the generic passwords we communicated to the user
        // OR check against the stored hash if we had real hashing.
        // For prototype:
        const isValid = (password === 'dayflow123' || password === 'admin123' || password === 'password123');

        // Also check valid hash if we were strict, but we aren't yet.

        if (!isValid) {
            console.log('[Login Failed] Invalid password provided');
            return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
        }

        console.log(`[Login Success] User: ${user.email} (${user.role})`);

        // 3. Create Session Response
        return NextResponse.json({
            success: true,
            user: {
                id: user.profile?.employeeId || 'UNK',
                dbId: user.id,
                email: user.email,
                name: user.profile ? `${user.profile.firstName} ${user.profile.lastName}` : 'User',
                role: user.role,
                department: 'General'
            }
        });

    } catch (error) {
        console.error('[Login API Critical Error]:', error);
        return NextResponse.json({ success: false, error: 'Login failed due to server error' }, { status: 500 });
    }
}
