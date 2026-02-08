/**
 * Mock data for LMS Course Management page.
 */

export const lmsStats = {
  totalActiveCourses: 124,
  totalActiveCoursesTrend: "+12% from last month",
  totalLessons: 1842,
  totalLessonsUpdated: "Updated 2 hours ago",
  avgCompletionRate: 78.4,
  avgCompletionTrend: "↑ 4.2% increase",
};

export type CourseStatus = "Active" | "Scheduled" | "Draft";

export interface LMSCourseRow {
  id: string;
  courseName: string;
  instructor: string;
  category: string;
  subcategory: string;
  modulesDone: number;
  modulesTotal: number;
  assignedGroups: string[];
  enrollment: number;
  status: CourseStatus;
  iconColor: string;
}

export const lmsCourses: LMSCourseRow[] = [
  {
    id: "1",
    courseName: "Advanced Project Management",
    instructor: "Sarah J. Miller",
    category: "Leadership",
    subcategory: "Project Management",
    modulesDone: 12,
    modulesTotal: 48,
    assignedGroups: ["QA", "Dev", "Eng", "MGT"],
    enrollment: 1240,
    status: "Active",
    iconColor: "bg-emerald-500",
  },
  {
    id: "2",
    courseName: "Cloud Infrastructure & DevOps",
    instructor: "Michael Chen",
    category: "Technical",
    subcategory: "Infrastructure",
    modulesDone: 24,
    modulesTotal: 32,
    assignedGroups: ["IT", "HR"],
    enrollment: 856,
    status: "Active",
    iconColor: "bg-blue-500",
  },
  {
    id: "3",
    courseName: "Data Privacy & Compliance",
    instructor: "Emma Wilson",
    category: "Compliance",
    subcategory: "Regulatory",
    modulesDone: 0,
    modulesTotal: 16,
    assignedGroups: [],
    enrollment: 0,
    status: "Scheduled",
    iconColor: "bg-amber-500",
  },
  {
    id: "4",
    courseName: "Leadership Essentials",
    instructor: "David Brown",
    category: "Leadership",
    subcategory: "Management",
    modulesDone: 8,
    modulesTotal: 24,
    assignedGroups: ["MGT"],
    enrollment: 412,
    status: "Draft",
    iconColor: "bg-violet-500",
  },
];

export function getLMSCourseById(id: string): LMSCourseRow | undefined {
  return lmsCourses.find((c) => c.id === id);
}

/** Mock detail for LMS course overview (description, metrics, modules, etc.) */
export interface LMSCourseDetail {
  totalEnrolled: number;
  avgProgress: number;
  quizPassRate: number;
  rating: number;
  /** Single description or use descriptionParagraphs */
  description: string;
  /** Optional second paragraph for Course Description section */
  descriptionParagraphs?: string[];
  createdAt: string;
  totalHours: number;
  format: string;
  difficulty: string;
  language: string;
  quizzesTotal: number;
  instructorTitle: string;
  recentGroups: {
    name: string;
    students: number;
    date: string;
    status: string;
  }[];
  modules: {
    id: string;
    title: string;
    locked?: string;
    lessonsCount: number;
    quizzesCount: number;
    items: { title: string; type: string; duration?: string; meta?: string }[];
  }[];
  quickInsight: string;
  quickInsightPercent: number;
}

