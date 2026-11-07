-- ============================================================
-- جدول برچسب «پرفروش» — یک‌بار در Supabase → SQL Editor اجرا کن
-- ============================================================
create table if not exists public.bestsellers (
  product_id  integer primary key,
  created_at  timestamptz not null default now()
);

alter table public.bestsellers enable row level security;

drop policy if exists "bestsellers_select_public" on public.bestsellers;
create policy "bestsellers_select_public" on public.bestsellers
  for select using (true);

-- توجه: چون سایت لاگین سمت سرور ندارد، نوشتن/حذف هم با کلید عمومی باز است
-- (مثل بقیه جدول‌ها). برای امن‌شدن کامل باید ورود مالک با Supabase Auth انجام شود.
drop policy if exists "bestsellers_insert_public" on public.bestsellers;
create policy "bestsellers_insert_public" on public.bestsellers
  for insert with check (true);

drop policy if exists "bestsellers_delete_public" on public.bestsellers;
create policy "bestsellers_delete_public" on public.bestsellers
  for delete using (true);
