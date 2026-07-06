import express from "express";

// ============================
// 🌌 CORE ENGINES
// ============================
import { WeekEngine } from "./src/engines/week/WeekEngine.js";
import { SolarEngine } from "./src/engines/solar/SolarEngine.js";
import { LunarEngine } from "./src/engines/lunar/LunarEngine.js";

// ============================
// 🧠 DATABASE LAYER
// ============================
import { ChronologyOS } from "./src/database/ChronologyOS.js";
import { ChronologyCache } from "./src/database/ChronologyCache.js";
import { TimeIndexEngine } from "./src/database/TimeIndexEngine.js";
import { QueryPlannerV10 } from "./src/database/QueryPlannerV10.js";

// ============================
// 📦 ARCHIVE BATCH ENGINE
// ============================
import { BatchArchiveEngine } from "./src/archive/BatchArchiveEngine.js";


// ============================
// 🚀 APP INIT
// ============================
const app = express();
const PORT = 3000;

app.use(express.json());


// ============================
// 🧠 CORE ENGINES
// ============================
const week = new WeekEngine();
const solar = new SolarEngine();
const lunar = new LunarEngine();


// ============================
// ⚡ TIME CORE SYSTEM
// ============================
const timeCore = {
    getDay: (d) => chrono.getDay(d),
    getRange: (s, e) => chrono.getRange(s, e),
    getYear: (y) => chrono.getYear(y)
};


// ============================
// 📦 CACHE + INDEX
// ============================
const cache = new ChronologyCache(2000);
const indexEngine = new TimeIndexEngine();


// ============================
// 🧠 CHRONOLOGY CORE (OS)
// ============================
const chrono = new ChronologyOS(
    {
        getDay: (d) => ({
            dayNumber: d,
            weekday: week.calc(d - 1),
            solar: solar.calc(d - 1),
            lunar: lunar.calc(d - 1),
            mode: "v10"
        }),
        getRange: (s, e) => {
            const res = [];
            for (let i = s; i <= e; i++) {
                res.push(timeCore.getDay(i));
            }
            return res;
        },
        getYear: (y) => {
            const start = (y - 1) * 365 + 1;
            const end = y * 365;
            return timeCore.getRange(start, end);
        }
    },
    cache
);


// ============================
// ⚡ QUERY PLANNER V10
// ============================
const planner = new QueryPlannerV10(
    cache,
    chrono,
    indexEngine
);


// ============================
// 📦 BATCH ENGINE
// ============================
const batchEngine =
    new BatchArchiveEngine(week, solar, lunar);


// ============================
// 🌐 ROUTES
// ============================

// 🔥 Health
app.get("/", (req, res) => {
    res.json({
        name: "Chronology OS v10",
        status: "running",
        version: "10.0"
    });
});


// ============================
// 📅 CORE TIME API
// ============================

// Day
app.get("/day/:n", (req, res) => {
    res.json(planner.plan("day", Number(req.params.n)));
});

// Range
app.get("/range/:s/:e", (req, res) => {
    res.json(planner.plan(
        "range",
        [Number(req.params.s), Number(req.params.e)]
    ));
});

// Year
app.get("/year/:y", (req, res) => {
    res.json(planner.plan("year", Number(req.params.y)));
});


// ============================
// ⚡ V10 DIRECT API
// ============================

app.get("/v10/day/:d", (req, res) => {
    res.json(planner.plan("day", Number(req.params.d)));
});

app.get("/v10/range/:s/:e", (req, res) => {
    res.json(planner.plan(
        "range",
        [Number(req.params.s), Number(req.params.e)]
    ));
});

app.get("/v10/year/:y", (req, res) => {
    res.json(planner.plan("year", Number(req.params.y)));
});


// ============================
// 🔍 SEARCH (SQL-like future layer)
// ============================

app.get("/search", (req, res) => {
    const q = req.query.q;

    if (!q) return res.json({ error: "no query" });

    res.json({
        query: q,
        result: "search layer reserved (v11 upgrade)"
    });
});


// ============================
// 📦 BATCH ARCHIVE
// ============================

app.get("/batch/run", (req, res) => {

    const target =
        Number(req.query.target || 50000);

    const chunk =
        Number(req.query.chunk || 10);

    res.json(
        batchEngine.run(target, chunk)
    );
});

app.get("/batch/resume", (req, res) => {

    const target =
        Number(req.query.target || 50000);

    const chunk =
        Number(req.query.chunk || 10);

    res.json(
        batchEngine.resume(target, chunk)
    );
});

app.get("/batch/status", (req, res) => {
    res.json(batchEngine.status());
});


// ============================
// ⚙️ MODE SWITCH
// ============================

let mode = "v10";

app.get("/mode/:m", (req, res) => {
    mode = req.params.m;
    res.json({ mode });
});


// ============================
// 🚀 START SERVER
// ============================
app.listen(PORT, () => {
    console.log(
        "🚀 Chronology OS v10 running at http://localhost:" + PORT
    );
});
