'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export function PrivateInfoTab() {
    return (
        <Card title="Private Information">
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '3rem' }}>
                {/* Personal Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <Input label="Date of Birth" type="date" value="1990-05-15" disabled />
                    <Input label="Residing Address" value="123 Maple Street, Tech City" />
                    <Input label="Nationality" value="Indian" />
                    <Input label="Personal Email" value="alex.lewis.private@gmail.com" />
                    <Input label="Gender" value="Male" />
                    <Input label="Marital Status" value="Single" />
                    <Input label="Date of Joining" value="2023-03-15" disabled />
                </div>

                {/* Bank Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', borderBottom: '1px solid var(--border-light)' }}>Bank Details</h4>
                    <Input label="Account Number" value="123456789012" />
                    <Input label="Bank Name" value="HDFC Bank" />
                    <Input label="IFSC Code" value="HDFC0001234" />
                    <Input label="PAN No" value="ABCDE1234F" />
                    <Input label="UAN No" value="100200300400" />
                    <Input label="Emp Code" value="EMP-2024-042" disabled />
                </div>
            </div>
        </Card>
    );
}
