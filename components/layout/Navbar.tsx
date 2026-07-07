import Image from "next/image";
import Link from "next/link";

import Button from "../ui/Button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl">
    <nav className="mx-auto flex h-32 max-w-7xl items-center justify-center px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center">
         <Image
  src="/images/branding/perrys-logo.png"
  alt="Perry's Mobile Detailing"
  width={140}
  height={160}
  priority
  className="h-36 w-auto transition-all duration-300 hover:scale-105"
/>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-12 text-lg font-bold uppercase tracking-[0.18em] text-white lg:flex">
          <Link
  href="/"
  className="transition-all duration-300 hover:text-[#FFD100] hover:scale-105"
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