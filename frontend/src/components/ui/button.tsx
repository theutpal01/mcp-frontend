import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  glass?: boolean; // New parameter to conditionally toggle the premium glassmorph look
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, glass = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Universal Shared Base Layout & Typography Base
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 py-2 w-full active:scale-[0.99]",
          
          // 1. STANDARD BASE LOOK (When glass parameter is NOT passed)
          !glass && [
            "bg-brand-darkBtn text-brand-yellow border border-glass-border shadow-sm",
            "hover:bg-brand-darkBtn/80 focus-visible:ring-brand-blue"
          ],
          
          // 2. PREMIUM GLASSMORPH LOOK (When glass parameter IS passed)
          glass && [
            "bg-white/[0.03] backdrop-blur-xl text-brand-yellow shadow-[0_8px_20px_-6px_rgba(0,0,0,0.7)]",
            "border border-white/15 hover:border-white/25", // Crisp translucent white edges
            "hover:bg-white/[0.08] focus-visible:ring-white/25" // Interaction shifts
          ],
          
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };