-- Run once in the Supabase SQL editor.

-- Companions: [{ "name": "Léa Dupont", "is_child": false }, ...], at most 10.
create or replace function public.valid_companions(j jsonb) returns boolean
language sql immutable as $$
  select jsonb_typeof(j) = 'array' and jsonb_array_length(j) <= 10
    and not exists (
      select 1 from jsonb_array_elements(j) c
      where jsonb_typeof(c) <> 'object'
         or jsonb_typeof(c->'name') is distinct from 'string'
         or char_length(trim(c->>'name')) not between 1 and 200
         or jsonb_typeof(c->'is_child') is distinct from 'boolean'
    )
$$;

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(trim(name)) between 1 and 200),
  email text not null check (char_length(email) <= 320 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  attending boolean not null,
  companions jsonb not null default '[]'::jsonb check (public.valid_companions(companions))
);

-- Guests (anon key, shipped in the static site) can only insert; reading stays in the dashboard.
alter table public.rsvps enable row level security;

drop policy if exists "Guests can submit an RSVP" on public.rsvps;
create policy "Guests can submit an RSVP"
  on public.rsvps for insert
  to anon
  with check (true);

-- Column-level grant: id and created_at always come from their defaults.
revoke all on public.rsvps from anon;
grant insert (name, email, attending, companions) on public.rsvps to anon;

-- One row per guest (main respondent + companions), latest answer per email wins.
-- Anyone knowing a guest's email could override their answer: check odd changes in the raw table.
-- Not exposed to anon: read it from the dashboard / SQL editor.
create or replace view public.rsvp_guests
with (security_invoker = true) as
with latest as (
  select distinct on (lower(email)) *
  from public.rsvps
  order by lower(email), created_at desc
)
select l.email, l.name, false as is_child, l.attending, l.created_at
from latest l
union all
select l.email, c->>'name', (c->>'is_child') = 'true', l.attending, l.created_at
from latest l, jsonb_array_elements(l.companions) c;

revoke all on public.rsvp_guests from anon, authenticated;

-- Quick headcount:
-- select attending, is_child, count(*) from public.rsvp_guests group by 1, 2;
