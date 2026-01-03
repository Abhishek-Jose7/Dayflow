'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Plus } from 'lucide-react';

export default function AdminDirectory() {
    const directory = [
        { id: 1, name: 'Alex Lewis', role: 'Senior Engineer', dept: 'Engineering', email: 'alex@dayflow.com', phone: '+1 555-0101' },
        { id: 2, name: 'Sarah Wilson', role: 'Product Manager', dept: 'Product', email: 'sarah@dayflow.com', phone: '+1 555-0102' },
        { id: 3, name: 'John Doe', role: 'HR Manager', dept: 'Human Resources', email: 'john@dayflow.com', phone: '+1 555-0103' },
        { id: 4, name: 'Mike Chen', role: 'UI/UX Designer', dept: 'Design', email: 'mike@dayflow.com', phone: '+1 555-0104' },
    ];

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem' }}>Employee Directory</h1>
                <Button style={{ display: 'flex', gap: '0.5rem' }}>
                    <Plus size={16} /> Add Employee
                </Button>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <div style={{ position: 'relative', maxWidth: '400px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <Input placeholder="Search by name, role or ID..." style={{ paddingLeft: '2.5rem', marginBottom: 0 }} />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {directory.map((emp) => (
                    <Card key={emp.id} padding="0">
                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>
                            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--bg-app)', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 600, color: 'var(--primary)' }}>
                                {emp.name.charAt(0)}
                            </div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{emp.name}</h3>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{emp.role}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 500, background: 'var(--primary-light)', padding: '2px 8px', borderRadius: '4px' }}>{emp.dept}</div>
                        </div>
                        <div style={{ padding: '1rem', background: 'var(--bg-app)', borderRadius: '0 0 var(--radius-lg) var(--radius-lg)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Email</span>
                                <span style={{ fontWeight: 500 }}>{emp.email}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Phone</span>
                                <span style={{ fontWeight: 500 }}>{emp.phone}</span>
                            </div>
                            <Button variant="outline" fullWidth style={{ marginTop: '1rem', fontSize: '0.875rem' }}>View Profile</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
