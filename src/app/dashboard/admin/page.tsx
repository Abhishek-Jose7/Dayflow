'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatsCard } from '@/components/dashboard/StatsCard'; // Modular Component
import { Users, Clock, Calendar, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    const [pendingLeaves, setPendingLeaves] = useState<any[]>([]);

    const fetchLeaves = async () => {
        try {
            const res = await fetch('/api/leaves?role=ADMIN');
            const data = await res.json();
            if (data.success && Array.isArray(data.data)) {
                setPendingLeaves(data.data.slice(0, 3));
            }
        } catch (error) {
            console.error('Failed to fetch dashboard leaves', error);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    const handleAction = async (id: string, status: 'APPROVED' | 'REJECTED') => {
        if (!confirm(`Are you sure you want to ${status} this request?`)) return;

        try {
            const res = await fetch(`/api/leaves/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status, remarks: 'Processed via Dashboard' })
            });
            const data = await res.json();
            if (data.success) {
                // Remove the item locally to update UI instantly or refresh
                setPendingLeaves(prev => prev.filter(req => req.id !== id));
                fetchLeaves(); // Refresh to get a new one from stack if any
            } else {
                alert('Action failed');
            }
        } catch (err) {
            alert('Error processing request');
        }
    };

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
                    label="Pending Leaves" value={pendingLeaves.length.toString()} icon={AlertCircle} color="#F59E0B"
                    subText="Action Required" trend="neutral"
                />
                <StatsCard
                    label="Upcoming Reviews" value="5" icon={Calendar} color="#8B5CF6"
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                {/* Recent Activity / Leave Queue */}
                <Card title="Pending Leave Requests">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {pendingLeaves.length === 0 ? (
                            <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No pending requests.</div>
                        ) : (
                            pendingLeaves.map((req, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '1rem', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)'
                                }}>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <div style={{
                                            width: 32, height: 32, borderRadius: '50%',
                                            background: '#E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '0.75rem', fontWeight: 600
                                        }}>
                                            {req.employee?.firstName?.[0]}{req.employee?.lastName?.[0]}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 500 }}>{req.employee?.firstName} {req.employee?.lastName}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                                {req.type} • {new Date(req.startDate).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <Button
                                            onClick={() => handleAction(req.id, 'REJECTED')}
                                            variant="outline"
                                            style={{ padding: '0.5rem', fontSize: '0.75rem', color: 'var(--danger)', borderColor: 'var(--danger)' }}
                                        >
                                            Reject
                                        </Button>
                                        <Button
                                            onClick={() => handleAction(req.id, 'APPROVED')}
                                            style={{ padding: '0.5rem', fontSize: '0.75rem', backgroundColor: 'var(--success)' }}
                                        >
                                            Approve
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                        <Link href="/dashboard/admin/leaves" style={{ width: '100%', marginTop: '0.5rem' }}>
                            <Button variant="outline" fullWidth>View All Requests</Button>
                        </Link>
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
