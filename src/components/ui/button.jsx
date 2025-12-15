import React from "react";
import { cn } from "./utils";

export function Button({ className="", variant="default", size="md", ...props }) {
  const base = "inline-flex items-center justify-center gap-2 font-medium transition rounded-2xl border border-transparent";
  const variants = {
    default: "bg-primary text-primary-foreground hover:opacity-90",
    secondary: "bg-muted text-foreground hover:opacity-90 border",
    outline: "bg-background text-foreground border hover:bg-muted/50",
  };
  const sizes = { sm:"h-9 px-3 text-sm", md:"h-10 px-4 text-sm", lg:"h-11 px-5 text-base" };
  return (
    <button className={cn(base, variants[variant]||variants.default, sizes[size]||sizes.md, className)} {...props} />
  );
}
