import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    padding?: string;
}

export function Card({ children, className, title, padding = '1.5rem' }: CardProps) {
    return (
        <div
            className={`card ${className || ''}`}
            style={{ padding }}
        >
            {title && (
                <h3 style={{ marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-light)' }}>
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
}
