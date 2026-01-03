'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Calendar,
    FileText,
    Settings,
    LogOut,
    DollarSign,
    Clock,
    UserCircle
} from 'lucide-react';

export function Sidebar() {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith('/dashboard/admin');

    const adminLinks = [
        { name: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
        { name: 'Directory', href: '/dashboard/admin/directory', icon: Users },
        { name: 'Attendance', href: '/dashboard/admin/attendance', icon: Clock },
        { name: 'Leave Requests', href: '/dashboard/admin/leaves', icon: Calendar },
        { name: 'Payroll', href: '/dashboard/admin/payroll', icon: DollarSign },
        { name: 'Reports', href: '/dashboard/admin/reports', icon: FileText },
    ];

    const employeeLinks = [
        { name: 'Dashboard', href: '/dashboard/employee', icon: LayoutDashboard },
        { name: 'My Attendance', href: '/dashboard/employee/attendance', icon: Clock },
        { name: 'Leave & Time-off', href: '/dashboard/employee/leaves', icon: Calendar },
        { name: 'Payroll', href: '/dashboard/employee/payroll', icon: DollarSign },
        { name: 'My Profile', href: '/dashboard/employee/profile', icon: UserCircle },
    ];

    const links = isAdmin ? adminLinks : employeeLinks;

    return (
        <div style={{
            width: 'var(--sidebar-width)',
            height: '100vh',
            background: 'var(--bg-sidebar)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            left: 0,
            top: 0
        }}>
            {/* Brand */}
            <div style={{ padding: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--primary)' }} />
                    Dayflow.
                </h2>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginLeft: '20px' }}>
                    {isAdmin ? 'Admin Portal' : 'Employee Portal'}
                </span>
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, padding: '2rem 1rem' }}>
                <ul style={{ listStyle: 'none' }}>
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;

                        return (
                            <li key={link.href} style={{ marginBottom: '0.5rem' }}>
                                <Link
                                    href={link.href}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '0.75rem 1rem',
                                        borderRadius: 'var(--radius-md)',
                                        color: isActive ? 'white' : 'rgba(255,255,255,0.6)',
                                        background: isActive ? 'var(--primary)' : 'transparent',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <Icon size={18} />
                                    <span style={{ fontSize: '0.95rem' }}>{link.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <Link
                    href="/login"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: '0.9rem',
                        padding: '0.5rem',
                        cursor: 'pointer'
                    }}
                >
                    <LogOut size={16} />
                    Logout
                </Link>
            </div>
        </div>
    );
}
