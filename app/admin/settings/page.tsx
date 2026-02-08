"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Info,
  Globe,
  Search,
  Wrench,
  Upload,
  Settings,
  Palette,
  Puzzle,
  Shield,
  Code2,
  GitBranch,
  User,
  FolderOpen,
  ImageIcon,
  Eye,
  EyeOff,
  Pencil,
  Plus,
  Save,
  TrendingUp,
  GraduationCap,
  Landmark,
  Rocket,
  Video,
  Lock,
  MessageCircle,
  BarChart3,
  Building2,
  Share2,
  Key,
  FileText,
  Monitor,
  Sliders,
  RefreshCw,
  Check,
  X,
  Link2,
  CreditCard,
  AlertTriangle,
  Copy,
  Sparkles,
  Star,
  Box,
  ArrowRight,
  ExternalLink,
  Zap,
  MoreHorizontal,
  Clock,
  ShieldCheck,
  Cloud,
  CloudUpload,
  Database,
  LayoutGrid,
  Calendar,
  Trash2,
  Download,
  RotateCcw,
} from "lucide-react";
import "./settings.css";

type TabId =
  | "general"
  | "branding"
  | "integrations"
  | "marketing-analytics"
  | "security"
  | "maintenance"
  | "api-access"
  | "webhooks";

const SITE_MANAGEMENT: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "general", label: "General", icon: <Settings className="asg-sidebar-icon" /> },
  { id: "branding", label: "Branding", icon: <Palette className="asg-sidebar-icon" /> },
  { id: "integrations", label: "Integrations", icon: <Puzzle className="asg-sidebar-icon" /> },
  { id: "marketing-analytics", label: "Marketing & Analytics", icon: <TrendingUp className="asg-sidebar-icon" /> },
  { id: "security", label: "Security", icon: <Shield className="asg-sidebar-icon" /> },
  { id: "maintenance", label: "Maintenance", icon: <Wrench className="asg-sidebar-icon" /> },
];

const ADVANCED: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "api-access", label: "API Access", icon: <Code2 className="asg-sidebar-icon" /> },
  { id: "webhooks", label: "Webhooks", icon: <GitBranch className="asg-sidebar-icon" /> },
];

const ALL_TABS = [...SITE_MANAGEMENT, ...ADVANCED];

const SEO_TITLE_MAX = 60;

type IntegrationStatus = "connected" | "not_configured";

interface IntegrationItem {
  id: string;
  title: string;
  description: string;
  status: IntegrationStatus;
  iconColor: string;
  Icon: React.ComponentType<{ className?: string }>;
}

interface IntegrationCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: IntegrationItem[];
}

const INTEGRATION_CATEGORIES: IntegrationCategory[] = [
  {
    id: "marketing",
    title: "MARKETING & ANALYTICS",
    icon: <TrendingUp className="asg-int-section-icon" />,
    items: [
      { id: "fb-pixel", title: "Facebook Pixel", description: "Track conversion and optimize ad performance.", status: "connected", iconColor: "#1877f2", Icon: Share2 },
      { id: "ga", title: "Google Analytics", description: "In-depth website traffic and user behavior data.", status: "connected", iconColor: "#ea4335", Icon: BarChart3 },
      { id: "webmaster", title: "Webmaster Tools", description: "Monitor and maintain your site's presence in search results.", status: "not_configured", iconColor: "#dc2626", Icon: Search },
    ],
  },
  {
    id: "operations",
    title: "ACADEMY OPERATIONS",
    icon: <GraduationCap className="asg-int-section-icon" />,
    items: [
      { id: "zoom", title: "Zoom Classes", description: "Schedule and manage live interactive sessions.", status: "connected", iconColor: "#2563eb", Icon: Video },
      { id: "vdocipher", title: "VdoCipher", description: "High-security DRM video hosting for courses.", status: "connected", iconColor: "#ea580c", Icon: Lock },
      { id: "whatsapp", title: "WhatsApp API", description: "Automated notifications and student messaging.", status: "connected", iconColor: "#22c55e", Icon: MessageCircle },
    ],
  },
  {
    id: "financial",
    title: "FINANCIAL",
    icon: <Landmark className="asg-int-section-icon" />,
    items: [
      { id: "payment", title: "Payment Gateway", description: "Process payments and manage transactions.", status: "connected", iconColor: "#2563eb", Icon: Building2 },
    ],
  },
  {
    id: "optimization",
    title: "OPTIMIZATION",
    icon: <Rocket className="asg-int-section-icon" />,
    items: [
      { id: "seo", title: "Advanced SEO Tools", description: "Improve search visibility and rankings.", status: "not_configured", iconColor: "#7c3aed", Icon: Search },
    ],
  },
];

function SettingsContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as TabId | null;
  const tab: TabId =
    tabParam && ALL_TABS.some((t) => t.id === tabParam) ? tabParam : "general";

  const [academyName, setAcademyName] = useState("IMETS Global Academy");
  const [supportEmail, setSupportEmail] = useState("support@imets.academy");
  const [physicalAddress, setPhysicalAddress] = useState(
    "1200 Innovation Drive, Suite 400\nSilicon Valley, CA 94025\nUnited States"
  );
  const [timezone, setTimezone] = useState("(GMT-08:00) Pacific Time");
  const [language, setLanguage] = useState("English (US)");
  const [currency, setCurrency] = useState("USD ($)");
  const [seoTitle, setSeoTitle] = useState("IMETS Academy | CRM & LMS Portal");
  const [metaDescription, setMetaDescription] = useState(
    "The all-in-one education management system for professional trainers and global academies."
  );
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [debugLogging, setDebugLogging] = useState(false);

  const [primaryBrandColor, setPrimaryBrandColor] = useState("#1111D4");
  const [secondaryAccentColor, setSecondaryAccentColor] = useState("#FBBF24");
  const [systemHighlightColor, setSystemHighlightColor] = useState("#22C55E");
  const [headingFont, setHeadingFont] = useState("Spline Sans (Default)");
  const [bodyFont, setBodyFont] = useState("Spline Sans (Default)");
  const [uiBorderRadius, setUiBorderRadius] = useState<"square" | "modern" | "soft" | "round">("modern");
  const [heroImageFileName, setHeroImageFileName] = useState<string | null>("academy_hero_main.jpg");

  const [integrationSearch, setIntegrationSearch] = useState("");
  const [integrationModalId, setIntegrationModalId] = useState<string | null>(null);

  /* VdoCipher modal */
  const [vdoApiSecret, setVdoApiSecret] = useState("••••••••••••");
  const [vdoSecretVisible, setVdoSecretVisible] = useState(false);
  const [vdoFolderId, setVdoFolderId] = useState("imets_main_vids");
  const [vdoWatermark, setVdoWatermark] = useState(true);
  const [vdoScreenRec, setVdoScreenRec] = useState(true);
  const [vdoDomain, setVdoDomain] = useState(true);
  const [vdoAccentColor, setVdoAccentColor] = useState("");
  const [vdoResuming, setVdoResuming] = useState("");

  /* Payment modal */
  const [paymentProvider, setPaymentProvider] = useState<"stripe" | "paypal" | "fawry" | "paymob">("stripe");
  const [paymentEnvTest, setPaymentEnvTest] = useState(true);
  const [paymentPublishable, setPaymentPublishable] = useState("pk_test_51Mz...");
  const [paymentSecret, setPaymentSecret] = useState("••••••••••••");
  const [paymentSecretVisible, setPaymentSecretVisible] = useState(false);
  const [paymentWebhook, setPaymentWebhook] = useState("whsec_...");

  /* WhatsApp modal */
  const [waBusinessId, setWaBusinessId] = useState("");
  const [waToken, setWaToken] = useState("EAAB...");
  const [waTokenVisible, setWaTokenVisible] = useState(false);
  const [waCountry, setWaCountry] = useState("+966");
  const [waPhone, setWaPhone] = useState("50 123 4567");
  const [waReadReceipts, setWaReadReceipts] = useState(true);
  const [waAdminNotif, setWaAdminNotif] = useState(false);

  /* Zoom modal */
  const [zoomAutoRecord, setZoomAutoRecord] = useState(true);
  const [zoomWaitingRoom, setZoomWaitingRoom] = useState(false);
  const [zoomMuteOnEntry, setZoomMuteOnEntry] = useState(true);

  /* Search Console / Webmaster modal */
  const [searchConsoleVerificationTab, setSearchConsoleVerificationTab] = useState<"html" | "dns">("html");
  const [searchConsoleSearchInsights, setSearchConsoleSearchInsights] = useState(true);
  const searchConsoleMetaTag = '<meta name="google-site-verification" content="IMETS_ACADEMY_CRM_882">';

  /* GA4 integration modal */
  const [ga4ModalMeasurementId, setGa4ModalMeasurementId] = useState("");
  const [ga4Scrolls, setGa4Scrolls] = useState(true);
  const [ga4SiteSearch, setGa4SiteSearch] = useState(false);
  const [ga4OutboundClicks, setGa4OutboundClicks] = useState(true);
  const [ga4Ecommerce, setGa4Ecommerce] = useState(true);
  const [ga4CustomScript, setGa4CustomScript] = useState("");

  /* Meta Pixel / Facebook modal */
  const [metaPixelModalId, setMetaPixelModalId] = useState("");
  const [metaPixelModalCapiToken, setMetaPixelModalCapiToken] = useState("");
  const [metaPixelEventLeadForm, setMetaPixelEventLeadForm] = useState(true);
  const [metaPixelEventCoursePurchase, setMetaPixelEventCoursePurchase] = useState(true);
  const [metaPixelEventLmsLogin, setMetaPixelEventLmsLogin] = useState(false);
  const [metaPixelEventViewContent, setMetaPixelEventViewContent] = useState(false);

  /* Marketing & Analytics */
  const [ga4MeasurementId, setGa4MeasurementId] = useState("");
  const [ga4EnhancedMeasurement, setGa4EnhancedMeasurement] = useState(true);
  const [ga4UserIdTracking, setGa4UserIdTracking] = useState(false);
  const [ga4EcommerceTracking, setGa4EcommerceTracking] = useState(true);
  const [ga4CustomScripts, setGa4CustomScripts] = useState("");
  const [metaPixelId, setMetaPixelId] = useState("123456789012345");
  const [metaCapiToken, setMetaCapiToken] = useState("EAAB...");
  const [metaEventCoursePurchase, setMetaEventCoursePurchase] = useState(true);
  const [metaEventLeadSignup, setMetaEventLeadSignup] = useState(true);
  const [metaEventAddToCart, setMetaEventAddToCart] = useState(false);
  const [metaEventViewContent, setMetaEventViewContent] = useState(true);
  const [cookieBannerEnabled, setCookieBannerEnabled] = useState(true);
  const [cookiePrivacyUrl, setCookiePrivacyUrl] = useState("https://imetsacademy.com/privacy-policy");
  const [cookieConsentDays, setCookieConsentDays] = useState("365");

  /* Security & Privacy Hub */
  const [securityEnforce2FA, setSecurityEnforce2FA] = useState(true);
  const [securityAuthApp, setSecurityAuthApp] = useState(true);
  const [securityEmailOtp, setSecurityEmailOtp] = useState(true);
  const [securitySmsCode, setSecuritySmsCode] = useState(false);
  const [securityMinPasswordLength, setSecurityMinPasswordLength] = useState("12");
  const [securityPasswordExpiry, setSecurityPasswordExpiry] = useState("90");
  const [securityMandatoryUppercase, setSecurityMandatoryUppercase] = useState(true);
  const [securityMandatoryNumbers, setSecurityMandatoryNumbers] = useState(true);
  const [securityMandatorySymbols, setSecurityMandatorySymbols] = useState(true);
  const [securityPreventConcurrent, setSecurityPreventConcurrent] = useState(false);
  const [securityIdleTimeout, setSecurityIdleTimeout] = useState("30");
  const [securityLeadDataDeletion, setSecurityLeadDataDeletion] = useState("12");
  const [securityPrivacyPolicyUrl, setSecurityPrivacyPolicyUrl] = useState("https://imets.academy/privacy-policy");

  /* Maintenance & Backup Hub */
  const [maintBackupScheduleTab, setMaintBackupScheduleTab] = useState<"daily" | "weekly" | "monthly">("daily");
  const [maintAutoSecurityPatches, setMaintAutoSecurityPatches] = useState(true);
  const [maintMaintenanceMode, setMaintMaintenanceMode] = useState(false);
  const [maintScheduleDateTime, setMaintScheduleDateTime] = useState("");

  /* API Access & Webhooks (UI state only) */
  const [apiKeys] = useState([{ id: "1", name: "Production API", prefix: "imets_live_••••••••", created: "Jan 15, 2024", lastUsed: "2 hours ago" }, { id: "2", name: "Development", prefix: "imets_test_••••••••", created: "Dec 1, 2023", lastUsed: "1 week ago" }]);
  const [webhookEndpoints] = useState([{ id: "1", url: "https://api.myapp.com/webhooks/imets", events: "enrollment.completed, payment.succeeded", status: "active", lastDelivery: "5 min ago" }, { id: "2", url: "https://hooks.slack.com/services/xxx", events: "course.published", status: "inactive", lastDelivery: "Never" }]);

  const seoTitleLength = seoTitle.length;

  const filteredIntegrationCategories = INTEGRATION_CATEGORIES.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.title.toLowerCase().includes(integrationSearch.toLowerCase()) ||
        item.description.toLowerCase().includes(integrationSearch.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="asg-root">
      {/* Top Header */}
      <header className="asg-header">
        <div className="asg-header-left">
          <span className="asg-header-logo">IMETS Academy</span>
          <span className="asg-header-subtitle">CRM/LMS Admin Console</span>
        </div>
        <div className="asg-header-right">
          <div className="asg-header-user">
            <span className="asg-header-user-name">Admin User</span>
            <span className="asg-header-user-role">Super Administrator</span>
          </div>
          <div className="asg-header-avatar" aria-hidden>
            <User className="w-5 h-5" />
          </div>
          {(tab === "general" || tab === "branding" || tab === "integrations" || tab === "marketing-analytics" || tab === "security" || tab === "maintenance" || tab === "api-access" || tab === "webhooks") && (
            <button
              type={tab === "general" ? "submit" : "button"}
              form={tab === "general" ? "asg-general-form" : undefined}
              className="asg-header-save"
              onClick={tab === "branding" || tab === "integrations" || tab === "marketing-analytics" || tab === "security" || tab === "maintenance" || tab === "api-access" || tab === "webhooks" ? () => {} : undefined}
            >
              Save Changes
            </button>
          )}
        </div>
      </header>

      <div className="asg-body">
        {/* Left Sidebar */}
        <aside className="asg-sidebar">
          <div className="asg-sidebar-section">
            <div className="asg-sidebar-label">SITE MANAGEMENT</div>
            <nav className="asg-sidebar-nav">
              {SITE_MANAGEMENT.map((item) => (
                <Link
                  key={item.id}
                  href={`/admin/settings?tab=${item.id}`}
                  className={`asg-sidebar-link ${tab === item.id ? "active" : ""}`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="asg-sidebar-section">
            <div className="asg-sidebar-label">ADVANCED</div>
            <nav className="asg-sidebar-nav">
              {ADVANCED.map((item) => (
                <Link
                  key={item.id}
                  href={`/admin/settings?tab=${item.id}`}
                  className={`asg-sidebar-link ${tab === item.id ? "active" : ""}`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="asg-main">
          {tab === "general" && (
            <form id="asg-general-form" onSubmit={handleSaveGeneral}>
              <h1 className="asg-main-title">General Settings</h1>
              <p className="asg-main-subtitle">
                Manage your academy&apos;s core information and regional preferences.
              </p>

              {/* Academy Details */}
              <div className="asg-card">
                <div className="asg-card-head">
                  <div className="asg-card-icon">
                    <Info className="w-5 h-5" />
                  </div>
                  <h2 className="asg-card-title">Academy Details</h2>
                </div>
                <div className="asg-card-body">
                  <div className="asg-field">
                    <label htmlFor="gs-academy-name" className="asg-field-label">
                      Academy Name
                    </label>
                    <input
                      id="gs-academy-name"
                      type="text"
                      className="asg-field-input"
                      value={academyName}
                      onChange={(e) => setAcademyName(e.target.value)}
                    />
                    <p className="asg-field-hint">
                      This name will be displayed in emails and browser tabs.
                    </p>
                  </div>
                  <div className="asg-field">
                    <label htmlFor="gs-support-email" className="asg-field-label">
                      Support Email
                    </label>
                    <input
                      id="gs-support-email"
                      type="email"
                      className="asg-field-input"
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                    />
                    <p className="asg-field-hint">
                      Primary contact for student inquiries and system alerts.
                    </p>
                  </div>
                  <div className="asg-field">
                    <label htmlFor="gs-address" className="asg-field-label">
                      Physical Address
                    </label>
                    <textarea
                      id="gs-address"
                      rows={4}
                      className="asg-field-textarea"
                      value={physicalAddress}
                      onChange={(e) => setPhysicalAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Regional Settings */}
              <div className="asg-card">
                <div className="asg-card-head">
                  <div className="asg-card-icon">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h2 className="asg-card-title">Regional Settings</h2>
                </div>
                <div className="asg-card-body">
                  <div className="asg-field">
                    <label htmlFor="gs-timezone" className="asg-field-label">
                      Timezone
                    </label>
                    <select
                      id="gs-timezone"
                      className="asg-field-select"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                    >
                      <option>(GMT-08:00) Pacific Time</option>
                      <option>(GMT-05:00) Eastern Time</option>
                      <option>(GMT+00:00) UTC</option>
                      <option>(GMT+01:00) Central European Time</option>
                    </select>
                  </div>
                  <div className="asg-field">
                    <label htmlFor="gs-language" className="asg-field-label">
                      Language
                    </label>
                    <select
                      id="gs-language"
                      className="asg-field-select"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option>English (US)</option>
                      <option>English (UK)</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  <div className="asg-field">
                    <label htmlFor="gs-currency" className="asg-field-label">
                      Currency
                    </label>
                    <select
                      id="gs-currency"
                      className="asg-field-select"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Site Meta & SEO */}
              <div className="asg-card">
                <div className="asg-card-head">
                  <div className="asg-card-icon">
                    <Search className="w-5 h-5" />
                  </div>
                  <h2 className="asg-card-title">Site Meta & SEO</h2>
                </div>
                <div className="asg-card-body">
                  <div className="asg-field">
                    <label className="asg-field-label">Site Favicon</label>
                    <div className="asg-upload-zone" role="button" tabIndex={0}>
                      <Upload className="asg-upload-icon" />
                      <p className="asg-upload-text">Click to upload</p>
                      <p className="asg-upload-spec">PNG, ICO up to 1MB</p>
                    </div>
                  </div>
                  <div className="asg-field">
                    <label htmlFor="gs-seo-title" className="asg-field-label">
                      SEO Title
                    </label>
                    <div className="asg-inline-label">
                      <input
                        id="gs-seo-title"
                        type="text"
                        maxLength={SEO_TITLE_MAX}
                        className="asg-field-input"
                        value={seoTitle}
                        onChange={(e) => setSeoTitle(e.target.value)}
                      />
                      <span className="asg-seo-counter">
                        {seoTitleLength} / {SEO_TITLE_MAX}
                      </span>
                    </div>
                    <p className="asg-field-hint">
                      Recommended length: 50-60 characters.
                    </p>
                  </div>
                  <div className="asg-field">
                    <label htmlFor="gs-meta-desc" className="asg-field-label">
                      Meta Description
                    </label>
                    <textarea
                      id="gs-meta-desc"
                      rows={3}
                      className="asg-field-textarea"
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Quick System Toggles */}
              <div className="asg-card">
                <div className="asg-card-head">
                  <div className="asg-card-icon">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <h2 className="asg-card-title">Quick System Toggles</h2>
                </div>
                <div className="asg-card-body">
                  <div className="asg-toggle-row">
                    <div>
                      <p className="asg-toggle-label">Enable Maintenance Mode</p>
                      <p className="asg-toggle-hint">
                        Show a placeholder page to all visitors except admins.
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={maintenanceMode}
                      className={`asg-toggle-switch ${maintenanceMode ? "on" : ""}`}
                      onClick={() => setMaintenanceMode((v) => !v)}
                    />
                  </div>
                  <div className="asg-toggle-row">
                    <div>
                      <p className="asg-toggle-label">Allow Student Registration</p>
                      <p className="asg-toggle-hint">
                        Enable public sign-up for new students.
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={allowRegistration}
                      className={`asg-toggle-switch ${allowRegistration ? "on" : ""}`}
                      onClick={() => setAllowRegistration((v) => !v)}
                    />
                  </div>
                  <div className="asg-toggle-row">
                    <div>
                      <p className="asg-toggle-label">Debug Logging</p>
                      <p className="asg-toggle-hint">
                        Record system errors and activity for troubleshooting.
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={debugLogging}
                      className={`asg-toggle-switch ${debugLogging ? "on" : ""}`}
                      onClick={() => setDebugLogging((v) => !v)}
                    />
                  </div>
                </div>
              </div>

              <div className="asg-form-actions">
                <button type="submit" className="asg-header-save">
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {tab === "branding" && (
            <div className="asg-brand-wrap">
              <nav className="asg-brand-breadcrumb" aria-label="Breadcrumb">
                <Link href="/admin/settings?tab=general">Settings</Link>
                <span className="asg-brand-breadcrumb-sep">&gt;</span>
                <span className="asg-brand-breadcrumb-current">Branding & Theme Hub</span>
              </nav>
              <div className="asg-brand-head">
                <div>
                  <h1 className="asg-brand-title">Branding & Theme Hub</h1>
                  <p className="asg-brand-desc">
                    Manage your academy&apos;s visual identity, logos, and custom theme parameters.
                  </p>
                </div>
                <div className="asg-brand-actions">
                  <button type="button" className="asg-brand-btn asg-brand-btn-discard">
                    Discard
                  </button>
                  <button type="button" className="asg-header-save">Save Changes</button>
                </div>
              </div>
              <div className="asg-brand-layout">
                <div className="asg-brand-columns">
                  <div className="asg-brand-col">
                    <h2 className="asg-brand-section-title">
                      <FolderOpen className="asg-brand-section-icon" />
                      Visual Assets
                    </h2>
                    <div className="asg-brand-card">
                      <h3 className="asg-brand-card-label">Primary Logo (Light Mode)</h3>
                      <div className="asg-brand-upload asg-brand-upload--large">
                        <Upload className="asg-brand-upload-icon" />
                        <span className="asg-brand-upload-text">Upload primary logo</span>
                        <span className="asg-brand-upload-spec">Recommended 400x120px, PNG or SVG</span>
                      </div>
                    </div>
                    <div className="asg-brand-card">
                      <h3 className="asg-brand-card-label">Secondary Logo (Dark Mode)</h3>
                      <div className="asg-brand-upload asg-brand-upload--browse">
                        <ImageIcon className="asg-brand-upload-icon" />
                        <span className="asg-brand-upload-text">Click to browse</span>
                      </div>
                    </div>
                    <div className="asg-brand-card">
                      <h3 className="asg-brand-card-label">Default Hero Image</h3>
                      <div className="asg-brand-hero">
                        {heroImageFileName ? (
                          <>
                            <div className="asg-brand-hero-preview" />
                            <div className="asg-brand-hero-meta">
                              <span className="asg-brand-hero-filename">{heroImageFileName}</span>
                              <button type="button" className="asg-brand-hero-remove" onClick={() => setHeroImageFileName(null)}>Remove</button>
                            </div>
                          </>
                        ) : (
                          <div className="asg-brand-upload asg-brand-upload--hero" role="button" tabIndex={0} onClick={() => setHeroImageFileName("academy_hero_main.jpg")}>
                            <Upload className="asg-brand-upload-icon" />
                            <span className="asg-brand-upload-text">Upload hero image</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="asg-brand-col">
                    <h2 className="asg-brand-section-title">
                      <Palette className="asg-brand-section-icon" />
                      Theme Customization
                    </h2>
                    <div className="asg-brand-card">
                      <h3 className="asg-brand-card-label">Primary Brand Color</h3>
                      <div className="asg-brand-color-wrap">
                        <span className="asg-brand-color-swatch" style={{ background: primaryBrandColor }} aria-hidden />
                        <input type="text" className="asg-brand-color-input" value={primaryBrandColor} onChange={(e) => setPrimaryBrandColor(e.target.value)} />
                        <Pencil className="asg-brand-color-edit" aria-hidden />
                      </div>
                    </div>
                    <div className="asg-brand-card">
                      <h3 className="asg-brand-card-label">Secondary Accent Color</h3>
                      <div className="asg-brand-color-wrap">
                        <span className="asg-brand-color-swatch" style={{ background: secondaryAccentColor }} aria-hidden />
                        <input type="text" className="asg-brand-color-input" value={secondaryAccentColor} onChange={(e) => setSecondaryAccentColor(e.target.value)} />
                        <Pencil className="asg-brand-color-edit" aria-hidden />
                      </div>
                    </div>
                    <div className="asg-brand-card">
                      <h3 className="asg-brand-card-label">System Highlight</h3>
                      <div className="asg-brand-color-wrap">
                        <span className="asg-brand-color-swatch" style={{ background: systemHighlightColor }} aria-hidden />
                        <input type="text" className="asg-brand-color-input" value={systemHighlightColor} onChange={(e) => setSystemHighlightColor(e.target.value)} />
                        <Pencil className="asg-brand-color-edit" aria-hidden />
                      </div>
                    </div>
                    <div className="asg-brand-card">
                      <h3 className="asg-brand-card-label">Heading Font Family</h3>
                      <select className="asg-field-select asg-brand-select" value={headingFont} onChange={(e) => setHeadingFont(e.target.value)}>
                        <option>Spline Sans (Default)</option>
                        <option>Inter</option>
                        <option>Roboto</option>
                      </select>
                    </div>
                    <div className="asg-brand-card">
                      <h3 className="asg-brand-card-label">Body Font Family</h3>
                      <select className="asg-field-select asg-brand-select" value={bodyFont} onChange={(e) => setBodyFont(e.target.value)}>
                        <option>Spline Sans (Default)</option>
                        <option>Inter</option>
                        <option>Roboto</option>
                      </select>
                    </div>
                    <div className="asg-brand-card">
                      <h3 className="asg-brand-card-label">UI Border Radius</h3>
                      <div className="asg-brand-segmented">
                        {(["square", "modern", "soft", "round"] as const).map((opt) => (
                          <button type="button" key={opt} className={`asg-brand-segmented-btn ${uiBorderRadius === opt ? "asg-brand-segmented-btn--on" : ""}`} onClick={() => setUiBorderRadius(opt)}>
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <aside className="asg-brand-preview-col">
                  <h2 className="asg-brand-section-title">
                    <Eye className="asg-brand-section-icon" />
                    Real-time Preview
                  </h2>
                  <div className="asg-brand-preview-device">
                    <div className="asg-brand-preview-dots">
                      <span className="asg-brand-dot asg-brand-dot--red" />
                      <span className="asg-brand-dot asg-brand-dot--yellow" />
                      <span className="asg-brand-dot asg-brand-dot--green" />
                    </div>
                    <p className="asg-brand-preview-title">STUDENT DASHBOARD</p>
                    <div className="asg-brand-preview-sidebar" />
                    <div className="asg-brand-preview-header" style={{ background: primaryBrandColor }} />
                    <div className="asg-brand-preview-content">
                      <div className="asg-brand-preview-line" />
                      <div className="asg-brand-preview-line asg-brand-preview-line--short" />
                      <div className="asg-brand-preview-block" />
                      <div className="asg-brand-preview-line" />
                      <div className="asg-brand-preview-line asg-brand-preview-line--short" />
                    </div>
                    <div className="asg-brand-preview-bar" style={{ background: secondaryAccentColor }} />
                    <div className="asg-brand-preview-fab" style={{ background: primaryBrandColor }}>
                      <Plus className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="asg-brand-preview-label">Desktop Preview</p>
                  <button type="button" className="asg-brand-preview-change">Change View</button>
                </aside>
              </div>
              <div className="asg-brand-footer-bar">
                <span className="asg-brand-staged">
                  <span className="asg-brand-staged-dot" aria-hidden />
                  ALL CHANGES STAGED
                </span>
                <span className="asg-brand-version">IMETS Academy © 2024. Brand Management System v2.4.0</span>
              </div>
            </div>
          )}

          {tab === "integrations" && (
            <div className="asg-int-wrap">
              <nav className="asg-int-breadcrumb" aria-label="Breadcrumb">
                <Link href="/admin/settings?tab=general">Site Settings</Link>
                <span className="asg-int-breadcrumb-sep">&gt;</span>
                <span className="asg-int-breadcrumb-current">Integrations & API Hub</span>
              </nav>
              <div className="asg-int-head">
                <h1 className="asg-int-title">Master Integrations Hub</h1>
                <div className="asg-int-head-right">
                  <label className="asg-int-search-wrap">
                    <Search className="asg-int-search-icon" aria-hidden />
                    <input
                      type="search"
                      className="asg-int-search"
                      placeholder="Search services..."
                      value={integrationSearch}
                      onChange={(e) => setIntegrationSearch(e.target.value)}
                      aria-label="Search services"
                    />
                  </label>
                  <button type="button" className="asg-int-save-btn">
                    <Save className="w-4 h-4" aria-hidden />
                    Save Integration Settings
                  </button>
                </div>
              </div>
              <div className="asg-int-content">
                {filteredIntegrationCategories.map((category) => (
                  <section key={category.id} className="asg-int-section">
                    <h2 className="asg-int-section-title">
                      {category.icon}
                      {category.title}
                    </h2>
                    <div className="asg-int-grid">
                      {category.items.map((item) => {
                        const Icon = item.Icon;
                        return (
                          <div key={item.id} className="asg-int-card">
                            <span className={`asg-int-badge asg-int-badge--${item.status}`}>
                              {item.status === "connected" ? "CONNECTED" : "NOT CONFIGURED"}
                            </span>
                            <div className="asg-int-card-icon" style={{ background: `${item.iconColor}20`, color: item.iconColor }}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <h3 className="asg-int-card-title">{item.title}</h3>
                            <p className="asg-int-card-desc">{item.description}</p>
                            <button
                              type="button"
                              onClick={() => setIntegrationModalId(item.id)}
                              className={`asg-int-card-btn ${item.status === "connected" ? "asg-int-card-btn--secondary" : "asg-int-card-btn--primary"}`}
                            >
                              Configure
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          )}

          {tab === "marketing-analytics" && (
            <div className="asg-ma-wrap">
              <nav className="asg-ma-breadcrumb" aria-label="Breadcrumb">
                <Link href="/admin/settings?tab=general">Settings</Link>
                <span className="asg-ma-breadcrumb-sep">&gt;</span>
                <span className="asg-ma-breadcrumb-current">Marketing Analytics Configuration</span>
              </nav>
              <div className="asg-ma-head">
                <div>
                  <h1 className="asg-ma-title">Marketing Analytics</h1>
                  <p className="asg-ma-desc">Manage tracking IDs, event measurement, and pixel integrations across the platform.</p>
                </div>
                <div className="asg-ma-head-actions">
                  <button type="button" className="asg-ma-btn asg-ma-btn-doc">
                    <FileText className="w-4 h-4" aria-hidden />
                    View Documentation
                  </button>
                  <button type="button" className="asg-header-save">Save Configuration</button>
                </div>
              </div>
              <div className="asg-ma-cards">
                <div className="asg-ma-card">
                  <div className="asg-ma-card-head">
                    <div className="asg-ma-card-icon asg-ma-card-icon--orange">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <h2 className="asg-ma-card-title">Google Analytics (GA4)</h2>
                  </div>
                  <div className="asg-ma-card-body">
                    <div className="asg-ma-field">
                      <label className="asg-ma-label">Measurement ID <Info className="asg-ma-label-icon" /></label>
                      <input type="text" className="asg-ma-input" value={ga4MeasurementId} onChange={(e) => setGa4MeasurementId(e.target.value)} placeholder="G-XXXXXXXXXX" />
                    </div>
                    <div className="asg-ma-tracking">
                      <div className="asg-ma-toggle-row">
                        <div>
                          <span className="asg-ma-toggle-label">Enhanced Measurement</span>
                          <span className="asg-ma-toggle-desc">Track scrolls, clicks, and site search automatically.</span>
                        </div>
                        <button type="button" role="switch" aria-checked={ga4EnhancedMeasurement} className={`asg-toggle-switch ${ga4EnhancedMeasurement ? "on" : ""}`} onClick={() => setGa4EnhancedMeasurement((v) => !v)} />
                      </div>
                      <div className="asg-ma-toggle-row">
                        <div>
                          <span className="asg-ma-toggle-label">User-ID Tracking</span>
                          <span className="asg-ma-toggle-desc">Cross-device tracking for authenticated students.</span>
                        </div>
                        <button type="button" role="switch" aria-checked={ga4UserIdTracking} className={`asg-toggle-switch ${ga4UserIdTracking ? "on" : ""}`} onClick={() => setGa4UserIdTracking((v) => !v)} />
                      </div>
                      <div className="asg-ma-toggle-row">
                        <div>
                          <span className="asg-ma-toggle-label">E-commerce Tracking</span>
                          <span className="asg-ma-toggle-desc">Detailed course purchase and revenue analytics.</span>
                        </div>
                        <button type="button" role="switch" aria-checked={ga4EcommerceTracking} className={`asg-toggle-switch ${ga4EcommerceTracking ? "on" : ""}`} onClick={() => setGa4EcommerceTracking((v) => !v)} />
                      </div>
                    </div>
                    <div className="asg-ma-field">
                      <label className="asg-ma-label">Custom Header Scripts</label>
                      <textarea className="asg-ma-textarea" value={ga4CustomScripts} onChange={(e) => setGa4CustomScripts(e.target.value)} placeholder="<!-- Paste additional GA or GTM scripts here -->" rows={4} />
                      <p className="asg-ma-hint">Scripts will be inserted before the closing head tag.</p>
                    </div>
                  </div>
                </div>
                <div className="asg-ma-card">
                  <div className="asg-ma-card-head">
                    <div className="asg-ma-card-icon asg-ma-card-icon--blue">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <h2 className="asg-ma-card-title">Meta (Facebook) Pixel & API</h2>
                  </div>
                  <div className="asg-ma-card-body">
                    <div className="asg-ma-field">
                      <label className="asg-ma-label">Pixel ID</label>
                      <input type="text" className="asg-ma-input" value={metaPixelId} onChange={(e) => setMetaPixelId(e.target.value)} />
                    </div>
                    <div className="asg-ma-field">
                      <h3 className="asg-ma-sublabel"><Sparkles className="asg-ma-sublabel-icon" /> Conversions API (CAPI) Access Token</h3>
                      <p className="asg-ma-hint">Required for improved tracking accuracy beyond browser-side cookies.</p>
                      <input type="text" className="asg-ma-input" value={metaCapiToken} onChange={(e) => setMetaCapiToken(e.target.value)} />
                    </div>
                    <div className="asg-ma-field">
                      <h3 className="asg-ma-events-title">EVENTS TO TRACK</h3>
                      <div className="asg-ma-checkgrid">
                        <label className="asg-ma-check"><input type="checkbox" checked={metaEventCoursePurchase} onChange={(e) => setMetaEventCoursePurchase(e.target.checked)} /> Course Purchase</label>
                        <label className="asg-ma-check"><input type="checkbox" checked={metaEventLeadSignup} onChange={(e) => setMetaEventLeadSignup(e.target.checked)} /> Lead Sign-up</label>
                        <label className="asg-ma-check"><input type="checkbox" checked={metaEventAddToCart} onChange={(e) => setMetaEventAddToCart(e.target.checked)} /> Add to Cart</label>
                        <label className="asg-ma-check"><input type="checkbox" checked={metaEventViewContent} onChange={(e) => setMetaEventViewContent(e.target.checked)} /> View Content</label>
                      </div>
                    </div>
                    <div className="asg-ma-protip">
                      <Check className="w-4 h-4" aria-hidden />
                      <p>Pro Tip: Meta CAPI reduces the impact of ad blockers and iOS 14.5 restrictions by sending events directly from the IMETS server.</p>
                    </div>
                  </div>
                </div>
              </div>
              <section className="asg-ma-cookie">
                <div className="asg-ma-cookie-head">
                  <div className="asg-ma-cookie-icon">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="asg-ma-cookie-title">Cookie Consent Management</h2>
                    <p className="asg-ma-cookie-desc">Configure how the platform handles user privacy and consent banners.</p>
                  </div>
                  <div className="asg-ma-cookie-toggle-wrap">
                    <span className="asg-ma-cookie-toggle-label">Enable Banner</span>
                    <button type="button" role="switch" aria-checked={cookieBannerEnabled} className={`asg-toggle-switch ${cookieBannerEnabled ? "on" : ""}`} onClick={() => setCookieBannerEnabled((v) => !v)} />
                  </div>
                </div>
                <div className="asg-ma-cookie-fields">
                  <div className="asg-ma-field">
                    <label className="asg-ma-label">Privacy Policy URL</label>
                    <input type="url" className="asg-ma-input" value={cookiePrivacyUrl} onChange={(e) => setCookiePrivacyUrl(e.target.value)} />
                  </div>
                  <div className="asg-ma-field">
                    <label className="asg-ma-label">Consent Duration (Days)</label>
                    <input type="text" className="asg-ma-input asg-ma-input--sm" value={cookieConsentDays} onChange={(e) => setCookieConsentDays(e.target.value)} />
                  </div>
                </div>
              </section>
              <div className="asg-ma-footer-actions">
                <button type="button" className="asg-ma-btn asg-ma-btn-ghost">Discard Changes</button>
                <button type="button" className="asg-header-save">Save All Configurations</button>
              </div>
              <footer className="asg-ma-page-footer">
                <span className="asg-ma-copy">© 2024 IMETS Academy. All analytics data is stored securely.</span>
                <div className="asg-ma-footer-links">
                  <Link href="#">Help Center</Link>
                  <Link href="#">Security Overview</Link>
                  <Link href="#">API Status</Link>
                </div>
              </footer>
            </div>
          )}

          {tab === "security" && (
            <div className="asg-sec-wrap">
              <nav className="asg-sec-breadcrumb" aria-label="Breadcrumb">
                <Link href="/admin/settings?tab=general">Settings</Link>
                <span className="asg-sec-breadcrumb-sep">&gt;</span>
                <span className="asg-sec-breadcrumb-current">Security & Privacy Hub</span>
              </nav>
              <h1 className="asg-sec-title">Security & Privacy Hub</h1>
              <p className="asg-sec-desc">Manage your academy&apos;s authentication protocols, password rules, and GDPR compliance settings.</p>

              <div className="asg-sec-card">
                <div className="asg-sec-card-head">
                  <div className="asg-sec-card-icon asg-sec-card-icon--blue">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h2 className="asg-sec-card-title">Authentication & 2FA</h2>
                </div>
                <div className="asg-sec-card-body">
                  <div className="asg-sec-toggle-row">
                    <div>
                      <span className="asg-sec-toggle-label">Enforce Two-Factor Authentication for all Staff</span>
                      <span className="asg-sec-toggle-desc">Requires every administrative user to verify their identity upon login.</span>
                    </div>
                    <button type="button" role="switch" aria-checked={securityEnforce2FA} className={`asg-toggle-switch ${securityEnforce2FA ? "on" : ""}`} onClick={() => setSecurityEnforce2FA((v) => !v)} />
                  </div>
                  <div className="asg-sec-check-group">
                    <span className="asg-sec-check-group-title">Allowed Verification Methods</span>
                    <label className="asg-sec-check"><input type="checkbox" checked={securityAuthApp} onChange={(e) => setSecurityAuthApp(e.target.checked)} /> Authenticator App <span className="asg-sec-check-desc">Google, Authy</span></label>
                    <label className="asg-sec-check"><input type="checkbox" checked={securityEmailOtp} onChange={(e) => setSecurityEmailOtp(e.target.checked)} /> Email OTP <span className="asg-sec-check-desc">Registered address</span></label>
                    <label className="asg-sec-check"><input type="checkbox" checked={securitySmsCode} onChange={(e) => setSecuritySmsCode(e.target.checked)} /> SMS Code <span className="asg-sec-check-desc">Standard carrier rates</span></label>
                  </div>
                </div>
              </div>

              <div className="asg-sec-card">
                <div className="asg-sec-card-head">
                  <div className="asg-sec-card-icon asg-sec-card-icon--gray">
                    <MoreHorizontal className="w-5 h-5" />
                  </div>
                  <h2 className="asg-sec-card-title">Password Policy</h2>
                </div>
                <div className="asg-sec-card-body">
                  <div className="asg-sec-field">
                    <label className="asg-sec-label">Minimum Character Length</label>
                    <input type="text" className="asg-sec-input asg-sec-input--sm" value={securityMinPasswordLength} onChange={(e) => setSecurityMinPasswordLength(e.target.value)} />
                  </div>
                  <div className="asg-sec-field">
                    <label className="asg-sec-label">Password Expiry Frequency</label>
                    <select className="asg-sec-select" value={securityPasswordExpiry} onChange={(e) => setSecurityPasswordExpiry(e.target.value)}>
                      <option value="30">Every 30 days</option>
                      <option value="60">Every 60 days</option>
                      <option value="90">Every 90 days</option>
                      <option value="180">Every 180 days</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                  <div className="asg-sec-check-group">
                    <span className="asg-sec-check-group-title">Mandatory Character Types</span>
                    <label className="asg-sec-check"><input type="checkbox" checked={securityMandatoryUppercase} onChange={(e) => setSecurityMandatoryUppercase(e.target.checked)} /> Uppercase Letters (A-Z)</label>
                    <label className="asg-sec-check"><input type="checkbox" checked={securityMandatoryNumbers} onChange={(e) => setSecurityMandatoryNumbers(e.target.checked)} /> Numbers (0-9)</label>
                    <label className="asg-sec-check"><input type="checkbox" checked={securityMandatorySymbols} onChange={(e) => setSecurityMandatorySymbols(e.target.checked)} /> Symbols (@, #, $, etc.)</label>
                  </div>
                </div>
              </div>

              <div className="asg-sec-card">
                <div className="asg-sec-card-head">
                  <div className="asg-sec-card-icon asg-sec-card-icon--blue">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h2 className="asg-sec-card-title">Session Control</h2>
                </div>
                <div className="asg-sec-card-body">
                  <div className="asg-sec-toggle-row">
                    <div>
                      <span className="asg-sec-toggle-label">Prevent Concurrent Logins</span>
                      <span className="asg-sec-toggle-desc">Automatically logs out the oldest session when a new one begins.</span>
                    </div>
                    <button type="button" role="switch" aria-checked={securityPreventConcurrent} className={`asg-toggle-switch ${securityPreventConcurrent ? "on" : ""}`} onClick={() => setSecurityPreventConcurrent((v) => !v)} />
                  </div>
                  <div className="asg-sec-field">
                    <label className="asg-sec-label">Idle Session Timeout</label>
                    <select className="asg-sec-select" value={securityIdleTimeout} onChange={(e) => setSecurityIdleTimeout(e.target.value)}>
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">60 minutes</option>
                      <option value="120">2 hours</option>
                    </select>
                    <p className="asg-sec-hint">Recommended: 15-30m</p>
                  </div>
                </div>
              </div>

              <div className="asg-sec-card">
                <div className="asg-sec-card-head">
                  <div className="asg-sec-card-icon asg-sec-card-icon--gray">
                    <Search className="w-5 h-5" />
                  </div>
                  <h2 className="asg-sec-card-title">Data Privacy & GDPR</h2>
                </div>
                <div className="asg-sec-card-body">
                  <div className="asg-sec-field">
                    <label className="asg-sec-label">Automatic Lead Data Deletion <Info className="asg-sec-label-icon" /></label>
                    <select className="asg-sec-select" value={securityLeadDataDeletion} onChange={(e) => setSecurityLeadDataDeletion(e.target.value)}>
                      <option value="6">After 6 months</option>
                      <option value="12">After 12 months</option>
                      <option value="24">After 24 months</option>
                      <option value="never">Never (manual only)</option>
                    </select>
                  </div>
                  <div className="asg-sec-field">
                    <label className="asg-sec-label">Privacy Policy URL</label>
                    <input type="url" className="asg-sec-input" value={securityPrivacyPolicyUrl} onChange={(e) => setSecurityPrivacyPolicyUrl(e.target.value)} />
                  </div>
                  <div className="asg-sec-alert">
                    <AlertTriangle className="asg-sec-alert-icon" />
                    <div>
                      <strong className="asg-sec-alert-title">Compliance Notice</strong>
                      <p className="asg-sec-alert-text">Changes to data deletion settings take effect immediately. All data purged under these rules cannot be recovered. Ensure you have backups if necessary.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="asg-sec-actions">
                <button type="button" className="asg-sec-btn asg-sec-btn--ghost">Discard Changes</button>
                <button type="button" className="asg-header-save">Save Security Settings</button>
              </div>
              <footer className="asg-sec-footer">
                © 2024 IMETS Academy LMS. All rights reserved. Secure Infrastructure V2.4.1
              </footer>
            </div>
          )}

          {tab === "maintenance" && (
            <div className="asg-maint-wrap">
              <nav className="asg-maint-breadcrumb" aria-label="Breadcrumb">
                <Link href="/admin/settings?tab=general">Settings</Link>
                <span className="asg-maint-breadcrumb-sep">&gt;</span>
                <span className="asg-maint-breadcrumb-current">Maintenance & Backup</span>
              </nav>
              <div className="asg-maint-head">
                <div>
                  <h1 className="asg-maint-title">Maintenance & Backup Hub</h1>
                  <p className="asg-maint-desc">Configure automated workflows, monitor health, and manage system updates.</p>
                </div>
                <div className="asg-maint-head-actions">
                  <button type="button" className="asg-maint-btn asg-maint-btn-export"><FileText className="w-4 h-4" /> Export Logs</button>
                  <button type="button" className="asg-header-save"><Save className="w-4 h-4" /> Save Changes</button>
                </div>
              </div>

              <div className="asg-maint-status-cards">
                <div className="asg-maint-status-card">
                  <div className="asg-maint-status-icon asg-maint-status-icon--green"><Check className="w-5 h-5" /></div>
                  <div>
                    <span className="asg-maint-status-label">Server Performance</span>
                    <span className="asg-maint-status-value">Optimal</span>
                    <span className="asg-maint-status-detail"><span className="asg-maint-status-dot" /> 99.9% Uptime</span>
                  </div>
                </div>
                <div className="asg-maint-status-card">
                  <div className="asg-maint-status-icon asg-maint-status-icon--blue"><Database className="w-5 h-5" /></div>
                  <div>
                    <span className="asg-maint-status-label">Database Connection</span>
                    <span className="asg-maint-status-value">Healthy</span>
                    <span className="asg-maint-status-detail"><span className="asg-maint-status-dot" /> Active</span>
                  </div>
                </div>
                <div className="asg-maint-status-card">
                  <div className="asg-maint-status-icon asg-maint-status-icon--purple"><LayoutGrid className="w-5 h-5" /></div>
                  <div>
                    <span className="asg-maint-status-label">API Services</span>
                    <span className="asg-maint-status-value">Operational</span>
                    <span className="asg-maint-status-detail"><span className="asg-maint-status-dot" /> Stable</span>
                  </div>
                </div>
              </div>

              <div className="asg-maint-grid">
                <div className="asg-maint-col">
                  <section className="asg-maint-section">
                    <div className="asg-maint-section-head">
                      <h2 className="asg-maint-section-title"><Cloud className="asg-maint-section-icon" /> Backups</h2>
                      <button type="button" className="asg-maint-btn asg-maint-btn-primary"><CloudUpload className="w-4 h-4" /> Initiate Backup Now</button>
                    </div>
                    <div className="asg-maint-card">
                      <h3 className="asg-maint-card-title">Scheduled Backups</h3>
                      <div className="asg-maint-tabs">
                        <button type="button" className={`asg-maint-tab ${maintBackupScheduleTab === "daily" ? "asg-maint-tab--on" : ""}`} onClick={() => setMaintBackupScheduleTab("daily")}>Daily</button>
                        <button type="button" className={`asg-maint-tab ${maintBackupScheduleTab === "weekly" ? "asg-maint-tab--on" : ""}`} onClick={() => setMaintBackupScheduleTab("weekly")}>Weekly</button>
                        <button type="button" className={`asg-maint-tab ${maintBackupScheduleTab === "monthly" ? "asg-maint-tab--on" : ""}`} onClick={() => setMaintBackupScheduleTab("monthly")}>Monthly</button>
                      </div>
                      <p className="asg-maint-next-run"><Clock className="w-4 h-4" /> Next run: Today at 03:00 AM UTC</p>
                    </div>
                    <div className="asg-maint-card">
                      <h3 className="asg-maint-card-title">Storage Destination</h3>
                      <div className="asg-maint-storage-list">
                        <div className="asg-maint-storage-item">
                          <Database className="asg-maint-storage-icon" />
                          <span>AWS S3 Bucket</span>
                          <span className="asg-maint-badge asg-maint-badge--connected">CONNECTED</span>
                        </div>
                        <div className="asg-maint-storage-item">
                          <Cloud className="asg-maint-storage-icon" />
                          <span>Google Drive</span>
                          <span className="asg-maint-badge asg-maint-badge--disabled">DISABLED</span>
                        </div>
                      </div>
                    </div>
                    <div className="asg-maint-card">
                      <h3 className="asg-maint-card-title">Recent Backups</h3>
                      <div className="asg-maint-table-wrap">
                        <table className="asg-maint-table">
                          <thead>
                            <tr>
                              <th>Backup Date</th>
                              <th>File Size</th>
                              <th>Destination</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Oct 24, 2023 - 03:00 AM</td>
                              <td>1.42 GB</td>
                              <td>AWS S3</td>
                              <td><button type="button" className="asg-maint-action" aria-label="Download"><Download className="w-4 h-4" /></button><button type="button" className="asg-maint-action" aria-label="Revert"><RotateCcw className="w-4 h-4" /></button></td>
                            </tr>
                            <tr>
                              <td>Oct 23, 2023 - 03:00 AM</td>
                              <td>1.39 GB</td>
                              <td>AWS S3</td>
                              <td><button type="button" className="asg-maint-action" aria-label="Download"><Download className="w-4 h-4" /></button><button type="button" className="asg-maint-action" aria-label="Revert"><RotateCcw className="w-4 h-4" /></button></td>
                            </tr>
                            <tr>
                              <td>Oct 22, 2023 - 03:00 AM</td>
                              <td>1.38 GB</td>
                              <td>AWS S3</td>
                              <td><button type="button" className="asg-maint-action" aria-label="Download"><Download className="w-4 h-4" /></button><button type="button" className="asg-maint-action" aria-label="Revert"><RotateCcw className="w-4 h-4" /></button></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="asg-maint-table-footer">
                        <Link href="#" className="asg-maint-view-all">View All History</Link>
                      </div>
                    </div>
                  </section>
                  <section className="asg-maint-section">
                    <h2 className="asg-maint-section-title"><Wrench className="asg-maint-section-icon" /> Optimization Utilities</h2>
                    <div className="asg-maint-util-grid">
                      <div className="asg-maint-util-card">
                        <div>
                          <h4 className="asg-maint-util-title">Clear System Cache</h4>
                          <p className="asg-maint-util-desc">Flush all temporary server assets</p>
                        </div>
                        <button type="button" className="asg-maint-util-btn" aria-label="Clear cache"><Download className="w-4 h-4" /></button>
                      </div>
                      <div className="asg-maint-util-card">
                        <div>
                          <h4 className="asg-maint-util-title">Purge Activity Logs</h4>
                          <p className="asg-maint-util-desc">Permanently delete logs older than 90 days</p>
                        </div>
                        <button type="button" className="asg-maint-util-btn asg-maint-util-btn--danger" aria-label="Purge logs"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </section>
                </div>
                <div className="asg-maint-col">
                  <section className="asg-maint-section">
                    <h2 className="asg-maint-section-title"><Download className="asg-maint-section-icon" /> System Updates</h2>
                    <div className="asg-maint-card">
                      <div className="asg-maint-field">
                        <span className="asg-maint-label">Current Version</span>
                        <span className="asg-maint-version-pill">v4.2.1-stable</span>
                      </div>
                      <button type="button" className="asg-maint-btn asg-maint-btn-outline">Check for Updates</button>
                      <div className="asg-maint-toggle-row">
                        <div>
                          <span className="asg-maint-toggle-label">Auto Security Patches</span>
                          <span className="asg-maint-toggle-desc">Install critical fixes automatically</span>
                        </div>
                        <button type="button" role="switch" aria-checked={maintAutoSecurityPatches} className={`asg-toggle-switch ${maintAutoSecurityPatches ? "on" : ""}`} onClick={() => setMaintAutoSecurityPatches((v) => !v)} />
                      </div>
                    </div>
                  </section>
                  <section className="asg-maint-section">
                    <h2 className="asg-maint-section-title"><AlertTriangle className="asg-maint-section-icon" /> Maintenance Mode</h2>
                    <div className="asg-maint-card">
                      <div className="asg-maint-toggle-row">
                        <div>
                          <span className="asg-maint-label asg-maint-label--red">Maintenance Status</span>
                          <span className="asg-maint-status-live">System is currently LIVE</span>
                        </div>
                        <button type="button" role="switch" aria-checked={maintMaintenanceMode} className={`asg-toggle-switch ${maintMaintenanceMode ? "on" : ""}`} onClick={() => setMaintMaintenanceMode((v) => !v)} />
                      </div>
                      <div className="asg-maint-field">
                        <label className="asg-maint-label asg-maint-label-uppercase">Schedule Next Window</label>
                        <div className="asg-maint-input-wrap">
                          <input type="text" className="asg-maint-input" value={maintScheduleDateTime} onChange={(e) => setMaintScheduleDateTime(e.target.value)} placeholder="mm/dd/yyyy, --:--" />
                          <Calendar className="asg-maint-input-icon" />
                        </div>
                      </div>
                      <button type="button" className="asg-maint-btn asg-maint-btn-outline">Apply Schedule</button>
                      <Link href="#" className="asg-maint-edit-link"><FileText className="w-4 h-4" /><Pencil className="w-4 h-4" /> Edit Maintenance Page</Link>
                    </div>
                  </section>
                  <div className="asg-maint-tip">
                    <Info className="asg-maint-tip-icon" />
                    <div>
                      <strong className="asg-maint-tip-title">SUPPORT TIP</strong>
                      <p className="asg-maint-tip-text">Before running system-wide updates, ensure a manual backup has been verified and stored in a secondary off-site location.</p>
                      <Link href="#" className="asg-maint-tip-link">LEARN MORE ABOUT DISASTER RECOVERY</Link>
                    </div>
                  </div>
                </div>
              </div>

              <footer className="asg-maint-footer">
                © 2023 IMETS Academy Platform. v4.2.1. System Administrator Access Only.
              </footer>
            </div>
          )}

          {tab === "api-access" && (
            <div className="asg-adv-wrap">
              <nav className="asg-adv-breadcrumb" aria-label="Breadcrumb">
                <Link href="/admin/settings?tab=general">Settings</Link>
                <span className="asg-adv-breadcrumb-sep">&gt;</span>
                <span className="asg-adv-breadcrumb-current">API Access</span>
              </nav>
              <h1 className="asg-adv-title">API Access</h1>
              <p className="asg-adv-desc">Manage API keys, scopes, and rate limits for external integrations and partner applications.</p>

              <div className="asg-adv-card">
                <div className="asg-adv-card-head">
                  <h2 className="asg-adv-card-title"><Key className="asg-adv-card-icon" /> API Keys</h2>
                  <button type="button" className="asg-adv-btn asg-adv-btn-primary"><Plus className="w-4 h-4" /> Create API Key</button>
                </div>
                <p className="asg-adv-hint">API keys authenticate requests to the IMETS Academy API. Keep them secure and never expose them in client-side code.</p>
                <div className="asg-adv-table-wrap">
                  <table className="asg-adv-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Key</th>
                        <th>Created</th>
                        <th>Last used</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiKeys.map((key) => (
                        <tr key={key.id}>
                          <td>{key.name}</td>
                          <td><code className="asg-adv-code">{key.prefix}</code></td>
                          <td>{key.created}</td>
                          <td>{key.lastUsed}</td>
                          <td>
                            <button type="button" className="asg-adv-action" title="Copy"> <Copy className="w-4 h-4" /> </button>
                            <button type="button" className="asg-adv-action asg-adv-action--danger" title="Revoke"> <Trash2 className="w-4 h-4" /> </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="asg-adv-card">
                <h2 className="asg-adv-card-title"><FileText className="asg-adv-card-icon" /> API Documentation</h2>
                <p className="asg-adv-desc-inline">View the full API reference, authentication guide, and code samples.</p>
                <Link href="#" className="asg-adv-link"><ExternalLink className="w-4 h-4" /> Open API Docs</Link>
              </div>

              <footer className="asg-adv-footer">© 2024 IMETS Academy. API access is logged and rate-limited per key.</footer>
            </div>
          )}

          {tab === "webhooks" && (
            <div className="asg-adv-wrap">
              <nav className="asg-adv-breadcrumb" aria-label="Breadcrumb">
                <Link href="/admin/settings?tab=general">Settings</Link>
                <span className="asg-adv-breadcrumb-sep">&gt;</span>
                <span className="asg-adv-breadcrumb-current">Webhooks</span>
              </nav>
              <h1 className="asg-adv-title">Webhooks</h1>
              <p className="asg-adv-desc">Configure HTTP endpoints to receive real-time events when enrollments, payments, or course updates occur.</p>

              <div className="asg-adv-card">
                <div className="asg-adv-card-head">
                  <h2 className="asg-adv-card-title"><Link2 className="asg-adv-card-icon" /> Webhook Endpoints</h2>
                  <button type="button" className="asg-adv-btn asg-adv-btn-primary"><Plus className="w-4 h-4" /> Add Endpoint</button>
                </div>
                <p className="asg-adv-hint">Each endpoint must use HTTPS. We will send a signed payload and retry failed deliveries according to your retry policy.</p>
                <div className="asg-adv-table-wrap">
                  <table className="asg-adv-table">
                    <thead>
                      <tr>
                        <th>URL</th>
                        <th>Events</th>
                        <th>Status</th>
                        <th>Last delivery</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {webhookEndpoints.map((ep) => (
                        <tr key={ep.id}>
                          <td><code className="asg-adv-code asg-adv-code--url">{ep.url}</code></td>
                          <td><span className="asg-adv-events">{ep.events}</span></td>
                          <td><span className={`asg-adv-badge ${ep.status === "active" ? "asg-adv-badge--active" : "asg-adv-badge--inactive"}`}>{ep.status}</span></td>
                          <td>{ep.lastDelivery}</td>
                          <td>
                            <button type="button" className="asg-adv-action" title="Test"> <Zap className="w-4 h-4" /> </button>
                            <button type="button" className="asg-adv-action" title="Edit"> <Pencil className="w-4 h-4" /> </button>
                            <button type="button" className="asg-adv-action asg-adv-action--danger" title="Remove"> <Trash2 className="w-4 h-4" /> </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="asg-adv-card">
                <h2 className="asg-adv-card-title"><Info className="asg-adv-card-icon" /> Event types</h2>
                <p className="asg-adv-desc-inline">Subscribe to events such as <code>enrollment.completed</code>, <code>payment.succeeded</code>, <code>course.published</code>, and <code>certificate.issued</code>. Full list is available in the docs.</p>
                <Link href="#" className="asg-adv-link"><ExternalLink className="w-4 h-4" /> Webhook event reference</Link>
              </div>

              <footer className="asg-adv-footer">© 2024 IMETS Academy. Webhook payloads are signed with your endpoint secret.</footer>
            </div>
          )}
        </main>
      </div>

      {/* Integration configuration modals */}
      {integrationModalId && (
        <div className="asg-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="asg-modal-title">
          <div className="asg-modal-backdrop" onClick={() => setIntegrationModalId(null)} aria-hidden />
          <div className={`asg-modal-dialog asg-modal-dialog--scroll ${["payment", "whatsapp", "zoom"].includes(integrationModalId || "") ? "asg-modal-dialog--wide" : ""}`} onClick={(e) => e.stopPropagation()}>
            {integrationModalId === "vdocipher" && (
              <>
                <div className="asg-modal-header">
                  <div className="asg-modal-title-row">
                    <div className="asg-modal-title-icon asg-modal-title-icon--blue">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 id="asg-modal-title" className="asg-modal-title">VdoCipher Integration Setup</h2>
                      <p className="asg-modal-subtitle">Secure video hosting and DRM protection configuration</p>
                    </div>
                  </div>
                  <button type="button" className="asg-modal-close" onClick={() => setIntegrationModalId(null)} aria-label="Close"><X className="w-5 h-5" /></button>
                </div>
                <div className="asg-modal-body">
                  <section className="asg-modal-section">
                    <h3 className="asg-modal-section-title"><Key className="asg-modal-section-icon" /> API CREDENTIALS</h3>
                    <div className="asg-modal-two-col">
                      <div className="asg-modal-field">
                        <label className="asg-modal-label">API Secret Key</label>
                        <div className="asg-modal-input-wrap">
                          <input type={vdoSecretVisible ? "text" : "password"} className="asg-modal-input" value={vdoApiSecret} onChange={(e) => setVdoApiSecret(e.target.value)} />
                          <button type="button" className="asg-modal-input-icon" onClick={() => setVdoSecretVisible((v) => !v)} aria-label={vdoSecretVisible ? "Hide" : "Show"}>{vdoSecretVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                        </div>
                      </div>
                      <div className="asg-modal-field">
                        <label className="asg-modal-label">Default Folder ID</label>
                        <input type="text" className="asg-modal-input" value={vdoFolderId} onChange={(e) => setVdoFolderId(e.target.value)} />
                      </div>
                    </div>
                  </section>
                  <section className="asg-modal-section">
                    <h3 className="asg-modal-section-title"><Shield className="asg-modal-section-icon" /> SECURITY & PROTECTION</h3>
                    <div className="asg-modal-toggle-cards">
                      <div className="asg-modal-toggle-card">
                        <FileText className="asg-modal-toggle-card-icon" />
                        <div className="asg-modal-toggle-card-text">
                          <span className="asg-modal-toggle-label">Dynamic Watermarking</span>
                          <span className="asg-modal-toggle-desc">Overlay student name, email, and IP address to prevent physical screen recording or leakage.</span>
                        </div>
                        <button type="button" role="switch" aria-checked={vdoWatermark} className={`asg-toggle-switch ${vdoWatermark ? "on" : ""}`} onClick={() => setVdoWatermark((v) => !v)} />
                      </div>
                      <div className="asg-modal-toggle-card">
                        <Monitor className="asg-modal-toggle-card-icon" />
                        <div className="asg-modal-toggle-card-text">
                          <span className="asg-modal-toggle-label">Screen Recording Protection</span>
                          <span className="asg-modal-toggle-desc">Hardware-level DRM protection to block common screen capture software on Windows, Mac, and Mobile.</span>
                        </div>
                        <button type="button" role="switch" aria-checked={vdoScreenRec} className={`asg-toggle-switch ${vdoScreenRec ? "on" : ""}`} onClick={() => setVdoScreenRec((v) => !v)} />
                      </div>
                      <div className="asg-modal-toggle-card">
                        <Globe className="asg-modal-toggle-card-icon" />
                        <div className="asg-modal-toggle-card-text">
                          <span className="asg-modal-toggle-label">Domain Restriction</span>
                          <span className="asg-modal-toggle-desc">Restrict video playback exclusively to imets-academy.com and its authorized subdomains.</span>
                        </div>
                        <button type="button" role="switch" aria-checked={vdoDomain} className={`asg-toggle-switch ${vdoDomain ? "on" : ""}`} onClick={() => setVdoDomain((v) => !v)} />
                      </div>
                    </div>
                  </section>
                  <section className="asg-modal-section">
                    <h3 className="asg-modal-section-title"><Sliders className="asg-modal-section-icon" /> PLAYER CONFIGURATION</h3>
                    <div className="asg-modal-two-col">
                      <div className="asg-modal-field">
                        <label className="asg-modal-label">Player Accent Color</label>
                        <input type="text" className="asg-modal-input" value={vdoAccentColor} onChange={(e) => setVdoAccentColor(e.target.value)} placeholder="#" />
                      </div>
                      <div className="asg-modal-field">
                        <label className="asg-modal-label">Automatic Resuming</label>
                        <input type="text" className="asg-modal-input" value={vdoResuming} onChange={(e) => setVdoResuming(e.target.value)} placeholder="Optional" />
                      </div>
                    </div>
                  </section>
                </div>
                <div className="asg-modal-footer">
                  <button type="button" className="asg-modal-btn asg-modal-btn--secondary"><RefreshCw className="w-4 h-4" /> Test Connection</button>
                  <div className="asg-modal-footer-right">
                    <button type="button" className="asg-modal-btn asg-modal-btn--ghost" onClick={() => setIntegrationModalId(null)}>Cancel</button>
                    <button type="button" className="asg-modal-btn asg-modal-btn--primary"><Check className="w-4 h-4" /> Save & Activate Integration</button>
                  </div>
                </div>
              </>
            )}

            {integrationModalId === "payment" && (
              <>
                <div className="asg-modal-header">
                  <div className="asg-modal-title-row">
                    <div className="asg-modal-title-icon asg-modal-title-icon--blue">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 id="asg-modal-title" className="asg-modal-title">Payment Gateway Configuration</h2>
                      <p className="asg-modal-subtitle">Configure secure payment integrations for IMETS Academy.</p>
                    </div>
                  </div>
                  <button type="button" className="asg-modal-close" onClick={() => setIntegrationModalId(null)} aria-label="Close"><X className="w-5 h-5" /></button>
                </div>
                <div className="asg-modal-body">
                  <section className="asg-modal-section">
                    <h3 className="asg-modal-section-title">Select Gateway Provider</h3>
                    <div className="asg-modal-gateway-grid">
                      {(["stripe", "paypal", "fawry", "paymob"] as const).map((p) => (
                        <button type="button" key={p} className={`asg-modal-gateway-btn ${paymentProvider === p ? "asg-modal-gateway-btn--on" : ""}`} onClick={() => setPaymentProvider(p)}>
                          <CreditCard className="w-6 h-6" />
                          {p.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </section>
                  <section className="asg-modal-section">
                    <div className="asg-modal-field asg-modal-field-row">
                      <div>
                        <h3 className="asg-modal-section-title"><AlertTriangle className="asg-modal-section-icon asg-modal-section-icon--orange" /> Environment Mode</h3>
                        <p className="asg-modal-hint">Switch between test and production</p>
                      </div>
                      <div className="asg-modal-env-toggle">
                        <button type="button" className={`asg-modal-env-btn ${paymentEnvTest ? "asg-modal-env-btn--on" : ""}`} onClick={() => setPaymentEnvTest(true)}>TEST</button>
                        <button type="button" className={`asg-modal-env-btn ${!paymentEnvTest ? "asg-modal-env-btn--on" : ""}`} onClick={() => setPaymentEnvTest(false)}>LIVE</button>
                      </div>
                    </div>
                  </section>
                  <section className="asg-modal-section">
                    <h3 className="asg-modal-section-title">API Credentials <Info className="asg-modal-inline-icon" /></h3>
                    <div className="asg-modal-fields">
                      <div className="asg-modal-field">
                        <label className="asg-modal-label">Publishable Key</label>
                        <div className="asg-modal-input-wrap">
                          <input type="text" className="asg-modal-input" value={paymentPublishable} onChange={(e) => setPaymentPublishable(e.target.value)} placeholder="pk_test_51Mz..." />
                          <Key className="asg-modal-input-icon asg-modal-input-icon--static" />
                        </div>
                      </div>
                      <div className="asg-modal-field">
                        <label className="asg-modal-label">Secret Key</label>
                        <div className="asg-modal-input-wrap">
                          <input type={paymentSecretVisible ? "text" : "password"} className="asg-modal-input" value={paymentSecret} onChange={(e) => setPaymentSecret(e.target.value)} />
                          <button type="button" className="asg-modal-input-icon" onClick={() => setPaymentSecretVisible((v) => !v)} aria-label={paymentSecretVisible ? "Hide" : "Show"}>{paymentSecretVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                        </div>
                      </div>
                      <div className="asg-modal-field">
                        <label className="asg-modal-label">Webhook Signature</label>
                        <div className="asg-modal-input-wrap">
                          <input type="text" className="asg-modal-input" value={paymentWebhook} onChange={(e) => setPaymentWebhook(e.target.value)} placeholder="whsec_..." />
                          <Link2 className="asg-modal-input-icon asg-modal-input-icon--static" />
                        </div>
                        <p className="asg-modal-hint">Required for asynchronous payment notifications (IPN)</p>
                      </div>
                    </div>
                  </section>
                  <section className="asg-modal-section">
                    <h3 className="asg-modal-section-title">Settlement & Currency</h3>
                    <p className="asg-modal-encrypt"><Shield className="w-4 h-4" /> End-to-end encrypted connection</p>
                  </section>
                </div>
                <div className="asg-modal-footer">
                  <button type="button" className="asg-modal-btn asg-modal-btn--ghost" onClick={() => setIntegrationModalId(null)}>Discard Changes</button>
                  <button type="button" className="asg-modal-btn asg-modal-btn--primary"><Save className="w-4 h-4" /> Save Configuration</button>
                </div>
              </>
            )}

            {integrationModalId === "whatsapp" && (
              <>
                <div className="asg-modal-header">
                  <div className="asg-modal-title-row">
                    <div className="asg-modal-title-icon asg-modal-title-icon--blue">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 id="asg-modal-title" className="asg-modal-title">WhatsApp API Configuration</h2>
                      <p className="asg-modal-subtitle">Connect your Meta Business account to manage student communications seamlessly.</p>
                    </div>
                  </div>
                  <button type="button" className="asg-modal-close" onClick={() => setIntegrationModalId(null)} aria-label="Close"><X className="w-5 h-5" /></button>
                </div>
                <div className="asg-modal-body asg-modal-body--two-col">
                  <div className="asg-modal-col">
                    <h3 className="asg-modal-section-title"><Link2 className="asg-modal-section-icon" /> Connection Credentials</h3>
                    <div className="asg-modal-fields">
                      <div className="asg-modal-field">
                        <label className="asg-modal-label">Business Account ID <Info className="asg-modal-inline-icon" /></label>
                        <input type="text" className="asg-modal-input" value={waBusinessId} onChange={(e) => setWaBusinessId(e.target.value)} placeholder="e.g. 109283746554321" />
                      </div>
                      <div className="asg-modal-field">
                        <label className="asg-modal-label">Access Token (API Key) <Info className="asg-modal-inline-icon" /></label>
                        <div className="asg-modal-input-wrap">
                          <input type={waTokenVisible ? "text" : "password"} className="asg-modal-input" value={waToken} onChange={(e) => setWaToken(e.target.value)} />
                          <button type="button" className="asg-modal-input-icon" onClick={() => setWaTokenVisible((v) => !v)} aria-label={waTokenVisible ? "Hide" : "Show"}>{waTokenVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                        </div>
                      </div>
                      <div className="asg-modal-field">
                        <label className="asg-modal-label">Verified Phone Number <Info className="asg-modal-inline-icon" /></label>
                        <div className="asg-modal-input-group">
                          <input type="text" className="asg-modal-input asg-modal-input--sm" value={waCountry} onChange={(e) => setWaCountry(e.target.value)} placeholder="+966" />
                          <input type="text" className="asg-modal-input" value={waPhone} onChange={(e) => setWaPhone(e.target.value)} placeholder="50 123 4567" />
                        </div>
                      </div>
                    </div>
                    <div className="asg-modal-wa-actions">
                      <button type="button" className="asg-modal-btn asg-modal-btn--secondary"><RefreshCw className="w-4 h-4" /> Test Connection</button>
                      <span className="asg-modal-wa-status"><span className="asg-modal-wa-status-dot" /> DISCONNECTED</span>
                    </div>
                  </div>
                  <div className="asg-modal-col">
                    <h3 className="asg-modal-section-title"><Link2 className="asg-modal-section-icon" /> Webhooks & Integration</h3>
                    <div className="asg-modal-fields">
                      <div className="asg-modal-field">
                        <label className="asg-modal-label">Webhook URL <Info className="asg-modal-inline-icon" /></label>
                        <div className="asg-modal-input-wrap">
                          <input type="text" className="asg-modal-input" readOnly value="https://api.imetsacademy.com/v1/whatsapp/webhook" />
                          <button type="button" className="asg-modal-input-icon" aria-label="Copy"><Copy className="w-4 h-4" /></button>
                        </div>
                      </div>
                      <div className="asg-modal-field">
                        <label className="asg-modal-label">Verify Token <Info className="asg-modal-inline-icon" /></label>
                        <div className="asg-modal-input-wrap">
                          <input type="text" className="asg-modal-input" readOnly value="IMETS_WABA_2024_SECURE_TOKEN" />
                          <button type="button" className="asg-modal-input-icon" aria-label="Copy"><Copy className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                    <h3 className="asg-modal-section-title"><Settings className="asg-modal-section-icon" /> Message Settings</h3>
                    <div className="asg-modal-fields">
                      <div className="asg-modal-field asg-modal-field-row">
                        <label className="asg-modal-label">Default Language</label>
                        <select className="asg-modal-select-inline" value="en"><option>English (US)</option></select>
                      </div>
                      <div className="asg-modal-toggle-card">
                        <div className="asg-modal-toggle-card-text">
                          <span className="asg-modal-toggle-label">Automated Read Receipts</span>
                          <span className="asg-modal-toggle-desc">Mark messages as read when system receives them</span>
                        </div>
                        <button type="button" role="switch" aria-checked={waReadReceipts} className={`asg-toggle-switch ${waReadReceipts ? "on" : ""}`} onClick={() => setWaReadReceipts((v) => !v)} />
                      </div>
                      <div className="asg-modal-toggle-card">
                        <div className="asg-modal-toggle-card-text">
                          <span className="asg-modal-toggle-label">Admin Notifications</span>
                          <span className="asg-modal-toggle-desc">Alert staff on failed message delivery</span>
                        </div>
                        <button type="button" role="switch" aria-checked={waAdminNotif} className={`asg-toggle-switch ${waAdminNotif ? "on" : ""}`} onClick={() => setWaAdminNotif((v) => !v)} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="asg-modal-footer">
                  <button type="button" className="asg-modal-btn asg-modal-btn--ghost" onClick={() => setIntegrationModalId(null)}>Cancel</button>
                  <button type="button" className="asg-modal-btn asg-modal-btn--primary"><Save className="w-4 h-4" /> Save & Connect</button>
                </div>
              </>
            )}

            {integrationModalId === "zoom" && (
              <>
                <div className="asg-modal-header">
                  <div className="asg-modal-title-row">
                    <div className="asg-modal-title-icon asg-modal-title-icon--blue">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 id="asg-modal-title" className="asg-modal-title">Zoom Integration Authorization Hub</h2>
                      <p className="asg-modal-subtitle">Securely connect and configure your Zoom account for automated live academy sessions.</p>
                    </div>
                  </div>
                  <button type="button" className="asg-modal-close" onClick={() => setIntegrationModalId(null)} aria-label="Close"><X className="w-5 h-5" /></button>
                </div>
                <div className="asg-modal-body">
                  <div className="asg-modal-zoom-partner">
                    <span className="asg-modal-zoom-partner-label">INTEGRATION PARTNER</span>
                    <div className="asg-modal-zoom-partner-inner">
                      <div className="asg-modal-zoom-logo"><Video className="w-6 h-6" /></div>
                      <div>
                        <p className="asg-modal-zoom-partner-name">Zoom Video Communications</p>
                        <p className="asg-modal-zoom-partner-desc">Authorize IMETS Academy to automatically create meetings, manage participants, and sync recordings for your live courses.</p>
                      </div>
                      <span className="asg-modal-zoom-badge">• DISCONNECTED</span>
                    </div>
                  </div>
                  <section className="asg-modal-section">
                    <div className="asg-modal-zoom-step">
                      <span className="asg-modal-zoom-num asg-modal-zoom-num--active">1</span>
                      <div>
                        <h3 className="asg-modal-section-title">Authorize Account</h3>
                        <p className="asg-modal-zoom-desc">Grant IMETS permissions to manage your Zoom account. You will be redirected to Zoom&apos;s secure login page to complete the OAuth flow.</p>
                        <button type="button" className="asg-modal-btn asg-modal-btn--primary"><Link2 className="w-4 h-4" /> Connect Zoom Account</button>
                        <p className="asg-modal-zoom-secure"><Lock className="w-3.5 h-3.5" /> SECURE OAUTH 2.0 ENCRYPTION</p>
                      </div>
                    </div>
                  </section>
                  <section className="asg-modal-section">
                    <div className="asg-modal-zoom-step">
                      <span className="asg-modal-zoom-num">2</span>
                      <div>
                        <h3 className="asg-modal-section-title">Meeting Settings</h3>
                        <p className="asg-modal-hint">Define the default behavior for all meetings created through the Academy integration.</p>
                        <div className="asg-modal-toggle-list">
                          <div className="asg-modal-toggle-card">
                            <div className="asg-modal-toggle-card-text">
                              <span className="asg-modal-toggle-label">Auto-record to Cloud</span>
                              <span className="asg-modal-toggle-desc">Automatically start recording when the meeting begins.</span>
                            </div>
                            <button type="button" role="switch" aria-checked={zoomAutoRecord} className={`asg-toggle-switch ${zoomAutoRecord ? "on" : ""}`} onClick={() => setZoomAutoRecord((v) => !v)} />
                          </div>
                          <div className="asg-modal-toggle-card">
                            <div className="asg-modal-toggle-card-text">
                              <span className="asg-modal-toggle-label">Enable Waiting Room by Default</span>
                              <span className="asg-modal-toggle-desc">Host must manually admit participants into the session.</span>
                            </div>
                            <button type="button" role="switch" aria-checked={zoomWaitingRoom} className={`asg-toggle-switch ${zoomWaitingRoom ? "on" : ""}`} onClick={() => setZoomWaitingRoom((v) => !v)} />
                          </div>
                          <div className="asg-modal-toggle-card">
                            <div className="asg-modal-toggle-card-text">
                              <span className="asg-modal-toggle-label">Mute Participants on Entry</span>
                              <span className="asg-modal-toggle-desc">All attendees start the meeting with their microphone muted.</span>
                            </div>
                            <button type="button" role="switch" aria-checked={zoomMuteOnEntry} className={`asg-toggle-switch ${zoomMuteOnEntry ? "on" : ""}`} onClick={() => setZoomMuteOnEntry((v) => !v)} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="asg-modal-section">
                    <div className="asg-modal-zoom-step">
                      <span className="asg-modal-zoom-num">3</span>
                      <div>
                        <h3 className="asg-modal-section-title">Instructor Sync</h3>
                        <p className="asg-modal-hint">Map your IMETS Academy instructors to their professional Zoom licenses to enable hosting permissions.</p>
                        <div className="asg-modal-zoom-table">
                          <div className="asg-modal-zoom-row asg-modal-zoom-row--head">
                            <span>INSTRUCTOR</span><span>ZOOM LICENSE EMAIL</span><span>STATUS</span>
                          </div>
                          <div className="asg-modal-zoom-row">
                            <span className="asg-modal-zoom-instructor"><span className="asg-modal-zoom-avatar">SA</span> Sarah Anderson</span>
                            <span><select className="asg-modal-input asg-modal-input--inline"><option>s.anderson@imets.edu</option></select></span>
                            <span><Check className="w-4 h-4 text-green-600" /></span>
                          </div>
                          <div className="asg-modal-zoom-row">
                            <span className="asg-modal-zoom-instructor"><span className="asg-modal-zoom-avatar">JM</span> James Miller</span>
                            <span><select className="asg-modal-input asg-modal-input--inline"><option>Select Zoom Email...</option></select></span>
                            <span className="asg-modal-zoom-status-pending" aria-hidden>○</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                <div className="asg-modal-footer asg-modal-footer--zoom">
                  <div className="asg-modal-zoom-diagnostic">
                    <MessageCircle className="w-4 h-4" />
                    <div>
                      <span className="asg-modal-zoom-diagnostic-title">Diagnostic Mode</span>
                      <span className="asg-modal-zoom-diagnostic-desc">Verify API responsiveness before going live.</span>
                    </div>
                  </div>
                  <div className="asg-modal-footer-right">
                    <button type="button" className="asg-modal-btn asg-modal-btn--outline">Test Meeting API</button>
                    <button type="button" className="asg-modal-btn asg-modal-btn--primary">Save Configuration</button>
                  </div>
                </div>
              </>
            )}

            {integrationModalId === "webmaster" && (
              <>
                <div className="asg-modal-header">
                  <div className="asg-modal-title-row">
                    <div className="asg-modal-title-icon asg-modal-title-icon--blue">
                      <Star className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 id="asg-modal-title" className="asg-modal-title">Configure Search Console</h2>
                      <p className="asg-modal-subtitle">Setup SEO Verification for IMETS Academy</p>
                    </div>
                  </div>
                  <button type="button" className="asg-modal-close" onClick={() => setIntegrationModalId(null)} aria-label="Close"><X className="w-5 h-5" /></button>
                </div>
                <div className="asg-modal-body">
                  <section className="asg-modal-section">
                    <div className="asg-modal-sc-head">
                      <h3 className="asg-modal-section-title">1. SITE VERIFICATION</h3>
                      <span className="asg-modal-sc-status asg-modal-sc-status--pending"><span className="asg-modal-sc-dot" /> Pending Verification</span>
                    </div>
                    <div className="asg-modal-sc-tabs">
                      <button type="button" className={`asg-modal-sc-tab ${searchConsoleVerificationTab === "html" ? "asg-modal-sc-tab--on" : ""}`} onClick={() => setSearchConsoleVerificationTab("html")}>HTML Tag</button>
                      <button type="button" className={`asg-modal-sc-tab ${searchConsoleVerificationTab === "dns" ? "asg-modal-sc-tab--on" : ""}`} onClick={() => setSearchConsoleVerificationTab("dns")}>DNS Record</button>
                    </div>
                    {searchConsoleVerificationTab === "html" && (
                      <>
                        <p className="asg-modal-sc-instruction">Copy the meta tag below and paste it into your site&apos;s <code>&lt;head&gt;</code> section.</p>
                        <div className="asg-modal-sc-snippet-wrap">
                          <code className="asg-modal-sc-snippet">{searchConsoleMetaTag}</code>
                          <button type="button" className="asg-modal-sc-copy" onClick={() => { navigator.clipboard.writeText(searchConsoleMetaTag); }} aria-label="Copy"><Copy className="w-4 h-4" /></button>
                        </div>
                      </>
                    )}
                    {searchConsoleVerificationTab === "dns" && (
                      <p className="asg-modal-hint">Add a TXT record to your domain with the verification code provided in Google Search Console.</p>
                    )}
                  </section>
                  <section className="asg-modal-section">
                    <div className="asg-modal-sc-head">
                      <h3 className="asg-modal-section-title">2. SITEMAP SYNC</h3>
                      <span className="asg-modal-sc-meta">Last pinged: Never</span>
                    </div>
                    <div className="asg-modal-sc-sitemap-row">
                      <div className="asg-modal-sc-sitemap-card">
                        <div className="asg-modal-sc-sitemap-icon"><Box className="w-5 h-5" /></div>
                        <div>
                          <p className="asg-modal-sc-sitemap-title">Auto-generated XML Sitemap</p>
                          <a href="https://imets.academy/sitemap.xml" className="asg-modal-sc-sitemap-url" target="_blank" rel="noopener noreferrer">https://imets.academy/sitemap.xml</a>
                        </div>
                      </div>
                      <button type="button" className="asg-modal-btn asg-modal-btn--primary">Submit to Google</button>
                    </div>
                  </section>
                  <section className="asg-modal-section">
                    <h3 className="asg-modal-section-title">3. DATA INTEGRATION</h3>
                    <div className="asg-modal-toggle-card">
                      <div className="asg-modal-toggle-card-text">
                        <span className="asg-modal-toggle-label">Enable Search Insights</span>
                        <span className="asg-modal-toggle-desc">Allow IMETS Academy CRM to pull high-level search data (impressions, clicks, and top keywords) from Google Search Console into your dashboard.</span>
                      </div>
                      <button type="button" role="switch" aria-checked={searchConsoleSearchInsights} className={`asg-toggle-switch ${searchConsoleSearchInsights ? "on" : ""}`} onClick={() => setSearchConsoleSearchInsights((v) => !v)} />
                    </div>
                  </section>
                </div>
                <div className="asg-modal-footer asg-modal-footer--sc">
                  <p className="asg-modal-sc-secure"><Lock className="w-4 h-4" /> Secure connection to Google API</p>
                  <div className="asg-modal-footer-right">
                    <button type="button" className="asg-modal-btn asg-modal-btn--ghost" onClick={() => setIntegrationModalId(null)}>Cancel</button>
                    <button type="button" className="asg-modal-btn asg-modal-btn--primary">Complete Setup <ArrowRight className="w-4 h-4" /></button>
                  </div>
                </div>
              </>
            )}

            {integrationModalId === "ga" && (
              <>
                <div className="asg-modal-header">
                  <div className="asg-modal-title-row">
                    <div className="asg-modal-title-icon asg-modal-title-icon--orange">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 id="asg-modal-title" className="asg-modal-title">Configure GA4 Measurement</h2>
                      <p className="asg-modal-subtitle">Sync your academy data with Google Analytics 4</p>
                    </div>
                  </div>
                  <button type="button" className="asg-modal-close" onClick={() => setIntegrationModalId(null)} aria-label="Close"><X className="w-5 h-5" /></button>
                </div>
                <div className="asg-modal-body">
                  <section className="asg-modal-section">
                    <div className="asg-modal-ga4-label-row">
                      <label className="asg-modal-label">Measurement ID (G-XXXXXXXX)</label>
                      <a href="#" className="asg-modal-ga4-help"><Info className="w-3.5 h-3.5" /> How to find your ID?</a>
                    </div>
                    <input type="text" className="asg-modal-input" value={ga4ModalMeasurementId} onChange={(e) => setGa4ModalMeasurementId(e.target.value)} placeholder="G-XXXXXXXXXX" />
                    <p className="asg-modal-ga4-format">FORMAT: G FOLLOWED BY 10 ALPHANUMERIC CHARACTERS</p>
                  </section>
                  <section className="asg-modal-section">
                    <h3 className="asg-modal-section-title"><BarChart3 className="asg-modal-section-icon" /> ENHANCED MEASUREMENT</h3>
                    <div className="asg-modal-ga4-toggles">
                      <div className="asg-modal-toggle-card">
                        <div className="asg-modal-toggle-card-text">
                          <span className="asg-modal-toggle-label">Scrolls</span>
                          <span className="asg-modal-toggle-desc">Track 90% page depth</span>
                        </div>
                        <button type="button" role="switch" aria-checked={ga4Scrolls} className={`asg-toggle-switch ${ga4Scrolls ? "on" : ""}`} onClick={() => setGa4Scrolls((v) => !v)} />
                      </div>
                      <div className="asg-modal-toggle-card">
                        <div className="asg-modal-toggle-card-text">
                          <span className="asg-modal-toggle-label">Site Search</span>
                          <span className="asg-modal-toggle-desc">Course search queries</span>
                        </div>
                        <button type="button" role="switch" aria-checked={ga4SiteSearch} className={`asg-toggle-switch ${ga4SiteSearch ? "on" : ""}`} onClick={() => setGa4SiteSearch((v) => !v)} />
                      </div>
                      <div className="asg-modal-toggle-card">
                        <div className="asg-modal-toggle-card-text">
                          <span className="asg-modal-toggle-label">Outbound Clicks</span>
                          <span className="asg-modal-toggle-desc">Clicks to external domains</span>
                        </div>
                        <button type="button" role="switch" aria-checked={ga4OutboundClicks} className={`asg-toggle-switch ${ga4OutboundClicks ? "on" : ""}`} onClick={() => setGa4OutboundClicks((v) => !v)} />
                      </div>
                      <div className="asg-modal-toggle-card">
                        <div className="asg-modal-toggle-card-text">
                          <span className="asg-modal-toggle-label">E-commerce Tracking</span>
                          <span className="asg-modal-toggle-desc">Track course revenue data</span>
                        </div>
                        <button type="button" role="switch" aria-checked={ga4Ecommerce} className={`asg-toggle-switch ${ga4Ecommerce ? "on" : ""}`} onClick={() => setGa4Ecommerce((v) => !v)} />
                      </div>
                    </div>
                  </section>
                  <section className="asg-modal-section">
                    <h3 className="asg-modal-section-title"><Code2 className="asg-modal-section-icon" /> Custom Script (GTM Snippets)</h3>
                    <textarea className="asg-modal-ga4-textarea" value={ga4CustomScript} onChange={(e) => setGa4CustomScript(e.target.value)} placeholder={`<!-- Global site tag (gtag.js) - Google Analytics -->\n<script async src='https://www.googletagmanager.com/gtag/js?id=G-XXXX'></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', 'G-XXXX');\n</script>`} rows={6} />
                    <p className="asg-modal-hint">Inject additional scripts before the closing head tag.</p>
                  </section>
                </div>
                <div className="asg-modal-footer asg-modal-footer--ga4">
                  <button type="button" className="asg-modal-btn asg-modal-btn--secondary"><User className="w-4 h-4" /> Test Event</button>
                  <div className="asg-modal-footer-right">
                    <button type="button" className="asg-modal-btn asg-modal-btn--link" onClick={() => setIntegrationModalId(null)}>Cancel</button>
                    <button type="button" className="asg-modal-btn asg-modal-btn--primary"><Save className="w-4 h-4" /> Save Configuration</button>
                  </div>
                </div>
              </>
            )}

            {integrationModalId === "fb-pixel" && (
              <>
                <div className="asg-modal-header">
                  <div className="asg-modal-title-row">
                    <div className="asg-modal-title-icon asg-modal-title-icon--fb">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 id="asg-modal-title" className="asg-modal-title">Configure Meta Pixel & API</h2>
                      <p className="asg-modal-subtitle">Connect your Facebook marketing tools</p>
                    </div>
                  </div>
                  <button type="button" className="asg-modal-close" onClick={() => setIntegrationModalId(null)} aria-label="Close"><X className="w-5 h-5" /></button>
                </div>
                <div className="asg-modal-body">
                  <div className="asg-modal-meta-ready">
                    <div>
                      <h3 className="asg-modal-meta-ready-title">Integration Ready</h3>
                      <p className="asg-modal-meta-ready-desc">Complete the fields below to start tracking conversion events.</p>
                    </div>
                    <span className="asg-modal-meta-badge"><span className="asg-modal-meta-badge-dot" /> Ready to Connect</span>
                  </div>
                  <section className="asg-modal-section">
                    <div className="asg-modal-ga4-label-row">
                      <label className="asg-modal-label">Pixel ID</label>
                      <a href="#" className="asg-modal-ga4-help"><ExternalLink className="w-3.5 h-3.5" /> Where do I find this?</a>
                    </div>
                    <input type="text" className="asg-modal-input" value={metaPixelModalId} onChange={(e) => setMetaPixelModalId(e.target.value)} placeholder="e.g. 1234567890" />
                  </section>
                  <section className="asg-modal-section">
                    <div className="asg-modal-ga4-label-row">
                      <label className="asg-modal-label">Conversion API (CAPI) Access Token <Info className="w-3.5 h-3.5 asg-modal-inline-icon" /></label>
                    </div>
                    <textarea className="asg-modal-input asg-modal-textarea" value={metaPixelModalCapiToken} onChange={(e) => setMetaPixelModalCapiToken(e.target.value)} placeholder="Paste your system user access token here..." rows={3} />
                    <p className="asg-modal-hint">Recommended for bypass of cookie limitations and improved attribution.</p>
                  </section>
                  <section className="asg-modal-section">
                    <h3 className="asg-modal-section-title">Enable Event Tracking</h3>
                    <div className="asg-modal-ga4-toggles asg-modal-meta-checks">
                      <label className="asg-modal-ma-check"><input type="checkbox" checked={metaPixelEventLeadForm} onChange={(e) => setMetaPixelEventLeadForm(e.target.checked)} /> Lead Form Submitted</label>
                      <label className="asg-modal-ma-check"><input type="checkbox" checked={metaPixelEventCoursePurchase} onChange={(e) => setMetaPixelEventCoursePurchase(e.target.checked)} /> Course Purchase</label>
                      <label className="asg-modal-ma-check"><input type="checkbox" checked={metaPixelEventLmsLogin} onChange={(e) => setMetaPixelEventLmsLogin(e.target.checked)} /> LMS Login</label>
                      <label className="asg-modal-ma-check"><input type="checkbox" checked={metaPixelEventViewContent} onChange={(e) => setMetaPixelEventViewContent(e.target.checked)} /> View Content</label>
                    </div>
                  </section>
                </div>
                <div className="asg-modal-footer asg-modal-footer--meta">
                  <button type="button" className="asg-modal-btn asg-modal-btn--ghost" onClick={() => setIntegrationModalId(null)}>Cancel</button>
                  <div className="asg-modal-footer-right">
                    <button type="button" className="asg-modal-btn asg-modal-btn--primary"><Zap className="w-4 h-4" /> Connect & Save</button>
                  </div>
                </div>
              </>
            )}

            {integrationModalId && !["vdocipher", "payment", "whatsapp", "zoom", "webmaster", "ga", "fb-pixel"].includes(integrationModalId) && (
              <>
                <div className="asg-modal-header">
                  <h2 id="asg-modal-title" className="asg-modal-title">Configure integration</h2>
                  <button type="button" className="asg-modal-close" onClick={() => setIntegrationModalId(null)} aria-label="Close"><X className="w-5 h-5" /></button>
                </div>
                <div className="asg-modal-body">
                  <p className="asg-modal-placeholder-text">Configuration for this integration is coming soon.</p>
                </div>
                <div className="asg-modal-footer">
                  <button type="button" className="asg-modal-btn asg-modal-btn--ghost" onClick={() => setIntegrationModalId(null)}>Close</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="asg-footer">
        <span className="asg-footer-copy">
          © 2024 IMETS Systems. All rights reserved.
        </span>
        <div className="asg-footer-links">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Documentation</Link>
          <Link href="#">System Status</Link>
        </div>
      </footer>
    </div>
  );
}

function SettingsFallback() {
  return (
    <div className="asg-root" style={{ alignItems: "center", justifyContent: "center" }}>
      <p className="text-gray-500">Loading settings…</p>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<SettingsFallback />}>
      <SettingsContent />
    </Suspense>
  );
}
