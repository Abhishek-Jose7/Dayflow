import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-app)' }}>
            <Sidebar />
            <div style={{
                marginLeft: 'var(--sidebar-width)',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                width: 'calc(100vw - var(--sidebar-width))'
            }}>
                <Header />
                <main style={{
                    padding: '2rem',
                    flex: 1,
                    width: '100%',
                    overflowY: 'auto'
                }}>
                    <div className="container fade-in">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
