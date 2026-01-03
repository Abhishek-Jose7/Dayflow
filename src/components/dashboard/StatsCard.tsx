import React from 'react';
import { Card } from '@/components/ui/Card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    label: string;
    value: string;
    icon: LucideIcon;
    color?: string;
    subText?: string;
    trend?: 'positive' | 'negative' | 'neutral';
}

/**
 * Reusable Stats Card Component - Enhances Modularity
 * Centralizes the design logic for dashboard metrics.
 */
export function StatsCard({ label, value, icon: Icon, color = 'var(--primary)', subText, trend }: StatsCardProps) {
    return (
        <Card padding="1.5rem" interactive>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{
                    width: '40px', height: '40px',
                    borderRadius: 'var(--radius-md)',
                    background: `${color}20`, // 20 simulates opacity
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: color
                }}>
                    <Icon size={20} />
                </div>
                {subText && (
                    <span style={{
                        fontSize: '0.75rem',
                        background: 'var(--bg-app)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        color: trend === 'positive' ? 'var(--success)' : 'var(--text-secondary)'
                    }}>
                        {subText}
                    </span>
                )}
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.25rem' }}>{value}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{label}</div>
        </Card>
    );
}
