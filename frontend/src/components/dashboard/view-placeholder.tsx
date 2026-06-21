import React from "react";

interface ViewPlaceholderProps {
  title: string;
}

export function ViewPlaceholder({ title }: ViewPlaceholderProps) {
  return (
    <div className="h-[50vh] flex flex-col items-center justify-center border border-dashed border-glass-border rounded-3xl bg-brand-darkBtn/10 relative z-10 w-full">
      <p className="text-sm font-mono text-ui-neutral uppercase tracking-widest animate-pulse">
        {title} Work In Progress
      </p>
    </div>
  );
}