'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';

interface SalaryInfoTabProps {
    isAdmin: boolean;
}

export function SalaryInfoTab({ isAdmin }: SalaryInfoTabProps) {
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
                        <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>₹ 50,000</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Yearly Wage</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>₹ 600,000</div>
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
                        <SalaryRow label="Basic Salary" value="25,000.00" percent="50.00%" desc="50% of the basic salary" />
                        <SalaryRow label="House Rent Allowance" value="12,500.00" percent="25.00%" desc="HRA provided to employees" />
                        <SalaryRow label="Standard Allowance" value="4,167.00" percent="8.33%" desc="Fixed amount provided to employee" />
                        <SalaryRow label="Performance Bonus" value="2,082.50" percent="4.16%" desc="Variable amount paid during payroll" />
                        <SalaryRow label="Leave Travel Allowance" value="2,082.50" percent="4.16%" desc="Covers travel expenses" />
                        <SalaryRow label="Fixed Allowance" value="2,918.00" percent="5.85%" desc="Balancing figure" />
                    </div>
                </Card>

                {/* Deductions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <Card title="Provident Fund (PF) Contribution">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                                <span>Employee</span>
                                <span style={{ fontWeight: 600 }}>₹ 3,000.00</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>12.00%</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                                <span>Employer</span>
                                <span style={{ fontWeight: 600 }}>₹ 3,000.00</span>
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
