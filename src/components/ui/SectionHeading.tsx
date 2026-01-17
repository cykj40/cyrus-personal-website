import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, className }) => {
  return (
    <div className={cn('mb-12 text-center', className)}>
      <h2 className="mb-3 text-4xl font-bold text-forest-900 sm:text-5xl">{title}</h2>
      {subtitle && <p className="mx-auto max-w-2xl text-lg text-earth-500">{subtitle}</p>}
    </div>
  );
};
