"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";

const supabase = createClient();

export default function OwnerLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setMessage("Checking your login...");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    console.log("Supabase login result:", { data, error });

    if (error) {
      setMessage(`Login failed: ${error.message}`);
      setIsSubmitting(false);
      return;
    }

    if (!data.session) {
      setMessage("Login succeeded, but no session was created.");
      setIsSubmitting(false);
      return;
    }

    setMessage("Login successful. Opening dashboard...");

    router.push("/owner");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-10">
        <p className="text-sm font-black uppercase tracking-[0.4em] text-[#FFD100]">
          Perry Platform
        </p>

        <h1 className="mt-4 text-4xl font-black uppercase text-white">
          Owner Login
        </h1>

        <form onSubmit={handleLogin} className="mt-10 space-y-6">
          <label className="block">
            <span className="font-bold uppercase text-gray-300">Email</span>

            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none focus:border-[#FFD100]"
            />
          </label>

          <label className="block">
            <span className="font-bold uppercase text-gray-300">Password</span>

            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none focus:border-[#FFD100]"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-[#FFD100] py-4 font-black uppercase text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>

          {message && (
            <p className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white">
              {message}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}