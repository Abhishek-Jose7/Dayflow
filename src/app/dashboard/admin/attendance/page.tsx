'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ChevronLeft, ChevronRight, Search, Download } from 'lucide-react';

export default function AdminAttendance() {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [search, setSearch] = useState('');
    const [attendance, setAttendance] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAttendance = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/attendance?date=${date}&search=${encodeURIComponent(search)}`);
            const result = await res.json();
            if (result.success) {
                setAttendance(result.data);
            }
        } catch (err) {
            console.error('Failed to fetch attendance');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchAttendance();
        }, 300);
        return () => clearTimeout(timer);
    }, [date, search]);

    const changeDate = (dir: number) => {
        const d = new Date(date);
        d.setDate(d.getDate() + dir);
        setDate(d.toISOString().split('T')[0]);
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString([], { day: '2-digit', month: 'long', year: 'numeric' });
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 600 }}>Attendance</h1>
                <Button variant="outline" style={{ display: 'flex', gap: '0.5rem' }}>
                    <Download size={16} /> Export CSV
                </Button>
            </div>

            {/* Wireframe Controls */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '2px', background: 'var(--bg-card)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                    <button onClick={() => changeDate(-1)} style={{ background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer', color: 'var(--text-secondary)' }}><ChevronLeft size={20} /></button>
                    <button onClick={() => changeDate(1)} style={{ background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer', color: 'var(--text-secondary)' }}><ChevronRight size={20} /></button>
                </div>

                <div style={{ position: 'relative' }}>
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        style={{ padding: '0.625rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-card)', fontWeight: 600, outline: 'none' }}
                    />
                </div>

                <div style={{ background: 'var(--bg-card)', padding: '0.625rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontWeight: 600 }}>
                    {formatDate(date)}
                </div>

                <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input
                        placeholder="Search employee name or ID..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', background: 'var(--bg-card)', outline: 'none' }}
                    />
                </div>
            </div>

            <Card padding="0">
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: 'var(--bg-app)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                            <tr>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Emp</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Check In</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Check Out</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Work Hours</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Extra hours</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center' }}>Loading attendance records...</td></tr>
                            ) : attendance.length > 0 ? (
                                attendance.map((row) => (
                                    <tr key={row.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            <div style={{ fontWeight: 600 }}>{row.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{row.employeeId}</div>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>{row.checkIn}</td>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>{row.checkOut}</td>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>{row.workHours}h</td>
                                        <td style={{ padding: '1.25rem 1.5rem', color: parseFloat(row.extraHours) > 0 ? '#16A34A' : 'inherit' }}>
                                            {parseFloat(row.extraHours) > 0 ? `+${row.extraHours}h` : '-'}
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            <span style={{
                                                padding: '0.35rem 1rem', borderRadius: 'var(--radius-full)',
                                                fontSize: '0.75rem', fontWeight: 600,
                                                background: row.status === 'PRESENT' || row.status === 'ON-TIME' ? '#DEF7EC' : row.status === 'LATE' ? '#FEF3C7' : '#FDE8E8',
                                                color: row.status === 'PRESENT' || row.status === 'ON-TIME' ? '#03543F' : row.status === 'LATE' ? '#92400E' : '#9B1C1C',
                                            }}>
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                        No employees present on this day.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
