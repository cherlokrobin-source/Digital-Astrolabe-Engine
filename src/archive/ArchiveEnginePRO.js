import { ArchiveWriter } from "./ArchiveWriter.js";

export class ArchiveEnginePRO {

    constructor(engine) {
        this.engine = engine;
        this.writer = new ArchiveWriter();

        this.DAYS_PER_YEAR = 365;
    }

    getDay(n) {
        return this.engine.calc(n);
    }

    generateYear(yearIndex) {
        const start = yearIndex * this.DAYS_PER_YEAR;

        for (let i = 0; i < this.DAYS_PER_YEAR; i++) {
            const day = start + i;

            const data = this.engine.calc(day);

            this.writer.writeDay({
                ...data,
                yearIndex
            });
        }

        return {
            status: "archived (gzip)",
            year: yearIndex
        };
    }

    generateRange(startYear, endYear) {
        for (let y = startYear; y <= endYear; y++) {
            this.generateYear(y);
        }

        return {
            status: "range archived (gzip)",
            from: startYear,
            to: endYear
        };
    }

    close() {
        this.writer.close();
    }
}
