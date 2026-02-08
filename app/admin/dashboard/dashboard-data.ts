/**
 * Data for IMETS Master Admin Hub dashboard.
 */

export const dashboardTitle = {
  main: "Dashboard Hub",
  subtitle: "Enhanced Master Administrative Control Center",
  selectedDate: "Sept 15, 2023",
};

export const kpiCards = [
  {
    key: "revenue",
    value: "$45,200",
    change: "+12.5%",
    changeColor: "green",
    subtitle: null,
    progress: true,
  },
  {
    key: "students",
    value: "1,240",
    change: "+8%",
    changeColor: "green",
    subtitle: "Target: 1,500 students",
    progress: false,
  },
  {
    key: "leads",
    value: "84",
    change: "This Week",
    changeColor: "blue",
    subtitle: "12% conversion rate",
    progress: false,
  },
  {
    key: "lms",
    value: "78%",
    change: null,
    status: "Stable",
    statusColor: "yellow",
    subtitle: "Average 4.2h / week",
    progress: false,
  },
];

export const lmsCoursesCard = {
  completionPercent: 64,
  activeCourses: 32,
  draftPending: 14,
  label: "AVERAGE CONTENT COMPLETION",
};

export const studyGroupsBatches = [
  { id: "1", name: "MBA Batch #14", filled: 28, total: 30 },
  { id: "2", name: "Digital Marketing Q4", filled: 22, total: 35 },
  { id: "3", name: "UX Design Bootcamp", filled: 15, total: 20 },
];

export const leadsOverviewCard = {
  pipelineVolume: 458,
  pipelineChange: "+14% vs LY",
  responseTime: "18m",
  responseLabel: "Fast Priority",
  agentsActive: 12,
};

export const topSalesAgents = [
  { id: "1", name: "Jane Doe", initials: "JD", convRate: "24.8%" },
  { id: "2", name: "Mike Kay", initials: "MK", convRate: "21.2%" },
  { id: "3", name: "Sam Wilson", initials: "SW", convRate: "19.5%" },
];

export const facultyCard = {
  activeInstructors: 86,
  rating: 4.8,
  ratingChange: "+0.2",
  chartLabel: "Satisfaction score over last 7",
  satisfactionScores: [4.2, 4.4, 4.5, 4.6, 4.5, 4.7, 4.8],
};

export const platformUpdateCard = {
  title: "Platform Update",
  text: "The new semester automation features are now live. Review the configuration guide.",
  cta: "Read more",
};

/** AI Insights - right sidebar */
export const aiInsightsAlerts = [
  {
    id: "1",
    type: "high" as const,
    title: "5 Overdue Installments",
    label: "Action Required",
    description: "Total amount: $8,450. Suggested automated reminder sequence.",
    buttonLabel: "Resolve Now",
  },
  {
    id: "2",
    type: "capacity" as const,
    title: "2 Group Capacity Alerts",
    label: "Capacity Alert",
    description: "MBA Batch #14 is at 98% capacity. Consider opening a secondary track.",
    buttonLabel: "Expand Batch",
  },
];

export const aiInsightsRecommendation = {
  title: "MBA Batch #15 Match",
  type: "Instructor Match",
  description:
    "We recommend Dr. Aris Thorne for the upcoming Strategy module based on historical feedback.",
  primaryButton: "Assign",
  secondaryButton: "Profile",
};

export const aiInsightsBenchmarks = [
  { id: "1", label: "Q3 Financial Close", date: "Sept 30, 2023", active: true },
  { id: "2", label: "LMS Platform Migration", date: "Oct 15, 2023", active: false },
];
