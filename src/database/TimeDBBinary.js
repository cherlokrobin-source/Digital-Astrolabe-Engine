import fs from "fs";
import path from "path";

export class TimeDBBinary {

    constructor(basePath = "./data/timedb") {

        this.basePath = basePath;

        this.dbFile =
            path.join(basePath, "time.db");

        this.indexFile =
            path.join(basePath, "index.json");

        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath, { recursive: true });
        }

        if (!fs.existsSync(this.dbFile)) {
            fs.writeFileSync(this.dbFile, Buffer.alloc(0));
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

    // 🔥 تسجيل سنة (binary append)
    writeYear(year, data) {

        const buffer =
            Buffer.from(JSON.stringify(data));

        const stats =
            fs.statSync(this.dbFile);

        const offset = stats.size;

        fs.appendFileSync(this.dbFile, buffer);

        this.index[year] = {
            offset,
            size: buffer.length
        };

        this.saveIndex();
    }

    // ⚡ قراءة سنة (O(1))
    readYear(year) {

        const entry =
            this.index[year];

        if (!entry) {
            return {
                error: "not found"
            };
        }

        const fd =
            fs.openSync(this.dbFile, "r");

        const buffer =
            Buffer.alloc(entry.size);

        fs.readSync(
            fd,
            buffer,
            0,
            entry.size,
            entry.offset
        );

        fs.closeSync(fd);

        return JSON.parse(buffer.toString());
    }

    // 📚 Range read
    readRange(start, end) {

        const result = [];

        for (let y = start; y <= end; y++) {
            result.push(this.readYear(y));
        }

        return result;
    }
}
