'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Settings, Save, X, Calculator } from 'lucide-react';

interface SalaryConfig {
    monthlyWage: number;
    basicRate: number;
    hraRate: number;
    standardAllowance: number;
    performanceBonusRate: number;
    ltaRate: number;
    pfRate: number;
    professionalTax: number;
}

interface SalaryDetails {
    basic: string;
    hra: string;
    special: string;
    fixedAllowance: string;
    bonus: string;
    lta: string;
    pf: string;
    profTax: string;
    totalMonth: string;
    totalYear: string;
    config: SalaryConfig;
}

interface SalaryInfoTabProps {
    isAdmin: boolean;
    salary: SalaryDetails;
    employeeId: string; // Internal DB ID needed for API
}

export function SalaryInfoTab({ isAdmin, salary: initialSalary, employeeId }: SalaryInfoTabProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [config, setConfig] = useState<SalaryConfig>(initialSalary.config);
    const [calculated, setCalculated] = useState(initialSalary);
    const [loading, setLoading] = useState(false);

    // Auto-calculate components when config changes
    useEffect(() => {
        const wage = config.monthlyWage || 0;
        const basic = wage * config.basicRate;
        const hra = basic * config.hraRate;
        const standard = config.standardAllowance;
        const bonus = wage * config.performanceBonusRate;
        const lta = wage * config.ltaRate;
        const fixed = Math.max(0, wage - (basic + hra + standard + bonus + lta));

        const pf = basic * config.pfRate;
        const totalMonth = wage;
        const totalYear = wage * 12;

        setCalculated({
            ...calculated,
            basic: basic.toLocaleString(),
            hra: hra.toLocaleString(),
            special: standard.toLocaleString(),
            fixedAllowance: fixed.toLocaleString(),
            bonus: bonus.toLocaleString(),
            lta: lta.toLocaleString(),
            pf: pf.toLocaleString(),
            profTax: config.professionalTax.toLocaleString(),
            totalMonth: totalMonth.toLocaleString(),
            totalYear: totalYear.toLocaleString(),
            config: config
        });
    }, [config]);

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/employees/${employeeId}/salary`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });
            const data = await res.json();
            if (data.success) {
                setIsEditing(false);
                // In a real app, we might want to trigger a refresh of the parent data
            } else {
                alert(data.error);
            }
        } catch (err) {
            alert('Failed to save salary configuration');
        } finally {
            setLoading(false);
        }
    };

    if (!isAdmin) {
        return (
            <Card>
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Restricted Access</h3>
                    <p>Detailed salary configuration is visible only to Administrators.</p>
                    <p>Please check your <strong>My Payroll</strong> dashboard for your payslips.</p>
                </div>
            </Card>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Configuration Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Salary Structure</h3>
                {!isEditing ? (
                    <Button variant="outline" onClick={() => setIsEditing(true)} style={{ display: 'flex', gap: '0.5rem' }}>
                        <Settings size={16} /> Update Salary Configuration
                    </Button>
                ) : (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Button variant="ghost" onClick={() => setIsEditing(false)} disabled={loading}>
                            <X size={16} style={{ marginRight: '0.5rem' }} /> Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={loading}>
                            <Save size={16} style={{ marginRight: '0.5rem' }} /> {loading ? 'Saving...' : 'Save Configuration'}
                        </Button>
                    </div>
                )}
            </div>

            {/* Wage Input (Admin Only) */}
            {isEditing && (
                <Card title="Configuration Mode" padding="1.5rem">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <Input
                            label="Monthly Gross Wage (₹)"
                            type="number"
                            value={config.monthlyWage}
                            onChange={(e) => setConfig({ ...config, monthlyWage: parseFloat(e.target.value) || 0 })}
                        />
                        <Input
                            label="Standard Allowance (Fixed ₹)"
                            type="number"
                            value={config.standardAllowance}
                            onChange={(e) => setConfig({ ...config, standardAllowance: parseFloat(e.target.value) || 0 })}
                        />
                        <Input
                            label="Professional Tax (Fixed ₹)"
                            type="number"
                            value={config.professionalTax}
                            onChange={(e) => setConfig({ ...config, professionalTax: parseFloat(e.target.value) || 0 })}
                        />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>BASIC RATE (OF WAGE)</label>
                            <select
                                value={config.basicRate}
                                onChange={e => setConfig({ ...config, basicRate: parseFloat(e.target.value) })}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}
                            >
                                <option value={0.4}>40%</option>
                                <option value={0.5}>50%</option>
                                <option value={0.6}>60%</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>HRA RATE (OF BASIC)</label>
                            <select
                                value={config.hraRate}
                                onChange={e => setConfig({ ...config, hraRate: parseFloat(e.target.value) })}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}
                            >
                                <option value={0.4}>40%</option>
                                <option value={0.5}>50%</option>
                            </select>
                        </div>
                        <Input
                            label="PF RATE (%)"
                            type="number"
                            value={config.pfRate * 100}
                            onChange={(e) => setConfig({ ...config, pfRate: (parseFloat(e.target.value) || 0) / 100 })}
                        />
                    </div>
                </Card>
            )}

            {/* Wage Overview */}
            <Card title="Wage Overview">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                    <div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Month Gross Wage</div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--primary)' }}>₹ {calculated.totalMonth}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Yearly Gross Wage</div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>₹ {calculated.totalYear}</div>
                    </div>
                </div>
            </Card>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)', gap: '2rem' }}>
                {/* Salary Components */}
                <Card title="Salary Components">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <SalaryRow label="Basic Salary" value={calculated.basic} percent={`${(config.basicRate * 100).toFixed(0)}%`} desc="Calculated as percentage of Gross Wage" />
                        <SalaryRow label="House Rent Allowance" value={calculated.hra} percent={`${(config.hraRate * 100).toFixed(0)}%`} desc="Calculated as percentage of Basic" />
                        <SalaryRow label="Standard Allowance" value={calculated.special} type="FIXED" desc="Fixed monthly standard allowance" />
                        <SalaryRow label="Performance Bonus" value={calculated.bonus} percent={`${(config.performanceBonusRate * 100).toFixed(2)}%`} desc="Percentage of Gross Wage" />
                        <SalaryRow label="Leave Travel Allowance" value={calculated.lta} percent={`${(config.ltaRate * 100).toFixed(2)}%`} desc="Percentage of Gross Wage" />
                        <SalaryRow label="Fixed Allowance" value={calculated.fixedAllowance} type="VAR" desc="Balance (Wage - sum of all components)" highlight />
                    </div>
                </Card>

                {/* Deductions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <Card title="Monthly Deductions">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
                                <div>
                                    <div style={{ fontWeight: 600 }}>Provident Fund (PF)</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Employee Contribution ({(config.pfRate * 100).toFixed(1)}% of Basic)</div>
                                </div>
                                <span style={{ fontWeight: 700, color: 'var(--danger)' }}>- ₹ {calculated.pf}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
                                <div>
                                    <div style={{ fontWeight: 600 }}>Professional Tax</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Fixed Monthly Tax</div>
                                </div>
                                <span style={{ fontWeight: 700, color: 'var(--danger)' }}>- ₹ {calculated.profTax}</span>
                            </div>
                        </div>
                    </Card>

                    <Card style={{ background: 'var(--primary-light)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase' }}>Estimated Net Take-Home</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>₹ {(config.monthlyWage - (parseFloat(calculated.pf.replace(/,/g, '')) || 0) - config.professionalTax).toLocaleString()}</div>
                            </div>
                            <Calculator size={32} color="var(--primary)" style={{ opacity: 0.3 }} />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function SalaryRow({ label, value, percent, type, desc, highlight }: { label: string, value: string, percent?: string, type?: string, desc: string, highlight?: boolean }) {
    return (
        <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 500, color: highlight ? 'var(--primary)' : 'inherit' }}>{label}</span>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700 }}>₹ {value}</span>
                    {percent && (
                        <span style={{ fontSize: '0.7rem', background: 'var(--bg-app)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>{percent}</span>
                    )}
                    {type && (
                        <span style={{ fontSize: '0.7rem', border: '1px solid var(--border-light)', padding: '1px 6px', borderRadius: '4px', color: 'var(--text-secondary)' }}>{type}</span>
                    )}
                </div>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{desc}</div>
        </div>
    );
}
