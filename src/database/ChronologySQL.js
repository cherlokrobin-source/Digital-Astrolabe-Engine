export class ChronologySQL {

    constructor(chrono) {
        this.chrono = chrono;
    }

    parse(query) {

        query = query.toLowerCase();

        // SELECT * FROM time WHERE day = 100
        if (query.includes("where day")) {

            const value =
                Number(query.split("=").pop());

            return this.chrono.getDay(value);
        }

        // WHERE year = 10
        if (query.includes("where year")) {

            const value =
                Number(query.split("=").pop());

            return this.chrono.getYear(value);
        }

        // RANGE 1 100
        if (query.includes("range")) {

            const nums = query.match(/\d+/g);

            return this.chrono.getRange(
                Number(nums[0]),
                Number(nums[1])
            );
        }

        return {
            error: "Unsupported SQL"
        };
    }
}
