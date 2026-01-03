'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Check, X, Filter } from 'lucide-react';

export default function AdminLeaves() {
    const [requests, setRequests] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const res = await fetch('/api/leaves?role=ADMIN');
            const data = await res.json();
            if (data.success) {
                setRequests(data.data);
            }
        } catch (err) {
            console.error('Failed to fetch requests');
        }
    };

    const handleAction = async (id: string, status: 'APPROVED' | 'REJECTED') => {
        if (!confirm(`Are you sure you want to ${status} this request?`)) return;

        const adminStr = localStorage.getItem('currentUser');
        const adminEmail = adminStr ? JSON.parse(adminStr).email : 'admin@dayflow.com';

        try {
            const res = await fetch(`/api/leaves/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status, remarks: 'Processed by Admin', adminEmail })
            });
            const data = await res.json();
            if (data.success) {
                alert(`Request ${status} successfully`);
                fetchRequests();
            } else {
                alert('Action failed');
            }
        } catch (err) {
            alert('Error processing request');
        }
    };

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
                    {requests.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>No pending leave requests.</div>}
                    {requests.map((req) => (
                        <Card key={req.id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{
                                        width: 48, height: 48, borderRadius: '50%',
                                        background: '#E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 600, color: 'var(--text-main)'
                                    }}>
                                        {req.employee?.firstName?.[0]}{req.employee?.lastName?.[0]}
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{req.employee?.firstName} {req.employee?.lastName}</h3>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                            Requested <b>{req.type}</b>
                                        </div>
                                        <div style={{
                                            display: 'inline-block', padding: '0.25rem 0.5rem',
                                            background: 'var(--bg-app)', borderRadius: '4px', fontSize: '0.875rem', fontWeight: 500
                                        }}>
                                            {new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <Button
                                        onClick={() => handleAction(req.id, 'REJECTED')}
                                        variant="outline"
                                        style={{ display: 'flex', gap: '0.5rem', color: 'var(--danger)', borderColor: 'var(--danger)' }}
                                    >
                                        <X size={16} /> Reject
                                    </Button>
                                    <Button
                                        onClick={() => handleAction(req.id, 'APPROVED')}
                                        style={{ display: 'flex', gap: '0.5rem', background: 'var(--success)' }}
                                    >
                                        <Check size={16} /> Approve
                                    </Button>
                                </div>
                            </div>
                            <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                "{req.reason || 'No specific reason provided.'}"
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
