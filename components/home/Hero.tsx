import Image from "next/image";
import Button from "../ui/Button";
import Container from "../ui/Container";

const badges = [
    "🧽 Professional Detailers",
    "📝 Simple Online Booking",
    "⭐ Satisfaction Guarantee",
    "🚚 100% Mobile Service",
    "💳 Secure Online Payment",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
  <Image
    src="/images/hero/hero-car.jpg"
    alt="Luxury exotic car background"
    fill
    priority
    className="object-cover object-center scale-105"
  />

  <div className="absolute inset-0 bg-black/45" />
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black" />
      <Container className="relative z-10 flex min-h-screen flex-col items-center justify-center pt-36 text-center">
        <Image
          src="/images/branding/perrys-logo.png"
          alt="Perry's Mobile Detailing"
          width={650}
          height={650}
          priority
          className="mb-10 h-72 w-auto md:h-96 lg:h-[34rem] drop-shadow-[0_0_60px_rgba(0,0,0,0.9)]"
        />

        <p className="text-lg font-black uppercase tracking-[0.45em] text-[#FFD100] md:text-2xl">
          San Antonio Mobile Detailing
        </p>

        <h1 className="mt-6 max-w-6xl text-6xl font-black uppercase leading-none md:text-8xl xl:text-[8rem]">
          Luxury Results.
          <br />
          Right At Your Door.
        </h1>

        <p className="mt-8 max-w-4xl text-xl leading-9 text-gray-200 md:text-2xl">
          Our Professional Detailers bring premium mobile detailing directly to
          your driveway with organized scheduling, transparent pricing, and
          trusted service.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="/booking">Book Appointment</Button>
          <Button href="/#services" variant="secondary">
            View Services
          </Button>
        </div>

        <div className="mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge) => (
            <div
              key={badge}
              className="rounded-2xl border border-white/15 bg-black/45 px-5 py-4 text-sm font-bold uppercase tracking-wide backdrop-blur"
            >
              {badge}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}