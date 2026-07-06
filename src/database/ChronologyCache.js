export class ChronologyCache {

    constructor(limit = 1000) {

        this.limit = limit;

        this.map = new Map();

        this.keys = [];
    }

    get(key) {
        return this.map.get(key);
    }

    has(key) {
        return this.map.has(key);
    }

    set(key, value) {

        if (this.map.has(key)) return;

        if (this.keys.length >= this.limit) {

            const oldKey =
                this.keys.shift();

            this.map.delete(oldKey);
        }

        this.map.set(key, value);
        this.keys.push(key);
    }

    clear() {
        this.map.clear();
        this.keys = [];
    }
}
