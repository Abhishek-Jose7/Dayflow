'use client';

import React from 'react';
import { Camera } from 'lucide-react';

interface ProfileHeaderProps {
    name: string;
    role: string;
    employeeId: string;
    email: string;
    phone: string;
    department: string;
    manager: string;
    location: string;
    isEditable?: boolean;
}

export function ProfileHeader({ name, role, employeeId, email, phone, department, manager, location, isEditable }: ProfileHeaderProps) {
    return (
        <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            marginBottom: '2rem'
        }}>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {/* Avatar Section */}
                <div style={{ position: 'relative' }}>
                    <div style={{
                        width: 140, height: 140,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #FFD1C1 0%, #FFB6C1 100%)', // Matching the pinkish tone in wireframe
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '2.5rem', fontWeight: 600, color: '#9D174D',
                        border: '4px solid var(--bg-app)'
                    }}>
                        <span role="img" aria-label="pen" style={{ fontSize: '2rem' }}>✏️</span>
                    </div>
                    {isEditable && (
                        <button style={{
                            position: 'absolute', bottom: 0, right: 0,
                            background: 'var(--danger)', color: 'white',
                            width: 36, height: 36, borderRadius: '50%', border: '2px solid white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer'
                        }}>
                            <Camera size={16} />
                        </button>
                    )}
                </div>

                {/* Info Section */}
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr', gap: '2rem' }}>
                    {/* Left Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ borderBottom: '1px solid var(--text-main)', paddingBottom: '0.25rem', width: 'fit-content' }}>
                            <h1 style={{ fontSize: '2rem', lineHeight: 1 }}>{name}</h1>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Login ID / Role</div>
                                <div style={{ fontWeight: 500 }}>{role}</div>
                            </div>
                            <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Email</div>
                                <div style={{ fontWeight: 500 }}>{email}</div>
                            </div>
                            <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Mobile</div>
                                <div style={{ fontWeight: 500 }}>{phone}</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'flex-start', paddingTop: '1rem' }}>
                        <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Company</div>
                            <div style={{ fontWeight: 500 }}>Dayflow Inc.</div>
                        </div>
                        <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Department</div>
                            <div style={{ fontWeight: 500 }}>{department}</div>
                        </div>
                        <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Manager</div>
                            <div style={{ fontWeight: 500 }}>{manager}</div>
                        </div>
                        <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Location</div>
                            <div style={{ fontWeight: 500 }}>{location}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
