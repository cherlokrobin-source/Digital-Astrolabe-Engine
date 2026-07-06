export class QueryPlannerV10 {

    constructor(cache, engine, index) {

        this.cache = cache;
        this.engine = engine;
        this.index = index;
    }

    plan(type, payload) {

        const key =
            `${type}:${JSON.stringify(payload)}`;

        // ⚡ CACHE FIRST
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }

        let result;

        switch (type) {

            case "day":

                // 🔥 index first
                result =
                    this.index.getDay(payload) ||
                    this.engine.getDay(payload);

                break;

            case "year":

                result =
                    this.index.getYear(payload) ||
                    this.engine.getYear(payload);

                break;

            case "range":

                result =
                    this.index.searchByRange(
                        payload[0],
                        payload[1]
                    );

                break;

            default:
                return { error: "invalid plan" };
        }

        this.cache.set(key, result);

        return result;
    }
}
