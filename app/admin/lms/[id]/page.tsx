"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useRef } from "react";
import { Inter } from "next/font/google";
import { ROUTES } from "@/constants";
import {
  getLMSCourseById,
  getLMSCourseDetail,
  assignedGroupsData,
  courseStudentsData,
  courseStudentsTotal,
  enrollableStudentsPool,
  allGroupsPool,
  studyMaterialsData,
  studyMaterialsTotal,
  studyMaterialsStorageUsed,
  studyMaterialsTotalViews,
  studyMaterialsTotalDownloads,
  feedbackSummary,
  ratingBreakdown,
  courseReviewsData,
  courseReviewsTotal,
  type AssignedGroupRow,
  type CourseStudentRow,
  type EnrollableStudent,
  type StudyMaterialRow,
  type StudyMaterialType,
  type CourseReviewRow,
} from "../lms-data";
import {
  ChevronRight,
  MoreVertical,
  Plus,
  Pencil,
  Calendar,
  Clock,
  Zap,
  MessageCircle,
  Play,
  Check,
  HelpCircle,
  ChevronDown,
  LayoutGrid,
  Download,
  AlertTriangle,
  Users,
  UsersRound,
  UserPlus,
  Search,
  X,
  Trash2,
  ArrowRightLeft,
  CloudUpload,
  Link as LinkIcon,
  FileText,
  FileSpreadsheet,
  Presentation,
  Eye,
  ExternalLink,
  SlidersHorizontal,
  Star,
  Flag,
} from "lucide-react";
import "./lms-course-details.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-lms-inter",
  display: "swap",
});

type TabId = "overview" | "assigned-groups" | "study-materials" | "students" | "feedback-review" | "analytics";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "assigned-groups", label: "Assigned Groups" },
  { id: "study-materials", label: "Study Materials" },
  { id: "students", label: "Students" },
  { id: "feedback-review", label: "Feedback & Review" },
  { id: "analytics", label: "Analytics" },
];

