import Container from "../ui/Container";

const steps = [
  {
    number: "01",
    title: "Book Online",
    text: "Choose your service, add-ons, vehicle, address, and appointment time.",
  },
  {
    number: "02",
    title: "We Come To You",
    text: "Our Professional Detailers arrive directly at your driveway fully prepared.",
  },
  {
    number: "03",
    title: "Interior Key Access",
    text: "For interior services, your Professional Detailer will politely request keys to unlock the vehicle.",
  },
  {
    number: "04",
    title: "Final Walk-Around",
    text: "After completion, customers may review the vehicle and request touch-ups for dry spots.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#0B0B0B] py-24 text-white">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#FFD100]">
            How It Works
          </p>

          <h2 className="mt-4 text-4xl font-black uppercase md:text-6xl">
            Driveway Detailing.
            <br />
            Done Right.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
            >
              <p className="text-4xl font-black text-[#FFD100]">{step.number}</p>
              <h3 className="mt-6 text-xl font-black uppercase">{step.title}</h3>
              <p className="mt-4 leading-7 text-gray-400">{step.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}