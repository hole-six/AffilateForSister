import { SelectHTMLAttributes, forwardRef } from "react";
import { ChevronDown } from "lucide-react";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={`w-full appearance-none rounded-t-md rounded-b-none border-0 border-b-2 border-ink/15 bg-canvas-soft px-md pt-md pb-sm pr-[44px] text-[14px] font-medium text-ink transition-all duration-150 focus:border-b-primary focus:outline-none focus:bg-primary-neutral/40 focus:shadow-[0_6px_14px_-8px_rgba(236,64,122,0.4)] hover:bg-primary-neutral/20 cursor-pointer ${className}`}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className="pointer-events-none absolute right-md top-1/2 -translate-y-1/2 text-mute/60"
        />
      </div>
    );
  }
);
Select.displayName = "Select";
