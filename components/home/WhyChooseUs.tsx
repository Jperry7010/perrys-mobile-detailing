import Container from "../ui/Container";

const reasons = [
  {
    title: "Professional Detailers",
    description:
      "Our Professional Detailers are trained to follow the Perry Standard for consistent, high-quality results.",
  },
  {
    title: "Mobile Convenience",
    description:
      "We come directly to your driveway, saving you time without sacrificing quality.",
  },
  {
    title: "Transparent Pricing",
    description:
      "Clear service packages, simple add-ons, and no surprise fees.",
  },
  {
    title: "Respect Every Ride",
    description:
      "Every vehicle is treated with care, whether it is a daily driver, work truck, muscle car, or luxury vehicle.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="bg-[#0B0B0B] py-24 text-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#FFD100]">
            Why Choose Perry&apos;s
          </p>

          <h2 className="mt-4 text-4xl font-black uppercase md:text-6xl">
            Premium Service.
            <br />
            Zero Hassle.
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Perry&apos;s Mobile Detailing is built around trust, convenience,
            and consistent professional service.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#FFD100]"
            >
              <div className="mb-6 h-1 w-12 rounded-full bg-[#FFD100]" />

              <h3 className="text-3xl font-black uppercase leading-tight">
                {reason.title}
              </h3>

              <p className="mt-6 text-lg leading-9 text-gray-300">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}