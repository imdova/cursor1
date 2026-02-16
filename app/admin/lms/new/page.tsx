"use client";

import "./add-lms-form.css";
import Link from "next/link";
import { useState } from "react";
import { ROUTES } from "@/constants";
import {
  Info,
  Users,
  List,
  Upload,
  GripVertical,
  Trash2,
  ChevronUp,
  Search,
  X,
} from "lucide-react";

type ContentType = "youtube" | "vdocipher";

interface CurriculumLesson {
  id: string;
  type: "lesson";
  title: string;
  contentType: ContentType;
  url: string;
}

interface CurriculumQuiz {
  id: string;
  type: "quiz";
  title: string;
  quizName: string;
}

type CurriculumItem = CurriculumLesson | CurriculumQuiz;

interface Module {
  id: string;
  title: string;
  expanded: boolean;
  items: CurriculumItem[];
}

function newModule(title: string): Module {
  return {
    id: `mod-${Date.now()}`,
    title,
    expanded: true,
    items: [],
  };
}

function newLesson(title: string): CurriculumLesson {
  return {
    id: `les-${Date.now()}`,
    type: "lesson",
    title,
    contentType: "youtube",
    url: "",
  };
}

function newQuiz(title: string): CurriculumQuiz {
  return {
    id: `quiz-${Date.now()}`,
    type: "quiz",
    title,
    quizName: "",
  };
}

