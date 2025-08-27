import { Lesson } from "@/model/lesson.model";
import { replaceMongoIdInArray } from "@/lib/convertData";

export async function getLesson(lessonId){
    const lesson = await Lesson.findById(lessonId).lean();
    return replaceMongoIdInArray(lesson);
}