import React from 'react';

interface ProfileFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export function ProfileField({ label, ...props }: ProfileFieldProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '0.5rem' }}>
            <label style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                marginBottom: '0.25rem'
            }}>
                {label}
            </label>
            <input
                style={{
                    border: 'none',
                    borderBottom: '1px solid var(--border-light)',
                    background: 'transparent',
                    padding: '0.5rem 0',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: 'var(--text-main)',
                    width: '100%',
                    outline: 'none'
                }}
                {...props}
            />
        </div>
    );
}
