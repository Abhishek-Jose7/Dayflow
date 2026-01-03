'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LogIn, LogOut, Clock, Calendar } from 'lucide-react';

export default function EmployeeAttendance() {
    const history = [
        { date: 'Today, Jan 03', checkIn: '09:02 AM', checkOut: '-', hours: 'On-going', status: 'Present' },
        { date: 'Yesterday, Jan 02', checkIn: '08:58 AM', checkOut: '06:10 PM', hours: '9h 12m', status: 'Present' },
        { date: 'Wednesday, Jan 01', checkIn: '-', checkOut: '-', hours: '-', status: 'Holiday' },
        { date: 'Tuesday, Dec 31', checkIn: '09:15 AM', checkOut: '05:45 PM', hours: '8h 30m', status: 'Present' },
        { date: 'Monday, Dec 30', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: '9h 00m', status: 'Present' },
    ];

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem' }}>My Attendance</h1>
                <div style={{ background: 'var(--bg-card)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={18} color="var(--text-secondary)" />
                    <span style={{ fontWeight: 500 }}>January 2026</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '2rem' }}>

                {/* Left: Calendar/History List */}
                <Card title="Attendance History" padding="0">
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: 'var(--bg-app)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                            <tr>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Date</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Check In</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Check Out</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Work Hours</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((row, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 500 }}>{row.date}</td>
                                    <td style={{ padding: '1rem' }}>{row.checkIn}</td>
                                    <td style={{ padding: '1rem' }}>{row.checkOut}</td>
                                    <td style={{ padding: '1rem' }}>{row.hours}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)',
                                            fontSize: '0.75rem', fontWeight: 600,
                                            background: row.status === 'Present' ? '#DEF7EC' : row.status === 'Holiday' ? '#EEF2FF' : '#FEF3C7',
                                            color: row.status === 'Present' ? '#03543F' : row.status === 'Holiday' ? '#3730A3' : '#92400E',
                                        }}>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>

                {/* Right: Actions & Summary */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <Card title="Today's Action">
                        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>09:42 AM</div>
                            <div style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Friday, Jan 03</div>

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                <Button disabled style={{ cursor: 'not-allowed', opacity: 0.6, display: 'flex', gap: '0.5rem' }}>
                                    <LogIn size={18} /> Checked In
                                </Button>
                                <Button variant="outline" style={{ display: 'flex', gap: '0.5rem', borderColor: 'var(--danger)', color: 'var(--danger)' }}>
                                    <LogOut size={18} /> Check Out
                                </Button>
                            </div>
                        </div>
                    </Card>

                    <Card title="Statistics">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                    <div style={{ padding: '0.5rem', background: '#DEF7EC', borderRadius: '8px', color: '#03543F' }}><Clock size={20} /></div>
                                    <span>On Time</span>
                                </div>
                                <span style={{ fontWeight: 600 }}>18 Days</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                    <div style={{ padding: '0.5rem', background: '#FEF3C7', borderRadius: '8px', color: '#92400E' }}><Clock size={20} /></div>
                                    <span>Late</span>
                                </div>
                                <span style={{ fontWeight: 600 }}>2 Days</span>
                            </div>
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
}
