export class TimeIndexEngine {

    constructor() {

        // 🔥 فهرس زمني خفيف (in-memory index)
        this.yearIndex = new Map();
        this.dayIndex = new Map();
    }

    // 📌 تسجيل يوم
    indexDay(day, data) {
        this.dayIndex.set(day, data);
    }

    // 📌 تسجيل سنة (range mapping)
    indexYear(year, startDay, endDay) {

        this.yearIndex.set(year, {
            start: startDay,
            end: endDay
        });
    }

    // 🔍 جلب سريع
    getDay(day) {
        return this.dayIndex.get(day) || null;
    }

    getYear(year) {
        return this.yearIndex.get(year) || null;
    }

    // 📊 search index
    searchByRange(start, end) {

        const result = [];

        for (let i = start; i <= end; i++) {

            const d = this.dayIndex.get(i);

            if (d) result.push(d);
        }

        return result;
    }
}
