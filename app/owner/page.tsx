import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import { updateAppointmentStatus } from "./actions";
type Appointment = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  service_name: string;
  add_ons: string[];
  vehicle_year: string | null;
  vehicle_make: string | null;
  vehicle_model: string | null;
  vehicle_color: string | null;
  vehicle_type: string | null;
  address: string;
  city: string;
  zip: string | null;
  appointment_month: string | null;
  appointment_day: string | null;
  appointment_time: string | null;
  total_price: number | string;
  status: string;
  created_at: string;
};

export const dynamic = "force-dynamic";

export default async function OwnerDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (
    authError ||
    !user ||
    user.email?.toLowerCase() !== process.env.OWNER_EMAIL?.toLowerCase()
  ) {
    redirect("/owner/login");
  }

  const { data, error } = await supabase
  .from("appointments")
  .select("*")
  .order("created_at", { ascending: false });

const appointments = (data ?? []) as Appointment[];

const totalRevenue = appointments.reduce(
  (sum, appointment) => sum + Number(appointment.total_price || 0),
  0
);

const pendingAppointments = appointments.filter(
  (appointment) => appointment.status.toLowerCase() === "pending"
).length;
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <section className="mx-auto max-w-7xl">
        <p className="text-sm font-black uppercase tracking-[0.4em] text-[#FFD100]">
          Perry Platform
        </p>

        <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
  <h1 className="text-5xl font-black uppercase md:text-7xl">
    Owner Dashboard
  </h1>

  <form action="/auth/signout" method="post">
    <button
      type="submit"
      className="rounded-full border border-white/20 px-6 py-3 text-sm font-black uppercase text-white transition hover:border-[#FFD100] hover:text-[#FFD100]"
    >
      Log Out
    </button>
  </form>
</div>

        {error && (
          <div className="mt-8 rounded-2xl border border-red-500/50 bg-red-500/10 p-5 text-red-200">
            Could not load appointments: {error.message}
          </div>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <DashboardCard
            label="Total Appointments"
            value={appointments.length.toString()}
          />

          <DashboardCard
            label="Pending Appointments"
            value={pendingAppointments.toString()}
          />

          <DashboardCard
            label="Booked Revenue"
            value={`$${totalRevenue.toFixed(2)}`}
          />
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          <div className="border-b border-white/10 p-6">
            <h2 className="text-2xl font-black uppercase">
              Recent Appointments
            </h2>
          </div>

          {appointments.length === 0 ? (
            <p className="p-8 text-gray-400">
              No appointments have been saved yet.
            </p>
          ) : (
            <div className="divide-y divide-white/10">
              {appointments.map((appointment) => (
                <article
                  key={appointment.id}
                  className="grid gap-6 p-6 lg:grid-cols-[1.2fr_1fr_1fr_auto]"
                >
                  <div>
                    <p className="text-xl font-black">
                      {appointment.first_name} {appointment.last_name}
                    </p>

                    <p className="mt-2 text-sm text-gray-400">
                      {appointment.email}
                    </p>

                    <p className="text-sm text-gray-400">
                      {appointment.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      Service
                    </p>

                    <p className="mt-2 font-bold">
                      {appointment.service_name}
                    </p>

                    <p className="mt-2 text-sm text-gray-400">
                      {appointment.add_ons?.length
                        ? appointment.add_ons.join(", ")
                        : "No add-ons"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      Vehicle
                    </p>

                    <p className="mt-2 font-bold">
                      {[
                        appointment.vehicle_year,
                        appointment.vehicle_make,
                        appointment.vehicle_model,
                      ]
                        .filter(Boolean)
                        .join(" ") || "Vehicle not recorded"}
                    </p>

                    <p className="mt-2 text-sm text-gray-400">
                      {appointment.appointment_month}{" "}
                      {appointment.appointment_day} at{" "}
                      {appointment.appointment_time}
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      {appointment.address}, {appointment.city}{" "}
                      {appointment.zip}
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-4 lg:items-end">
  <form action={updateAppointmentStatus} className="flex flex-col gap-2">
    <input
      type="hidden"
      name="appointmentId"
      value={appointment.id}
    />

    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
      Status
    </label>

    <select
      name="status"
      defaultValue={appointment.status}
      className="rounded-xl border border-[#FFD100]/40 bg-black px-4 py-3 text-sm font-bold text-white outline-none focus:border-[#FFD100]"
    >
      {[
        "Pending",
        "Confirmed",
        "Assigned",
        "On the Way",
        "Arrived",
        "In Progress",
        "Completed",
        "Cancelled",
      ].map((status) => (
        <option
          key={status}
          value={status}
          className="bg-white text-black"
        >
          {status}
        </option>
      ))}
    </select>

    <button
      type="submit"
      className="rounded-full bg-[#FFD100] px-5 py-2 text-xs font-black uppercase text-black"
    >
      Update Status
    </button>
  </form>

  <p className="text-2xl font-black text-[#FFD100]">
    ${Number(appointment.total_price || 0).toFixed(2)}
  </p>
</div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function DashboardCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
      <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
        {label}
      </p>

      <p className="mt-4 text-5xl font-black text-[#FFD100]">{value}</p>
    </div>
  );
}