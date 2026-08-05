import Link from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  size?: ButtonSize;
  className?: string;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-6 py-3 text-lg",
};

export function ButtonLink({ href, children, size = "lg", className }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "bg-primary text-primary-foreground shadow-glow inline-flex items-center justify-center rounded-full font-semibold transition-transform hover:scale-[1.03]",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Link>
  );
}
