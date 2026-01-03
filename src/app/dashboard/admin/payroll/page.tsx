'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DollarSign, Download, Send } from 'lucide-react';

export default function AdminPayroll() {
    const employees = [
        { id: 1, name: 'Alex Lewis', role: 'Senior Engineer', salary: '$10,000', status: 'Paid' },
        { id: 2, name: 'Sarah Wilson', role: 'Product Manager', salary: '$11,500', status: 'Processing' },
        { id: 3, name: 'Mike Chen', role: 'Designer', salary: '$9,000', status: 'Pending' },
    ];

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem' }}>Payroll Management</h1>
                <Button style={{ display: 'flex', gap: '0.5rem' }}>
                    <Send size={16} /> Run Payroll for Jan 2026
                </Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <Card padding="1.5rem">
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Payroll Cost</div>
                    <div style={{ fontSize: '2rem', fontWeight: 700 }}>$142,500</div>
                    <div style={{ color: 'var(--success)', fontSize: '0.875rem' }}>Protected for Jan 2026</div>
                </Card>
                <Card padding="1.5rem">
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Pending Payments</div>
                    <div style={{ fontSize: '2rem', fontWeight: 700 }}>12</div>
                    <div style={{ color: 'var(--warning)', fontSize: '0.875rem' }}>Action Required</div>
                </Card>
                <Card padding="1.5rem">
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Next Pay Day</div>
                    <div style={{ fontSize: '2rem', fontWeight: 700 }}>Jan 31</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>28 Days Remaining</div>
                </Card>
            </div>

            <Card title="Employee Salary Status">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: 'var(--bg-app)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        <tr>
                            <th style={{ padding: '1rem', fontWeight: 600 }}>Employee</th>
                            <th style={{ padding: '1rem', fontWeight: 600 }}>Role</th>
                            <th style={{ padding: '1rem', fontWeight: 600 }}>Net Salary</th>
                            <th style={{ padding: '1rem', fontWeight: 600 }}>Status</th>
                            <th style={{ padding: '1rem', fontWeight: 600 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((row) => (
                            <tr key={row.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                <td style={{ padding: '1rem', fontWeight: 500 }}>{row.name}</td>
                                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{row.role}</td>
                                <td style={{ padding: '1rem', fontWeight: 600 }}>{row.salary}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)',
                                        fontSize: '0.75rem', fontWeight: 600,
                                        background: row.status === 'Paid' ? '#DEF7EC' : row.status === 'Processing' ? '#E1EFFE' : '#FEF3C7',
                                        color: row.status === 'Paid' ? '#03543F' : row.status === 'Processing' ? '#1E429F' : '#92400E',
                                    }}>
                                        {row.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <Button variant="outline" style={{ padding: '0.35rem 0.5rem', fontSize: '0.75rem', height: 'auto', display: 'flex', gap: '0.25rem' }}>
                                        <Download size={12} /> Slip
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
