"use client";

import "./groups.css";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants";
import {
  Search,
  ChevronDown,
  Filter,
  Plus,
  Users,
  UserPlus,
  Clock,
  GraduationCap,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  groupsSummary,
  groupsList,
  TOTAL_GROUPS,
  type GroupRow,
} from "./groups-data";

const PER_PAGE = 4;

export default function GroupsManagementPage() {
  const [search, setSearch] = useState("");
  const [courseCategory, setCourseCategory] = useState("All");
  const [academicPeriod, setAcademicPeriod] = useState("All");
  const [page, setPage] = useState(1);

  const filteredGroups = useMemo(() => {
    return groupsList.filter((g) => {
      const matchSearch =
        !search ||
        g.groupName.toLowerCase().includes(search.toLowerCase()) ||
        g.courseTitle.toLowerCase().includes(search.toLowerCase()) ||
        g.instructorName.toLowerCase().includes(search.toLowerCase());
      return matchSearch;
    });
  }, [search]);

  const totalPages = Math.ceil(filteredGroups.length / PER_PAGE) || 1;
  const currentPage = Math.min(page, totalPages);
  const paginatedGroups = useMemo(
    () =>
      filteredGroups.slice(
        (currentPage - 1) * PER_PAGE,
        currentPage * PER_PAGE
      ),
    [filteredGroups, currentPage]
  );

  const startItem = (currentPage - 1) * PER_PAGE + 1;
  const endItem = Math.min(currentPage * PER_PAGE, filteredGroups.length);

  return (
    <div className="gm-page">
      {/* Breadcrumb */}
      <div className="gm-breadcrumb">
        <nav className="gm-breadcrumb-nav">
          <Link href={ROUTES.ADMIN.DASHBOARD}>Admin</Link>
          <span className="gm-breadcrumb-sep">&gt;</span>
          <span className="gm-breadcrumb-current">Groups Management</span>
        </nav>
      </div>

      <div className="gm-main">
        {/* Title row */}
        <div className="gm-header">
          <div>
            <h1 className="gm-title">Groups Management</h1>
            <p className="gm-desc">
              Manage and monitor all active and upcoming academic study groups,
              assign instructors, and track student capacity.
            </p>
          </div>
          <Link href={ROUTES.ADMIN.GROUPS + "/new"} className="gm-btn-create">
            <Plus strokeWidth={2.5} />
            Create New Group
          </Link>
        </div>

        {/* Search and filters */}
        <div className="gm-filter-card">
          <div className="gm-filter-row">
            <div className="gm-search-wrap">
              <Search className="gm-search-icon" strokeWidth={2} />
              <input
                type="text"
                placeholder="Search groups by name, course, or instructor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="gm-search-input"
              />
            </div>
            <div className="gm-select-wrap">
              <GraduationCap className="gm-select-icon" strokeWidth={2} />
              <select
                value={courseCategory}
                onChange={(e) => setCourseCategory(e.target.value)}
                aria-label="Course Category"
              >
                <option value="All">Course Category</option>
                <option value="MBA">MBA</option>
                <option value="Technical">Technical</option>
                <option value="Management">Management</option>
              </select>
              <ChevronDown className="gm-chevron" strokeWidth={2} />
            </div>
            <div className="gm-select-wrap">
              <Calendar className="gm-select-icon" strokeWidth={2} />
              <select
                value={academicPeriod}
                onChange={(e) => setAcademicPeriod(e.target.value)}
                aria-label="Academic Period"
              >
                <option value="All">Academic Period</option>
                <option value="2024-Q1">Jan - Jun 2024</option>
                <option value="2024-Q2">Apr - Sep 2024</option>
              </select>
              <ChevronDown className="gm-chevron" strokeWidth={2} />
            </div>
            <button
              type="button"
              className="gm-filter-btn"
              aria-label="Filters"
            >
              <Filter strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="gm-table-card">
          <div style={{ overflowX: "auto" }}>
            <table className="gm-table">
              <thead>
                <tr>
                  <th>Group Name</th>
                  <th>Course Title</th>
                  <th>Period</th>
                  <th>Students</th>
                  <th>Instructor</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedGroups.map((group) => (
                  <GroupRow key={group.id} group={group} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="gm-pagination">
            <p className="gm-pagination-text">
              Showing {startItem} to {endItem} of {TOTAL_GROUPS} groups
            </p>
            <div className="gm-pagination-controls">
              <button
                type="button"
                className="gm-pagination-btn"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={2} />
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`gm-pagination-btn ${
                    currentPage === p ? "active" : ""
                  }`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
              <span className="gm-pagination-ellipsis">...</span>
              <button
                type="button"
                className="gm-pagination-btn"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        {/* Summary cards */}
        <div className="gm-cards">
          <div className="gm-card">
            <div className="gm-card-icon">
              <Users strokeWidth={2} />
            </div>
            <div>
              <p className="gm-card-value">{groupsSummary.activeGroups}</p>
              <p className="gm-card-label">Active Groups</p>
            </div>
          </div>
          <div className="gm-card">
            <div className="gm-card-icon">
              <UserPlus strokeWidth={2} />
            </div>
            <div>
              <p className="gm-card-value">{groupsSummary.pendingEnrollment}</p>
              <p className="gm-card-label">Pending Enrollment</p>
            </div>
          </div>
          <div className="gm-card">
            <div className="gm-card-icon">
              <Clock strokeWidth={2} />
            </div>
            <div>
              <p className="gm-card-value">{groupsSummary.upcomingCourses}</p>
              <p className="gm-card-label">Upcoming Courses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="gm-footer">
        <div className="gm-footer-inner">
          <span className="gm-footer-brand">IMETS Academy Administration</span>
          <span className="gm-footer-copy">
            © 2024 International Modern Education & Technology School. All
            rights reserved.
          </span>
          <div className="gm-footer-links">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Support Center</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function GroupRow({ group }: { group: GroupRow }) {
  const isFull = group.studentsCurrent >= group.studentsMax;
  const percent = Math.round((group.studentsCurrent / group.studentsMax) * 100);

  return (
    <tr>
      <td>
        <Link
          href={ROUTES.ADMIN.GROUP(group.id)}
          className="gm-group-name-link"
        >
          <p className="gm-group-name">{group.groupName}</p>
        </Link>
        <span
          className={`gm-tag ${
            group.status === "ACTIVE" ? "gm-tag-active" : "gm-tag-upcoming"
          }`}
        >
          {group.status}
        </span>
      </td>
      <td className="gm-course-title">{group.courseTitle}</td>
      <td className="gm-period">
        {group.periodStart} to {group.periodEnd}
      </td>
      <td>
        <div className="gm-students-wrap">
          <span className="gm-students-count">
            {group.studentsCurrent}/{group.studentsMax}
          </span>
          <div className="gm-progress-track">
            <div
              className={`gm-progress-fill ${
                isFull ? "gm-progress-fill-red" : "gm-progress-fill-blue"
              }`}
              style={{ width: `${Math.min(100, percent)}%` }}
            />
          </div>
        </div>
      </td>
      <td>
        <div className="gm-instructor">
          <div className="gm-instructor-avatar">{group.instructorInitials}</div>
          <span className="gm-instructor-name">{group.instructorName}</span>
        </div>
      </td>
      <td style={{ textAlign: "right" }}>
        <Link href={ROUTES.ADMIN.GROUP(group.id)} className="gm-btn-manage">
          Manage
        </Link>
      </td>
    </tr>
  );
}
