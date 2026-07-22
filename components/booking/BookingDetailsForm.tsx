"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  createAppointment,
  getBookedAppointmentTimes,
} from "../../lib/appointments";
const months = [
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
];

const weekdayTimes = ["5:00 PM", "7:00 PM"];

const weekendTimes = [
  "8:00 AM",
  "10:00 AM",
  "12:00 PM",
  "2:00 PM",
  "4:00 PM",
  "6:00 PM",
];

export default function BookingDetailsForm() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "San Antonio",
    zip: "",
    date: "",
    year: String(new Date().getFullYear()),
    time: "",
    notes: "",
    smsConsent: false,
  });

    const baseAvailableTimes = useMemo(() => {
  const [monthName, dayValue] = form.date.split("-");
  const monthIndex = months.indexOf(monthName);
  const day = Number(dayValue);
  const year = Number(form.year);

  if (monthIndex === -1 || !day || !year) {
    return [];
  }

  const selectedDate = new Date(year, monthIndex, day);

  const isWeekend =
    selectedDate.getDay() === 0 || selectedDate.getDay() === 6;

  return isWeekend ? weekendTimes : weekdayTimes;
}, [form.date, form.year]);

useEffect(() => {
  const [appointmentMonth, appointmentDay] = form.date.split("-");
  const appointmentYear = Number(form.year);

  if (!appointmentMonth || !appointmentDay || !appointmentYear) {
    setBookedTimes([]);
    setIsLoadingTimes(false);
    return;
  }

  let requestIsActive = true;

  async function loadBookedTimes() {
    try {
      setIsLoadingTimes(true);

      const times = await getBookedAppointmentTimes(
        appointmentMonth,
        appointmentDay,
        appointmentYear
      );

      if (requestIsActive) {
        setBookedTimes(times);
      }
    } catch (error) {
      console.error("Could not load booked appointment times:", error);

      if (requestIsActive) {
        setBookedTimes([]);
        setMessage(
          "We could not check appointment availability. Please try again."
        );
      }
    } finally {
      if (requestIsActive) {
        setIsLoadingTimes(false);
      }
    }
  }

  loadBookedTimes();

  return () => {
    requestIsActive = false;
  };
}, [form.date, form.year]);

