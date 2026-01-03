'use client';

import React from 'react';

interface TabProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    tabs: string[];
}

export function ProfileTabs({ activeTab, setActiveTab, tabs }: TabProps) {
    return (
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-light)' }}>
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                        padding: '1rem 2rem',
                        background: activeTab === tab ? 'var(--bg-card)' : 'transparent',
                        border: activeTab === tab ? '1px solid var(--text-main)' : '1px solid transparent',
                        borderBottom: activeTab === tab ? 'none' : '1px solid transparent',
                        borderRadius: '4px 4px 0 0',
                        fontWeight: 600,
                        color: activeTab === tab ? 'var(--text-main)' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        position: 'relative',
                        bottom: '-1px',
                        fontSize: '1rem'
                    }}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