export default function AddNewLMSPage() {
  const [courseTitle, setCourseTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [groups, setGroups] = useState<string[]>([
    "Corporate Sales Team",
    "Management Level 2",
  ]);
  const [groupInput, setGroupInput] = useState("");
  const [modules, setModules] = useState<Module[]>([
    {
      id: "mod-1",
      title: "Introduction to Strategic Systems",
      expanded: true,
      items: [
        {
          id: "les-1",
          type: "lesson",
          title: "Core Concepts Overview",
          contentType: "youtube",
          url: "",
        },
        {
          id: "quiz-1",
          type: "quiz",
          title: "Knowledge Check: Phase 1 Foundations",
          quizName: "Phase 1 Foundations - Final Exam",
        },
      ],
    },
  ]);

  const removeGroup = (idx: number) => {
    setGroups((prev) => prev.filter((_, i) => i !== idx));
  };

  const addGroup = () => {
    const trimmed = groupInput.trim();
    if (trimmed && !groups.includes(trimmed)) {
      setGroups((prev) => [...prev, trimmed]);
      setGroupInput("");
    }
  };

  const addModule = () => {
    setModules((prev) => [...prev, newModule(`Module ${prev.length + 1}`)]);
  };

  const removeModule = (id: string) => {
    setModules((prev) => prev.filter((m) => m.id !== id));
  };

  const toggleModule = (id: string) => {
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, expanded: !m.expanded } : m))
    );
  };

  const updateModuleTitle = (id: string, title: string) => {
    setModules((prev) => prev.map((m) => (m.id === id ? { ...m, title } : m)));
  };

  const addLesson = (moduleId: string) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              items: [
                ...m.items,
                newLesson(
                  `Lesson ${
                    m.items.filter((i) => i.type === "lesson").length + 1
                  }.1`
                ),
              ],
            }
          : m
      )
    );
  };

  const addQuiz = (moduleId: string) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              items: [...m.items, newQuiz(`Knowledge Check: ${m.title}`)],
            }
          : m
      )
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const removeItem = (moduleId: string, itemId: string) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? { ...m, items: m.items.filter((i) => i.id !== itemId) }
          : m
      )
    );
  };

  const updateLesson = (
    moduleId: string,
    itemId: string,
    updates: Partial<CurriculumLesson>
  ) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              items: m.items.map((i) =>
                i.id === itemId && i.type === "lesson"
                  ? { ...i, ...updates }
                  : i
              ),
            }
          : m
      )
    );
  };

  const updateQuiz = (moduleId: string, itemId: string, quizName: string) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              items: m.items.map((i) =>
                i.id === itemId && i.type === "quiz" ? { ...i, quizName } : i
              ),
            }
          : m
      )
    );
  };

  return (
    <div className="alms-page">
      {/* Top bar */}
      <div className="alms-topbar">
        <div className="alms-topbar-actions">
          <button type="button" className="alms-btn-draft">
            Save as Draft
          </button>
          <button type="button" className="alms-btn-publish">
            Publish Course
          </button>
        </div>
      </div>

      <div className="alms-main">
        <header className="alms-header">
          <h1 className="alms-title">Add New LMS Course</h1>
          <p className="alms-subtitle">
            Build your curriculum, assign groups, and publish your course.
          </p>
        </header>

        {/* 1. Course Basics */}
        <section className="alms-card">
          <h2 className="alms-card-heading">
            <Info className="alms-card-icon" strokeWidth={2} />
            Course Basics
          </h2>
          <div className="alms-basics-grid">
            <div className="alms-basics-fields">
              <label className="alms-label">Course Title</label>
              <input
                type="text"
                className="alms-input"
                placeholder="e.g., Advanced Project Management 2024"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
              />
              <label className="alms-label">Short Description</label>
              <textarea
                className="alms-textarea"
                placeholder="Briefly describe what students will learn..."
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                rows={4}
              />
            </div>
            <div className="alms-thumbnail-wrap">
              <label className="alms-label">Course Thumbnail</label>
              <div className="alms-thumbnail-upload">
                <Upload className="alms-upload-icon" strokeWidth={2} />
                <span className="alms-upload-text">Upload Thumbnail</span>
                <span className="alms-upload-hint">
                  Recommended 1280x720 (PNG, JPG)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Access Management */}
        <section className="alms-card">
          <h2 className="alms-card-heading">
            <Users className="alms-card-icon" strokeWidth={2} />
            Access Management
          </h2>
          <label className="alms-label">Assign to Groups</label>
          <div className="alms-groups-input-wrap">
            <div className="alms-groups-pills">
              {groups.map((g, i) => (
                <span key={g} className="alms-pill">
                  {g}
                  <button
                    type="button"
                    className="alms-pill-remove"
                    onClick={() => removeGroup(i)}
                    aria-label={`Remove ${g}`}
                  >
                    <X className="w-3.5 h-3.5" strokeWidth={2} />
                  </button>
                </span>
              ))}
              <input
                type="text"
                className="alms-groups-input"
                placeholder="Search and add groups..."
                value={groupInput}
                onChange={(e) => setGroupInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addGroup())
                }
              />
            </div>
            <ChevronUp className="alms-groups-chevron" strokeWidth={2} />
          </div>
          <p className="alms-hint">
            Only users in these groups will be able to enroll in this course.
          </p>
        </section>

        {/* 3. Curriculum Builder */}
        <section className="alms-card">
          <div className="alms-curriculum-head">
            <h2 className="alms-card-heading">
              <List className="alms-card-icon" strokeWidth={2} />
              Curriculum Builder
            </h2>
            <button
              type="button"
              className="alms-btn-add-module"
              onClick={addModule}
            >
              + Add New Module
            </button>
          </div>

          {modules.map((mod) => (
            <div key={mod.id} className="alms-module">
              <div className="alms-module-header">
                <GripVertical className="alms-drag" strokeWidth={2} />
                <input
                  type="text"
                  className="alms-module-title-input"
                  value={mod.title}
                  onChange={(e) => updateModuleTitle(mod.id, e.target.value)}
                />
                <button
                  type="button"
                  className="alms-icon-btn"
                  onClick={() => toggleModule(mod.id)}
                  aria-label={mod.expanded ? "Collapse" : "Expand"}
                >
                  <ChevronUp
                    className={`w-5 h-5 ${mod.expanded ? "" : "rotate-180"}`}
                    strokeWidth={2}
                  />
                </button>
                <button
                  type="button"
                  className="alms-icon-btn alms-icon-btn-danger"
                  onClick={() => removeModule(mod.id)}
                  aria-label="Delete module"
                >
                  <Trash2 className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>
              {mod.expanded && (
                <div className="alms-module-body">
                  {mod.items.map((item) => (
                    <div key={item.id} className="alms-item">
                      <GripVertical className="alms-drag" strokeWidth={2} />
                      {item.type === "lesson" ? (
                        <>
                          <div className="alms-item-title-row">
                            <span className="alms-item-title">
                              {item.title}
                            </span>
                            <span className="alms-tag alms-tag-lesson">
                              LESSON
                            </span>
                          </div>
                          <label className="alms-label alms-label-sm">
                            CONTENT TYPE
                          </label>
                          <div className="alms-toggle-group">
                            <button
                              type="button"
                              className={`alms-toggle-btn ${
                                item.contentType === "youtube" ? "active" : ""
                              }`}
                              onClick={() =>
                                updateLesson(mod.id, item.id, {
                                  contentType: "youtube",
                                })
                              }
                            >
                              YouTube URL
                            </button>
                            <button
                              type="button"
                              className={`alms-toggle-btn ${
                                item.contentType === "vdocipher" ? "active" : ""
                              }`}
                              onClick={() =>
                                updateLesson(mod.id, item.id, {
                                  contentType: "vdocipher",
                                })
                              }
                            >
                              VdoCipher Embed
                            </button>
                          </div>
                          <input
                            type="text"
                            className="alms-input"
                            placeholder="https://youtube.com/watch?v=..."
                            value={item.url}
                            onChange={(e) =>
                              updateLesson(mod.id, item.id, {
                                url: e.target.value,
                              })
                            }
                          />
                        </>
                      ) : (
                        <>
                          <div className="alms-item-title-row">
                            <span className="alms-item-title">
                              {item.title}
                            </span>
                            <span className="alms-tag alms-tag-quiz">QUIZ</span>
                          </div>
                          <label className="alms-label alms-label-sm">
                            SELECT EXISTING QUIZ
                          </label>
                          <div className="alms-quiz-select-wrap">
                            <input
                              type="text"
                              className="alms-input"
                              value={item.quizName}
                              onChange={(e) =>
                                updateQuiz(mod.id, item.id, e.target.value)
                              }
                              placeholder="Search quizzes..."
                            />
                            <Search
                              className="alms-search-icon"
                              strokeWidth={2}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  <div className="alms-add-item-links">
                    <button
                      type="button"
                      className="alms-link-btn"
                      onClick={() => addLesson(mod.id)}
                    >
                      + Add Lesson
                    </button>
                    <button
                      type="button"
                      className="alms-link-btn"
                      onClick={() => addQuiz(mod.id)}
                    >
                      + Add Quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            className="alms-add-module-zone"
            onClick={addModule}
          >
            <span className="alms-add-module-plus">+</span>
            <span className="alms-add-module-text">Add Another Module</span>
            <span className="alms-add-module-hint">
              Organize your course into logical sections
            </span>
          </button>
        </section>

        {/* Bottom actions */}
        <div className="alms-bottom-actions">
          <p className="alms-last-saved">Last saved today at 2:45 PM</p>
          <div className="alms-bottom-btns">
            <button type="button" className="alms-btn-draft">
              Save as Draft
            </button>
            <button type="button" className="alms-btn-publish">
              Publish Course Now
            </button>
            <Link href={ROUTES.ADMIN.LMS_MANAGEMENT} className="alms-discard">
              <X className="w-4 h-4" strokeWidth={2} />
              Discard Course
            </Link>
          </div>
        </div>
      </div>

      <footer className="alms-footer">
        © 2024 IMETS Academy - Internal Learning Management System v2.4.0
      </footer>
    </div>
  );
}
