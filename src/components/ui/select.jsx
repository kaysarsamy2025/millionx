import React, { createContext, useContext, useMemo, useState } from "react";
import { cn } from "./utils";

const SelectCtx = createContext(null);

export function Select({ value, onValueChange, children }) {
  const [open, setOpen] = useState(false);
  const ctx = useMemo(() => ({ value, onValueChange, open, setOpen }), [value, onValueChange, open]);
  return <SelectCtx.Provider value={ctx}>{children}</SelectCtx.Provider>;
}

export function SelectTrigger({ className="", children }) {
  const ctx = useContext(SelectCtx);
  return (
    <button
      type="button"
      onClick={() => ctx?.setOpen(!ctx.open)}
      className={cn("h-10 w-full rounded-2xl border bg-background px-3 text-sm flex items-center justify-between", className)}
    >
      <div className="truncate">{children}</div>
      <span className="text-muted-foreground">▾</span>
    </button>
  );
}

export function SelectValue({ placeholder }) {
  const ctx = useContext(SelectCtx);
  return <span className="text-left">{ctx?.value || placeholder}</span>;
}

export function SelectContent({ className="", children }) {
  const ctx = useContext(SelectCtx);
  if (!ctx?.open) return null;
  return <div className={cn("mt-2 rounded-2xl border bg-background p-2 shadow-sm", className)}>{children}</div>;
}

export function SelectItem({ value, className="", children }) {
  const ctx = useContext(SelectCtx);
  return (
    <button
      type="button"
      onClick={() => { ctx?.onValueChange?.(value); ctx?.setOpen(false); }}
      className={cn("w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-muted", className)}
    >
      {children}
    </button>
  );
}
