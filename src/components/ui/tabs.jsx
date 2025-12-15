import React, { createContext, useContext, useMemo, useState } from "react";
import { cn } from "./utils";

const TabsCtx = createContext(null);

export function Tabs({ defaultValue, value, onValueChange, className="", children }) {
  const [internal, setInternal] = useState(defaultValue);
  const v = value ?? internal;
  const setV = onValueChange ?? setInternal;
  const ctx = useMemo(() => ({ value: v, setValue: setV }), [v, setV]);
  return <TabsCtx.Provider value={ctx}><div className={cn("", className)}>{children}</div></TabsCtx.Provider>;
}

export function TabsList({ className="", ...props }) {
  return <div className={cn("inline-flex items-center gap-1 bg-muted p-1 rounded-2xl", className)} {...props} />;
}

export function TabsTrigger({ value, className="", children, ...props }) {
  const ctx = useContext(TabsCtx);
  const active = ctx?.value === value;
  return (
    <button
      type="button"
      onClick={() => ctx?.setValue(value)}
      className={cn("px-3 py-2 text-sm rounded-2xl transition", active ? "bg-background border" : "text-muted-foreground hover:text-foreground", className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className="", children, ...props }) {
  const ctx = useContext(TabsCtx);
  if (ctx?.value !== value) return null;
  return <div className={cn("", className)} {...props}>{children}</div>;
}
