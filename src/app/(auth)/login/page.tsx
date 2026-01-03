'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            setIsLoading(false);

            if (data.success) {
                // Store Session
                localStorage.setItem('currentUser', JSON.stringify(data.user));

                // Redirect based on Role
                if (data.user.role === 'ADMIN') {
                    router.push('/dashboard/admin');
                } else {
                    router.push('/dashboard/employee');
                }
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setIsLoading(false);
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', width: '100vw' }}>
            {/* Brand Side */}
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
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'white' }}>Dayflow.</h1>
                    <p style={{ fontSize: '1.5rem', opacity: 0.9 }}>Every workday, perfectly aligned.</p>
                </div>

                {/* Abstract Pattern Circle */}
                <div style={{
                    position: 'absolute',
                    bottom: '-10%',
                    right: '-10%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    zIndex: 1
                }} />
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
                    <h2 style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Please enter your details to sign in.
                        <br />
                        <small>(Try: admin@dayflow.com / admin)</small>
                    </p>

                    <form onSubmit={handleLogin}>
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="e.g., mail@dayflow.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {error && (
                            <div style={{
                                color: 'var(--danger)',
                                marginBottom: '1rem',
                                fontSize: '0.875rem',
                                background: '#FEF2F2',
                                padding: '0.5rem',
                                borderRadius: 'var(--radius-sm)'
                            }}>
                                {error}
                            </div>
                        )}

                        <Button type="button" variant="ghost" style={{ fontSize: '0.875rem', marginBottom: '1.5rem', padding: 0, color: 'var(--primary)' }}>
                            Forgot password?
                        </Button>

                        <Button type="submit" fullWidth isLoading={isLoading}>
                            Sign In
                        </Button>
                    </form>

                    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Don't have an account? <Link href="/register" style={{ color: 'var(--primary)', fontWeight: 500 }}>Sign up</Link>
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
