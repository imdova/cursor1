/**
 * Mock data for My Certificates page (design match).
 */

export const certificatesSummary = {
  totalEarned: 12,
  addedThisMonth: 2,
  latestAchievement: {
    title: "Advanced Data Analytics",
    issuedDate: "OCT 12, 2023",
  },
};

export type CertificateStatus = "completed" | "in_progress";

export interface CertificateItem {
  id: string;
  title: string;
  issuedDate: string;
  certificateId: string;
  status: CertificateStatus;
  imagePlaceholder?: string;
  progressPercent?: number;
  description?: string;
  modulesPassed?: string;
  capstoneStatus?: string;
  courseId?: string;
}

export const certificatesList: CertificateItem[] = [
  {
    id: "1",
    title: "Advanced Data Analytics Specialist",
    issuedDate: "OCT 12, 2023",
    certificateId: "IM-88291-ADA",
    status: "completed",
  },
  {
    id: "2",
    title: "UI/UX Design Specialist",
    issuedDate: "AUG 05, 2023",
    certificateId: "IM-77102-UIX",
    status: "completed",
  },
  {
    id: "3",
    title: "Financial Modeling 101",
    issuedDate: "MAY 20, 2023",
    certificateId: "IM-44021-FIN",
    status: "completed",
  },
  {
    id: "4",
    title: "Full-Stack Web Development Mastery",
    issuedDate: "",
    certificateId: "",
    status: "in_progress",
    progressPercent: 85,
    description:
      "Complete all modules and the capstone project to unlock this certificate.",
    modulesPassed: "12/12 Modules Passed",
    capstoneStatus: "Capstone Project Pending",
    courseId: "fs-web-dev",
  },
];

export interface PartnerItem {
  id: string;
  name: string;
  role: string;
  logoPlaceholder?: string;
  logoVariant?: "green" | "light" | "lightgreen";
}

export const recognitionPartners: PartnerItem[] = [
  {
    id: "1",
    name: "Global Tech Consortium",
    role: "STRATEGIC PARTNER",
    logoVariant: "green",
  },
  {
    id: "2",
    name: "Analytics Institute",
    role: "OFFICIAL ACCREDITATION",
    logoVariant: "light",
  },
  {
    id: "3",
    name: "UX Design Council",
    role: "ENDORSEMENT PARTNER",
    logoVariant: "lightgreen",
  },
];

export const helpSupportLinks = [
  { label: "Missing a certificate?", href: "#" },
  { label: "Update profile name", href: "#" },
  { label: "Verification guide", href: "#" },
];
