/**
 * Mock data for Groups Management page.
 */

export type GroupStatus = "ACTIVE" | "UPCOMING";

export interface GroupRow {
  id: string;
  groupName: string;
  status: GroupStatus;
  courseTitle: string;
  periodStart: string;
  periodEnd: string;
  studentsCurrent: number;
  studentsMax: number;
  instructorInitials: string;
  instructorName: string;
}

export const groupsSummary = {
  activeGroups: 32,
  pendingEnrollment: 128,
  upcomingCourses: 16,
};

export const groupsList: GroupRow[] = [
  {
    id: "1",
    groupName: "MBA-JAN-24-A",
    status: "ACTIVE",
    courseTitle: "Master of Business Administration",
    periodStart: "Jan 01, 2024",
    periodEnd: "Jun 30, 2024",
    studentsCurrent: 25,
    studentsMax: 30,
    instructorInitials: "SJ",
    instructorName: "Dr. Sarah Jenkins",
  },
  {
    id: "2",
    groupName: "DS-MAR-24-B",
    status: "ACTIVE",
    courseTitle: "Data Science Bootcamp",
    periodStart: "Mar 15, 2024",
    periodEnd: "Aug 15, 2024",
    studentsCurrent: 30,
    studentsMax: 30,
    instructorInitials: "MC",
    instructorName: "Prof. Michael Chen",
  },
  {
    id: "3",
    groupName: "PM-APR-24-A",
    status: "UPCOMING",
    courseTitle: "Advanced Project Management",
    periodStart: "Apr 01, 2024",
    periodEnd: "Sep 30, 2024",
    studentsCurrent: 18,
    studentsMax: 28,
    instructorInitials: "AL",
    instructorName: "Dr. Amanda Lee",
  },
  {
    id: "4",
    groupName: "SE-MAY-24-B",
    status: "UPCOMING",
    courseTitle: "Software Engineering Fundamentals",
    periodStart: "May 10, 2024",
    periodEnd: "Oct 31, 2024",
    studentsCurrent: 12,
    studentsMax: 25,
    instructorInitials: "RK",
    instructorName: "Prof. Raj Kumar",
  },
];

export const TOTAL_GROUPS = 48;