export function getLMSCourseDetail(id: string): LMSCourseDetail {
  const base = getLMSCourseById(id);
  return {
    totalEnrolled: base?.enrollment ?? 1248,
    avgProgress: 76,
    quizPassRate: 82,
    rating: 4.8,
    description:
      "This advanced program covers stakeholder psychology, risk mitigation matrices, and hybrid frameworks. Designed for experienced project managers seeking PMP certification and leadership skills.",
    descriptionParagraphs: [
      "This comprehensive course covers the advanced principles and practices of modern project management. Students will learn the methodologies used by the world's most successful organizations to manage complex, multi-year projects from inception to completion.",
      "Key highlights include Agile/Scrum integration, risk mitigation strategies, stakeholder management in digital-first environments, and resource optimization through advanced data analytics.",
    ],
    createdAt: "Jan 15, 2024",
    totalHours: 45,
    format: "Hybrid",
    difficulty: "Advanced",
    language: "English (UK)",
    quizzesTotal: 12,
    instructorTitle: "Lead Project Analyst",
    recentGroups: [
      {
        name: "Winter Cohort 2024",
        students: 45,
        date: "Feb 1, 2024",
        status: "Upcoming",
      },
      {
        name: "Corporate Excellence A1",
        students: 12,
        date: "Jan 10, 2024",
        status: "In-Progress",
      },
    ],
    modules: [
      {
        id: "m1",
        title: "M1 Foundations of Advanced PM",
        lessonsCount: 4,
        quizzesCount: 2,
        items: [
          {
            title: "Introduction to Stakeholder Psychology",
            type: "YouTube",
            duration: "12:45 min",
          },
          {
            title: "Advanced Risk Mitigation Matrices",
            type: "VdoCipher",
            duration: "34:20 min",
          },
          {
            title: "Module 1 Baseline Assessment",
            type: "Quiz",
            meta: "15 Questions • Required",
          },
        ],
      },
      {
        id: "m2",
        title: "M2 Agile & Hybrid Frameworks",
        locked: "Locked until M1 Complete",
        lessonsCount: 0,
        quizzesCount: 0,
        items: [],
      },
    ],
    quickInsight: "Course engagement is up 12% compared to last month",
    quickInsightPercent: 12,
  };
}

/** Study Materials Hub: uploaded resource row */
export type StudyMaterialCategory =
  | "LECTURE NOTES"
  | "CASE STUDY"
  | "EXTERNAL LINK";

export type StudyMaterialFileType = "PDF" | "DOCX" | "PPTX" | "XLSX" | "LINK";

export interface StudyMaterialRow {
  id: string;
  /** Display title (editable); defaults to fileName if not set */
  title?: string;
  fileName: string;
  fileType: StudyMaterialFileType;
  category: StudyMaterialCategory;
  size: string;
  uploadDate: string;
  targetGroup: string;
}

export const studyMaterialsResources: StudyMaterialRow[] = [
  {
    id: "1",
    fileName: "Course Syllabus 2024.pdf",
    fileType: "PDF",
    category: "LECTURE NOTES",
    size: "1.2 MB",
    uploadDate: "Oct 24, 2023",
    targetGroup: "Full-time Students",
  },
  {
    id: "2",
    fileName: "Week 01 - Intro to Stats.pptx",
    fileType: "PPTX",
    category: "LECTURE NOTES",
    size: "8.5 MB",
    uploadDate: "Oct 25, 2023",
    targetGroup: "All Enrolled",
  },
  {
    id: "3",
    fileName: "Financial Forecast Model.xlsx",
    fileType: "XLSX",
    category: "CASE STUDY",
    size: "442 KB",
    uploadDate: "Oct 26, 2023",
    targetGroup: "Corporate",
  },
  {
    id: "4",
    fileName: "Case Study Intro Video.url",
    fileType: "LINK",
    category: "EXTERNAL LINK",
    size: "--",
    uploadDate: "Oct 28, 2023",
    targetGroup: "All Enrolled",
  },
];

export const studyMaterialsStats = {
  storageUsed: "1.2 GB",
  storageTotal: "5 GB",
  totalViews: 2482,
  totalDownloads: 856,
};

/** Assigned Groups tab */
export type AssignedGroupStatus = "Active" | "Upcoming" | "Completed";

export interface AssignedGroupRow {
  id: string;
  groupName: string;
  cohortId: string;
  intakePeriod: string;
  studentCount: number;
  averageProgress: number;
  status: AssignedGroupStatus;
}

