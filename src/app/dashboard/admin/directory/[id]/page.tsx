'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { ResumeTab } from '@/components/profile/ResumeTab';
import { PrivateInfoTab } from '@/components/profile/PrivateInfoTab';
import { SalaryInfoTab } from '@/components/profile/SalaryInfoTab';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

// Mock Data (In real app, fetch based on ID)
const EMPLOYEE_DATA = {
    name: "Sarah Wilson",
    role: "Product Designer",
    employeeId: "EMP-2024-089",
    email: "sarah.wilson@dayflow.com",
    phone: "+1 (555) 987-6543",
    department: "Design",
    manager: "Alex Lewis",
    location: "New York, NY"
};

export default function AdminEmployeeProfile() {
    const params = useParams();
    const [activeTab, setActiveTab] = useState('Salary Info'); // Default to Salary Info for Admin as requested? Or Private. Let's default to Resume or Salary.

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '3rem' }}>
            <div style={{ marginBottom: '1rem' }}>
                <Link href="/dashboard/admin/directory" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    &larr; Back to Directory
                </Link>
            </div>

            <ProfileHeader {...EMPLOYEE_DATA} />

            <ProfileTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={['Resume', 'Private Info', 'Salary Info']}
            />

            <div className="fade-in">
                {activeTab === 'Resume' && <ResumeTab />}
                {activeTab === 'Private Info' && <PrivateInfoTab />}
                {activeTab === 'Salary Info' && <SalaryInfoTab isAdmin={true} />}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <Button variant="outline" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>Terminate Employment</Button>
                <Button>Update Employee Record</Button>
            </div>
        </div>
    );
}
