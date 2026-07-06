export class ChronologyOS {

    constructor(timeEngine, cache) {
        this.timeEngine = timeEngine;
        this.cache = cache;
    }

    key(type, value) {
        return `${type}:${JSON.stringify(value)}`;
    }

    getDay(day) {

        const k = this.key("day", day);

        if (this.cache.has(k)) {
            return this.cache.get(k);
        }

        const result = this.timeEngine.getDay(day);

        this.cache.set(k, result);

        return result;
    }

    getRange(start, end) {

        const k = this.key("range", [start, end]);

        if (this.cache.has(k)) {
            return this.cache.get(k);
        }

        const result = this.timeEngine.getRange(start, end);

        this.cache.set(k, result);

        return result;
    }

    getYear(year) {

        const k = this.key("year", year);

        if (this.cache.has(k)) {
            return this.cache.get(k);
        }

        const result = this.timeEngine.simulateYear(year);

        this.cache.set(k, result);

        return result;
    }

    search(query) {

        const q = query.toLowerCase();

        if (q.includes("day")) {
            const n = Number(q.match(/\d+/)?.[0]);
            return this.getDay(n);
        }

        if (q.includes("year")) {
            const n = Number(q.match(/\d+/)?.[0]);
            return this.getYear(n);
        }

        if (q.includes("range")) {
            const nums = q.match(/\d+/g);
            return this.getRange(Number(nums[0]), Number(nums[1]));
        }

        return { error: "Unsupported query" };
    }
}
