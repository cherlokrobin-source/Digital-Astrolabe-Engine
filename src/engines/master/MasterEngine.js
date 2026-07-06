export class MasterEngine {

    constructor(
        db,
        week,
        solar,
        lunar,
        index,
        mode = "hybrid"
    ) {

        this.db = db;
        this.week = week;
        this.solar = solar;
        this.lunar = lunar;
        this.index = index;

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
