export class YearArchive {

    constructor(week) {
        this.week = week;

        this.solarMonths = [
            "January","February","March","April","May","June",
            "July","August","September","October","November","December"
        ];

        this.lunarMonths = [
            "Muharram","Safar","Rabi I","Rabi II",
            "Jumada I","Jumada II",
            "Rajab","Shaaban","Ramadan",
            "Shawwal","Dhul Qadah","Dhul Hijjah"
        ];
    }

    generateYear(year) {

        const days = [];
        const daysInYear = 365;

        for (let i = 1; i <= daysInYear; i++) {

            const globalDay = (year - 1) * 365 + i;

            const weekday = this.week.calc(globalDay - 1);

            const solarMonth = Math.floor((i - 1) / 30);
            const solarDay = ((i - 1) % 30) + 1;

            const lunarMonth = Math.floor((i - 1) / 29);
            const lunarDay = ((i - 1) % 29) + 1;

            days.push({
                dayNumber: globalDay,

                weekday: weekday.name,

                solar: {
                    year,
                    month: this.solarMonths[solarMonth],
                    day: solarDay
                },

                lunar: {
                    year,
                    month: this.lunarMonths[lunarMonth],
                    day: lunarDay
                }
            });
        }

        return {
            year,
            days
        };
    }
}
