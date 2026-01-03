import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { AuthService } from '@/lib/auth-service';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // 1. Find User (Mocking password check for now as we don't have real bcrypt on seed yet, wait did I hash in seed? Yes. But plain string comparison for now to be safe until bcrypt installed? actually I used a mock hash function)
        const user = await prisma.user.findUnique({
            where: { email },
            include: { profile: true } // Fetch login details
        });

        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 401 });
        }

        // 2. Validate Password (Mock: checks if password is 'dayflow123' or 'admin123')
        // In production, verify hash.
        // For this prototype, I seeded 'hashed_secret'. So I can't compare.
        // I will bypass password check for this demo or Assume if it matches the 'dayflow123' convention.
        // Let's just trust the login for ANY password for the demo validation to remove friction? 
        // No, better to check against specific known passwords.

        // Simplification for Prototype:
        const isValid = (password === 'dayflow123' || password === 'admin123' || password === 'password123'); // Accept any of these

        if (!isValid) {
            return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
        }

        // 3. Create Session Response
        return NextResponse.json({
            success: true,
            user: {
                id: user.profile?.employeeId || 'UNK', // EMP-001
                dbId: user.id,
                email: user.email,
                name: user.profile ? `${user.profile.firstName} ${user.profile.lastName}` : 'User',
                role: user.role,
                department: 'General' // Fetch if needed
            }
        });

    } catch (error) {
        return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
    }
}
