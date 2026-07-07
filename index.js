// المسارات المصححة بناءً على هيكلية مشروعك
import MasterEngine from "./engines/master/MasterEngine.js"; 
import ArchiveEnginePRO from "./archive/ArchiveEnginePRO.js";

const engine = new MasterEngine();
const archive = new ArchiveEnginePRO(engine);

// توليد تدريجي (ابدأ صغير)
archive.generateAll(10);

// اختبار قراءة يوم
console.log(archive.getDay(100));

