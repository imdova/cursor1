"use client";

import "./assignments.css";
import Link from "next/link";
import {
  Search,
  Bell,
  Settings,
  Play,
  Upload,
  Check,
  Calendar,
  Clock,
  Star,
  Paperclip,
  Eye,
  FileText,
  Download,
  Send,
} from "lucide-react";
import { ROUTES } from "@/constants";
import {
  assignmentsStats,
  activeAssignments,
  quickSubmissionNext,
  recentActivity,
  type AssignmentItem,
  type RecentActivityItem,
} from "./assignments-data";
import { useState } from "react";
import { AssignmentSubmissionModal } from "./AssignmentSubmissionModal";

const TABS = [
  { id: "active", label: "Active", icon: Play },
  { id: "submitted", label: "Submitted", icon: Upload },
  { id: "graded", label: "Graded", icon: Check },
] as const;

export default function MyAssignmentsPage() {
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]["id"]>("active");
  const [submissionModalAssignment, setSubmissionModalAssignment] =
    useState<AssignmentItem | null>(null);

  return (
    <div className="ah-wrapper">
      {/* Top bar: logo, nav (Assignments active), search, bell, gear, avatar */}
      <header className="ah-header">
        <Link href={ROUTES.STUDENT.DASHBOARD} className="ah-logo">
          <div className="ah-logo-icon">M</div>
          <span className="ah-logo-text">IMETS Academy</span>
        </Link>
        <nav className="ah-nav">
          <Link href={ROUTES.STUDENT.DASHBOARD}>Dashboard</Link>
          <Link href={ROUTES.STUDENT.ASSIGNMENTS} className="active">
            Assignments
          </Link>
          <Link href={ROUTES.STUDENT.COURSES}>Courses</Link>
          <Link href={ROUTES.STUDENT.GRADES}>Grades</Link>
          <Link href={ROUTES.STUDENT.SCHEDULE}>Schedule</Link>
        </nav>
        <div className="ah-search-wrap">
          <Search className="ah-search-icon" strokeWidth={2} />
          <input
            type="search"
            className="ah-search"
            placeholder="Search assignments..."
            aria-label="Search assignments"
          />
        </div>
        <div className="ah-actions">
          <button
            type="button"
            className="ah-icon-btn"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" strokeWidth={2} />
          </button>
          <Link
            href={ROUTES.STUDENT.SETTINGS}
            className="ah-icon-btn"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" strokeWidth={2} />
          </Link>
          <Link
            href={ROUTES.STUDENT.PROFILE}
            className="ah-avatar"
            aria-label="Profile"
          >
            <span className="ah-avatar-inner">JR</span>
          </Link>
        </div>
      </header>

      <div className="ah-main">
        <div className="ah-header-block">
          <h1 className="ah-title">My Assignments Hub</h1>
          <p className="ah-subtitle">
            Manage your academic progress and track upcoming deliverables across
            all courses.
          </p>
        </div>

        {/* Summary cards */}
        <div className="ah-cards">
          <div className="ah-card ah-card-progress">
            <div className="ah-card-icon-wrap ah-card-icon-blue">
              <Calendar className="ah-card-icon" strokeWidth={2} />
              <Clock className="ah-card-icon-clock" strokeWidth={2} />
            </div>
            <div className="ah-card-body">
              <span className="ah-card-label">IN PROGRESS</span>
              <p className="ah-card-value">{assignmentsStats.inProgress}</p>
              <p className="ah-card-trend ah-card-trend-green">
                {assignmentsStats.inProgressTrend}
              </p>
            </div>
          </div>
          <div className="ah-card ah-card-deadlines">
            <div className="ah-card-icon-wrap ah-card-icon-red">
              <Calendar className="ah-card-icon" strokeWidth={2} />
            </div>
            <div className="ah-card-body">
              <span className="ah-card-label">DEADLINES</span>
              <p className="ah-card-value">{assignmentsStats.deadlines}</p>
              <p className="ah-card-trend ah-card-trend-red">
                {assignmentsStats.deadlinesNext}
              </p>
            </div>
          </div>
          <div className="ah-card ah-card-grade">
            <div className="ah-card-icon-wrap ah-card-icon-purple">
              <Star className="ah-card-icon" strokeWidth={2} />
            </div>
            <div className="ah-card-body">
              <span className="ah-card-label">AVERAGE GRADE</span>
              <p className="ah-card-value">{assignmentsStats.averageGrade}</p>
              <p className="ah-card-trend ah-card-trend-gray">
                {assignmentsStats.averageGradeNote}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="ah-tabs">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                className={`ah-tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {activeTab === tab.id && <span className="ah-tab-dot" />}
                <Icon className="ah-tab-icon" strokeWidth={2} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Two columns: assignment list + sidebar */}
        <div className="ah-grid">
          <div className="ah-list">
            {activeTab === "active" &&
              activeAssignments.map((item) => (
                <AssignmentCard
                  key={item.id}
                  item={item}
                  onSubmitWork={() => setSubmissionModalAssignment(item)}
                />
              ))}
            {activeTab === "submitted" && (
              <p className="ah-empty">No submitted assignments in this view.</p>
            )}
            {activeTab === "graded" && (
              <p className="ah-empty">No graded assignments in this view.</p>
            )}
          </div>

          <aside className="ah-sidebar">
            <div className="ah-sidebar-card">
              <h3 className="ah-sidebar-title">Quick Submission</h3>
              <p className="ah-sidebar-subtitle">NEXT DELIVERABLE</p>
              <div className="ah-next-deliverable">
                <span className="ah-next-dot" />
                <div>
                  <p className="ah-next-course">
                    {quickSubmissionNext.courseCode}
                  </p>
                  <p className="ah-next-title">{quickSubmissionNext.title}</p>
                  <p className="ah-next-deadline">
                    {quickSubmissionNext.deadline}
                  </p>
                </div>
              </div>
              <div className="ah-drop-zone">
                <Upload className="ah-drop-icon" strokeWidth={2} />
                <p className="ah-drop-text">
                  Drag & drop files here or click to browse
                </p>
                <p className="ah-drop-hint">
                  Max file size: 50MB (.zip, .pdf, .py)
                </p>
              </div>
              <button type="button" className="ah-submit-btn">
                <Send className="w-4 h-4" strokeWidth={2} />
                Submit Work
              </button>
            </div>
            <div className="ah-sidebar-card">
              <h3 className="ah-sidebar-activity-title">RECENT ACTIVITY</h3>
              {recentActivity.map((activity) => (
                <ActivityRow key={activity.id} item={activity} />
              ))}
            </div>
          </aside>
        </div>
      </div>

      <AssignmentSubmissionModal
        open={!!submissionModalAssignment}
        onClose={() => setSubmissionModalAssignment(null)}
        assignment={submissionModalAssignment}
      />
    </div>
  );
}

function AssignmentCard({
  item,
  onSubmitWork,
}: {
  item: AssignmentItem;
  onSubmitWork: () => void;
}) {
  const isUrgent = item.status === "urgent";
  const isSubmitWork = item.primaryAction === "Submit Work";

  return (
    <div className="ah-assign-card">
      <span
        className={`ah-assign-tag ${
          isUrgent ? "ah-assign-tag-urgent" : "ah-assign-tag-regular"
        }`}
      >
        {isUrgent ? "URGENT" : "REGULAR"}
      </span>
      <p className="ah-assign-course">{item.courseCode}</p>
      <Link
        href={ROUTES.STUDENT.ASSIGNMENT_DETAIL(item.id)}
        className="ah-assign-title-link"
      >
        <h2 className="ah-assign-title">{item.title}</h2>
      </Link>
      <p className="ah-assign-due-label">{item.dueText}</p>
      <p className="ah-assign-due-value">{item.dueCountdown}</p>
      <button
        type="button"
        className={`ah-assign-btn ${
          isSubmitWork ? "ah-assign-btn-primary" : "ah-assign-btn-secondary"
        }`}
        onClick={onSubmitWork}
      >
        {item.primaryAction}
      </button>
      <div className="ah-assign-meta">
        {item.fileCount != null && (
          <span className="ah-assign-meta-item">
            <Paperclip className="w-4 h-4" strokeWidth={2} />
            {item.fileCount} File{item.fileCount !== 1 ? "s" : ""}
          </span>
        )}
        {item.views != null && (
          <span className="ah-assign-meta-item">
            <Eye className="w-4 h-4" strokeWidth={2} />
            {item.views} Views
          </span>
        )}
        {item.attachmentLabel && (
          <span className="ah-assign-meta-item">
            <FileText className="w-4 h-4" strokeWidth={2} />
            {item.attachmentLabel}
          </span>
        )}
      </div>
      <Link href="#" className="ah-assign-download">
        <Download className="w-4 h-4" strokeWidth={2} />
        Download Brief
      </Link>
    </div>
  );
}

function ActivityRow({ item }: { item: RecentActivityItem }) {
  const isGraded = item.type === "graded";
  return (
    <div className="ah-activity-row">
      <div
        className={`ah-activity-icon ${
          isGraded ? "ah-activity-icon-graded" : "ah-activity-icon-processing"
        }`}
      >
        {isGraded ? (
          <Check className="w-4 h-4" strokeWidth={2.5} />
        ) : (
          <Clock className="w-4 h-4" strokeWidth={2} />
        )}
      </div>
      <div className="ah-activity-body">
        <p className="ah-activity-title">{item.title}</p>
        <p className="ah-activity-detail">{item.detail}</p>
      </div>
    </div>
  );
}
