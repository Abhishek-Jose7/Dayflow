'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { ProfileField } from './ProfileField';

interface PrivateInfoProps {
    details: {
        dob: string;
        address: string;
        nationality: string;
        personalEmail: string;
        gender: string;
        maritalStatus: string;
        bankIndex: number;
    };
}

export function PrivateInfoTab({ details }: PrivateInfoProps) {
    // Mock Bank Details based on index to vary them slightly
    const banks = [
        { acc: '123456789012', name: 'HDFC Bank', ifsc: 'HDFC0001234', pan: 'ABCDE1234F', uan: '100200300400' },
        { acc: '987654321098', name: 'ICICI Bank', ifsc: 'ICIC0005678', pan: 'FGHIJ5678K', uan: '100200300401' },
        { acc: '456123789056', name: 'SBI', ifsc: 'SBIN0009012', pan: 'KLMNO9012P', uan: '100200300402' },
        { acc: '789456123012', name: 'Axis Bank', ifsc: 'UTIB0003456', pan: 'QRSTU3456V', uan: '100200300403' },
    ];
    const bank = banks[details.bankIndex] || banks[0];

    return (
        <Card title="Private Information" padding="2rem">
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '4rem' }}>
                {/* Personal Info Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <ProfileField label="Date of Birth" type="date" value={details.dob} readOnly />
                    <ProfileField label="Residing Address" value={details.address} readOnly />
                    <ProfileField label="Nationality" value={details.nationality} readOnly />
                    <ProfileField label="Personal Email" value={details.personalEmail} readOnly />
                    <ProfileField label="Gender" value={details.gender} readOnly />
                    <ProfileField label="Marital Status" value={details.maritalStatus} readOnly />
                    <ProfileField label="Date of Joining" value="2022-03-15" readOnly />
                </div>

                {/* Bank Info Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Bank Details</h4>
                    </div>

                    <ProfileField label="Account Number" value={bank.acc} readOnly />
                    <ProfileField label="Bank Name" value={bank.name} readOnly />
                    <ProfileField label="IFSC Code" value={bank.ifsc} readOnly />
                    <ProfileField label="PAN No" value={bank.pan} readOnly />
                    <ProfileField label="UAN NO" value={bank.uan} readOnly />
                    <ProfileField label="Emp Code" value="EMP-2024-042" readOnly />
                </div>
            </div>
        </Card>
    );
}
