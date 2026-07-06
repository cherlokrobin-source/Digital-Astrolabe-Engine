export class QueryPlanner {

    constructor(cache, engine) {
        this.cache = cache;
        this.engine = engine;
    }

    plan(type, payload) {

        const key =
            `${type}:${JSON.stringify(payload)}`;

        // ⚡ Cache first
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }

        let result;

        switch (type) {

            case "day":
                result =
                    this.engine.getDay(payload);
                break;

            case "range":
                result =
                    this.engine.getRange(
                        payload[0],
                        payload[1]
                    );
                break;

            case "year":
                result =
                    this.engine.getYear(payload);
                break;

            default:
                return { error: "invalid plan" };
        }

        this.cache.set(key, result);

        return result;
    }
}
