import { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}

/** Consistent max-width and horizontal padding across the app. */
export default function Container({
  children,
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
