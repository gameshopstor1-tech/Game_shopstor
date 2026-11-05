// ==================== ثابت‌ها و داده‌ها ====================
const RUBIKA_USERNAME = "Monnomyt";
const RUBIKA_URL = "https://rubika.ir/Monnomyt";
const TELEGRAM_USERNAME = "Amir_Ali_1_8";
const TELEGRAM_URL = "https://t.me/Amir_Ali_1_8";

// اطلاعات ورود مالک (فقط مالک با این مشخصات وارد پنل می‌شود)
const OWNER_USER = "admin";
const OWNER_PASS = "gsowner1405";

// ==================== اتصال به Supabase ====================
const SUPABASE_URL = "https://sigfvddetklihejekhib.supabase.co";
const SUPABASE_KEY = "sb_publishable_vpvDVk9tXr4mYpVApjlWDA_6_NNpVin";

const sbHeaders = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation"
};

async function sbGet(table, query = "") {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
    });
    if (!res.ok) {
      console.error("Supabase GET error", table, res.status, await res.text());
      return [];
    }
    return await res.json();
  } catch (e) {
    console.error("Supabase network error", e);
    return [];
  }
}

async function sbInsert(table, row) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: sbHeaders,
      body: JSON.stringify(row)
    });
    if (!res.ok) {
      console.error("Supabase INSERT error", table, res.status, await res.text());
      return null;
    }
    const data = await res.json();
    return Array.isArray(data) ? data[0] : data;
  } catch (e) {
    console.error("Supabase network error", e);
    return null;
  }
}

async function sbDelete(table, query) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
      method: "DELETE",
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
    });
    return res.ok;
  } catch (e) {
    console.error("Supabase delete error", e);
    return false;
  }
}

async function sbUpdate(table, query, data) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
      method: "PATCH",
      headers: sbHeaders,
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      console.error("Supabase UPDATE error", table, res.status, await res.text());
      return null;
    }
    const result = await res.json();
    return Array.isArray(result) ? result[0] : result;
  } catch (e) {
    console.error("Supabase update error", e);
    return null;
  }
}

