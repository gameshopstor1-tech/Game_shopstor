# راهنمای اتصال GAME SHOP به Supabase

## مرحله ۱: ساخت پروژه در Supabase
1. بروید به https://supabase.com و وارد شوید.
2. **New Project** بزنید.
3. نام پروژه، رمز دیتابیس و منطقه را انتخاب کنید (منطقه نزدیک‌تر بهتر است).
4. چند دقیقه صبر کنید تا پروژه آماده شود.

## مرحله ۲: اجرای Schema
1. از منوی سمت چپ بروید به **SQL Editor**.
2. دکمه **New query** را بزنید.
3. کل محتوای فایل `supabase_schema.sql` را کپی و پیست کنید.
4. روی **Run** کلیک کنید.
5. اگر خطایی ندید، جداول ساخته شده‌اند.

بررسی: بروید به **Table Editor** — باید سه جدول ببینید:
- `users`
- `orders`
- `collaborators`

## مرحله ۳: گرفتن کلیدها
1. بروید به **Project Settings** (آیکون چرخ‌دنده) → **API**.
2. این دو مقدار را کپی کنید:
   - **Project URL** (مثل `https://abcdefgh.supabase.co`)
   - **anon public** key (کلید طولانی که با `eyJ...` شروع می‌شود)

این دو مقدار را در فایل `script.js` فرانت‌اند قرار می‌دهید.

## مرحله ۴: (اختیاری) ساخت مالک پیش‌فرض
اگر می‌خواهید همان نام کاربری `admin` و رمز `gsowner1405` از قبل وجود داشته باشد:

1. در SQL Editor این کد را اجرا کنید:

```sql
insert into public.collaborators (name, username, password_hash, code, role)
values (
  'مالک فروشگاه',
  'admin',
  crypt('gsowner1405', gen_salt('bf')),
  'COL-OWNER',
  'owner'
)
on conflict (username) do nothing;
```

**توجه:** هش با `crypt` (blowfish) ساخته می‌شود. برای چک کردن رمز در فرانت‌اند باید از Edge Function استفاده کنید یا موقتاً رمز را ساده نگه دارید (توصیه نمی‌شود برای تولید).

## مرحله ۵: امنیت بیشتر (پیشنهادی بعداً)
سیاست‌های RLS فعلی برای شروع و تست باز هستند. بعد از اینکه فرانت‌اند وصل شد:
- نوشتن روی جدول `collaborators` را فقط به service_role محدود کنید.
- از Supabase Auth یا Edge Function برای ورود مالک/همکار استفاده کنید.
- رمزها را هرگز به صورت خام ذخیره نکنید.

## مرحله ۶: اتصال فرانت‌اند
در نسخه بعدی `script.js`، به جای `localStorage` از این توابع استفاده می‌شود:

```js
const SUPABASE_URL = 'https://XXXX.supabase.co';
const SUPABASE_ANON_KEY = 'eyJ....';

// مثال خواندن سفارش‌ها
async function fetchOrders() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/orders?select=*&order=created_at.desc`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`
    }
  });
  return res.json();
}
```

یا با کتابخانه رسمی:
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

```js
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const { data, error } = await supabase.from('orders').select('*');
```

---

اگر در اجرای SQL خطا گرفتید، متن خطا را بفرستید تا اصلاح کنم.
