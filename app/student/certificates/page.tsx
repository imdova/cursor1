"use client";

import "./certificates.css";
import Link from "next/link";
import {
  Star,
  Trophy,
  Download,
  Share2,
  Shield,
  Check,
  Circle,
  ArrowRight,
  Award,
  GraduationCap,
} from "lucide-react";
import { ROUTES } from "@/constants";
import {
  certificatesSummary,
  certificatesList,
  recognitionPartners,
  helpSupportLinks,
  type CertificateItem,
} from "./certificates-data";
import { useState } from "react";
import { ShareCredentialModal } from "./ShareCredentialModal";

const TABS = [
  { id: "all", label: "All Certificates" },
  { id: "completed", label: "Completed" },
  { id: "in_progress", label: "In Progress" },
  { id: "specializations", label: "Specializations" },
] as const;

export default function MyCertificatesPage() {
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]["id"]>("all");
  const [shareModalCertificate, setShareModalCertificate] =
    useState<CertificateItem | null>(null);

  const filteredCertificates =
    activeTab === "all"
      ? certificatesList
      : activeTab === "completed"
      ? certificatesList.filter((c) => c.status === "completed")
      : activeTab === "in_progress"
      ? certificatesList.filter((c) => c.status === "in_progress")
      : certificatesList.filter((c) => c.status === "completed");

  return (
    <div className="cert-page">
      {/* Page title */}
      <div className="cert-header">
        <h1 className="cert-title">My Certificates</h1>
        <p className="cert-subtitle">
          Celebrate your academic achievements and professional milestones at
          IMETS Academy.
        </p>
      </div>

      {/* Summary cards */}
      <div className="cert-summary">
        <div className="cert-summary-card cert-summary-total">
          <div className="cert-summary-card-content">
            <div className="cert-summary-label">Total Certificates Earned</div>
            <p className="cert-summary-value">
              {certificatesSummary.totalEarned}
            </p>
            <p className="cert-summary-note">
              +{certificatesSummary.addedThisMonth} this month
            </p>
          </div>
          <Star
            className="cert-summary-icon cert-summary-star"
            strokeWidth={1.5}
          />
        </div>
        <div className="cert-summary-card cert-summary-latest">
          <div className="cert-summary-card-content">
            <div className="cert-summary-label">Latest Achievement</div>
            <p className="cert-summary-value cert-summary-latest-title">
              {certificatesSummary.latestAchievement.title}
            </p>
            <p className="cert-summary-note cert-summary-issued">
              ISSUED {certificatesSummary.latestAchievement.issuedDate}
            </p>
          </div>
          <Trophy
            className="cert-summary-icon cert-summary-trophy"
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="cert-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`cert-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="cert-main-wrap">
        {/* Certificate grid */}
        <div className="cert-grid-wrap">
          <div className="cert-grid">
            {filteredCertificates.map((cert) => (
              <CertificateCard
                key={cert.id}
                certificate={cert}
                onLinkedInClick={() => setShareModalCertificate(cert)}
              />
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="cert-sidebar">
          <div className="cert-sidebar-card cert-recognition">
            <h3 className="cert-sidebar-title">Professional Recognition</h3>
            <p className="cert-recognition-text">
              IMETS Academy credentials are recognized and endorsed by leading
              organizations globally.
            </p>
            <ul className="cert-partners-list">
              {recognitionPartners.map((partner) => (
                <li key={partner.id} className="cert-partner-item">
                  <div
                    className={`cert-partner-logo cert-partner-logo-${
                      partner.logoVariant || "default"
                    }`}
                  />
                  <div className="cert-partner-info">
                    <span className="cert-partner-name">{partner.name}</span>
                    <span className="cert-partner-role">{partner.role}</span>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="#" className="cert-partners-link">
              LEARN MORE ABOUT OUR PARTNERS
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>

          <div className="cert-sidebar-card cert-excellence">
            <div className="cert-excellence-content">
              <h3 className="cert-excellence-title">Academic Excellence</h3>
              <p className="cert-excellence-text">
                You&apos;re in the top 5% of students this semester. Keep up the
                great work!
              </p>
              <Link
                href={ROUTES.STUDENT.TRANSCRIPT}
                className="cert-excellence-btn"
              >
                VIEW TRANSCRIPTS
              </Link>
            </div>
            <Star className="cert-excellence-star" strokeWidth={1.5} />
          </div>

          <div className="cert-sidebar-card cert-help">
            <h3 className="cert-sidebar-title cert-help-title">
              HELP & SUPPORT
            </h3>
            <ul className="cert-help-list">
              {helpSupportLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="cert-help-link">
                    {link.label}
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <ShareCredentialModal
        isOpen={!!shareModalCertificate}
        onClose={() => setShareModalCertificate(null)}
        credentialName={shareModalCertificate?.title ?? ""}
        credentialId={shareModalCertificate?.certificateId}
        credentialUrl={
          shareModalCertificate?.certificateId
            ? `https://imets.edu/verify/${encodeURIComponent(
                shareModalCertificate.certificateId
              )}`
            : undefined
        }
      />

      <footer className="cert-footer">
        <span className="cert-footer-copy">
          <GraduationCap className="cert-footer-cap" strokeWidth={2} />© 2023
          IMETS Academy. All rights reserved.
        </span>
        <div className="cert-footer-links">
          <Link href="#">Privacy Policy</Link>
          <span className="cert-footer-sep">·</span>
          <Link href="#">Terms of Service</Link>
          <span className="cert-footer-sep">·</span>
          <Link href="#">Student Code of Conduct</Link>
        </div>
      </footer>
    </div>
  );
}

function CertificateCard({
  certificate,
  onLinkedInClick,
}: {
  certificate: CertificateItem;
  onLinkedInClick: () => void;
}) {
  const isCompleted = certificate.status === "completed";

  if (isCompleted) {
    return (
      <div className="cert-card cert-card-completed">
        <div className="cert-card-image">
          <Award className="cert-card-image-icon" strokeWidth={1.5} />
        </div>
        <div className="cert-card-title-row">
          <h4 className="cert-card-title">{certificate.title}</h4>
          <span className="cert-card-check">
            <Check className="w-4 h-4" strokeWidth={2.5} />
          </span>
        </div>
        <p className="cert-card-date">{certificate.issuedDate}</p>
        <p className="cert-card-id">{certificate.certificateId}</p>
        <div className="cert-card-actions">
          <button type="button" className="cert-card-btn">
            <Download className="w-4 h-4" strokeWidth={2} />
            PDF
          </button>
          <button
            type="button"
            className="cert-card-btn"
            onClick={onLinkedInClick}
          >
            <Share2 className="w-4 h-4" strokeWidth={2} />
            LinkedIn
          </button>
          <button type="button" className="cert-card-btn">
            <Shield className="w-4 h-4" strokeWidth={2} />
            Verify
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cert-card cert-card-progress">
      <span className="cert-card-progress-tag">
        IN PROGRESS {certificate.progressPercent}% Complete
      </span>
      <h4 className="cert-card-title">{certificate.title}</h4>
      <p className="cert-card-desc">{certificate.description}</p>
      <div className="cert-card-progress-bar-wrap">
        <div className="cert-card-progress-bar">
          <div
            className="cert-card-progress-fill"
            style={{ width: `${certificate.progressPercent}%` }}
          />
        </div>
      </div>
      <div className="cert-card-status-list">
        <span className="cert-card-status cert-card-status-done">
          <Check className="w-4 h-4" strokeWidth={2.5} />
          {certificate.modulesPassed}
        </span>
        <span className="cert-card-status">
          <Circle className="w-4 h-4" strokeWidth={2} />
          {certificate.capstoneStatus}
        </span>
      </div>
      <Link
        href={certificate.courseId ? ROUTES.STUDENT.COURSES : "#"}
        className="cert-card-resume-btn"
      >
        RESUME COURSE
      </Link>
    </div>
  );
}
