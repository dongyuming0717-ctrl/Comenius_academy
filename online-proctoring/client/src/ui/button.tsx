import * as React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

const variantClasses: Record<string, string> = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  outline: 'border border-border bg-background hover:bg-muted/50 text-foreground',
  ghost: 'hover:bg-muted/50 text-foreground',
};

const sizeClasses: Record<string, string> = {
  default: 'h-10 px-4 py-2',
  sm: 'h-8 px-3 text-xs',
  lg: 'h-11 px-8',
};

export function Button({
  variant = 'default',
  size = 'default',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
}
