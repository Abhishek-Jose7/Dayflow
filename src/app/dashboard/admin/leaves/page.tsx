'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Check, X, Filter } from 'lucide-react';

export default function AdminLeaves() {
    const requests = [
        { id: 1, name: 'Sarah Wilson', type: 'Sick Leave', dates: 'Jan 4 - Jan 5, 2026', days: 2, status: 'Pending', avatar: '#E0E7FF', initials: 'SW' },
        { id: 2, name: 'Mike Chen', type: 'Paid Leave', dates: 'Jan 10 - Jan 20, 2026', days: 10, status: 'Pending', avatar: '#FEF3C7', initials: 'MC' },
        { id: 3, name: 'Emma Davis', type: 'Unpaid Leave', dates: 'Feb 1, 2026', days: 1, status: 'Pending', avatar: '#FCE7F3', initials: 'ED' },
    ];

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem' }}>Leave Requests</h1>
                <Button variant="outline" style={{ display: 'flex', gap: '0.5rem' }}>
                    <Filter size={16} /> Filter Requests
                </Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>

                {/* Requests List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {requests.map((req) => (
                        <Card key={req.id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{
                                        width: 48, height: 48, borderRadius: '50%',
                                        background: req.avatar, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 600, color: 'var(--text-main)'
                                    }}>
                                        {req.initials}
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{req.name}</h3>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                            Requested <b>{req.type}</b> for {req.days} days
                                        </div>
                                        <div style={{
                                            display: 'inline-block', padding: '0.25rem 0.5rem',
                                            background: 'var(--bg-app)', borderRadius: '4px', fontSize: '0.875rem', fontWeight: 500
                                        }}>
                                            {req.dates}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <Button variant="outline" style={{ display: 'flex', gap: '0.5rem', color: 'var(--danger)', borderColor: 'var(--danger)' }}>
                                        <X size={16} /> Reject
                                    </Button>
                                    <Button style={{ display: 'flex', gap: '0.5rem', background: 'var(--success)' }}>
                                        <Check size={16} /> Approve
                                    </Button>
                                </div>
                            </div>
                            <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                "I am requesting leave due to personal medical reasons. All tasks have been handed over."
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <Card title="Leave Overview">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Pending</span>
                                <span style={{ fontWeight: 600 }}>12</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Approved Today</span>
                                <span style={{ fontWeight: 600 }}>5</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>On Leave Today</span>
                                <span style={{ fontWeight: 600 }}>8</span>
                            </div>
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
}
