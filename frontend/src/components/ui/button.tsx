import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue disabled:pointer-events-none disabled:opacity-50",
          "bg-brand-darkBtn text-brand-yellow hover:bg-brand-darkBtn/80 border border-glass-border shadow-sm",
          "h-11 px-8 py-2 w-full",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };