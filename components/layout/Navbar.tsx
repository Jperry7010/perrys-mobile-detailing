import Image from "next/image";
import Link from "next/link";

import Button from "../ui/Button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl">
    <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-8">
        {/* Logo */}
        <Link
  href="/"
  className="flex items-center transition-transform duration-300 hover:scale-105"
>
  <Image
    src="/images/branding/perrys-wordmark.png"
    alt="Perry's Mobile Detailing"
    width={300}
    height={70}
    priority
    className="h-14 w-auto lg:h-16"
  />

        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-10 text-lg font-bold uppercase tracking-wide text-white lg:flex">
          <Link
  href="/"
  className="transition-all duration-300 hover:text-[#FFD100]"
>
  Home
</Link>

          <Link
  href="/"
  className="transition-all duration-300 hover:text-[#FFD100] hover:scale-105"
>
  Why Us 
</Link>

          <Link
  href="/"
  className="transition-all duration-300 hover:text-[#FFD100] hover:scale-105"
>
  Services
</Link>

<Link
  href="/"
  className="transition-all duration-300 hover:text-[#FFD100] hover:scale-105"
>
  Gallery
</Link>
          <Link
  href="/"
  className="transition-all duration-300 hover:text-[#FFD100] hover:scale-105"
>
  Reviews
</Link>

          <Link
  href="/"
  className="transition-all duration-300 hover:text-[#FFD100] hover:scale-105"
>
  FAQ
</Link>

          <Link
  href="/"
  className="transition-all duration-300 hover:text-[#FFD100] hover:scale-105"
>
  Contact
</Link>

          <Link
  href="/"
  className="transition-all duration-300 hover:text-[#FFD100] hover:scale-105"
>
  Careers
</Link>
        </div>

        {/* CTA */}
       

      </nav>
    </header>
  );
}