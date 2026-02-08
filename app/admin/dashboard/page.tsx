"use client";

import { useState } from "react";
import {
  Search,
  Bell,
  Settings,
  Lightbulb,
  Calendar,
  Play,
  Users,
  Filter,
  Star,
  User,
  Target,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import "./dashboard.css";
import {
  dashboardTitle,
  kpiCards,
  lmsCoursesCard,
  studyGroupsBatches,
  leadsOverviewCard,
  topSalesAgents,
  facultyCard,
  platformUpdateCard,
  aiInsightsAlerts,
  aiInsightsRecommendation,
  aiInsightsBenchmarks,
} from "./dashboard-data";

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const donutData = [
    { name: "Completed", value: lmsCoursesCard.completionPercent, color: "#2563eb" },
    { name: "Remaining", value: 100 - lmsCoursesCard.completionPercent, color: "#e5e7eb" },
  ];

  const satisfactionData = facultyCard.satisfactionScores.map((v, i) => ({
    day: `D${i + 1}`,
    score: v,
  }));

  return (
    <div className="dashboard-hub-wrap">
      <div className="dashboard-hub-main">
        {/* Top header */}
        <header className="dashboard-hub-header">
          <div className="dashboard-hub-search relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search students, courses or financial recor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="dashboard-hub-header-actions">
            <button type="button" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg" aria-label="Notifications">
              <Bell className="w-5 h-5" />
            </button>
            <button type="button" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg" aria-label="Settings">
              <Settings className="w-5 h-5" />
            </button>
            <div className="dashboard-hub-profile">
              <span className="hidden sm:inline text-sm text-gray-700">Alex Richards, Master Admin</span>
              <div className="dashboard-hub-profile-avatar">AR</div>
            </div>
          </div>
        </header>

        {/* Title row */}
        <div className="dashboard-hub-title-row">
          <div>
            <h1>{dashboardTitle.main}</h1>
            <p className="subtitle">{dashboardTitle.subtitle}</p>
          </div>
          <div className="dashboard-hub-title-actions">
            <div className="dashboard-hub-date-card">
              <Calendar className="w-4 h-4 text-gray-500" />
              {dashboardTitle.selectedDate}
            </div>
            <button type="button" className="dashboard-hub-export-btn">
              Export Report
            </button>
          </div>
        </div>

        {/* KPI row */}
        <div className="dashboard-hub-kpi-grid">
          {kpiCards.map((kpi) => (
            <div key={kpi.key} className="dashboard-hub-kpi-card">
              <div className="kpi-value">{kpi.value}</div>
              {kpi.change && (
                <div className={`kpi-change ${kpi.changeColor === "green" ? "green" : "blue"}`}>
                  {kpi.change}
                </div>
              )}
              {kpi.status && <span className="kpi-status">{kpi.status}</span>}
              {kpi.subtitle && <div className="kpi-subtitle">{kpi.subtitle}</div>}
              {kpi.progress && (
                <div className="kpi-progress">
                  <div className="kpi-progress-fill" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Middle row: LMS Courses | Study Groups | Leads Overview */}
        <div className="dashboard-hub-grid-3">
          <div className="dashboard-hub-card">
            <div className="dashboard-hub-card-title">
              LMS Courses
              <Play className="w-5 h-5 text-gray-400" />
            </div>
            <div className="dashboard-hub-lms-inner">
              <div className="dashboard-hub-lms-donut-wrap">
                <div style={{ width: 120, height: 120 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={36}
                        outerRadius={50}
                        paddingAngle={0}
                        dataKey="value"
                      >
                        {donutData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={() => null} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <span className="dashboard-hub-lms-donut-center">{lmsCoursesCard.completionPercent}%</span>
              </div>
              <div className="dashboard-hub-lms-stats">
                <div>Active Courses <strong>{lmsCoursesCard.activeCourses}</strong></div>
                <div>Draft / Pending <strong>{lmsCoursesCard.draftPending}</strong></div>
              </div>
            </div>
            <div className="dashboard-hub-lms-label">{lmsCoursesCard.label}</div>
          </div>

          <div className="dashboard-hub-card">
            <div className="dashboard-hub-card-title">
              Study Groups
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <div className="dashboard-hub-batches-subtitle">UPCOMING BATCHES</div>
            {studyGroupsBatches.map((b) => (
              <div key={b.id} className="dashboard-hub-batch-item">
                <div className="dashboard-hub-batch-name">{b.name}</div>
                <span className="dashboard-hub-batch-count">{b.filled}/{b.total}</span>
                <div className="dashboard-hub-batch-bar">
                  <div
                    className="dashboard-hub-batch-bar-fill"
                    style={{ width: `${(b.filled / b.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-hub-card">
            <div className="dashboard-hub-card-title">
              Leads Overview
              <Filter className="w-5 h-5 text-gray-400" />
            </div>
            <div className="dashboard-hub-leads-metrics">
              <div>
                <div className="dashboard-hub-leads-metric">PIPELINE VOLUME</div>
                <div className="dashboard-hub-leads-value">{leadsOverviewCard.pipelineVolume}</div>
                <div className="dashboard-hub-leads-sub">{leadsOverviewCard.pipelineChange}</div>
              </div>
              <div>
                <div className="dashboard-hub-leads-metric">RESPONSE TIME</div>
                <div className="dashboard-hub-leads-value">{leadsOverviewCard.responseTime}</div>
                <div className="dashboard-hub-leads-sub">{leadsOverviewCard.responseLabel}</div>
              </div>
            </div>
            <div className="dashboard-hub-leads-agents">+{leadsOverviewCard.agentsActive} agents active now</div>
          </div>
        </div>

        {/* Bottom row: Top Sales Agents | Faculty & Instructors | Platform Update */}
        <div className="dashboard-hub-grid-3">
          <div className="dashboard-hub-card">
            <div className="dashboard-hub-card-title">
              Top Sales Agents
              <Star className="w-5 h-5 text-gray-400" />
            </div>
            <div className="dashboard-hub-agents-header">
              <span>AGENT</span>
              <span>CONV. RATE</span>
            </div>
            {topSalesAgents.map((a) => (
              <div key={a.id} className="dashboard-hub-agent-row">
                <span>
                  <span className="dashboard-hub-agent-avatar">{a.initials}</span>
                  {a.name}
                </span>
                <span className="dashboard-hub-agent-conv">{a.convRate}</span>
              </div>
            ))}
          </div>

          <div className="dashboard-hub-card">
            <div className="dashboard-hub-card-title">
              Faculty & Instructors
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <div className="dashboard-hub-faculty-stats">
              <div className="dashboard-hub-faculty-value">
                Active Instructors: <strong>{facultyCard.activeInstructors}</strong>
              </div>
              <div className="dashboard-hub-faculty-rating">
                RATING TREND: <span>★</span> {facultyCard.rating} <span className="change">({facultyCard.ratingChange})</span>
              </div>
            </div>
            <div style={{ height: 48 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={satisfactionData} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} hide />
                  <YAxis domain={[0, 5]} hide />
                  <Bar dataKey="score" fill="#2563eb" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="dashboard-hub-faculty-chart-label">{facultyCard.chartLabel}</div>
          </div>

          <div className="dashboard-hub-card dashboard-hub-platform-card">
            <div className="dashboard-hub-card-title">{platformUpdateCard.title}</div>
            <p>{platformUpdateCard.text}</p>
            <button type="button" className="read-more">{platformUpdateCard.cta}</button>
          </div>
        </div>
      </div>

      {/* Right sidebar - AI Insights */}
      <aside className="dashboard-hub-ai-sidebar">
        <div className="dashboard-hub-ai-title">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          AI Insights
        </div>

        <h3 className="dashboard-hub-ai-section-title">HIGH PRIORITY ALERTS</h3>
        {aiInsightsAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`dashboard-hub-ai-alert ${alert.type === "high" ? "critical" : "capacity"}`}
          >
            <span className={`dashboard-hub-ai-alert-label ${alert.type === "high" ? "action" : "capacity"}`}>
              {alert.label}
            </span>
            <div className="dashboard-hub-ai-alert-title">{alert.title}</div>
            <div className="dashboard-hub-ai-alert-desc">{alert.description}</div>
            <button type="button" className="dashboard-hub-ai-alert-btn">{alert.buttonLabel}</button>
          </div>
        ))}

        <h3 className="dashboard-hub-ai-section-title">SMART RECOMMENDATIONS</h3>
        <div className="dashboard-hub-ai-recommendation">
          <div className="dashboard-hub-ai-recommendation-type">
            <Target className="w-3.5 h-3.5" />
            {aiInsightsRecommendation.type}
          </div>
          <div className="dashboard-hub-ai-recommendation-title">{aiInsightsRecommendation.title}</div>
          <div className="dashboard-hub-ai-recommendation-desc">{aiInsightsRecommendation.description}</div>
          <div className="dashboard-hub-ai-recommendation-btns">
            <button type="button" className="primary">{aiInsightsRecommendation.primaryButton}</button>
            <button type="button" className="secondary">{aiInsightsRecommendation.secondaryButton}</button>
          </div>
        </div>

        <h3 className="dashboard-hub-ai-section-title">UPCOMING BENCHMARKS</h3>
        {aiInsightsBenchmarks.map((b) => (
          <div key={b.id} className="dashboard-hub-ai-benchmark">
            <span className={`dashboard-hub-ai-benchmark-dot ${b.active ? "active" : "inactive"}`} />
            <div className="dashboard-hub-ai-benchmark-inner">
              <span>{b.label}</span>
              <span className="dashboard-hub-ai-benchmark-date">{b.date}</span>
            </div>
          </div>
        ))}
      </aside>
    </div>
  );
}
