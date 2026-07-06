import fs from "fs";

export default class Reader {

    static read(filePath) {

        if (!fs.existsSync(filePath)) {
            return null;
        }

        return JSON.parse(
            fs.readFileSync(filePath)
        );
    }
}
