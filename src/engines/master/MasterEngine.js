<<<<<<< HEAD
export class MasterEngine {

    constructor(
        db,
        week,
        solar,
        lunar,
        index,
        mode = "hybrid"
    ) {

=======
// ~/Astrolabe_Engine/src/engines/master/MasterEngine.js

export class MasterEngine {
    constructor(db, week, solar, lunar, index, mode) {
>>>>>>> 26849f9 (feat: initial clean commit of Astrolabe Engine)
        this.db = db;
        this.week = week;
        this.solar = solar;
        this.lunar = lunar;
        this.index = index;
<<<<<<< HEAD

        this.mode = mode;

        // 🌌 True Chronology Epoch
        this.epoch = 1;
    }

    calc(day) {

        if (this.mode === "fast") {
            return this.db.get(day)
                || this.compute(day);
        }

        if (this.db.has(day)) {
            return this.db.get(day);
        }

        const result =
            this.compute(day);

        this.db.set(day, result);
        this.index.set(day, true);

        return result;
    }

    compute(day) {

        // 🔥 Day 1 = Epoch
        const epochDay =
            day - this.epoch + 1;

        const weekday =
            this.week.calc(epochDay);

        const solar =
            this.solar.calc(epochDay);

        const lunar =
            this.lunar.calc(epochDay);

        return {

            epoch: 1,

            dayNumber: day,

            weekday,

            solar,

            lunar,

            mode: this.mode
        };
    }
}
=======
        
        // مصفوفات الأسماء للتقويم الشمسي (غريغوري)
        this.solarMonths = [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ];
        
        // مصفوفات الأسماء للتقويم القمري (التوفيقات الإلهامية)
        this.lunarMonths = [
            "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani", 
            "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban", 
            "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
        ];
        
        // مصفوفة أيام الأسبوع
        this.weekdays = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ];
    }

    /**
     * حساب التاريخ الموحد بناءً على اليوم المطلق (n)
     * @param {number} dayNumber 
     * @returns {object}
     */
    calc(dayNumber) {
        // استدعاء الدوال الموحدة من المحركات
        const solarDate = this.solar.calculateFromAbsolute(dayNumber);
        const lunarDate = this.lunar.calculateFromAbsolute(dayNumber);
        
        // حساب يوم الأسبوع (بافتراض أن اليوم 1 هو الأحد)
        const weekdayIndex = (dayNumber - 1) % 7;

        return {
            dayNumber: dayNumber,
            solar: {
                year: solarDate.year,
                monthIndex: solarDate.monthIndex,
                monthName: this.solarMonths[solarDate.monthIndex],
                dayInMonth: solarDate.dayInMonth
            },
            lunar: {
                year: lunarDate.year,
                monthIndex: lunarDate.monthIndex,
                monthName: this.lunarMonths[lunarDate.monthIndex],
                dayInMonth: lunarDate.dayInMonth
            },
            weekday: this.weekdays[weekdayIndex]
        };
    }
}

>>>>>>> 26849f9 (feat: initial clean commit of Astrolabe Engine)
