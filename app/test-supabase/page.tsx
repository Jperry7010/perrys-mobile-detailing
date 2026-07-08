import { supabase } from "../../lib/supabaseClient";

export default async function TestSupabasePage() {
  const { error } = await supabase.from("appointments").select("*").limit(1);

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="text-4xl font-black">Supabase Test</h1>

      <p className="mt-6">
        {error
          ? `Connected, but table does not exist yet: ${error.message}`
          : "Connected successfully."}
      </p>
    </main>
  );
}