import type { APIRoute } from "astro";

export const prerender = false;

const VALID_STATUSES = ["Offen", "InKontakt", "AuftragAngenommen", "Abgeschlossen", "Gelöscht"] as const;

export const POST: APIRoute = async ({ request, locals }) => {
  const { user, supabase } = locals;

  if (!user) {
    return new Response(
      JSON.stringify({ error: "Nicht angemeldet." }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const { id, status } = await request.json();

  if (!id || !VALID_STATUSES.includes(status)) {
    return new Response(
      JSON.stringify({ error: "Ungültige Anfrage." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { error } = await supabase
    .from("contact_requests")
    .update({ status })
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
