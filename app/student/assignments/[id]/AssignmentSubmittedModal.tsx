"use client";

import "./assignment-submitted-modal.css";
import Link from "next/link";
import {
  Check,
  Download,
  LayoutGrid,
  TrendingUp,
  GraduationCap,
  FileText,
  ExternalLink,
} from "lucide-react";
import { ROUTES } from "@/constants";

export interface SubmissionReceiptData {
  receiptId: string;
  studentName: string;
  course: string;
  assignmentTitle: string;
  submittedDate: string;
  fileName: string;
  fileSize: string;
  fileType: string;
}

const defaultReceipt: SubmissionReceiptData = {
  receiptId: "#IM-88293-TX",
  studentName: "Alex Johnson",
  course: "IMETS Advanced Business Strategy",
  assignmentTitle: "Strategic Marketing Analysis",
  submittedDate: "Oct 24, 2023 at 2:15 PM",
  fileName: "marketing_analysis_v2.pdf",
  fileSize: "2.4 MB",
  fileType: "PDF Document",
};

interface AssignmentSubmittedModalProps {
  open: boolean;
  onClose: () => void;
  receipt?: Partial<SubmissionReceiptData>;
}

export function AssignmentSubmittedModal({
  open,
  onClose,
  receipt: receiptOverride,
}: AssignmentSubmittedModalProps) {
  if (!open) return null;

  const receipt = { ...defaultReceipt, ...receiptOverride };

  return (
    <div
      className="asm-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="asm-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="asm-modal" onClick={(e) => e.stopPropagation()}>
        {/* Success icon + headline */}
        <div className="asm-success-block">
          <div className="asm-success-icon-wrap">
            <Check className="asm-success-icon" strokeWidth={2.5} />
          </div>
          <h2 id="asm-title" className="asm-headline">
            Assignment Submitted Successfully!
          </h2>
          <p className="asm-subheadline">
            A confirmation email has been sent to your student address.
          </p>
        </div>

        {/* Submission Receipt card */}
        <div className="asm-receipt-card">
          <div className="asm-receipt-header">Submission Receipt</div>
          <div className="asm-receipt-grid">
            <div className="asm-receipt-col">
              <span className="asm-receipt-label">RECEIPT ID</span>
              <span className="asm-receipt-value">{receipt.receiptId}</span>
              <span className="asm-receipt-label">STUDENT NAME</span>
              <span className="asm-receipt-value">{receipt.studentName}</span>
              <span className="asm-receipt-label">COURSE</span>
              <span className="asm-receipt-value">{receipt.course}</span>
            </div>
            <div className="asm-receipt-col">
              <span className="asm-receipt-label">ASSIGNMENT TITLE</span>
              <span className="asm-receipt-value">
                {receipt.assignmentTitle}
              </span>
              <span className="asm-receipt-label">SUBMITTED DATE</span>
              <span className="asm-receipt-value">{receipt.submittedDate}</span>
            </div>
          </div>
          <div className="asm-receipt-divider" />
          <div className="asm-receipt-file">
            <span className="asm-receipt-label">FILE DETAILS</span>
            <div className="asm-file-row">
              <FileText className="asm-file-icon" strokeWidth={2} />
              <div className="asm-file-info">
                <span className="asm-file-name">{receipt.fileName}</span>
                <span className="asm-file-meta">
                  {receipt.fileSize} • {receipt.fileType}
                </span>
              </div>
              <Link href="#" className="asm-view-file">
                View File
                <ExternalLink className="w-4 h-4" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <h3 className="asm-next-title">Next Steps</h3>
        <div className="asm-next-cards">
          <Link
            href={ROUTES.STUDENT.ASSIGNMENTS}
            className="asm-next-card"
            onClick={onClose}
          >
            <LayoutGrid className="asm-next-card-icon" strokeWidth={2} />
            <span className="asm-next-card-title">Return to Hub</span>
            <span className="asm-next-card-desc">
              Go back to your active assignments list.
            </span>
          </Link>
          <button type="button" className="asm-next-card">
            <TrendingUp className="asm-next-card-icon" strokeWidth={2} />
            <span className="asm-next-card-title">Feedback Timeline</span>
            <span className="asm-next-card-desc">
              See when your grades will be ready.
            </span>
          </button>
          <Link
            href={ROUTES.STUDENT.COURSES}
            className="asm-next-card"
            onClick={onClose}
          >
            <GraduationCap className="asm-next-card-icon" strokeWidth={2} />
            <span className="asm-next-card-title">Next Lesson</span>
            <span className="asm-next-card-desc">
              Continue your learning journey.
            </span>
          </Link>
        </div>

        {/* Download receipt */}
        <button type="button" className="asm-download-btn">
          <Download className="w-5 h-5" strokeWidth={2} />
          Download Submission Receipt (PDF)
        </button>

        {/* Trust message */}
        <p className="asm-trust">
          <Check className="asm-trust-icon" strokeWidth={2.5} />
          Secured by IMETS Trust Protocol v2.4
        </p>

        {/* Footer */}
        <p className="asm-footer">
          © 2023 IMETS Academy. All rights reserved. Professional Academic
          Standards.
        </p>
      </div>
    </div>
  );
}
