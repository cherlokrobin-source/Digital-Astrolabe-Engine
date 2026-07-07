import { MasterEngine } from "./src/engines/master/MasterEngine.js";
import { WeekEngine } from "./src/engines/week/WeekEngine.js";
import { SolarEngine } from "./src/engines/solar/SolarEngine.js";
import { LunarEngine } from "./src/engines/lunar/LunarEngine.js";
import { TimeDatabase } from "./src/database/TimeDatabase.js";
import { TimeIndex } from "./src/database/TimeIndex.js";

const engine = new MasterEngine(new TimeDatabase(), new WeekEngine(), new SolarEngine(), new LunarEngine(), new TimeIndex(), "hybrid");

function checkCycle(startYear, duration) {
    const startDay = (startYear - 1) * 354; // تقريب تقويمي
    const data = engine.calc(startDay);
    console.log(`Year ${startYear}: Lunar Month 1 starts at Solar Day ${data.solar.dayInMonth} of ${data.solar.monthName}`);
}

console.log("--- Checking 33-Year Cycle Drift ---");
checkCycle(1, 33);
checkCycle(34, 33);

