/**
 * Mock data for Student Academic Transcript (single course or diploma).
 */

export const transcriptProfile = {
  studentName: "Alex Thompson",
  studentId: "IM-2024-8892",
  status: "GRADUATED",
  program: "B.S. Software Engineering",
  issuedDate: "MAY 2024",
};

export const transcriptStats = {
  cumulativeGpa: "3.85",
  creditsEarned: "120.0",
};

export type CourseStatus = "completed" | "in_progress";

export interface TranscriptCourseRow {
  code: string;
  courseTitle: string;
  date: string;
  grade: string;
  status: CourseStatus;
}

export const transcriptCourses: TranscriptCourseRow[] = [
  {
    code: "CS101",
    courseTitle: "Intro to Software Engineering",
    date: "May 12, 2023",
    grade: "A",
    status: "completed",
  },
  {
    code: "MAT202",
    courseTitle: "Advanced Calculus",
    date: "Dec 15, 2023",
    grade: "B+",
    status: "completed",
  },
  {
    code: "PHY101",
    courseTitle: "Classical Physics",
    date: "May 10, 2024",
    grade: "A-",
    status: "completed",
  },
  {
    code: "ENG210",
    courseTitle: "Technical Writing",
    date: "Aug 05, 2024",
    grade: "A",
    status: "completed",
  },
  {
    code: "CS304",
    courseTitle: "Database Management Systems",
    date: "Sep 20, 2024",
    grade: "-",
    status: "in_progress",
  },
];

export const transcriptUrl = "https://imets.edu/tr/alex-t-8892";

export const privacyDefaults = {
  passwordProtect: false,
  hideGrades: false,
  showGpa: true,
};
