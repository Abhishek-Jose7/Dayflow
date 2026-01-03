import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        let config = await prisma.salaryConfig.findUnique({
            where: { employeeProfileId: id }
        });

        // Initialize with defaults if not exists
        if (!config) {
            config = await prisma.salaryConfig.create({
                data: {
                    employeeProfileId: id,
                    monthlyWage: 0
                }
            });
        }

        return NextResponse.json({ success: true, data: config });

    } catch (error) {
        console.error('Fetch Salary Config Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch salary config' }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const body = await req.json();

        const updated = await prisma.salaryConfig.upsert({
            where: { employeeProfileId: id },
            update: {
                monthlyWage: parseFloat(body.monthlyWage),
                basicRate: parseFloat(body.basicRate),
                hraRate: parseFloat(body.hraRate),
                standardAllowance: parseFloat(body.standardAllowance),
                performanceBonusRate: parseFloat(body.performanceBonusRate),
                ltaRate: parseFloat(body.ltaRate),
                pfRate: parseFloat(body.pfRate),
                professionalTax: parseFloat(body.professionalTax)
            },
            create: {
                employeeProfileId: id,
                monthlyWage: parseFloat(body.monthlyWage),
                basicRate: parseFloat(body.basicRate),
                hraRate: parseFloat(body.hraRate),
                standardAllowance: parseFloat(body.standardAllowance),
                performanceBonusRate: parseFloat(body.performanceBonusRate),
                ltaRate: parseFloat(body.ltaRate),
                pfRate: parseFloat(body.pfRate),
                professionalTax: parseFloat(body.professionalTax)
            }
        });

        return NextResponse.json({ success: true, data: updated });

    } catch (error) {
        console.error('Update Salary Config Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to update salary config' }, { status: 500 });
    }
}
