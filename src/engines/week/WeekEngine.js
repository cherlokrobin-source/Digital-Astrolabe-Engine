export class WeekEngine {

    constructor() {

        // Epoch:
        // Day 1 = Friday
        this.days = [
            "Friday",
            "Saturday",
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday"
        ];
    }

    calc(day) {

        // Day 1 -> Friday
        const index =
            ((day - 1) % 7 + 7) % 7;

        return {
            index,
            name: this.days[index]
        };
    }
}
