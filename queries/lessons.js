import { Lesson } from "@/model/lesson.model";
import { replaceMongoIdInArray } from "@/lib/convertData";

export async function getLesson(lessonId) {
    const lesson = await Lesson.findById(lessonId).lean();
    if (!lesson) return null;
    return replaceMongoIdInArray([lesson])[0];
}
