import fs from "fs";
import path from "path";

export class TimeArchiveEngine {

    constructor(week, solar, lunar) {

        this.week = week;
        this.solar = solar;
        this.lunar = lunar;

        this.daysPerYear = 365;

        this.basePath = "./data/archive";

        if (!fs.existsSync(this.basePath)) {
            fs.mkdirSync(this.basePath, { recursive: true });
        }
    }

    generateYear(year) {

        const filePath = path.join(this.basePath, `year_${year}.json`);

        if (fs.existsSync(filePath)) {
            return {
                status: "cached",
                file: filePath
            };
        }

        const days = [];

        for (let i = 1; i <= this.daysPerYear; i++) {

            const globalDay = (year - 1) * this.daysPerYear + i;

            days.push({
                dayNumber: globalDay,

                weekday: this.week.calc(globalDay - 1).name,

                solar: this.solar.calc(globalDay - 1),

                lunar: this.lunar.calc(globalDay - 1)
            });
        }

        const archive = {
            year,
            days
        };

        fs.writeFileSync(
            filePath,
            JSON.stringify(archive, null, 2)
        );

        return {
            status: "generated",
            file: filePath,
            days: days.length
        };
    }

    generateRange(startYear, endYear) {

        const result = [];

        for (let y = startYear; y <= endYear; y++) {
            result.push(this.generateYear(y));
        }

        return result;
    }
}
