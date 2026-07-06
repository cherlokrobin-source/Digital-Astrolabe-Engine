import fs from "fs";
import path from "path";

export class BatchArchiveEngine {

    constructor(week, solar, lunar) {

        this.week = week;
        this.solar = solar;
        this.lunar = lunar;

        this.daysPerYear = 365;

        this.stateFile =
            "./data/batch_state.json";

        this.outputDir =
            "./data/batch_archive";

        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
        }

        if (!fs.existsSync(this.stateFile)) {
            fs.writeFileSync(this.stateFile, JSON.stringify({
                currentYear: 1,
                status: "idle"
            }, null, 2));
        }
    }

    // 📌 قراءة الحالة
    getState() {
        return JSON.parse(
            fs.readFileSync(this.stateFile)
        );
    }

    // 💾 حفظ الحالة
    saveState(state) {
        fs.writeFileSync(
            this.stateFile,
            JSON.stringify(state, null, 2)
        );
    }

    // 📦 توليد سنة واحدة
    generateYear(year) {

        const days = [];

        const start =
            (year - 1) * this.daysPerYear + 1;

        const end =
            year * this.daysPerYear;

        for (let d = start; d <= end; d++) {

            days.push({
                dayNumber: d,
                weekday: this.week.calc(d - 1),
                solar: this.solar.calc(d - 1),
                lunar: this.lunar.calc(d - 1)
            });
        }

        return {
            year,
            days
        };
    }

    // 🚀 تشغيل batch كامل
    run(targetYear = 50000, chunkSize = 10) {

        let state = this.getState();

        state.status = "running";

        while (state.currentYear <= targetYear) {

            const batch = [];

            const start = state.currentYear;
            const end = Math.min(
                start + chunkSize - 1,
                targetYear
            );

            for (let y = start; y <= end; y++) {
                batch.push(this.generateYear(y));
            }

            const filePath =
                path.join(
                    this.outputDir,
                    `batch_${start}_${end}.json`
                );

            fs.writeFileSync(
                filePath,
                JSON.stringify(batch)
            );

            state.currentYear = end + 1;

            this.saveState(state);

            console.log(
                `✔ Batch ${start}-${end} generated`
            );
        }

        state.status = "completed";
        this.saveState(state);

        return {
            status: "done",
            years: targetYear
        };
    }

    // 🔄 resume
    resume(targetYear = 50000, chunkSize = 10) {
        return this.run(targetYear, chunkSize);
    }

    // 📊 status
    status() {
        return this.getState();
    }
}
