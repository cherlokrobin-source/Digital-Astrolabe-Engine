import fs from "fs";
import zlib from "zlib";

export class ArchiveWriter {

    constructor(filePath = "./data/archive.jsonl.gz") {

        this.filePath = filePath;

        this.fileStream = fs.createWriteStream(this.filePath);
        this.gzip = zlib.createGzip();

        this.gzip.pipe(this.fileStream);
    }

    writeDay(record) {
        const line = JSON.stringify(record) + "\n";
        this.gzip.write(line);
    }

    writeYear(yearData) {
        for (const day of yearData.days) {
            this.writeDay(day);
        }
    }

    close() {
        this.gzip.end();
    }
}
