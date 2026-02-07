"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  Calendar,
  Users,
  Pencil,
  Plus,
  List,
  CalendarDays,
  BarChart3,
  MessageCircle,
  Filter,
  Download,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Mail,
} from "lucide-react";
import { ROUTES } from "@/constants";
import { getGroupDetail } from "./group-detail-data";
import "./group-detail.css";

const STUDENTS_PER_PAGE = 4;

function formatPeriod(start: string, end: string): string {
  const toShort = (s: string) => {
    const parts = s.replace(/,/g, "").trim().split(/\s+/);
    if (parts.length >= 2) return `${parts[0]} ${parts[1]}`;
    return s;
  };
  return `${toShort(start)} - ${toShort(end)}`;
}

export default function GroupDetailPage() {
  const params = useParams();
  const id = (params?.id as string) ?? "";
  const [activeTab, setActiveTab] = useState<
    "students" | "instructor" | "progress" | "communications"
  >("students");
  const [studentPage, setStudentPage] = useState(1);

  const data = getGroupDetail(id);

  if (!data) {
    return (
      <div className="gd-page">
        <div className="gd-not-found">
          <p>Group not found.</p>
          <Link href={ROUTES.ADMIN.GROUPS} className="gd-back-link">
            ← Back to Groups
          </Link>
        </div>
      </div>
    );
  }

  const totalStudentPages =
    Math.ceil(data.students.length / STUDENTS_PER_PAGE) || 1;
  const currentStudentPage = Math.min(studentPage, totalStudentPages);
  const paginatedStudents = data.students.slice(
    (currentStudentPage - 1) * STUDENTS_PER_PAGE,
    currentStudentPage * STUDENTS_PER_PAGE
  );

  const tabs = [
    { id: "students" as const, label: "Student List", icon: List },
    {
      id: "instructor" as const,
      label: "Instructor & Schedule",
      icon: CalendarDays,
    },
    { id: "progress" as const, label: "Academic Progress", icon: BarChart3 },
    {
      id: "communications" as const,
      label: "Communications",
      icon: MessageCircle,
    },
  ];

  return (
    <div className="gd-page">
      {/* Breadcrumb */}
      <div className="gd-breadcrumb">
        <nav className="gd-breadcrumb-nav">
          <Link href={ROUTES.ADMIN.DASHBOARD}>Admin</Link>
          <span className="gd-breadcrumb-sep">&gt;</span>
          <Link href={ROUTES.ADMIN.GROUPS}>Courses</Link>
          <span className="gd-breadcrumb-sep">&gt;</span>
          <span className="gd-breadcrumb-current">{data.groupTitle}</span>
        </nav>
      </div>

      {/* Group header card */}
      <div className="gd-header-card">
        <div className="gd-header-main">
          <div className="gd-header-title-row">
            <h1 className="gd-group-title">{data.groupTitle}</h1>
            <span
              className={`gd-badge ${
                data.status === "ACTIVE COHORT"
                  ? "gd-badge-active"
                  : "gd-badge-upcoming"
              }`}
            >
              {data.status}
            </span>
          </div>
          <p className="gd-course-name">{data.courseName}</p>
          <div className="gd-meta">
            <span className="gd-meta-item">
              <Calendar className="gd-meta-icon" strokeWidth={2} />
              {formatPeriod(data.periodStart, data.periodEnd)}
            </span>
            <span className="gd-meta-item">
              <Users className="gd-meta-icon" strokeWidth={2} />
              {data.studentsEnrolled} Students Enrolled
            </span>
          </div>
        </div>
        <div className="gd-header-actions">
          <button type="button" className="gd-btn-edit">
            <Pencil className="gd-btn-icon" strokeWidth={2} />
            Edit Details
          </button>
          <button type="button" className="gd-btn-add">
            <Plus className="gd-btn-icon" strokeWidth={2} />
            Add Student
          </button>
        </div>
      </div>

      {/* Main content card with tabs */}
      <div className="gd-main-card">
        <div className="gd-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`gd-tab ${
                activeTab === tab.id ? "gd-tab-active" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="gd-tab-icon" strokeWidth={2} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "students" && (
          <div className="gd-tab-panel">
            <div className="gd-panel-header">
              <h2 className="gd-panel-title">Enrolled Students</h2>
              <div className="gd-panel-actions">
                <button type="button" className="gd-btn-filter">
                  <Filter className="gd-btn-sm-icon" strokeWidth={2} />
                  Filter
                </button>
                <button type="button" className="gd-btn-export">
                  <Download className="gd-btn-sm-icon" strokeWidth={2} />
                  Export
                </button>
              </div>
            </div>
            <div className="gd-table-wrap">
              <table className="gd-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Student ID</th>
                    <th>Enrollment Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStudents.map((s) => (
                    <tr key={s.id}>
                      <td>
                        <div className="gd-student-cell">
                          <div className="gd-student-avatar">{s.initials}</div>
                          <span className="gd-student-name">{s.name}</span>
                        </div>
                      </td>
                      <td className="gd-student-id">{s.studentId}</td>
                      <td>{s.enrollmentDate}</td>
                      <td>
                        <span
                          className={`gd-status ${
                            s.status === "Active"
                              ? "gd-status-active"
                              : "gd-status-leave"
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="gd-action-delete"
                          aria-label="Remove student"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={2} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="gd-pagination">
              <p className="gd-pagination-text">
                Showing {paginatedStudents.length} of {data.studentsEnrolled}{" "}
                students
              </p>
              <div className="gd-pagination-controls">
                <button
                  type="button"
                  className="gd-pagination-btn"
                  onClick={() => setStudentPage((p) => Math.max(1, p - 1))}
                  disabled={currentStudentPage <= 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={2} />
                </button>
                {Array.from({ length: totalStudentPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      type="button"
                      className={`gd-pagination-btn ${
                        currentStudentPage === p ? "active" : ""
                      }`}
                      onClick={() => setStudentPage(p)}
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  type="button"
                  className="gd-pagination-btn"
                  onClick={() =>
                    setStudentPage((p) => Math.min(totalStudentPages, p + 1))
                  }
                  disabled={currentStudentPage >= totalStudentPages}
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "instructor" && (
          <div className="gd-tab-panel">
            <p className="gd-placeholder">Instructor & Schedule content</p>
          </div>
        )}
        {activeTab === "progress" && (
          <div className="gd-tab-panel">
            <p className="gd-placeholder">Academic Progress content</p>
          </div>
        )}
        {activeTab === "communications" && (
          <div className="gd-tab-panel">
            <p className="gd-placeholder">Communications content</p>
          </div>
        )}
      </div>

      {/* Bottom cards */}
      <div className="gd-bottom-cards">
        <div className="gd-card gd-instructor-card">
          <div className="gd-card-header">
            <h3 className="gd-card-title">Assigned Instructor</h3>
            <button type="button" className="gd-link-change">
              Change
            </button>
          </div>
          <div className="gd-instructor-info">
            <div className="gd-instructor-photo" aria-hidden>
              {/* placeholder avatar */}
            </div>
            <div>
              <p className="gd-instructor-name">{data.instructorName}</p>
              <p className="gd-instructor-title">{data.instructorTitle}</p>
              <p className="gd-instructor-email">
                <Mail className="gd-email-icon" strokeWidth={2} />
                {data.instructorEmail}
              </p>
            </div>
          </div>
        </div>
        <div className="gd-card gd-performance-card">
          <h3 className="gd-card-title">Performance Snapshot</h3>
          <div className="gd-metrics">
            <div className="gd-metric">
              <span className="gd-metric-value">{data.attendancePercent}%</span>
              <span className="gd-metric-label">Attendance</span>
            </div>
            <div className="gd-metric">
              <span className="gd-metric-value">{data.avgGpa}</span>
              <span className="gd-metric-label">Avg. GPA</span>
            </div>
            <div className="gd-metric">
              <span className="gd-metric-value">{data.openAlerts}</span>
              <span className="gd-metric-label">Open Alerts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="gd-footer">
        <div className="gd-footer-inner">
          <span className="gd-footer-copy">
            © 2024 IMETS Academy. Administrative Hub.
          </span>
          <div className="gd-footer-links">
            <Link href="#">Support</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">System Status</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
