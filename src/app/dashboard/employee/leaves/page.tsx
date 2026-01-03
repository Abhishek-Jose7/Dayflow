'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Calendar as CalendarIcon, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function EmployeeLeaves() {
    const [activeTab, setActiveTab] = useState<'apply' | 'history'>('apply');

    const [leaves, setLeaves] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [type, setType] = useState('Paid Leave');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');

    React.useEffect(() => {
        fetchLeaves(); // Load on mount
    }, [activeTab]); // Reload when switching tabs

    const fetchLeaves = async () => {
        const stored = localStorage.getItem('currentUser');
        if (stored) {
            const user = JSON.parse(stored);
            try {
                const res = await fetch(`/api/leaves?email=${encodeURIComponent(user.email)}`);
                const data = await res.json();
                if (data.success) {
                    setLeaves(data.data);
                }
            } catch (err) {
                console.error('Failed to load leaves');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const stored = localStorage.getItem('currentUser');
        if (!stored) return;
        const user = JSON.parse(stored);

        try {
            const res = await fetch('/api/leaves', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                    type,
                    startDate,
                    endDate,
                    reason
                })
            });

            const data = await res.json();
            if (data.success) {
                alert('Leave request submitted successfully!');
                setReason('');
                setStartDate('');
                setEndDate('');
                setActiveTab('history');
                fetchLeaves();
            } else {
                alert('Failed to submit request');
            }
        } catch (err) {
            alert('Error submitting request');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem' }}>Leave Management</h1>
                <div style={{ background: 'var(--bg-card)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                    <button
                        onClick={() => setActiveTab('apply')}
                        style={{
                            padding: '0.5rem 1rem',
                            background: activeTab === 'apply' ? 'var(--primary-light)' : 'transparent',
                            color: activeTab === 'apply' ? 'var(--primary)' : 'var(--text-secondary)',
                            border: 'none', borderRadius: '4px', fontWeight: 500, cursor: 'pointer'
                        }}
                    >
                        Apply for Leave
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        style={{
                            padding: '0.5rem 1rem',
                            background: activeTab === 'history' ? 'var(--primary-light)' : 'transparent',
                            color: activeTab === 'history' ? 'var(--primary)' : 'var(--text-secondary)',
                            border: 'none', borderRadius: '4px', fontWeight: 500, cursor: 'pointer'
                        }}
                    >
                        Leave History
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem' }}>

                {/* Main Content Area */}
                <div>
                    {activeTab === 'apply' ? (
                        <Card title="New Leave Request">
                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Leave Type</label>
                                    <select
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        style={{
                                            width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)',
                                            border: '1px solid var(--border-light)', outline: 'none',
                                            background: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '0.95rem'
                                        }}>
                                        <option>Paid Leave</option>
                                        <option>Sick Leave</option>
                                        <option>Casual Leave</option>
                                        <option>Unpaid Leave</option>
                                    </select>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <Input type="date" label="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                                    <Input type="date" label="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Reason / Remarks</label>
                                    <textarea
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        style={{
                                            width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)',
                                            border: '1px solid var(--border-light)', outline: 'none',
                                            background: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '0.95rem',
                                            minHeight: '120px'
                                        }}
                                        placeholder="Briefly describe the reason for your leave..."
                                        required
                                    ></textarea>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button style={{ padding: '0.75rem 2rem' }} isLoading={isLoading}>Submit Request</Button>
                                </div>
                            </form>
                        </Card>
                    ) : (
                        <Card title="Leave History">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {leaves.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>No leave history found.</div>}
                                {leaves.map((leave, i) => (
                                    <div key={i} style={{
                                        padding: '1rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                    }}>
                                        <div>
                                            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{leave.type}</div>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                                {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                                            </div>
                                            {leave.rejectionReason && (
                                                <div style={{ fontSize: '0.8rem', color: 'var(--danger)', marginTop: '0.25rem' }}>
                                                    Reason: {leave.rejectionReason}
                                                </div>
                                            )}
                                        </div>
                                        <div style={{
                                            padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)',
                                            fontSize: '0.75rem', fontWeight: 600,
                                            background: leave.status === 'APPROVED' ? '#DEF7EC' : leave.status === 'REJECTED' ? '#FDE8E8' : '#FEF3C7',
                                            color: leave.status === 'APPROVED' ? '#03543F' : leave.status === 'REJECTED' ? '#9B1C1C' : '#92400E',
                                        }}>
                                            {leave.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}
                </div>

                {/* Sidebar Widgets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <Card title="Leave Balance">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { label: 'Paid Leave', taken: 5, total: 18 },
                                { label: 'Sick Leave', taken: 2, total: 12 },
                                { label: 'Casual Leave', taken: 1, total: 8 },
                            ].map((item) => (
                                <div key={item.label}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                        <span>{item.label}</span>
                                        <span style={{ fontWeight: 600 }}>{item.total - item.taken} Remaining</span>
                                    </div>
                                    <div style={{ width: '100%', height: '6px', background: 'var(--bg-app)', borderRadius: '3px', overflow: 'hidden' }}>
                                        <div style={{ width: `${(item.taken / item.total) * 100}%`, height: '100%', background: 'var(--primary)' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <AlertCircle size={16} color="var(--primary)" />
                            Policy Note
                        </h4>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                            Sick leaves for more than 2 consecutive days require a medical certificate.
                        </p>
                    </Card>
                </div>

            </div>
        </div>
    );
}
