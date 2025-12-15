import React from "react";
import { cn } from "./utils";

export function Switch({ checked=false, onCheckedChange, className="" }) {
  return (
    <button
      type="button"
      onClick={() => onCheckedChange?.(!checked)}
      className={cn("relative inline-flex h-6 w-11 items-center rounded-full border transition", checked ? "bg-primary" : "bg-muted", className)}
      aria-pressed={checked}
    >
      <span className={cn("inline-block h-5 w-5 transform rounded-full bg-background shadow transition", checked ? "translate-x-5" : "translate-x-1")} />
    </button>
  );
}
