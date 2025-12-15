import React from "react";
import { cn } from "./utils";

export function Card({ className="", ...props }) {
  return <div className={cn("border bg-background", className)} {...props} />;
}
export function CardHeader({ className="", ...props }) {
  return <div className={cn("p-6 pb-3", className)} {...props} />;
}
export function CardTitle({ className="", ...props }) {
  return <div className={cn("font-semibold leading-none tracking-tight", className)} {...props} />;
}
export function CardDescription({ className="", ...props }) {
  return <div className={cn("text-sm text-muted-foreground", className)} {...props} />;
}
export function CardContent({ className="", ...props }) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}
