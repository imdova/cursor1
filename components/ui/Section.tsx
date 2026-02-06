import { type ReactNode } from "react";
import Container from "./Container";

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** If true, wraps children in Container. Default true. */
  contained?: boolean;
  /** Section padding. Default: py-8 sm:py-12 lg:py-16 */
  padding?: string;
}

export default function Section({
  children,
  className = "",
  contained = true,
  padding = "py-8 sm:py-12 lg:py-16",
}: SectionProps) {
  const content = contained ? <Container>{children}</Container> : children;
  return (
    <section className={`${padding} ${className}`.trim()}>{content}</section>
  );
}
