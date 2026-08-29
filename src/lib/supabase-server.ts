import { createServerClient, type CookieOptionsWithName } from "@supabase/ssr";
import type { AstroCookies } from "astro";

const cookieOptions: CookieOptionsWithName = {
  path: "/",
  httpOnly: true,
  secure: true,
  sameSite: "lax",
};

export function createSupabaseServerClient(request: Request, cookies: AstroCookies) {
  const supabaseUrl = import.meta.env.SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("SUPABASE_URL / SUPABASE_ANON_KEY sind nicht gesetzt.");
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookieOptions,
    cookies: {
      getAll() {
        const header = request.headers.get("cookie") ?? "";
        return header
          .split(";")
          .map((pair) => pair.trim())
          .filter(Boolean)
          .map((pair) => {
            const index = pair.indexOf("=");
            return {
              name: decodeURIComponent(pair.slice(0, index)),
              value: decodeURIComponent(pair.slice(index + 1)),
            };
          });
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookies.set(name, value, options);
        });
      },
    },
  });
}
