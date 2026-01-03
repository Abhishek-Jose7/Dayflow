'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Calendar as CalendarIcon, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function EmployeeLeaves() {
    const [activeTab, setActiveTab] = useState<'apply' | 'history'>('apply');

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
                            <form>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Leave Type</label>
                                    <select style={{
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
                                    <Input type="date" label="Start Date" />
                                    <Input type="date" label="End Date" />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Reason / Remarks</label>
                                    <textarea style={{
                                        width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--border-light)', outline: 'none',
                                        background: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '0.95rem',
                                        minHeight: '120px'
                                    }} placeholder="Briefly describe the reason for your leave..."></textarea>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button style={{ padding: '0.75rem 2rem' }}>Submit Request</Button>
                                </div>
                            </form>
                        </Card>
                    ) : (
                        <Card title="Leave History">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    { type: 'Sick Leave', dates: 'Jan 4 - Jan 5, 2026', days: '2 Days', status: 'Pending', color: 'orange' },
                                    { type: 'Paid Leave', dates: 'Dec 20 - Dec 24, 2025', days: '5 Days', status: 'Approved', color: 'green' },
                                    { type: 'Casual Leave', dates: 'Nov 10, 2025', days: '1 Day', status: 'Rejected', color: 'red' },
                                ].map((leave, i) => (
                                    <div key={i} style={{
                                        padding: '1rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                    }}>
                                        <div>
                                            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{leave.type}</div>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{leave.dates} ({leave.days})</div>
                                        </div>
                                        <div style={{
                                            padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)',
                                            fontSize: '0.75rem', fontWeight: 600,
                                            background: leave.status === 'Approved' ? '#DEF7EC' : leave.status === 'Rejected' ? '#FDE8E8' : '#FEF3C7',
                                            color: leave.status === 'Approved' ? '#03543F' : leave.status === 'Rejected' ? '#9B1C1C' : '#92400E',
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
