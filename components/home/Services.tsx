import Container from "../ui/Container";
import ServiceCard from "../services/ServiceCard";

const services = [
  {
    title: "Exterior Refresh",
    price: "$45",
    time: "30 minutes",
    description:
      "A premium exterior wash designed to restore shine and protect your vehicle’s finish.",
    included: [
      "Wax wash foam treatment",
      "Exterior hand wash",
      "Premium hand dry",
      "Wheel cleaning",
      "Exterior windows cleaned",
      "Final touch-up for missed spots",
      "Complimentary odor minimizer",
    ],
    addOns: ["Tire Shine — $5", "Premium Hand Wax — $25"],
  },
  {
    title: "Interior Detail",
    price: "$35",
    time: "30–45 minutes",
    description:
      "A focused interior refresh for customers who want the inside of their vehicle cleaned and protected.",
    included: [
      "Interior vacuum",
      "Dashboard wiped with UV protectant",
      "Door panels cleaned",
      "Center console cleaned",
      "Cup holders cleaned",
      "Interior windows cleaned",
      "Complimentary odor minimizer",
    ],
    addOns: ["Deep Seat steam or leather Cleaning — $15"],
  },
  {
    title: "Complete Detail",
    price: "$65",
    time: "45 minutes",
    description:
      "Our most popular service, combining exterior shine with a full interior refresh.",
    included: [
      "Everything in Exterior Refresh",
      "Interior vacuum",
      "Dashboard wiped with UV protectant",
      "Door panels cleaned",
      "Center console cleaned",
      "Cup holders cleaned",
      "Interior windows cleaned",
      "Complimentary odor minimizer",
    ],
    addOns: [
      "Tire Shine — $5",
      "Deep Seat Cleaning — $10",
      "Premium Hand Wax — $25",
    ],
    popular: true,
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-black py-24 text-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#FFD100]">
            Services
          </p>

          <h2 className="mt-4 text-4xl font-black uppercase md:text-6xl">
            Choose Your Detail
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Clear pricing, premium service, and no hidden fees.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </Container>
    </section>
  );
}