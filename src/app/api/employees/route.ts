import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const employees = await prisma.user.findMany({
            where: {
                role: 'EMPLOYEE', // Or filter as needed
            },
            include: {
                profile: {
                    include: {
                        department: true
                    }
                }
            }
        });

        const formatted = employees.map(u => ({
            id: u.profile?.employeeId || u.id,
            name: u.profile ? `${u.profile.firstName} ${u.profile.lastName}` : u.email,
            role: u.profile?.designation || 'N/A',
            dept: u.profile?.department?.name || 'N/A',
            email: u.email,
            phone: u.profile?.phone || 'N/A',
            profileColor: '#3B82F6' // Default or derive from somewhere
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error('Error fetching employees:', error);
        return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, phone, role, department, startDate, salary } = body;

        // 1. Generate ID Logic
        // Format: [DF][First2][Last2][Year][Serial]
        // Example: DFJODO20260001

        const companyPrefix = 'DF'; // Dayflow
        const namePart = ((firstName?.substring(0, 2) || 'XX') + (lastName?.substring(0, 2) || 'XX')).toUpperCase();
        const joinYear = new Date(startDate).getFullYear();

        // Get serial number for this year
        const startOfYear = new Date(`${joinYear}-01-01`);
        const endOfYear = new Date(`${joinYear}-12-31`);

        const count = await prisma.employeeProfile.count({
            where: {
                joinDate: {
                    gte: startOfYear,
                    lte: endOfYear
                }
            }
        });

        const serial = (count + 1).toString().padStart(4, '0');
        const generatedEmployeeId = `${companyPrefix}${namePart}${joinYear}${serial}`;

        // 2. Generate Random Password
        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-2).toUpperCase();

        // 3. Create User in Transaction
        const newUser = await prisma.user.create({
            data: {
                email,
                passwordHash: generatedPassword, // Storing plain text for demo/initial view, normally hash this!
                role: 'EMPLOYEE',
                profile: {
                    create: {
                        firstName,
                        lastName,
                        phone,
                        designation: role,
                        joinDate: new Date(startDate),
                        employeeId: generatedEmployeeId,
                        department: {
                            connectOrCreate: {
                                where: { name: department },
                                create: { name: department }
                            }
                        }
                    }
                }
            }
        });

        console.log(`Created Employee: ${generatedEmployeeId} with Password: ${generatedPassword}`);

        // TODO: Handle salary creation if there was a Salary model linked

        return NextResponse.json({
            message: 'Employee created successfully',
            userId: newUser.id,
            employeeId: generatedEmployeeId,
            tempPassword: generatedPassword
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating employee:', error);
        return NextResponse.json({ error: 'Failed to create employee', details: String(error) }, { status: 500 });
    }
}
