<<<<<<< HEAD
calc(day) {

    // Epoch ثابت
    let year = 1;
    let remainingDays = day - 1;

    // تحديد السنة
    while (remainingDays >= this.yearLength(year)) {
        remainingDays -= this.yearLength(year);
        year++;
    }

    const monthLengths = [
        30,29,30,29,30,29,
        30,29,30,29,30,29
    ];

    // سنة كبيسة
    if (this.isLeap(year)) {
        monthLengths[11] = 30;
    }

    let month = 0;

    while (remainingDays >= monthLengths[month]) {
        remainingDays -= monthLengths[month];
        month++;
    }

    return {
        year,
        monthIndex: month,
        monthName: this.months[month],
        dayInMonth: remainingDays + 1,
        isLeapYear: this.isLeap(year)
    };
}
=======
// ~/Astrolabe_Engine/src/engines/lunar/LunarEngine.js
export class LunarEngine {
    calculateFromAbsolute(n) {
        const daysPer30Years = 10631; // (19 * 354) + (11 * 355)
        const cycles30 = Math.floor((n - 1) / daysPer30Years);
        let remainingDays = (n - 1) % daysPer30Years;

        let year = cycles30 * 30 + 1;

        // حساب السنة داخل دورة الـ 30
        while (true) {
            let daysInYear = this.isLeapYear(year) ? 355 : 354;
            if (remainingDays < daysInYear) break;
            remainingDays -= daysInYear;
            year++;
        }

        // توزيع الأشهر (أشهر التوفيقات الإلهامية)
        // الفردية 30 يوماً، الزوجية 29 يوماً (مع زيادة يوم في كبيسة السنة)
        let monthIndex = 0;
        while (true) {
            let daysInMonth = (monthIndex % 2 === 0) ? 30 : 29;
            if (monthIndex === 11 && this.isLeapYear(year)) daysInMonth = 30; // شهر ذو الحجة في الكبيسة
            
            if (remainingDays < daysInMonth) break;
            remainingDays -= daysInMonth;
            monthIndex++;
        }

        return { year, monthIndex, dayInMonth: remainingDays + 1 };
    }

    isLeapYear(year) {
        const y = (year - 1) % 30 + 1;
        return [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29].includes(y);
    }
}

>>>>>>> 26849f9 (feat: initial clean commit of Astrolabe Engine)
