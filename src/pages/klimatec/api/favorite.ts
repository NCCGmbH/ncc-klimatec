import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const { user, supabase } = locals;

  if (!user) {
    return new Response(
      JSON.stringify({ error: "Nicht angemeldet." }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const { id, favorite } = await request.json();

  if (!id || typeof favorite !== "boolean") {
    return new Response(
      JSON.stringify({ error: "Ungültige Anfrage." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { error } = await supabase
    .from("contact_requests")
    .update({ favorite })
    .eq("id", id);

  if (error) {
    console.error("Supabase update error:", error);
    return new Response(
      JSON.stringify({ error: "Status konnte nicht aktualisiert werden." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