const products = [
  // شارژ بازی‌ها
  {id:17, game:"cod", gameName:"Call of Duty", icon:"💙", title:"۸۰ CP کالاف دیوتی", details:"شارژ CP • ویژه خرید اول: CP دوبل", price:200000},
  {id:18, game:"cod", gameName:"Call of Duty", icon:"💙", title:"۴۰۰ CP کالاف دیوتی", details:"شارژ CP • ویژه خرید اول: CP دوبل", price:950000},
  {id:19, game:"cod", gameName:"Call of Duty", icon:"💙", title:"۸۰۰ CP کالاف دیوتی", details:"شارژ CP • ویژه خرید اول: CP دوبل", price:1750000},
  {id:20, game:"cod", gameName:"Call of Duty", icon:"💙", title:"۲۰۰۰ CP کالاف دیوتی", details:"شارژ CP • ویژه خرید اول: CP دوبل", price:2000000},
  {id:21, game:"cod", gameName:"Call of Duty", icon:"💙", title:"۴۰۰۰ CP کالاف دیوتی", details:"شارژ CP • ویژه خرید اول: CP دوبل", price:9500000},
  {id:22, game:"cod", gameName:"Call of Duty", icon:"💙", title:"۸۰۰۰ CP کالاف دیوتی", details:"شارژ CP • ویژه خرید اول: CP دوبل", price:18000000},

  {id:23, game:"freefire", gameName:"Free Fire", icon:"💎", title:"۲۱۰ جم فری فایر", details:"همراه با کارت هدیه • ۳۱ جم رایگان", price:400000},
  {id:24, game:"freefire", gameName:"Free Fire", icon:"💎", title:"۵۸۳ جم فری فایر", details:"همراه با کارت هدیه", price:1000000},
  {id:25, game:"freefire", gameName:"Free Fire", icon:"💎", title:"۱۱۸۸ جم فری فایر", details:"همراه با کارت هدیه", price:2000000},
  {id:26, game:"freefire", gameName:"Free Fire", icon:"💎", title:"۲۴۲۰ جم فری فایر", details:"همراه با کارت هدیه", price:4000000},

  {id:27, game:"pubg", gameName:"PUBG", icon:"🟡", title:"۶۰ UC پابجی", details:"UC پابجی موبایل", price:200000},
  {id:28, game:"pubg", gameName:"PUBG", icon:"🟡", title:"۳۰۰ + ۲۵ UC پابجی", details:"مجموع ۳۲۵ UC", price:950000},
  {id:29, game:"pubg", gameName:"PUBG", icon:"🟡", title:"۶۰۰ + ۶۰ UC پابجی", details:"مجموع ۶۶۰ UC", price:2000000},
  {id:30, game:"pubg", gameName:"PUBG", icon:"🟡", title:"۱۵۰۰ + ۳۰۰ UC پابجی", details:"مجموع ۱۸۰۰ UC", price:5000000},
  {id:31, game:"pubg", gameName:"PUBG", icon:"🟡", title:"۳۰۰۰ + ۸۰۰ UC پابجی", details:"مجموع ۳۸۰۰ UC", price:9000000},
  {id:32, game:"pubg", gameName:"PUBG", icon:"🟡", title:"۶۰۰۰ + ۲۱۰۰ UC پابجی", details:"مجموع ۸۱۰۰ UC", price:19000000},

  {id:1, game:"buyaccount", gameName:"خرید اکانت بازی", icon:"⚽", title:"اکانت eFootball Premium", details:"OVR 2935 • ۲ بازیکن رویال • ۲ اپیک", price:850000},
  {id:2, game:"buyaccount", gameName:"خرید اکانت بازی", icon:"⚽", title:"اکانت eFootball Epic", details:"بازیکنان ویژه • ترکیب قدرتمند • آماده بازی", price:1250000},
  {id:3, game:"buyaccount", gameName:"خرید اکانت بازی", icon:"🔫", title:"اکانت Call of Duty", details:"لول بالا • اسکین‌های ویژه • مناسب موبایل", price:690000},
  {id:4, game:"buyaccount", gameName:"خرید اکانت بازی", icon:"🔫", title:"اکانت COD Premium", details:"آیتم‌های متعدد • لوداوت کامل", price:990000},
  {id:5, game:"buyaccount", gameName:"خرید اکانت بازی", icon:"🔥", title:"اکانت Free Fire", details:"لول بالا • اسکین و آیتم ویژه", price:480000},
  {id:6, game:"buyaccount", gameName:"خرید اکانت بازی", icon:"🔥", title:"اکانت Free Fire Elite", details:"Bundleهای ویژه • آیتم‌های کمیاب", price:780000},
  {id:7, game:"buyaccount", gameName:"خرید اکانت بازی", icon:"🪖", title:"اکانت PUBG Mobile", details:"لول بالا • اسکین‌های متنوع", price:620000},
  {id:8, game:"buyaccount", gameName:"خرید اکانت بازی", icon:"🪖", title:"اکانت PUBG Premium", details:"اسکین‌های ویژه • موجودی کامل", price:1100000},
  {id:9, game:"efootball", gameName:"eFootball", icon:"🟡", title:"کارت لوئیس سوارز", details:"کارت ویژه • مناسب خرید و فعال‌سازی", price:340920},
  {id:10, game:"efootball", gameName:"eFootball", icon:"🪙", title:"۱۳۰ سکه eFootball", details:"۱۳۰ سکه • تحویل سریع پس از تأیید سفارش", price:287136},
  {id:11, game:"efootball", gameName:"eFootball", icon:"🪙", title:"۵۵۰ سکه eFootball", details:"۵۵۰ سکه • تحویل سریع پس از تأیید سفارش", price:1088671},
  {id:12, game:"efootball", gameName:"eFootball", icon:"🎁", title:"۱۳۰ سکه + ۱۳۰ سکه رایگان", details:"مجموع ۲۶۰ سکه • پیشنهاد ویژه", price:272736},
  {id:13, game:"clash", gameName:"Clash of Clans", icon:"👑", title:"بلیط طلایی (۳ دلاری)", details:"آفر ویژه کلش اف کلنز • قیمت اعلام‌شده فروشگاه", price:680400},
  {id:14, game:"clash", gameName:"Clash of Clans", icon:"🎟️", title:"بلیط طلایی", details:"آفر ویژه کلش اف کلنز • قیمت اعلام‌شده فروشگاه", price:1587600},
  {id:15, game:"clash", gameName:"Clash of Clans", icon:"👷", title:"بسته کارگر سوم + ۲۰۰ جم هدیه", details:"کارگر سوم + ۲۰۰ جم هدیه • پیشنهاد ویژه", price:453600},
  {id:16, game:"clash", gameName:"Clash of Clans", icon:"💎", title:"بسته کارگر چهارم + ۱۰۰۰ جم هدیه", details:"کارگر چهارم + ۱۰۰۰ جم هدیه • پیشنهاد ویژه", price:1134000},

  // Clash Royale | جم و آفر
  {id:33, game:"clashroyale", gameName:"Clash Royale", icon:"👑", title:"۸۰ جم کلش رویال", details:"شارژ جم • کلش رویال", price:200000},
  {id:34, game:"clashroyale", gameName:"Clash Royale", icon:"💎", title:"۵۰۰ جم کلش رویال", details:"شارژ جم • کلش رویال", price:1069500},
  {id:35, game:"clashroyale", gameName:"Clash Royale", icon:"💎", title:"۱,۲۰۰ جم کلش رویال", details:"شارژ جم • کلش رویال", price:2116000},
  {id:36, game:"clashroyale", gameName:"Clash Royale", icon:"💎", title:"۱۴,۰۰۰ جم کلش رویال", details:"شارژ جم • کلش رویال", price:19000000},
  {id:37, game:"clashroyale", gameName:"Clash Royale", icon:"🎫", title:"دایموند پس کلش رویال", details:"آفر ویژه • کلش رویال", price:2530000},
  {id:38, game:"clashroyale", gameName:"Clash Royale", icon:"🏆", title:"گلد پس کلش رویال", details:"آفر ویژه • کلش رویال", price:1265000},
  {id:39, game:"clashroyale", gameName:"Clash Royale", icon:"🔥", title:"آفرهای جدید کلش رویال", details:"آفر ویژه • کلش رویال", price:199000},

  // Telegram Stars
  {id:40, game:"telegram", gameName:"Telegram", icon:"⭐", title:"۵۰ استارز تلگرام", details:"Telegram Stars", price:196800},
  {id:41, game:"telegram", gameName:"Telegram", icon:"⭐", title:"۲۰۰ استارز تلگرام", details:"Telegram Stars", price:315480},
  {id:42, game:"telegram", gameName:"Telegram", icon:"⭐", title:"۵۰۰ استارز تلگرام", details:"Telegram Stars", price:1986000},
  {id:43, game:"telegram", gameName:"Telegram", icon:"⭐", title:"۱,۲۰۰ استارز تلگرام", details:"Telegram Stars", price:4764000},
  {id:44, game:"telegram", gameName:"Telegram", icon:"⭐", title:"۷,۰۰۰ استارز تلگرام", details:"Telegram Stars", price:27805200},

  // Telegram Premium
  {id:45, game:"telegram", gameName:"Telegram", icon:"💎", title:"تلگرام پرمیوم ۳ ماهه", details:"Telegram Premium", price:2901450},
  {id:46, game:"telegram", gameName:"Telegram", icon:"💎", title:"تلگرام پرمیوم ۶ ماهه", details:"Telegram Premium", price:3958800},
  {id:47, game:"telegram", gameName:"Telegram", icon:"💎", title:"تلگرام پرمیوم ۱۲ ماهه", details:"Telegram Premium", price:6000000},

  // FC Mobile | آفر
  {id:48, game:"fcmobile", gameName:"FC Mobile", icon:"⚽", title:"پریمیوم لجند پس A", details:"آفر ویژه FC Mobile", price:2472500},
  {id:49, game:"fcmobile", gameName:"FC Mobile", icon:"⚽", title:"پریمیوم لجند پس B", details:"آفر ویژه FC Mobile", price:4025000},
  {id:50, game:"fcmobile", gameName:"FC Mobile", icon:"⚽", title:"پریمیوم لجند پس C", details:"آفر ویژه FC Mobile", price:4532000},

  // Roblox | Robux
  {id:51, game:"roblox", gameName:"Roblox", icon:"🎮", title:"۴۰ روباکس", details:"شارژ Robux", price:154100},
  {id:52, game:"roblox", gameName:"Roblox", icon:"💎", title:"۴۰۰ روباکس", details:"شارژ Robux", price:1023500},
  {id:53, game:"roblox", gameName:"Roblox", icon:"💎", title:"۸۰۰ روباکس", details:"شارژ Robux", price:2058500},
  {id:54, game:"roblox", gameName:"Roblox", icon:"💎", title:"۱,۷۰۰ روباکس", details:"شارژ Robux", price:3850000},

  // پسرخوانده | الماس و آفر
  {id:55, game:"pesarkhande", gameName:"پسرخوانده", icon:"👑", title:"۴۰۰ الماس پسرخوانده", details:"شارژ الماس", price:110000},
  {id:56, game:"pesarkhande", gameName:"پسرخوانده", icon:"💎", title:"۱,۰۰۰ الماس پسرخوانده", details:"شارژ الماس", price:210940},
  {id:57, game:"pesarkhande", gameName:"پسرخوانده", icon:"💎", title:"۱۳,۰۰۰ الماس پسرخوانده", details:"شارژ الماس", price:2185000},
  {id:58, game:"pesarkhande", gameName:"پسرخوانده", icon:"💎", title:"۲۴,۰۰۰ الماس پسرخوانده", details:"شارژ الماس", price:4000000},
  {id:59, game:"pesarkhande", gameName:"پسرخوانده", icon:"🎫", title:"بلیط طلایی پسرخوانده", details:"آفر ویژه", price:548900},

  // گیفت کارت‌ها
  {id:60, game:"giftcard", gameName:"گیفت کارت", icon:"🟦", title:"گیفت کارت Steam ۵۰ دلاری", details:"گیفت کارت استیم", price:10540000},
  {id:61, game:"giftcard", gameName:"گیفت کارت", icon:"🎮", title:"گیفت کارت PlayStation ۵۰ دلاری", details:"گیفت کارت پلی‌استیشن", price:9000000},
  {id:62, game:"giftcard", gameName:"گیفت کارت", icon:"🍎", title:"گیفت کارت Apple ۳۰ دلاری", details:"گیفت کارت اپل", price:6000000},

  // Brawl Stars | جم و آفر
  {id:63, game:"brawlstars", gameName:"Brawl Stars", icon:"⭐", title:"۳۰ جم براول استارز", details:"شارژ جم • براول استارز", price:400000},
  {id:64, game:"brawlstars", gameName:"Brawl Stars", icon:"💎", title:"۱۷۰ جم براول استارز", details:"شارژ جم • براول استارز", price:1888000},
  {id:65, game:"brawlstars", gameName:"Brawl Stars", icon:"💎", title:"۳۶۰ جم براول استارز", details:"شارژ جم • براول استارز", price:4000000},
  {id:66, game:"brawlstars", gameName:"Brawl Stars", icon:"💎", title:"۲,۰۰۰ جم براول استارز", details:"شارژ جم • براول استارز", price:18450000},
  {id:67, game:"brawlstars", gameName:"Brawl Stars", icon:"🎟️", title:"براول پس عادی", details:"آفر ویژه براول استارز", price:2000000},
  {id:68, game:"brawlstars", gameName:"Brawl Stars", icon:"🎟️", title:"براول پس باندل", details:"آفر ویژه براول استارز", price:2800000},

  // Stumble Guys | توکن و جم
  {id:69, game:"stumbleguys", gameName:"Stumble Guys", icon:"🪙", title:"۱۲۰ توکن استامبل گایز", details:"شارژ توکن", price:930000},
  {id:70, game:"stumbleguys", gameName:"Stumble Guys", icon:"🪙", title:"۱,۳۰۰ توکن استامبل گایز", details:"شارژ توکن", price:7989000},
  {id:71, game:"stumbleguys", gameName:"Stumble Guys", icon:"💎", title:"۲۵۰ جم استامبل گایز", details:"شارژ جم", price:400000},
  {id:72, game:"stumbleguys", gameName:"Stumble Guys", icon:"💎", title:"۸۰۰ جم استامبل گایز", details:"شارژ جم", price:950000},
  {id:73, game:"stumbleguys", gameName:"Stumble Guys", icon:"🎟️", title:"Stumble Guys Pass", details:"آفر ویژه", price:850000},

  // Dream League Soccer | جم و سکه
  {id:74, game:"dls", gameName:"Dream League Soccer", icon:"⚽", title:"۹۰ جم دریم لیگ", details:"شارژ جم • دریم لیگ ساکر", price:399000},
  {id:75, game:"dls", gameName:"Dream League Soccer", icon:"💎", title:"۴۰۰,۰۰۰ جم دریم لیگ", details:"شارژ جم • دریم لیگ ساکر", price:1600000},
  {id:76, game:"dls", gameName:"Dream League Soccer", icon:"🪙", title:"۹۰۰ سکه دریم لیگ", details:"شارژ سکه", price:389000},
  {id:77, game:"dls", gameName:"Dream League Soccer", icon:"🪙", title:"۳,۰۰۰ سکه دریم لیگ", details:"شارژ سکه", price:1399000},
  {id:78, game:"dls", gameName:"Dream League Soccer", icon:"🎟️", title:"سیزن پس عادی دریم لیگ", details:"آفر ویژه", price:900000},

  // منظره کلش اف کلنز
  {id:79, game:"clash", gameName:"Clash of Clans", icon:"🌄", title:"منظره The Awesome Quest", details:"خرید منظره کلش اف کلنز", price:2116000},
  {id:80, game:"clash", gameName:"Clash of Clans", icon:"🌄", title:"منظره Odyssey", details:"خرید منظره کلش اف کلنز", price:2116000},
  {id:81, game:"clash", gameName:"Clash of Clans", icon:"🏟️", title:"منظره Glory Arena", details:"خرید منظره کلش اف کلنز", price:1472000},

  // گیف‌کارت فروشگاه پلی
  {id:82, game:"giftcard", gameName:"گیفت کارت", icon:"🎁", title:"گیفت‌کارت فروشگاه پلی ترکیه", details:"گیفت کارت گوگل پلی ترکیه", price:343850},
  {id:83, game:"giftcard", gameName:"گیفت کارت", icon:"🎁", title:"گیفت‌کارت فروشگاه پلی آمریکا", details:"گیفت کارت گوگل پلی آمریکا", price:1116640},

  // افر و پیپ پلاتو
  {id:84, game:"plato", gameName:"Plato", icon:"🎮", title:"استارتر پک پلاتو", details:"آفر ویژه پلاتو", price:782000},
  {id:85, game:"plato", gameName:"Plato", icon:"💎", title:"آفر ۳ دلاری پلاتو", details:"آفر ویژه پلاتو", price:636160},
  {id:86, game:"plato", gameName:"Plato", icon:"💎", title:"آفر ۵ دلاری پلاتو", details:"آفر ویژه پلاتو", price:1060640},
  {id:87, game:"plato", gameName:"Plato", icon:"🎟️", title:"آفر ۱۳ دلاری + ۲۷,۵۰۰ سکه + چت پس", details:"آفر ویژه پلاتو • سکه و چت پس", price:3000000},
  {id:88, game:"plato", gameName:"Plato", icon:"🪙", title:"۱۰ پیپ پلاتو", details:"شارژ پیپ پلاتو", price:199000},
  {id:89, game:"plato", gameName:"Plato", icon:"🪙", title:"۵۰ پیپ پلاتو", details:"شارژ پیپ پلاتو", price:999000},
  {id:90, game:"plato", gameName:"Plato", icon:"🪙", title:"۵۰۰ پیپ پلاتو", details:"شارژ پیپ پلاتو", price:9990000},

  // اف سی پوینت
  {id:91, game:"fcpoints", gameName:"اف سی پوینت", icon:"⚽", title:"۴۰ اف سی پوینت", details:"خرید FC Points", price:200000},
  {id:92, game:"fcpoints", gameName:"اف سی پوینت", icon:"⚽", title:"۱۰۰ اف سی پوینت", details:"خرید FC Points", price:233000},
  {id:93, game:"fcpoints", gameName:"اف سی پوینت", icon:"⚽", title:"۵۲۰ اف سی پوینت", details:"خرید FC Points", price:999000},
  {id:94, game:"fcpoints", gameName:"اف سی پوینت", icon:"⚽", title:"۱۲,۰۰۰ اف سی پوینت", details:"خرید FC Points", price:19000000},

  // اکانت کاربر ویژه سایت
  {id:95, game:"sitepremium", gameName:"کاربر ویژه سایت", icon:"⭐", title:"اکانت کاربر ویژه سایت ۱ ماهه", details:"دسترسی ویژه به تخفیف‌های سایت", price:199000},
  {id:96, game:"sitepremium", gameName:"کاربر ویژه سایت", icon:"⭐", title:"اکانت کاربر ویژه سایت ۳ ماهه", details:"دسترسی ویژه به تخفیف‌های سایت", price:269900},
  {id:97, game:"sitepremium", gameName:"کاربر ویژه سایت", icon:"⭐", title:"اکانت کاربر ویژه سایت ۶ ماهه", details:"دسترسی ویژه به تخفیف‌های سایت", price:459000},
  {id:98, game:"sitepremium", gameName:"کاربر ویژه سایت", icon:"⭐", title:"اکانت کاربر ویژه سایت ۱ ساله", details:"دسترسی ویژه به تخفیف‌های سایت", price:899000},

  // اکانت ویژه
  {id:99, game:"buyaccount", gameName:"خرید اکانت بازی", icon:"🎵", title:"اکانت ویژه اسپاتیفای", details:"اکانت پریمیوم اسپاتیفای", price:499000},
  {id:100, game:"buyaccount", gameName:"خرید اکانت بازی", icon:"🎬", title:"اکانت ویژه نتفلیکس", details:"اکانت پریمیوم نتفلیکس", price:400000},
  {id:101, game:"buyaccount", gameName:"خرید اکانت بازی", icon:"▶️", title:"اکانت ویژه یوتیوب", details:"اکانت پریمیوم یوتیوب", price:1000000},

  // افر و سکه ماینکرافت
  {id:102, game:"minecraft", gameName:"Minecraft", icon:"⛏️", title:"سکه ماینکرافت", details:"خرید سکه ماینکرافت", price:1770000},
  {id:103, game:"minecraft", gameName:"Minecraft", icon:"🎁", title:"باندل ماینکرافت", details:"آفر باندل ماینکرافت", price:1850000},
  {id:104, game:"efootball", gameName:"eFootball", icon:"⚽", title:"پک کاسیاس + 100 سکه", details:"خرید آفر و سکه ای فوتبال", price:590000},

  // کالاف دیوتی موبایل — بتل پس و گرند فورس
  {id:105, game:"cod", gameName:"Call of Duty", icon:"🎟️", title:"بتل پس برگشتی", details:"بتل پس برگشتی کالاف دیوتی موبایل • استعلام قیمت از پشتیبانی", price:0},
  {id:106, game:"cod", gameName:"Call of Duty", icon:"🎟️", title:"بتل پس عادی", details:"بتل پس عادی کالاف دیوتی موبایل • استعلام قیمت از پشتیبانی", price:0},
  {id:107, game:"cod", gameName:"Call of Duty", icon:"⚔️", title:"گرند فورس", details:"گرند فورس کالاف دیوتی موبایل • استعلام قیمت از پشتیبانی", price:0}
];

// ==================== وضعیت برنامه ====================
let currentFilter = "all";
// سبد با پشتیبانی تعداد: [{id, qty, ...product fields}]
let cart = JSON.parse(localStorage.getItem("gameShopCart") || "[]");
let currentOrderCode = null;

const money = n => new Intl.NumberFormat("fa-IR").format(n) + " تومان";

// ==================== کاربران و مالک ====================
// حالا از Supabase خوانده/نوشته می‌شود (مشترک بین همه دستگاه‌ها)

async function getUsers() {
  const rows = await sbGet("users", "select=*&order=created_at.desc");
  return (rows || []).map(r => ({
    fullName: r.full_name,
    name: r.name || (r.full_name || "").split(" ")[0],
    contact: r.contact,
    userCode: r.user_code,
    isRegistered: true,
    registeredAt: r.created_at,
    isPremium: !!r.is_premium,
    premiumExpiresAt: r.premium_expires_at || null,
    id: r.id
  }));
}

async function saveUserToCloud(user) {
  return await sbInsert("users", {
    full_name: user.fullName || user.name || "",
    name: user.name || "",
    contact: user.contact || "",
    user_code: user.userCode,
    is_premium: !!user.isPremium,
    premium_expires_at: user.premiumExpiresAt || null
  });
}

async function getOrders() {
  const rows = await sbGet("orders", "select=*&order=created_at.desc");
  return (rows || []).map(r => ({
    orderCode: r.order_code,
    userCode: r.user_code || "",
    userName: r.customer_name || "",
    contact: r.contact || "",
    items: r.items || [],
    total: r.total || 0,
    payMethod: r.payment_method || "",
    status: r.status || "pending",
    note: r.note || "",
    createdAt: r.created_at,
    id: r.id
  }));
}

async function saveOrderToCloud(order) {
  return await sbInsert("orders", {
    order_code: order.orderCode,
    user_code: order.userCode || null,
    customer_name: order.userName || null,
    contact: order.contact || null,
    items: order.items || [],
    total: order.total || 0,
    payment_method: order.payMethod || null,
    status: order.status || "pending",
    note: order.note || null
  });
}

async function getCollaborators() {
  const rows = await sbGet("collaborators", "select=*&order=created_at.desc");
  return (rows || []).map(r => ({
    name: r.name,
    username: r.username,
    password: r.password_hash, // در این نسخه ساده، رمز به صورت متن ذخیره می‌شود
    code: r.code,
    role: r.role || "collaborator",
    rubikaId: r.rubika_id || "",
    createdAt: r.created_at,
    id: r.id
  }));
}

async function saveCollaboratorToCloud(c) {
  return await sbInsert("collaborators", {
    name: c.name,
    username: c.username,
    password_hash: c.password, // ذخیره ساده برای دمو (بعداً هش کنید)
    code: c.code || null,
    role: c.role || "collaborator",
    rubika_id: c.rubikaId || null,
    is_active: true
  });
}

async function deleteCollaboratorFromCloud(id) {
  if (!id) return false;
  return await sbDelete("collaborators", `id=eq.${id}`);
}
async function getPremiumUsers() {
  const rows = await sbGet("premium_users", "select=*&order=created_at.desc");
  return (rows || []).map(r => ({
    id: r.id, name: r.name, username: r.username, password: r.password,
    createdAt: r.created_at, expiresAt: r.expires_at, isActive: r.is_active !== false
  }));
}
async function savePremiumUserToCloud(p) {
  return await sbInsert("premium_users", {
    name: p.name, username: p.username, password: p.password,
    expires_at: p.expiresAt, is_active: true
  });
}
async function deletePremiumUserFromCloud(id) {
  if (!id) return false;
  return await sbDelete("premium_users", `id=eq.${id}`);
}
function isPremiumActive(p) {
  return !!p && p.isActive !== false && p.expiresAt && new Date(p.expiresAt).getTime() > Date.now();
}

// تخفیف کاربران ویژه (خریداران اکانت ویژه سایت): برای هر واحد محصول محاسبه می‌شود.
// زیر ۱ میلیون: بدون تخفیف
// از ۱ میلیون تا زیر ۳ میلیون: ۱۵۰ هزار تومان
// از ۳ میلیون تا ۸ میلیون: ۲۳۰ هزار تومان
// بالای ۱۵ میلیون: ۲۹۹ هزار تومان
function getPremiumDiscount(price, user = getCurrentUser()) {
  if (!user || !user.isPremium) return 0;
  if (price < 1000000) return 0;
  if (price < 3000000) return 150000;
  if (price <= 8000000) return 230000;
  if (price > 15000000) return 299000;
  return 0;
}
function getFinalUnitPrice(price, user = getCurrentUser()) {
  return Math.max(0, price - getPremiumDiscount(price, user));
}
function getCartTotals(user = getCurrentUser()) {
  const original = cart.reduce((s, p) => s + p.price * p.qty, 0);
  const discount = cart.reduce((s, p) => s + getPremiumDiscount(p.price, user) * p.qty, 0);
  return { original, discount, total: Math.max(0, original - discount) };
}

function getCurrentUser() {
  const raw = sessionStorage.getItem("gameShopCurrentUser");
  return raw ? JSON.parse(raw) : null;
}
function setCurrentUser(user) {
  if (user) sessionStorage.setItem("gameShopCurrentUser", JSON.stringify(user));
  else sessionStorage.removeItem("gameShopCurrentUser");
  updateAuthUI();
}
function isOwnerLoggedIn() {
  return sessionStorage.getItem("gameShopIsOwner") === "1";
}
function setOwnerLoggedIn(val) {
  if (val) sessionStorage.setItem("gameShopIsOwner", "1");
  else sessionStorage.removeItem("gameShopIsOwner");
  updateAuthUI();
}
function isCollabLoggedIn() {
  return sessionStorage.getItem("gameShopIsCollab") === "1";
}
function setCollabLoggedIn(val) {
  if (val) sessionStorage.setItem("gameShopIsCollab", "1");
  else sessionStorage.removeItem("gameShopIsCollab");
  updateAuthUI();
}
function getCurrentCollab() {
  const raw = sessionStorage.getItem("gameShopCurrentCollab");
  return raw ? JSON.parse(raw) : null;
}
function setCurrentCollab(c) {
  if (c) sessionStorage.setItem("gameShopCurrentCollab", JSON.stringify(c));
  else sessionStorage.removeItem("gameShopCurrentCollab");
}

function generateUserCode() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const random = Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4);
  return `USR-${stamp}-${random}`;
}

function generateOrderCode() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  const random = Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4);
  return `GS-${stamp}-${random}`;
}

// ==================== UI احراز هویت ====================
function updateAuthUI() {
  const user = getCurrentUser();
  const isOwner = isOwnerLoggedIn();
  const isCollab = isCollabLoggedIn();
  const authBtn = document.getElementById("authBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const ownerBtn = document.getElementById("ownerPanelBtn");
  const collabBtn = document.getElementById("collabPanelBtn");

  if (isOwner) {
    authBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
    ownerBtn.classList.remove("hidden");
    if (collabBtn) collabBtn.classList.add("hidden");
  } else if (isCollab) {
    const c = getCurrentCollab();
    authBtn.textContent = (c && c.name) ? c.name : "همکار";
    authBtn.classList.remove("hidden");
    logoutBtn.classList.remove("hidden");
    ownerBtn.classList.add("hidden");
    if (collabBtn) collabBtn.classList.remove("hidden");
  } else if (user) {
    authBtn.textContent = user.fullName || user.name || "کاربر";
    authBtn.classList.remove("hidden");
    logoutBtn.classList.remove("hidden");
    ownerBtn.classList.add("hidden");
    if (collabBtn) collabBtn.classList.add("hidden");
  } else {
    authBtn.textContent = "ورود / ثبت‌نام";
    authBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
    ownerBtn.classList.add("hidden");
    if (collabBtn) collabBtn.classList.add("hidden");
  }
  // مشاهده فروشگاه برای همه آزاد است؛ فقط ثبت سفارش نیاز به ثبت‌نام دارد.
  document.querySelector("header.header")?.classList.remove("hidden");
  document.querySelector("footer")?.classList.remove("hidden");
}

function openAuth() {
  closeRegister();
  closeOwnerLogin();
  closeCollabLogin();
  closePremiumLogin();
  document.getElementById("authModal").classList.remove("hidden");
  document.getElementById("loginError").textContent = "";
  document.getElementById("notRobot").checked = false;
  setTimeout(() => document.getElementById("loginName")?.focus(), 100);
}
function closeAuth(e) {
  if (!e || e.target.id === "authModal") {
    if (getCurrentUser() || isOwnerLoggedIn() || isCollabLoggedIn()) {
      document.getElementById("authModal").classList.add("hidden");
    }
  }
}

function openRegister() {
  closeAuth();
  closeOwnerLogin();
  closeCollabLogin();
  document.getElementById("registerModal").classList.remove("hidden");
  document.getElementById("registerError").textContent = "";
  document.getElementById("regNotRobot").checked = false;
}
function closeRegister(e) {
  if (!e || e.target.id === "registerModal") document.getElementById("registerModal").classList.add("hidden");
}

function openOwnerLogin() {
  document.getElementById("authModal")?.classList.add("hidden");
  closeRegister();
  closeCollabLogin();
  document.getElementById("ownerLoginModal").classList.remove("hidden");
  document.getElementById("ownerLoginError").textContent = "";
}
function closeOwnerLogin(e) {
  if (!e || e.target.id === "ownerLoginModal") document.getElementById("ownerLoginModal").classList.add("hidden");
}

function openCollabLogin() {
  document.getElementById("authModal")?.classList.add("hidden");
  closeRegister();
  closeOwnerLogin();
  document.getElementById("collabLoginModal").classList.remove("hidden");
  document.getElementById("collabLoginError").textContent = "";
}
function closeCollabLogin(e) {
  if (!e || e.target.id === "collabLoginModal") document.getElementById("collabLoginModal").classList.add("hidden");
}

function loginToShop() {
  const name = document.getElementById("loginName").value.trim();
  const notRobot = document.getElementById("notRobot").checked;
  const error = document.getElementById("loginError");

  if (!name) {
    error.textContent = "لطفاً اسمت را وارد کن.";
    return;
  }
  if (!notRobot) {
    error.textContent = "لطفاً تیک «من ربات نیستم» را بزن.";
    return;
  }

  // ورود ساده فقط با نام (بدون رمز)
  const user = {
    name: name,
    fullName: name,
    userCode: generateUserCode(),
    isRegistered: false,
    loggedInAt: new Date().toISOString()
  };
  setCurrentUser(user);
  closeAuth();
  showToast(`خوش آمدی ${name} 👋`);
}

function registerUser() {
  const fullName = document.getElementById("regFullName").value.trim();
  const contact = document.getElementById("regContact").value.trim();
  const notRobot = document.getElementById("regNotRobot").checked;
  const error = document.getElementById("registerError");

  if (!fullName) { error.textContent = "نام و نام خانوادگی الزامی است."; return; }
  if (!contact || contact.length < 5) { error.textContent = "آیدی روبیکا یا شماره تلفن را درست وارد کن."; return; }
  if (!notRobot) { error.textContent = "لطفاً تیک «من ربات نیستم» را بزن."; return; }

  const userCode = generateUserCode();
  const user = {
    fullName,
    name: fullName.split(" ")[0],
    contact,
    userCode,
    isRegistered: true,
    registeredAt: new Date().toISOString()
  };

  // ذخیره در Supabase (مشترک بین همه دستگاه‌ها)
  saveUserToCloud(user).then(saved => {
    if (saved) {
      setCurrentUser(user);
      closeRegister();
      showToast(`ثبت‌نام با موفقیت انجام شد. کد کاربری: ${userCode}`);
    } else {
      // fallback محلی در صورت قطع اینترنت
      setCurrentUser(user);
      closeRegister();
      showToast(`ثبت‌نام محلی انجام شد (اتصال به سرور برقرار نشد). کد: ${userCode}`);
    }
  });
}

async function premiumLogin() {
  const username = document.getElementById("premiumLoginUser").value.trim();
  const password = document.getElementById("premiumLoginPass").value;
  const error = document.getElementById("premiumLoginError");
  if (!username || !password) { error.textContent = "نام کاربری و رمز عبور را وارد کنید."; return; }
  error.textContent = "در حال بررسی...";
  const list = await getPremiumUsers();
  const found = list.find(p => p.username.toLowerCase() === username.toLowerCase() && p.password === password);
  if (!found) { error.textContent = "نام کاربری یا رمز عبور اشتباه است."; return; }
  if (!isPremiumActive(found)) { error.textContent = "مدت کاربر ویژه شما به پایان رسیده است."; return; }
  const user = { fullName: found.name, name: found.name, userCode: "PREMIUM-" + found.username, isPremium: true, premiumExpiresAt: found.expiresAt, loggedInAt: new Date().toISOString() };
  setCurrentUser(user);
  sessionStorage.setItem("gameShopIsPremium", "1");
  closePremiumLogin();
  closeAuth();
  showMain();
  showToast(`ورود کاربر ویژه موفق بود ⭐ تا ${new Date(found.expiresAt).toLocaleDateString("fa-IR")}`);
}
function isPremiumLoggedIn() {
  return sessionStorage.getItem("gameShopIsPremium") === "1";
}
function closePremiumLogin(e) {
  if (!e || e.target.id === "premiumLoginModal") document.getElementById("premiumLoginModal")?.classList.add("hidden");
}
function openPremiumLogin() {
  document.getElementById("authModal")?.classList.add("hidden");
  closeRegister();
  closeOwnerLogin();
  closeCollabLogin();
  document.getElementById("premiumLoginModal")?.classList.remove("hidden");
  document.getElementById("premiumLoginError").textContent = "";
}
function ownerLogin() {
  const user = document.getElementById("ownerUser").value.trim();
  const pass = document.getElementById("ownerPass").value;
  const error = document.getElementById("ownerLoginError");

  if (user === OWNER_USER && pass === OWNER_PASS) {
    setOwnerLoggedIn(true);
    setCollabLoggedIn(false);
    setCurrentCollab(null);
    setCurrentUser({ name: "مالک", fullName: "مالک فروشگاه", isOwner: true });
    closeOwnerLogin();
    document.getElementById("authModal")?.classList.add("hidden");
    showToast("ورود مالک موفقیت‌آمیز بود");
    // درخواست اجازه نوتیفیکیشن برای سفارش‌های جدید
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
    openOwnerPanel();
  } else {
    error.textContent = "نام کاربری یا رمز عبور مالک اشتباه است.";
  }
}

async function collabLogin() {
  const username = document.getElementById("collabLoginUser").value.trim();
  const pass = document.getElementById("collabLoginPass").value;
  const error = document.getElementById("collabLoginError");

  if (!username || !pass) {
    error.textContent = "نام کاربری و رمز عبور را وارد کنید.";
    return;
  }

  error.textContent = "در حال بررسی...";
  const list = await getCollaborators();
  const found = list.find(c => c.username === username && c.password === pass);
  if (!found) {
    error.textContent = "نام کاربری یا رمز عبور همکار اشتباه است.";
    return;
  }

  setCollabLoggedIn(true);
  setOwnerLoggedIn(false);
  setCurrentCollab(found);
  setCurrentUser({ name: found.name, fullName: found.name, isCollaborator: true, userCode: found.code || "" });
  closeCollabLogin();
  document.getElementById("authModal")?.classList.add("hidden");
  showToast(`خوش آمدی همکار ${found.name}`);
  openCollabPanel();
}

function logoutUser() {
  sessionStorage.removeItem("gameShopIsPremium");
  setCurrentUser(null);
  setOwnerLoggedIn(false);
  setCollabLoggedIn(false);
  setCurrentCollab(null);
  showMain();
  showToast("خارج شدی");
}

function copyCardNumber() {
  const num = "6219861426799507";
  navigator.clipboard.writeText(num).then(() => {
    showToast("شماره کارت کپی شد");
  }).catch(() => {
    showToast("کپی نشد؛ شماره را دستی کپی کنید");
  });
}

// ==================== محصولات و سبد با تعداد ====================
function normalizeSearchText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[يى]/g, "ی").replace(/ك/g, "ک")
    .replace(/[ۀة]/g, "ه").replace(/ؤ/g, "و")
    .replace(/[\u200c\u200f\u200e]/g, " ")
    .replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}
function compactSearchText(value) {
  return normalizeSearchText(value).replace(/\s+/g, "");
}
function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a) return b.length;
  if (!b) return a.length;
  const row = Array.from({length: b.length + 1}, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0]; row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cur = row[j];
      row[j] = Math.min(row[j] + 1, row[j-1] + 1, prev + (a[i-1] === b[j-1] ? 0 : 1));
      prev = cur;
    }
  }
  return row[b.length];
}
const SEARCH_ALIASES = {
  "کالاف": ["callofduty","cod","کالاف دیوتی"],
  "کالافدیوتی": ["callofduty","cod"],
  "فری": ["freefire","فری فایر"],
  "فریفایر": ["freefire","فری فایر"],
  "پیابجی": ["pubg"],
  "کلش": ["clash","clashofclans","clashroyale"],
  "کلشر": ["clashroyale"],
  "کلشرویال": ["clashroyale"],
  "کلشآفکلنز": ["clashofclans"],
  "ایفوتبال": ["efootball","efootball"],
  "فوتبال": ["efootball","fcmobile"],
  "روبلاکس": ["roblox"],
  "تلگرام": ["telegram"],
  "گیفت": ["giftcard"],
  "دریم": ["dls","dreamleague","dreamleaguesoccer"],
  "اکانت": ["buyaccount","خرید اکانت بازی"],
  "خریداکانت": ["buyaccount"]
};
function searchScore(product, rawQuery) {
  const q = normalizeSearchText(rawQuery);
  if (!q) return 1;
  const compactQ = compactSearchText(q);
  const fields = [
    normalizeSearchText(product.title), normalizeSearchText(product.gameName),
    normalizeSearchText(product.details), normalizeSearchText(product.game)
  ];
  const compactFields = fields.map(compactSearchText);
  let score = 0;
  fields.forEach((f, i) => {
    const compact = compactFields[i];
    if (f.includes(q) || compact.includes(compactQ)) score += i === 0 ? 100 : 70;
    q.split(" ").filter(Boolean).forEach(token => {
      if (f.includes(token) || compact.includes(token)) score += 35;
      else if (token.length >= 3 && f.split(" ").some(w => levenshtein(token, w) <= Math.max(1, Math.floor(token.length/4)))) score += 15;
    });
  });
  const aliases = SEARCH_ALIASES[compactQ] || [];
  aliases.forEach(alias => {
    if (fields.some(f => f.includes(normalizeSearchText(alias)) || compactFields.some(cf => cf.includes(compactSearchText(alias))))) score += 80;
  });
  return score;
}
function categoryLabel(game) {
  const labels = {all:"همه",buyaccount:"خرید اکانت بازی",efootball:"eFootball",cod:"Call of Duty",freefire:"Free Fire",pubg:"PUBG",clash:"Clash of Clans",clashroyale:"Clash Royale",telegram:"Telegram",fcmobile:"FC Mobile",roblox:"Roblox",pesarkhande:"پسرخوانده",giftcard:"گیفت کارت",brawlstars:"Brawl Stars",stumbleguys:"Stumble Guys",dls:"Dream League Soccer",specialaccount:"اکانت ویژه"};
  return labels[game] || game;
}
function renderProducts() {
  const rawQuery = document.getElementById("search").value.trim();
  let list = products
    .map(p => ({p, score: searchScore(p, rawQuery)}))
    .filter(x => (currentFilter === "all" || x.p.game === currentFilter) && (!rawQuery || x.score > 0))
    .sort((a,b) => b.score - a.score)
    .map(x => x.p);
  const sort = document.getElementById("sort").value;
  if (sort === "low") list.sort((a, b) => a.price - b.price);
  if (sort === "high") list.sort((a, b) => b.price - a.price);

  document.getElementById("productGrid").innerHTML = list.length ? list.map(p => `
    <article class="product">
      <div class="product-img">${p.icon}</div>
      <div class="product-body">
        <span class="tag">${p.gameName}</span>
        <h3>${p.title}</h3>
        <div class="details">${p.details}</div>
        <div class="price price-inquire">💬 قیمت با استعلام از پشتیبانی</div>
        <div class="product-actions">
          <button class="btn primary" onclick="addToCart(${p.id})">افزودن به سبد</button>
          <a class="btn ghost contact-btn" href="${TELEGRAM_URL}" target="_blank" rel="noopener">تلگرام</a>
          <a class="btn ghost contact-btn" href="${RUBIKA_URL}" target="_blank" rel="noopener">روبیکا</a>
        </div>
      </div>
    </article>
  `).join("") : `<p style="color:var(--muted)">محصولی پیدا نشد. چند حرف از نام بازی، آیتم یا دسته‌بندی را امتحان کن.</p>`;
}

function filterProducts(filter) {
  currentFilter = filter;
  document.querySelectorAll("#filterBar button").forEach(b => b.classList.remove("active"));
  const labels = { all: "همه", efootball: "eFootball", cod: "Call of Duty", freefire: "Free Fire", pubg: "PUBG", clash: "Clash of Clans" };
  document.querySelectorAll("#filterBar button").forEach(b => { if (b.textContent === labels[filter]) b.classList.add("active"); });
  renderProducts();
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

function addToCart(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  const existing = cart.find(x => x.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...p, qty: 1 });
  }
  saveCart();
  showToast("محصول به سبد اضافه شد (می‌تونی چند بار بخری)");
}

function changeQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(x => x.id !== id);
  }
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem("gameShopCart", JSON.stringify(cart));
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById("cartCount").textContent = new Intl.NumberFormat("fa-IR").format(totalQty);
  renderCart();
}

function renderCart() {
  const box = document.getElementById("cartItems");
  if (!cart.length) {
    box.innerHTML = `<p style="color:var(--muted)">سبد سفارش خالی است.</p>`;
  } else {
    box.innerHTML = cart.map(p => `
      <div class="cart-row">
        <span>${p.icon} ${p.title}</span>
        <div class="qty-controls">
          <button onclick="changeQty(${p.id}, -1)">−</button>
          <span>${p.qty}</span>
          <button onclick="changeQty(${p.id}, 1)">+</button>
          <span style="margin-right:8px;color:var(--secondary);font-size:13px">استعلام قیمت</span>
          <button onclick="removeFromCart(${p.id})">حذف</button>
        </div>
      </div>`).join("");
  }
  document.getElementById("cartTotal").innerHTML = `قیمت پس از استعلام از پشتیبانی`;

  const btn = document.getElementById("checkoutBtn");
  if (btn) {
    btn.disabled = !cart.length;
    btn.textContent = cart.length ? "ادامه ثبت سفارش 💬" : "ابتدا محصولی انتخاب کنید";
  }
}

function openCart() {
  document.getElementById("cartModal").classList.remove("hidden");
  renderCart();
}
function closeCart(e) {
  if (!e || e.target.id === "cartModal") document.getElementById("cartModal").classList.add("hidden");
}

// ==================== پرداخت و سفارش ====================
function goToCheckout() {
  if (!cart.length) {
    showToast("سبد خالی است");
    return;
  }

  const user = getCurrentUser();
  if (!user) {
    closeCart();
    openAuth();
    showToast("برای خرید ابتدا وارد شو یا ثبت‌نام کن");
    return;
  }
  if (!user.isRegistered && !user.isOwner && !user.isPremium) {
    closeCart();
    openRegister();
    showToast("برای خرید ثبت‌نام کامل (نام و آیدی روبیکا/شماره تلفن) الزامی است");
    return;
  }

  // تولید کد اختصاصی سفارش (اجباری)
  currentOrderCode = generateOrderCode();
  closeCart();
  openPayment();
}

function openPayment() {
  document.getElementById("paymentModal").classList.remove("hidden");
  document.getElementById("orderDoneBox").classList.add("hidden");

  document.getElementById("paymentTotal").innerHTML = `قیمت پس از استعلام از پشتیبانی`;
  document.getElementById("finalOrderCode").textContent = currentOrderCode || "---";

  document.getElementById("paymentSummary").innerHTML = cart.map(p => `
    <div class="cart-row">
      <span>${p.icon} ${p.title} × ${p.qty}</span>
      <span style="color:var(--secondary);font-size:13px">استعلام قیمت</span>
    </div>
  `).join("");

  // پاک کردن فیلدهای ایمیل و پرداخت
  const orderEmailEl = document.getElementById("orderEmail");
  const orderEmailPassEl = document.getElementById("orderEmailPass");
  const paymentRefEl = document.getElementById("paymentRef");
  const paidConfirmEl = document.getElementById("paidConfirm");
  const paymentErrorEl = document.getElementById("paymentError");
  if (orderEmailEl) orderEmailEl.value = "";
  if (orderEmailPassEl) orderEmailPassEl.value = "";
  if (paymentRefEl) paymentRefEl.value = "";
  if (paidConfirmEl) paidConfirmEl.checked = false;
  if (paymentErrorEl) paymentErrorEl.textContent = "";

  // تغییر نمایش اطلاعات کارت بر اساس روش پرداخت
  document.querySelectorAll('input[name="payMethod"]').forEach(r => {
    r.onchange = () => {
      const cardInfo = document.getElementById("cardInfo");
      if (r.value === "card" && r.checked) cardInfo.style.display = "block";
      else if (r.checked) cardInfo.style.display = "none";
    };
  });
}

function closePayment(e) {
  if (!e || e.target.id === "paymentModal") document.getElementById("paymentModal").classList.add("hidden");
}

function confirmOrder() {
  if (!currentOrderCode) {
    showToast("کد اختصاصی سفارش وجود ندارد");
    return;
  }
  const user = getCurrentUser();
  if (!user) {
    showToast("ابتدا وارد شوید");
    return;
  }

  const orderEmail = document.getElementById("orderEmail")?.value.trim() || "";
  const orderEmailPass = document.getElementById("orderEmailPass")?.value || "";
  const paymentRef = document.getElementById("paymentRef")?.value.trim() || "";
  const paidConfirm = document.getElementById("paidConfirm")?.checked;
  const payError = document.getElementById("paymentError");

  if (payError) payError.textContent = "";

  if (!orderEmail || !orderEmail.includes("@")) {
    showToast("آدرس ایمیل اعمال محصول را درست وارد کن");
    return;
  }
  if (!orderEmailPass) {
    showToast("رمز ایمیل الزامی است");
    return;
  }

  // بدون تأیید پرداخت، سفارش ثبت نمی‌شود
  if (!paidConfirm) {
    if (payError) payError.textContent = "برای ثبت سفارش باید گزینه «پرداخت را انجام داده‌ام» را تیک بزنی.";
    showToast("بدون پرداخت، سفارش ثبت نمی‌شود");
    return;
  }
  if (!paymentRef || paymentRef.length < 3) {
    if (payError) payError.textContent = "کد پیگیری / مشخصات واریز را وارد کن.";
    showToast("کد پیگیری پرداخت الزامی است");
    return;
  }

  const payMethod = document.querySelector('input[name="payMethod"]:checked')?.value || "card";
  const totals = getCartTotals(user);
  const total = totals.total;
  const items = cart.map(p => ({
    id: p.id,
    title: p.title,
    qty: p.qty,
    price: p.price,
    discountPerUnit: getPremiumDiscount(p.price, user),
    finalPrice: getFinalUnitPrice(p.price, user),
    total: getFinalUnitPrice(p.price, user) * p.qty
  }));

  const order = {
    orderCode: currentOrderCode,
    userCode: user.userCode || "",
    userName: user.fullName || user.name,
    contact: user.contact || "",
    email: orderEmail,
    emailPass: orderEmailPass,
    items,
    total,
    payMethod,
    paymentRef,
    status: "در انتظار تأیید پرداخت",
    createdAt: new Date().toISOString()
  };

  // ذخیره سفارش در Supabase
  saveOrderToCloud(order).then(saved => {
    if (!saved) {
      showToast("سفارش ثبت شد (حالت آفلاین — بعداً همگام می‌شود)");
    }
  });

  // نوتیفیکیشن مرورگر (اگر اجازه داده شده باشد)
  notifyOwnerNewOrder(order);

  // نمایش پیام نهایی
  const box = document.getElementById("orderDoneBox");
  box.classList.remove("hidden");
  const methodText = { card: "کارت به کارت", rubika: "روبیکا", other: "سایر" }[payMethod] || payMethod;
  const itemsText = items.map((it, i) => `${i + 1}. ${it.title} × ${it.qty}`).join("\n");
  const message = `سلام GAME SHOP 👋
کد سفارش من: ${currentOrderCode}
کد کاربری: ${user.userCode || "-"}
نام: ${user.fullName || user.name}
تماس (روبیکا/تلفن): ${user.contact || "-"}
ایمیل اعمال محصول: ${orderEmail}
رمز ایمیل: ${orderEmailPass}

محصولات:
${itemsText}

روش پرداخت: ${methodText}
کد پیگیری واریز: ${paymentRef}
وضعیت: پرداخت انجام شده — لطفاً تأیید کنید

لطفاً پرداخت و موجودی را بررسی کنید.`;

  box.innerHTML = `
    <div class="order-code-title">✅ سفارش ثبت شد (منتظر تأیید پرداخت)</div>
    <div class="order-code">${currentOrderCode}</div>
    <p>سفارش فقط بعد از تأیید پرداخت توسط پشتیبانی نهایی می‌شود. کد و رسید را برای پشتیبانی بفرست.</p>
    <button class="btn primary full" onclick='copyOrderMessage(${JSON.stringify(message)})'>📋 کپی متن کامل سفارش</button>
    <a class="btn ghost full" href="${TELEGRAM_URL}" target="_blank" rel="noopener">✈️ ارسال به تلگرام @${TELEGRAM_USERNAME}</a>
    <a class="btn ghost full rubika-order-link" href="${RUBIKA_URL}" target="_blank" rel="noopener">📨 ارسال به روبیکا @${RUBIKA_USERNAME}</a>
  `;

  // خالی کردن سبد بعد از ثبت
  cart = [];
  saveCart();
  showToast("سفارش ثبت شد. منتظر تأیید پرداخت پشتیبانی بمان.");
}

function notifyOwnerNewOrder(order) {
  if (!("Notification" in window)) return;
  const title = "سفارش جدید در GAME SHOP";
  const body = `کد: ${order.orderCode} | ${order.userName} | ${money(order.total)}`;
  if (Notification.permission === "granted") {
    new Notification(title, { body, dir: "rtl" });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification(title, { body, dir: "rtl" });
      }
    });
  }
}

async function copyOrderMessage(message) {
  try {
    await navigator.clipboard.writeText(message);
    showToast("متن سفارش و کد کپی شد");
  } catch (e) {
    showToast("کپی خودکار انجام نشد؛ کد را دستی کپی کن");
  }
}

// ==================== پیگیری سفارش ====================
function showTrack() {
  document.getElementById("mainContent").classList.add("hidden");
  document.getElementById("ownerPanel").classList.add("hidden");
  document.getElementById("collabPanel")?.classList.add("hidden");
  document.getElementById("trackPage").classList.remove("hidden");
  document.getElementById("trackResult").classList.add("hidden");
  window.scrollTo(0, 0);
}

async function trackOrder() {
  const code = document.getElementById("trackCodeInput").value.trim().toUpperCase();
  const result = document.getElementById("trackResult");
  if (!code) {
    result.classList.remove("hidden");
    result.innerHTML = "<p style='color:var(--danger)'>کد را وارد کن.</p>";
    return;
  }

  result.classList.remove("hidden");
  result.innerHTML = "<p style='color:var(--muted)'>در حال جستجو...</p>";
  const orders = await getOrders();
  const order = orders.find(o => (o.orderCode || "").toUpperCase() === code);

  if (!order) {
    result.innerHTML = `<p style="color:var(--danger)">سفارشی با این کد پیدا نشد.</p>`;
    return;
  }

  const itemsHtml = order.items.map(it => `<div>• ${it.title} × ${it.qty} — ${money(it.total)}</div>`).join("");
  result.innerHTML = `
    <h4>کد سفارش: <span class="code-tag">${order.orderCode}</span></h4>
    <p>وضعیت: <strong>${({
      "pending":"در انتظار تأیید",
      "paid":"در انتظار تأیید",
      "processing":"تأیید شده و درحال اعمال محصول",
      "cancelled":"سفارش لغو شده",
      "delivered":"تحویل داده شده",
      "تحویل شده":"تحویل داده شده"
    }[order.status] || order.status)}</strong></p>
    <p>نام: ${order.userName}</p>
    <p>کد کاربری: ${order.userCode || "-"}</p>
    <p>تماس: ${order.contact || "-"}</p>
    <p>ایمیل اعمال: ${order.email || "-"}</p>
    <p>روش پرداخت: ${order.payMethod}</p>
    <p>تاریخ: ${new Date(order.createdAt).toLocaleString("fa-IR")}</p>
    <div style="margin-top:10px">${itemsHtml}</div>
    <p style="margin-top:10px;font-weight:800">مجموع: ${money(order.total)}</p>
  `;
}

// ==================== پنل مالک ====================
function openOwnerPanel() {
  if (!isOwnerLoggedIn()) {
    openOwnerLogin();
    return;
  }
  document.getElementById("mainContent").classList.add("hidden");
  document.getElementById("trackPage").classList.add("hidden");
  document.getElementById("collabPanel")?.classList.add("hidden");
  document.getElementById("ownerPanel").classList.remove("hidden");
  showOwnerTab("users");
  window.scrollTo(0, 0);
}

function showOwnerTab(tab) {
  const panel = document.getElementById("ownerPanel");
  if (!panel) return;
  panel.querySelectorAll(".owner-tabs button").forEach(b => b.classList.remove("active"));
  document.getElementById("ownerUsersTab").classList.add("hidden");
  document.getElementById("ownerOrdersTab").classList.add("hidden");
  document.getElementById("ownerCollaboratorsTab")?.classList.add("hidden");
  document.getElementById("ownerPremiumTab")?.classList.add("hidden");

  if (tab === "users") {
    panel.querySelector(".owner-tabs button:nth-child(1)")?.classList.add("active");
    document.getElementById("ownerUsersTab").classList.remove("hidden");
    renderOwnerUsers();
  } else if (tab === "orders") {
    panel.querySelector(".owner-tabs button:nth-child(2)")?.classList.add("active");
    document.getElementById("ownerOrdersTab").classList.remove("hidden");
    renderOwnerOrders();
  } else if (tab === "collaborators") {
    panel.querySelector(".owner-tabs button:nth-child(3)")?.classList.add("active");
    document.getElementById("ownerCollaboratorsTab")?.classList.remove("hidden");
    renderOwnerCollaborators();
  } else if (tab === "premium") {
    panel.querySelector(".owner-tabs button:nth-child(4)")?.classList.add("active");
    document.getElementById("ownerPremiumTab")?.classList.remove("hidden");
    renderOwnerPremiumUsers();
  }
}

async function renderOwnerUsers() {
  const box = document.getElementById("ownerUsersList");
  if (box) box.innerHTML = `<p style="color:var(--muted)">در حال بارگذاری...</p>`;
  const fullUsers = await getUsers();
  if (!fullUsers.length) {
    box.innerHTML = `<p style="color:var(--muted)">هنوز کاربری ثبت‌نام نکرده است.</p>`;
    return;
  }
  box.innerHTML = fullUsers.map((u) => {
    return `
    <div class="owner-card">
      <h4>${u.fullName} <span class="code-tag">${u.userCode}</span></h4>
      <p>📱 آیدی روبیکا / تلفن: ${u.contact || "-"}</p>
      <p>📅 تاریخ ثبت‌نام: ${new Date(u.registeredAt).toLocaleString("fa-IR")}</p>
      <p>⭐ وضعیت ویژه: ${u.isPremium && u.premiumExpiresAt && new Date(u.premiumExpiresAt) > new Date() ? "ویژه تا " + new Date(u.premiumExpiresAt).toLocaleDateString("fa-IR") : "عادی"}</p>
      <button class="btn danger-btn" type="button" onclick="deleteUserByCode('${u.userCode}')">🗑️ حذف کاربر</button>
    </div>
  `;
  }).join("");
}

async function deleteUserByCode(userCode) {
  if (!isOwnerLoggedIn() && !isCollabLoggedIn()) {
    showToast("فقط مالک یا همکار می‌تواند کاربر را حذف کند");
    return;
  }
  if (!confirm("آیا از حذف این کاربر مطمئن هستید؟")) return;
  await sbDelete("users", `user_code=eq.${encodeURIComponent(userCode)}`);
  showToast("کاربر حذف شد");
  if (isOwnerLoggedIn()) renderOwnerUsers();
  if (isCollabLoggedIn()) renderCollabUsers();
}

async function renderOwnerOrders() {
  const box = document.getElementById("ownerOrdersList");
  if (box) box.innerHTML = `<p style="color:var(--muted)">در حال بارگذاری...</p>`;
  const orders = await getOrders();
  if (!orders.length) {
    box.innerHTML = `<p style="color:var(--muted)">هنوز سفارشی ثبت نشده است.</p>`;
    return;
  }

  const statusLabel = {
    "pending": "در انتظار تأیید",
    "paid": "در انتظار تأیید",
    "processing": "تأیید شده و درحال اعمال محصول",
    "cancelled": "سفارش لغو شده",
    "delivered": "تحویل داده شده",
    "در انتظار تأیید": "در انتظار تأیید",
    "تأیید شده و درحال اعمال محصول": "تأیید شده و درحال اعمال محصول",
    "سفارش لغو شده": "سفارش لغو شده",
    "تحویل داده شده": "تحویل داده شده",
    "تحویل شده": "تحویل داده شده"
  };

  box.innerHTML = orders.map(o => {
    const items = (o.items || []).map(it => `${it.title} ×${it.qty}`).join(" | ");
    const currentStatus = statusLabel[o.status] || "در انتظار تأیید";
    const isDelivered = currentStatus === "تحویل داده شده";

    return `
      <div class="owner-card">
        <h4>کد سفارش: <span class="code-tag">${o.orderCode}</span></h4>
        <p>👤 ${o.userName} | کد کاربر: ${o.userCode || "-"}</p>
        <p>📱 تماس: ${o.contact || "-"}</p>
        <p>📧 ایمیل اعمال: ${o.email || "-"}</p>
        <p>🔑 رمز ایمیل: ${o.emailPass || "-"}</p>
        <p>🛒 ${items}</p>
        <p>💰 ${money(o.total)} | پرداخت: ${o.payMethod}</p>
        <p>📌 وضعیت: <strong>${currentStatus}</strong></p>
        <p>📅 ${new Date(o.createdAt).toLocaleString("fa-IR")}</p>

        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">
          ${!isDelivered ? `
            <button class="btn primary" type="button"
              onclick="updateOwnerOrderStatus('${o.id}', 'در انتظار تأیید')">
              ⏳ در انتظار تأیید
            </button>
            <button class="btn primary" type="button"
              onclick="updateOwnerOrderStatus('${o.id}', 'تأیید شده و درحال اعمال محصول')">
              ⚙️ تأیید شده و درحال اعمال محصول
            </button>
            <button class="btn danger-btn" type="button"
              onclick="updateOwnerOrderStatus('${o.id}', 'سفارش لغو شده')">
              ❌ سفارش لغو شده
            </button>
            ${currentStatus !== "سفارش لغو شده" ? `
              <button class="btn primary" type="button"
                onclick="updateOwnerOrderStatus('${o.id}', 'تحویل داده شده')">
                📦 تحویل داده شد
              </button>
            ` : ""}
          ` : `
            <p style="color:var(--success, #22c55e);font-weight:800;margin:8px 0">✅ سفارش تحویل داده شده است</p>
          `}
        </div>
      </div>
    `;
  }).join("");
}

async function updateOwnerOrderStatus(orderId, newStatus) {
  if (!isOwnerLoggedIn()) {
    showToast("فقط مالک می‌تواند وضعیت سفارش را تغییر دهد");
    return;
  }
  if (!orderId || !newStatus) return;

  const message = newStatus === "تحویل داده شده"
    ? "آیا از تحویل این سفارش به مشتری مطمئن هستید؟"
    : `وضعیت سفارش به «${newStatus}» تغییر کند؟`;

  if (!confirm(message)) return;

  const updated = await sbUpdate("orders", `id=eq.${orderId}`, { status: newStatus });
  if (!updated) {
    showToast("خطا در تغییر وضعیت سفارش");
    return;
  }

  showToast(`✅ وضعیت سفارش به «${newStatus}» تغییر کرد`);
  await renderOwnerOrders();
}

async function addPremiumUser() {
  if (!isOwnerLoggedIn()) { showToast("فقط مالک می‌تواند کاربر ویژه اضافه کند"); return; }
  const name = document.getElementById("premiumName")?.value.trim() || "";
  const username = document.getElementById("premiumUsername")?.value.trim() || "";
  const password = document.getElementById("premiumPassword")?.value || "";
  const days = parseInt(document.getElementById("premiumDays")?.value || "0", 10);
  const error = document.getElementById("premiumAddError");
  if (!name || !username || !password) { error.textContent = "نام، نام کاربری و رمز عبور الزامی است."; return; }
  if (!Number.isFinite(days) || days < 1) { error.textContent = "مدت اعتبار را حداقل ۱ روز وارد کنید."; return; }
  const list = await getPremiumUsers();
  if (list.some(p => p.username.toLowerCase() === username.toLowerCase())) { error.textContent = "این نام کاربری قبلاً ثبت شده است."; return; }
  const expiresAt = new Date(Date.now() + days * 86400000).toISOString();
  const saved = await savePremiumUserToCloud({name, username, password, expiresAt});
  if (!saved) { error.textContent = "ذخیره کاربر ویژه انجام نشد."; return; }
  ["premiumName","premiumUsername","premiumPassword","premiumDays"].forEach(id => { const e=document.getElementById(id); if(e)e.value=""; });
  error.textContent = "";
  showToast(`کاربر ویژه ${name} برای ${days} روز ساخته شد ⭐`);
  renderOwnerPremiumUsers();
}
async function deletePremiumUserById(id) {
  if (!isOwnerLoggedIn()) { showToast("فقط مالک می‌تواند کاربر ویژه را حذف کند"); return; }
  if (!confirm("آیا از حذف این کاربر ویژه مطمئن هستید؟")) return;
  await deletePremiumUserFromCloud(id);
  showToast("کاربر ویژه حذف شد");
  renderOwnerPremiumUsers();
}
async function renderOwnerPremiumUsers() {
  const box = document.getElementById("ownerPremiumList");
  if (!box) return;
  box.innerHTML = `<p style="color:var(--muted)">در حال بارگذاری...</p>`;
  const list = await getPremiumUsers();
  if (!list.length) { box.innerHTML = `<p style="color:var(--muted)">هنوز کاربر ویژه‌ای ساخته نشده است.</p>`; return; }
  box.innerHTML = list.map(p => {
    const active = isPremiumActive(p);
    const remaining = Math.max(0, Math.ceil((new Date(p.expiresAt)-Date.now())/86400000));
    return `<div class="owner-card">
      <h4>⭐ ${p.name} <span class="code-tag">${active ? "فعال" : "منقضی"}</span></h4>
      <p>👤 نام کاربری: <strong>${p.username}</strong></p>
      <p>🔑 رمز عبور: <strong>${p.password}</strong></p>
      <p>⏳ اعتبار تا: ${new Date(p.expiresAt).toLocaleString("fa-IR")} ${active ? `(${remaining} روز باقی‌مانده)` : ""}</p>
      <button class="btn danger-btn" type="button" onclick="deletePremiumUserById('${p.id}')">🗑️ حذف کاربر ویژه</button>
    </div>`;
  }).join("");
}
function generateCollabCode() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const random = Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4);
  return `COL-${stamp}-${random}`;
}

/** کد اشتراک برای ورود همکار در دستگاه‌های دیگر (بدون نیاز به بک‌اند) */
function makeCollabShareCode(c) {
  const payload = {
    v: 1,
    n: c.name || "",
    u: c.username || "",
    p: c.password || "",
    c: c.code || "",
    t: c.createdAt || new Date().toISOString()
  };
  try {
    return "GSCOLLAB-" + btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  } catch (e) {
    return "";
  }
}

function parseCollabShareCode(code) {
  if (!code || typeof code !== "string") return null;
  const raw = code.trim();
  if (!raw.startsWith("GSCOLLAB-")) return null;
  try {
    const json = decodeURIComponent(escape(atob(raw.slice(9))));
    const data = JSON.parse(json);
    if (!data || !data.u || !data.p) return null;
    return {
      name: data.n || data.u,
      username: data.u,
      password: data.p,
      code: data.c || generateCollabCode(),
      createdAt: data.t || new Date().toISOString()
    };
  } catch (e) {
    return null;
  }
}

function copyCollabShareCode(index) {
  if (!isOwnerLoggedIn()) {
    showToast("فقط مالک می‌تواند کد اشتراک بسازد");
    return;
  }
  const list = getCollaborators();
  if (index < 0 || index >= list.length) return;
  const code = makeCollabShareCode(list[index]);
  if (!code) {
    showToast("خطا در ساخت کد");
    return;
  }
  navigator.clipboard.writeText(code).then(() => {
    showToast("کد اشتراک کپی شد — آن را برای همکار بفرستید");
  }).catch(() => {
    // fallback: show in prompt
    prompt("کد اشتراک را کپی کنید:", code);
  });
}

function importCollabShareCode() {
  const input = document.getElementById("collabShareInput");
  const error = document.getElementById("collabLoginError");
  const code = (input?.value || "").trim();
  if (!code) {
    error.textContent = "کد اشتراک را وارد کنید.";
    return;
  }
  const collab = parseCollabShareCode(code);
  if (!collab) {
    error.textContent = "کد اشتراک نامعتبر است.";
    return;
  }
  const list = getCollaborators();
  const existingIdx = list.findIndex(c => c.username.toLowerCase() === collab.username.toLowerCase());
  if (existingIdx >= 0) {
    // update password/name if changed
    list[existingIdx] = { ...list[existingIdx], ...collab };
  } else {
    list.push(collab);
  }
  saveCollaborators(list);
  if (input) input.value = "";
  error.textContent = "";
  showToast(`همکار «${collab.name}» در این دستگاه ثبت شد. حالا با نام کاربری و رمز وارد شوید.`);
  // prefill login fields
  const uEl = document.getElementById("collabLoginUser");
  const pEl = document.getElementById("collabLoginPass");
  if (uEl) uEl.value = collab.username;
  if (pEl) pEl.value = collab.password;
}

async function addCollaborator() {
  if (!isOwnerLoggedIn()) {
    showToast("فقط مالک می‌تواند همکار اضافه کند");
    return;
  }
  const name = document.getElementById("collabName")?.value.trim() || "";
  const username = document.getElementById("collabUsername")?.value.trim() || "";
  const password = document.getElementById("collabPassword")?.value || "";
  const rubikaId = document.getElementById("collabRubikaId")?.value.trim() || "";
  const error = document.getElementById("collabAddError");

  if (!name) { error.textContent = "نام همکار الزامی است."; return; }
  if (!username || username.length < 3) { error.textContent = "نام کاربری حداقل ۳ کاراکتر باشد."; return; }
  if (!password || password.length < 4) { error.textContent = "رمز عبور حداقل ۴ کاراکتر باشد."; return; }

  error.textContent = "در حال ذخیره...";
  const list = await getCollaborators();
  if (list.some(c => c.username.toLowerCase() === username.toLowerCase())) {
    error.textContent = "این نام کاربری قبلاً ثبت شده است.";
    return;
  }

  const collab = {
    name,
    username,
    password,
    rubikaId,
    code: generateCollabCode(),
    createdAt: new Date().toISOString()
  };
  const saved = await saveCollaboratorToCloud(collab);
  if (!saved) {
    error.textContent = "خطا در ذخیره روی سرور. اینترنت را چک کنید.";
    return;
  }

  document.getElementById("collabName").value = "";
  document.getElementById("collabUsername").value = "";
  document.getElementById("collabPassword").value = "";
  if (document.getElementById("collabRubikaId")) document.getElementById("collabRubikaId").value = "";
  error.textContent = "";
  showToast(`همکار ${name} اضافه شد و روی همه دستگاه‌ها قابل استفاده است`);
  renderOwnerCollaborators();
}

async function deleteCollaboratorById(id) {
  if (!isOwnerLoggedIn()) {
    showToast("فقط مالک می‌تواند همکار را حذف کند");
    return;
  }
  if (!confirm("آیا از حذف این همکار مطمئن هستید؟")) return;
  await deleteCollaboratorFromCloud(id);
  showToast("همکار حذف شد");
  renderOwnerCollaborators();
}

async function renderOwnerCollaborators() {
  const box = document.getElementById("ownerCollaboratorsList");
  if (!box) return;
  box.innerHTML = `<p style="color:var(--muted)">در حال بارگذاری...</p>`;
  const list = await getCollaborators();
  if (!list.length) {
    box.innerHTML = `<p style="color:var(--muted)">هنوز همکاری اضافه نشده است.</p>`;
    return;
  }
  box.innerHTML = list.map((c) => {
    return `
    <div class="owner-card">
      <h4>${c.name} <span class="code-tag">${c.code || "-"}</span></h4>
      <p>👤 نام کاربری: <strong>${c.username}</strong></p>
      <p>🔑 رمز: ${"•".repeat(Math.min((c.password || "").length, 8))}</p>
      <p>📱 آیدی روبیکا: <strong>${c.rubikaId || "-"}</strong></p>
      <p>📅 تاریخ افزودن: ${c.createdAt ? new Date(c.createdAt).toLocaleString("fa-IR") : "-"}</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px">
        <button class="btn danger-btn" type="button" onclick="deleteCollaboratorById('${c.id}')">🗑️ حذف همکار</button>
      </div>
    </div>
  `;
  }).join("");
}

// ==================== پنل همکار ====================
function openCollabPanel() {
  if (!isCollabLoggedIn()) {
    openCollabLogin();
    return;
  }
  document.getElementById("mainContent").classList.add("hidden");
  document.getElementById("trackPage").classList.add("hidden");
  document.getElementById("ownerPanel").classList.add("hidden");
  document.getElementById("collabPanel").classList.remove("hidden");
  showCollabTab("users");
  window.scrollTo(0, 0);
}

function showCollabTab(tab) {
  const panel = document.getElementById("collabPanel");
  if (!panel) return;
  panel.querySelectorAll(".owner-tabs button").forEach(b => b.classList.remove("active"));
  document.getElementById("collabUsersTab").classList.add("hidden");
  document.getElementById("collabOrdersTab").classList.add("hidden");

  if (tab === "users") {
    panel.querySelector(".owner-tabs button:nth-child(1)")?.classList.add("active");
    document.getElementById("collabUsersTab").classList.remove("hidden");
    renderCollabUsers();
  } else {
    panel.querySelector(".owner-tabs button:nth-child(2)")?.classList.add("active");
    document.getElementById("collabOrdersTab").classList.remove("hidden");
    renderCollabOrders();
  }
}

async function renderCollabUsers() {
  const box = document.getElementById("collabUsersList");
  if (!box) return;
  box.innerHTML = `<p style="color:var(--muted)">در حال بارگذاری...</p>`;
  const fullUsers = await getUsers();
  if (!fullUsers.length) {
    box.innerHTML = `<p style="color:var(--muted)">هنوز کاربری ثبت‌نام نکرده است.</p>`;
    return;
  }
  box.innerHTML = fullUsers.map(u => `
    <div class="owner-card">
      <h4>${u.fullName} <span class="code-tag">${u.userCode}</span></h4>
      <p>📱 آیدی روبیکا / تلفن: ${u.contact || "-"}</p>
      <p>📅 تاریخ ثبت‌نام: ${new Date(u.registeredAt).toLocaleString("fa-IR")}</p>
      <p>⭐ وضعیت ویژه: ${u.isPremium && u.premiumExpiresAt && new Date(u.premiumExpiresAt) > new Date() ? "کاربر ویژه تا " + new Date(u.premiumExpiresAt).toLocaleDateString("fa-IR") : "عادی"}</p>
      <button class="btn danger-btn" type="button" onclick="deleteUserByCode('${u.userCode}')">🗑️ حذف کاربر</button>
    </div>
  `).join("");
}

async function deliverOrderByCollab(orderId) {
  if (!isCollabLoggedIn()) {
    showToast("فقط همکار می‌تواند سفارش را تحویل دهد");
    return;
  }
  if (!orderId) return;
  if (!confirm("آیا از تحویل این سفارش به مشتری مطمئن هستید؟")) return;
  const updated = await sbUpdate("orders", `id=eq.${orderId}`, { status: "تحویل شده" });
  if (!updated) {
    showToast("خطا در به‌روزرسانی وضعیت سفارش");
    return;
  }
  showToast("✅ سفارش با موفقیت به مشتری تحویل داده شد");
  renderCollabOrders();
}

async function renderCollabOrders() {
  const box = document.getElementById("collabOrdersList");
  if (!box) return;
  box.innerHTML = `<p style="color:var(--muted)">در حال بارگذاری...</p>`;
  const orders = await getOrders();
  if (!orders.length) {
    box.innerHTML = `<p style="color:var(--muted)">هنوز سفارشی ثبت نشده است.</p>`;
    return;
  }
  box.innerHTML = orders.map(o => {
    const items = (o.items || []).map(it => `${it.title} ×${it.qty}`).join(" | ");
    const isDelivered = (o.status || "").includes("تحویل") || o.status === "delivered";
    const deliverBtn = isDelivered
      ? `<p style="color:var(--success, #22c55e);font-weight:700">✅ تحویل شده</p>`
      : `<button class="btn primary" type="button" onclick="deliverOrderByCollab('${o.id}')">📦 تحویل به مشتری</button>`;
    return `
      <div class="owner-card">
        <h4>کد سفارش: <span class="code-tag">${o.orderCode}</span></h4>
        <p>👤 ${o.userName} | کد کاربر: ${o.userCode || "-"}</p>
        <p>📱 تماس: ${o.contact || "-"}</p>
        <p>🛒 ${items}</p>
        <p>💰 ${money(o.total)} | پرداخت: ${o.payMethod}</p>
        <p>📌 وضعیت: ${o.status}</p>
        <p>📅 ${new Date(o.createdAt).toLocaleString("fa-IR")}</p>
        <div style="margin-top:10px">${deliverBtn}</div>
      </div>
    `;
  }).join("");
}

// ==================== ناوبری ====================
function showMain() {
  // صفحه فروشگاه بدون ورود/ثبت‌نام هم قابل مشاهده است.
  document.getElementById("mainContent").classList.remove("hidden");
  document.getElementById("trackPage").classList.add("hidden");
  document.getElementById("ownerPanel").classList.add("hidden");
  document.getElementById("collabPanel")?.classList.add("hidden");
}

function scrollToProducts() {
  showMain();
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

function showToast(text) {
  const t = document.getElementById("toast");
  t.textContent = text;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2200);
}

// ==================== شروع ====================
document.getElementById("year").textContent = new Date().getFullYear();
const totalQty = cart.reduce((s, i) => s + (i.qty || 1), 0);
document.getElementById("cartCount").textContent = new Intl.NumberFormat("fa-IR").format(totalQty);
renderProducts();
renderCart();
updateAuthUI();
// فروشگاه برای کاربر مهمان هم نمایش داده می‌شود؛ ثبت‌نام فقط هنگام ثبت سفارش الزامی است.
document.getElementById("mainContent").classList.remove("hidden");
document.getElementById("authModal").classList.add("hidden");
