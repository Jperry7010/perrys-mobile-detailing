import Link from "next/link";

export default function BookingConfirmationPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <section className="w-full max-w-2xl rounded-3xl border border-[#FFD100]/40 bg-[#FFD100]/10 p-10 text-center">
        <p className="text-sm font-black uppercase tracking-[0.4em] text-[#FFD100]">
          Appointment Saved
        </p>

        <h1 className="mt-4 text-5xl font-black uppercase md:text-7xl">
          Booking Received
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-300">
          Your appointment request was saved successfully. Perry&apos;s Mobile
          Detailing will review the appointment and confirm the details.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-[#FFD100] px-8 py-4 font-black uppercase text-black"
          >
            Return Home
          </Link>

          <Link
            href="/booking"
            className="rounded-full border border-white/20 px-8 py-4 font-black uppercase text-white"
          >
            Book Another
          </Link>
        </div>
      </section>
    </main>
  );
}