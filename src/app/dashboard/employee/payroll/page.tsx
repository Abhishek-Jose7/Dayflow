'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download, TrendingUp } from 'lucide-react';

export default function EmployeePayroll() {
    return (
        <div>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>My Payroll</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div>
                    <Card title="Current Salary Structure">
                        <div style={{ marginBottom: '1.5rem', fontSize: '2rem', fontWeight: 600 }}>
                            $10,000 <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/ month</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-light)' }}>
                                <span>Basic Salary</span>
                                <span style={{ fontWeight: 500 }}>$6,000</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-light)' }}>
                                <span>HRA</span>
                                <span style={{ fontWeight: 500 }}>$2,500</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-light)' }}>
                                <span>Special Allowance</span>
                                <span style={{ fontWeight: 500 }}>$1,500</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', color: 'var(--success)' }}>
                                <span style={{ fontWeight: 600 }}>Total Gross</span>
                                <span style={{ fontWeight: 600 }}>$10,000</span>
                            </div>
                        </div>
                    </Card>

                    <div style={{ height: '2rem' }} />

                    <Card title="Payslips History">
                        {[
                            { month: 'December 2025', date: 'Dec 31, 2025', amount: '$9,200', status: 'Paid' },
                            { month: 'November 2025', date: 'Nov 30, 2025', amount: '$9,200', status: 'Paid' },
                            { month: 'October 2025', date: 'Oct 31, 2025', amount: '$9,200', status: 'Paid' },
                        ].map((slip, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                                <div>
                                    <div style={{ fontWeight: 500 }}>{slip.month}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Paid on {slip.date}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <span style={{ fontWeight: 600 }}>{slip.amount}</span>
                                    <Button variant="outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', display: 'flex', gap: '0.25rem' }}>
                                        <Download size={14} /> PDF
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </Card>
                </div>

                <div>
                    <Card title="Tax Projection">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ padding: '0.75rem', background: 'var(--primary-light)', borderRadius: 'var(--radius-md)', color: 'var(--primary)' }}>
                                    <TrendingUp size={24} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Projected Tax</div>
                                    <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>$12,400</div>
                                </div>
                            </div>
                            <Button fullWidth variant="outline">View Tax Sheet</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
