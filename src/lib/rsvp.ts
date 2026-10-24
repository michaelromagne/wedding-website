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
const publishableKey = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/**
 * Inserts an RSVP through Supabase's REST API. The publishable key maps to the anon role,
 * which may only insert (see supabase/schema.sql). It is not a JWT, so no Authorization header.
 */
export async function submitRsvp(rsvp: Rsvp): Promise<void> {
  if (!url || !publishableKey)
    throw new Error("Supabase is not configured (PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_PUBLISHABLE_KEY).");

  const response = await fetch(`${url}/rest/v1/rsvps`, {
    method: "POST",
    headers: {
      apikey: publishableKey,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(rsvp),
  });
  if (!response.ok) throw new Error(`RSVP insert failed: ${response.status} ${await response.text()}`);
}
