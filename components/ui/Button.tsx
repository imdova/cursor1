import { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover focus:ring-primary focus:ring-2 focus:ring-offset-2",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
  outline:
    "border-2 border-white text-white hover:bg-white hover:text-primary focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
};

export default function Button({
  children,
  variant = "primary",
  fullWidth,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:pointer-events-none px-4 py-2.5 text-sm";
  const width = fullWidth ? "w-full" : "";
  return (
    <button
      type="button"
      className={`${base} ${variantClasses[variant]} ${width} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
