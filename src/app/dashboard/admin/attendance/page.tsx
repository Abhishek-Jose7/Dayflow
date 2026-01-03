'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Filter, Download } from 'lucide-react';

export default function AdminAttendance() {
    const attendanceData = [
        { id: 1, name: 'Alex Lewis', date: 'Jan 03, 2026', checkIn: '09:02 AM', checkOut: '-', status: 'Present' },
        { id: 2, name: 'Sarah Wilson', date: 'Jan 03, 2026', checkIn: '-', checkOut: '-', status: 'Absent' },
        { id: 3, name: 'Mike Chen', date: 'Jan 03, 2026', checkIn: '09:15 AM', checkOut: '-', status: 'Present' },
        { id: 4, name: 'Emma Davis', date: 'Jan 03, 2026', checkIn: '08:55 AM', checkOut: '-', status: 'Present' },
        { id: 5, name: 'John Doe', date: 'Jan 03, 2026', checkIn: '-', checkOut: '-', status: 'Leave' },
    ];

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem' }}>Attendance Overview</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button variant="outline" style={{ display: 'flex', gap: '0.5rem' }}>
                        <Filter size={16} /> Filter
                    </Button>
                    <Button variant="outline" style={{ display: 'flex', gap: '0.5rem' }}>
                        <Download size={16} /> Export
                    </Button>
                </div>
            </div>

            <Card padding="0">
                <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                        <Input placeholder="Search employee..." style={{ marginBottom: 0 }} />
                    </div>
                    <Input type="date" style={{ marginBottom: 0, width: 'auto' }} />
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: 'var(--bg-app)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                            <tr>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Employee</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Date</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Check In</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Check Out</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Status</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData.map((row) => (
                                <tr key={row.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 500 }}>{row.name}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{row.date}</td>
                                    <td style={{ padding: '1rem' }}>{row.checkIn}</td>
                                    <td style={{ padding: '1rem' }}>{row.checkOut}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)',
                                            fontSize: '0.75rem', fontWeight: 600,
                                            background: row.status === 'Present' ? '#DEF7EC' : row.status === 'Absent' ? '#FDE8E8' : '#FEF3C7',
                                            color: row.status === 'Present' ? '#03543F' : row.status === 'Absent' ? '#9B1C1C' : '#92400E',
                                        }}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <button style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem', textAlign: 'center' }}>
                    Showing 5 of 124 records
                </div>
            </Card>
        </div>
    );
}
