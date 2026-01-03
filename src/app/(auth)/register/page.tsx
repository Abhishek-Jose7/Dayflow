'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        empId: '',
        email: '',
        password: '',
        role: 'Employee'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                // Success: Redirect to verify email
                router.push('/verify-email');
            } else {
                // Handle error
                const data = await res.json();
                alert(data.error || 'Registration failed');
            }
        } catch (error) {
            alert('An unexpected error occurred');
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Brand Side - Same as Login */}
            <div style={{
                flex: 1,
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '3rem',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }} className="hidden-mobile">
                <div style={{ zIndex: 2 }}>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'white' }}>Join Dayflow.</h1>
                    <p style={{ fontSize: '1.5rem', opacity: 0.9 }}>Start your journey with us.</p>
                </div>
            </div>

            {/* Form Side */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-card)',
                padding: '2rem'
            }}>
                <div style={{ width: '100%', maxWidth: '400px' }} className="fade-in">
                    <h2 style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>Create Account</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Enter your details to get started.</p>

                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Employee ID"
                            name="empId"
                            placeholder="e.g., EMP-2024-001"
                            value={formData.empId}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Email Address"
                            type="email"
                            name="email"
                            placeholder="e.g., mail@dayflow.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>Role</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                style={{
                                    width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border-light)', outline: 'none',
                                    background: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '0.95rem'
                                }}
                            >
                                <option value="Employee">Employee</option>
                                <option value="HR">HR / Admin</option>
                            </select>
                        </div>

                        <Button type="submit" fullWidth>
                            Create Account
                        </Button>
                    </form>

                    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Already have an account? <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 500 }}>Sign in</Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @media (max-width: 768px) {
          .hidden-mobile {
            display: none !important;
          }
        }
      `}</style>
        </div>
    );
}
