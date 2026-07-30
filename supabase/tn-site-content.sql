create table if not exists public.tn_site_content (
  site_key text not null,
  content_key text not null,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (site_key, content_key)
);

alter table public.tn_site_content enable row level security;

drop policy if exists "service role manages tn site content" on public.tn_site_content;

create policy "service role manages tn site content"
on public.tn_site_content
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
