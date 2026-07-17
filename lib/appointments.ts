import { supabase } from "./supabaseClient";

export type AppointmentData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  sms_consent?: boolean;

  address: string;
  city: string;
  zip: string;

  appointment_month: string;
  appointment_day: string;
  appointment_year: number;
  appointment_time: string;

  service_name: string;
  add_ons: unknown;
  vehicle_year: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_color: string;
  vehicle_type: string;
  total_price: number;

  status?: string;
};

export async function createAppointment(
  data: AppointmentData
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