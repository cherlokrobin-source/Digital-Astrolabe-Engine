export class TimeDBUltimate {

    constructor(week, solar, lunar) {

        this.week = week;
        this.solar = solar;
        this.lunar = lunar;

        this.epoch = 1;

        // عدد أيام السنة
        this.daysPerYear = 365;
    }

    // 🔥 Core: direct computation (NO FILES)
    getDay(day) {

        const d = day - this.epoch + 1;

        return this.compute(d, day);
    }

    // 🧠 الحساب المركزي
    compute(epochDay, originalDay) {

        return {

            dayNumber: originalDay,

            // 📅 أسبوع (Friday = day 1)
            weekday: this.week.calc(epochDay),

            // ☀️ شمسي
            solar: this.solar.calc(epochDay),

            // 🌙 قمري
            lunar: this.lunar.calc(epochDay),

            mode: "ultimate"
        };
    }

    // 📚 نطاق بدون ملفات
    getRange(start, end) {

        const result = [];

        for (let i = start; i <= end; i++) {
            result.push(this.getDay(i));
        }

        return result;
    }

    // ⚡ محاكاة أرشيف (بدون تخزين فعلي)
    simulateYear(year) {

        const start =
            (year - 1) * this.daysPerYear + 1;

        const end =
            year * this.daysPerYear;

        return this.getRange(start, end);
    }
}
