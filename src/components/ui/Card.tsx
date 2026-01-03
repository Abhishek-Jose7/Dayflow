import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    padding?: string;
    interactive?: boolean;
    glass?: boolean;
}

export function Card({ children, className, title, padding = '1.5rem', interactive, glass }: CardProps) {
    const baseClasses = `card ${glass ? 'glass' : ''} ${interactive ? 'hover-lift' : ''} ${className || ''}`;

    return (
        <div
            className={baseClasses}
            style={{
                padding,
                cursor: interactive ? 'pointer' : undefined,
                border: glass ? undefined : '1px solid var(--border-light)'
            }}
        >
            {title && (
                <h3 style={{
                    marginBottom: '1rem',
                    paddingBottom: '0.75rem',
                    borderBottom: '1px solid var(--border-light)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
}
