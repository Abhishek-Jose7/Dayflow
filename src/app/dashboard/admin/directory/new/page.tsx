'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AddEmployee() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        startDate: '',
        salary: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const data = await res.json();
                // Show the generated ID and Password to the Admin
                alert(`Employee Created Successfully!\n\nLogin ID: ${data.employeeId}\nPassword: ${data.tempPassword}\n\nPlease share these credentials with the employee.`);

                router.push('/dashboard/admin/directory');
                router.refresh();
            } else {
                console.error('Failed to create employee');
                alert('Failed to create employee. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <Link href="/dashboard/admin/directory" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
                    <ArrowLeft size={20} />
                </Link>
                <h1 style={{ fontSize: '1.75rem' }}>Add New Employee</h1>
            </div>

            <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
                <Card>
                    <div style={{ display: 'grid', gap: '1.5rem', padding: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>First Name</label>
                                <Input
                                    name="firstName"
                                    placeholder="Jane"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Last Name</label>
                                <Input
                                    name="lastName"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Email Address</label>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="jane.doe@dayflow.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Phone Number</label>
                                <Input
                                    name="phone"
                                    placeholder="+1 555-0000"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Job Role</label>
                                <Input
                                    name="role"
                                    placeholder="Senior Engineer"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Department</label>
                                <Input
                                    name="department"
                                    placeholder="Engineering"
                                    value={formData.department}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Start Date</label>
                                <Input
                                    name="startDate"
                                    type="date"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Annual Salary</label>
                                <Input
                                    name="salary"
                                    type="number"
                                    placeholder="80000"
                                    value={formData.salary}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <Link href="/dashboard/admin/directory">
                                <Button type="button" variant="outline">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={isLoading} style={{ display: 'flex', gap: '0.5rem', background: 'var(--primary)' }}>
                                <Save size={18} />
                                {isLoading ? 'Saving...' : 'Save Employee'}
                            </Button>
                        </div>
                    </div>
                </Card>
            </form>
        </div>
    );
}
