"use client";

import { useState } from "react";
import { adminStats, topCourses } from "@/lib/adminData";
import { ROUTES } from "@/constants";

type MaterialStatus = "PENDING UPDATE" | "UPDATED" | "OUTDATED";
type AlertType = "critical" | "warning" | "info" | "ok";

interface CourseHealthRow {
  id: string;
  courseName: string;
  instructor: string;
  attendance: number;
  materialStatus: MaterialStatus;
  alertType: AlertType;
}

const courseHealthData: CourseHealthRow[] = [
  {
    id: "1",
    courseName: "Mobile App Dev",
    instructor: "Dr. Sarah Chen",
    attendance: 62,
    materialStatus: "PENDING UPDATE",
    alertType: "critical",
  },
  {
    id: "2",
    courseName: "Organic Chemistry II",
    instructor: "Prof. Michael Ross",
    attendance: 74,
    materialStatus: "UPDATED",
    alertType: "warning",
  },
  {
    id: "3",
    courseName: "Introduction to Ethics",
    instructor: "Dr. Emma Watson",
    attendance: 45,
    materialStatus: "OUTDATED",
    alertType: "critical",
  },
  {
    id: "4",
    courseName: "Statistics for Biz",
    instructor: "Dr. Alan Turing",
    attendance: 92,
    materialStatus: "UPDATED",
    alertType: "ok",
  },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("Last 30 Days");

  const totalStudents = adminStats.allStudents;
  const totalCourses = adminStats.activeCourses;
  const avgCompletion = 88.4;
  const monthlyRevenue = Math.round(adminStats.totalSales / 1.65);

  const maxEnrollments = Math.max(...topCourses.map((c) => c.enrollments), 1);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-gray-900">
            Courses Analytics Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search data..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
            </div>
            <button
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
              aria-label="Notifications"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-admin-primary text-white rounded-lg text-sm font-medium hover:bg-admin-primary-hover transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Export Data
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Academic Overview */}
        <div className="mb-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Academic Overview</p>
              <h2 className="text-2xl font-bold text-gray-900">
                Academy Insights
              </h2>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {dateRange}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Total Active Courses
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {totalCourses}
                  </p>
                  <p className="text-sm text-emerald-600 mt-1 flex items-center gap-0.5">
                    <span>↑</span> +2.4%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Total Students
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {totalStudents.toLocaleString()}
                  </p>
                  <p className="text-sm text-emerald-600 mt-1 flex items-center gap-0.5">
                    <span>↑</span> +5.1%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-violet-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-violet-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Avg. Completion
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {avgCompletion}%
                  </p>
                  <p className="text-sm text-emerald-600 mt-1 flex items-center gap-0.5">
                    <span>↑</span> +1.2%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Monthly Revenue
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(monthlyRevenue)}
                  </p>
                  <p className="text-sm text-emerald-600 mt-1 flex items-center gap-0.5">
                    <span>↑</span> +8.3%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-emerald-600">$</span>
                </div>
              </div>
            </div>
          </div>

          {/* Course Popularity + Course Health Monitor */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Course Popularity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Course Popularity</h3>
                <button
                  className="p-1 text-gray-400 hover:text-gray-600"
                  aria-label="More options"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </button>
              </div>
              <ul className="space-y-4">
                {topCourses.slice(0, 5).map((course) => (
                  <li key={course.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900 truncate pr-2">
                        {course.title}
                      </span>
                      <span className="text-sm text-gray-600 flex-shrink-0">
                        {course.enrollments.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-admin-primary"
                        style={{
                          width: `${Math.min(
                            100,
                            (course.enrollments / maxEnrollments) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <a
                href={ROUTES.ADMIN.COURSES}
                className="inline-block mt-4 text-sm font-medium text-admin-primary hover:underline"
              >
                View All Programs
              </a>
            </div>

            {/* Course Health Monitor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900">
                    Course Health Monitor
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Courses requiring immediate attention
                  </p>
                </div>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                  FILTER ALERTS
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <th className="pb-3 pr-4">Course Name</th>
                      <th className="pb-3 pr-4">Instructor</th>
                      <th className="pb-3 pr-4">Attendance</th>
                      <th className="pb-3 pr-4">Material Status</th>
                      <th className="pb-3">Alert</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseHealthData.map((row) => (
                      <tr
                        key={row.id}
                        className="border-b border-gray-100 hover:bg-gray-50/50"
                      >
                        <td className="py-3 pr-4 font-medium text-gray-900">
                          {row.courseName}
                        </td>
                        <td className="py-3 pr-4 text-gray-600">
                          {row.instructor}
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-900">
                              {row.attendance}%
                            </span>
                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  row.attendance >= 80
                                    ? "bg-emerald-500"
                                    : row.attendance >= 60
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                                }`}
                                style={{ width: `${row.attendance}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <span
                            className={
                              row.materialStatus === "UPDATED"
                                ? "text-emerald-600"
                                : row.materialStatus === "PENDING UPDATE"
                                ? "text-amber-600"
                                : "text-red-600"
                            }
                          >
                            {row.materialStatus}
                          </span>
                        </td>
                        <td className="py-3">
                          {row.alertType === "critical" && (
                            <span className="text-red-500" title="Critical">
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" />
                              </svg>
                            </span>
                          )}
                          {row.alertType === "warning" && (
                            <span className="text-amber-500" title="Warning">
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                              </svg>
                            </span>
                          )}
                          {row.alertType === "ok" && (
                            <span className="text-emerald-500" title="OK">
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                              </svg>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <a
                href={ROUTES.ADMIN.COURSES}
                className="inline-block mt-4 text-sm text-gray-500 hover:text-gray-700"
              >
                View Entire Course List →
              </a>
            </div>
          </div>

          {/* Monthly Academic Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">
                  Monthly Academic Summary
                </h3>
                <p className="text-sm text-gray-600 mt-0.5">
                  Overall academic health is{" "}
                  <span className="font-semibold text-emerald-600">
                    OPTIMAL
                  </span>{" "}
                  based on 4 key metrics.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-admin-primary text-admin-primary rounded-lg text-sm font-medium hover:bg-admin-primary/10 transition-colors">
                View All Alerts
              </button>
              <button className="px-4 py-2 bg-admin-primary text-white rounded-lg text-sm font-medium hover:bg-admin-primary-hover transition-colors">
                Generate Full Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
