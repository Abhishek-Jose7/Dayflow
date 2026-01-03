
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DEPARTMENTS = [
    'Engineering',
    'Product',
    'Design',
    'Human Resources',
    'Sales',
    'Marketing',
    'Finance',
    'Management'
];

const EMPLOYEES = [
    { id: '1', fname: 'Alex', lname: 'Lewis', role: 'Senior Engineer', dept: 'Engineering', email: 'alex@dayflow.com', phone: '+1 555-0101', joinDate: '2022-03-15', wage: 120000 },
    { id: '2', fname: 'Sarah', lname: 'Wilson', role: 'Product Manager', dept: 'Product', email: 'sarah@dayflow.com', phone: '+1 555-0102', joinDate: '2023-01-10', wage: 135000 },
    { id: '3', fname: 'Emily', lname: 'Davis', role: 'Finance Head', dept: 'Finance', email: 'emily@dayflow.com', phone: '+1 555-0105', joinDate: '2020-11-01', wage: 150000 },
    { id: '4', fname: 'David', lname: 'Kim', role: 'QA Lead', dept: 'Engineering', email: 'david@dayflow.com', phone: '+1 555-0106', joinDate: '2023-05-20', wage: 95000 },
    { id: '5', fname: 'Michael', lname: 'Chen', role: 'UX Designer', dept: 'Design', email: 'michael@dayflow.com', phone: '+1 555-0201', joinDate: '2022-08-12', wage: 105000 },
    { id: '6', fname: 'Jessica', lname: 'Taylor', role: 'HR Specialist', dept: 'Human Resources', email: 'jessica@dayflow.com', phone: '+1 555-0202', joinDate: '2021-06-30', wage: 85000 },
    { id: '7', fname: 'Ryan', lname: 'Garcia', role: 'Sales Lead', dept: 'Sales', email: 'ryan@dayflow.com', phone: '+1 555-0301', joinDate: '2022-12-05', wage: 110000 },
    { id: '8', fname: 'Amanda', lname: 'Muller', role: 'Marketing Director', dept: 'Marketing', email: 'amanda@dayflow.com', phone: '+1 555-0401', joinDate: '2021-02-14', wage: 140000 },
    { id: '9', fname: 'Kevin', lname: 'Lee', role: 'Frontend Developer', dept: 'Engineering', email: 'kevin@dayflow.com', phone: '+1 555-0501', joinDate: '2023-09-01', wage: 90000 },
    { id: '10', fname: 'Laura', lname: 'Smith', role: 'Content Strategist', dept: 'Marketing', email: 'laura@dayflow.com', phone: '+1 555-0601', joinDate: '2023-03-22', wage: 80000 },
    { id: '11', fname: 'Daniel', lname: 'Brown', role: 'System Admin', dept: 'Engineering', email: 'daniel@dayflow.com', phone: '+1 555-0701', joinDate: '2022-01-15', wage: 100000 },
    { id: '12', fname: 'Michelle', lname: 'Lee', role: 'Product Analyst', dept: 'Product', email: 'michelle@dayflow.com', phone: '+1 555-0801', joinDate: '2023-07-10', wage: 92000 },
];

async function main() {
    console.log('Seeding rich dummy data...');

    // Clear existing data (optional, but good for a fresh start)
    // await prisma.attendance.deleteMany();
    // await prisma.salaryConfig.deleteMany();
    // await prisma.employeeProfile.deleteMany();
    // await prisma.user.deleteMany();
    // await prisma.department.deleteMany();

    // 1. Create Departments
    for (const dept of DEPARTMENTS) {
        await prisma.department.upsert({
            where: { name: dept },
            update: {},
            create: { name: dept }
        });
    }

    // 2. Create Admin
    await prisma.user.upsert({
        where: { email: 'admin@dayflow.com' },
        update: {},
        create: {
            email: 'admin@dayflow.com',
            passwordHash: 'admin123',
            role: 'ADMIN',
            profile: {
                create: {
                    firstName: 'System',
                    lastName: 'Administrator',
                    employeeId: 'EMP-000',
                    designation: 'CTO',
                    joinDate: new Date('2020-01-01'),
                    department: { connect: { name: 'Management' } }
                }
            }
        }
    });

    // 3. Create Employees, Salaries, and Attendance History
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 30);

    for (const emp of EMPLOYEES) {
        const user = await prisma.user.upsert({
            where: { email: emp.email },
            update: {},
            create: {
                email: emp.email,
                passwordHash: 'password',
                role: 'EMPLOYEE',
                profile: {
                    create: {
                        firstName: emp.fname,
                        lastName: emp.lname,
                        employeeId: `EMP-${emp.id.padStart(3, '0')}`,
                        designation: emp.role,
                        phone: emp.phone,
                        joinDate: new Date(emp.joinDate),
                        department: { connect: { name: emp.dept } },
                        salaryConfig: {
                            create: {
                                monthlyWage: Math.round(emp.wage / 12),
                                basicRate: 0.5,
                                hraRate: 0.5,
                            }
                        }
                    }
                }
            },
            include: { profile: true }
        });

        // Generate Attendance for the last 30 days
        const profileId = user.profile.id;
        const historyCount = await prisma.attendance.count({ where: { employeeId: profileId } });

        if (historyCount < 5) {
            console.log(`Generating attendance history for ${emp.fname}...`);
            const records = [];
            for (let i = 0; i < 30; i++) {
                const date = new Date(startDate);
                date.setDate(date.getDate() + i);

                // Skip weekends
                if (date.getDay() === 0 || date.getDay() === 6) continue;

                // Randomly skip some days for "unpaid leave" demo (5% chance)
                if (Math.random() < 0.05) continue;

                const checkIn = new Date(date);
                checkIn.setHours(9, Math.floor(Math.random() * 30), 0); // 9:00 to 9:30 AM

                const checkOut = new Date(date);
                checkOut.setHours(18, Math.floor(Math.random() * 30), 0); // 6:00 to 6:30 PM

                const workHours = (checkOut - checkIn) / (1000 * 60 * 60);
                const extraHours = Math.max(0, workHours - 8);
                const status = checkIn.getHours() === 9 && checkIn.getMinutes() < 15 ? 'PRESENT' : 'LATE';

                records.push({
                    employeeId: profileId,
                    date: new Date(date.setHours(0, 0, 0, 0)),
                    checkIn,
                    checkOut,
                    workHours,
                    extraHours,
                    status
                });
            }
            for (const record of records) {
                await prisma.attendance.create({ data: record });
            }
            console.log(`Generated ${records.length} records for ${emp.fname}`);

            // 4. Add some dummy leave requests
            if (Math.random() < 0.3) {
                await prisma.leaveRequest.create({
                    data: {
                        employeeId: profileId,
                        type: 'PAID',
                        startDate: new Date(2026, 0, 15),
                        endDate: new Date(2026, 0, 17),
                        reason: 'Family function',
                        status: 'PENDING'
                    }
                });
            }
        }
    }

    console.log('Seeding complete! Admin: admin@dayflow.com / admin123');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
