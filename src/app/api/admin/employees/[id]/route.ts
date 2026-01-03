import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const p = await prisma.employeeProfile.findUnique({
            where: { id },
            include: {
                user: true,
                department: true,
                salaryConfig: true
            }
        });

        if (!p) {
            return NextResponse.json({ success: false, error: 'Employee not found' }, { status: 404 });
        }

        // Transformer logic (same as /api/employee/profile for consistency)
        const config = p.salaryConfig || {
            monthlyWage: 0,
            basicRate: 0.5,
            hraRate: 0.5,
            standardAllowance: 4167,
            performanceBonusRate: 0.0833,
            ltaRate: 0.0833,
            pfRate: 0.12,
            professionalTax: 200
        };

        const wage = config.monthlyWage;
        const basic = wage * config.basicRate;
        const hra = basic * config.hraRate;
        const standard = config.standardAllowance;
        const bonus = wage * config.performanceBonusRate;
        const lta = wage * config.ltaRate;
        const fixed = Math.max(0, wage - (basic + hra + standard + bonus + lta));

        const pf = basic * config.pfRate;
        const totalMonth = wage;
        const totalYear = wage * 12;

        const safeData = {
            id: p.id,
            employeeId: p.employeeId,
            name: `${p.firstName} ${p.lastName}`,
            role: p.designation,
            dept: p.department.name,
            email: p.user.email,
            phone: p.phone || '',
            manager: '-',
            location: p.address || '',
            joinDate: p.joinDate.toISOString().split('T')[0],
            about: p.about || '',
            skills: p.skills ? p.skills.split(',') : [],
            private: {
                dob: '',
                address: p.address || '',
                nationality: '',
                personalEmail: '',
                gender: '',
                maritalStatus: '',
                bankIndex: 0
            },
            salary: {
                basic: basic.toLocaleString(),
                hra: hra.toLocaleString(),
                special: standard.toLocaleString(),
                fixedAllowance: fixed.toLocaleString(),
                bonus: bonus.toLocaleString(),
                lta: lta.toLocaleString(),
                pf: pf.toLocaleString(),
                profTax: config.professionalTax.toLocaleString(),
                totalMonth: totalMonth.toLocaleString(),
                totalYear: totalYear.toLocaleString(),
                config: config
            }
        };

        return NextResponse.json({ success: true, data: safeData });

    } catch (error) {
        console.error('Fetch Employee Error:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const body = await req.json();

        // This endpoint is for ADMIN use to update core employment details
        // Body can contain: designation, department, manager, phone, address, etc.

        // Note: 'id' here from params is likely the 'employeeProfile.id' because that's what the URL uses (directory/[id])
        // Let's verify valid fields to update

        const updateData: any = {};
        if (body.designation) updateData.designation = body.designation;
        if (body.phone) updateData.phone = body.phone;
        if (body.department) {
            // Logic to connect/create department if needed, or just update the name if that's how we store it?
            // Schema has Department relation.
            // For prototype simplicity, assuming passed department is a name we connect to.
            updateData.department = {
                connectOrCreate: {
                    where: { name: body.department },
                    create: { name: body.department }
                }
            };
        }

        // Find the profile first to ensure existence
        const existing = await prisma.employeeProfile.findUnique({ where: { id } });
        if (!existing) {
            return NextResponse.json({ success: false, error: 'Employee not found' }, { status: 404 });
        }

        const updated = await prisma.employeeProfile.update({
            where: { id },
            data: updateData,
            include: { department: true }
        });

        return NextResponse.json({ success: true, data: updated });

    } catch (error) {
        console.error('Update Employee Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to update employee' }, { status: 500 });
    }
}
