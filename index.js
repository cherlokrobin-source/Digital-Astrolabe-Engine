<<<<<<< HEAD
// المسارات المصححة بناءً على هيكلية مشروعك
import MasterEngine from "./engines/master/MasterEngine.js"; 
import ArchiveEnginePRO from "./archive/ArchiveEnginePRO.js";

const engine = new MasterEngine();
const archive = new ArchiveEnginePRO(engine);

// توليد تدريجي (ابدأ صغير)
archive.generateAll(10);

// اختبار قراءة يوم
console.log(archive.getDay(100));
=======
import fs from 'fs';
import { MasterEngine } from "./src/engines/master/MasterEngine.js";
import { WeekEngine } from "./src/engines/week/WeekEngine.js";
import { SolarEngine } from "./src/engines/solar/SolarEngine.js";
import { LunarEngine } from "./src/engines/lunar/LunarEngine.js";
import { TimeDatabase } from "./src/database/TimeDatabase.js";
import { TimeIndex } from "./src/database/TimeIndex.js";

// تهيئة المحركات
const db = new TimeDatabase();
const week = new WeekEngine();
const solar = new SolarEngine();
const lunar = new LunarEngine();
const index = new TimeIndex();

// ربط المحرك الرئيسي
const engine = new MasterEngine(db, week, solar, lunar, index, "hybrid");

console.log("Generating full year data (1-365)...");

// توليد مصفوفة تحتوي على بيانات الأيام كاملة
const calendarData = [];
for (let i = 1; i <= 365; i++) {
    calendarData.push(engine.calc(i));
}

// حفظ المصفوفة في الملف
try {
    fs.writeFileSync('calendar_archive.json', JSON.stringify(calendarData, null, 2));
    console.log("Archive saved to calendar_archive.json successfully!");
} catch (error) {
    console.error("Error saving archive:", error);
}
>>>>>>> 26849f9 (feat: initial clean commit of Astrolabe Engine)

