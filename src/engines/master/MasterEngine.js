export class MasterEngine {
    constructor(db, week, solar, lunar, index) {
        this.db = db;
        this.week = week;
        this.solar = solar;
        this.lunar = lunar;
        this.index = index;
    }

    /**
     * حساب بيانات يوم معين بناءً على الرقم التسلسلي لليوم
     * @param {number} dayIndex - الرقم الترتيبي لليوم
     * @returns {object} - البيانات المتزامنة لليوم (شمسياً وقمرياً وأسبوعياً)
     */
    calc(dayIndex) {
        // حساب البيانات عبر المحركات الفرعية المتكاملة
        const weekData = this.week ? this.week.calc(dayIndex) : null;
        const solarData = this.solar ? this.solar.calc(dayIndex) : null;
        const lunarData = this.lunar ? this.lunar.calc(dayIndex) : null;

        return {
            dayIndex: dayIndex,
            week: weekData,
            solar: solarData,
            lunar: lunarData,
            timestamp: new Date().toISOString()
        };
    }
}

