/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import "./course-detail.css";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  Play,
  Check,
  FileText,
  Presentation,
  Video,
  Plus,
  AlertTriangle,
  Clock,
  Calendar,
  MessageCircle,
  Map,
  Search,
  Download,
  ChevronUp,
  ChevronDown,
  Archive,
  Info,
  ClipboardCheck,
  HelpCircle,
  Calculator,
  LayoutList,
  List,
  Zap,
  Lightbulb,
  Star,
  X,
  Trophy,
  Award,
  Share2,
  Linkedin,
  Lock,
  QrCode,
  GraduationCap,
  Shield,
  BarChart3,
  FolderOpen,
} from "lucide-react";
import { ROUTES } from "@/constants";
import {
  getCourseDetail,
  getCourseDescription,
  getLearnItems,
  getPendingAssignments,
  getRecentMaterials,
  getSyllabusOverview,
  getStudyMaterialsModules,
  getAssignmentsTabData,
  getFeedbackInstructors,
  getCertificateTabData,
  getTranscriptTabData,
  instructorBio,
} from "./course-detail-data";
import type { StudyMaterialsModule } from "./course-detail-data";
import Image from "next/image";

type TabId = "overview" | "study-materials" | "assignments" | "certificate" | "transcript" | "feedback";

const TABS: { id: TabId; label: string; badge?: number }[] = [
  { id: "overview", label: "Overview" },
  { id: "study-materials", label: "Study Materials" },
  { id: "assignments", label: "Assignments", badge: 2 },
  { id: "certificate", label: "Certificate" },
  { id: "transcript", label: "Transcript" },
  { id: "feedback", label: "Feedback" },
];

