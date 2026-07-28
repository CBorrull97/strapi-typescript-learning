export const COURSE_LEVELS = ["beginner", "intermediate", "advanced"] as const;

export type CourseLevel = (typeof COURSE_LEVELS)[number];

export function isCourseLevel(value: unknown): value is CourseLevel {
  return (
    typeof value === "string" && COURSE_LEVELS.some((level) => level === value)
  );
}
