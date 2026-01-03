'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { ResumeTab } from '@/components/profile/ResumeTab';
import { PrivateInfoTab } from '@/components/profile/PrivateInfoTab';
import { SalaryInfoTab } from '@/components/profile/SalaryInfoTab';
import { SecurityTab } from '@/components/profile/SecurityTab';
import { EMPLOYEES } from '@/lib/mock-data';

export default function EmployeeProfile() {
    const [activeTab, setActiveTab] = useState('Private Info');
    const [employee, setEmployee] = useState<typeof EMPLOYEES[0] | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('currentUser');
        if (stored) {
            const user = JSON.parse(stored);
            // In a real app, we'd fetch from API. Here we match the ID/Email from Mock Data
            // user.id from login response is EMP-001 format or similar.
            // Our mock data IDs are '1', '2'. 
            // The Login API returns `id: user.profile?.employeeId` which is `EMP-001`.
            // Let's strip 'EMP-' and parse int to find in mock data, or search by email.

            const found = EMPLOYEES.find(e => e.email === user.email);
            if (found) setEmployee(found);
            // Fallback to Alex if not found (e.g. admin login viewing employee view?)
            else if (EMPLOYEES[0]) setEmployee(EMPLOYEES[0]);
        }
    }, []);

    if (!employee) return <div>Loading...</div>;

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '3rem' }}>
            <ProfileHeader
                name={employee.name}
                role={employee.role}
                employeeId={`EMP-${employee.id.padStart(3, '0')}`}
                email={employee.email}
                phone={employee.phone}
                department={employee.dept}
                manager={employee.manager}
                location={employee.location}
                isEditable={true}
            />

            <ProfileTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={['Resume', 'Private Info', 'Salary Info', 'Security']}
            />

            <div className="fade-in">
                {activeTab === 'Resume' && <ResumeTab about={employee.about} skills={employee.skills} />}
                {activeTab === 'Private Info' && <PrivateInfoTab details={employee.private} />}
                {activeTab === 'Salary Info' && <SalaryInfoTab isAdmin={false} salary={employee.salary} />}
                {activeTab === 'Security' && <SecurityTab />}
            </div>

            {activeTab === 'Private Info' && (
                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                </div>
            )}
        </div>
    );
}
