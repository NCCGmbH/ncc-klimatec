import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "../../../lib/supabase-server";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: "E-Mail und Passwort erforderlich." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const supabase = createSupabaseServerClient(request, cookies);
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return new Response(
      JSON.stringify({ error: "E-Mail oder Passwort ist falsch." }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
