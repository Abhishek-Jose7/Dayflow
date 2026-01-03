import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'danger';
    fullWidth?: boolean;
    isLoading?: boolean;
}

export function Button({ variant = 'primary', fullWidth, isLoading, className, children, ...props }: ButtonProps) {
    const baseClass = 'btn';

    let variantClass = '';
    switch (variant) {
        case 'primary': variantClass = 'btn-primary'; break;
        case 'outline': variantClass = 'btn-outline'; break;
        case 'danger': variantClass = 'btn-danger'; break; // Need to add this to globals or inline
    }

    return (
        <button
            className={`${baseClass} ${variantClass} ${className || ''}`}
            style={{
                width: fullWidth ? '100%' : undefined,
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                backgroundColor: variant === 'danger' ? 'var(--danger)' : undefined,
                color: variant === 'danger' ? 'white' : undefined,
            }}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? '...' : children}
        </button>
    );
}
