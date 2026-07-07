import fs from 'fs';
import { MasterEngine } from "./src/engines/master/MasterEngine.js";
// ... (قم باستيراد باقي المحركات)

const engine = new MasterEngine(/*...*/) ;
const totalDays = 50000 * 365.25; // تقدير تقريبي لعدد الأيام لـ 50 ألف سنة
const calendarArchive = [];

for (let n = 1; n <= totalDays; n++) {
    calendarArchive.push(engine.calc(n));
    // نصيحة: إذا كان الملف كبيراً جداً، يفضل الكتابة على الملف كل 1000 سنة لتوفير الذاكرة
}

fs.writeFileSync('golden_calendar_50k.json', JSON.stringify(calendarArchive));

