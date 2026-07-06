import { SolarEngine } from "../solar/SolarEngine.js";
import { LunarEngine } from "../lunar/LunarEngine.js";
import { WeekEngine } from "../week/WeekEngine.js";

export class TimeSimulation {

    constructor() {
        this.solar = new SolarEngine();
        this.lunar = new LunarEngine();
        this.week = new WeekEngine();

        this.DAYS_PER_YEAR = 365;
    }

    // توليد سنة واحدة (365 يوم)
    generateYear(yearIndex) {
        const startDay = yearIndex * this.DAYS_PER_YEAR;
        const days = [];

        for (let i = 0; i < this.DAYS_PER_YEAR; i++) {
            const dayNumber = startDay + i;

            days.push({
                globalDay: dayNumber,
                year: yearIndex,

                weekday: this.week.calc(dayNumber),
                solar: this.solar.calc(dayNumber),
                lunar: this.lunar.calc(dayNumber)
            });
        }

        return {
            year: yearIndex,
            days
        };
    }

    // توليد كامل 50,000 سنة
    generateAllYears(limit = 50000) {
        const timeline = [];

        for (let year = 0; year < limit; year++) {
            const yearData = this.generateYear(year);
            timeline.push(yearData);
        }

        return {
            totalYears: limit,
            totalDays: limit * this.DAYS_PER_YEAR,
            timeline
        };
    }
}
