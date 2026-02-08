/**
 * Mock data for student course overview page (Advanced Data Structures design).
 */

export interface CourseDetailInfo {
  id: string;
  category: string;
  studentsEnrolled: number;
  title: string;
  instructor: string;
  instructorDept: string;
  completionPercent: number;
  lessonsCompleted: number;
  lessonsTotal: number;
  lastAccessed: string;
  /** Optional course cover image URL; placeholder used if not set */
  imageUrl?: string | null;
}

export interface PendingAssignment {
  id: string;
  title: string;
  dueText: string;
  status: "due" | "scheduled";
  action: "submit" | "locked";
}

/** Single row in Assignments tab table */
export interface AssignmentRow {
  id: string;
  number: number;
  title: string;
  deadline: string;
  status: "graded" | "submitted" | "not_started";
  grade: string | null;
  gradeFeedback: string | null;
  action: "open" | "submit" | "locked";
  isNextDeadline?: boolean;
}

/** Course progress for Assignments tab */
export interface CourseProgress {
  completed: number;
  total: number;
  percent: number;
  remaining: number;
}

/** Next deadline card */
export interface NextDeadlineInfo {
  date: string;
  inDaysLabel: string;
  assignmentTitle: string;
  assignmentId: string;
}

/** Utility card (Submission Guidelines, Grade Calculator, etc.) */
export interface AssignmentUtilityCard {
  id: string;
  title: string;
  description: string;
  icon: "help" | "calculator" | "forum";
}

export interface AssignmentsTabData {
  progress: CourseProgress;
  nextDeadline: NextDeadlineInfo | null;
  assignments: AssignmentRow[];
  utilityCards: AssignmentUtilityCard[];
}

export interface StudyMaterialCard {
  id: string;
  title: string;
  type: "PDF" | "PPTX" | "MP4";
  sizeOrDuration: string;
  addedDate: string;
}

/** Resource row inside a study materials module */
export interface StudyMaterialResource {
  id: string;
  title: string;
  typeLabel: string; // e.g. "PowerPoint Document", "PDF Document"
  sizeOrDuration: string; // e.g. "14.5 MB", "18:45 mins"
  iconType: "pptx" | "pdf" | "video" | "zip";
  action: "download" | "play";
}

/** Collapsible module for Study Materials tab */
export interface StudyMaterialsModule {
  id: string;
  number: number;
  title: string;
  resourceCount: number;
  totalSize: string;
  resources: StudyMaterialResource[];
}

export interface SyllabusModule {
  id: string;
  title: string;
  status: "completed" | "active" | "upcoming";
  weekLabel: string;
}

const defaultCourse: CourseDetailInfo = {
  id: "1",
  category: "ENGINEERING",
  studentsEnrolled: 45,
  title: "Advanced Data Structures and Algorithms",
  instructor: "Dr. Sarah Jenkins",
  instructorDept: "Computer Science Dept.",
  completionPercent: 65,
  lessonsCompleted: 12,
  lessonsTotal: 18,
  lastAccessed: "2 hours ago",
  imageUrl: null,
};

const defaultDescription =
  "This course provides a comprehensive deep dive into the foundational and advanced data structures essential for high-performance software engineering. We cover everything from complexity analysis and recursion to trees, graphs, and dynamic programming.";

const defaultLearnItems = [
  "Master Big O notation and algorithm efficiency.",
  "Implement self-balancing trees (AVL, Red-Black).",
  "Graph traversal algorithms (BFS, DFS, Dijkstra).",
  "Solving competitive programming challenges.",
];

const defaultAssignments: PendingAssignment[] = [
  {
    id: "a1",
    title: "Final Project: Optimization Analysis",
    dueText: "Due in 2 days (Friday, 11:59 PM)",
    status: "due",
    action: "submit",
  },
  {
    id: "a2",
    title: "Module 12 Quiz: Graph Theory",
    dueText: "Scheduled for Oct 24, 2023",
    status: "scheduled",
    action: "locked",
  },
];

const defaultAssignmentsTabData: AssignmentsTabData = {
  progress: { completed: 2, total: 5, percent: 40, remaining: 3 },
  nextDeadline: {
    date: "October 20, 2023",
    inDaysLabel: "IN 3 DAYS",
    assignmentTitle: "Typography Workshop",
    assignmentId: "a-typography",
  },
  assignments: [
    { id: "a-quiz", number: 1, title: "Design Principles Quiz", deadline: "Sep 15, 2023", status: "graded", grade: "95/100", gradeFeedback: "Excellent work!", action: "open" },
    { id: "a-case", number: 2, title: "Color Theory Case Study", deadline: "Oct 05, 2023", status: "submitted", grade: null, gradeFeedback: null, action: "open" },
    { id: "a-typography", number: 3, title: "Typography Workshop", deadline: "Oct 20, 2023", status: "not_started", grade: null, gradeFeedback: null, action: "submit", isNextDeadline: true },
    { id: "a-midterm", number: 4, title: "Midterm Project: Wireframing", deadline: "Nov 12, 2023", status: "not_started", grade: null, gradeFeedback: null, action: "locked" },
    { id: "a-final", number: 5, title: "Final Portfolio", deadline: "Dec 15, 2023", status: "not_started", grade: null, gradeFeedback: null, action: "locked" },
  ],
  utilityCards: [
    { id: "util-guidelines", title: "Submission Guidelines", description: "Need help with uploading?", icon: "help" },
    { id: "util-calc", title: "Grade Calculator", description: "Estimate your final mark", icon: "calculator" },
    { id: "util-forum", title: "Assignment Forum", description: "Ask questions to classmates", icon: "forum" },
  ],
};

