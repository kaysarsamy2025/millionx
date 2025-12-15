import React from "react";
import { cn } from "./utils";

export const Textarea = React.forwardRef(function Textarea({ className="", ...props }, ref){
  return <textarea ref={ref} className={cn("w-full rounded-2xl border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-muted", className)} {...props} />;
});
