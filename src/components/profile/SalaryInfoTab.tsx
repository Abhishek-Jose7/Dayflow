'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';

interface SalaryDetails {
    basic: string;
    hra: string;
    special: string;
    bonus: string;
    pf: string;
    totalMonth: string;
    totalYear: string;
}

interface SalaryInfoTabProps {
    isAdmin: boolean;
    salary: SalaryDetails;
}

export function SalaryInfoTab({ isAdmin, salary }: SalaryInfoTabProps) {
    if (!isAdmin) {
        return (
            <Card>
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    <h3>Restricted Access</h3>
                    <p>Detailed salary configuration is visible only to Administrators.</p>
                    <p>Please check your <strong>My Payroll</strong> dashboard for your payslips.</p>
                </div>
            </Card>
        )
    }

    // Admin View
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Wage Overview */}
            <Card title="Wage Overview">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                    <div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Month Wage</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>₹ {salary.totalMonth}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Yearly Wage</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>₹ {salary.totalYear}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Working Days</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>5 Days / Week</div>
                    </div>
                </div>
            </Card>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)', gap: '2rem' }}>
                {/* Salary Components */}
                <Card title="Salary Components">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <SalaryRow label="Basic Salary" value={salary.basic} percent="50.00%" desc="50% of the basic salary" />
                        <SalaryRow label="House Rent Allowance" value={salary.hra} percent="25.00%" desc="HRA provided to employees" />
                        <SalaryRow label="Special Allowance" value={salary.special} percent="15.00%" desc="Fixed amount provided to employee" />
                        <SalaryRow label="Performance Bonus" value={salary.bonus} percent="5.00%" desc="Variable amount paid during payroll" />
                    </div>
                </Card>

                {/* Deductions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <Card title="Provident Fund (PF) Contribution">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                                <span>Employee</span>
                                <span style={{ fontWeight: 600 }}>₹ {salary.pf}</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>12.00%</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                                <span>Employer</span>
                                <span style={{ fontWeight: 600 }}>₹ {salary.pf}</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>12.00%</span>
                            </div>
                        </div>
                    </Card>

                    <Card title="Tax Deductions">
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                            <span>Professional Tax</span>
                            <span style={{ fontWeight: 600 }}>₹ 200.00</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>/ month</span>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function SalaryRow({ label, value, percent, desc }: { label: string, value: string, percent: string, desc: string }) {
    return (
        <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 500 }}>{label}</span>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <span style={{ fontWeight: 600 }}>₹ {value}</span>
                    <span style={{ fontSize: '0.8rem', background: 'var(--bg-app)', padding: '2px 6px', borderRadius: '4px' }}>{percent}</span>
                </div>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{desc}</div>
        </div>
    );
}
