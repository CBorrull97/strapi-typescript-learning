export interface LessonDuration {
  durationMinutes: number;
}

export interface CourseStats {
    documentId: string;
    title: string;
    lessonCount: number;
    totalDurationMinutes: number;
}

export function calculateTotalDuration(lessons: LessonDuration[]): number {
  let total = 0;
  for (const lesson of lessons) {
    total += lesson.durationMinutes;
  }
  return total;
}
