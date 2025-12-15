import React from "react";
import { cn } from "./utils";

export const Input = React.forwardRef(function Input({ className="", ...props }, ref){
  return <input ref={ref} className={cn("h-10 w-full rounded-2xl border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-muted", className)} {...props} />;
});
