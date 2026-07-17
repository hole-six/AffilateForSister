import { InputHTMLAttributes, forwardRef } from "react";

export const TextInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full rounded-t-md rounded-b-none border-0 border-b-2 border-ink/15 bg-canvas-soft px-md pt-md pb-sm text-[14px] font-medium text-ink placeholder:text-mute/50 transition-all duration-150 focus:border-b-primary focus:outline-none focus:bg-primary-neutral/40 focus:shadow-[0_6px_14px_-8px_rgba(236,64,122,0.4)] hover:bg-primary-neutral/20 ${className}`}
        {...props}
      />
    );
  }
);
TextInput.displayName = "TextInput";
