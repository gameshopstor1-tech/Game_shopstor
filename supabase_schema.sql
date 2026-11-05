-- ============================================================
-- GAME SHOP - Schema for Supabase
-- این فایل را در Supabase → SQL Editor کپی و Run کنید
-- ============================================================

-- فعال‌سازی extension برای UUID
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- ۱. جدول کاربران (مشتریان)
-- ------------------------------------------------------------
create table if not exists public.users (
  id            uuid primary key default gen_random_uuid(),
  full_name     text not null,
  name          text,
  contact       text not null,          -- آیدی روبیکا یا شماره تلفن
  user_code     text not null unique,   -- مثل USR-XXXXX-XXXX
  created_at    timestamptz not null default now()
);

create index if not exists idx_users_user_code on public.users (user_code);
create index if not exists idx_users_created_at on public.users (created_at desc);

-- ------------------------------------------------------------
-- ۲. جدول سفارش‌ها
-- ------------------------------------------------------------
create table if not exists public.orders (
  id              uuid primary key default gen_random_uuid(),
  order_code      text not null unique,     -- مثل GS-XXXXXX-XXXX
  user_code       text,                     -- کد کاربر (اختیاری اگر مهمان)
  customer_name   text,
  contact         text,
  items           jsonb not null default '[]'::jsonb,  -- آرایه محصولات + تعداد
  total           integer not null default 0,          -- تومان
  payment_method  text,                     -- card / rubika / other
  status          text not null default 'pending',     -- pending | paid | processing | delivered | cancelled
  note            text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists idx_orders_order_code on public.orders (order_code);
create index if not exists idx_orders_user_code on public.orders (user_code);
create index if not exists idx_orders_status on public.orders (status);
create index if not exists idx_orders_created_at on public.orders (created_at desc);

-- ------------------------------------------------------------
-- ۳. جدول همکاران (و مالک)
-- ------------------------------------------------------------
-- role: 'owner' | 'collaborator'
create table if not exists public.collaborators (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  username      text not null unique,
  password_hash text not null,              -- هش رمز (هرگز رمز خام ذخیره نکنید)
  code          text,                       -- مثل COL-XXXXX
  role          text not null default 'collaborator' check (role in ('owner', 'collaborator')),
  rubika_id     text,                       -- آیدی روبیکا همکار
  is_active     boolean not null default true,
  created_at    timestamptz not null default now()
);

-- اگر جدول از قبل وجود داشت، ستون آیدی روبیکا را اضافه کن
alter table public.collaborators add column if not exists rubika_id text;

create index if not exists idx_collaborators_username on public.collaborators (username);

-- ------------------------------------------------------------
-- ۴. تابع به‌روزرسانی updated_at
-- ------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_orders_updated_at on public.orders;
create trigger trg_orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- ۵. Row Level Security (RLS)
-- ------------------------------------------------------------
alter table public.users enable row level security;
alter table public.orders enable row level security;
alter table public.collaborators enable row level security;

-- سیاست‌های ساده برای شروع (با کلید anon):
-- همه می‌توانند کاربر و سفارش ثبت کنند
-- همه می‌توانند سفارش را با کد پیگیری کنند
-- خواندن لیست کامل کاربران/سفارش‌ها و مدیریت همکاران فقط از طریق سرویس role یا بعداً با JWT محدود می‌شود

-- کاربران: هر کسی می‌تواند ثبت‌نام کند و بخواند (برای پنل ساده)
drop policy if exists "users_insert_public" on public.users;
create policy "users_insert_public" on public.users
  for insert with check (true);

drop policy if exists "users_select_public" on public.users;
create policy "users_select_public" on public.users
  for select using (true);

-- سفارش‌ها: ثبت و خواندن عمومی (بعداً می‌توانید سخت‌گیرانه‌تر کنید)
drop policy if exists "orders_insert_public" on public.orders;
create policy "orders_insert_public" on public.orders
  for insert with check (true);

drop policy if exists "orders_select_public" on public.orders;
create policy "orders_select_public" on public.orders
  for select using (true);

drop policy if exists "orders_update_public" on public.orders;
create policy "orders_update_public" on public.orders
  for update using (true);

-- همکاران: فقط خواندن برای لاگین (رمز هش‌شده است)
-- نوشتن/حذف را بعداً با service_role یا Edge Function محدود کنید
drop policy if exists "collaborators_select_public" on public.collaborators;
create policy "collaborators_select_public" on public.collaborators
  for select using (true);

drop policy if exists "collaborators_insert_public" on public.collaborators;
create policy "collaborators_insert_public" on public.collaborators
  for insert with check (true);

drop policy if exists "collaborators_update_public" on public.collaborators;
create policy "collaborators_update_public" on public.collaborators
  for update using (true);

drop policy if exists "collaborators_delete_public" on public.collaborators;
create policy "collaborators_delete_public" on public.collaborators
  for delete using (true);

-- ------------------------------------------------------------
-- ۶. مالک پیش‌فرض (اختیاری)
-- رمز: gsowner1405
-- هش با pgcrypto (crypt + gen_salt)
-- توجه: این هش با الگوریتم blowfish است. در فرانت باید با همان روش چک شود
-- یا بهتر است از Edge Function برای لاگین استفاده کنید.
-- ------------------------------------------------------------
-- اگر می‌خواهید مالک را از قبل داشته باشید، این را از کامنت خارج کنید
-- و یک‌بار اجرا کنید (رمز پیش‌فرض: gsowner1405)

/*
insert into public.collaborators (name, username, password_hash, code, role)
values (
  'مالک فروشگاه',
  'admin',
  crypt('gsowner1405', gen_salt('bf')),
  'COL-OWNER',
  'owner'
)
on conflict (username) do nothing;
*/

-- ------------------------------------------------------------
-- ۷. نمای مفید (اختیاری)
-- ------------------------------------------------------------
create or replace view public.orders_summary as
select
  id,
  order_code,
  customer_name,
  contact,
  total,
  payment_method,
  status,
  created_at,
  jsonb_array_length(items) as item_count
from public.orders
order by created_at desc;

-- تمام!
-- حالا در فرانت‌اند از این جداول استفاده کنید.
-- Project URL و anon key را از Settings → API کپی کنید.


-- ============================================================
-- ۸. امکانات جدید GAME SHOP
-- ============================================================

-- وضعیت کاربر ویژه در جدول کاربران عادی
alter table public.users add column if not exists is_premium boolean not null default false;
alter table public.users add column if not exists premium_expires_at timestamptz;

-- حساب‌های ویژه با نام کاربری/رمز و تاریخ انقضا که مالک تعیین می‌کند
create table if not exists public.premium_users (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  username    text not null unique,
  password    text not null,
  expires_at  timestamptz not null,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

create index if not exists idx_premium_users_username on public.premium_users(username);
create index if not exists idx_premium_users_expires_at on public.premium_users(expires_at desc);

alter table public.premium_users enable row level security;

drop policy if exists "premium_users_select_public" on public.premium_users;
create policy "premium_users_select_public" on public.premium_users
  for select using (true);

drop policy if exists "premium_users_insert_public" on public.premium_users;
create policy "premium_users_insert_public" on public.premium_users
  for insert with check (true);

drop policy if exists "premium_users_update_public" on public.premium_users;
create policy "premium_users_update_public" on public.premium_users
  for update using (true);

drop policy if exists "premium_users_delete_public" on public.premium_users;
create policy "premium_users_delete_public" on public.premium_users
  for delete using (true);
