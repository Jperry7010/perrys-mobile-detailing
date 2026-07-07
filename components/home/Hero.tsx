import Image from "next/image";
import Button from "../ui/Button";
import Container from "../ui/Container";

const badges = [
  "Professional Detailers",
  "100% Mobile",
  "Satisfaction Guarantee",
  "Premium Products",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-car.jpg"
          alt="Luxury sports car"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black" />
      </div>

      <Container className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center">

        <Image
          src="/images/branding/perrys-logo.png"
          alt="Perry's Mobile Detailing"
          width={520}
          height={520}
          priority
          className="mb-8 h-72 w-auto lg:h-[28rem]"
        />

        <p className="text-lg font-black uppercase tracking-[0.45em] text-[#FFD100]">
          SAN ANTONIO MOBILE DETAILING
        </p>

        <h1 className="mt-8 max-w-6xl text-6xl font-black uppercase leading-none text-white md:text-8xl xl:text-[8rem]">
          Luxury Results.
          <br />
          Right At Your Door.
        </h1>

        <p className="mt-8 max-w-3xl text-xl leading-9 text-gray-200">
          Our Professional Detailers bring premium mobile detailing
          directly to your driveway with organized scheduling,
          transparent pricing, and trusted service.
        </p>

        <div className="mt-12 flex gap-6">
          <Button href="/booking">
            Book Appointment
          </Button>

          <Button href="/#services" variant="secondary">
            View Services
          </Button>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge) => (
            <div
              key={badge}
              className="rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm font-bold uppercase backdrop-blur"
            >
              {badge}
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}