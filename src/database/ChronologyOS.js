export class ChronologyOS {

    constructor(timeEngine) {
        this.timeEngine = timeEngine;
    }

    // 📅 يوم واحد
    getDay(day) {
        return this.timeEngine.getDay(day);
    }

    // 📚 نطاق
    getRange(start, end) {
        return this.timeEngine.getRange(start, end);
    }

    // 🗓️ سنة كاملة
    getYear(year) {
        return this.timeEngine.simulateYear(year);
    }

    // 🔍 استعلام ذكي (LIKE DATABASE)
    query(q) {

        /*
          q format:
          {
            type: "day" | "range" | "year",
            value: number | [start,end]
          }
        */

        switch (q.type) {

            case "day":
                return this.getDay(q.value);

            case "range":
                return this.getRange(q.value[0], q.value[1]);

            case "year":
                return this.getYear(q.value);

            default:
                return {
                    error: "Invalid query"
                };
        }
    }

    // 🧠 SQL-like simulation
    sql(query) {

        const q = query.toLowerCase();

        if (q.includes("where day")) {
            const day = Number(q.split("=").pop());
            return this.getDay(day);
        }

        if (q.includes("where year")) {
            const year = Number(q.split("=").pop());
            return this.getYear(year);
        }

        if (q.includes("range")) {
            const parts = q.split(" ");
            const start = Number(parts[parts.length - 2]);
            const end = Number(parts[parts.length - 1]);
            return this.getRange(start, end);
        }

        return {
            error: "Unsupported SQL"
        };
    }
}
