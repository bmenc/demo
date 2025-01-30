"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "./input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, value = "", ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        {...props}
        ref={ref}
        value={value}
        className={cn("pr-10", className)}
      />
      <span className="absolute z-0 top-[7px] right-2 cursor-pointer select-none text-slate-800">
        {showPassword ? (
          <EyeIcon onClick={() => setShowPassword((prevState) => !prevState)} />
        ) : (
          <EyeOffIcon
            onClick={() => setShowPassword((prevState) => !prevState)}
          />
        )}
      </span>
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
