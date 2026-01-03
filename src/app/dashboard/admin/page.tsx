'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Users, Clock, Calendar, AlertCircle } from 'lucide-react';

const stats = [
    { label: 'Total Employees', value: '124', icon: Users, color: '#3B82F6' },
    { label: 'Present Today', value: '108', icon: Clock, color: '#10B981', sub: '92% Attendance' },
    { label: 'Leave Requests', value: '12', icon: AlertCircle, color: '#F59E0B', sub: '4 Pending' },
    { label: 'Upcoming Reviews', value: '5', icon: Calendar, color: '#8B5CF6' },
];

export default function AdminDashboard() {
    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Welcome back, Admin</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Here's what's happening at Dayflow today.</p>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.label} padding="1.5rem">
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <div style={{
                                    width: '40px', height: '40px',
                                    borderRadius: 'var(--radius-md)',
                                    background: `${stat.color}20`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: stat.color
                                }}>
                                    <Icon size={20} />
                                </div>
                                {stat.sub && (
                                    <span style={{ fontSize: '0.75rem', background: 'var(--bg-app)', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                                        {stat.sub}
                                    </span>
                                )}
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.25rem' }}>{stat.value}</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{stat.label}</div>
                        </Card>
                    )
                })}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                {/* Recent Activity / Leave Queue */}
                <Card title="Pending Leave Requests">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            { name: 'Sarah Wilson', type: 'Sick Leave', date: 'Jan 4 - Jan 5', status: 'Pending' },
                            { name: 'Mike Chen', type: 'Paid Leave', date: 'Jan 10 - Jan 20', status: 'Pending' },
                            { name: 'Emma Davis', type: 'Unpaid Leave', date: 'Feb 1', status: 'Pending' },
                        ].map((req, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '1rem', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)'
                            }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#CBD5E1' }} />
                                    <div>
                                        <div style={{ fontWeight: 500 }}>{req.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{req.type} • {req.date}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Button variant="outline" style={{ padding: '0.5rem', fontSize: '0.75rem' }}>Reject</Button>
                                    <Button style={{ padding: '0.5rem', fontSize: '0.75rem', backgroundColor: 'var(--success)' }}>Approve</Button>
                                </div>
                            </div>
                        ))}
                        <Button variant="outline" fullWidth style={{ marginTop: '0.5rem' }}>View All Requests</Button>
                    </div>
                </Card>

                {/* Quick Actions / Attendance */}
                <Card title="Quick Actions">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <Button variant="outline" fullWidth style={{ justifyContent: 'flex-start' }}>+ Add New Employee</Button>
                        <Button variant="outline" fullWidth style={{ justifyContent: 'flex-start' }}>Generate Payroll Report</Button>
                        <Button variant="outline" fullWidth style={{ justifyContent: 'flex-start' }}>Update Company Policy</Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
