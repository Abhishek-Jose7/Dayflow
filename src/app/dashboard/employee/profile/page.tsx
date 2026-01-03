'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Camera } from 'lucide-react';

export default function EmployeeProfile() {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>My Profile</h1>

            <Card>
                <div style={{ display: 'flex', gap: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-light)', marginBottom: '2rem' }}>
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            width: 120, height: 120,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '2.5rem', fontWeight: 600, color: 'var(--primary)'
                        }}>
                            AL
                        </div>
                        <button style={{
                            position: 'absolute', bottom: 0, right: 0,
                            background: 'var(--primary)', color: 'white',
                            width: 32, height: 32, borderRadius: '50%', border: '2px solid white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer'
                        }}>
                            <Camera size={16} />
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Alex Lewis</h2>
                        <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 500 }}>Senior Software Engineer</div>
                        <div style={{
                            display: 'inline-block',
                            background: 'var(--bg-app)',
                            padding: '0.25rem 0.75rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.875rem',
                            color: 'var(--text-secondary)'
                        }}>
                            EMP-2024-042
                        </div>
                    </div>
                </div>

                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Personal Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    <Input label="Full Name" value="Alex Lewis" disabled />
                    <Input label="Email Address" value="alex.lewis@dayflow.com" disabled />
                    <Input label="Phone Number" defaultValue="+1 (555) 123-4567" />
                    <Input label="Current Address" defaultValue="123 Tech Park, Silicon Valley, CA" />
                    <Input label="Department" value="Engineering" disabled />
                    <Input label="Role" value="Senior Engineer" disabled />
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                </div>
            </Card>

            <div style={{ height: '2rem' }} />

            <Card title="Employment Details">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Joining Date</div>
                        <div style={{ fontWeight: 500 }}>March 15, 2023</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Employment Type</div>
                        <div style={{ fontWeight: 500 }}>Full-Time</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Work Location</div>
                        <div style={{ fontWeight: 500 }}>Remote / HQ</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Manager</div>
                        <div style={{ fontWeight: 500 }}>John Doe</div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
