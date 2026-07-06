import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-black">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">

          <h1 className="text-5xl md:text-7xl font-extrabold">
            Perry's Detailing
          </h1>

          <p className="mt-6 text-xl text-gray-300">
            Professional Mobile Auto Detailing in San Antonio
          </p>

          <p className="mt-4 max-w-3xl mx-auto text-gray-400">
            We bring professional detailing directly to your driveway.
            Fast, affordable, and convenient.
          </p>

          <div className="mt-10 flex justify-center gap-5">
            <Link
              href="/booking"
              className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-700"
            >
              Book Appointment
            </Link>

            <Link
              href="/services"
              className="rounded-xl border border-white px-8 py-4 text-lg hover:bg-white hover:text-black"
            >
              View Services
            </Link>
          </div>

        </div>
      </section>

      {/* Services */}
      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center">
            Our Services
          </h2>

          <div className="grid md:grid-cols-2 gap-10 mt-12">

            <div className="rounded-2xl bg-slate-900 p-8">

              <h3 className="text-2xl font-bold">
                Basic Exterior Wash
              </h3>

              <p className="text-4xl font-bold text-blue-400 mt-4">
                $45
              </p>

              <ul className="mt-6 space-y-2 text-gray-300">

                <li>✔ Wax Foam Spray Method</li>
                <li>✔ Hand Wash</li>
                <li>✔ Hand Dry</li>
                <li>✔ Wheels Cleaned</li>
                <li>✔ Dashboard UV Protectant Wipe</li>
                <li>✔ Interior Windows Cleaned</li>

              </ul>

            </div>

            <div className="rounded-2xl bg-slate-900 p-8">

              <h3 className="text-2xl font-bold">
                Standard Detail
              </h3>

              <p className="text-4xl font-bold text-green-400 mt-4">
                $65
              </p>

              <ul className="mt-6 space-y-2 text-gray-300">

                <li>✔ Everything in Basic Wash</li>
                <li>✔ Interior Vacuum</li>
                <li>✔ Dashboard UV Protectant</li>
                <li>✔ Interior Windows</li>
                <li>✔ Door Panels</li>
                <li>✔ Seats Wiped Down</li>

              </ul>

            </div>

          </div>

        </div>

      </section>

      {/* Add-ons */}

      <section className="bg-slate-900 py-20">

        <div className="max-w-5xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center">
            Optional Add-ons
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">

            <div className="rounded-xl bg-slate-800 p-6 text-center">

              <h3 className="text-2xl font-bold">
                Tire Shine
              </h3>

              <p className="text-blue-400 text-3xl mt-3">
                +$5
              </p>

            </div>

            <div className="rounded-xl bg-slate-800 p-6 text-center">

              <h3 className="text-2xl font-bold">
                Deep Seat Cleaning
              </h3>

              <p className="text-blue-400 text-3xl mt-3">
                +$10
              </p>

            </div>

            <div className="rounded-xl bg-slate-800 p-6 text-center">

              <h3 className="text-2xl font-bold">
                Premium Hand Wax
              </h3>

              <p className="text-blue-400 text-3xl mt-3">
                +$25
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="py-10 text-center text-gray-400">

        <p>Perry's Detailing</p>

        <p>Serving San Antonio, Texas</p>

      </footer>

    </main>
  );
}