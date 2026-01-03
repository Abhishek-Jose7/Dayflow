'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Bell, Search } from 'lucide-react';

export function Header() {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);
    const currentSegment = segments[segments.length - 1];

    const formatTitle = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const title = currentSegment ? formatTitle(currentSegment) : 'Dashboard';

    return (
        <header style={{
            height: 'var(--header-height)',
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'var(--glass-blur)',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            position: 'sticky',
            top: 0,
            zIndex: 10
        }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{title}</h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                {/* Search Bar - hidden on mobile usually */}
                <div style={{ position: 'relative', width: '300px' }}>
                    <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input
                        type="text"
                        placeholder="Search..."
                        style={{
                            width: '100%',
                            padding: '0.5rem 1rem 0.5rem 2.5rem',
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid var(--border-light)',
                            outline: 'none',
                            background: 'var(--bg-app)',
                            fontSize: '0.875rem'
                        }}
                    />
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}>
                        <Bell size={20} color="var(--text-secondary)" />
                        <span style={{
                            position: 'absolute',
                            top: '-2px',
                            right: '-2px',
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: 'var(--danger)'
                        }} />
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 600 }}>
                            JD
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>John Doe</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>HR Manager</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
