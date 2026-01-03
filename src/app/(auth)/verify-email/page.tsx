'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';

export default function VerifyEmailPage() {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-app)', padding: '1rem' }}>
            <div style={{
                background: 'var(--bg-card)',
                padding: '3rem',
                borderRadius: 'var(--radius-lg)',
                maxWidth: '500px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border-light)'
            }} className="fade-in">
                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                        width: 64, height: 64,
                        borderRadius: '50%',
                        background: '#DEF7EC',
                        color: '#03543F',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <CheckCircle size={32} />
                    </div>
                </div>

                <h1 style={{ marginBottom: '1rem', fontSize: '1.75rem' }}>Verify your Email</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
                    We've sent a verification link to your email address. Please click on that link to verify your account and access the dashboard.
                </p>

                <div style={{ marginBottom: '2rem', padding: '1rem', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}>
                    Did not receive the email? Check your spam folder or
                    <button style={{ color: 'var(--primary)', fontWeight: 600, border: 'none', background: 'none', cursor: 'pointer', marginLeft: '5px' }}>
                        Resend Email
                    </button>
                </div>

                <Link href="/login">
                    <Button fullWidth>Back to Login</Button>
                </Link>

            </div>
        </div>
    );
}
