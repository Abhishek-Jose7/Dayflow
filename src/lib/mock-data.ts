export const EMPLOYEES = [
    {
        id: '1',
        name: 'Alex Lewis',
        role: 'Senior Engineer',
        dept: 'Engineering',
        email: 'alex@dayflow.com',
        phone: '+1 555-0101',
        manager: 'John Doe',
        location: 'San Francisco, CA',
        joinDate: '2022-03-15',
        profileColor: '#3B82F6',
        about: 'Experienced software engineer focused on scalability.',
        skills: ['React', 'Node.js', 'AWS', 'System Design'],
        private: {
            dob: '1990-05-15',
            address: '123 Maple Street, Tech City',
            nationality: 'American',
            personalEmail: 'alex.private@gmail.com',
            gender: 'Male',
            maritalStatus: 'Single',
            bankIndex: 0
        },
        salary: {
            basic: '65,000.00',
            hra: '32,500.00',
            special: '15,000.00',
            bonus: '10,000.00',
            pf: '7,800.00',
            totalMonth: '1,30,300',
            totalYear: '15,63,600'
        }
    },
    {
        id: '2',
        name: 'Sarah Wilson',
        role: 'Product Manager',
        dept: 'Product',
        email: 'sarah@dayflow.com',
        phone: '+1 555-0102',
        manager: 'Alex Lewis',
        location: 'New York, NY',
        joinDate: '2023-01-10',
        profileColor: '#10B981',
        about: 'Product visionary with a knack for user-centric design.',
        skills: ['Product Strategy', 'Figma', 'Agile', 'User Research'],
        private: {
            dob: '1992-08-22',
            address: '456 Oak Avenue, NYC',
            nationality: 'American',
            personalEmail: 'sarah.w@gmail.com',
            gender: 'Female',
            maritalStatus: 'Married',
            bankIndex: 1
        },
        salary: {
            basic: '75,000.00',
            hra: '37,500.00',
            special: '20,000.00',
            bonus: '15,000.00',
            pf: '9,000.00',
            totalMonth: '1,56,500',
            totalYear: '18,78,000'
        }
    },
    {
        id: '3',
        name: 'John Doe',
        role: 'HR Manager',
        dept: 'Human Resources',
        email: 'john@dayflow.com',
        phone: '+1 555-0103',
        manager: 'CEO',
        location: 'Chicago, IL',
        joinDate: '2021-06-01',
        profileColor: '#F59E0B',
        about: 'People-first HR leader transforming workplace culture.',
        skills: ['Conflict Resolution', 'Compliance', 'Recruiting'],
        private: {
            dob: '1985-11-30',
            address: '789 Pine Lane, Chicago',
            nationality: 'American',
            personalEmail: 'johndoe85@gmail.com',
            gender: 'Male',
            maritalStatus: 'Married',
            bankIndex: 2
        },
        salary: {
            basic: '60,000.00',
            hra: '30,000.00',
            special: '10,000.00',
            bonus: '8,000.00',
            pf: '7,200.00',
            totalMonth: '1,15,200',
            totalYear: '13,82,400'
        }
    },
    {
        id: '4',
        name: 'Mike Chen',
        role: 'UI/UX Designer',
        dept: 'Design',
        email: 'mike@dayflow.com',
        phone: '+1 555-0104',
        manager: 'Sarah Wilson',
        location: 'Seattle, WA',
        joinDate: '2023-09-15',
        profileColor: '#8B5CF6',
        about: 'Creative designer obsessed with pixel perfection.',
        skills: ['Figma', 'Prototyping', 'HTML/CSS', 'Motion Design'],
        private: {
            dob: '1996-02-14',
            address: '101 Cedar Blvd, Seattle',
            nationality: 'American',
            personalEmail: 'mike.chen@gmail.com',
            gender: 'Male',
            maritalStatus: 'Single',
            bankIndex: 3
        },
        salary: {
            basic: '55,000.00',
            hra: '27,500.00',
            special: '12,000.00',
            bonus: '5,000.00',
            pf: '6,600.00',
            totalMonth: '1,06,100',
            totalYear: '12,73,200'
        }
    },
    {
        id: '5',
        name: 'Emily Davis',
        role: 'Finance Manager',
        dept: 'Finance',
        email: 'emily@dayflow.com',
        phone: '+1 555-0105',
        manager: 'CEO',
        location: 'New York, NY',
        joinDate: '2020-11-01',
        profileColor: '#EC4899',
        about: 'Strategic financial planner with 10+ years in Fintech.',
        skills: ['Financial Modeling', 'Compliance', 'Auditing'],
        private: {
            dob: '1988-04-12',
            address: '50 Wall St, NYC',
            nationality: 'American',
            personalEmail: 'emily.d@gmail.com',
            gender: 'Female',
            maritalStatus: 'Married',
            bankIndex: 0
        },
        salary: {
            basic: '80,000.00',
            hra: '40,000.00',
            special: '25,000.00',
            bonus: '20,000.00',
            pf: '9,600.00',
            totalMonth: '1,74,600',
            totalYear: '20,95,200'
        }
    },
    {
        id: '6',
        name: 'David Kim',
        role: 'QA Engineer',
        dept: 'Engineering',
        email: 'david@dayflow.com',
        phone: '+1 555-0106',
        manager: 'Alex Lewis',
        location: 'San Francisco, CA',
        joinDate: '2023-05-20',
        profileColor: '#EF4444',
        about: 'Detail-oriented QA finding bugs before users do.',
        skills: ['Selenium', 'Jest', 'Cypress', 'Python'],
        private: {
            dob: '1995-09-09',
            address: '777 Market St, SF',
            nationality: 'Korean-American',
            personalEmail: 'david.kim@gmail.com',
            gender: 'Male',
            maritalStatus: 'Single',
            bankIndex: 1
        },
        salary: {
            basic: '50,000.00',
            hra: '25,000.00',
            special: '10,000.00',
            bonus: '5,000.00',
            pf: '6,000.00',
            totalMonth: '96,000',
            totalYear: '11,52,000'
        }
    },
    {
        id: '7',
        name: 'Lisa Patel',
        role: 'Marketing Specialist',
        dept: 'Marketing',
        email: 'lisa@dayflow.com',
        phone: '+1 555-0107',
        manager: 'Sarah Wilson',
        location: 'Remote (Austin)',
        joinDate: '2023-08-01',
        profileColor: '#8B5CF6',
        about: 'Digital marketing wizard specializing in growth hacking.',
        skills: ['SEO', 'Content Strategy', 'Google Analytics'],
        private: {
            dob: '1997-12-05',
            address: '202 Congress Ave, Austin',
            nationality: 'American',
            personalEmail: 'lisa.p@gmail.com',
            gender: 'Female',
            maritalStatus: 'Single',
            bankIndex: 2
        },
        salary: {
            basic: '45,000.00',
            hra: '22,500.00',
            special: '8,000.00',
            bonus: '4,000.00',
            pf: '5,400.00',
            totalMonth: '84,900',
            totalYear: '10,18,800'
        }
    },
    {
        id: '8',
        name: 'Robert Fox',
        role: 'Intern',
        dept: 'Engineering',
        email: 'robert@dayflow.com',
        phone: '+1 555-0108',
        manager: 'Alex Lewis',
        location: 'San Francisco, CA',
        joinDate: '2024-01-10',
        profileColor: '#6B7280',
        about: 'Eager to learn full-stack development.',
        skills: ['JavaScript', 'HTML', 'CSS'],
        private: {
            dob: '2001-03-30',
            address: 'University Dorms',
            nationality: 'American',
            personalEmail: 'rob.fox@university.edu',
            gender: 'Male',
            maritalStatus: 'Single',
            bankIndex: 3
        },
        salary: {
            basic: '20,000.00',
            hra: '0.00',
            special: '5,000.00',
            bonus: '0.00',
            pf: '0.00',
            totalMonth: '25,000',
            totalYear: '3,00,000'
        }
    }
];
