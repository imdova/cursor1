"use client";

import "./transcripts.css";
import Link from "next/link";
import {
  FileText,
  Download,
  Share2,
  Send,
  Eye,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { ROUTES } from "@/constants";
import { transcriptsList, type TranscriptItem } from "./transcripts-data";

export default function AcademicTranscriptsPage() {
  return (
    <div className="at-page">
      <div className="at-header">
        <h1 className="at-title">Academic Transcripts</h1>
        <p className="at-subtitle">
          Find and manage your academic transcripts. View, download, or share
          your official records.
        </p>
      </div>

      <div className="at-list">
        {transcriptsList.map((transcript) => (
          <TranscriptCard key={transcript.id} transcript={transcript} />
        ))}
      </div>

      <div className="at-help">
        <p className="at-help-text">
          Need an official copy sent to an institution? Use &quot;Request
          Official Copy&quot; from any transcript, or contact the registrar.
        </p>
        <Link href={ROUTES.STUDENT.TRANSCRIPT} className="at-help-link">
          View full transcript
          <Eye className="w-4 h-4" strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
}

function TranscriptCard({ transcript }: { transcript: TranscriptItem }) {
  const viewHref = ROUTES.STUDENT.TRANSCRIPT;

  return (
    <div className="at-card">
      <div className="at-card-icon-wrap">
        {transcript.type === "full" && (
          <FileText className="at-card-icon" strokeWidth={2} />
        )}
        {transcript.type === "program" && (
          <GraduationCap className="at-card-icon" strokeWidth={2} />
        )}
        {transcript.type === "course" && (
          <BookOpen className="at-card-icon" strokeWidth={2} />
        )}
      </div>
      <div className="at-card-body">
        <h2 className="at-card-title">{transcript.title}</h2>
        <p className="at-card-subtitle">{transcript.subtitle}</p>
        <p className="at-card-meta">Issued: {transcript.issuedDate}</p>
        <div className="at-card-actions">
          <Link href={viewHref} className="at-btn at-btn-primary">
            <Eye className="w-4 h-4" strokeWidth={2} />
            View
          </Link>
          <Link
            href={`${ROUTES.STUDENT.TRANSCRIPT}#download`}
            className="at-btn at-btn-secondary"
          >
            <Download className="w-4 h-4" strokeWidth={2} />
            Download PDF
          </Link>
          <Link
            href={ROUTES.STUDENT.TRANSCRIPT}
            className="at-btn at-btn-secondary"
          >
            <Share2 className="w-4 h-4" strokeWidth={2} />
            Share
          </Link>
          <Link
            href={ROUTES.STUDENT.TRANSCRIPT}
            className="at-btn at-btn-secondary"
          >
            <Send className="w-4 h-4" strokeWidth={2} />
            Request Official Copy
          </Link>
        </div>
      </div>
    </div>
  );
}
