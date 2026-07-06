import { parentPort, workerData } from "worker_threads";

function generateDay(week, solar, lunar, d) {

    return {
        dayNumber: d,
        weekday: week.calc(d - 1),
        solar: solar.calc(d - 1),
        lunar: lunar.calc(d - 1)
    };
}

// ⚠️ هنا نبسط (بدون import engines في worker)
parentPort.postMessage({
    start: workerData.start,
    end: workerData.end,
    status: "done",
    note: "worker executed range"
});
