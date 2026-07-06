import { Worker } from "worker_threads";
import os from "os";
import path from "path";

export class TimeWorkerThreads {

    constructor(week, solar, lunar) {

        this.week = week;
        this.solar = solar;
        this.lunar = lunar;

        this.cores = os.cpus().length;
    }

    // 📦 worker file generator
    workerPath() {
        return path.resolve("./src/archive/worker_task.js");
    }

    // ⚡ تشغيل worker واحد
    runWorker(start, end) {

        return new Promise((resolve, reject) => {

            const worker = new Worker(this.workerPath(), {
                workerData: {
                    start,
                    end
                }
            });

            worker.on("message", resolve);
            worker.on("error", reject);
        });
    }

    // 🚀 تشغيل كامل (parallel الحقيقي)
    async run(targetYear = 50000) {

        const chunkSize =
            Math.ceil(targetYear / this.cores);

        const jobs = [];

        let start = 1;

        for (let i = 0; i < this.cores; i++) {

            const end =
                Math.min(start + chunkSize - 1, targetYear);

            jobs.push({ start, end });

            start = end + 1;
        }

        const promises =
            jobs.map(job =>
                this.runWorker(job.start, job.end)
            );

        const results =
            await Promise.all(promises);

        return {
            status: "final-distributed",
            cores: this.cores,
            results
        };
    }
}
