/**
 * Mock data for Student Installments / Payments (design match).
 * Student has no overdue balance; fees are on track.
 */

export const enrolledCourseName = "Advanced Cybersecurity Fundamentals";

export const paymentsSummary = {
  totalFee: "4,500.00",
  totalPaid: "2,250.00",
  totalRemaining: "2,250.00",
  percentComplete: 50,
  semesterLabel: "Applied for Spring 2024 Semester",
  nextInstallment: {
    title: "Second Installment",
    dueDate: "Mar 01, 2024",
    dueInDays: 12,
    amount: "1,125.00",
  },
};

/** Overdue warning banner – show when student has an overdue amount. */
export const overdueReminder = {
  show: true,
  amount: "450.00",
  description:
    "You have an outstanding balance of $450.00 from the February 1st installment.",
  installmentLabel: "February 1st installment",
};

export type InstallmentStatus = "paid" | "overdue" | "due" | "upcoming";

export interface InstallmentItem {
  id: string;
  title: string;
  dateLabel: string;
  amount: string;
  status: InstallmentStatus;
  paidOn?: string;
  daysLate?: number;
}

export const paymentRoadmap: InstallmentItem[] = [
  {
    id: "1",
    title: "Registration Deposit",
    dateLabel: "Paid on Jan 15, 2024",
    amount: "1,125.00",
    status: "paid",
    paidOn: "Jan 15, 2024",
  },
  {
    id: "2",
    title: "First Installment",
    dateLabel: "Due: Feb 01, 2024 (18 days late)",
    amount: "1,125.00",
    status: "overdue",
    daysLate: 18,
  },
  {
    id: "3",
    title: "Second Installment",
    dateLabel: "Due: Mar 01, 2024",
    amount: "1,125.00",
    status: "due",
  },
  {
    id: "4",
    title: "Final Installment",
    dateLabel: "Due: Apr 01, 2024",
    amount: "1,125.00",
    status: "upcoming",
  },
];

export interface PaymentMethodItem {
  id: string;
  type: "visa" | "mastercard";
  label: string;
  lastFour: string;
  expires: string;
  isPrimary?: boolean;
}

export const paymentMethods: PaymentMethodItem[] = [
  {
    id: "1",
    type: "visa",
    label: "Visa ending in 4242",
    lastFour: "4242",
    expires: "12/26",
    isPrimary: true,
  },
  {
    id: "2",
    type: "mastercard",
    label: "Mastercard 8812",
    lastFour: "8812",
    expires: "08/25",
  },
];

export const quickLinks = [
  { label: "Download Fee Receipt", href: "#" },
  { label: "Tax Invoice (2023-24)", href: "#" },
  { label: "Financial Support", href: "#" },
];
