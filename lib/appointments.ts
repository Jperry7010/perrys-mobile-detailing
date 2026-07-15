import { supabase } from "./supabaseClient";

export async function createAppointment(
  data: Record<string, unknown>
) {
  const { error } = await supabase
    .from("appointments")
    .insert([
      {
        ...data,
        status: data.status ?? "Pending",
      },
    ]);

  if (error) {
    throw new Error(error.message);
  }
}