'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatsCard } from '@/components/dashboard/StatsCard'; // Modular Component
import { Users, Clock, Calendar, AlertCircle } from 'lucide-react';


export default function AdminDashboard() {
    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Welcome back, Admin</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Here's what's happening at Dayflow today.</p>
            </div>

            {/* Stats Grid - Modularized */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatsCard
                    label="Total Employees" value="124" icon={Users} color="#3B82F6"
                />
                <StatsCard
                    label="Present Today" value="108" icon={Clock} color="#10B981"
                    subText="92% Attendance" trend="positive"
                />
                <StatsCard
                    label="Pending Leaves" value="12" icon={AlertCircle} color="#F59E0B"
                    subText="4 Critical" trend="neutral"
                />
                <StatsCard
                    label="Upcoming Reviews" value="5" icon={Calendar} color="#8B5CF6"
                />
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
