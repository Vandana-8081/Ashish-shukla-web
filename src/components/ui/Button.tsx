import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: 'arrow' | 'external' | 'none';
  children: React.ReactNode;
  className?: string;
}

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  icon = 'none',
  children,
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition duration-200 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A]';

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 rounded-lg',
    md: 'text-sm px-5 py-2.5 gap-2 rounded-lg',
    lg: 'text-base px-6 py-3.5 gap-2.5 rounded-lg',
  };

  const variantClasses = {
    primary:
      'bg-[#F5660A] text-white hover:bg-[#D45300] shadow-xs active:translate-y-[1px]',
    secondary:
      'bg-white text-[#151210] border border-[#E8E2D8] hover:border-[#F5660A] hover:text-[#F5660A] hover:bg-[#FFF5E9] active:translate-y-[1px]',
    outline:
      'border border-[#F5660A] text-[#F5660A] hover:bg-[#F5660A] hover:text-white active:translate-y-[1px]',
    dark:
      'bg-[#D45300] text-white hover:bg-[#B84300] active:translate-y-[1px]',
    ghost:
      'text-[#151210] hover:text-[#F5660A] hover:bg-black/5 p-0',
  };

  const classes = cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  const iconElement =
    icon === 'arrow' ? (
      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
    ) : icon === 'external' ? (
      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    ) : null;

  if (href) {
    const isExternal = href.startsWith('http');
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          <span>{children}</span>
          {iconElement}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        <span>{children}</span>
        {iconElement}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      <span>{children}</span>
      {iconElement}
    </button>
  );
}
