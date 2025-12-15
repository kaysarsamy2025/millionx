import React from "react";
import { cn } from "./utils";

export function Progress({ value=0, className="" }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("h-2 w-full rounded-full bg-muted overflow-hidden", className)}>
      <div className="h-full bg-primary" style={{ width: v + "%" }} />
    </div>
  );
}
