import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

const resend = new Resend(process.env.RESEND_API_KEY);

type ConfirmationRequest = {
  email: string;
  firstName: string;
  lastName: string;
  serviceName: string;
  appointmentMonth: string;
  appointmentDay: string;
  appointmentYear: number;
  appointmentTime: string;
  address: string;
  city: string;
  zip: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ConfirmationRequest;

    const {
      email,
      firstName,
      lastName,
      serviceName,
      appointmentMonth,
      appointmentDay,
      appointmentYear,
      appointmentTime,
      address,
      city,
      zip,
    } = body;

    if (
      !email ||
      !firstName ||
      !lastName ||
      !serviceName ||
      !appointmentMonth ||
      !appointmentDay ||
      !appointmentYear ||
      !appointmentTime
    ) {
      return NextResponse.json(
        { error: "Missing required confirmation information." },
        { status: 400 }
      );
    }

    const { error: emailError } = await resend.emails.send({
      // Use this while testing.
      // After verifying your own domain, replace it with something like:
      // from: "Perry's Mobile Detailing <appointments@yourdomain.com>"
      from: "Perry's Mobile Detailing <onboarding@resend.dev>",

      to: email,

      subject: "Your Perry's Mobile Detailing Appointment",

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111111;">
          <h1 style="margin-bottom: 8px;">
            Appointment Received
          </h1>

          <p>
            Hello ${escapeHtml(firstName)} ${escapeHtml(lastName)},
          </p>

          <p>
            Thank you for booking with Perry's Mobile Detailing.
            We received your appointment request.
          </p>

          <div style="padding: 18px; background: #f4f4f4; border-radius: 10px;">
            <p><strong>Service:</strong> ${escapeHtml(serviceName)}</p>

            <p>
              <strong>Date:</strong>
              ${escapeHtml(appointmentMonth)}
              ${escapeHtml(appointmentDay)},
              ${appointmentYear}
            </p>

            <p>
              <strong>Time:</strong>
              ${escapeHtml(appointmentTime)}
            </p>

            <p>
              <strong>Service address:</strong><br />
              ${escapeHtml(address)}<br />
              ${escapeHtml(city)}, TX ${escapeHtml(zip)}
            </p>
          </div>

          <p>
            We will contact you if any additional information is needed.
          </p>

          <p>
            Perry's Mobile Detailing<br />
            Luxury results. Right at your door!
          </p>
        </div>
      `,
    });

    if (emailError) {
      console.error("Resend error:", emailError);

      return NextResponse.json(
        { error: emailError.message },
        { status: 500 }
      );
    }

    const { error: updateError } = await supabaseAdmin
      .from("appointments")
      .update({
        confirmation_email_sent: true,
      })
      .eq("email", email)
      .eq("appointment_month", appointmentMonth)
      .eq("appointment_day", appointmentDay)
      .eq("appointment_year", appointmentYear)
      .eq("appointment_time", appointmentTime)
      .eq("confirmation_email_sent", false);

    if (updateError) {
      console.error("Supabase confirmation update error:", updateError);

      return NextResponse.json(
        {
          error:
            "The email was sent, but the database confirmation flag was not updated.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error: unknown) {
    console.error("Confirmation route error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to send confirmation email.",
      },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}