export const assignedGroupsData: AssignedGroupRow[] = [
  {
    id: "1",
    groupName: "MBA-JAN-24-A",
    cohortId: "124",
    intakePeriod: "Jan 15 - Jun 20, 2024",
    studentCount: 45,
    averageProgress: 65,
    status: "Active",
  },
  {
    id: "2",
    groupName: "MBA-JAN-24-B",
    cohortId: "125",
    intakePeriod: "Jan 15 - Jun 20, 2024",
    studentCount: 42,
    averageProgress: 58,
    status: "Active",
  },
  {
    id: "3",
    groupName: "EXE-MAR-24",
    cohortId: "126",
    intakePeriod: "Mar 1 - Aug 15, 2024",
    studentCount: 28,
    averageProgress: 0,
    status: "Upcoming",
  },
  {
    id: "4",
    groupName: "MBA-SEP-23-ALL",
    cohortId: "120",
    intakePeriod: "Sep 10, 2023 - Feb 28, 2024",
    studentCount: 38,
    averageProgress: 100,
    status: "Completed",
  },
  {
    id: "5",
    groupName: "MBA-APR-24-A",
    cohortId: "127",
    intakePeriod: "Apr 1 - Sep 15, 2024",
    studentCount: 40,
    averageProgress: 22,
    status: "Active",
  },
  {
    id: "6",
    groupName: "MBA-APR-24-B",
    cohortId: "128",
    intakePeriod: "Apr 1 - Sep 15, 2024",
    studentCount: 35,
    averageProgress: 0,
    status: "Upcoming",
  },
  {
    id: "7",
    groupName: "EXE-JAN-24",
    cohortId: "129",
    intakePeriod: "Jan 20 - Jul 10, 2024",
    studentCount: 22,
    averageProgress: 78,
    status: "Active",
  },
  {
    id: "8",
    groupName: "MBA-JUL-23-ALL",
    cohortId: "118",
    intakePeriod: "Jul 5 - Dec 20, 2023",
    studentCount: 45,
    averageProgress: 100,
    status: "Completed",
  },
  {
    id: "9",
    groupName: "EXE-SEP-24",
    cohortId: "130",
    intakePeriod: "Sep 1, 2024 - Jan 31, 2025",
    studentCount: 0,
    averageProgress: 0,
    status: "Upcoming",
  },
  {
    id: "10",
    groupName: "MBA-NOV-24-A",
    cohortId: "131",
    intakePeriod: "Nov 10, 2024 - Apr 30, 2025",
    studentCount: 0,
    averageProgress: 0,
    status: "Upcoming",
  },
  {
    id: "11",
    groupName: "MBA-NOV-24-B",
    cohortId: "132",
    intakePeriod: "Nov 10, 2024 - Apr 30, 2025",
    studentCount: 0,
    averageProgress: 0,
    status: "Upcoming",
  },
  {
    id: "12",
    groupName: "EXE-JUN-24",
    cohortId: "133",
    intakePeriod: "Jun 1 - Nov 15, 2024",
    studentCount: 30,
    averageProgress: 45,
    status: "Active",
  },
];

export const assignedGroupsStats = {
  totalGroupsAssigned: 12,
  totalEnrolledStudents: 450,
};

