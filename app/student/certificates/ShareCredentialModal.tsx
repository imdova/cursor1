"use client";

import "./share-credential-modal.css";
import {
  Shield,
  X,
  Info,
  Share2,
  Copy,
  GraduationCap,
  Smile,
  ImagePlus,
} from "lucide-react";

const DEFAULT_RECIPIENT_NAME = "Alex Thompson";
const DEFAULT_CREDENTIAL_ID = "IMETS-MBA-2024-8842-X";
const DEFAULT_CREDENTIAL_URL = "https://imets.edu/verify/alex-thompson-mba";
const DEFAULT_POST_MESSAGE =
  "I am proud to share that I have successfully completed the Strategic Leadership & Management MBA at IMETS Academy! This journey has been transformative for my career growth. #MBA #Leadership #IMETS";

export interface ShareCredentialModalProps {
  isOpen: boolean;
  onClose: () => void;
  credentialName: string;
  recipientName?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export function ShareCredentialModal({
  isOpen,
  onClose,
  credentialName,
  recipientName = DEFAULT_RECIPIENT_NAME,
  credentialId = DEFAULT_CREDENTIAL_ID,
  credentialUrl = DEFAULT_CREDENTIAL_URL,
}: ShareCredentialModalProps) {
  if (!isOpen) return null;

  const postMessage = DEFAULT_POST_MESSAGE.replace(
    "Strategic Leadership & Management MBA",
    credentialName
  );

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
  };

  return (
    <div className="share-credential-overlay" onClick={onClose}>
      <div
        className="share-credential-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Credential Preview */}
        <div className="share-credential-preview">
          <div className="share-credential-badge">
            <Shield className="share-credential-badge-icon" strokeWidth={2} />
            VERIFIED ACHIEVEMENT
          </div>
          <h2 className="share-credential-heading">Share Your Success</h2>
          <p className="share-credential-desc">
            Congratulations! Your &quot;{credentialName}&quot; credential is
            ready to be showcased to the world.
          </p>
          <div className="share-credential-card">
            <div className="share-credential-card-waves" />
            <div className="share-credential-card-body">
              <p className="share-credential-card-label">
                CERTIFICATE OF COMPLETION
              </p>
              <p className="share-credential-card-italic">
                This is to certify that
              </p>
              <p className="share-credential-card-name">{recipientName}</p>
              <p className="share-credential-card-text">
                has successfully completed the requirements for the
              </p>
              <p className="share-credential-card-credential">
                {credentialName}
              </p>
              <div className="share-credential-card-issuer">
                <GraduationCap
                  className="share-credential-card-issuer-icon"
                  strokeWidth={2}
                />
                IMETS ACADEMY
              </div>
            </div>
          </div>
          <p className="share-credential-verify-note">
            <Info className="share-credential-info-icon" strokeWidth={2} />
            This credential can be verified by employers via the IMETS public
            registry.
          </p>
        </div>

        {/* Right: Sharing Configuration */}
        <div className="share-credential-config">
          <button
            type="button"
            className="share-credential-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
          <h2 className="share-credential-config-heading">
            Sharing Configuration
          </h2>
          <p className="share-credential-config-sub">
            Share a post to your feed
          </p>
          <div className="share-credential-field">
            <textarea
              className="share-credential-textarea"
              rows={5}
              defaultValue={postMessage}
            />
            <div className="share-credential-textarea-actions">
              <button
                type="button"
                className="share-credential-icon-btn"
                aria-label="Emoji"
              >
                <Smile className="w-4 h-4" strokeWidth={2} />
              </button>
              <button
                type="button"
                className="share-credential-icon-btn"
                aria-label="Add media"
              >
                <ImagePlus className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>
          <div className="share-credential-field">
            <label className="share-credential-label">Credential ID</label>
            <div className="share-credential-input-wrap">
              <input
                type="text"
                className="share-credential-input"
                readOnly
                value={credentialId}
              />
              <button
                type="button"
                className="share-credential-copy-btn"
                onClick={() => handleCopy(credentialId)}
                aria-label="Copy"
              >
                <Copy className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>
          <div className="share-credential-field">
            <label className="share-credential-label">Credential URL</label>
            <div className="share-credential-input-wrap">
              <input
                type="text"
                className="share-credential-input"
                readOnly
                value={credentialUrl}
              />
              <button
                type="button"
                className="share-credential-copy-btn"
                onClick={() => handleCopy(credentialUrl)}
                aria-label="Copy"
              >
                <Copy className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>
          <button type="button" className="share-credential-linkedin-btn">
            <span className="share-credential-linkedin-logo">in</span>
            Add to LinkedIn Profile
          </button>
          <div className="share-credential-secondary-actions">
            <button type="button" className="share-credential-secondary-btn">
              <Share2 className="w-4 h-4" strokeWidth={2} />
              Post to Feed
            </button>
            <button
              type="button"
              className="share-credential-secondary-btn"
              onClick={onClose}
            >
              Skip
            </button>
          </div>
          <p className="share-credential-disclaimer">
            By clicking &quot;Add to Profile&quot;, you&apos;ll be redirected to
            LinkedIn to confirm the addition of this license to your
            professional profile.
          </p>
        </div>
      </div>
    </div>
  );
}
