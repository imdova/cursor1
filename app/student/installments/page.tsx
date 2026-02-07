"use client";

import "./installments.css";
import Link from "next/link";
import {
  CreditCard,
  AlertCircle,
  Info,
  Clock,
  Check,
  FileText,
  HelpCircle,
  Plus,
  Bell,
  Settings,
} from "lucide-react";
import { ROUTES } from "@/constants";
import {
  enrolledCourseName,
  paymentsSummary,
  overdueReminder,
  paymentRoadmap,
  paymentMethods,
  quickLinks,
  type InstallmentItem,
} from "./installments-data";

export default function StudentInstallmentsPage() {
  return (
    <div className="inst-wrapper">
      {/* Header: logo, nav (Payments active), bell, gear, profile */}
      <header className="inst-header">
        <Link href={ROUTES.STUDENT.DASHBOARD} className="inst-logo">
          <div className="inst-logo-icon">M</div>
          <span className="inst-logo-text">IMETS Academy</span>
        </Link>
        <nav className="inst-nav">
          <Link href={ROUTES.STUDENT.DASHBOARD}>Dashboard</Link>
          <Link href={ROUTES.STUDENT.INSTALLMENTS} className="active">
            Payments
          </Link>
          <Link href={ROUTES.STUDENT.COURSES}>Courses</Link>
          <Link href={ROUTES.STUDENT.SCHEDULE}>Schedule</Link>
        </nav>
        <div className="inst-actions">
          <button
            type="button"
            className="inst-icon-btn"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" strokeWidth={2} />
          </button>
          <button type="button" className="inst-icon-btn" aria-label="Settings">
            <Settings className="w-5 h-5" strokeWidth={2} />
          </button>
          <Link
            href={ROUTES.STUDENT.PROFILE}
            className="inst-avatar"
            aria-label="Profile"
          >
            <span className="inst-avatar-inner">JR</span>
          </Link>
        </div>
      </header>

      <div className="inst-main">
        {/* Overdue banner */}
        {/* Enrolled course name */}
        <div className="inst-course-name">
          <span className="inst-course-label">Fees for</span>
          <h1 className="inst-course-title">{enrolledCourseName}</h1>
        </div>

        {overdueReminder.show && (
          <div className="inst-overdue">
            <AlertCircle className="inst-overdue-icon" strokeWidth={2} />
            <div className="inst-overdue-text">
              <h2 className="inst-overdue-title">Overdue Payment Reminder</h2>
              <p className="inst-overdue-desc">{overdueReminder.description}</p>
            </div>
            <Link href={ROUTES.STUDENT.CHECKOUT} className="inst-pay-now-btn">
              Pay Now
            </Link>
          </div>
        )}

        {/* Summary cards: Total Fee, Total Paid, Total Remaining, Next Installment */}
        <div className="inst-summary inst-summary-four">
          <div className="inst-card">
            <div className="inst-card-label">Total Fee</div>
            <p className="inst-card-value">${paymentsSummary.totalFee}</p>
            <p className="inst-card-note">
              <Info className="w-4 h-4 shrink-0" strokeWidth={2} />
              {paymentsSummary.semesterLabel}
            </p>
          </div>
          <div className="inst-card">
            <div className="inst-card-label">Total Paid</div>
            <p className="inst-card-value inst-card-value-green">
              ${paymentsSummary.totalPaid}
            </p>
            <div className="inst-progress-wrap">
              <div className="inst-progress-bar">
                <div
                  className="inst-progress-fill"
                  style={{ width: `${paymentsSummary.percentComplete}%` }}
                />
              </div>
              <p className="inst-progress-text">
                {paymentsSummary.percentComplete}% Complete
              </p>
            </div>
          </div>
          <div className="inst-card">
            <div className="inst-card-label">Total Remaining</div>
            <p className="inst-card-value">${paymentsSummary.totalRemaining}</p>
            <p className="inst-card-note">Amount left to pay</p>
          </div>
          <div className="inst-card">
            <div className="inst-card-label">Next Installment</div>
            <p className="inst-card-value">
              ${paymentsSummary.nextInstallment.amount}
            </p>
            <p className="inst-card-note inst-card-note-clock">
              <Clock
                className="w-4 h-4 shrink-0 inst-clock-icon"
                strokeWidth={2}
              />
              {paymentsSummary.nextInstallment.title} due{" "}
              {paymentsSummary.nextInstallment.dueDate} (
              {paymentsSummary.nextInstallment.dueInDays} days)
            </p>
          </div>
        </div>

        <div className="inst-content-wrap">
          {/* Left: Payment Roadmap */}
          <section className="inst-roadmap">
            <h2 className="inst-roadmap-title">Payment Roadmap</h2>
            <p className="inst-roadmap-subtitle">
              Detailed schedule of your course installments
            </p>
            <div className="inst-timeline">
              {paymentRoadmap.map((item) => (
                <RoadmapItem key={item.id} item={item} />
              ))}
            </div>
          </section>

          {/* Right: Sidebar */}
          <aside className="inst-sidebar">
            <div className="inst-sidebar-card">
              <div className="inst-sidebar-card-head">
                <h3 className="inst-sidebar-title">Payment Methods</h3>
                <Link
                  href={ROUTES.STUDENT.PAYMENT_METHODS}
                  className="inst-manage-link"
                >
                  Manage
                </Link>
              </div>
              <ul className="inst-methods-list">
                {paymentMethods.map((method) => (
                  <li key={method.id} className="inst-method-item">
                    <CreditCard
                      className="w-5 h-5 inst-method-icon"
                      strokeWidth={2}
                    />
                    <div className="inst-method-info">
                      <span className="inst-method-label">{method.label}</span>
                      <span className="inst-method-exp">
                        EXPIRES {method.expires}
                      </span>
                    </div>
                    {method.isPrimary && (
                      <span className="inst-method-dot" title="Primary" />
                    )}
                  </li>
                ))}
              </ul>
              <Link
                href={ROUTES.STUDENT.PAYMENT_METHODS}
                className="inst-add-method-btn"
              >
                <Plus className="w-4 h-4" strokeWidth={2} />
                Add New Method
              </Link>
            </div>

            <div className="inst-sidebar-card">
              <h3 className="inst-sidebar-title">Quick Links</h3>
              <ul className="inst-quick-links">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="inst-quick-link">
                      <FileText className="w-4 h-4" strokeWidth={2} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="inst-help-card">
              <h3 className="inst-help-title">
                <HelpCircle className="w-5 h-5" strokeWidth={2} />
                Need help with fees?
              </h3>
              <p className="inst-help-text">
                Talk to our financial advisor regarding installment plans or
                scholarship adjustments.
              </p>
              <Link href="#" className="inst-chat-link">
                Chat with support
              </Link>
            </div>
          </aside>
        </div>

        <footer className="inst-footer">
          <p className="inst-footer-copy">
            © 2024 IMETS Academy. All student financial records are encrypted
            and secure.
          </p>
          <div className="inst-footer-links">
            <Link href="#">Terms of Service</Link>
            <span className="inst-footer-sep">|</span>
            <Link href="#">Privacy Policy</Link>
            <span className="inst-footer-sep">|</span>
            <Link href="#">Payment Security</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

function RoadmapItem({ item }: { item: InstallmentItem }) {
  const isPaid = item.status === "paid";
  const isOverdue = item.status === "overdue";
  const isDue = item.status === "due";
  const isUpcoming = item.status === "upcoming";

  return (
    <div
      className={`inst-roadmap-item inst-roadmap-item-${item.status}${
        item.status === "overdue" ? " inst-roadmap-item-overdue" : ""
      }`}
    >
      <div className="inst-roadmap-icon-wrap">
        {isPaid && (
          <Check className="w-5 h-5 inst-roadmap-icon paid" strokeWidth={2} />
        )}
        {isOverdue && (
          <AlertCircle
            className="w-5 h-5 inst-roadmap-icon overdue"
            strokeWidth={2}
          />
        )}
        {(isDue || isUpcoming) && (
          <Clock
            className={`w-5 h-5 inst-roadmap-icon ${
              isDue ? "due" : "upcoming"
            }`}
            strokeWidth={2}
          />
        )}
      </div>
      <div className="inst-roadmap-body">
        <div className="inst-roadmap-head">
          <h4 className="inst-roadmap-item-title">{item.title}</h4>
          <span className="inst-roadmap-amount">${item.amount}</span>
        </div>
        <p className="inst-roadmap-date">{item.dateLabel}</p>
        <div className="inst-roadmap-actions">
          {isPaid && <span className="inst-badge paid">Paid</span>}
          {isOverdue && (
            <Link
              href={ROUTES.STUDENT.CHECKOUT}
              className="inst-btn inst-btn-pay-immediately"
            >
              Pay immediately
            </Link>
          )}
          {isDue && (
            <button type="button" className="inst-btn extension">
              Request Extension
            </button>
          )}
          {isUpcoming && <span className="inst-badge upcoming">Upcoming</span>}
        </div>
      </div>
    </div>
  );
}
