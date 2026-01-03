'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LogIn, LogOut, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export default function EmployeeAttendance() {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [checking, setChecking] = useState(false);

    const fetchAttendance = async () => {
        setLoading(true);
        const stored = localStorage.getItem('currentUser');
        if (!stored) return;
        const user = JSON.parse(stored);

        try {
            const res = await fetch(`/api/attendance?email=${encodeURIComponent(user.email)}&month=${month}&year=${year}`);
            const result = await res.json();
            if (result.success) {
                setData(result.data);
            }
        } catch (err) {
            console.error('Failed to fetch attendance');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, [month, year]);

    const handleAction = async (action: 'CHECK_IN' | 'CHECK_OUT') => {
        setChecking(true);
        const stored = localStorage.getItem('currentUser');
        if (!stored) return;
        const user = JSON.parse(stored);

        try {
            const res = await fetch('/api/attendance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email, action })
            });
            const result = await res.json();
            if (result.success) {
                fetchAttendance();
            } else {
                alert(result.error);
            }
        } catch (err) {
            alert('Operation failed');
        } finally {
            setChecking(false);
        }
    };

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const changeMonth = (dir: number) => {
        let newMonth = month + dir;
        let newYear = year;
        if (newMonth > 12) { newMonth = 1; newYear++; }
        if (newMonth < 1) { newMonth = 12; newYear--; }
        setMonth(newMonth);
        setYear(newYear);
    };

    if (loading && !data) return <div style={{ padding: '2rem' }}>Loading...</div>;

    const todayRecord = data?.history?.find((a: any) => new Date(a.date).toDateString() === new Date().toDateString());

    return (
        <div style={{ paddingBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 600 }}>Attendance</h1>

                {/* Check-in / Out Quick Action */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ textAlign: 'right', marginRight: '1rem' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Server Time</div>
                        <div style={{ fontWeight: 700 }}>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                    {!todayRecord?.checkIn ? (
                        <Button onClick={() => handleAction('CHECK_IN')} disabled={checking} style={{ display: 'flex', gap: '0.5rem' }}>
                            <LogIn size={18} /> Check In
                        </Button>
                    ) : !todayRecord?.checkOut ? (
                        <Button onClick={() => handleAction('CHECK_OUT')} disabled={checking} variant="outline" style={{ display: 'flex', gap: '0.5rem', borderColor: 'var(--danger)', color: 'var(--danger)' }}>
                            <LogOut size={18} /> Check Out
                        </Button>
                    ) : (
                        <div style={{ background: '#DEF7EC', color: '#03543F', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: '0.875rem' }}>
                            Today's Shift Completed
                        </div>
                    )}
                </div>
            </div>

            {/* Wireframe Style Navigation & Stats Bar */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '2px', background: 'var(--bg-card)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                    <button onClick={() => changeMonth(-1)} style={{ background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer', color: 'var(--text-secondary)' }}><ChevronLeft size={20} /></button>
                    <button onClick={() => changeMonth(1)} style={{ background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer', color: 'var(--text-secondary)' }}><ChevronRight size={20} /></button>
                </div>

                <div style={{ background: 'var(--bg-card)', padding: '0.625rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontWeight: 600, minWidth: '150px', textAlign: 'center' }}>
                    {monthNames[month - 1]} {year}
                </div>

                <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
                    <div style={{ background: 'var(--bg-card)', padding: '0.625rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', flex: 1, textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '2px' }}>Count of days present</div>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{data?.stats?.daysPresent || 0}</div>
                    </div>
                    <div style={{ background: 'var(--bg-card)', padding: '0.625rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', flex: 1, textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '2px' }}>Leaves count</div>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{data?.stats?.leaves || 0}</div>
                    </div>
                    <div style={{ padding: '0.625rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', flex: 1, textAlign: 'center', background: 'var(--primary-light)' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '2px', fontWeight: 600 }}>Total working days</div>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary)' }}>{data?.stats?.totalWorkingDays || 0}</div>
                    </div>
                </div>
            </div>

            {/* Attendance Table */}
            <Card padding="0">
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: 'var(--bg-app)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                            <tr>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Date</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Check In</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Check Out</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Work Hours</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Extra Hours</th>
                                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.history?.length > 0 ? (
                                data.history.map((row: any, i: number) => (
                                    <tr key={i} style={{ borderBottom: '1px solid var(--border-light)', transition: 'background 0.2s' }} className="hover-row">
                                        <td style={{ padding: '1.25rem 1.5rem', fontWeight: 500 }}>
                                            {new Date(row.date).toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            {row.checkIn ? new Date(row.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            {row.checkOut ? new Date(row.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>
                                            {row.workHours ? `${row.workHours.toFixed(2)}h` : '-'}
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', color: row.extraHours > 0 ? '#16A34A' : 'var(--text-secondary)' }}>
                                            {row.extraHours ? `+${row.extraHours.toFixed(2)}h` : '-'}
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
                                        No attendance records found for this month.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            <style jsx>{`
                .hover-row:hover {
                    background: var(--bg-app);
                }
            `}</style>
        </div>
    );
}