/** All groups that can be assigned to a course (pool for search/select in Assign modal) */
export const allGroupsPool: AssignedGroupRow[] = [
  ...assignedGroupsData,
  {
    id: "13",
    groupName: "MBA-FEB-25-A",
    cohortId: "134",
    intakePeriod: "Feb 1 - Jul 15, 2025",
    studentCount: 0,
    averageProgress: 0,
    status: "Upcoming",
  },
  {
    id: "14",
    groupName: "EXE-APR-25",
    cohortId: "135",
    intakePeriod: "Apr 10 - Sep 30, 2025",
    studentCount: 0,
    averageProgress: 0,
    status: "Upcoming",
  },
  {
    id: "15",
    groupName: "MBA-MAY-25-B",
    cohortId: "136",
    intakePeriod: "May 5 - Oct 20, 2025",
    studentCount: 0,
    averageProgress: 0,
    status: "Upcoming",
  },
  {
    id: "16",
    groupName: "EXE-JUL-25",
    cohortId: "137",
    intakePeriod: "Jul 1 - Dec 15, 2025",
    studentCount: 0,
    averageProgress: 0,
    status: "Upcoming",
  },
  {
    id: "17",
    groupName: "MBA-AUG-25-ALL",
    cohortId: "138",
    intakePeriod: "Aug 10, 2025 - Jan 31, 2026",
    studentCount: 0,
    averageProgress: 0,
    status: "Upcoming",
  },
  {
    id: "18",
    groupName: "EXE-OCT-25",
    cohortId: "139",
    intakePeriod: "Oct 1, 2025 - Mar 15, 2026",
    studentCount: 0,
    averageProgress: 0,
    status: "Upcoming",
  },
];

/** Study Materials Hub: uploaded resources */
export type StudyMaterialCategory = "LECTURE NOTES" | "CASE STUDY" | "EXTERNAL LINK";
export type StudyMaterialType = "pdf" | "pptx" | "xlsx" | "url";

export interface StudyMaterialRow {
  id: string;
  fileName: string;
  fileType: StudyMaterialFileType;
  category: StudyMaterialCategory;
  size: string;
  uploadDate: string;
  targetGroup: string;
  type: StudyMaterialType;
}

export const studyMaterialsData: StudyMaterialRow[] = [
  { id: "sm1", fileName: "Course Syllabus 2024.pdf", fileType: "PDF", category: "LECTURE NOTES", size: "1.2 MB", uploadDate: "Oct 24, 2023", targetGroup: "Full-time Students", type: "pdf" },
  { id: "sm2", fileName: "Week 01 - Intro to Stats.pptx", fileType: "PPTX", category: "LECTURE NOTES", size: "8.5 MB", uploadDate: "Oct 25, 2023", targetGroup: "All Enrolled", type: "pptx" },
  { id: "sm3", fileName: "Financial Forecast Model.xlsx", fileType: "XLSX", category: "CASE STUDY", size: "442 KB", uploadDate: "Oct 26, 2023", targetGroup: "Corporate", type: "xlsx" },
  { id: "sm4", fileName: "Case Study Intro Video.url", fileType: "LINK", category: "EXTERNAL LINK", size: "—", uploadDate: "Oct 28, 2023", targetGroup: "All Enrolled", type: "url" },
];

export const studyMaterialsTotal = 24;
export const studyMaterialsStorageUsed = "1.2 GB / 5 GB";
export const studyMaterialsTotalViews = 2482;
export const studyMaterialsTotalDownloads = 856;

/** Feedback & Review tab */
export const feedbackSummary = {
  averageRating: 4.8,
  totalReviews: 1420,
  csatScore: 94,
};

export const ratingBreakdown = [
  { stars: 5, percent: 82 },
  { stars: 4, percent: 12 },
  { stars: 3, percent: 4 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 1 },
];

export interface CourseReviewRow {
  id: string;
  studentName: string;
  studentId: string;
  rating: number;
  date: string;
  comment: string;
  underReview?: boolean;
}

export const courseReviewsData: CourseReviewRow[] = [
  { id: "r1", studentName: "Alex Thompson", studentId: "IM-2024-0842", rating: 5, date: "Mar 15, 2024", comment: "Excellent course! The content was well-structured and the instructor was very knowledgeable. Highly recommend for anyone preparing for the PMP exam." },
  { id: "r2", studentName: "James Smith", studentId: "IM-2024-0915", rating: 4, date: "Mar 12, 2024", comment: "Great material and practical examples. Would have liked more case studies, but overall a solid experience." },
  { id: "r3", studentName: "Elena Rodriguez", studentId: "IM-2024-0722", rating: 2, date: "Feb 28, 2024", comment: "Content flagged for review due to community guidelines policy.", underReview: true },
];

