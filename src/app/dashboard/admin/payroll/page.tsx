'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DollarSign, Download, Send, Calculator, Users, Clock } from 'lucide-react';

export default function AdminPayroll() {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPayroll = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/payroll?month=${month}&year=${year}`);
            const result = await res.json();
            if (result.success) {
                setData(result.data);
            }
        } catch (err) {
            console.error('Failed to fetch payroll');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayroll();
    }, [month, year]);

    const totalCost = data.reduce((acc, curr) => acc + parseInt(curr.netSalary.replace(/,/g, '')), 0);
    const pendingCount = data.filter(d => d.status !== 'Paid').length;

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 600 }}>Payroll Management</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button variant="outline" onClick={() => fetchPayroll()}>Refresh Data</Button>
                    <Button style={{ display: 'flex', gap: '0.5rem' }}>
                        <Send size={16} /> Run Payroll
                    </Button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <Card style={{ borderLeft: '4px solid var(--primary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Total Payroll Cost</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0.5rem 0' }}>₹ {totalCost.toLocaleString()}</div>
                        </div>
                        <div style={{ padding: '0.75rem', background: 'var(--primary-light)', borderRadius: '12px', color: 'var(--primary)' }}><Calculator size={24} /></div>
                    </div>
                </Card>
                <Card style={{ borderLeft: '4px solid var(--warning)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Pending Approvals</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0.5rem 0' }}>{pendingCount}</div>
                        </div>
                        <div style={{ padding: '0.75rem', background: '#FEF3C7', borderRadius: '12px', color: '#92400E' }}><Users size={24} /></div>
                    </div>
                </Card>
                <Card style={{ borderLeft: '4px solid var(--success)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Next Pay Cycle</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0.5rem 0' }}>Jan 31</div>
                        </div>
                        <div style={{ padding: '0.75rem', background: '#DEF7EC', borderRadius: '12px', color: '#03543F' }}><Clock size={24} /></div>
                    </div>
                </Card>
            </div>

            <Card title="Employee Monthly Payouts" padding="0">
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: 'var(--bg-app)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                            <tr>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Employee</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Base Wage</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Working Days</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Payable Days</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Net Payout</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Status</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={7} style={{ padding: '3rem', textAlign: 'center' }}>Calculating payroll based on attendance...</td></tr>
                            ) : data.map((row) => (
                                <tr key={row.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <div style={{ fontWeight: 600 }}>{row.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{row.role}</div>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>₹ {row.baseSalary.toLocaleString()}</td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>{row.expectedDays} Days</td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <span style={{ fontWeight: 600, color: row.payableDays < row.expectedDays ? 'var(--danger)' : 'var(--success)' }}>
                                            {row.payableDays} Days
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700 }}>₹ {row.netSalary}</td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <span style={{
                                            padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)',
                                            fontSize: '0.75rem', fontWeight: 600,
                                            background: '#FEF3C7', color: '#92400E',
                                        }}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <Button variant="outline" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', height: 'auto', display: 'flex', gap: '0.25rem' }}>
                                            <Download size={14} /> Slip
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#F9FAFB', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border-light)' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    * Payouts are automatically adjusted based on monthly attendance. Missing days or unpaid leaves are deducted from the gross wage using a standard daily rate.
                </p>
            </div>
        </div>
    );
}
