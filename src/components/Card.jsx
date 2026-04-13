import React from 'react';

export default function Card({ title, description, badgeText, backgroundColor, className = '', children }) {
  const bg = backgroundColor || 'bg-[var(--color-accent)]';

  return (
    <div className={`border-[6px] border-[var(--color-border)] p-4 flex flex-col justify-between brutal-shadow-hover transition-all duration-200 ${bg} ${className}`}>
      <div className="mb-6">
        {badgeText && (
           <span className="inline-block px-2 border-2 border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-black uppercase mb-4 shadow-[2px_2px_0_0_var(--color-border)]">
             {badgeText}
           </span>
        )}
        {title && <h3 className="text-2xl md:text-3xl font-black uppercase mb-2 leading-none whitespace-normal break-words">{title}</h3>}
        {description && <p className="font-semibold text-lg border-t-4 border-[var(--color-border)] pt-2 mt-2">{description}</p>}
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
