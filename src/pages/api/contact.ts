import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();

  const { name, firstName, gender, birthDate, email, tel, street, zipCode, city, textField } = data;

  if (!name || !email || !street || !zipCode || !city || !gender || !birthDate) {
    return new Response(
      JSON.stringify({ error: "Pflichtfelder fehlen." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { error } = await supabase.from("contact_requests").insert({
    name,
    first_name: firstName || null,
    gender,
    birth_date: birthDate,
    email,
    tel: tel || null,
    street,
    zip_code: zipCode,
    city,
    text_field: textField || null,
    status: "Offen",
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return new Response(
      JSON.stringify({ error: "Anfrage konnte nicht gespeichert werden." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
