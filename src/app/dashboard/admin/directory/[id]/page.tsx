'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { ResumeTab } from '@/components/profile/ResumeTab';
import { PrivateInfoTab } from '@/components/profile/PrivateInfoTab';
import { SalaryInfoTab } from '@/components/profile/SalaryInfoTab';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { EMPLOYEES } from '@/lib/mock-data';

export default function AdminEmployeeProfile() {
    const params = useParams();
    const [activeTab, setActiveTab] = useState('Salary Info');
    const [employee, setEmployee] = useState<typeof EMPLOYEES[0] | null>(null);

    useEffect(() => {
        // Find employee by ID from params
        if (params.id) {
            const found = EMPLOYEES.find(e => e.id === params.id);
            if (found) setEmployee(found);
        }
    }, [params.id]);

    if (!employee) {
        return (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
                <h2>Employee Not Found</h2>
                <Link href="/dashboard/admin/directory">
                    <Button variant="outline" style={{ marginTop: '1rem' }}>Back to Directory</Button>
                </Link>
            </div>
        )
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '3rem' }}>
            <div style={{ marginBottom: '1rem' }}>
                <Link href="/dashboard/admin/directory" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    &larr; Back to Directory
                </Link>
            </div>

            <ProfileHeader
                name={employee.name}
                role={employee.role}
                employeeId={`EMP-${employee.id.padStart(3, '0')}`}
                email={employee.email}
                phone={employee.phone}
                department={employee.dept}
                manager={employee.manager}
                location={employee.location}
            />

            <ProfileTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={['Resume', 'Private Info', 'Salary Info']}
            />

            <div className="fade-in">
                {activeTab === 'Resume' && <ResumeTab about={employee.about} skills={employee.skills} />}
                {activeTab === 'Private Info' && <PrivateInfoTab details={employee.private} />}
                {activeTab === 'Salary Info' && <SalaryInfoTab isAdmin={true} salary={employee.salary} />}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <Button variant="outline" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>Terminate Employment</Button>
                <Button>Update Employee Record</Button>
            </div>
        </div>
    );
}
