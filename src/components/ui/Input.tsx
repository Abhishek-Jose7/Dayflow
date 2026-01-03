import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({ label, error, className, style, ...props }: InputProps) {
    return (
        <div style={{ marginBottom: '1rem', width: '100%' }}>
            {label && (
                <label
                    style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)'
                    }}
                >
                    {label}
                </label>
            )}
            <input
                style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${error ? 'var(--danger)' : 'var(--border-light)'}`,
                    outline: 'none',
                    fontSize: '0.95rem',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-main)',
                    ...style
                }}
                className={className}
                {...props}
            />
            {error && (
                <span style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>
                    {error}
                </span>
            )}
        </div>
    );
}
