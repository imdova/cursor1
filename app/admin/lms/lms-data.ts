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
