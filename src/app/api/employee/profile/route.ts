import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Force dynamic to avoid caching issues
export const dynamic = 'force-dynamic';

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
                profile: {
                    include: { department: true }
                }
            }
        });

        if (!user || !user.profile) {
            return NextResponse.json({ success: false, error: 'Profile not found' }, { status: 404 });
        }

        const p = user.profile;

        // Transform DB data to UI Model
        // We synthesize missing fields (Bank, DOB) deterministically for now
        // since they aren't in the current schema prototype.

        const safeData = {
            id: p.employeeId,
            name: `${p.firstName} ${p.lastName}`,
            role: p.designation,
            dept: p.department.name,
            email: user.email,
            phone: p.phone || 'N/A',
            manager: 'John Doe', // Placeholder as per schema limitation or fetch logic
            location: p.address || 'Remote',
            joinDate: p.joinDate.toISOString().split('T')[0],
            about: `Passionate ${p.designation} at Dayflow.`,
            skills: ['Teamwork', 'Communication'], // Default skills

            // Expanded Private Info
            private: {
                dob: '1990-01-01', // Default
                address: p.address || 'N/A',
                nationality: 'Unknown',
                personalEmail: user.email,
                gender: 'N/A',
                maritalStatus: 'N/A',
                // Generate a consistent "random" bank index based on ID char code
                bankIndex: (p.employeeId.charCodeAt(p.employeeId.length - 1)) % 4
            },

            salary: {
                basic: '50,000',
                hra: '25,000',
                special: '10,000',
                bonus: '5,000',
                pf: '6,000',
                totalMonth: '96,000',
                totalYear: '11,52,000'
            }
        };

        return NextResponse.json({ success: true, data: safeData });

    } catch (error) {
        console.error('Profile API Error:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}
