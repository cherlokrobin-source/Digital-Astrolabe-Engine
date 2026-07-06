import fs from "fs";
import path from "path";

export class TimeDBEngine {

    constructor(basePath = "./data/timedb") {

        this.basePath = basePath;

        this.indexFile =
            path.join(this.basePath, "index.json");

        this.archivePath =
            "./data/archive_stream";

        if (!fs.existsSync(this.basePath)) {
            fs.mkdirSync(this.basePath, { recursive: true });
        }

        if (!fs.existsSync(this.indexFile)) {
            fs.writeFileSync(this.indexFile, "{}");
        }

        this.index =
            JSON.parse(fs.readFileSync(this.indexFile));
    }

    // 📦 حفظ index
    saveIndex() {
        fs.writeFileSync(
            this.indexFile,
            JSON.stringify(this.index, null, 2)
        );
    }

    // 📌 تسجيل سنة في الفهرس
    registerYear(year) {

        const file =
            `year_${year}.json`;

        this.index[year] = file;

        this.saveIndex();
    }

    // ⚡ قراءة سنة بسرعة (O(1))
    getYear(year) {

        const file = this.index[year];

        if (!file) {
            return {
                error: "Year not indexed"
            };
        }

        const filePath =
            path.join(this.archivePath, file);

        if (!fs.existsSync(filePath)) {
            return {
                error: "File missing"
            };
        }

        return JSON.parse(
            fs.readFileSync(filePath)
        );
    }

    // 🔥 توليد + تسجيل تلقائي
    buildYear(year, generatorFn) {

        const result =
            generatorFn(year);

        this.registerYear(year);

        return result;
    }

    // 📚 Range fetch (fast loop)
    getRange(start, end) {

        const result = [];

        for (let y = start; y <= end; y++) {
            result.push(this.getYear(y));
        }

        return result;
    }
}
