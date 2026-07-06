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
