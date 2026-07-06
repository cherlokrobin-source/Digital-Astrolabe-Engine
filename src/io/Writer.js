import fs from "fs";

export default class Writer {

    static write(filePath, data) {
        fs.writeFileSync(
            filePath,
            JSON.stringify(data)
        );
    }
}
