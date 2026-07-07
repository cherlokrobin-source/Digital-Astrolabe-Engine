import { MasterEngine } from "./src/engines/master/MasterEngine.js";
import { WeekEngine } from "./src/engines/week/WeekEngine.js";
import { SolarEngine } from "./src/engines/solar/SolarEngine.js";
import { LunarEngine } from "./src/engines/lunar/LunarEngine.js";
import { TimeDatabase } from "./src/database/TimeDatabase.js";
import { TimeIndex } from "./src/database/TimeIndex.js";

const engine = new MasterEngine(new TimeDatabase(), new WeekEngine(), new SolarEngine(), new LunarEngine(), new TimeIndex(), "hybrid");

// دالة لجلب تفاصيل اليوم الأول من السنة المطلوبة
function getYearStartDetails(year) {
    // حساب تقريبي لليوم الأول من السنة (بناءً على 365 يوم للشمس و 354 للقمر)
    const dayNumber = (year - 1) * 365 + 1; 
    return engine.calc(dayNumber);
}

console.log("--- Starting 33-Year Cycle Drift Analysis ---");

const startYear1 = getYearStartDetails(1);
console.log(`Year 1  | Lunar Year: ${startYear1.lunar.year} | Solar Date: ${startYear1.solar.monthName} ${startYear1.solar.dayInMonth}`);

const startYear34 = getYearStartDetails(34);
console.log(`Year 34 | Lunar Year: ${startYear34.lunar.year} | Solar Date: ${startYear34.solar.monthName} ${startYear34.solar.dayInMonth}`);

console.log("---------------------------------------------");

