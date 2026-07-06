import fs from "fs";
import path from "path";

export class TimeStreamingArchiveEngine {

    constructor(week, solar, lunar) {

        this.week = week;
        this.solar = solar;
        this.lunar = lunar;

        this.daysPerYear = 365;

        this.basePath = "./data/archive_stream";

        if (!fs.existsSync(this.basePath)) {
            fs.mkdirSync(this.basePath, { recursive: true });
        }
    }

    generateYear(year) {

        const filePath =
            path.join(this.basePath, `year_${year}.json`);

        // إذا موجود مسبقاً → لا تعيد الحساب
        if (fs.existsSync(filePath)) {
            return {
                status: "cached",
                file: filePath
            };
        }

        const stream =
            fs.createWriteStream(filePath);

        stream.write("{\n");
        stream.write(`  "year": ${year},\n`);
        stream.write(`  "days": [\n`);

        for (let i = 1; i <= this.daysPerYear; i++) {

            const globalDay =
                (year - 1) * this.daysPerYear + i;

            const dayData = {
                dayNumber: globalDay,

                weekday:
                    this.week.calc(globalDay - 1).name,

                solar:
                    this.solar.calc(globalDay - 1),

                lunar:
                    this.lunar.calc(globalDay - 1)
            };

            stream.write("    " + JSON.stringify(dayData));

            if (i !== this.daysPerYear) {
                stream.write(",\n");
            } else {
                stream.write("\n");
            }
        }

        stream.write("  ]\n");
        stream.write("}\n");

        stream.end();

        return {
            status: "streamed",
            file: filePath,
            year
        };
    }

    generateRange(start, end) {

        const results = [];

        for (let y = start; y <= end; y++) {
            results.push(this.generateYear(y));
        }

        return results;
    }
}