export default function LMSCourseDetailsPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const course = getLMSCourseById(id);
  const detail = getLMSCourseDetail(id);
  const [tab, setTab] = useState<TabId>("overview");
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>("m1");
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [enrollSearch, setEnrollSearch] = useState("");
  const [selectedEnrollIds, setSelectedEnrollIds] = useState<Set<string>>(new Set());

  const enrolledStudentIds = new Set(courseStudentsData.map((s) => s.studentId));
  const availableToEnroll = enrollableStudentsPool.filter(
    (s) => !enrolledStudentIds.has(s.studentId)
  );
  const enrollFiltered = enrollSearch.trim()
    ? availableToEnroll.filter(
        (s) =>
          s.name.toLowerCase().includes(enrollSearch.toLowerCase()) ||
          s.email.toLowerCase().includes(enrollSearch.toLowerCase()) ||
          s.studentId.toLowerCase().includes(enrollSearch.toLowerCase())
      )
    : availableToEnroll;

  const toggleEnrollSelection = (id: string) => {
    setSelectedEnrollIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openEnrollModal = () => {
    setEnrollSearch("");
    setSelectedEnrollIds(new Set());
    setEnrollModalOpen(true);
  };

  const closeEnrollModal = () => {
    setEnrollModalOpen(false);
    setEnrollSearch("");
    setSelectedEnrollIds(new Set());
  };

  const handleEnrollSelected = () => {
    // Placeholder: in a real app you would call an API to enroll selected students
    closeEnrollModal();
  };

  const [agFilterSearch, setAgFilterSearch] = useState("");
  const [agPage, setAgPage] = useState(1);
  const agPageSize = 4;
  const agFiltered = agFilterSearch.trim()
    ? assignedGroupsData.filter(
        (g) =>
          g.groupName.toLowerCase().includes(agFilterSearch.toLowerCase()) ||
          g.cohortId.includes(agFilterSearch)
      )
    : assignedGroupsData;
  const agTotal = agFiltered.length;
  const agPaginated = agFiltered.slice((agPage - 1) * agPageSize, agPage * agPageSize);
  const agTotalPages = Math.max(1, Math.ceil(agTotal / agPageSize));

  const [assignGroupModalOpen, setAssignGroupModalOpen] = useState(false);
  const [assignGroupSearch, setAssignGroupSearch] = useState("");
  const [selectedAssignGroupId, setSelectedAssignGroupId] = useState<string | null>(null);
  const assignedGroupIds = new Set(assignedGroupsData.map((g) => g.id));
  const assignGroupAvailable = allGroupsPool.filter((g) => !assignedGroupIds.has(g.id));
  const assignGroupFiltered = assignGroupSearch.trim()
    ? assignGroupAvailable.filter(
        (g) =>
          g.groupName.toLowerCase().includes(assignGroupSearch.toLowerCase()) ||
          g.cohortId.includes(assignGroupSearch)
      )
    : assignGroupAvailable;

  const openAssignGroupModal = () => {
    setAssignGroupSearch("");
    setSelectedAssignGroupId(null);
    setAssignGroupModalOpen(true);
  };

  const closeAssignGroupModal = () => {
    setAssignGroupModalOpen(false);
    setAssignGroupSearch("");
    setSelectedAssignGroupId(null);
  };

  const handleAssignGroup = () => {
    if (selectedAssignGroupId) {
      // Placeholder: in a real app you would call an API to assign the group to this course
      closeAssignGroupModal();
    }
  };

  const [localMaterials, setLocalMaterials] = useState<StudyMaterialRow[]>(studyMaterialsData);
  const [addMaterialModalOpen, setAddMaterialModalOpen] = useState(false);
  const [addMaterialTitle, setAddMaterialTitle] = useState("");
  const [addMaterialFile, setAddMaterialFile] = useState<File | null>(null);
  const addMaterialFileInputRef = useRef<HTMLInputElement>(null);

  const openAddMaterialModal = () => {
    setAddMaterialTitle("");
    setAddMaterialFile(null);
    setAddMaterialModalOpen(true);
  };

  const closeAddMaterialModal = () => {
    setAddMaterialModalOpen(false);
    setAddMaterialTitle("");
    setAddMaterialFile(null);
  };

  const getFileType = (name: string): StudyMaterialType => {
    const ext = name.split(".").pop()?.toLowerCase();
    if (ext === "pdf") return "pdf";
    if (ext === "pptx" || ext === "ppt") return "pptx";
    if (ext === "xlsx" || ext === "xls") return "xlsx";
    return "pdf";
  };

  const getFileTypeLabel = (type: StudyMaterialType): "PDF" | "DOCX" | "PPTX" | "XLSX" | "LINK" => {
    if (type === "pdf") return "PDF";
    if (type === "pptx") return "PPTX";
    if (type === "xlsx") return "XLSX";
    if (type === "url") return "LINK";
    return "PDF";
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatUploadDate = (): string => {
    const d = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  const handleAddMaterial = () => {
    const title = addMaterialTitle.trim();
    if (!title || !addMaterialFile) return;
    const type = getFileType(addMaterialFile.name);
    const ext = addMaterialFile.name.split(".").pop() ?? "";
    const displayName = title.includes(".") ? title : `${title}.${ext}`;
    const newRow: StudyMaterialRow = {
      id: `sm-${Date.now()}`,
      fileName: displayName,
      fileType: getFileTypeLabel(type),
      category: "LECTURE NOTES",
      size: formatFileSize(addMaterialFile.size),
      uploadDate: formatUploadDate(),
      targetGroup: "All Enrolled",
      type,
    };
    setLocalMaterials((prev) => [newRow, ...prev]);
    closeAddMaterialModal();
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] p-6 lms-detail">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-600 mb-4">Course not found.</p>
          <Link
            href={ROUTES.ADMIN.LMS_COURSES}
            className="text-[#2563eb] font-medium hover:underline"
          >
            ← Back to LMS Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-[#F8F9FA] lms-detail flex flex-col ${inter.variable}`}
      style={{ fontFamily: "var(--font-lms-inter), Inter, ui-sans-serif, system-ui, sans-serif" }}
    >
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex-shrink-0">
        <nav className="lms-breadcrumb flex items-center gap-2">
          <Link href={ROUTES.ADMIN.DASHBOARD}>Dashboard</Link>
          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <Link href={ROUTES.ADMIN.LMS_COURSES}>Courses</Link>
          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="lms-breadcrumb-current truncate max-w-[220px]">
            {course.courseName}
          </span>
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-flex-start gap-4 mb-6">
              <div className="flex gap-4 flex-wrap">
                <div className="lms-course-thumb bg-gray-200" aria-hidden />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="lms-tag-category">
                      {course.category.replace(/\s+/g, " ").toUpperCase()}
                    </span>
                    <span className="lms-tag-active">{course.status}</span>
                  </div>
                  <h1 className="lms-course-title">{course.courseName}</h1>
                  <div className="lms-course-meta">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-gray-400" strokeWidth={2} />
                      Created {detail.createdAt}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gray-400" strokeWidth={2} />
                      {detail.totalHours} Hours Total
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:ml-auto">
                <Link href={ROUTES.ADMIN.LMS_NEW} className="lms-btn-edit inline-flex items-center gap-2">
                  <Pencil className="w-4 h-4" strokeWidth={2} />
                  Edit Course
                </Link>
                <button type="button" className="p-2 rounded-lg text-gray-500 hover:bg-gray-100" aria-label="More">
                  <MoreVertical className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>
            </div>

            <div className="lms-tabs">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`lms-tab ${tab === t.id ? "lms-tab-active" : ""}`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {tab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="lms-metric-card">
                      <p className="lms-metric-value lms-metric-value-blue">{detail.totalEnrolled.toLocaleString()}</p>
                      <p className="lms-metric-label">Total Enrolled</p>
                    </div>
                    <div className="lms-metric-card">
                      <p className="lms-metric-value lms-metric-value-blue">{detail.avgProgress}%</p>
                      <p className="lms-metric-label">Avg. Progress</p>
                    </div>
                    <div className="lms-metric-card">
                      <p className="lms-metric-value lms-metric-value-blue">{detail.quizPassRate}%</p>
                      <p className="lms-metric-label">Quiz Pass Rate</p>
                    </div>
                    <div className="lms-metric-card">
                      <p className="lms-metric-value lms-metric-value-blue">{detail.rating}/5</p>
                      <p className="lms-metric-label">Rating</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <h2 className="lms-section-title">Course Description</h2>
                    {detail.descriptionParagraphs?.length ? (
                      detail.descriptionParagraphs.map((para, i) => (
                        <p key={i} className="lms-description">{para}</p>
                      ))
                    ) : (
                      <p className="lms-description">{detail.description}</p>
                    )}
                  </div>
                  <div className="lms-table-wrap">
                    <div className="lms-table-header">
                      <h2 className="lms-table-title">Recent Assigned Groups</h2>
                      <button type="button" className="lms-view-all">View All</button>
                    </div>
                    <table className="lms-table">
                      <thead>
                        <tr>
                          <th>Group Name</th>
                          <th>Students</th>
                          <th>Start Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detail.recentGroups.map((g) => (
                          <tr key={g.name}>
                            <td><a href="#" className="lms-group-link">{g.name}</a></td>
                            <td>{g.students} Students</td>
                            <td>{g.date}</td>
                            <td>
                              <span className={g.status === "Upcoming" ? "lms-badge-upcoming" : "lms-badge-progress"}>
                                {g.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                      <h2 className="lms-section-title mb-0">Study Materials Structure</h2>
                      <button type="button" className="lms-add-module-btn">
                        <Plus className="w-4 h-4" strokeWidth={2} /> Add Module
                      </button>
                    </div>
                    <div className="p-4">
                      {detail.modules.map((mod) => {
                        const isExpanded = expandedModuleId === mod.id;
                        return (
                          <div key={mod.id} className="mb-2">
                            <button
                              type="button"
                              className="lms-module-header w-full text-left"
                              onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                            >
                              <div className="lms-module-left">
                                <LayoutGrid className="w-5 h-5 text-gray-500 flex-shrink-0" strokeWidth={2} />
                                <span className="lms-module-num">{mod.id.replace("m", "M")}</span>
                                <span className="lms-module-title">{mod.title}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {mod.locked ? (
                                  <span className="lms-module-locked">{mod.locked}</span>
                                ) : (
                                  <span className="lms-module-meta">
                                    {mod.lessonsCount} Lessons • {mod.quizzesCount} Quizzes
                                  </span>
                                )}
                                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? "rotate-180" : ""}`} strokeWidth={2} />
                              </div>
                            </button>
                            {isExpanded && mod.items.length > 0 && (
                              <div className="lms-module-content bg-white">
                                {mod.items.map((item, i) => (
                                  <div key={i} className="lms-module-item">
                                    {item.type === "YouTube" && (
                                      <span className="lms-module-item-icon-video">
                                        <Play className="w-4 h-4" strokeWidth={2} fill="currentColor" />
                                      </span>
                                    )}
                                    {item.type === "VdoCipher" && (
                                      <span className="lms-module-item-icon-doc">
                                        <Check className="w-4 h-4" strokeWidth={2.5} />
                                      </span>
                                    )}
                                    {item.type === "Quiz" && (
                                      <span className="lms-module-item-icon-quiz">
                                        <HelpCircle className="w-4 h-4" strokeWidth={2} />
                                      </span>
                                    )}
                                    <div className="lms-module-item-text flex-1 min-w-0">
                                      <p className="lms-module-item-title">{item.title}</p>
                                      <p className="lms-module-item-meta-line">
                                        {item.type === "YouTube" && <><span className="lms-module-item-type-yt">YouTube</span><span className="lms-module-item-duration">{item.duration}</span></>}
                                        {item.type === "VdoCipher" && <><span className="lms-module-item-type-vdoc">VdoCipher</span><span className="lms-module-item-duration">{item.duration}</span></>}
                                        {item.type === "Quiz" && <span className="lms-module-item-meta">{item.meta}</span>}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="space-y-5">
                  <div className="lms-sidebar-card">
                    <p className="lms-sidebar-label">Instructor</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
                      <div>
                        <p className="lms-instructor-name">{course.instructor}</p>
                        <p className="lms-instructor-role">{detail.instructorTitle}</p>
                      </div>
                    </div>
                    <button type="button" className="lms-btn-contact inline-flex items-center justify-center gap-2">
                      <MessageCircle className="w-4 h-4" strokeWidth={2} /> Contact Instructor
                    </button>
                  </div>
                  <div className="lms-sidebar-card">
                    <p className="lms-sidebar-label">Course Meta</p>
                    <ul>
                      <li className="lms-meta-item">Format: <strong>{detail.format}</strong></li>
                      <li className="lms-meta-item">Difficulty: <strong>{detail.difficulty}</strong></li>
                      <li className="lms-meta-item">Language: <strong>{detail.language}</strong></li>
                      <li className="lms-meta-item">Quizzes: <strong>{detail.quizzesTotal} Total</strong></li>
                    </ul>
                  </div>
                  <div className="lms-sidebar-card">
                    <p className="lms-quick-insights-title"><Zap className="w-4 h-4" strokeWidth={2} /> Quick Insights</p>
                    <p className="lms-quick-insights-text">
                      {detail.quickInsight.split(/(up \d+%)/i).map((part, i) =>
                        part.match(/^up \d+%$/i) ? (
                          <span key={i} className="lms-quick-insights-highlight">{part}</span>
                        ) : (
                          part
                        )
                      )}
                    </p>
                    <div className="lms-progress-bar">
                      <div className="lms-progress-fill" style={{ width: `${Math.min(detail.quickInsightPercent, 100)}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === "assigned-groups" && (
              <div className="ag-section">
                <div className="ag-cards">
                  <div className="ag-card">
                    <div className="ag-card-icon">
                      <UsersRound className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <div className="ag-card-content">
                      <p className="ag-card-label">Total Groups Assigned</p>
                      <p className="ag-card-value">{assignedGroupsData.length}</p>
                    </div>
                  </div>
                  <div className="ag-card">
                    <div className="ag-card-icon">
                      <Users className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <div className="ag-card-content">
                      <p className="ag-card-label">Total Enrolled Students</p>
                      <p className="ag-card-value">{assignedGroupsData.reduce((s, g) => s + g.studentCount, 0).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="ag-toolbar">
                  <div className="ag-filter-wrap">
                    <Search className="ag-filter-icon" strokeWidth={1.5} aria-hidden />
                    <input
                      type="search"
                      className="ag-filter-input"
                      placeholder="Filter assigned groups..."
                      value={agFilterSearch}
                      onChange={(e) => { setAgFilterSearch(e.target.value); setAgPage(1); }}
                      aria-label="Filter assigned groups"
                    />
                  </div>
                  <button type="button" className="ag-btn-assign" onClick={openAssignGroupModal}>
                    <Plus className="w-4 h-4" strokeWidth={2} />
                    Assign New Group
                  </button>
                </div>
                <div className="ag-table-wrap">
                  <table className="ag-table">
                    <thead>
                      <tr>
                        <th>Group Name</th>
                        <th>Intake Period</th>
                        <th>Student Count</th>
                        <th>Average Progress</th>
                        <th>Status</th>
                        <th className="ag-th-action">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agPaginated.map((row: AssignedGroupRow) => (
                        <tr key={row.id}>
                          <td>
                            <a href="#" className="ag-group-name">{row.groupName}</a>
                            <span className="ag-cohort">Cohort #{row.cohortId}</span>
                          </td>
                          <td>{row.intakePeriod}</td>
                          <td>{row.studentCount} Students</td>
                          <td>
                            <span className="ag-progress-cell">
                              <span className="ag-progress-bar">
                                <span className={`ag-progress-fill ${row.status === "Completed" ? "completed" : ""}`} style={{ width: `${row.averageProgress}%` }} />
                              </span>
                              <span className="ag-progress-pct">{row.averageProgress}%</span>
                            </span>
                          </td>
                          <td>
                            <span className={row.status === "Active" ? "ag-status-active" : row.status === "Upcoming" ? "ag-status-upcoming" : "ag-status-completed"}>{row.status}</span>
                          </td>
                          <td className="ag-td-action">
                            <a href="#" className="ag-link-members">View Group Members</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="ag-pagination">
                  <p className="ag-pagination-text">
                    Showing {agTotal === 0 ? 0 : (agPage - 1) * agPageSize + 1}-{Math.min(agPage * agPageSize, agTotal)} of {agTotal} assigned groups
                  </p>
                  <div className="ag-pagination-btns">
                    <button
                      type="button"
                      className="ag-page-btn ag-page-prev"
                      disabled={agPage <= 1}
                      onClick={() => setAgPage((p) => Math.max(1, p - 1))}
                    >
                      Previous
                    </button>
                    {Array.from({ length: agTotalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        type="button"
                        className={`ag-page-btn ag-page-num ${agPage === p ? "active" : ""}`}
                        onClick={() => setAgPage(p)}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      type="button"
                      className="ag-page-btn ag-page-next"
                      disabled={agPage >= agTotalPages}
                      onClick={() => setAgPage((p) => Math.min(agTotalPages, p + 1))}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {tab === "study-materials" && (
              <div className="sm-hub">
                <div className="sm-hub-header">
                  <div>
                    <h2 className="sm-hub-title">Study Materials Hub</h2>
                    <p className="sm-hub-desc">Centralized repository for course resources. Upload and organize lectures, reading material, and case studies for your students.</p>
                  </div>
                  <div className="sm-hub-header-actions">
                    <button type="button" className="sm-hub-btn-primary" onClick={openAddMaterialModal}>
                      <Plus className="w-4 h-4" strokeWidth={2} />
                      Add Material
                    </button>
                    <button type="button" className="sm-hub-btn-link">
                      <LinkIcon className="w-4 h-4" strokeWidth={2} />
                      Add External Link
                    </button>
                  </div>
                </div>

                <div className="sm-hub-table-section">
                  <div className="sm-hub-table-header">
                    <h3 className="sm-hub-table-title">Uploaded Resources</h3>
                    <button type="button" className="sm-hub-table-filter" aria-label="Filter or sort"><SlidersHorizontal className="w-5 h-5" strokeWidth={2} /></button>
                  </div>
                  <div className="sm-hub-table-wrap">
                    <table className="sm-hub-table">
                      <thead>
                        <tr>
                          <th className="sm-hub-th-checkbox"><input type="checkbox" aria-label="Select all" /></th>
                          <th>File Name</th>
                          <th>Category</th>
                          <th>Size</th>
                          <th>Upload Date</th>
                          <th>Target Group</th>
                          <th className="sm-hub-th-actions">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {localMaterials.map((row: StudyMaterialRow, rowIndex: number) => (
                          <tr key={row.id}>
                            <td className="sm-hub-td-checkbox"><input type="checkbox" aria-label={`Select ${row.fileName}`} /></td>
                            <td>
                              <div className="sm-hub-file-cell">
                                {row.type === "pdf" && <FileText className="sm-hub-file-icon sm-hub-file-icon-pdf" strokeWidth={2} />}
                                {row.type === "pptx" && <Presentation className="sm-hub-file-icon sm-hub-file-icon-pptx" strokeWidth={2} />}
                                {row.type === "xlsx" && <FileSpreadsheet className="sm-hub-file-icon sm-hub-file-icon-xlsx" strokeWidth={2} />}
                                {row.type === "url" && <LinkIcon className="sm-hub-file-icon sm-hub-file-icon-url" strokeWidth={2} />}
                                <span className="sm-hub-file-name">{row.fileName}</span>
                              </div>
                            </td>
                            <td>
                              <span className={`sm-hub-pill sm-hub-pill-${row.category === "LECTURE NOTES" ? (rowIndex % 2 === 0 ? "notes" : "notes-alt") : row.category === "CASE STUDY" ? "case" : "external"}`}>
                                {row.category}
                              </span>
                            </td>
                            <td>{row.size}</td>
                            <td>{row.uploadDate}</td>
                            <td>{row.targetGroup}</td>
                            <td className="sm-hub-td-actions">
                              <div className="sm-hub-actions">
                                {row.type === "url" ? (
                                  <button type="button" className="sm-hub-action" aria-label="Open external link"><ExternalLink className="w-4 h-4" strokeWidth={2} /></button>
                                ) : (
                                  <button type="button" className="sm-hub-action" aria-label="View"><Eye className="w-4 h-4" strokeWidth={2} /></button>
                                )}
                                <button type="button" className="sm-hub-action" aria-label="Edit"><Pencil className="w-4 h-4" strokeWidth={2} /></button>
                                <button type="button" className="sm-hub-action" aria-label="Delete"><Trash2 className="w-4 h-4" strokeWidth={2} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="sm-hub-pagination">
                    <p className="sm-hub-pagination-text">Showing 1 to {localMaterials.length} of {Math.max(localMaterials.length, studyMaterialsTotal)} materials</p>
                    <div className="sm-hub-pagination-btns">
                      <button type="button" className="sm-hub-page-btn sm-hub-page-prev" disabled>Previous</button>
                      <button type="button" className="sm-hub-page-btn sm-hub-page-num active">1</button>
                      <button type="button" className="sm-hub-page-btn sm-hub-page-num">2</button>
                      <button type="button" className="sm-hub-page-btn sm-hub-page-num">3</button>
                      <button type="button" className="sm-hub-page-btn sm-hub-page-next">Next</button>
                    </div>
                  </div>
                </div>

                <div className="sm-hub-cards">
                  <div className="sm-hub-card">
                    <div className="sm-hub-card-icon sm-hub-card-icon-storage"><LayoutGrid className="w-5 h-5" strokeWidth={2} /></div>
                    <div>
                      <p className="sm-hub-card-label">Storage Used</p>
                      <p className="sm-hub-card-value sm-hub-card-value-blue">{studyMaterialsStorageUsed}</p>
                    </div>
                  </div>
                  <div className="sm-hub-card">
                    <div className="sm-hub-card-icon sm-hub-card-icon-views"><Eye className="w-5 h-5" strokeWidth={2} /></div>
                    <div>
                      <p className="sm-hub-card-label">Total Views</p>
                      <p className="sm-hub-card-value">{studyMaterialsTotalViews.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="sm-hub-card">
                    <div className="sm-hub-card-icon sm-hub-card-icon-downloads"><Download className="w-5 h-5" strokeWidth={2} /></div>
                    <div>
                      <p className="sm-hub-card-label">Total Downloads</p>
                      <p className="sm-hub-card-value">{studyMaterialsTotalDownloads.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === "students" && (
              <div className="lms-students-modern">
                <div className="lms-students-bar">
                  <div className="lms-students-filters" role="group" aria-label="Filter students">
                    <button type="button" className="lms-students-filter-btn active">All Students</button>
                    <button type="button" className="lms-students-filter-btn">Active</button>
                    <button type="button" className="lms-students-filter-btn">Completed</button>
                    <button type="button" className="lms-students-filter-btn">Dropped</button>
                    <button type="button" className="lms-students-filter-btn at-risk">At Risk</button>
                  </div>
                  <div className="lms-students-bar-actions">
                    <button
                      type="button"
                      className="lms-students-bar-btn lms-students-bar-btn-primary"
                      onClick={openEnrollModal}
                    >
                      <UserPlus className="w-4 h-4" strokeWidth={2} />
                      New enrollment
                    </button>
                    <button type="button" className="lms-students-bar-btn">
                      <Download className="w-4 h-4" strokeWidth={2} />
                      Export Grades
                    </button>
                  </div>
                </div>
                <div className="lms-students-table-wrap">
                    <table className="lms-students-table">
                      <thead>
                        <tr>
                          <th className="lms-students-th-checkbox"><input type="checkbox" aria-label="Select all" /></th>
                          <th>Student</th>
                          <th>Assigned Group</th>
                          <th>Enrollment Date</th>
                          <th>Academic Progress</th>
                          <th>Avg. Quiz Score</th>
                          <th>Last Activity</th>
                          <th className="lms-students-th-actions"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {courseStudentsData.slice(0, 3).map((row: CourseStudentRow, idx: number) => (
                          <tr key={row.id}>
                            <td className="lms-students-td-checkbox"><input type="checkbox" aria-label={`Select ${row.name}`} /></td>
                            <td>
                              <div className="lms-student-cell">
                                <div className={`lms-student-avatar lms-student-avatar-${idx % 3}`}>
                                  {row.initials ?? row.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                                </div>
                                <div>
                                  <p className="lms-student-name">{row.name}</p>
                                  <p className="lms-student-id">ID: {row.studentId}</p>
                                </div>
                              </div>
                            </td>
                            <td><a href="#" className="lms-student-group-link">{row.assignedGroup}</a></td>
                            <td>{row.enrollmentDate}</td>
                            <td>
                              <div className="lms-student-progress-cell">
                                <span className="lms-student-progress-bar">
                                  <span className={`lms-student-progress-fill ${row.status === "At Risk" ? "at-risk" : row.progress === 100 ? "completed" : ""}`} style={{ width: `${row.progress}%` }} />
                                  {row.status === "At Risk" && row.progress < 50 && <AlertTriangle className="lms-student-progress-warning" strokeWidth={2} />}
                                </span>
                                <span className="lms-student-progress-pct">{row.progress}%</span>
                              </div>
                            </td>
                            <td><span className={`lms-student-quiz-score ${row.avgQuizScore >= 70 ? "good" : row.avgQuizScore > 0 ? "low" : "neutral"}`}>{row.avgQuizScore > 0 ? `${row.avgQuizScore}%` : "—"}</span></td>
                            <td>
                              <div className="lms-student-last-activity">
                                <span className="lms-student-activity-ago">{row.lastActivityAgo}</span>
                                <a href="#" className={`lms-student-activity-detail ${row.lastActivityStatus === "inactive" ? "inactive" : ""}`}>{row.lastActivityDetail}</a>
                              </div>
                            </td>
                            <td className="lms-students-td-actions">
                              <div className="lms-student-actions">
                                <button
                                  type="button"
                                  className="lms-student-action lms-student-action-transfer"
                                  aria-label="Transfer student to another course"
                                  onClick={() => {}}
                                >
                                  <ArrowRightLeft className="w-4 h-4" strokeWidth={2} />
                                </button>
                                <button
                                  type="button"
                                  className="lms-student-action lms-student-action-remove"
                                  aria-label="Remove student from course"
                                  onClick={() => {}}
                                >
                                  <Trash2 className="w-4 h-4" strokeWidth={2} />
                                </button>
                                <button type="button" className="lms-student-action lms-student-more" aria-label="More options">
                                  <MoreVertical className="w-4 h-4" strokeWidth={2} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="lms-students-pagination">
                      <p className="lms-students-pagination-text">Showing 1–3 of {courseStudentsTotal.toLocaleString()} students</p>
                      <div className="lms-students-pagination-btns">
                        <button type="button" className="lms-students-page-btn prev" disabled>Previous</button>
                        <button type="button" className="lms-students-page-btn next">Next</button>
                      </div>
                    </div>
                </div>
              </div>
            )}

            {tab === "feedback-review" && (
              <div className="fr-section">
                <div className="fr-header">
                  <span />
                  <button type="button" className="fr-btn-request">
                    Request Feedback
                  </button>
                </div>
                <div className="fr-panels">
                  <div className="fr-summary-card">
                    <h3 className="fr-summary-title">Satisfaction Summary</h3>
                    <p className="fr-summary-rating">{feedbackSummary.averageRating}</p>
                    <div className="fr-summary-stars" aria-hidden>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="fr-star fr-star-full" strokeWidth={0} fill="currentColor" />
                      ))}
                    </div>
                    <p className="fr-summary-label">Average Star Rating</p>
                    <p className="fr-summary-total">{feedbackSummary.totalReviews.toLocaleString()} Total Reviews</p>
                    <p className="fr-summary-csat">{feedbackSummary.csatScore}% CSAT Score</p>
                  </div>
                  <div className="fr-breakdown-card">
                    <h3 className="fr-breakdown-title">Rating Breakdown</h3>
                    <ul className="fr-breakdown-list">
                      {ratingBreakdown.map(({ stars, percent }) => (
                        <li key={stars} className="fr-breakdown-item">
                          <span className="fr-breakdown-stars">{stars} Stars</span>
                          <span className="fr-breakdown-bar-wrap">
                            <span className="fr-breakdown-bar" style={{ width: `${percent}%` }} />
                          </span>
                          <span className="fr-breakdown-pct">{percent}%</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="fr-reviews-section">
                  <div className="fr-reviews-header">
                    <h3 className="fr-reviews-title">Student Reviews</h3>
                    <div className="fr-reviews-sort">
                      <label htmlFor="fr-sort" className="fr-sort-label">Sort by:</label>
                      <select id="fr-sort" className="fr-sort-select">
                        <option>Newest First</option>
                        <option>Oldest First</option>
                        <option>Highest Rating</option>
                        <option>Lowest Rating</option>
                      </select>
                    </div>
                  </div>
                  <div className="fr-reviews-table-wrap">
                    <table className="fr-reviews-table">
                      <thead>
                        <tr>
                          <th>Student</th>
                          <th>Rating</th>
                          <th>Date</th>
                          <th>Comment</th>
                          <th className="fr-th-actions">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courseReviewsData.map((row: CourseReviewRow, idx: number) => (
                          <tr key={row.id}>
                            <td>
                              <div className="fr-review-student">
                                <div className={`fr-review-avatar fr-review-avatar-${idx % 3}`}>
                                  {row.studentName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                                </div>
                                <div>
                                  <p className="fr-review-name">{row.studentName}</p>
                                  <p className="fr-review-id">ID: {row.studentId}</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="fr-review-stars" aria-label={`${row.rating} out of 5 stars`}>
                                {[1, 2, 3, 4, 5].map((i) => (
                                  <Star key={i} className={i <= row.rating ? "fr-star fr-star-full" : "fr-star fr-star-empty"} strokeWidth={0} fill={i <= row.rating ? "currentColor" : "none"} />
                                ))}
                              </div>
                            </td>
                            <td>{row.date}</td>
                            <td>
                              <div className="fr-review-comment">
                                {row.underReview ? (
                                  <>
                                    <span className="fr-review-flag">Under Review</span>
                                    <p className="fr-review-comment-text">{row.comment}</p>
                                  </>
                                ) : (
                                  <>
                                    <p className="fr-review-comment-text">{row.comment}</p>
                                    <a href="#" className="fr-review-read-more">Read Full Review</a>
                                  </>
                                )}
                              </div>
                            </td>
                            <td className="fr-td-actions">
                              <div className="fr-review-actions">
                                <button type="button" className="fr-action-btn">Reply</button>
                                {row.underReview ? (
                                  <button type="button" className="fr-action-btn fr-action-moderate">Moderate</button>
                                ) : (
                                  <button type="button" className="fr-action-btn" aria-label="Flag"><Flag className="w-4 h-4" strokeWidth={2} /></button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="fr-reviews-pagination">
                    <p className="fr-reviews-pagination-text">Showing 1-{courseReviewsData.length} of {courseReviewsTotal.toLocaleString()} reviews</p>
                    <div className="fr-reviews-pagination-btns">
                      <button type="button" className="fr-page-btn fr-page-prev" disabled>Previous</button>
                      <button type="button" className="fr-page-btn fr-page-next">Next</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === "analytics" && (
              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                <h2 className="lms-section-title">Analytics</h2>
                <p className="lms-description mb-6">View course analytics and engagement metrics.</p>
                <div className="border border-dashed border-gray-200 rounded-lg p-8 text-center text-gray-500">
                  Analytics content can be added here.
                </div>
              </div>
            )}

            {enrollModalOpen && (
              <div className="lms-enroll-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="lms-enroll-modal-title">
                <div className="lms-enroll-modal-backdrop" onClick={closeEnrollModal} aria-hidden />
                <div className="lms-enroll-modal-dialog">
                  <div className="lms-enroll-modal-header">
                    <h2 id="lms-enroll-modal-title" className="lms-enroll-modal-title">Enroll students</h2>
                    <button type="button" className="lms-enroll-modal-close" onClick={closeEnrollModal} aria-label="Close">
                      <X className="w-5 h-5" strokeWidth={2} />
                    </button>
                  </div>
                  <p className="lms-enroll-modal-desc">Search and select one or more students to add to this course.</p>
                  <div className="lms-enroll-modal-search-wrap">
                    <Search className="lms-enroll-modal-search-icon" strokeWidth={1.5} aria-hidden />
                    <input
                      type="search"
                      className="lms-enroll-modal-search-input"
                      placeholder="Search by name, email, or student ID..."
                      value={enrollSearch}
                      onChange={(e) => setEnrollSearch(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <div className="lms-enroll-modal-list-wrap">
                    {enrollFiltered.length === 0 ? (
                      <p className="lms-enroll-modal-empty">
                        {enrollSearch.trim() ? "No students match your search." : "No students available to enroll."}
                      </p>
                    ) : (
                      <ul className="lms-enroll-modal-list">
                        {enrollFiltered.map((student: EnrollableStudent) => (
                          <li key={student.id} className="lms-enroll-modal-item">
                            <label className="lms-enroll-modal-item-label">
                              <input
                                type="checkbox"
                                checked={selectedEnrollIds.has(student.id)}
                                onChange={() => toggleEnrollSelection(student.id)}
                                className="lms-enroll-modal-item-checkbox"
                              />
                              <span className="lms-enroll-modal-item-avatar">
                                {student.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                              </span>
                              <span className="lms-enroll-modal-item-info">
                                <span className="lms-enroll-modal-item-name">{student.name}</span>
                                <span className="lms-enroll-modal-item-meta">{student.studentId} · {student.email}</span>
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="lms-enroll-modal-actions">
                    <button type="button" className="lms-enroll-modal-btn lms-enroll-modal-btn-cancel" onClick={closeEnrollModal}>
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="lms-enroll-modal-btn lms-enroll-modal-btn-primary"
                      onClick={handleEnrollSelected}
                      disabled={selectedEnrollIds.size === 0}
                    >
                      Enroll selected {selectedEnrollIds.size > 0 ? `(${selectedEnrollIds.size})` : ""}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {assignGroupModalOpen && (
              <div className="lms-assign-group-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="lms-assign-group-modal-title">
                <div className="lms-assign-group-modal-backdrop" onClick={closeAssignGroupModal} aria-hidden />
                <div className="lms-assign-group-modal-dialog">
                  <div className="lms-assign-group-modal-header">
                    <h2 id="lms-assign-group-modal-title" className="lms-assign-group-modal-title">Assign New Group</h2>
                    <button type="button" className="lms-assign-group-modal-close" onClick={closeAssignGroupModal} aria-label="Close">
                      <X className="w-5 h-5" strokeWidth={2} />
                    </button>
                  </div>
                  <p className="lms-assign-group-modal-desc">Search and select a group to assign to this course.</p>
                  <div className="lms-assign-group-modal-search-wrap">
                    <Search className="lms-assign-group-modal-search-icon" strokeWidth={1.5} aria-hidden />
                    <input
                      type="search"
                      className="lms-assign-group-modal-search-input"
                      placeholder="Search by group name or cohort..."
                      value={assignGroupSearch}
                      onChange={(e) => setAssignGroupSearch(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <div className="lms-assign-group-modal-list-wrap">
                    {assignGroupFiltered.length === 0 ? (
                      <p className="lms-assign-group-modal-empty">
                        {assignGroupSearch.trim() ? "No groups match your search." : "No groups available to assign. All groups are already assigned to this course."}
                      </p>
                    ) : (
                      <ul className="lms-assign-group-modal-list">
                        {assignGroupFiltered.map((group: AssignedGroupRow) => (
                          <li key={group.id} className="lms-assign-group-modal-item">
                            <button
                              type="button"
                              className={`lms-assign-group-modal-item-btn ${selectedAssignGroupId === group.id ? "selected" : ""}`}
                              onClick={() => setSelectedAssignGroupId(selectedAssignGroupId === group.id ? null : group.id)}
                            >
                              <span className="lms-assign-group-modal-item-name">{group.groupName}</span>
                              <span className="lms-assign-group-modal-item-meta">Cohort #{group.cohortId} · {group.studentCount} Students · {group.intakePeriod}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="lms-assign-group-modal-actions">
                    <button type="button" className="lms-assign-group-modal-btn lms-assign-group-modal-btn-cancel" onClick={closeAssignGroupModal}>
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="lms-assign-group-modal-btn lms-assign-group-modal-btn-primary"
                      onClick={handleAssignGroup}
                      disabled={!selectedAssignGroupId}
                    >
                      Assign Group
                    </button>
                  </div>
                </div>
              </div>
            )}

            {addMaterialModalOpen && (
              <div className="sm-add-material-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="sm-add-material-modal-title">
                <div className="sm-add-material-modal-backdrop" onClick={closeAddMaterialModal} aria-hidden />
                <div className="sm-add-material-modal-dialog">
                  <div className="sm-add-material-modal-header">
                    <h2 id="sm-add-material-modal-title" className="sm-add-material-modal-title">Add Material</h2>
                    <button type="button" className="sm-add-material-modal-close" onClick={closeAddMaterialModal} aria-label="Close">
                      <X className="w-5 h-5" strokeWidth={2} />
                    </button>
                  </div>
                  <p className="sm-add-material-modal-desc">Add a title and upload a file to include in the course study materials.</p>
                  <div className="sm-add-material-modal-form">
                    <label className="sm-add-material-label" htmlFor="sm-add-material-title">
                      Title
                    </label>
                    <input
                      id="sm-add-material-title"
                      type="text"
                      className="sm-add-material-input"
                      placeholder="Enter material title"
                      value={addMaterialTitle}
                      onChange={(e) => setAddMaterialTitle(e.target.value)}
                      autoFocus
                    />
                    <div
                      className="sm-add-material-upload"
                      onClick={() => addMaterialFileInputRef.current?.click()}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") addMaterialFileInputRef.current?.click(); }}
                      aria-label="Upload resource file"
                    >
                      <input
                        ref={addMaterialFileInputRef}
                        id="sm-add-material-file"
                        type="file"
                        className="sm-add-material-file-input-hidden"
                        accept=".pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx"
                        onChange={(e) => setAddMaterialFile(e.target.files?.[0] ?? null)}
                      />
                      <CloudUpload className="sm-add-material-upload-icon" strokeWidth={1.5} aria-hidden />
                      <p className="sm-add-material-upload-title">Upload Resource Files</p>
                      <p className="sm-add-material-upload-desc">Drag and drop your files here or click the button below. Supports PDF, PPT, Word, and Excel (Max 50MB).</p>
                      <div className="sm-add-material-upload-types">
                        <span className="sm-add-material-upload-type sm-add-material-upload-type-pdf" title="PDF"><FileText className="w-5 h-5" strokeWidth={2} /></span>
                        <span className="sm-add-material-upload-type sm-add-material-upload-type-docx" title="Word"><FileText className="w-5 h-5" strokeWidth={2} /></span>
                        <span className="sm-add-material-upload-type sm-add-material-upload-type-pptx" title="PowerPoint"><Presentation className="w-5 h-5" strokeWidth={2} /></span>
                        <span className="sm-add-material-upload-type sm-add-material-upload-type-xlsx" title="Excel"><FileSpreadsheet className="w-5 h-5" strokeWidth={2} /></span>
                      </div>
                      <button
                        type="button"
                        className="sm-add-material-upload-btn"
                        onClick={(e) => { e.stopPropagation(); addMaterialFileInputRef.current?.click(); }}
                      >
                        Select Files
                      </button>
                      {addMaterialFile && <p className="sm-add-material-upload-chosen">{addMaterialFile.name}</p>}
                    </div>
                  </div>
                  <div className="sm-add-material-modal-actions">
                    <button type="button" className="sm-add-material-modal-btn sm-add-material-modal-btn-cancel" onClick={closeAddMaterialModal}>
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="sm-add-material-modal-btn sm-add-material-modal-btn-primary"
                      onClick={handleAddMaterial}
                      disabled={!addMaterialTitle.trim() || !addMaterialFile}
                    >
                      Add Material
                    </button>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
