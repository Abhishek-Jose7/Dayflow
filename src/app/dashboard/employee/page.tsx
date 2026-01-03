'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Clock, Calendar, AlertCircle, CheckCircle } from 'lucide-react';

export default function EmployeeDashboard() {
    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    const [user, setUser] = React.useState<{ name: string; email: string } | null>(null);

    React.useEffect(() => {
        const stored = localStorage.getItem('currentUser');
        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                        Hello, {user ? user.name.split(' ')[0] : '...'}
                    </h1>
                    <div style={{ display: 'inline-block', padding: '0.25rem 0.5rem', borderRadius: '4px', background: 'rgba(0,0,0,0.05)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                        Logged in as: {user?.email}
                    </div>
                    <p style={{ color: 'var(--text-secondary)' }}>It's {currentDate}. Have a productive day!</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button style={{ background: 'var(--success)', padding: '0.75rem 2rem' }}>
                        Check In
                    </Button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>

                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Attendance Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                        <Card padding="1.25rem">
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Worked Hours</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>142h</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>+12% vs last month</div>
                        </Card>
                        <Card padding="1.25rem">
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Attendance</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>98%</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Excellent</div>
                        </Card>
                        <Card padding="1.25rem">
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Leave Balance</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>12 Days</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Available</div>
                        </Card>
                    </div>

                    <Card title="Recent Activity">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { action: 'Check In', time: 'Today, 09:00 AM', icon: CheckCircle, color: 'var(--success)' },
                                { action: 'Check Out', time: 'Yesterday, 06:15 PM', icon: LogOut, color: 'var(--text-secondary)' }, // need LogOut import or similar
                                { action: 'Leave Request Approved', time: 'Yesterday, 02:00 PM', icon: CheckCircle, color: 'var(--primary)' },
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{
                                        width: 36, height: 36, borderRadius: '50%',
                                        background: 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <item.icon size={16} color={item.color} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{item.action}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <Card title="Upcoming Holidays">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                <div style={{
                                    background: 'var(--primary-light)', color: 'var(--primary)',
                                    padding: '0.5rem', borderRadius: 'var(--radius-md)', textAlign: 'center', minWidth: '50px'
                                }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>JAN</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>26</div>
                                </div>
                                <div>
                                    <div style={{ fontWeight: 500 }}>Republic Day</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>National Holiday</div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card title="Team Members on Leave">
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            No one from your team is on leave today.
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
}

// Mocking LogOut for this file
function LogOut(props: any) {
    return <Clock {...props} />
}
