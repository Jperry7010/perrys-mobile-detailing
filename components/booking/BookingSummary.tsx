"use client";

import { useBooking } from "./context/BookingContext";

export default function BookingSummary() {
  const { booking } = useBooking();

  return (
  <div className="sticky top-28 rounded-3xl border border-[#FFD100]/40 bg-[#FFD100]/10 p-8">
    <h2 className="text-2xl font-black uppercase text-[#FFD100]">
      Your Booking
    </h2>

    <div className="mt-8 space-y-5">

      <div>
        <p className="text-xs uppercase tracking-widest text-gray-400">
          Service
        </p>

        <p className="mt-1 text-xl font-bold">
          {booking.service || "Not Selected"}
        </p>
      </div>

      <hr className="border-white/10" />

      <div>
        <p className="text-xs uppercase tracking-widest text-gray-400">
          Add-ons
        </p>

        {booking.addOns.length ? (
          booking.addOns.map((item) => (
            <p key={item} className="mt-2">
              ✔ {item}
            </p>
          ))
        ) : (
          <p className="mt-2 text-gray-400">
            None Selected
          </p>
        )}
      </div>

      <hr className="border-white/10" />

      <div>
        <p className="text-xs uppercase tracking-widest text-gray-400">
          Vehicle
        </p>

        <p className="mt-2">

          {booking.vehicle.year || "Year"}{" "}

          {booking.vehicle.make || "Make"}{" "}

          {booking.vehicle.model || "Model"}

        </p>
      </div>

      <hr className="border-white/10" />

      <div>

        <p className="text-xs uppercase tracking-widest text-gray-400">
          Estimated Total
        </p>

        <p className="mt-2 text-4xl font-black text-[#FFD100]">
          Coming Soon
        </p>

      </div>

    </div>
  </div>
);
}