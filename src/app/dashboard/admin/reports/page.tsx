'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FileText, Download, BarChart2, PieChart } from 'lucide-react';

export default function AdminReports() {
    return (
        <div>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>Reports & Analytics</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <Card title="Attendance Overview">
                    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)' }}>
                        <BarChart2 size={48} />
                        <span style={{ marginLeft: '1rem' }}>Attendance Chart Placeholder</span>
                    </div>
                </Card>
                <Card title="Leave Distribution">
                    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)' }}>
                        <PieChart size={48} />
                        <span style={{ marginLeft: '1rem' }}>Leave Types Chart Placeholder</span>
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
