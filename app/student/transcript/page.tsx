"use client";

import "./transcript.css";
import Link from "next/link";
import {
  Bell,
  FileText,
  Download,
  Printer,
  CreditCard,
  GraduationCap,
  Share2,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";
import { ROUTES } from "@/constants";
import {
  transcriptProfile,
  transcriptStats,
  transcriptCourses,
  transcriptUrl,
  privacyDefaults,
} from "./transcript-data";
import { useState } from "react";

export default function StudentTranscriptPage() {
  const [publicAccess, setPublicAccess] = useState(true);
  const [passwordProtect, setPasswordProtect] = useState(
    privacyDefaults.passwordProtect
  );
  const [hideGrades, setHideGrades] = useState(privacyDefaults.hideGrades);
  const [showGpa, setShowGpa] = useState(privacyDefaults.showGpa);
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard?.writeText(transcriptUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="tr-page">
      {/* Header */}
      <header className="tr-header">
        <Link href={ROUTES.STUDENT.DASHBOARD} className="tr-logo">
          <div className="tr-logo-icon">IMETS</div>
          <span className="tr-logo-text">Academy</span>
        </Link>
        <nav className="tr-nav">
          <Link href={ROUTES.STUDENT.DASHBOARD}>Dashboard</Link>
          <Link href={ROUTES.STUDENT.TRANSCRIPT} className="active">
            Transcript
          </Link>
          <Link href={ROUTES.STUDENT.COURSES}>Curriculum</Link>
          <Link href="#">Career Services</Link>
        </nav>
        <div className="tr-header-actions">
          <button
            type="button"
            className="tr-icon-btn"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" strokeWidth={2} />
          </button>
          <Link
            href={ROUTES.STUDENT.PROFILE}
            className="tr-avatar"
            aria-label="Profile"
          >
            <span className="tr-avatar-inner">AT</span>
          </Link>
        </div>
      </header>

      <main className="tr-main">
        <div className="tr-content">
          {/* Left: Profile card + Academic Record */}
          <div className="tr-left">
            {/* Student profile card */}
            <div className="tr-profile-card">
              <div className="tr-profile-accent" />
              <div className="tr-profile-body">
                <div className="tr-profile-photo-wrap">
                  <div className="tr-profile-photo">AT</div>
                  <span className="tr-profile-dot" title="Active" />
                </div>
                <h1 className="tr-profile-name">
                  {transcriptProfile.studentName}
                </h1>
                <p className="tr-profile-id">
                  <CreditCard className="w-4 h-4" strokeWidth={2} />
                  ID: {transcriptProfile.studentId}
                </p>
                <span className="tr-profile-status">
                  {transcriptProfile.status}
                </span>
                <p className="tr-profile-program">
                  <GraduationCap className="w-4 h-4" strokeWidth={2} />
                  {transcriptProfile.program}
                </p>
                <div className="tr-profile-buttons">
                  <Link href="#" className="tr-btn tr-btn-primary">
                    <FileText className="w-4 h-4" strokeWidth={2} />
                    <Download className="w-4 h-4" strokeWidth={2} />
                    Download Official PDF
                  </Link>
                  <button type="button" className="tr-btn tr-btn-secondary">
                    <Printer className="w-4 h-4" strokeWidth={2} />
                    Print
                  </button>
                </div>
              </div>
            </div>

            {/* Academic Record */}
            <div className="tr-record-card">
              <div className="tr-record-watermark" aria-hidden>
                TRANSCRIPT
              </div>
              <div className="tr-record-header">
                <div>
                  <h2 className="tr-record-title">Academic Record</h2>
                  <p className="tr-record-subtitle">
                    OFFICIAL TRANSCRIPT - ISSUED {transcriptProfile.issuedDate}
                  </p>
                </div>
                <div className="tr-record-stats">
                  <div className="tr-record-stat">
                    <span className="tr-record-stat-label">CUMULATIVE GPA</span>
                    <span className="tr-record-stat-value tr-gpa">
                      {transcriptStats.cumulativeGpa}
                    </span>
                  </div>
                  <div className="tr-record-stat">
                    <span className="tr-record-stat-label">CREDITS EARNED</span>
                    <span className="tr-record-stat-value">
                      {transcriptStats.creditsEarned}
                    </span>
                  </div>
                </div>
              </div>
              <div className="tr-record-table-wrap">
                <table className="tr-record-table">
                  <thead>
                    <tr>
                      <th>CODE</th>
                      <th>COURSE TITLE</th>
                      <th>DATE</th>
                      <th>GRADE</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transcriptCourses.map((row) => (
                      <tr key={row.code}>
                        <td>{row.code}</td>
                        <td>{row.courseTitle}</td>
                        <td>{row.date}</td>
                        <td className="tr-grade">{row.grade}</td>
                        <td>
                          <span className={`tr-status tr-status-${row.status}`}>
                            <span className="tr-status-dot" />
                            {row.status === "completed"
                              ? "Completed"
                              : "In Progress"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="tr-record-disclaimer">
                THIS DIGITAL DOCUMENT IS AN OFFICIAL TRANSCRIPT OF IMETS
                ACADEMY. ANY UNAUTHORIZED ALTERATION IS STRICTLY PROHIBITED AND
                SUBJECT TO LEGAL ACTION.
              </p>
            </div>
          </div>

          {/* Right: Public Sharing, Privacy, Verified Record */}
          <aside className="tr-sidebar">
            <div className="tr-sidebar-card">
              <h3 className="tr-sidebar-title">
                <Share2 className="w-5 h-5" strokeWidth={2} />
                Public Sharing
              </h3>
              <div className="tr-toggle-row">
                <span className="tr-toggle-label">
                  Allow employers to view record
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={publicAccess}
                  className={`tr-toggle ${publicAccess ? "on" : ""}`}
                  onClick={() => setPublicAccess(!publicAccess)}
                >
                  <span className="tr-toggle-thumb" />
                </button>
              </div>
              <div className="tr-field">
                <label className="tr-field-label">TRANSCRIPT URL</label>
                <div className="tr-input-wrap">
                  <input
                    type="text"
                    className="tr-input"
                    readOnly
                    value={transcriptUrl}
                  />
                  <button
                    type="button"
                    className="tr-copy-btn"
                    onClick={handleCopyUrl}
                    aria-label="Copy URL"
                  >
                    {copied ? (
                      <Check
                        className="w-4 h-4 tr-copy-check"
                        strokeWidth={2}
                      />
                    ) : (
                      <Copy className="w-4 h-4" strokeWidth={2} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="tr-sidebar-card">
              <h3 className="tr-sidebar-title tr-privacy-title">
                PRIVACY SETTINGS
              </h3>
              <label className="tr-checkbox-row">
                <input
                  type="checkbox"
                  checked={passwordProtect}
                  onChange={(e) => setPasswordProtect(e.target.checked)}
                  className="tr-checkbox"
                />
                <span className="tr-checkbox-label">Password Protect</span>
                <span className="tr-checkbox-hint">
                  Require code for viewing
                </span>
              </label>
              <label className="tr-checkbox-row">
                <input
                  type="checkbox"
                  checked={hideGrades}
                  onChange={(e) => setHideGrades(e.target.checked)}
                  className="tr-checkbox"
                />
                <span className="tr-checkbox-label">
                  Hide Individual Grades
                </span>
                <span className="tr-checkbox-hint">
                  Show pass/fail status only
                </span>
              </label>
              <label className="tr-checkbox-row">
                <input
                  type="checkbox"
                  checked={showGpa}
                  onChange={(e) => setShowGpa(e.target.checked)}
                  className="tr-checkbox"
                />
                <span className="tr-checkbox-label">Show Overall GPA</span>
                <span className="tr-checkbox-hint">
                  Visible on public profile
                </span>
              </label>
            </div>

            <div className="tr-verified-card">
              <h3 className="tr-verified-title">
                <Check className="w-5 h-5" strokeWidth={2} />
                Verified Record
              </h3>
              <p className="tr-verified-desc">
                This transcript is cryptographically signed. Third parties can
                verify its authenticity by scanning the QR code on the official
                PDF export.
              </p>
              <Link href="#" className="tr-verified-link">
                Learn about verification
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <footer className="tr-footer">
        <span className="tr-footer-copy">
          © 2024 IMETS Academy - Educational Record Services
        </span>
        <div className="tr-footer-links">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
          <Link href="#">Help Center</Link>
          <Link href="#">Contact Registrar</Link>
        </div>
      </footer>
    </div>
  );
}
