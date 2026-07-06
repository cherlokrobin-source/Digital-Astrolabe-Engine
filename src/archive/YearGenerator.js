export class YearGenerator {

    constructor(week, solar, lunar) {
        this.week = week;
        this.solar = solar;
        this.lunar = lunar;

        // 🌐 أسماء الشهور الشمسي (Gregorian-like)
        this.solarMonths = [
            "January","February","March","April","May","June",
            "July","August","September","October","November","December"
        ];

        // 🌙 أسماء الشهور القمرية
        this.lunarMonths = [
            "Muharram","Safar","Rabi I","Rabi II",
            "Jumada I","Jumada II",
            "Rajab","Shaaban","Ramadan",
            "Shawwal","Dhul Qadah","Dhul Hijjah"
        ];
    }

    generateYear(yearIndex) {

        const daysInYear = 365;
        const result = [];

        for (let i = 1; i <= daysInYear; i++) {

            const globalDay = (yearIndex - 1) * 365 + i;

            const weekday = this.week.calc(globalDay - 1);

            const solarMonth = Math.floor((i - 1) / 30);
            const solarDay = ((i - 1) % 30) + 1;

            const lunarMonth = Math.floor((i - 1) / 29);
            const lunarDay = ((i - 1) % 29) + 1;

            result.push({
                dayNumber: globalDay,

                weekday: weekday.name,

                solar: {
                    year: yearIndex,
                    month: this.solarMonths[solarMonth],
                    day: solarDay
                },

                lunar: {
                    year: yearIndex,
                    month: this.lunarMonths[lunarMonth],
                    day: lunarDay
                }
            });
        }

        return {
            year: yearIndex,
            days: result
        };
    }
}
