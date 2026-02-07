/**
 * Data for assignment detail page (brief, outcomes, drafts, specs, rubric, instructor).
 */

export interface LearningOutcome {
  text: string;
  completed: boolean;
}

export interface DraftEntry {
  id: string;
  fileName: string;
  timestamp: string;
  size: string;
  format: "pdf" | "docx";
}

export interface RubricItem {
  name: string;
  percent: string;
  description: string;
}

export interface AssignmentDetailData {
  id: string;
  courseName: string;
  title: string;
  status: "in_progress" | "submitted" | "graded";
  dueLabel: string;
  briefDescription: string;
  learningOutcomes: LearningOutcome[];
  drafts: DraftEntry[];
  wordCountCurrent: number;
  wordCountTarget: number;
  formatOk: boolean;
  similarityOk: boolean;
  rubric: RubricItem[];
  instructorName: string;
  instructorTitle?: string;
}

const defaultDetail: AssignmentDetailData = {
  id: "1",
  courseName: "Advanced Statistical Analysis",
  title: "Unit 4: Mid-term Research Paper",
  status: "in_progress",
  dueLabel: "DUE IN 3 Days, 4 Hours",
  briefDescription:
    "Provide a comprehensive analysis of the longitudinal dataset provided in Workshop 3. Your paper should focus on the correlation between socio-economic factors and educational outcomes over a 10-year period.",
  learningOutcomes: [
    {
      text: "Apply advanced statistical models to real-world datasets.",
      completed: true,
    },
    {
      text: "Synthesize quantitative findings into qualitative insights.",
      completed: true,
    },
    {
      text: "Maintain APA 7th Edition citation standards throughout.",
      completed: false,
    },
  ],
  drafts: [
    {
      id: "d1",
      fileName: "Unit4_Research_Draft_v3.pdf",
      timestamp: "Today at 10:20 AM",
      size: "4.2 MB",
      format: "pdf",
    },
    {
      id: "d2",
      fileName: "Unit4_Research_Draft_v2.pdf",
      timestamp: "Yesterday at 3:45 PM",
      size: "3.8 MB",
      format: "pdf",
    },
    {
      id: "d3",
      fileName: "Initial_Structure.docx",
      timestamp: "Oct 20 at 9:15 AM",
      size: "1.1 MB",
      format: "docx",
    },
  ],
  wordCountCurrent: 1250,
  wordCountTarget: 2000,
  formatOk: true,
  similarityOk: true,
  rubric: [
    {
      name: "Analysis Depth",
      percent: "40%",
      description:
        "Evaluation based on clarity of findings and data interpretation.",
    },
    {
      name: "Visual Presentation",
      percent: "30%",
      description: "Quality of graphs, charts, and table formatting.",
    },
    {
      name: "Citation & References",
      percent: "20%",
      description: "APA 7th Edition compliance and source integration.",
    },
    {
      name: "Writing Quality",
      percent: "10%",
      description: "Clarity, coherence, and academic tone.",
    },
  ],
  instructorName: "Dr. Sarah Jenkins",
  instructorTitle: "Instructor",
};

const detailsById: Record<string, Partial<AssignmentDetailData>> = {
  "1": defaultDetail,
  "2": {
    id: "2",
    courseName: "Marketing Ethics",
    title: "Case Study: Tech Monopolies & Privacy",
    status: "in_progress",
    dueLabel: "DUE IN 5 Days, 8 Hours",
    briefDescription:
      "Analyze a chosen tech company's approach to user privacy and market dominance. Discuss ethical implications and regulatory considerations.",
    learningOutcomes: [
      {
        text: "Identify key ethical issues in tech and privacy.",
        completed: true,
      },
      {
        text: "Apply ethical frameworks to real case studies.",
        completed: false,
      },
      { text: "Present balanced arguments with evidence.", completed: false },
    ],
    drafts: [],
    wordCountCurrent: 800,
    wordCountTarget: 1500,
    formatOk: true,
    similarityOk: true,
    rubric: [
      {
        name: "Case Analysis",
        percent: "35%",
        description: "Depth and accuracy of case description.",
      },
      {
        name: "Ethical Argument",
        percent: "35%",
        description: "Use of frameworks and reasoning.",
      },
      {
        name: "Structure & Clarity",
        percent: "30%",
        description: "Organization and writing quality.",
      },
    ],
    instructorName: "Dr. Sarah Jenkins",
  },
  "3": {
    id: "3",
    courseName: "Discrete Math",
    title: "Graph Theory Problem Set #4",
    status: "in_progress",
    dueLabel: "DUE IN 8 Days, 12 Hours",
    briefDescription:
      "Complete the assigned problems on graph theory. Show all steps and justify your reasoning.",
    learningOutcomes: [
      { text: "Apply graph algorithms to solve problems.", completed: false },
      { text: "Prove basic graph theory results.", completed: false },
    ],
    drafts: [],
    wordCountCurrent: 0,
    wordCountTarget: 0,
    formatOk: true,
    similarityOk: true,
    rubric: [
      {
        name: "Correctness",
        percent: "60%",
        description: "Correct solutions and proofs.",
      },
      {
        name: "Presentation",
        percent: "40%",
        description: "Clarity and notation.",
      },
    ],
    instructorName: "Dr. Sarah Jenkins",
  },
};

export function getAssignmentDetail(id: string): AssignmentDetailData {
  const overrides = detailsById[id];
  if (!overrides) {
    return {
      ...defaultDetail,
      id,
      courseName: "Course",
      title: "Assignment",
      dueLabel: "DUE IN —",
      drafts: [],
    };
  }
  return { ...defaultDetail, ...overrides } as AssignmentDetailData;
}
