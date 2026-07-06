import express from "express";

import { TimeDatabase } from "./src/database/TimeDatabase.js";
import { TimeIndexStore } from "./src/database/TimeIndexStore.js";

import { WeekEngine } from "./src/engines/week/WeekEngine.js";
import { SolarEngine } from "./src/engines/solar/SolarEngine.js";
import { LunarEngine } from "./src/engines/lunar/LunarEngine.js";

import { MasterEngine } from "./src/engines/master/MasterEngine.js";
import { YearArchive } from "./src/archive/YearArchive.js";

const app = express();
const PORT = 3000;

app.use(express.json());

/* =========================
   🧊 STORAGE LAYER
========================= */
const db = new TimeDatabase();
db.load();

const index = new TimeIndexStore();

/* =========================
   🧠 CORE ENGINES
========================= */
const week = new WeekEngine();
const solar = new SolarEngine();
const lunar = new LunarEngine();

/* =========================
   ⚡ MASTER ENGINE
========================= */
const engine = new MasterEngine(db, week, solar, lunar, index, "hybrid");

/* =========================
   📦 YEAR ARCHIVE ENGINE
========================= */
const archive = new YearArchive(week);

/* =========================
   🌐 ROUTES
========================= */

// 🔥 Health check
app.get("/", (req, res) => {
    res.json({
        name: "True Chronology Engine (TCE)",
        status: "running",
        epoch: "stable",
        version: "v1"
    });
});

// 📅 Single day compute
app.get("/day/:n", (req, res) => {
    const n = Number(req.params.n);
    res.json(engine.calc(n));
});

// ⚡ Mode switch (fast | scientific | hybrid)
app.get("/mode/:m", (req, res) => {
    engine.mode = req.params.m;
    res.json({ mode: engine.mode });
});

/* =========================
   📦 YEAR ARCHIVE (HUMAN READABLE)
========================= */
app.get("/archive/year/:y", (req, res) => {

    const y = Number(req.params.y);

    const data = archive.generateYear(y);

    res.json({
        year: y,
        totalDays: data.days.length,

        // عينات فقط لتخفيف الضغط
        firstDay: data.days[0],
        lastDay: data.days[data.days.length - 1]
    });
});

/* =========================
   💾 SAVE SYSTEM
========================= */
app.get("/db/save", (req, res) => {
    db.save();
    index.save();

    res.json({
        status: "saved",
        dbSize: db.size(),
        indexSize: index.size()
    });
});

/* =========================
   🚀 START SERVER
========================= */
app.listen(PORT, () => {
    console.log("🚀 True Chronology Engine running at http://localhost:" + PORT);
});
