'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FileText, Download, BarChart2, PieChart } from 'lucide-react';

export default function AdminReports() {
    return (
        <div>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>Reports & Analytics</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '2rem', marginBottom: '2rem' }}>
                <Card title="Attendance Overview" interactive>
                    <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '10px', paddingTop: '1rem' }}>
                        {[60, 80, 45, 90, 75, 85, 95].map((val, i) => (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                                <div
                                    style={{
                                        width: '100%',
                                        height: `${val}%`,
                                        background: 'var(--primary)',
                                        borderRadius: '4px',
                                        opacity: 0.8,
                                        transition: 'height 0.5s ease'
                                    }}
                                    className="hover-lift"
                                />
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card title="Leave Distribution">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '1rem' }}>
                        {[
                            { label: 'Sick Leave', value: 30, color: 'var(--warning)' },
                            { label: 'Paid Leave', value: 55, color: 'var(--success)' },
                            { label: 'Unpaid Leave', value: 15, color: 'var(--danger)' },
                        ].map((item) => (
                            <div key={item.label}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '5px', fontWeight: 500 }}>
                                    <span>{item.label}</span>
                                    <span>{item.value}%</span>
                                </div>
                                <div style={{ width: '100%', height: '8px', background: 'var(--bg-app)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: `${item.value}%`, height: '100%', background: item.color }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Available Reports</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {[
                    { name: 'Monthly Attendance Report', desc: 'Detailed view of check-ins and hours.', date: 'Generated today' },
                    { name: 'Payroll Summary', desc: 'Salary breakdown per department.', date: 'Generated yesterday' },
                    { name: 'Leave Utilization', desc: 'Yearly leave balance analysis.', date: 'Generated Jan 1' },
                ].map((report, i) => (
                    <Card key={i}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{ padding: '0.75rem', background: 'var(--primary-light)', borderRadius: 'var(--radius-md)', color: 'var(--primary)' }}>
                                <FileText size={24} />
                            </div>
                            <Button variant="outline" style={{ padding: '0.5rem', height: 'auto' }}><Download size={16} /></Button>
                        </div>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{report.name}</h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{report.desc}</p>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{report.date}</div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
