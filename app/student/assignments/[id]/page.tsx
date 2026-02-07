"use client";

import "./assignment-detail.css";
import Link from "next/link";
import {
  FileText,
  Download,
  Upload,
  Check,
  Circle,
  Clock,
  Bell,
  Trash2,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import { ROUTES } from "@/constants";
import { getAssignmentDetail } from "./assignment-detail-data";
import { useParams } from "next/navigation";
import { useState } from "react";
import { AssignmentSubmittedModal } from "./AssignmentSubmittedModal";

export default function AssignmentDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "1";
  const data = getAssignmentDetail(id);
  const [showSubmittedModal, setShowSubmittedModal] = useState(false);

  const wordPercent =
    data.wordCountTarget > 0
      ? Math.min(100, (data.wordCountCurrent / data.wordCountTarget) * 100)
      : 0;

  return (
    <div className="ad-page">
      {/* Breadcrumbs */}
      <nav className="ad-breadcrumb">
        <Link href={ROUTES.STUDENT.ASSIGNMENTS} className="ad-breadcrumb-link">
          Assignments
        </Link>
        <span className="ad-breadcrumb-sep">&gt;</span>
        <Link href={ROUTES.STUDENT.COURSES} className="ad-breadcrumb-link">
          Courses
        </Link>
        <span className="ad-breadcrumb-sep">&gt;</span>
        <span className="ad-breadcrumb-current">{data.courseName}</span>
      </nav>

      {/* Title row: title, status tag, due tag, bell */}
      <div className="ad-title-row">
        <h1 className="ad-title">{data.title}</h1>
        <span className="ad-status-tag">IN PROGRESS</span>
        <span className="ad-due-tag">
          <Clock className="ad-due-icon" strokeWidth={2} />
          {data.dueLabel}
        </span>
        <button type="button" className="ad-bell" aria-label="Notifications">
          <Bell className="w-5 h-5" strokeWidth={2} />
        </button>
      </div>

      <div className="ad-grid">
        {/* Left column */}
        <div className="ad-main">
          {/* Assignment Brief */}
          <section className="ad-card">
            <h2 className="ad-card-heading">
              <FileText className="ad-card-icon" strokeWidth={2} />
              ASSIGNMENT BRIEF
            </h2>
            <p className="ad-brief-text">{data.briefDescription}</p>
            <button type="button" className="ad-btn-outline">
              <Download className="w-4 h-4" strokeWidth={2} />
              Download Full Brief (PDF)
            </button>
          </section>

          {/* Final Submission Upload */}
          <section className="ad-card ad-card-upload">
            <h2 className="ad-upload-title">Final Submission Upload</h2>
            <p className="ad-upload-desc">
              Drag and drop your final file here, or click to browse your
              computer.
            </p>
            <div className="ad-drop-zone">
              <Upload className="ad-drop-icon" strokeWidth={2} />
            </div>
            <button
              type="button"
              className="ad-btn-primary"
              onClick={() => setShowSubmittedModal(true)}
            >
              Submit Final Version
            </button>
            <p className="ad-upload-note">SUPPORTS PDF, DOCX UP TO 25MB</p>
          </section>

          {/* Learning Outcomes */}
          <section className="ad-card">
            <h2 className="ad-card-heading">LEARNING OUTCOMES</h2>
            <ul className="ad-outcomes-list">
              {data.learningOutcomes.map((outcome, i) => (
                <li key={i} className="ad-outcome-item">
                  {outcome.completed ? (
                    <Check
                      className="ad-outcome-icon ad-outcome-check"
                      strokeWidth={2.5}
                    />
                  ) : (
                    <Circle
                      className="ad-outcome-icon ad-outcome-circle"
                      strokeWidth={2}
                    />
                  )}
                  <span className={outcome.completed ? "ad-outcome-done" : ""}>
                    {outcome.text}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Drafts History */}
          <section className="ad-card">
            <div className="ad-card-head-row">
              <h2 className="ad-card-heading">DRAFTS HISTORY</h2>
              <span className="ad-drafts-count">
                {data.drafts.length} version
                {data.drafts.length !== 1 ? "s" : ""} saved
              </span>
            </div>
            {data.drafts.length === 0 ? (
              <p className="ad-drafts-empty">No drafts yet.</p>
            ) : (
              <ul className="ad-drafts-list">
                {data.drafts.map((draft) => (
                  <li key={draft.id} className="ad-draft-item">
                    <FileText className="ad-draft-file-icon" strokeWidth={2} />
                    <div className="ad-draft-body">
                      <p className="ad-draft-name">{draft.fileName}</p>
                      <p className="ad-draft-meta">
                        {draft.timestamp} • {draft.size}
                      </p>
                    </div>
                    <div className="ad-draft-actions">
                      <Link href="#" className="ad-draft-preview">
                        Preview
                      </Link>
                      <button
                        type="button"
                        className="ad-draft-delete"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={2} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Right column */}
        <aside className="ad-sidebar">
          {/* Submission Specs */}
          <section className="ad-card">
            <h2 className="ad-card-heading">SUBMISSION SPECS</h2>
            {data.wordCountTarget > 0 && (
              <div className="ad-spec-row">
                <p className="ad-spec-label">Word Count Progress</p>
                <div className="ad-progress-wrap">
                  <div
                    className="ad-progress-bar"
                    style={{ width: `${wordPercent}%` }}
                  />
                </div>
                <p className="ad-spec-value">
                  {data.wordCountCurrent.toLocaleString()} /{" "}
                  {data.wordCountTarget.toLocaleString()}
                </p>
              </div>
            )}
            <div className="ad-spec-row">
              <p className="ad-spec-label">Format</p>
              {data.formatOk && (
                <span className="ad-spec-ok">
                  <Check className="w-4 h-4" strokeWidth={2.5} />
                  PDF or Word (.docx)
                </span>
              )}
            </div>
            <div className="ad-spec-row">
              <p className="ad-spec-label">Similarity Limit</p>
              {data.similarityOk && (
                <span className="ad-spec-ok">
                  <Check className="w-4 h-4" strokeWidth={2.5} />
                  Must be under 15%
                </span>
              )}
            </div>
          </section>

          {/* Grading Rubric */}
          <section className="ad-card ad-card-rubric">
            <div className="ad-card-head-row">
              <h2 className="ad-card-heading">GRADING RUBRIC</h2>
              <ChevronDown className="ad-chevron" strokeWidth={2} />
            </div>
            <ul className="ad-rubric-list">
              {data.rubric.map((item, i) => (
                <li key={i} className="ad-rubric-item">
                  <div className="ad-rubric-header">
                    <span className="ad-rubric-name">{item.name}</span>
                    <span className="ad-rubric-percent">{item.percent}</span>
                  </div>
                  <p className="ad-rubric-desc">{item.description}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Chat with Instructor */}
          <section className="ad-card ad-card-chat">
            <div className="ad-instructor-avatar">SJ</div>
            <p className="ad-chat-prompt">Stuck on something?</p>
            <p className="ad-instructor-name">
              Chat with {data.instructorName}
            </p>
            <button type="button" className="ad-btn-chat">
              <MessageCircle className="w-4 h-4" strokeWidth={2} />
              Ask a Clarification
            </button>
          </section>
        </aside>
      </div>

      <AssignmentSubmittedModal
        open={showSubmittedModal}
        onClose={() => setShowSubmittedModal(false)}
        receipt={{
          course: data.courseName,
          assignmentTitle: data.title,
          submittedDate: new Date().toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
          }),
        }}
      />
    </div>
  );
}
