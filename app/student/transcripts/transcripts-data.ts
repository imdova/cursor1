/**
 * Mock data for Academic Transcripts list page.
 */

export type TranscriptType = "full" | "program" | "course";

export interface TranscriptItem {
  id: string;
  title: string;
  subtitle: string;
  type: TranscriptType;
  issuedDate: string;
  credentialId?: string;
  courseId?: string;
}

export const transcriptsList: TranscriptItem[] = [
  {
    id: "full",
    title: "Full Academic Record",
    subtitle: "Official transcript – all programs and courses",
    type: "full",
    issuedDate: "May 2024",
    credentialId: "IM-2024-8892",
  },
  {
    id: "program-bs-se",
    title: "B.S. Software Engineering",
    subtitle: "Program transcript – degree requirements",
    type: "program",
    issuedDate: "May 2024",
    credentialId: "IM-2024-BSSE",
  },
  {
    id: "course-1",
    title: "Advanced Structural Engineering",
    subtitle: "Course transcript – Semester 1, 2024",
    type: "course",
    issuedDate: "Semester 1, 2024",
    courseId: "1",
  },
  {
    id: "course-2",
    title: "Data Science & Machine Learning",
    subtitle: "Course transcript – Semester 2, 2024",
    type: "course",
    issuedDate: "Semester 2, 2024",
    courseId: "2",
  },
];
