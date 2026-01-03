'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProfileField } from './ProfileField';

export function SecurityTab() {
    return (
        <Card title="Security Settings">
            <div style={{ maxWidth: '500px' }}>
                <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Change Password</h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <ProfileField label="Current Password" type="password" placeholder="••••••••" />
                    <ProfileField label="New Password" type="password" placeholder="••••••••" />
                    <ProfileField label="Confirm New Password" type="password" placeholder="••••••••" />

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <Button>Update Password</Button>
                    </div>
                </div>

                <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-light)' }}>
                    <h4 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Two-Factor Authentication</h4>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontWeight: 500 }}>Authenticator App</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Secure your account with TOTP.</div>
                        </div>
                        <Button variant="outline">Valid</Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