export const courseReviewsTotal = 1420;

/** Course Students tab: student status filter */
export type CourseStudentStatus =
  | "Active"
  | "Completed"
  | "Dropped"
  | "At Risk";

export interface CourseStudentRow {
  id: string;
  name: string;
  studentId: string;
  assignedGroup: string;
  enrollmentDate: string;
  progress: number;
  avgQuizScore: number;
  lastActivityAgo: string;
  lastActivityDetail: string;
  lastActivityStatus: "active" | "inactive" | "completed";
  status: CourseStudentStatus;
  initials?: string;
}

export const courseStudentsTotal = 1248;

export const courseStudentsData: CourseStudentRow[] = [
  {
    id: "s1",
    name: "Alex Thompson",
    studentId: "IM-2024-0842",
    assignedGroup: "Winter Cohort 2024",
    enrollmentDate: "Jan 20, 2024",
    progress: 85,
    avgQuizScore: 92,
    lastActivityAgo: "2 hours ago",
    lastActivityDetail: "Module 3: Risk mitigation",
    lastActivityStatus: "active",
    status: "Active",
    initials: "AT",
  },
  {
    id: "s2",
    name: "Elena Rodriguez",
    studentId: "IM-2024-0915",
    assignedGroup: "Corporate Excellence A1",
    enrollmentDate: "Jan 25, 2024",
    progress: 12,
    avgQuizScore: 45,
    lastActivityAgo: "15 days ago",
    lastActivityDetail: "Inactive",
    lastActivityStatus: "inactive",
    status: "At Risk",
    initials: "ER",
  },
  {
    id: "s3",
    name: "James Smith",
    studentId: "IM-2024-0722",
    assignedGroup: "Winter Cohort 2024",
    enrollmentDate: "Jan 18, 2024",
    progress: 100,
    avgQuizScore: 88,
    lastActivityAgo: "Completed",
    lastActivityDetail: "Mar 12, 2024",
    lastActivityStatus: "completed",
    status: "Completed",
    initials: "JS",
  },
  {
    id: "s4",
    name: "Maria Chen",
    studentId: "IM-2024-0891",
    assignedGroup: "Winter Cohort 2024",
    enrollmentDate: "Jan 22, 2024",
    progress: 62,
    avgQuizScore: 78,
    lastActivityAgo: "1 day ago",
    lastActivityDetail: "Module 2: Agile frameworks",
    lastActivityStatus: "active",
    status: "Active",
    initials: "MC",
  },
  {
    id: "s5",
    name: "David Park",
    studentId: "IM-2024-0655",
    assignedGroup: "Corporate Excellence A1",
    enrollmentDate: "Jan 10, 2024",
    progress: 0,
    avgQuizScore: 0,
    lastActivityAgo: "30 days ago",
    lastActivityDetail: "Dropped",
    lastActivityStatus: "inactive",
    status: "Dropped",
    initials: "DP",
  },
];

/** Students available to enroll (for right sidebar search) */
export interface EnrollableStudent {
  id: string;
  name: string;
  email: string;
  studentId: string;
}

export const enrollableStudentsPool: EnrollableStudent[] = [
  { id: "e1", name: "Rachel Kim", email: "rachel.kim@example.com", studentId: "IM-2024-1101" },
  { id: "e2", name: "Tom Wilson", email: "tom.wilson@example.com", studentId: "IM-2024-1102" },
  { id: "e3", name: "Priya Sharma", email: "priya.sharma@example.com", studentId: "IM-2024-1103" },
  { id: "e4", name: "Chris Lee", email: "chris.lee@example.com", studentId: "IM-2024-1104" },
];
