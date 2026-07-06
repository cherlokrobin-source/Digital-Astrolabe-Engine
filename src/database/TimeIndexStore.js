import fs from "fs";

export class TimeIndexStore {

    constructor(file = "./data/time_index.json") {
        this.file = file;
        this.index = new Map();

        this.load();
    }

    // 🔥 إضافة عنصر للفهرس
    set(day, value = true) {
        this.index.set(day, value);
    }

    // ⚡ تحقق سريع
    has(day) {
        return this.index.has(day);
    }

    get(day) {
        return this.index.get(day);
    }

    // 💾 حفظ دائم على القرص
    save() {
        const data = JSON.stringify([...this.index.entries()]);
        fs.writeFileSync(this.file, data);
    }

    // 📥 تحميل عند التشغيل
    load() {
        if (!fs.existsSync(this.file)) return;

        const data = fs.readFileSync(this.file, "utf-8");
        const parsed = JSON.parse(data);

        this.index = new Map(parsed);
    }

    size() {
        return this.index.size;
    }
}
