import { type ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  /** Main content area class. Default: flex-1 overflow-x-hidden */
  mainClassName?: string;
}

export default function DashboardLayout({
  children,
  sidebar,
  mainClassName = "flex-1 overflow-x-hidden",
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {sidebar}
      <main className={mainClassName}>{children}</main>
    </div>
  );
}
