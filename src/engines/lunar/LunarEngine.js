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
