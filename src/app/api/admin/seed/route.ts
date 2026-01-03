import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { AuthService } from '@/lib/auth-service';
import { EMPLOYEES } from '@/lib/mock-data';

export async function GET() {
    try {
        // 1. Clear existing non-admin users to avoid duplicates (optional, but cleaner for dev)
        // For safety, let's just create if not exists.

        const results = [];

        for (const emp of EMPLOYEES) {
            const email = emp.email;
            const existing = await prisma.user.findUnique({ where: { email } });

            if (!existing) {
                const hashedPassword = await AuthService.hashPassword('dayflow123'); // Default password

                // Map Role
                let role = 'EMPLOYEE';
                if (emp.role.includes('HR')) role = 'HR';
                if (emp.role.includes('VP') || emp.role.includes('Head')) role = 'ADMIN';
                // For testing, let's keep logic simple or rely on manual override
                // Actually, let's make Sarah Wilson (Product Manager) and John Doe (HR) ADMINs for testing?
                // Or just follow: "HR Manager" -> HR.

                // Create User & Profile
                await prisma.user.create({
                    data: {
                        email,
                        passwordHash: hashedPassword,
                        role: role,
                        profile: {
                            create: {
                                firstName: emp.name.split(' ')[0],
                                lastName: emp.name.split(' ')[1] || '',
                                employeeId: `EMP-${emp.id.padStart(3, '0')}`,
                                designation: emp.role,
                                joinDate: new Date(emp.joinDate),
                                phone: emp.phone,
                                address: emp.location,
                                department: {
                                    connectOrCreate: {
                                        where: { name: emp.dept },
                                        create: { name: emp.dept }
                                    }
                                }
                            }
                        }
                    }
                });
                results.push(`Created ${emp.name}`);
            } else {
                results.push(`Skipped ${emp.name} (Exists)`);
            }
        }

        // Ensure Default Admin exists
        const adminEmail = 'admin@dayflow.com';
        const adminExists = await prisma.user.findUnique({ where: { email: adminEmail } });
        if (!adminExists) {
            const hash = await AuthService.hashPassword('admin123');
            await prisma.user.create({
                data: {
                    email: adminEmail,
                    passwordHash: hash,
                    role: 'ADMIN',
                    profile: {
                        create: {
                            firstName: 'System',
                            lastName: 'Admin',
                            employeeId: 'ADM-001',
                            designation: 'Super Admin',
                            joinDate: new Date(),
                            department: {
                                connectOrCreate: { where: { name: 'Management' }, create: { name: 'Management' } }
                            }
                        }
                    }
                }
            })
            results.push('Created Super Admin');
        }

        return NextResponse.json({ success: true, logs: results });
    } catch (error) {
        console.error('Seeding Error:', error);
        return NextResponse.json({ success: false, error: 'Seeding failed' }, { status: 500 });
    }
}