const availableTimes = useMemo(() => {
  return baseAvailableTimes.filter(
    (time) => !bookedTimes.includes(time)
  );
}, [baseAvailableTimes, bookedTimes]);

  function updateField(field: string, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function requiredInformationComplete() {
    const [appointmentMonth, appointmentDay] = form.date.split("-");

    return (
      form.firstName.trim() !== "" &&
      form.lastName.trim() !== "" &&
      form.email.trim() !== "" &&
      form.phone.trim() !== "" &&
      form.address.trim() !== "" &&
      form.city.trim() !== "" &&
      form.zip.trim() !== "" &&
      appointmentMonth !== "" &&
      appointmentDay !== "" &&
      form.year !== "" &&
      form.time !== ""
    );
  }
async function sendConfirmationEmail(
  savedBooking: Record<string, unknown>,
  appointmentMonth: string,
  appointmentDay: string
) {
  const response = await fetch("/api/send-confirmation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email.trim(),
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      serviceName: String(savedBooking.service_name ?? ""),
      appointmentMonth,
      appointmentDay,
      appointmentYear: Number(form.year),
      appointmentTime: form.time,
      address: form.address.trim(),
      city: form.city.trim(),
      zip: form.zip.trim(),
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.error || "The confirmation email could not be sent."
    );
  }
}
  async function handleSaveAppointment() {
    if (!requiredInformationComplete()) {
      setMessage("Please complete every required field before continuing.");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("");

      const [appointment_month, appointment_day] = form.date.split("-");

      const savedBooking = JSON.parse(
        localStorage.getItem("perrysBooking") || "{}"
      );

      await createAppointment({
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        sms_consent: form.smsConsent,
        address: form.address.trim(),
        city: form.city.trim(),
        zip: form.zip.trim(),
        appointment_month,
        appointment_day,
        appointment_year: Number(form.year),
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
await sendConfirmationEmail(
  savedBooking,
  appointment_month,
  appointment_day
);
      setMessage("Appointment saved successfully.");

      setTimeout(() => {
        router.push("/booking/confirmation");
      }, 800);
    } catch (error: unknown) {
      console.error("Appointment save error:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Unknown database error.";

      if (
        errorMessage.includes("appointments_unique_active_slot") ||
        errorMessage.includes("duplicate key")
      ) {
        setMessage(
          "That appointment time is already booked. Please choose another date or time."
        );
      } else {
        setMessage(`Save failed: ${errorMessage}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <button
        type="button"
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

      <p className="mt-4 text-gray-400">
        Fields marked with <span className="text-[#FFD100]">*</span> are
        required.
      </p>

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
            <span className="font-bold uppercase text-gray-300">
              {label} <span className="text-[#FFD100]">*</span>
            </span>

            <input
              required
              type={
                field === "email"
                  ? "email"
                  : field === "phone"
                    ? "tel"
                    : "text"
              }
              value={form[field as keyof typeof form] as string}
              onChange={(event) => updateField(field, event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none focus:border-[#FFD100]"
            />
          </label>
        ))}

        <label className="block">
          <span className="font-bold uppercase text-gray-300">
            Appointment Year <span className="text-[#FFD100]">*</span>
          </span>
          <select
            required
            value={form.year}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                year: event.target.value,
                time: "",
              }))
            }
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none focus:border-[#FFD100]"
          >
            {[0, 1].map((offset) => {
              const year = new Date().getFullYear() + offset;

              return (
                <option
                  key={year}
                  value={year}
                  className="bg-white text-black"
                >
                  {year}
                </option>
              );
            })}
          </select>
        </label>

        <label className="block">
          <span className="font-bold uppercase text-gray-300">
            Appointment Month <span className="text-[#FFD100]">*</span>
          </span>

          <select
            required
            value={form.date.split("-")[0] || ""}
            onChange={(event) => {
              const day = form.date.split("-")[1] || "";

              setForm((current) => ({
                ...current,
                date: `${event.target.value}-${day}`,
                time: "",
              }));
            }}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none focus:border-[#FFD100]"
          >
            <option value="" className="bg-white text-black">
              Select month
            </option>

            {months.map((month) => (
              <option key={month} value={month} className="bg-white text-black">
                {month}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="font-bold uppercase text-gray-300">
            Appointment Day <span className="text-[#FFD100]">*</span>
          </span>

          <select
            required
            value={form.date.split("-")[1] || ""}
            onChange={(event) => {
              const month = form.date.split("-")[0] || "";

              setForm((current) => ({
                ...current,
                date: `${month}-${event.target.value}`,
                time: "",
              }));
            }}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none focus:border-[#FFD100]"
          >
            <option value="" className="bg-white text-black">
              Select day
            </option>

            {Array.from({ length: 31 }, (_, index) =>
              String(index + 1)
            ).map((day) => (
              <option key={day} value={day} className="bg-white text-black">
                {day}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="font-bold uppercase text-gray-300">
            Preferred Time <span className="text-[#FFD100]">*</span>
          </span>

          <select
            required
            value={form.time}
            onChange={(event) => updateField("time", event.target.value)}
disabled={isLoadingTimes || availableTimes.length === 0}
className="mt-2 w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none focus:border-[#FFD100] disabled:cursor-not-allowed disabled:opacity-50" 
          >
            <option value="" className="bg-white text-black">
  {isLoadingTimes
    ? "Checking availability..."
    : !form.date.split("-")[0] || !form.date.split("-")[1]
      ? "Choose a date first"
      : availableTimes.length > 0
        ? "Select a time"
        : "No times available"}
</option>

            {availableTimes.map((time) => (
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
            onChange={(event) => updateField("notes", event.target.value)}
            className="mt-2 min-h-32 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none focus:border-[#FFD100]"
          />
        </label>
        <label className="block md:col-span-2">
  <span className="font-bold uppercase text-gray-300">
    Appointment Notifications
  </span>

  <div className="mt-3 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
    <input
      type="checkbox"
      checked={form.smsConsent}
      onChange={(event) =>
        setForm((current) => ({
          ...current,
          smsConsent: event.target.checked,
        }))
      }
      className="mt-1 h-5 w-5 accent-[#FFD100]"
    />

    <div>
      <p className="font-semibold text-white">
        Receive text appointment reminders
      </p>

      <p className="mt-1 text-sm text-gray-400">
        You'll automatically receive an email confirmation after booking.
        Check this box if you'd also like text reminders before your appointment.
        Message and data rates may apply. Reply STOP to opt out.
      </p>
    </div>
  </div>
</label>
      </div>

      <div className="mt-10 rounded-3xl border border-[#FFD100]/40 bg-[#FFD100]/10 p-6">
        <p className="font-bold uppercase text-[#FFD100]">Next Step</p>

        <p className="mt-2 text-gray-300">
          Complete every required field before saving your appointment.
        </p>

        <button
          type="button"
          onClick={handleSaveAppointment}
          disabled={isSubmitting || !requiredInformationComplete()}
          className="mt-6 rounded-full bg-[#FFD100] px-8 py-4 font-bold uppercase text-black disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isSubmitting ? "Saving..." : "Save Appointment"}
        </button>

        {message && (
          <p className="mt-4 text-sm font-semibold text-[#FFD100]">
            {message}
          </p>
        )}
      </div>
    </section>
  );
}