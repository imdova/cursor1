"use client";

import "./assignment-submission-modal.css";
import {
  Upload,
  Clock,
  MessageCircle,
  FileText,
  FileArchive,
  Send,
} from "lucide-react";
import { useRef, useState } from "react";
import type { AssignmentItem } from "./assignments-data";

interface AssignmentSubmissionModalProps {
  open: boolean;
  onClose: () => void;
  assignment: AssignmentItem | null;
  onSubmit?: () => void;
}

export function AssignmentSubmissionModal({
  open,
  onClose,
  assignment,
  onSubmit,
}: AssignmentSubmissionModalProps) {
  const [note, setNote] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const courseName =
    assignment?.courseName ?? assignment?.courseCode ?? "Assignment";
  const dueCountdown = assignment?.dueCountdown ?? "—";

  const handleSubmit = () => {
    onSubmit?.();
    onClose();
    setNote("");
    setConfirmed(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="asub-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="asub-title"
      onClick={handleBackdropClick}
    >
      <div className="asub-modal" onClick={(e) => e.stopPropagation()}>
        <div className="asub-header">
          <div>
            <h2 id="asub-title" className="asub-title">
              Assignment Submission
            </h2>
            <p className="asub-course">{courseName}</p>
          </div>
          <span className="asub-due">
            <Clock className="asub-due-icon" strokeWidth={2} />
            DUE IN {dueCountdown}
          </span>
        </div>

        {/* File upload */}
        <div className="asub-upload-section">
          <div
            className="asub-drop-zone"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="asub-upload-icon" strokeWidth={2} />
            <p className="asub-drop-text">Drag and drop your files here</p>
            <p className="asub-drop-sub">
              or{" "}
              <button
                type="button"
                className="asub-browse-link"
                onClick={() => fileInputRef.current?.click()}
              >
                browse files
              </button>{" "}
              from your computer
            </p>
            <input
              ref={fileInputRef}
              type="file"
              className="asub-file-input"
              multiple
              accept=".pdf,.doc,.docx,.zip"
              aria-hidden
            />
          </div>
          <div className="asub-file-tags">
            <span className="asub-tag">
              <FileText className="asub-tag-icon" strokeWidth={2} />
              PDF
            </span>
            <span className="asub-tag">
              <FileText className="asub-tag-icon" strokeWidth={2} />
              DOCX
            </span>
            <span className="asub-tag">
              <FileArchive className="asub-tag-icon" strokeWidth={2} />
              ZIP
            </span>
          </div>
        </div>

        {/* Submission note */}
        <div className="asub-note-section">
          <h3 className="asub-note-heading">
            <MessageCircle className="asub-note-icon" strokeWidth={2} />
            Submission Note
          </h3>
          <textarea
            className="asub-note-input"
            placeholder="Leave a message for the instructor regarding your submission..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
          />
        </div>

        {/* Academic integrity */}
        <label className="asub-checkbox-wrap">
          <input
            type="checkbox"
            className="asub-checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          <span className="asub-checkbox-text">
            I confirm that this assignment is my own{" "}
            <span className="asub-checkbox-highlight">original work</span> and
            adheres to the IMETS Academic Integrity policies and student
            handbook.
          </span>
        </label>

        {/* Actions */}
        <div className="asub-actions">
          <button type="button" className="asub-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="asub-submit"
            onClick={handleSubmit}
            disabled={!confirmed}
          >
            <Send className="asub-submit-icon" strokeWidth={2} />
            Submit Assignment
          </button>
        </div>
      </div>
    </div>
  );
}
