"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createAppointment } from "../../lib/appointments";

export default function BookingDetailsForm() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "San Antonio",
    zip: "",
    date: "",
    time: "",
    notes: "",
  });

  function updateField(field: string, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSaveAppointment() {
    try {
      setIsSubmitting(true);
      setMessage("");

      const [appointment_month, appointment_day] = form.date.split("-");

      const savedBooking = JSON.parse(
  localStorage.getItem("perrysBooking") || "{}"
);

await createAppointment({
  first_name: form.firstName,
  last_name: form.lastName,
  email: form.email,
  phone: form.phone,
  address: form.address,
  city: form.city,
  zip: form.zip,
  appointment_month,
  appointment_day,
  appointment_time: form.time,

  service_name: savedBooking.service_name,
  add_ons: savedBooking.add_ons,
  vehicle_year: savedBooking.vehicle_year,
  vehicle_make: savedBooking.vehicle_make,
  vehicle_model: savedBooking.vehicle_model,
  vehicle_color: savedBooking.vehicle_color,
  vehicle_type: savedBooking.vehicle_type,
  total_price: savedBooking.total_price,
});

      setMessage("Appointment saved successfully.");

      setTimeout(() => {
        router.push("/booking/confirmation");
      }, 800);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong saving the appointment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <button
        onClick={() => router.push("/booking")}
        className="mb-8 rounded-full border border-white/20 px-6 py-3 text-sm font-bold uppercase text-white transition hover:border-[#FFD100] hover:text-[#FFD100]"
      >
        ← Back
      </button>

      <p className="text-sm font-black uppercase tracking-[0.4em] text-[#FFD100]">
        Appointment Details
      </p>

      <h1 className="mt-4 text-5xl font-black uppercase md:text-7xl">
        Contact Info & Appointment Time
      </h1>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {[
          ["firstName", "First Name"],
          ["lastName", "Last Name"],
          ["email", "Email"],
          ["phone", "Phone Number"],
          ["address", "Driveway Address"],
          ["city", "City"],
          ["zip", "ZIP Code"],
        ].map(([field, label]) => (
          <label key={field} className="block">
            <span className="font-bold uppercase text-gray-300">{label}</span>
            <input
              type="text"
              value={form[field as keyof typeof form]}
              onChange={(e) => updateField(field, e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none focus:border-[#FFD100]"
            />
          </label>
        ))}

        <label className="block">
          <span className="font-bold uppercase text-gray-300">
            Appointment Month
          </span>
          <select
            value={form.date.split("-")[0] || ""}
            onChange={(e) => {
              const day = form.date.split("-")[1] || "";
              updateField("date", `${e.target.value}-${day}`);
            }}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none focus:border-[#FFD100]"
          >
            <option value="" className="bg-white text-black">
              Select month
            </option>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month) => (
              <option key={month} value={month} className="bg-white text-black">
                {month}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="font-bold uppercase text-gray-300">
            Appointment Day
          </span>
          <select
            value={form.date.split("-")[1] || ""}
            onChange={(e) => {
              const month = form.date.split("-")[0] || "";
              updateField("date", `${month}-${e.target.value}`);
            }}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none focus:border-[#FFD100]"
          >
            <option value="" className="bg-white text-black">
              Select day
            </option>
            {Array.from({ length: 31 }, (_, i) => String(i + 1)).map((day) => (
              <option key={day} value={day} className="bg-white text-black">
                {day}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="font-bold uppercase text-gray-300">
            Preferred Time
          </span>
          <select
            value={form.time}
            onChange={(e) => updateField("time", e.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none focus:border-[#FFD100]"
          >
            <option value="" className="bg-white text-black">
              Select a time
            </option>
            {[
              "5:00 PM",
              "7:00 PM",
              "8:00 AM Weekend",
              "10:00 AM Weekend",
              "12:00 PM Weekend",
              "2:00 PM Weekend",
              "4:00 PM Weekend",
              "6:00 PM Weekend",
            ].map((time) => (
              <option key={time} value={time} className="bg-white text-black">
                {time}
              </option>
            ))}
          </select>
        </label>

        <label className="block md:col-span-2">
          <span className="font-bold uppercase text-gray-300">
            Special Instructions
          </span>
          <textarea
            value={form.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            className="mt-2 min-h-32 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none focus:border-[#FFD100]"
          />
        </label>
      </div>

      <div className="mt-10 rounded-3xl border border-[#FFD100]/40 bg-[#FFD100]/10 p-6">
        <p className="font-bold uppercase text-[#FFD100]">Next Step</p>
        <p className="mt-2 text-gray-300">
          This will save the appointment to your Perry&apos;s Mobile Detailing database.
        </p>

        <button
          onClick={handleSaveAppointment}
          disabled={isSubmitting}
          className="mt-6 rounded-full bg-[#FFD100] px-8 py-4 font-bold uppercase text-black disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : "Save Appointment"}
        </button>

        {message && <p className="mt-4 text-sm text-[#FFD100]">{message}</p>}
      </div>
    </section>
  );
}