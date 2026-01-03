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
    const [employee, setEmployee] = useState<any | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const stored = localStorage.getItem('currentUser');
            if (stored) {
                const user = JSON.parse(stored);
                try {
                    const res = await fetch(`/api/employee/profile?email=${encodeURIComponent(user.email)}`);
                    const data = await res.json();
                    if (data.success) {
                        setEmployee(data.data);
                    } else {
                        // Fallback logic could be logged here
                        console.error(data.error);
                    }
                } catch (err) {
                    console.error("Failed to fetch profile");
                }
            }
        };

        fetchProfile();
    }, []);

    if (!employee) return <div>Loading...</div>;

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '3rem' }}>
            <ProfileHeader
                name={employee.name}
                role={employee.role}
                employeeId={employee.employeeId}
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
                {activeTab === 'Resume' && <ResumeTab about={employee.about} skills={employee.skills} isEditable={true} />}
                {activeTab === 'Private Info' && <PrivateInfoTab details={employee.private} />}
                {activeTab === 'Salary Info' && <SalaryInfoTab isAdmin={false} salary={employee.salary} employeeId={employee.id} />}
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
