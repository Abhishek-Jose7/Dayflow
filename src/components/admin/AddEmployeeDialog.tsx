'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Plus, X } from 'lucide-react';

import { createPortal } from 'react-dom';

interface AddEmployeeDialogProps {
    show: boolean;
    onClose: () => void;
}

export default function AddEmployeeDialog({ show, onClose }: AddEmployeeDialogProps) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: 'Engineering',
        designation: 'Developer',
        joinDate: ''
    });
    const [newCreds, setNewCreds] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/admin/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                setNewCreds(data.data);
            } else {
                alert(data.error);
            }
        } catch (err) {
            alert('Failed to create employee');
        } finally {
            setLoading(false);
        }
    };

    if (!show) return null;

    const modalContent = (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.65)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                padding: '20px'
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                className="scale-in-center"
                style={{
                    background: 'var(--bg-card)',
                    padding: '2.5rem',
                    borderRadius: 'var(--radius-lg)',
                    width: '600px',
                    maxWidth: '100%',
                    maxHeight: 'calc(100vh - 40px)',
                    overflowY: 'auto',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    position: 'relative'
                }}
            >
                {/* Header with close button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Create New Employee Account</h2>
                    <button
                        type="button"
                        onClick={() => {
                            setNewCreds(null);
                            onClose();
                        }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                    >
                        <X size={24} />
                    </button>
                </div>

                {!newCreds ? (
                    <form onSubmit={handleCreate}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <Input
                                label="First Name"
                                value={formData.firstName}
                                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                required
                            />
                            <Input
                                label="Last Name"
                                value={formData.lastName}
                                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <Input
                                label="Email Address"
                                type="email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Department</label>
                                <select
                                    value={formData.department}
                                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                                    style={{ width: '100%', padding: '0.625rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.9rem', background: 'var(--bg-app)', color: 'var(--text-main)', outline: 'none' }}
                                >
                                    <option>Engineering</option>
                                    <option>Product</option>
                                    <option>Finance</option>
                                    <option>HR</option>
                                    <option>Marketing</option>
                                    <option>Sales</option>
                                </select>
                            </div>
                            <Input
                                label="Designation"
                                value={formData.designation}
                                onChange={e => setFormData({ ...formData, designation: e.target.value })}
                                required
                            />
                            <Input
                                label="Join Date"
                                type="date"
                                value={formData.joinDate}
                                onChange={e => setFormData({ ...formData, joinDate: e.target.value })}
                                required
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
                            <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>Cancel</Button>
                            <Button type="submit" disabled={loading} style={{ minWidth: '140px' }}>{loading ? 'Creating Account...' : 'Create Account'}</Button>
                        </div>
                    </form>
                ) : (
                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Account Created!</h2>
                        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Credentials for <b>{newCreds.email}</b>
                        </p>
                        <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', textAlign: 'left' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', fontWeight: 700 }}>Employee ID</div>
                                    <div style={{ fontFamily: 'monospace', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>{newCreds.employeeId}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', fontWeight: 700 }}>Temp Password</div>
                                    <div style={{ fontFamily: 'monospace', fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1px' }}>{newCreds.tempPassword}</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', color: '#92400E', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.85rem', display: 'flex', gap: '10px', textAlign: 'left' }}>
                            <span style={{ fontSize: '1.2rem' }}>⚠️</span>
                            <span>Important: Please share these credentials securely. The password will not be displayed again for security reasons.</span>
                        </div>
                        <Button fullWidth onClick={() => { setNewCreds(null); onClose(); }} style={{ padding: '0.75rem 0', fontSize: '1rem' }}>
                            I have saved the credentials
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );

    return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
