import fs from "fs";
import path from "path";

export default class ArchiveEngine {

    constructor(engine) {
        this.engine = engine;

        this.basePath = path.resolve("data");

        this.ensureDirs();
    }

    ensureDirs() {

        const dirs = [
            "solar",
            "lunar",
            "combined"
        ];

        if (!fs.existsSync(this.basePath)) {
            fs.mkdirSync(this.basePath);
        }

        for (const d of dirs) {
            const p = path.join(this.basePath, d);
            if (!fs.existsSync(p)) {
                fs.mkdirSync(p);
            }
        }
    }

    saveDay(dayNumber, data) {

        const filePath = path.join(
            this.basePath,
            "combined",
            `day_${dayNumber}.json`
        );

        fs.writeFileSync(
            filePath,
            JSON.stringify(data)
        );
    }

    loadDay(dayNumber) {

        const filePath = path.join(
            this.basePath,
            "combined",
            `day_${dayNumber}.json`
        );

        if (!fs.existsSync(filePath)) return null;

        return JSON.parse(
            fs.readFileSync(filePath)
        );
    }

    generate(start, end) {

        for (let day = start; day <= end; day++) {

            const data = this.engine.calc(day);

            this.saveDay(day, data);

            if (day % 1000 === 0) {
                console.log("Generated:", day);
            }
        }
    }
}
