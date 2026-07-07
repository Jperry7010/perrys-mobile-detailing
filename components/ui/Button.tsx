import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  className?: string;
};

export default function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";

  const variants = {
    primary:
      "bg-[#FFD100] text-black hover:bg-[#D4AF37] focus:ring-[#FFD100]",
    secondary:
      "border border-[#FFD100] text-[#FFD100] hover:bg-[#FFD100] hover:text-black focus:ring-[#FFD100]",
    danger:
      "bg-[#C8102E] text-white hover:bg-red-700 focus:ring-[#C8102E]",
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles}>
      {children}
    </button>
  );
}