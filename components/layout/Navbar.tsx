import Image from "next/image";
import Link from "next/link";

import Button from "../ui/Button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-32 max-w-7xl items-center justify-between px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
  src="/images/branding/perrys-logo.png"
  alt="Perry's Mobile Detailing"
  width={340}
  height={340}
  priority
  className="h-28 w-auto transition-transform duration-300 hover:scale-105"
/>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-10 text-sm font-semibold uppercase tracking-wide text-white lg:flex">
          <Link href="/">Home</Link>

          <Link href="/services">Services</Link>

          <Link href="/gallery">Gallery</Link>

          <Link href="/reviews">Reviews</Link>

          <Link href="/faq">FAQ</Link>

          <Link href="/contact">Contact</Link>

          <Link href="/careers">Careers</Link>
        </div>

        {/* CTA */}
        <Button href="/booking">
          Book Appointment
        </Button>

      </nav>
    </header>
  );
}