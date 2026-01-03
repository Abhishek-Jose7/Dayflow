'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

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
        <Card title="Private Information">
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '3rem' }}>
                {/* Personal Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <Input label="Date of Birth" type="date" value={details.dob} readOnly />
                    <Input label="Residing Address" value={details.address} readOnly />
                    <Input label="Nationality" value={details.nationality} readOnly />
                    <Input label="Personal Email" value={details.personalEmail} readOnly />
                    <Input label="Gender" value={details.gender} readOnly />
                    <Input label="Marital Status" value={details.maritalStatus} readOnly />
                    <Input label="Date of Joining" value="2022-03-15" readOnly />
                </div>

                {/* Bank Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', borderBottom: '1px solid var(--border-light)' }}>Bank Details</h4>
                    <Input label="Account Number" value={bank.acc} readOnly />
                    <Input label="Bank Name" value={bank.name} readOnly />
                    <Input label="IFSC Code" value={bank.ifsc} readOnly />
                    <Input label="PAN No" value={bank.pan} readOnly />
                    <Input label="UAN No" value={bank.uan} readOnly />
                    <Input label="Emp Code" value="EMP-2024-042" readOnly />
                </div>
            </div>
        </Card>
    );
}
