import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { AuthService } from '@/lib/auth-service';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { empId, email, password, role } = body;

        // 1. Password Security
        const hashedPassword = await AuthService.hashPassword(password);

        // 2. Database Insertion (Transactional)
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash: hashedPassword,
                role: role.toUpperCase(), // 'ADMIN' | 'EMPLOYEE' | 'HR'
                profile: {
                    create: {
                        employeeId: empId,
                        firstName: 'New', // Placeholder, would come from form
                        lastName: 'User',
                        designation: role,
                        joinDate: new Date(),
                        department: {
                            connectOrCreate: {
                                where: { name: 'General' },
                                create: { name: 'General' }
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json({ success: true, userId: user.id });
    } catch (error) {
        console.error('Registration Error:', error);
        return NextResponse.json(
            { success: false, error: 'User registration failed. Email might be duplicate.' },
            { status: 400 }
        );
    }
}
