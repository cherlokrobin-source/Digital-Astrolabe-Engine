import fs from "fs";
import zlib from "zlib";

export class TimeDatabase {

    constructor(file = "./data/time.db.gz") {
        this.file = file;
        this.cache = new Map();
    }

    set(day, data) {
        this.cache.set(day, data);
    }

    get(day) {
        return this.cache.get(day) || null;
    }

    has(day) {
        return this.cache.has(day);
    }

    // 💾 حفظ مضغوط
    save() {
        const raw = JSON.stringify([...this.cache.entries()]);
        const compressed = zlib.gzipSync(raw);
        fs.writeFileSync(this.file, compressed);
    }

    // 📥 تحميل
    load() {
        if (!fs.existsSync(this.file)) return;

        const compressed = fs.readFileSync(this.file);
        const raw = zlib.gunzipSync(compressed);
        const data = JSON.parse(raw.toString());

        this.cache = new Map(data);
    }

    size() {
        return this.cache.size;
    }
}
