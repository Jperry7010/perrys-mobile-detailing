import Button from "../ui/Button";
import Container from "../ui/Container";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#C8102E33,transparent_35%),linear-gradient(to_bottom,#00000099,#000000)]" />

      <Container className="relative flex min-h-[90vh] flex-col items-center justify-center text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-[#FFD100]">
          San Antonio Mobile Detailing
        </p>

        <h1 className="max-w-6xl text-6xl font-black uppercase leading-none tracking-tight md:text-8xl xl:text-9xl">
          <>
  Luxury Results.
  <br />
  Right At Your Door.
</>
        </h1>

        <p className="mt-8 text-2xl font-semibold uppercase tracking-[0.25em] text-[#FFD100]">
  Perry&apos;s Mobile Detailing
</p>

<p className="mt-6 max-w-3xl text-xl leading-9 text-gray-300 md:text-2xl">
  Our Professional Detailers bring premium automotive detailing directly to
  your driveway with transparent pricing, organized scheduling, and trusted
  service.
</p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="/booking">Book Appointment</Button>
          <Button href="/services" variant="secondary">
            View Services
          </Button>
        </div>
      </Container>
    </section>
  );
}