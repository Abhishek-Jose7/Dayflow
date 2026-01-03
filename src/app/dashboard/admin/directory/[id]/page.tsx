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
    const [employee, setEmployee] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            if (!params.id) return;
            try {
                const res = await fetch(`/api/admin/employees/${params.id}`);
                const data = await res.json();
                if (data.success) {
                    setEmployee(data.data);
                }
            } catch (err) {
                console.error('Error fetching employee:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployee();
    }, [params.id]);

    const [showEditModal, setShowEditModal] = React.useState(false);
    const [editForm, setEditForm] = React.useState({ designation: '', department: '', phone: '' });

    const handleUpdateClick = () => {
        if (employee) {
            setEditForm({
                designation: employee.role,
                department: employee.dept,
                phone: employee.phone
            });
            setShowEditModal(true);
        }
    };

    const handleSaveUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/admin/employees/${employee?.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm)
            });
            const data = await res.json();
            if (data.success) {
                alert('Employee record updated successfully');
                setShowEditModal(false);
                // Ideally refresh data here
                setEmployee(prev => prev ? ({ ...prev, role: editForm.designation, dept: editForm.department, phone: editForm.phone }) : null);
            } else {
                alert('Failed to update');
            }
        } catch (err) {
            alert('Error updating record');
        }
    };

    if (loading) return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading...</div>;

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
                employeeId={employee.employeeId}
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
                {activeTab === 'Salary Info' && <SalaryInfoTab isAdmin={true} salary={employee.salary} employeeId={employee.id} />}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <Button variant="outline" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>Terminate Employment</Button>
                <Button onClick={handleUpdateClick}>Update Employee Record</Button>
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
                }}>
                    <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', width: '500px' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Update Employment Record</h2>
                        <form onSubmit={handleSaveUpdate}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Designation / Role</label>
                                <input
                                    value={editForm.designation}
                                    onChange={e => setEditForm({ ...editForm, designation: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-light)', borderRadius: '4px' }}
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Department</label>
                                <input
                                    value={editForm.department}
                                    onChange={e => setEditForm({ ...editForm, department: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-light)', borderRadius: '4px' }}
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Phone</label>
                                <input
                                    value={editForm.phone}
                                    onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-light)', borderRadius: '4px' }}
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <Button type="button" variant="ghost" onClick={() => setShowEditModal(false)}>Cancel</Button>
                                <Button type="submit">Save Changes</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
