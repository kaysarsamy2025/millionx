import React from "react";
import { cn } from "./utils";

export function Badge({ className="", variant="default", ...props }) {
  const variants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-muted text-foreground",
    outline: "border bg-background text-foreground",
  };
  return (
    <span className={cn("inline-flex items-center px-3 py-1 text-xs font-medium rounded-full", variants[variant]||variants.default, className)} {...props} />
  );
}
