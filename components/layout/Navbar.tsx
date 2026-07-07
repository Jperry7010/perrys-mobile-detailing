import Image from "next/image";
import Link from "next/link";

import Button from "../ui/Button";
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center">
  <Image
    src="/images/branding/perrys-logo.png"
    alt="Perry's Mobile Detailing"
    width={160}
    height={160}
    priority
    className="h-16 w-auto"
  />
</Link>

        <div className="hidden items-center gap-8 text-sm font-semibold text-gray-300 md:flex">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/booking">Book</Link>
          <Link href="/apply">Apply</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <Button href="/booking">Book Now</Button>
      </nav>
    </header>
  );
}