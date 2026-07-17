"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

const allowedStatuses = [
  "Pending",
  "Confirmed",
  "Assigned",
  "On the Way",
  "Arrived",
  "In Progress",
  "Completed",
  "Cancelled",
];

export async function updateAppointmentStatus(formData: FormData) {
  const appointmentId = String(formData.get("appointmentId") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!appointmentId || !allowedStatuses.includes(status)) {
    throw new Error("Invalid appointment status.");
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user ||
    user.email?.toLowerCase() !== process.env.OWNER_EMAIL?.toLowerCase()
  ) {
    redirect("/owner/login");
  }

  const { data: updatedAppointment, error } = await supabase
  .from("appointments")
  .update({ status })
  .eq("id", appointmentId)
  .select("id, status")
  .single();

if (error) {
  throw new Error(`Status update failed: ${error.message}`);
}

if (!updatedAppointment) {
  throw new Error("No appointment was updated.");
}

  revalidatePath("/owner");
}