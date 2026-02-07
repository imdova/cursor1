"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  Search,
  UserSearch,
  CalendarIcon,
  X,
  Info,
} from "lucide-react";
import { ROUTES } from "@/constants";
import "./add-group-form.css";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const MOCK_INSTRUCTOR = {
  id: "1",
  name: "Dr. Sarah Chen",
  title: "Senior Tech Lead",
  avatar: null,
};

export default function AddNewGroupPage() {
  const [groupName, setGroupName] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [courseName, setCourseName] = useState("");
  const [studyMode, setStudyMode] = useState("Online - Asynchronous");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [studyDays, setStudyDays] = useState<(typeof DAYS)[number][]>([
    "Mon",
    "Wed",
    "Fri",
  ]);
  const [instructorSearch, setInstructorSearch] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState<
    typeof MOCK_INSTRUCTOR | null
  >(MOCK_INSTRUCTOR);

  const toggleDay = (day: (typeof DAYS)[number]) => {
    setStudyDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="agn-page">
      {/* Breadcrumb */}
      <div className="agn-breadcrumb">
        <nav className="agn-breadcrumb-nav">
          <Link href={ROUTES.ADMIN.DASHBOARD}>Dashboard</Link>
          <span className="agn-breadcrumb-sep">&gt;</span>
          <Link href={ROUTES.ADMIN.GROUPS}>Groups</Link>
          <span className="agn-breadcrumb-sep">&gt;</span>
          <span className="agn-breadcrumb-current">Add New Group</span>
        </nav>
      </div>

      <div className="agn-main">
        <header className="agn-header">
          <h1 className="agn-title">Add New Group</h1>
          <p className="agn-subtitle">
            Establish a new study cohort with precise scheduling and instructor
            assignment.
          </p>
        </header>

        <form
          className="agn-form"
          onSubmit={(e) => e.preventDefault()}
          noValidate
        >
          {/* Group Identity */}
          <section className="agn-card">
            <h2 className="agn-card-title">
              <Briefcase className="agn-card-icon" strokeWidth={2} />
              Group Identity
            </h2>
            <div className="agn-card-fields agn-grid-2">
              <div className="agn-field">
                <label className="agn-label" htmlFor="group-name">
                  Group Name / Code
                </label>
                <input
                  id="group-name"
                  type="text"
                  className="agn-input"
                  placeholder="e.g. CS-2024-A"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
              <div className="agn-field">
                <label className="agn-label" htmlFor="max-capacity">
                  Max Student Capacity
                </label>
                <input
                  id="max-capacity"
                  type="text"
                  className="agn-input"
                  placeholder="e.g. 30"
                  value={maxCapacity}
                  onChange={(e) => setMaxCapacity(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Course Association */}
          <section className="agn-card">
            <h2 className="agn-card-title">
              <GraduationCap className="agn-card-icon" strokeWidth={2} />
              Course Association
            </h2>
            <div className="agn-card-fields agn-grid-2x2">
              <div className="agn-field">
                <label className="agn-label" htmlFor="course-category">
                  Course Category
                </label>
                <select
                  id="course-category"
                  className="agn-select"
                  value={courseCategory}
                  onChange={(e) => setCourseCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="tech">Technology</option>
                  <option value="management">Management</option>
                  <option value="business">Business</option>
                </select>
              </div>
              <div className="agn-field">
                <label className="agn-label" htmlFor="sub-category">
                  Sub-Category
                </label>
                <select
                  id="sub-category"
                  className="agn-select"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                >
                  <option value="">Select Sub-Category</option>
                  <option value="programming">Programming</option>
                  <option value="data">Data Science</option>
                </select>
              </div>
              <div className="agn-field">
                <label className="agn-label" htmlFor="course-name">
                  Course Name
                </label>
                <select
                  id="course-name"
                  className="agn-select"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                >
                  <option value="">Select Course</option>
                  <option value="cs101">Computer Science Fundamentals</option>
                  <option value="mba">MBA Core</option>
                </select>
              </div>
              <div className="agn-field">
                <label className="agn-label" htmlFor="study-mode">
                  Study Mode
                </label>
                <select
                  id="study-mode"
                  className="agn-select"
                  value={studyMode}
                  onChange={(e) => setStudyMode(e.target.value)}
                >
                  <option value="Online - Asynchronous">
                    Online - Asynchronous
                  </option>
                  <option value="Online - Synchronous">
                    Online - Synchronous
                  </option>
                  <option value="On-Campus">On-Campus</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>
          </section>

          {/* Timeline & Schedule */}
          <section className="agn-card">
            <h2 className="agn-card-title">
              <Calendar className="agn-card-icon" strokeWidth={2} />
              Timeline & Schedule
            </h2>
            <div className="agn-card-fields">
              <div className="agn-grid-2 agn-mb">
                <div className="agn-field">
                  <label className="agn-label" htmlFor="start-date">
                    Start Date
                  </label>
                  <div className="agn-input-wrap">
                    <input
                      id="start-date"
                      type="text"
                      className="agn-input agn-input-with-icon"
                      placeholder="mm/dd/yyyy"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <CalendarIcon
                      className="agn-input-icon"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </div>
                </div>
                <div className="agn-field">
                  <label className="agn-label" htmlFor="end-date">
                    End Date
                  </label>
                  <div className="agn-input-wrap">
                    <input
                      id="end-date"
                      type="text"
                      className="agn-input agn-input-with-icon"
                      placeholder="mm/dd/yyyy"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                    <CalendarIcon
                      className="agn-input-icon"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
              <div className="agn-field">
                <label className="agn-label agn-label-below">
                  Select Study Days
                </label>
                <div className="agn-day-pills">
                  {DAYS.map((day) => (
                    <button
                      key={day}
                      type="button"
                      className={`agn-day-pill ${
                        studyDays.includes(day) ? "agn-day-pill-active" : ""
                      }`}
                      onClick={() => toggleDay(day)}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Assign Primary Instructor */}
          <section className="agn-card">
            <h2 className="agn-card-title">
              <UserSearch className="agn-card-icon" strokeWidth={2} />
              Assign Primary Instructor
            </h2>
            <div className="agn-card-fields">
              <div className="agn-field">
                <div className="agn-search-wrap">
                  <Search
                    className="agn-search-icon"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <input
                    type="text"
                    className="agn-input agn-search-input"
                    placeholder="Search by name, ID or specialty..."
                    value={instructorSearch}
                    onChange={(e) => setInstructorSearch(e.target.value)}
                  />
                </div>
              </div>
              {selectedInstructor && (
                <div className="agn-instructor-chip">
                  <div className="agn-chip-avatar" aria-hidden>
                    {selectedInstructor.name
                      .split(" ")
                      .map((s) => s[0])
                      .join("")}
                  </div>
                  <div className="agn-chip-info">
                    <span className="agn-chip-name">
                      {selectedInstructor.name}
                    </span>
                    <span className="agn-chip-title">
                      {selectedInstructor.title}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="agn-chip-remove"
                    onClick={() => setSelectedInstructor(null)}
                    aria-label="Remove instructor"
                  >
                    <X className="w-4 h-4" strokeWidth={2} />
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Actions */}
          <div className="agn-actions">
            <Link href={ROUTES.ADMIN.GROUPS} className="agn-btn-cancel">
              Cancel
            </Link>
            <button type="submit" className="agn-btn-create">
              Create Group
            </button>
          </div>
        </form>

        {/* Pro-tip */}
        <div className="agn-protip">
          <Info className="agn-protip-icon" strokeWidth={2} aria-hidden />
          <div>
            <p className="agn-protip-title">Administrative Pro-tip</p>
            <p className="agn-protip-text">
              Once a group is created, student invitations can be sent
              automatically via the &quot;Students&quot; tab. Ensure the
              capacity aligns with the assigned classroom resources if using
              &quot;On-Campus&quot; mode.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
