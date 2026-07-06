import os from "os";
import fs from "fs";
import path from "path";

export class TimeWorkerEngine {

    constructor(week, solar, lunar) {

        this.week = week;
        this.solar = solar;
        this.lunar = lunar;

        this.daysPerYear = 365;

        this.outputDir =
            "./data/distributed_archive";

        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
        }

        this.cores = os.cpus().length;
    }

    // 📦 توليد سنة واحدة
    generateYear(year) {

        const start =
            (year - 1) * this.daysPerYear + 1;

        const end =
            year * this.daysPerYear;

        const days = [];

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

    // ⚡ تقسيم العمل على العمال (simulate workers)
    splitJobs(targetYear, workers) {

        const chunkSize =
            Math.ceil(targetYear / workers);

        const jobs = [];

        let start = 1;

        for (let i = 0; i < workers; i++) {

            const end =
                Math.min(start + chunkSize - 1, targetYear);

            jobs.push({ start, end });

            start = end + 1;
        }

        return jobs;
    }

    // 🚀 تنفيذ "موزع" (simulated parallel)
    async run(targetYear = 50000) {

        const workers = this.cores;

        const jobs =
            this.splitJobs(targetYear, workers);

        console.log(
            `⚡ Starting ${workers} workers`
        );

        const results = [];

        for (const job of jobs) {

            console.log(
                `Worker processing ${job.start}-${job.end}`
            );

            const batch = [];

            for (let y = job.start; y <= job.end; y++) {
                batch.push(this.generateYear(y));
            }

            const file =
                path.join(
                    this.outputDir,
                    `worker_${job.start}_${job.end}.json`
                );

            fs.writeFileSync(
                file,
                JSON.stringify(batch)
            );

            results.push({
                job,
                file,
                years: job.end - job.start + 1
            });
        }

        return {
            status: "distributed-complete",
            workers,
            jobs: results
        };
    }
}
