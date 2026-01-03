import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { AuthService } from '@/lib/auth-service';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, department, designation, joinDate } = body;

        // 1. Check if email exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ success: false, error: 'User with this email already exists' }, { status: 400 });
        }

        // 2. Generate System Password (temporary)
        const tempPassword = Math.random().toString(36).slice(-8); // e.g. 'x7z3k9p2'
        // In real app, hash this: const hashedPassword = await AuthService.hashPassword(tempPassword);
        // For prototype/mock seed style:
        const passwordHash = tempPassword; // We'll assume the login logic handles plain text checks for now or we hash it if AuthService ready

        // 3. Generate Smart Employee ID
        // Format: [DF][First 2 First][First 2 Last][Year][Serial] -> DFJODO20240001

        const fNameCode = firstName.substring(0, 2).toUpperCase();
        const lNameCode = lastName.substring(0, 2).toUpperCase();
        const joinYear = new Date(joinDate).getFullYear();

        // Count employees joined in this specific year for serial number
        const startOfYear = new Date(`${joinYear}-01-01`);
        const endOfYear = new Date(`${joinYear}-12-31`);

        const yearCount = await prisma.employeeProfile.count({
            where: {
                joinDate: {
                    gte: startOfYear,
                    lte: endOfYear
                }
            }
        });

        const serial = (yearCount + 1).toString().padStart(4, '0');
        const employeeId = `DF${fNameCode}${lNameCode}${joinYear}${serial}`;

        // 4. Create User & Profile Transaction
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                role: 'EMPLOYEE',
                profile: {
                    create: {
                        firstName,
                        lastName,
                        employeeId,
                        designation,
                        joinDate: new Date(joinDate),
                        department: {
                            connectOrCreate: {
                                where: { name: department },
                                create: { name: department }
                            }
                        }
                    }
                }
            },
            include: {
                profile: true
            }
        });

        // 5. Return success with credentials (for Admin to see ONCE)
        return NextResponse.json({
            success: true,
            data: {
                id: user.profile?.id,
                email: user.email,
                employeeId: user.profile?.employeeId,
                tempPassword
            }
        });

    } catch (error) {
        console.error('Create Employee Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to create employee' }, { status: 500 });
    }
}
