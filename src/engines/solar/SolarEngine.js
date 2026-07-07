<<<<<<< HEAD
export class SolarEngine {

    constructor() {

        this.daysPerYear = 365;

        this.months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        // تقسيم تقريبي متساوٍ (يمكن تحسينه لاحقاً)
        this.monthLengths = [
            31,28,31,30,31,30,
            31,31,30,31,30,31
        ];
    }

    calc(day) {

        // Epoch:
        // Day 1 => Year 1
        let remaining = day - 1;

        const year =
            Math.floor(remaining / this.daysPerYear) + 1;

        let dayOfYear =
            (remaining % this.daysPerYear) + 1;

        let month = 0;

        const months =
            [...this.monthLengths];

        // سنة كبيسة
        if (this.isLeapYear(year)) {
            months[1] = 29;
        }

        while (
            month < months.length &&
            dayOfYear > months[month]
        ) {
            dayOfYear -= months[month];
            month++;
        }

        return {
            year,
            monthIndex: month,
            monthName: this.months[month],
            dayInMonth: dayOfYear,
            isLeap: this.isLeapYear(year)
        };
    }

    isLeapYear(year) {

        return (
            (year % 4 === 0 &&
             year % 100 !== 0)
            ||
            (year % 400 === 0)
        );
    }
}
=======
// ~/Astrolabe_Engine/src/engines/solar/SolarEngine.js
export class SolarEngine {
    calculateFromAbsolute(n) {
        const daysPer400Years = 146097;
        const cycles400 = Math.floor((n - 1) / daysPer400Years);
        let remainingDays = (n - 1) % daysPer400Years;

        let year = cycles400 * 400 + 1;
        
        // حساب السنة داخل دورة الـ 400
        while (true) {
            let daysInYear = (this.isLeap(year)) ? 366 : 365;
            if (remainingDays < daysInYear) break;
            remainingDays -= daysInYear;
            year++;
        }

        // توزيع الأيام على الأشهر
        const months = [31, this.isLeap(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let monthIndex = 0;
        while (remainingDays >= months[monthIndex]) {
            remainingDays -= months[monthIndex];
            monthIndex++;
        }

        return { year, monthIndex, dayInMonth: remainingDays + 1 };
    }

    isLeap(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }
}

>>>>>>> 26849f9 (feat: initial clean commit of Astrolabe Engine)
