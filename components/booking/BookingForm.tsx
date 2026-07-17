"use client";
import BookingSummary from "./BookingSummary";
import { useMemo, useState } from "react"
import { useBooking } from "./context/BookingContext";
const services = [
  {
    id: "exterior",
    name: "Exterior Refresh",
    price: 50,
    duration: "30 minutes",
  },
  {
    id: "interior",
    name: "Interior Detail",
    price: 40,
    duration: "30–45 minutes",
  },
  {
    id: "complete",
    name: "Complete Detail",
    price: 70,
    duration: "45 minutes",
    popular: true,
  },
];

const addOns = [
  { id: "tireShine", name: "Tire Shine", price: 5 },
  { id: "deepSeat", name: "Deep Seat Cleaning", price: 10 },
  { id: "petHair", name: "Extreme Pet Hair Removal", price: 10 },
  { id: "handWax", name: "Premium Hand Wax", price: 30 },
];

const vehicleTypes = ["Sedan", "SUV", "Truck", "Coupe", "Van", "Sports Car"];

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const { booking, setBooking } = useBooking();
  const [service, setService] = useState("complete");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [vehicle, setVehicle] = useState({
    year: "",
    make: "",
    model: "",
    color: "",
    type: "",
  });

  const total = useMemo(() => {
    const selectedService = services.find((item) => item.id === service);
    const servicePrice = selectedService?.price ?? 0;

    const addOnTotal = addOns
      .filter((addOn) => selectedAddOns.includes(addOn.id))
      .reduce((sum, addOn) => sum + addOn.price, 0);

    return servicePrice + addOnTotal;
  }, [service, selectedAddOns]);

  function toggleAddOn(id: string) {
    setSelectedAddOns((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function nextStep() {
    setStep((current) => Math.min(current + 1, 3));
  }

  function previousStep() {
    setStep((current) => Math.max(current - 1, 1));
  }
function vehicleInformationComplete() {
  return (
    vehicle.year.trim() !== "" &&
    vehicle.make.trim() !== "" &&
    vehicle.model.trim() !== "" &&
    vehicle.type.trim() !== ""
  );
}
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-sm font-black uppercase tracking-[0.4em] text-[#FFD100]">
        Book Your Detail
      </p>

      <h1 className="mt-4 text-5xl font-black uppercase md:text-7xl">
  Schedule Service
    </h1>

    <div className="mt-12 grid gap-10 lg:grid-cols-[2fr_1fr]">

  <div>

      <div className="mt-8 rounded-full bg-white/10">
        <div
          className="h-3 rounded-full bg-[#FFD100] transition-all"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <p className="mt-4 text-gray-400">Step {step} of 3</p>

      {step === 1 && (
        <div className="mt-12">
          <h2 className="text-3xl font-black uppercase">Choose Service</h2>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {services.map((item) => (
              <button
                key={item.id}
                onClick={() => {
  setService(item.id);

  setBooking((current) => ({
    ...current,
    service: item.name,
  }));
}}
                className={`relative rounded-3xl border p-8 text-left transition ${
                  service === item.id
                    ? "border-[#FFD100] bg-[#FFD100] text-black"
                    : "border-white/10 bg-white/[0.03] text-white hover:border-[#FFD100]"
                }`}
              >
                {item.popular && (
                  <span className="absolute right-5 top-5 rounded-full bg-black px-3 py-1 text-xs font-black uppercase text-[#FFD100]">
                    Most Popular
                  </span>
                )}

                <h3 className="text-3xl font-black uppercase">{item.name}</h3>
                <p className="mt-5 text-6xl font-black">${item.price}</p>
                <p className="mt-3 font-bold uppercase">{item.duration}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-12">
          <h2 className="text-3xl font-black uppercase">Choose Add-ons</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {addOns.map((addOn) => (
              <label
                key={addOn.id}
                className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <span className="text-lg font-bold">{addOn.name}</span>
                <span className="text-xl font-black text-[#FFD100]">
                  +${addOn.price}
                </span>
                <input
                  type="checkbox"
                  checked={selectedAddOns.includes(addOn.id)}
                  onChange={() => toggleAddOn(addOn.id)}
                  className="ml-4"
                />
              </label>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-12">
          <h2 className="text-3xl font-black uppercase">Vehicle Information</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              ["year", "Vehicle Year"],
              ["make", "Vehicle Make"],
              ["model", "Vehicle Model"],
              ["color", "Vehicle Color"],
            ].map(([field, label]) => (
              <label key={field}>
                <span className="font-bold uppercase text-gray-300">{label}</span>
                <input
                  value={vehicle[field as keyof typeof vehicle]}
                  onChange={(e) =>
                    setVehicle((current) => ({
                      ...current,
                      [field]: e.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none focus:border-[#FFD100]"
                />
              </label>
            ))}

            <label className="md:col-span-2">
              <span className="font-bold uppercase text-gray-300">
                Vehicle Type
              </span>
              <select
  value={vehicle.type}
  onChange={(e) =>
    setVehicle((current) => ({
      ...current,
      type: e.target.value,
    }))
  }
  className="mt-2 w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none focus:border-[#FFD100]"
>
  <option value="" className="bg-black text-white">
  Select vehicle type
</option>

{vehicleTypes.map((type) => (
  <option key={type} value={type} className="bg-black text-white">
    {type}
  </option>
))}
</select>
            </label>
          </div>
        </div>
      )}

      <div className="mt-12 rounded-3xl border border-[#FFD100]/40 bg-[#FFD100]/10 p-8">
        <p className="text-lg font-bold uppercase text-gray-300">
          Estimated Total
        </p>
        <p className="mt-2 text-6xl font-black text-[#FFD100]">${total}</p>

        <div className="mt-8 flex gap-4">
          {step > 1 && (
            <button
              onClick={previousStep}
              className="rounded-full border border-white/20 px-8 py-4 font-bold uppercase text-white"
            >
              Back
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={nextStep}
              className="rounded-full bg-[#FFD100] px-8 py-4 font-bold uppercase text-black"
            >
              Next
            </button>
          ) : (
            <button
  type="button"
  disabled={!vehicleInformationComplete()}
  onClick={() => {
    const selectedService = services.find((item) => item.id === service);

    const selectedAddOnObjects = addOns.filter((addOn) =>
      selectedAddOns.includes(addOn.id)
    );

    localStorage.setItem(
      "perrysBooking",
      JSON.stringify({
        service_name: selectedService?.name ?? "",
        add_ons: selectedAddOnObjects.map((item) => item.name),
        vehicle_year: vehicle.year,
        vehicle_make: vehicle.make,
        vehicle_model: vehicle.model,
        vehicle_color: vehicle.color,
        vehicle_type: vehicle.type,
        total_price: total,
      })
    );

    window.location.href = "/booking/details";
  }}
  className="rounded-full bg-[#FFD100] px-8 py-4 font-bold uppercase text-black disabled:cursor-not-allowed disabled:opacity-40"
>
  Continue Booking
</button>
          )}
        </div>
      </div>
      </div>

  <BookingSummary />

</div>

</section>
  );
}