'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download, TrendingUp, DollarSign } from 'lucide-react';

export default function EmployeePayroll() {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const stored = localStorage.getItem('currentUser');
            if (stored) {
                const user = JSON.parse(stored);
                const res = await fetch(`/api/employee/profile?email=${encodeURIComponent(user.email)}`);
                const data = await res.json();
                if (data.success) {
                    setProfile(data.data);
                }
            }
            setLoading(false);
        };
        fetchProfile();
    }, []);

    if (loading) return <div style={{ padding: '2rem' }}>Loading payroll profile...</div>;

    const salary = profile?.salary || {
        basic: '0', hra: '0', special: '0', totalMonth: '0'
    };

    return (
        <div>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '2rem', fontWeight: 600 }}>My Payroll</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div>
                    <Card title="Detailed Salary Structure">
                        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary)' }}>₹ {salary.totalMonth}</div>
                            <span style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', paddingBottom: '0.5rem' }}>/ Monthly Gross</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <SalaryLine label="Basic Salary" value={salary.basic} />
                            <SalaryLine label="House Rent Allowance (HRA)" value={salary.hra} />
                            <SalaryLine label="Standard Allowance" value={salary.special} />
                            <SalaryLine label="Performance Bonus" value={salary.bonus} />
                            <div style={{ padding: '1.5rem', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)', marginTop: '1rem', border: '1px solid var(--border-light)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-main)', fontWeight: 700 }}>
                                    <span>Calculated Monthly Gross</span>
                                    <span>₹ {salary.totalMonth}</span>
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                    * This structure is defined by HR and is the basis for your monthly payouts.
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div style={{ height: '2rem' }} />

                    <Card title="Monthly Payout History">
                        <div style={{ color: 'var(--text-secondary)', padding: '2rem', textAlign: 'center' }}>
                            <DollarSign size={48} style={{ opacity: 0.1, marginBottom: '1rem' }} />
                            <div>Automatic payslips for 2026 will appear here after payroll is processed for the current month.</div>
                        </div>
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

function SalaryLine({ label, value }: { label: string, value: string }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
            <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
            <span style={{ fontWeight: 600 }}>₹ {value}</span>
        </div>
    );
}
