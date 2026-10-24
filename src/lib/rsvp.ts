export interface Companion {
  name: string;
  is_child: boolean;
}

export interface Rsvp {
  name: string;
  email: string;
  attending: boolean;
  companions: Companion[];
}

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

/** Inserts an RSVP through Supabase's REST API (anon role may only insert, see supabase/schema.sql). */
export async function submitRsvp(rsvp: Rsvp): Promise<void> {
  if (!url || !anonKey) throw new Error("Supabase is not configured (PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY).");

  const response = await fetch(`${url}/rest/v1/rsvps`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(rsvp),
  });
  if (!response.ok) throw new Error(`RSVP insert failed: ${response.status} ${await response.text()}`);
}