const defaultMaterials: StudyMaterialCard[] = [
  { id: "m1", title: "Lecture 12: Dijkstra's Visual Guide", type: "PDF", sizeOrDuration: "2.4 MB", addedDate: "Added Oct 12" },
  { id: "m2", title: "Graph Theory Slide Deck", type: "PPTX", sizeOrDuration: "12.1 MB", addedDate: "Added Oct 10" },
  { id: "m3", title: "Review Session Recap", type: "MP4", sizeOrDuration: "45:12", addedDate: "Added Oct 08" },
];

const defaultSyllabus: SyllabusModule[] = [
  { id: "w1", title: "Introduction & Big O", status: "completed", weekLabel: "WEEK 1" },
  { id: "w2", title: "Sorting & Searching", status: "completed", weekLabel: "WEEK 2" },
  { id: "w3", title: "Graph Algorithms", status: "active", weekLabel: "ACTIVE" },
  { id: "w4", title: "Dynamic Programming", status: "upcoming", weekLabel: "WEEK 4" },
];

const defaultStudyMaterialsModules: StudyMaterialsModule[] = [
  {
    id: "mod1",
    number: 1,
    title: "Module 1: Fundamentals of UI Design",
    resourceCount: 4,
    totalSize: "128 MB",
    resources: [
      { id: "r1", title: "Lecture Slides: Design Principles", typeLabel: "PowerPoint Document", sizeOrDuration: "14.5 MB", iconType: "pptx", action: "download" },
      { id: "r2", title: "Reading Material: Color Theory Basics", typeLabel: "PDF Document", sizeOrDuration: "3.2 MB", iconType: "pdf", action: "download" },
      { id: "r3", title: "Introductory Video: Welcome to Design", typeLabel: "MP4 Video", sizeOrDuration: "18:45 mins", iconType: "video", action: "play" },
      { id: "r4", title: "Asset Pack: Icon Sets & Fonts", typeLabel: "ZIP Archive", sizeOrDuration: "92 MB", iconType: "zip", action: "download" },
    ],
  },
  {
    id: "mod2",
    number: 2,
    title: "Module 2: Data Structures & Big O",
    resourceCount: 3,
    totalSize: "45 MB",
    resources: [
      { id: "r5", title: "Slides: Arrays and Linked Lists", typeLabel: "PowerPoint Document", sizeOrDuration: "8.1 MB", iconType: "pptx", action: "download" },
      { id: "r6", title: "Complexity Cheat Sheet", typeLabel: "PDF Document", sizeOrDuration: "1.1 MB", iconType: "pdf", action: "download" },
      { id: "r7", title: "Walkthrough: Recursion", typeLabel: "MP4 Video", sizeOrDuration: "22:10 mins", iconType: "video", action: "play" },
    ],
  },
  {
    id: "mod3",
    number: 3,
    title: "Module 3: Trees and Graphs",
    resourceCount: 5,
    totalSize: "86 MB",
    resources: [
      { id: "r8", title: "Lecture 12: Dijkstra's Visual Guide", typeLabel: "PDF Document", sizeOrDuration: "2.4 MB", iconType: "pdf", action: "download" },
      { id: "r9", title: "Graph Theory Slide Deck", typeLabel: "PowerPoint Document", sizeOrDuration: "12.1 MB", iconType: "pptx", action: "download" },
      { id: "r10", title: "Review Session Recap", typeLabel: "MP4 Video", sizeOrDuration: "45:12", iconType: "video", action: "play" },
      { id: "r11", title: "Practice Problems Set", typeLabel: "PDF Document", sizeOrDuration: "0.8 MB", iconType: "pdf", action: "download" },
      { id: "r12", title: "Code Samples", typeLabel: "ZIP Archive", sizeOrDuration: "65 MB", iconType: "zip", action: "download" },
    ],
  },
];

export function getCourseDetail(courseId: string) {
  return {
    ...defaultCourse,
    id: courseId,
  };
}

export function getCourseDescription(_courseId: string) {
  return defaultDescription;
}

export function getLearnItems(_courseId: string) {
  return defaultLearnItems;
}

export function getPendingAssignments(_courseId: string) {
  return defaultAssignments;
}

export function getAssignmentsTabData(_courseId: string): AssignmentsTabData {
  return defaultAssignmentsTabData;
}

export function getRecentMaterials(_courseId: string) {
  return defaultMaterials;
}

export function getSyllabusOverview(_courseId: string) {
  return defaultSyllabus;
}

