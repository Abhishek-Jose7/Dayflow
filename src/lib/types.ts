export type Role = 'admin' | 'employee' | 'hr';

export interface User {
    id: string;
    email: string;
    fullName: string;
    role: Role;
    avatarUrl?: string;
}

export interface Employee extends User {
    department: string;
    position: string;
    joinDate: string;
    phone?: string;
    address?: string;
    salary?: number; // Restricted visibility
}

export interface AttendanceRecord {
    id: string;
    employeeId: string;
    date: string;
    checkIn?: string; // ISO time
    checkOut?: string; // ISO time
    status: 'Present' | 'Absent' | 'Half-day' | 'Leave';
}

export interface LeaveRequest {
    id: string;
    employeeId: string;
    type: 'Paid' | 'Sick' | 'Unpaid';
    startDate: string;
    endDate: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    reason?: string;
    createdAt: string;
}

export interface PayrollRecord {
    id: string;
    employeeId: string;
    month: string; // YYYY-MM
    basicSalary: number;
    allowances: number;
    deductions: number;
    netSalary: number;
    status: 'Paid' | 'Processing';
}
