"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react"; // Integrated for clean visibility management

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const isPasswordType = type === "password";
    
    // Dynamically change input mask type based on user toggle state
    const currentInputType = isPasswordType && showPassword ? "text" : type;

    return (
      <div className="relative w-full flex items-center group">
        <input
          type={currentInputType}
          className={cn(
            "flex h-11 w-full rounded-md border-0 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-all",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue",
            "disabled:cursor-not-allowed disabled:opacity-50",
            
            // Appends padding on the right edge so long input values don't overflow underneath the icon
            isPasswordType && "pr-10", 
            
            className
          )}
          ref={ref}
          {...props}
        />
        
        {/* Render toggle icon overlay only if input type is initially specified as password */}
        {isPasswordType && (
          <button
            type="button" // Explicitly blocks native form execution actions
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1} // Keeps keyboard focus flowing sequentially through inputs rather than icon steps
            className="absolute right-3 p-1 rounded text-gray-600 hover:text-gray-800 focus-visible:outline-none transition-colors select-none"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Eye className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };