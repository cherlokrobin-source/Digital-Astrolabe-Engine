import { MasterEngine } from './src/engines/master/MasterEngine.js';
import { WeekEngine } from './src/engines/week/WeekEngine.js';
import { SolarEngine } from './src/engines/solar/SolarEngine.js';
import { LunarEngine } from './src/engines/lunar/LunarEngine.js';

export default {
  async fetch(request, env, ctx) {
    // 1. استخراج الرابط والمعاملات
    const url = new URL(request.url);
    const dayIndexParam = url.searchParams.get('dayIndex');

    // إذا طلب المستخدم الرابط الرئيسي دون تحديد يوم، نعطيه رسالة ترحيبية وإرشادات
    if (!dayIndexParam) {
      return new Response(JSON.stringify({ 
        message: "مرحباً بك في المحرك السحابي للتقويم الذهبي (The Golden Calendar API)",
        usage: "لاستخدام المحرك، أضف رقم اليوم للرابط، مثال: ?dayIndex=1"
      }), {
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      });
    }

    const dayIndex = parseInt(dayIndexParam, 10);

    // 2. حماية المحرك وضمان النطاق (50 ألف سنة تعادل حوالي 18.25 مليون يوم)
    if (isNaN(dayIndex) || dayIndex < 1 || dayIndex > 18250000) {
      return new Response(JSON.stringify({ 
        error: "رقم اليوم غير صحيح. يجب أن يكون رقماً بين 1 و 18,250,000 (نطاق 50 ألف سنة)." 
      }), {
        status: 400,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      });
    }

    try {
      // 3. تهيئة المحركات الفرعية والمحرك الرئيسي (حساب رياضي ديناميكي بدون DB)
      const weekEngine = new WeekEngine();
      const solarEngine = new SolarEngine();
      const lunarEngine = new LunarEngine();
      
      const master = new MasterEngine(null, weekEngine, solarEngine, lunarEngine);
      
      // 4. حساب البيانات للحظة المطلوبة بدقة
      const result = master.calc(dayIndex);

      // 5. إرجاع النتيجة فوراً بصيغة JSON سريعة جداً للمتصفح
      return new Response(JSON.stringify(result, null, 2), {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*", // للسماح للواجهات بالاتصال بالـ API دون مشاكل CORS
        }
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: "حدث خطأ أثناء الحساب السحابي: " + error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      });
    }
  }
};

