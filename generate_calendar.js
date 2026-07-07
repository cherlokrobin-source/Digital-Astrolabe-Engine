import fs from 'fs';
import { MasterEngine } from "./src/engines/master/MasterEngine.js";
import { SolarEngine } from "./src/engines/solar/SolarEngine.js";
import { LunarEngine } from "./src/engines/lunar/LunarEngine.js";
import { WeekEngine } from "./src/engines/week/WeekEngine.js";

const engine = new MasterEngine(null, new WeekEngine(), new SolarEngine(), new LunarEngine(), null, "hybrid");
const totalDays = 18262125;
const CHUNK_SIZE = 50000; // توليد 50 ألف يوم في كل دفعة

async function generate() {
    console.log("Starting generation in batches...");
    
    // إنشاء الملفات (بداية)
    fs.writeFileSync('golden_calendar_50k.json', "[");
    fs.writeFileSync('golden_calendar_50k.csv', "DayNumber,SolarDate,LunarDate,Weekday\n");

    for (let i = 0; i < totalDays; i += CHUNK_SIZE) {
        let jsonBuffer = "";
        let csvBuffer = "";
        
        for (let n = i + 1; n <= Math.min(i + CHUNK_SIZE, totalDays); n++) {
            const data = engine.calc(n);
            jsonBuffer += (n === 1 ? "" : ",") + JSON.stringify(data);
            csvBuffer += `${data.dayNumber},"${data.solar.dayInMonth} ${data.solar.monthName} ${data.solar.year}","${data.lunar.dayInMonth} ${data.lunar.monthName} ${data.lunar.year}",${data.weekday}\n`;
        }

        // إلحاق البيانات بالملفات وإفراغ الذاكرة فوراً
        fs.appendFileSync('golden_calendar_50k.json', jsonBuffer);
        fs.appendFileSync('golden_calendar_50k.csv', csvBuffer);
        
        console.log(`Progress: ${((i / totalDays) * 100).toFixed(2)}%`);
        if (global.gc) global.gc(); 
    }

    fs.appendFileSync('golden_calendar_50k.json', "]");
    console.log("Generation Complete!");
}

generate();

