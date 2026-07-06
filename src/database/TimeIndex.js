export class TimeIndex {

    constructor() {
        // فهرس سريع في الذاكرة
        this.index = new Map();
    }

    // 🔥 تسجيل يوم في الفهرس
    set(day, pointer) {
        this.index.set(day, pointer);
    }

    // ⚡ جلب سريع O(1)
    get(day) {
        return this.index.get(day) || null;
    }

    has(day) {
        return this.index.has(day);
    }

    size() {
        return this.index.size;
    }

    clear() {
        this.index.clear();
    }

    // 📦 تصدير الفهرس (للتخزين لاحقاً)
    export() {
        return [...this.index.entries()];
    }

    // 📥 استرجاع الفهرس
    import(data) {
        this.index = new Map(data);
    }
}