export function getStudyMaterialsModules(_courseId: string): StudyMaterialsModule[] {
  return defaultStudyMaterialsModules;
}

/** Instructor for Feedback tab evaluation */
export interface FeedbackInstructor {
  id: string;
  name: string;
  title: string;
  imageUrl?: string | null;
}

const defaultFeedbackInstructors: FeedbackInstructor[] = [
  { id: "inst1", name: "Dr. Sarah Jenkins", title: "Lead Instructor", imageUrl: null },
  { id: "inst2", name: "Prof. Marcus Chen", title: "Lab Assistant", imageUrl: null },
];

export function getFeedbackInstructors(_courseId: string): FeedbackInstructor[] {
  return defaultFeedbackInstructors;
}

/** Requirement row for certificate progress */
export interface CertificateRequirement {
  id: string;
  label: string;
  status: "completed" | "under_review" | "pending";
}

/** Certificate tab: earned view */
export interface CertificateEarnedData {
  recipientName: string;
  certificateId: string;
  issuanceDate: string;
  signatoryName: string;
  signatoryTitle: string;
}

/** Certificate tab: locked/progress view */
export interface CertificateProgressData {
  progressPercent: number;
  requirements: CertificateRequirement[];
}

export interface CertificateTabData {
  earned: boolean;
  /** Used in congratulations heading (first name or short name) */
  recipientShortName: string;
  earnedData?: CertificateEarnedData;
  progressData?: CertificateProgressData;
}

const defaultCertificateTabData: CertificateTabData = {
  earned: true,
  recipientShortName: "Alex",
  earnedData: {
    recipientName: "Alex J. Thompson",
    certificateId: "IMETS-2023-ANL-88219",
    issuanceDate: "October 24, 2023",
    signatoryName: "Dr. Sarah Miller",
    signatoryTitle: "DIRECTOR OF EDUCATION",
  },
  progressData: {
    progressPercent: 85,
    requirements: [
      { id: "r1", label: "Core Strategy Modules", status: "completed" },
      { id: "r2", label: "Hands-on Workshops", status: "completed" },
      { id: "r3", label: "Project Submission", status: "under_review" },
      { id: "r4", label: "Final Assessment Exam", status: "pending" },
    ],
  },
};

export function getCertificateTabData(_courseId: string): CertificateTabData {
  const { earned, recipientShortName, earnedData, progressData } = defaultCertificateTabData;
  return {
    earned,
    recipientShortName,
    earnedData: earned ? earnedData : undefined,
    progressData: earned ? undefined : progressData,
  };
}

/** Single row in Academic Transcript assessment table */
export interface TranscriptAssessmentRow {
  id: string;
  name: string;
  type: "project" | "quiz" | "module" | "final_exam";
  weighting: string;
  score: string | null;
  letterGrade: string;
  status: "completed" | "exempt";
}

export interface TranscriptTabData {
  subtitle: string;
  overallGradeLabel: string;
  overallGradePercent: number;
  gpa: string;
  gpaSubtitle: string;
  creditsEarned: number;
  creditsTotal: number;
  creditsStatus: string;
  creditsStatusFulfilled: boolean;
  assessments: TranscriptAssessmentRow[];
  verificationDate: string;
  validationDescription: string;
  registrarName: string;
  registrarTitle: string;
}

const defaultTranscriptTabData: TranscriptTabData = {
  subtitle: "Advanced Systems Engineering (ASE-2024) — Semester 2",
  overallGradeLabel: "A - Distinction",
  overallGradePercent: 92,
  gpa: "3.85 / 4.0",
  gpaSubtitle: "Upper 5th Percentile of Cohort",
  creditsEarned: 120,
  creditsTotal: 120,
  creditsStatus: "Requirement Fulfilled",
  creditsStatusFulfilled: true,
  assessments: [
    { id: "a1", name: "Systems Architecture Design", type: "project", weighting: "30%", score: "92%", letterGrade: "A", status: "completed" },
    { id: "a2", name: "Mid-Term Theoretical Assessment", type: "quiz", weighting: "20%", score: "88%", letterGrade: "A-", status: "completed" },
    { id: "a3", name: "Mathematics for Engineering II", type: "module", weighting: "Exempt", score: null, letterGrade: "CR", status: "exempt" },
    { id: "a4", name: "Capstone Final Examination", type: "final_exam", weighting: "50%", score: "95%", letterGrade: "A+", status: "completed" },
  ],
  verificationDate: "OCT 24, 2024",
  validationDescription: "This transcript has been digitally signed and verified. It can be independently validated through the IMETS Academic Registry to confirm authenticity and integrity of the recorded grades and credits.",
  registrarName: "DR. JANE SMITH",
  registrarTitle: "UNIVERSITY REGISTRAR, IMETS ACADEMY",
};

export function getTranscriptTabData(_courseId: string): TranscriptTabData {
  return defaultTranscriptTabData;
}

export const instructorBio = {
  name: "Dr. Sarah Jenkins",
  title: "Principal Software Scientist",
  bio: "A pioneer in computational geometry with over 15 years of industry experience at Google and NASA. Dr. Jenkins focuses on making complex concepts intuitive.",
};
