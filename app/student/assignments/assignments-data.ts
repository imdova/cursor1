/**
 * Mock data for My Assignments Hub.
 */

export const assignmentsStats = {
  inProgress: 12,
  inProgressTrend: "+2 this week",
  deadlines: 4,
  deadlinesNext: "Next in 2 days",
  averageGrade: "88%",
  averageGradeNote: "Stable (Top 10%)",
};

export type AssignmentStatus = "urgent" | "regular";

export interface AssignmentItem {
  id: string;
  status: AssignmentStatus;
  courseCode: string;
  courseName: string;
  title: string;
  dueText: string;
  dueCountdown: string;
  primaryAction: string;
  fileCount?: number;
  views?: number;
  attachmentLabel?: string;
}

export const activeAssignments: AssignmentItem[] = [
  {
    id: "1",
    status: "urgent",
    courseCode: "CS302: Neural Networks",
    courseName: "Advanced Statistical Analysis",
    title: "Unit 4: Mid-term Research Paper",
    dueText: "DUE IN",
    dueCountdown: "01d : 14h : 22m",
    primaryAction: "Submit Work",
    fileCount: 2,
    views: 14,
  },
  {
    id: "2",
    status: "regular",
    courseCode: "BA105: Marketing Ethics",
    courseName: "Marketing Ethics",
    title: "Case Study: Tech Monopolies & Privacy",
    dueText: "DUE IN",
    dueCountdown: "05d : 08h : 10m",
    primaryAction: "Submit Early",
    fileCount: 1,
    attachmentLabel: "Instructions.pdf",
  },
  {
    id: "3",
    status: "regular",
    courseCode: "MA201: Discrete Math",
    courseName: "Discrete Math",
    title: "Graph Theory Problem Set #4",
    dueText: "DUE IN",
    dueCountdown: "08d : 12h : 45m",
    primaryAction: "Submit Early",
    fileCount: 3,
  },
];

export const quickSubmissionNext = {
  courseCode: "CS302: Neural Networks",
  title: "Backpropagation Algorithm...",
  deadline: "Deadline: Oct 24, 11:59 PM",
};

export interface RecentActivityItem {
  id: string;
  type: "graded" | "processing";
  title: string;
  detail: string;
}

export const recentActivity: RecentActivityItem[] = [
  {
    id: "1",
    type: "graded",
    title: "Graded: Econ 101 Report",
    detail: "Score: 92/100 • 2 hours ago",
  },
  {
    id: "2",
    type: "processing",
    title: "Processing: UI/UX Draft",
    detail: "Awaiting instructor • 5 hours ago",
  },
];
