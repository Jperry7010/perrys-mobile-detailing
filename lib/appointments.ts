import { supabase } from "./supabaseClient";

export async function createAppointment(data: any) {
  const { data: appointment, error } = await supabase
    .from("appointments")
    .insert([
      {
        ...data,
        status: data.status ?? "Pending",
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return appointment;
}