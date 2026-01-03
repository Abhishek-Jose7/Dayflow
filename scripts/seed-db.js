
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const EMPLOYEES = [
    {
        id: '1',
        name: 'Alex Lewis',
        role: 'Senior Engineer',
        dept: 'Engineering',
        email: 'alex@dayflow.com',
        phone: '+1 555-0101',
        joinDate: '2022-03-15',
        location: 'San Francisco, CA'
    },
    {
        id: '2',
        name: 'Sarah Wilson',
        role: 'Product Manager',
        dept: 'Product',
        email: 'sarah@dayflow.com',
        phone: '+1 555-0102',
        joinDate: '2023-01-10',
        location: 'New York, NY'
    },
    {
        id: '3',
        name: 'Emily Davis',
        role: 'Finance Manager',
        dept: 'Finance',
        email: 'emily@dayflow.com',
        phone: '+1 555-0105',
        joinDate: '2020-11-01',
        location: 'New York, NY'
    },
    {
        id: '4',
        name: 'David Kim',
        role: 'QA Engineer',
        dept: 'Engineering',
        email: 'david@dayflow.com',
        phone: '+1 555-0106',
        joinDate: '2023-05-20',
        location: 'San Francisco, CA'
    },
    // Add Admin
    {
        id: '99',
        name: 'Admin User',
        role: 'ADMIN',
        dept: 'Management',
        email: 'admin@dayflow.com',
        phone: '000',
        joinDate: '2020-01-01',
        location: 'HQ'
    }
];

async function main() {
    console.log('Seeding database...');

    for (const emp of EMPLOYEES) {
        const existing = await prisma.user.findUnique({ where: { email: emp.email } });
        if (!existing) {
            let role = 'EMPLOYEE';
            if (emp.role === 'ADMIN') role = 'ADMIN';
            else if (emp.role.includes('Manager')) role = 'EMPLOYEE'; // Default to employee for now, or distinguish

            // Simplified creation
            await prisma.user.create({
                data: {
                    email: emp.email,
                    passwordHash: 'hashed_secret', // Using placeholder
                    role: role,
                    profile: {
                        create: {
                            firstName: emp.name.split(' ')[0],
                            lastName: emp.name.split(' ')[1] || '',
                            employeeId: `EMP-${emp.id.padStart(3, '0')}`,
                            designation: emp.role,
                            joinDate: new Date(emp.joinDate),
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
            console.log(`Created ${emp.name}`);
        } else {
            console.log(`Skipped ${emp.name} (Exists)`);
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