export default function StudentCourseOverviewPage() {
  const params = useParams();
  const courseId = typeof params.id === "string" ? params.id : "";
  const [tab, setTab] = useState<TabId>("overview");
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>("mod1");
  const [studyMaterialsSearch, setStudyMaterialsSearch] = useState("");
  const [feedbackSubmitModalOpen, setFeedbackSubmitModalOpen] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [academySupport, setAcademySupport] = useState(8);
  const [academyLms, setAcademyLms] = useState(9);
  const [academyStrengths, setAcademyStrengths] = useState("");
  const [academyImprovement, setAcademyImprovement] = useState("");
  const [curriculumRelevance, setCurriculumRelevance] = useState<"High" | "Medium" | "Low">("High");
  const [courseDifficulty, setCourseDifficulty] = useState<"Easy" | "Balanced" | "Intense">("Balanced");
  const [courseMaterialQuality, setCourseMaterialQuality] = useState(7);
  const [contentStrengths, setContentStrengths] = useState("");
  const [syllabusSuggestions, setSyllabusSuggestions] = useState("");
  const [instructor1Stars, setInstructor1Stars] = useState(5);
  const [instructor1Engagement, setInstructor1Engagement] = useState("Very Active");
  const [instructor1Clarity, setInstructor1Clarity] = useState("Clear");
  const [instructor1Availability, setInstructor1Availability] = useState("Responsive");
  const [instructor1Strengths, setInstructor1Strengths] = useState("");
  const [instructor1Improve, setInstructor1Improve] = useState("");
  const [instructor2Stars, setInstructor2Stars] = useState(0);
  const [instructor2Engagement, setInstructor2Engagement] = useState("");
  const [instructor2Clarity, setInstructor2Clarity] = useState("");
  const [instructor2Availability, setInstructor2Availability] = useState("");
  const [instructor2Strengths, setInstructor2Strengths] = useState("");
  const [instructor2Improve, setInstructor2Improve] = useState("");

  const course = getCourseDetail(courseId);
  const description = getCourseDescription(courseId);
  const learnItems = getLearnItems(courseId);
  const assignments = getPendingAssignments(courseId);
  const materials = getRecentMaterials(courseId);
  const syllabus = getSyllabusOverview(courseId);
  const studyModules = getStudyMaterialsModules(courseId);
  const assignmentsTab = getAssignmentsTabData(courseId);
  const feedbackInstructors = getFeedbackInstructors(courseId);
  const certificateTab = getCertificateTabData(courseId);
  const transcriptTab = getTranscriptTabData(courseId);
  const feedbackSectionsCompleted = [
    true,
    true,
    instructor1Stars > 0 && instructor2Stars > 0,
  ].filter(Boolean).length;
  const feedbackPercent = Math.round((feedbackSectionsCompleted / 3) * 100);
  const searchLower = studyMaterialsSearch.trim().toLowerCase();
  const filteredStudyModules: StudyMaterialsModule[] = searchLower
    ? studyModules
        .map((mod) => {
          const titleMatches = mod.title.toLowerCase().includes(searchLower);
          const resources = titleMatches
            ? mod.resources
            : mod.resources.filter((r) => r.title.toLowerCase().includes(searchLower));
          return { ...mod, resources };
        })
        .filter((mod) => mod.resources.length > 0)
    : studyModules;

  return (
    <div className="sc-course">
      {/* Breadcrumb */}
      <nav className="sc-breadcrumb" aria-label="Breadcrumb">
        <Link href={ROUTES.STUDENT.DASHBOARD}>Dashboard</Link>
        <span className="sc-breadcrumb-sep">›</span>
        <Link href={ROUTES.STUDENT.COURSES}>Courses</Link>
        <span className="sc-breadcrumb-sep">›</span>
        <span className="sc-breadcrumb-current">{course.title}</span>
      </nav>

      {/* Course header */}
      <div className="sc-header">
        <div className="sc-header-inner">
          <div className="sc-header-thumb" aria-hidden>
            {course.imageUrl ? (
              <Image width={100} height={100} src={course.imageUrl} alt="" className="sc-course-img" />
            ) : (
              <div className="sc-course-img-placeholder" />
            )}
          </div>
          <div className="sc-header-content">
            <div className="sc-header-top">
              <span className="sc-category-pill">{course.category}</span>
              <span className="sc-meta-dot">•</span>
              <span className="sc-meta-enrolled">{course.studentsEnrolled} Students Enrolled</span>
            </div>
            <h1 className="sc-title">{course.title}</h1>
            <p className="sc-instructor">
              Instructor: {course.instructor} • {course.instructorDept}
            </p>
            <div className="sc-progress-row">
          <div className="sc-progress-block">
            <span className="sc-progress-label">Overall Completion</span>
            <div className="sc-progress-bar-wrap">
              <div
                className="sc-progress-bar-fill"
                style={{ width: `${course.completionPercent}%` }}
              />
            </div>
            <span className="sc-progress-pct">{course.completionPercent}%</span>
            <span className="sc-progress-lessons">
              {course.lessonsCompleted} of {course.lessonsTotal} lessons completed
            </span>
          </div>
          <div className="sc-header-right">
            <p className="sc-last-accessed">Last accessed: {course.lastAccessed}</p>
            <div className="sc-header-btns">
              <Link
                href={ROUTES.STUDENT.COURSE_ROADMAP(courseId)}
                className="sc-btn-roadmap"
              >
                <Map className="w-4 h-4" strokeWidth={2} />
                View Roadmap
              </Link>
              <Link
                href={ROUTES.STUDENT.COURSE_LESSON(courseId, "lesson-1")}
                className="sc-btn-continue"
              >
                <Play className="w-4 h-4" strokeWidth={2} fill="currentColor" />
                Continue Learning
              </Link>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sc-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`sc-tab ${tab === t.id ? "active" : ""}`}
          >
            {t.label}
            {t.badge != null && t.badge > 0 && (
              <span className="sc-tab-badge">{t.badge}</span>
            )}
          </button>
        ))}
      </div>

      {/* Main content: two columns when Overview */}
      {tab === "overview" && (
        <div className="sc-overview">
          <div className="sc-main">
            <section className="sc-card">
              <h2 className="sc-card-title">Course Description</h2>
              <p className="sc-description">{description}</p>
            </section>

            <section className="sc-card">
              <h2 className="sc-card-title">What you&apos;ll learn</h2>
              <ul className="sc-learn-list">
                {learnItems.map((item, i) => (
                  <li key={i} className="sc-learn-item">
                    <Check className="w-5 h-5 sc-learn-icon" strokeWidth={2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="sc-card">
              <div className="sc-card-head">
                <h2 className="sc-card-title">Pending Assignments</h2>
                <Link href={ROUTES.STUDENT.ASSIGNMENTS} className="sc-link-view-all">
                  View All
                </Link>
              </div>
              <ul className="sc-assignments-list">
                {assignments.map((a) => (
                  <li key={a.id} className="sc-assignment-item">
                    {a.status === "due" ? (
                      <AlertTriangle className="w-5 h-5 sc-assign-icon due" strokeWidth={2} />
                    ) : (
                      <Clock className="w-5 h-5 sc-assign-icon scheduled" strokeWidth={2} />
                    )}
                    <div className="sc-assign-body">
                      <p className="sc-assign-title">{a.title}</p>
                      <p className="sc-assign-due">{a.dueText}</p>
                    </div>
                    {a.action === "submit" ? (
                      <Link href={ROUTES.STUDENT.ASSIGNMENTS} className="sc-btn-submit">
                        Submit
                      </Link>
                    ) : (
                      <span className="sc-btn-locked">Locked</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section className="sc-card">
              <h2 className="sc-card-title">Recent Study Materials</h2>
              <div className="sc-materials-scroll">
                {materials.map((m) => (
                  <div key={m.id} className="sc-material-card">
                    {m.type === "PDF" && <FileText className="w-10 h-10 sc-mat-icon pdf" strokeWidth={2} />}
                    {m.type === "PPTX" && <Presentation className="w-10 h-10 sc-mat-icon pptx" strokeWidth={2} />}
                    {m.type === "MP4" && <Video className="w-10 h-10 sc-mat-icon mp4" strokeWidth={2} />}
                    <p className="sc-mat-size">{m.sizeOrDuration}</p>
                    <p className="sc-mat-title">{m.title}</p>
                    <p className="sc-mat-meta">{m.type} • {m.addedDate}</p>
                  </div>
                ))}
                <div className="sc-material-card sc-request-card">
                  <Plus className="w-10 h-10 sc-request-icon" strokeWidth={2} />
                  <p className="sc-request-title">Request Materials</p>
                  <p className="sc-request-desc">Can&apos;t find what you need? Ask the staff.</p>
                </div>
              </div>
            </section>
          </div>

          <aside className="sc-sidebar">
            <div className="sc-sidebar-card">
              <h3 className="sc-sidebar-title">Instructor Bio</h3>
              <div className="sc-instructor-block">
                <div className="sc-instructor-avatar" aria-hidden />
                <span className="sc-instructor-badge">INSTRUCTOR</span>
                <p className="sc-instructor-name">{instructorBio.name}</p>
                <p className="sc-instructor-role">{instructorBio.title}</p>
                <p className="sc-instructor-bio">{instructorBio.bio}</p>
                <button type="button" className="sc-btn-contact">
                  Contact Instructor
                </button>
              </div>
            </div>
            <div className="sc-sidebar-card">
              <h3 className="sc-sidebar-title">Syllabus Overview</h3>
              <ul className="sc-syllabus-list">
                {syllabus.map((mod) => (
                  <li key={mod.id} className="sc-syllabus-item">
                    {mod.status === "completed" && <Check className="w-5 h-5 sc-syllabus-icon done" strokeWidth={2} />}
                    {mod.status === "active" && <span className="sc-syllabus-dot active" />}
                    {mod.status === "upcoming" && <span className="sc-syllabus-dot" />}
                    <span className="sc-syllabus-text">{mod.title}</span>
                    <span className="sc-syllabus-week">{mod.weekLabel}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sc-sidebar-actions">
              <button type="button" className="sc-sidebar-btn">
                <Calendar className="w-5 h-5" strokeWidth={2} />
                Office Hours
              </button>
              <button type="button" className="sc-sidebar-btn">
                <MessageCircle className="w-5 h-5" strokeWidth={2} />
                Discussion
              </button>
            </div>
          </aside>
        </div>
      )}

      {tab === "study-materials" && (
        <div className="sc-other-tab sc-study-materials">
          <h2 className="sc-sm-title">Study Materials</h2>
          <p className="sc-sm-description">
            Access all resources, lecture slides, and video lessons for your course.
          </p>
          <div className="sc-sm-toolbar">
            <label className="sc-sm-search-wrap">
              <Search className="sc-sm-search-icon" aria-hidden />
              <input
                type="search"
                className="sc-sm-search"
                placeholder="Search resources, file names, or topics..."
                value={studyMaterialsSearch}
                onChange={(e) => setStudyMaterialsSearch(e.target.value)}
                aria-label="Search resources"
              />
            </label>
            <button type="button" className="sc-sm-download-all">
              <Download className="w-4 h-4" aria-hidden />
              Download All
            </button>
          </div>
          <div className="sc-sm-modules">
            {filteredStudyModules.map((mod) => {
              const isExpanded = expandedModuleId === mod.id;
              return (
                <div key={mod.id} className="sc-sm-module-card">
                  <button
                    type="button"
                    className="sc-sm-module-header"
                    onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                    aria-expanded={isExpanded}
                  >
                    <span className="sc-sm-module-badge">{mod.number}</span>
                    <div className="sc-sm-module-heading">
                      <span className="sc-sm-module-title">{mod.title}</span>
                      <span className="sc-sm-module-meta">
                        {mod.resources.length} resources • {mod.totalSize}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="sc-sm-module-chevron" aria-hidden />
                    ) : (
                      <ChevronDown className="sc-sm-module-chevron" aria-hidden />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="sc-sm-module-body">
                      {mod.resources.map((r) => (
                        <div key={r.id} className="sc-sm-resource-row">
                          <span className={`sc-sm-resource-icon sc-sm-resource-icon--${r.iconType}`} aria-hidden>
                            {r.iconType === "pptx" && <Presentation className="w-4 h-4" />}
                            {r.iconType === "pdf" && <FileText className="w-4 h-4" />}
                            {r.iconType === "video" && <Video className="w-4 h-4" />}
                            {r.iconType === "zip" && <Archive className="w-4 h-4" />}
                          </span>
                          <div className="sc-sm-resource-info">
                            <span className="sc-sm-resource-title">{r.title}</span>
                            <span className="sc-sm-resource-meta">
                              {r.typeLabel} • {r.sizeOrDuration}
                            </span>
                          </div>
                          {r.action === "play" ? (
                            <button type="button" className="sc-sm-resource-action" aria-label={`Play ${r.title}`}>
                              <Play className="w-4 h-4" />
                            </button>
                          ) : (
                            <button type="button" className="sc-sm-resource-action" aria-label={`Download ${r.title}`}>
                              <Download className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="sc-sm-office-hours">
            <Info className="sc-sm-office-hours-icon" aria-hidden />
            <div>
              <h3 className="sc-sm-office-hours-title">Weekly Office Hours</h3>
              <p className="sc-sm-office-hours-desc">
                Join live Q&A sessions with your instructor or watch recorded sessions at your convenience.
              </p>
              <a href="#" className="sc-sm-office-hours-link">
                View Recording Schedule →
              </a>
            </div>
          </div>
        </div>
      )}
      {tab === "assignments" && (
        <div className="sc-other-tab sc-assignments-tab">
          <div className="sc-at-cards">
            <div className="sc-at-card sc-at-progress">
              <ClipboardCheck className="sc-at-card-icon" aria-hidden />
              <h3 className="sc-at-card-title">Course Progress</h3>
              <p className="sc-at-progress-count">
                {assignmentsTab.progress.completed}/{assignmentsTab.progress.total} Completed
              </p>
              <div className="sc-at-progress-bar" role="progressbar" aria-valuenow={assignmentsTab.progress.percent} aria-valuemin={0} aria-valuemax={100}>
                <div className="sc-at-progress-fill" style={{ width: `${assignmentsTab.progress.percent}%` }} />
              </div>
              <p className="sc-at-progress-remaining">{assignmentsTab.progress.remaining} Remaining</p>
            </div>
            {assignmentsTab.nextDeadline && (
              <div className="sc-at-card sc-at-deadline">
                <Calendar className="sc-at-card-icon" aria-hidden />
                <span className="sc-at-deadline-badge">{assignmentsTab.nextDeadline.inDaysLabel}</span>
                <h3 className="sc-at-card-label">NEXT DEADLINE</h3>
                <p className="sc-at-deadline-date">{assignmentsTab.nextDeadline.date}</p>
                <p className="sc-at-deadline-assignment">
                  Assignment: <strong>{assignmentsTab.nextDeadline.assignmentTitle}</strong>
                </p>
                <Clock className="sc-at-deadline-bg-icon" aria-hidden />
              </div>
            )}
          </div>
          <section className="sc-at-section">
            <div className="sc-at-section-head">
              <h2 className="sc-at-section-title">Upcoming & Recent Assignments</h2>
              <div className="sc-at-section-actions">
              <button type="button" className="sc-at-icon-btn" aria-label="Sort or filter" title="Sort">
                <LayoutList className="w-4 h-4" />
              </button>
              <button type="button" className="sc-at-icon-btn" aria-label="View options" title="View">
                <List className="w-4 h-4" />
              </button>
              </div>
            </div>
            <div className="sc-at-table-wrap">
              <table className="sc-at-table">
                <thead>
                  <tr>
                    <th className="sc-at-th">ASSIGNMENT TITLE</th>
                    <th className="sc-at-th">DEADLINE</th>
                    <th className="sc-at-th">STATUS</th>
                    <th className="sc-at-th">GRADE</th>
                    <th className="sc-at-th">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {assignmentsTab.assignments.map((a) => (
                    <tr key={a.id} className={a.isNextDeadline ? "sc-at-row--next" : undefined}>
                      <td className="sc-at-td sc-at-td-title">
                        <span className="sc-at-assignment-title">{a.number}. {a.title}</span>
                        <a href="#" className="sc-at-rubric-link">
                          <FileText className="w-3.5 h-3.5" aria-hidden />
                          Grading Rubric
                        </a>
                      </td>
                      <td className="sc-at-td">{a.deadline}</td>
                      <td className="sc-at-td">
                        <span className={`sc-at-badge sc-at-badge--${a.status}`}>{a.status === "graded" ? "GRADED" : a.status === "submitted" ? "SUBMITTED" : "NOT STARTED"}</span>
                      </td>
                      <td className="sc-at-td">
                        {a.grade != null ? (
                          <span className="sc-at-grade">
                            {a.grade}
                            {a.gradeFeedback && <span className="sc-at-grade-feedback">{a.gradeFeedback}</span>}
                          </span>
                        ) : (
                          "--"
                        )}
                      </td>
                      <td className="sc-at-td">
                        {a.action === "open" && (
                          <Link href={ROUTES.STUDENT.ASSIGNMENTS} className="sc-at-btn sc-at-btn--primary">Open</Link>
                        )}
                        {a.action === "submit" && (
                          <button type="button" className="sc-at-btn sc-at-btn--primary">Submit</button>
                        )}
                        {a.action === "locked" && (
                          <span className="sc-at-btn sc-at-btn--locked">Locked</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <div className="sc-at-utility-cards">
            {assignmentsTab.utilityCards.map((card) => (
              <a key={card.id} href="#" className="sc-at-util-card">
                <span className={`sc-at-util-icon sc-at-util-icon--${card.icon}`}>
                  {card.icon === "help" && <HelpCircle className="w-5 h-5" />}
                  {card.icon === "calculator" && <Calculator className="w-5 h-5" />}
                  {card.icon === "forum" && <MessageCircle className="w-5 h-5" />}
                </span>
                <h3 className="sc-at-util-title">{card.title}</h3>
                <p className="sc-at-util-desc">{card.description}</p>
              </a>
            ))}
          </div>
        </div>
      )}
      {tab === "feedback" && (
        <div className="sc-other-tab sc-feedback-tab">
          {feedbackSubmitted ? (
            <div className="sc-fb-success">
              <Check className="sc-fb-success-icon" aria-hidden />
              <h2 className="sc-fb-success-title">Thank you for your feedback</h2>
              <p className="sc-fb-success-text">Your responses have been submitted and are anonymous.</p>
            </div>
          ) : (
            <>
              <div className="sc-fb-header">
                <div>
                  <h2 className="sc-fb-title">Feedback & Survey Hub</h2>
                  <p className="sc-fb-subtitle">Help us shape the future of your learning experience. Your honest feedback is anonymous and valuable.</p>
                </div>
                <div className="sc-fb-completion">
                  <span className="sc-fb-completion-value">{feedbackPercent}%</span>
                  <span className="sc-fb-completion-label">{feedbackSectionsCompleted} OF 3 SECTIONS COMPLETED</span>
                </div>
              </div>

              <section className="sc-fb-section">
                <div className="sc-fb-section-head">
                  <span className="sc-fb-section-num">1</span>
                  <h3 className="sc-fb-section-title">Academy Survey</h3>
                  <Check className="sc-fb-section-check" aria-hidden />
                </div>
                <div className="sc-fb-slider-group">
                  <label className="sc-fb-label">
                    How would you rate the Student Support Services?
                    <div className="sc-fb-slider-row">
                      <input type="range" min={0} max={10} value={academySupport} onChange={(e) => setAcademySupport(Number(e.target.value))} className="sc-fb-range" />
                      <span className="sc-fb-range-value">{academySupport}/10</span>
                    </div>
                    <div className="sc-fb-range-labels">
                      <span>POOR</span>
                      <span>EXCEPTIONAL</span>
                    </div>
                  </label>
                  <label className="sc-fb-label">
                    Usability and accessibility of the Learning Management System (LMS)?
                    <div className="sc-fb-slider-row">
                      <input type="range" min={0} max={10} value={academyLms} onChange={(e) => setAcademyLms(Number(e.target.value))} className="sc-fb-range" />
                      <span className="sc-fb-range-value">{academyLms}/10</span>
                    </div>
                    <div className="sc-fb-range-labels">
                      <span>DIFFICULT</span>
                      <span>VERY INTUITIVE</span>
                    </div>
                  </label>
                </div>
                <div className="sc-fb-textareas">
                  <label className="sc-fb-textarea-wrap">
                    <span className="sc-fb-textarea-label">Institutional Strengths</span>
                    <textarea className="sc-fb-textarea" placeholder="What did we do well?" value={academyStrengths} onChange={(e) => setAcademyStrengths(e.target.value)} rows={3} />
                  </label>
                  <label className="sc-fb-textarea-wrap">
                    <span className="sc-fb-textarea-label">Areas for Improvement</span>
                    <textarea className="sc-fb-textarea" placeholder="What can we do better?" value={academyImprovement} onChange={(e) => setAcademyImprovement(e.target.value)} rows={3} />
                  </label>
                </div>
              </section>

              <section className="sc-fb-section">
                <div className="sc-fb-section-head">
                  <span className="sc-fb-section-num">2</span>
                  <h3 className="sc-fb-section-title">Course: {course.title}</h3>
                  <Check className="sc-fb-section-check" aria-hidden />
                </div>
                <div className="sc-fb-radio-group">
                  <span className="sc-fb-radio-label">Curriculum Relevance</span>
                  <div className="sc-fb-radio-btns">
                    {(["High", "Medium", "Low"] as const).map((opt) => (
                      <button type="button" key={opt} className={`sc-fb-radio-btn ${curriculumRelevance === opt ? "sc-fb-radio-btn--on" : ""}`} onClick={() => setCurriculumRelevance(opt)}>{opt}</button>
                    ))}
                  </div>
                </div>
                <div className="sc-fb-radio-group">
                  <span className="sc-fb-radio-label">Course Difficulty Level</span>
                  <div className="sc-fb-radio-btns">
                    {(["Easy", "Balanced", "Intense"] as const).map((opt) => (
                      <button type="button" key={opt} className={`sc-fb-radio-btn ${courseDifficulty === opt ? "sc-fb-radio-btn--on" : ""}`} onClick={() => setCourseDifficulty(opt)}>{opt}</button>
                    ))}
                  </div>
                </div>
                <label className="sc-fb-label">
                  Course Material Quality (Slides, Labs, Handouts)
                  <div className="sc-fb-slider-row">
                    <input type="range" min={0} max={10} value={courseMaterialQuality} onChange={(e) => setCourseMaterialQuality(Number(e.target.value))} className="sc-fb-range" />
                    <span className="sc-fb-range-value">{courseMaterialQuality}/10</span>
                  </div>
                </label>
                <div className="sc-fb-textareas">
                  <label className="sc-fb-textarea-wrap">
                    <span className="sc-fb-textarea-label">Content Strengths</span>
                    <textarea className="sc-fb-textarea" placeholder="Specific topics you found most valuable..." value={contentStrengths} onChange={(e) => setContentStrengths(e.target.value)} rows={3} />
                  </label>
                  <label className="sc-fb-textarea-wrap">
                    <span className="sc-fb-textarea-label">Suggestions for Syllabus</span>
                    <textarea className="sc-fb-textarea" placeholder="Anything we should add or remove?" value={syllabusSuggestions} onChange={(e) => setSyllabusSuggestions(e.target.value)} rows={3} />
                  </label>
                </div>
              </section>

              <section className="sc-fb-section">
                <div className="sc-fb-section-head">
                  <span className="sc-fb-section-num">3</span>
                  <h3 className="sc-fb-section-title">Instructor Evaluation</h3>
                </div>
                {feedbackInstructors.map((inst, idx) => {
                  const isFirst = idx === 0;
                  const stars = isFirst ? instructor1Stars : instructor2Stars;
                  const setStars = isFirst ? setInstructor1Stars : setInstructor2Stars;
                  const unlocked = isFirst || stars > 0;
                  return (
                    <div key={inst.id} className="sc-fb-instructor">
                      <div className="sc-fb-instructor-head">
                        <div className="sc-fb-instructor-avatar" aria-hidden>
                          {inst.imageUrl ? <Image width={100} height={100} src={inst.imageUrl} alt="" /> : <span>{inst.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>}
                        </div>
                        <div className="sc-fb-instructor-info">
                          <span className="sc-fb-instructor-name">{inst.name}</span>
                          <span className="sc-fb-instructor-title">{inst.title}</span>
                        </div>
                      </div>
                      <div className="sc-fb-stars">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button type="button" key={n} className="sc-fb-star-btn" onClick={() => setStars(n)} aria-label={`${n} stars`}>
                            <Star className={`w-6 h-6 ${stars >= n ? "sc-fb-star-filled" : "sc-fb-star-empty"}`} fill={stars >= n ? "currentColor" : "none"} />
                          </button>
                        ))}
                      </div>
                      {isFirst && (
                        <div className="sc-fb-metrics">
                          <div className="sc-fb-metric"><Zap className="w-4 h-4" aria-hidden /> <span className="sc-fb-metric-label">STUDENT ENGAGEMENT</span> <span className="sc-fb-metric-value">{instructor1Engagement}</span></div>
                          <div className="sc-fb-metric"><Lightbulb className="w-4 h-4" aria-hidden /> <span className="sc-fb-metric-label">CONCEPT CLARITY</span> <span className="sc-fb-metric-value">{instructor1Clarity}</span></div>
                          <div className="sc-fb-metric"><MessageCircle className="w-4 h-4" aria-hidden /> <span className="sc-fb-metric-label">AVAILABILITY</span> <span className="sc-fb-metric-value">{instructor1Availability}</span></div>
                        </div>
                      )}
                      {!isFirst && stars === 0 && (
                        <p className="sc-fb-instructor-locked">Select a rating and answer basic metrics to unlock text fields for {inst.name}.</p>
                      )}
                      {!isFirst && stars > 0 && (
                        <div className="sc-fb-metrics">
                          <button type="button" className="sc-fb-metric-btn"><Plus className="w-4 h-4" /> Engagement</button>
                          <button type="button" className="sc-fb-metric-btn"><Plus className="w-4 h-4" /> Clarity</button>
                          <button type="button" className="sc-fb-metric-btn"><Plus className="w-4 h-4" /> Availability</button>
                        </div>
                      )}
                      {unlocked && (
                        <div className="sc-fb-textareas">
                          <label className="sc-fb-textarea-wrap">
                            <span className="sc-fb-textarea-label">STRENGTHS</span>
                            <textarea className="sc-fb-textarea" placeholder="e.g. Great examples" value={isFirst ? instructor1Strengths : instructor2Strengths} onChange={isFirst ? (e) => setInstructor1Strengths(e.target.value) : (e) => setInstructor2Strengths(e.target.value)} rows={2} />
                          </label>
                          <label className="sc-fb-textarea-wrap">
                            <span className="sc-fb-textarea-label">AREA TO IMPROVE</span>
                            <textarea className="sc-fb-textarea" placeholder="e.g. Speed of lecture" value={isFirst ? instructor1Improve : instructor2Improve} onChange={isFirst ? (e) => setInstructor1Improve(e.target.value) : (e) => setInstructor2Improve(e.target.value)} rows={2} />
                          </label>
                        </div>
                      )}
                    </div>
                  );
                })}
              </section>

              <div className="sc-fb-footer">
                <p className="sc-fb-footer-text">Ready to submit? Review your answers before finalizing. Once submitted, your feedback cannot be edited.</p>
                <div className="sc-fb-footer-actions">
                  <button type="button" className="sc-fb-btn sc-fb-btn-secondary">Save Draft</button>
                  <button type="button" className="sc-fb-btn sc-fb-btn-primary" onClick={() => setFeedbackSubmitModalOpen(true)}>
                    Submit Feedback <Play className="w-4 h-4" aria-hidden />
                  </button>
                </div>
              </div>
              <p className="sc-fb-copyright">© 2024 IMETS Education Portal • All responses are processed according to our Privacy Policy.</p>
            </>
          )}
        </div>
      )}

      {feedbackSubmitModalOpen && (
        <div className="sc-fb-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="sc-fb-modal-title">
          <div className="sc-fb-modal-backdrop" onClick={() => setFeedbackSubmitModalOpen(false)} aria-hidden />
          <div className="sc-fb-modal-dialog">
            <div className="sc-fb-modal-header">
              <h2 id="sc-fb-modal-title" className="sc-fb-modal-title">Submit feedback</h2>
              <button type="button" className="sc-fb-modal-close" onClick={() => setFeedbackSubmitModalOpen(false)} aria-label="Close"><X className="w-5 h-5" /></button>
            </div>
            <p className="sc-fb-modal-desc">Your responses will be submitted anonymously. You won’t be able to edit them after submission. Do you want to continue?</p>
            <div className="sc-fb-modal-actions">
              <button type="button" className="sc-fb-btn sc-fb-btn-secondary" onClick={() => setFeedbackSubmitModalOpen(false)}>Cancel</button>
              <button type="button" className="sc-fb-btn sc-fb-btn-primary" onClick={() => { setFeedbackSubmitted(true); setFeedbackSubmitModalOpen(false); }}>
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === "certificate" && (
        <div className="sc-other-tab sc-certificate-tab">
          {certificateTab.earned && certificateTab.earnedData ? (
            <>
              <div className="sc-cert-congrats">
                <div className="sc-cert-congrats-icon" aria-hidden>
                  <Trophy className="w-8 h-8" />
                </div>
                <h2 className="sc-cert-congrats-title">Congratulations, {certificateTab.recipientShortName}!</h2>
                <p className="sc-cert-congrats-desc">You&apos;ve successfully completed all requirements for this course. Your professional credential is now ready for download and sharing.</p>
              </div>
              <div className="sc-cert-card">
                <div className="sc-cert-card-star" aria-hidden>
                  <Award className="w-10 h-10" />
                </div>
                <h3 className="sc-cert-card-title">Certificate of Achievement</h3>
                <p className="sc-cert-card-subtitle">This is to certify that</p>
                <p className="sc-cert-card-name">{certificateTab.earnedData.recipientName}</p>
                <p className="sc-cert-card-text">has successfully fulfilled all academic requirements and passed the final assessment for the professional course</p>
                <p className="sc-cert-card-coursename">{course.title}</p>
                <div className="sc-cert-card-signatory">
                  <div>
                    <p className="sc-cert-signatory-name">{certificateTab.earnedData.signatoryName}</p>
                    <p className="sc-cert-signatory-title">{certificateTab.earnedData.signatoryTitle}</p>
                  </div>
                  <div>
                    <p className="sc-cert-signatory-name">{certificateTab.earnedData.issuanceDate}</p>
                    <p className="sc-cert-signatory-title">DATE OF ISSUANCE</p>
                  </div>
                </div>
              </div>
              <div className="sc-cert-actions">
                <button type="button" className="sc-cert-btn sc-cert-btn-primary">
                  <Download className="w-4 h-4" aria-hidden />
                  Download PDF (Print Ready)
                </button>
                <button type="button" className="sc-cert-btn sc-cert-btn-primary">
                  <Linkedin className="w-4 h-4" aria-hidden />
                  Add to LinkedIn Profile
                </button>
                <button type="button" className="sc-cert-btn sc-cert-btn-outline">
                  <Share2 className="w-4 h-4" aria-hidden />
                  Share Credential URL
                </button>
              </div>
              <div className="sc-cert-verification">
                <div className="sc-cert-verification-badge" aria-hidden>
                  <Award className="w-6 h-6" />
                </div>
                <div className="sc-cert-verification-content">
                  <span className="sc-cert-verification-badge-label">OFFICIAL AUTHENTICITY BADGE</span>
                  <h3 className="sc-cert-verification-title">Verification Info</h3>
                  <p className="sc-cert-verification-desc">This certificate is verified by IMETS Global Registry and represents formal academic achievement.</p>
                  <div className="sc-cert-verification-details">
                    <div>
                      <span className="sc-cert-detail-label">UNIQUE CERTIFICATE ID</span>
                      <span className="sc-cert-detail-value">{certificateTab.earnedData.certificateId}</span>
                    </div>
                    <div>
                      <span className="sc-cert-detail-label">ISSUANCE DATE</span>
                      <span className="sc-cert-detail-value">{certificateTab.earnedData.issuanceDate}</span>
                    </div>
                  </div>
                </div>
                <div className="sc-cert-verification-qr" aria-hidden>
                  <QrCode className="w-8 h-8" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="sc-cert-almost">
                <h2 className="sc-cert-almost-title">You&apos;re almost there!</h2>
                <p className="sc-cert-almost-desc">Complete the remaining modules to unlock your official professional certificate.</p>
                <div className="sc-cert-almost-progress-wrap">
                  <div className="sc-cert-progress-bar" role="progressbar" aria-valuenow={certificateTab.progressData?.progressPercent ?? 0} aria-valuemin={0} aria-valuemax={100}>
                    <div className="sc-cert-progress-fill" style={{ width: `${certificateTab.progressData?.progressPercent ?? 0}%` }} />
                  </div>
                  <span className="sc-cert-progress-label">{certificateTab.progressData?.progressPercent ?? 0}% COURSE PROGRESS</span>
                </div>
                <div className="sc-cert-requirements">
                  {certificateTab.progressData?.requirements.map((req) => (
                    <div key={req.id} className={`sc-cert-req sc-cert-req--${req.status}`}>
                      {req.status === "completed" && <Check className="w-5 h-5" aria-hidden />}
                      {req.status === "under_review" && <Trophy className="w-5 h-5" aria-hidden />}
                      {req.status === "pending" && <Lock className="w-5 h-5" aria-hidden />}
                      <span className="sc-cert-req-label">{req.label}</span>
                      <span className="sc-cert-req-status">{req.status === "completed" ? "COMPLETED" : req.status === "under_review" ? "UNDER REVIEW" : "PENDING"}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="sc-cert-locked">
                <Lock className="sc-cert-locked-icon" aria-hidden />
                <h3 className="sc-cert-locked-title">Certificate Locked</h3>
                <p className="sc-cert-locked-desc">Complete all course requirements and pass the final exam to unlock your official credential.</p>
              </div>
            </>
          )}
        </div>
      )}

      {tab === "transcript" && (
        <div className="sc-other-tab sc-transcript-tab">
          <h2 className="sc-tr-title">Academic Transcript</h2>
          <p className="sc-tr-subtitle">
            <GraduationCap className="sc-tr-subtitle-icon" aria-hidden />
            {transcriptTab.subtitle}
          </p>
          <div className="sc-tr-cards">
            <div className="sc-tr-card">
              <Shield className="sc-tr-card-icon" aria-hidden />
              <span className="sc-tr-card-label">OVERALL COURSE GRADE</span>
              <span className="sc-tr-card-value">{transcriptTab.overallGradeLabel}</span>
              <div className="sc-tr-card-bar" role="progressbar" aria-valuenow={transcriptTab.overallGradePercent} aria-valuemin={0} aria-valuemax={100}>
                <div className="sc-tr-card-bar-fill" style={{ width: `${transcriptTab.overallGradePercent}%` }} />
              </div>
            </div>
            <div className="sc-tr-card">
              <BarChart3 className="sc-tr-card-icon" aria-hidden />
              <span className="sc-tr-card-label">CUMULATIVE GPA</span>
              <span className="sc-tr-card-value">{transcriptTab.gpa}</span>
              <span className="sc-tr-card-meta">{transcriptTab.gpaSubtitle}</span>
            </div>
            <div className="sc-tr-card">
              <FileText className="sc-tr-card-icon" aria-hidden />
              <span className="sc-tr-card-label">TOTAL CREDITS EARNED</span>
              <span className="sc-tr-card-value">{transcriptTab.creditsEarned} / {transcriptTab.creditsTotal}</span>
              <span className={`sc-tr-card-meta ${transcriptTab.creditsStatusFulfilled ? "sc-tr-card-meta--success" : ""}`}>{transcriptTab.creditsStatus}</span>
            </div>
          </div>
          <section className="sc-tr-section">
            <h3 className="sc-tr-section-title">Assessment Record</h3>
            <div className="sc-tr-table-wrap">
              <table className="sc-tr-table">
                <thead>
                  <tr>
                    <th className="sc-tr-th">ASSESSMENT NAME</th>
                    <th className="sc-tr-th">TYPE</th>
                    <th className="sc-tr-th">WEIGHTING %</th>
                    <th className="sc-tr-th">SCORE (%)</th>
                    <th className="sc-tr-th">LETTER GRADE</th>
                    <th className="sc-tr-th">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {transcriptTab.assessments.map((row) => (
                    <tr key={row.id} className="sc-tr-row">
                      <td className="sc-tr-td sc-tr-td-name">{row.name}</td>
                      <td className="sc-tr-td">
                        <span className="sc-tr-type">
                          {row.type === "project" && <FolderOpen className="w-4 h-4" aria-hidden />}
                          {row.type === "quiz" && <HelpCircle className="w-4 h-4" aria-hidden />}
                          {row.type === "module" && <Check className="w-4 h-4" aria-hidden />}
                          {row.type === "final_exam" && <FileText className="w-4 h-4" aria-hidden />}
                          {row.type === "project" && "Project"}
                          {row.type === "quiz" && "Quiz"}
                          {row.type === "module" && "Module"}
                          {row.type === "final_exam" && "Final Exam"}
                        </span>
                      </td>
                      <td className="sc-tr-td">{row.weighting}</td>
                      <td className="sc-tr-td">{row.score ?? "—"}</td>
                      <td className="sc-tr-td"><span className="sc-tr-letter">{row.letterGrade}</span></td>
                      <td className="sc-tr-td">
                        <span className={`sc-tr-status sc-tr-status--${row.status}`}>{row.status === "completed" ? "Completed" : "Exempt"}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <div className="sc-tr-validation">
            <div className="sc-tr-validation-content">
              <h3 className="sc-tr-validation-title">Official Academic Validation</h3>
              <p className="sc-tr-validation-desc">{transcriptTab.validationDescription}</p>
              <p className="sc-tr-validation-verified">
                <Check className="w-5 h-5" aria-hidden />
                DIGITALLY VERIFIED: {transcriptTab.verificationDate}
              </p>
            </div>
            <div className="sc-tr-registrar">
              <div className="sc-tr-registrar-seal" aria-hidden />
              <p className="sc-tr-registrar-name">{transcriptTab.registrarName}</p>
              <p className="sc-tr-registrar-title">{transcriptTab.registrarTitle}</p>
              <span className="sc-tr-registrar-badge">OFFICIAL ACADEMY SEAL - IMETS -</span>
            </div>
          </div>
          <div className="sc-tr-actions">
            <button type="button" className="sc-tr-btn sc-tr-btn-outline">
              <Share2 className="w-4 h-4" aria-hidden />
              Share Secure Transcript Link
            </button>
            <button type="button" className="sc-tr-btn sc-tr-btn-primary">
              <Download className="w-4 h-4" aria-hidden />
              Download Official PDF
            </button>
          </div>
          <p className="sc-tr-footer">© 2024 International Military Education & Training System (IMETS). All rights reserved. Security Level: Restricted.</p>
        </div>
      )}

      {tab !== "overview" && tab !== "study-materials" && tab !== "assignments" && tab !== "feedback" && tab !== "certificate" && tab !== "transcript" && (
        <div className="sc-other-tab">
          <p className="sc-other-tab-text" />
        </div>
      )}
    </div>
  );
}
