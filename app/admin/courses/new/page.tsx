"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { categories } from "@/lib/data";
import CourseCompleteness from "@/components/CourseCompleteness";
import {
  CourseModule,
  CourseLesson,
  DiscountCoupon,
  CourseFormData,
} from "@/types/courseForm";

const COURSE_TYPES = [
  "Certificate",
  "Diploma",
  "Short Course",
  "Workshop",
  "Bootcamp",
  "Degree",
  "Micro-credential",
  "Other",
];
const STEP_LABELS = ["Basic Info", "Structure"] as const;

export default function CreateCoursePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [tagInput, setTagInput] = useState("");
  const [pricingExpanded, setPricingExpanded] = useState(false);
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    category: "",
    subcategory: "",
    courseType: "",
    tags: [],
    students: 0,
    lectures: 0,
    duration: "",
    attendanceMode: "",
    difficulty: "Beginner",
    thumbnail: null,
    thumbnailPreview: "",
    description: "",
    price: 0,
    salePrice: undefined,
    originalPrice: undefined,
    discountPercentage: undefined,
    currency: "EGP",
    pricingModel: "one-time",
    priceEGP: undefined,
    salePriceEGP: undefined,
    discountPercentageEGP: undefined,
    priceSAR: undefined,
    salePriceSAR: undefined,
    discountPercentageSAR: undefined,
    priceUSD: undefined,
    salePriceUSD: undefined,
    discountPercentageUSD: undefined,
    whatYouWillLearn: "",
    whoCanAttend: "",
    credits: "4",
    language: "English",
    modules: [],
    coupons: [],
    enrollmentLimit: false,
    enrollmentLimitCount: undefined,
    completionCertificate: true,
  });

  const steps = STEP_LABELS.map((name, i) => ({ number: i + 1, name }));

  const subcategories = useMemo(() => {
    const cat = categories.find((c) => c.name === formData.category);
    return cat?.subCategories ?? [];
  }, [formData.category]);

  const progressPercentage = Math.round((currentStep / steps.length) * 100);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const numericFields = [
      "price",
      "salePrice",
      "discountPercentage",
      "students",
      "lectures",
      "priceEGP",
      "salePriceEGP",
      "discountPercentageEGP",
      "priceSAR",
      "salePriceSAR",
      "discountPercentageSAR",
      "priceUSD",
      "salePriceUSD",
      "discountPercentageUSD",
    ];
    const num = numericFields.includes(name) ? parseFloat(value) || 0 : value;
    setFormData((prev) => {
      const next = { ...prev, [name]: num };
      if (name === "category") next.subcategory = "";
      return next;
    });
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !formData.tags.includes(t)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, t] }));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((x) => x !== tag),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        thumbnail: file,
        thumbnailPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({
        ...prev,
        thumbnail: file,
        thumbnailPreview: URL.createObjectURL(file),
      }));
    }
  };

  // Module and Lesson Management
  const addModule = () => {
    const newModule: CourseModule = {
      id: `module-${Date.now()}`,
      title: `Module ${formData.modules.length + 1}`,
      order: formData.modules.length + 1,
      lessons: [],
    };
    setFormData((prev) => ({
      ...prev,
      modules: [...prev.modules, newModule],
    }));
  };

  const updateModule = (moduleId: string, title: string) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.map((m) =>
        m.id === moduleId ? { ...m, title } : m
      ),
    }));
  };

  const deleteModule = (moduleId: string) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.filter((m) => m.id !== moduleId),
    }));
  };

  const addLesson = (moduleId: string) => {
    const module = formData.modules.find((m) => m.id === moduleId);
    if (!module) return;

    const newLesson: CourseLesson = {
      id: `lesson-${Date.now()}`,
      title: "",
      order: module.lessons.length + 1,
      contentType: "video",
      isPreview: false,
    };

    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.map((m) =>
        m.id === moduleId ? { ...m, lessons: [...m.lessons, newLesson] } : m
      ),
    }));
  };

  const updateLesson = (
    moduleId: string,
    lessonId: string,
    updates: Partial<CourseLesson>
  ) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              lessons: m.lessons.map((l) =>
                l.id === lessonId ? { ...l, ...updates } : l
              ),
            }
          : m
      ),
    }));
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.map((m) =>
        m.id === moduleId
          ? { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) }
          : m
      ),
    }));
  };

  const handleLessonFileUpload = (
    moduleId: string,
    lessonId: string,
    file: File,
    type: "video" | "pdf"
  ) => {
    updateLesson(moduleId, lessonId, {
      contentType: type,
      fileName: file.name,
      contentUrl: URL.createObjectURL(file),
    });
  };

  // Coupon Management
  const addCoupon = () => {
    const newCoupon: DiscountCoupon = {
      id: `coupon-${Date.now()}`,
      code: "",
      discount: 0,
      expiryDate: "",
    };
    setFormData((prev) => ({
      ...prev,
      coupons: [...prev.coupons, newCoupon],
    }));
  };

  const updateCoupon = (couponId: string, updates: Partial<DiscountCoupon>) => {
    setFormData((prev) => ({
      ...prev,
      coupons: prev.coupons.map((c) =>
        c.id === couponId ? { ...c, ...updates } : c
      ),
    }));
  };

  const deleteCoupon = (couponId: string) => {
    setFormData((prev) => ({
      ...prev,
      coupons: prev.coupons.filter((c) => c.id !== couponId),
    }));
  };

  const handleSaveDraft = () => {
    alert("Draft saved successfully!");
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Course created successfully!");
    router.push("/admin/courses");
  };

  // Calculate completeness metrics
  const videoCount = formData.modules.reduce(
    (acc, module) =>
      acc +
      module.lessons.filter((l) => l.contentType === "video" && l.contentUrl)
        .length,
    0
  );
  const hasResources = formData.modules.some((m) =>
    m.lessons.some((l) => l.contentType === "pdf" && l.contentUrl)
  );
  const hasPreview = formData.modules.some((m) =>
    m.lessons.some((l) => l.isPreview)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Steps section - full width across body and right column */}
            <div className="lg:col-span-3">
              <h1 className="text-2xl font-bold text-gray-900">
                Add New Course
              </h1>
              <p className="text-gray-600 mt-1">
                Create a comprehensive learning program for your students.
              </p>
              <div className="flex items-center gap-2 mt-6">
                {steps.map((step, idx) => (
                  <div key={step.number} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(step.number)}
                      className="flex items-center gap-2 rounded-lg px-1 py-0.5 -mx-1 cursor-pointer hover:bg-gray-100 transition-colors text-left"
                      aria-current={
                        currentStep === step.number ? "step" : undefined
                      }
                    >
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                          currentStep === step.number
                            ? "bg-admin-primary text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {step.number}
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          currentStep === step.number
                            ? "text-gray-900 underline"
                            : "text-gray-500"
                        }`}
                      >
                        {step.name}
                      </span>
                    </button>
                    {idx < steps.length - 1 && (
                      <div className="w-6 h-px bg-gray-300 mx-1" aria-hidden />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Main body */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8 space-y-8">
                {currentStep === 1 && (
                  <>
                    <section>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Step 1: Basic Information
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Enter the primary identification details for the course.
                      </p>

                      <div className="mt-6 space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Course Title
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="e.g. Advanced Software Engineering Fundamentals."
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              Category
                            </label>
                            <select
                              name="category"
                              value={formData.category}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
                              required
                            >
                              <option value="">Select category</option>
                              {categories.map((c) => (
                                <option key={c.id} value={c.name}>
                                  {c.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              Subcategory
                            </label>
                            <select
                              name="subcategory"
                              value={formData.subcategory}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
                              disabled={!formData.category}
                            >
                              <option value="">Select subcategory</option>
                              {subcategories.map((s) => (
                                <option key={s.id} value={s.name}>
                                  {s.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              Course Type
                            </label>
                            <select
                              name="courseType"
                              value={formData.courseType}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
                            >
                              <option value="">Select type</option>
                              {COURSE_TYPES.map((t) => (
                                <option key={t} value={t}>
                                  {t}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Description
                          </label>
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Provide a detailed overview of the course objectives and curriculum..."
                            rows={6}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary resize-y"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              Students
                            </label>
                            <input
                              type="number"
                              name="students"
                              value={formData.students || ""}
                              onChange={handleInputChange}
                              min={0}
                              placeholder="0"
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              Lectures
                            </label>
                            <input
                              type="number"
                              name="lectures"
                              value={formData.lectures || ""}
                              onChange={handleInputChange}
                              min={0}
                              placeholder="0"
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              Duration
                            </label>
                            <input
                              type="text"
                              name="duration"
                              value={formData.duration}
                              onChange={handleInputChange}
                              placeholder="e.g. 12 Weeks"
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
                            />
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Pricing – separate card */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-sm font-medium text-gray-700">
                          Pricing
                        </span>
                        <button
                          type="button"
                          onClick={() => setPricingExpanded((v) => !v)}
                          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-admin-primary rounded px-2 py-1"
                          aria-expanded={pricingExpanded}
                          aria-label={
                            pricingExpanded
                              ? "Hide SAR & USD pricing"
                              : "Show SAR & USD pricing"
                          }
                        >
                          <span
                            className={`inline-block transition-transform ${
                              pricingExpanded ? "rotate-90" : ""
                            }`}
                            aria-hidden
                          >
                            ▶
                          </span>
                          <span className="text-xs">
                            {pricingExpanded
                              ? "Hide SAR & USD"
                              : "Show SAR & USD"}
                          </span>
                        </button>
                      </div>
                      {/* Row 1: EGP (always visible) */}
                      <div className="mb-4 flex flex-wrap items-start gap-4">
                        <div className="flex items-center gap-2 min-w-[4.5rem] shrink-0 pt-6">
                          <span
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700"
                            aria-hidden
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-4 w-4"
                            >
                              <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                            </svg>
                          </span>
                          <span className="text-sm font-medium text-gray-700">
                            EGP
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1 min-w-0">
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">
                              Price
                            </label>
                            <input
                              type="number"
                              name="priceEGP"
                              value={formData.priceEGP ?? ""}
                              onChange={handleInputChange}
                              min={0}
                              step={0.01}
                              placeholder="0"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">
                              Sale price
                            </label>
                            <input
                              type="number"
                              name="salePriceEGP"
                              value={formData.salePriceEGP ?? ""}
                              onChange={handleInputChange}
                              min={0}
                              step={0.01}
                              placeholder="0"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">
                              Discount (%)
                            </label>
                            <input
                              type="number"
                              name="discountPercentageEGP"
                              value={formData.discountPercentageEGP ?? ""}
                              onChange={handleInputChange}
                              min={0}
                              max={100}
                              placeholder="0"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
                            />
                          </div>
                        </div>
                      </div>
                      {pricingExpanded && (
                        <>
                          <div className="mb-4 flex flex-wrap items-start gap-4">
                            <div className="flex items-center gap-2 min-w-[4.5rem] shrink-0 pt-6">
                              <span
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
                                aria-hidden
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="h-4 w-4"
                                >
                                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                                </svg>
                              </span>
                              <span className="text-sm font-medium text-gray-700">
                                SAR
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1 min-w-0">
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                  Price
                                </label>
                                <input
                                  type="number"
                                  name="priceSAR"
                                  value={formData.priceSAR ?? ""}
                                  onChange={handleInputChange}
                                  min={0}
                                  step={0.01}
                                  placeholder="0"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                  Sale price
                                </label>
                                <input
                                  type="number"
                                  name="salePriceSAR"
                                  value={formData.salePriceSAR ?? ""}
                                  onChange={handleInputChange}
                                  min={0}
                                  step={0.01}
                                  placeholder="0"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                  Discount (%)
                                </label>
                                <input
                                  type="number"
                                  name="discountPercentageSAR"
                                  value={formData.discountPercentageSAR ?? ""}
                                  onChange={handleInputChange}
                                  min={0}
                                  max={100}
                                  placeholder="0"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-start gap-4">
                            <div className="flex items-center gap-2 min-w-[4.5rem] shrink-0 pt-6">
                              <span
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-700"
                                aria-hidden
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="h-4 w-4"
                                >
                                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                                </svg>
                              </span>
                              <span className="text-sm font-medium text-gray-700">
                                USD
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1 min-w-0">
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                  Price
                                </label>
                                <input
                                  type="number"
                                  name="priceUSD"
                                  value={formData.priceUSD ?? ""}
                                  onChange={handleInputChange}
                                  min={0}
                                  step={0.01}
                                  placeholder="0"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                  Sale price
                                </label>
                                <input
                                  type="number"
                                  name="salePriceUSD"
                                  value={formData.salePriceUSD ?? ""}
                                  onChange={handleInputChange}
                                  min={0}
                                  step={0.01}
                                  placeholder="0"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                  Discount (%)
                                </label>
                                <input
                                  type="number"
                                  name="discountPercentageUSD"
                                  value={formData.discountPercentageUSD ?? ""}
                                  onChange={handleInputChange}
                                  min={0}
                                  max={100}
                                  placeholder="0"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <section>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Step 2: Course Structure
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Define what students will learn, who can attend, and the
                      curriculum.
                    </p>

                    <div className="mt-6 space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          What you&apos;ll learn in this course?
                        </label>
                        <textarea
                          name="whatYouWillLearn"
                          value={formData.whatYouWillLearn}
                          onChange={handleInputChange}
                          placeholder="List key learning outcomes (e.g. one per line or as bullet points)"
                          rows={4}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary resize-y"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Who can Attend this course?
                        </label>
                        <textarea
                          name="whoCanAttend"
                          value={formData.whoCanAttend}
                          onChange={handleInputChange}
                          placeholder="Describe the target audience, prerequisites, or eligibility"
                          rows={3}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary resize-y"
                        />
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Duration
                        </label>
                        <input
                          type="text"
                          name="duration"
                          value={formData.duration}
                          onChange={handleInputChange}
                          placeholder="e.g. 12 Weeks"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Credits
                        </label>
                        <input
                          type="text"
                          name="credits"
                          value={formData.credits}
                          onChange={handleInputChange}
                          placeholder="e.g. 4"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
                        />
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-base font-semibold text-gray-900 mb-2">
                        Curriculum
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Build your course structure by adding modules and
                        lessons.
                      </p>

                      {/* Modules */}
                      <div className="space-y-4">
                        {formData.modules.map((module, moduleIndex) => (
                          <div
                            key={module.id}
                            className="border border-gray-200 rounded-lg"
                          >
                            <div className="bg-gray-50 p-4 flex items-center justify-between">
                              <div className="flex items-center space-x-3 flex-1">
                                <span className="text-gray-400 cursor-move">
                                  ⋮⋮
                                </span>
                                <div className="flex-1">
                                  <span className="text-xs font-semibold text-green-600 uppercase mr-2">
                                    MODULE {moduleIndex + 1}
                                  </span>
                                  <input
                                    type="text"
                                    value={module.title}
                                    onChange={(e) =>
                                      updateModule(module.id, e.target.value)
                                    }
                                    className="text-lg font-semibold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2"
                                    placeholder="Module title"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newTitle = prompt(
                                      "Edit module title:",
                                      module.title
                                    );
                                    if (newTitle)
                                      updateModule(module.id, newTitle);
                                  }}
                                  className="p-2 text-gray-600 hover:text-green-600"
                                  title="Edit"
                                >
                                  ✏️
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (confirm("Delete this module?"))
                                      deleteModule(module.id);
                                  }}
                                  className="p-2 text-gray-600 hover:text-red-600"
                                  title="Delete"
                                >
                                  🗑️
                                </button>
                              </div>
                            </div>

                            <div className="p-4 space-y-3">
                              {module.lessons.length === 0 ? (
                                <button
                                  type="button"
                                  onClick={() => addLesson(module.id)}
                                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors"
                                >
                                  + Create first lesson
                                </button>
                              ) : (
                                <>
                                  {module.lessons.map((lesson, lessonIndex) => (
                                    <div
                                      key={lesson.id}
                                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                                    >
                                      <span className="text-gray-400 cursor-move">
                                        ☰
                                      </span>
                                      <input
                                        type="text"
                                        value={lesson.title}
                                        onChange={(e) =>
                                          updateLesson(module.id, lesson.id, {
                                            title: e.target.value,
                                          })
                                        }
                                        placeholder="Lesson title"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                      />
                                      <div className="flex items-center space-x-2">
                                        {lesson.contentType === "video" ? (
                                          <label className="px-3 py-2 bg-green-100 text-green-700 rounded-lg cursor-pointer hover:bg-green-200">
                                            {lesson.fileName ? (
                                              <span className="flex items-center">
                                                <span className="mr-2">✓</span>
                                                {lesson.fileName}
                                              </span>
                                            ) : (
                                              <span className="flex items-center">
                                                📹 Video
                                                <input
                                                  type="file"
                                                  accept="video/*"
                                                  onChange={(e) => {
                                                    const file =
                                                      e.target.files?.[0];
                                                    if (file)
                                                      handleLessonFileUpload(
                                                        module.id,
                                                        lesson.id,
                                                        file,
                                                        "video"
                                                      );
                                                  }}
                                                  className="hidden"
                                                />
                                              </span>
                                            )}
                                          </label>
                                        ) : (
                                          <button
                                            type="button"
                                            onClick={() =>
                                              updateLesson(
                                                module.id,
                                                lesson.id,
                                                {
                                                  contentType: "video",
                                                }
                                              )
                                            }
                                            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                                          >
                                            📹 Video
                                          </button>
                                        )}
                                        {lesson.contentType === "pdf" ? (
                                          <label className="px-3 py-2 bg-green-100 text-green-700 rounded-lg cursor-pointer hover:bg-green-200">
                                            {lesson.fileName ? (
                                              <span className="flex items-center">
                                                <span className="mr-2">✓</span>
                                                {lesson.fileName}
                                              </span>
                                            ) : (
                                              <span className="flex items-center">
                                                📄 PDF
                                                <input
                                                  type="file"
                                                  accept=".pdf"
                                                  onChange={(e) => {
                                                    const file =
                                                      e.target.files?.[0];
                                                    if (file)
                                                      handleLessonFileUpload(
                                                        module.id,
                                                        lesson.id,
                                                        file,
                                                        "pdf"
                                                      );
                                                  }}
                                                  className="hidden"
                                                />
                                              </span>
                                            )}
                                          </label>
                                        ) : (
                                          <button
                                            type="button"
                                            onClick={() =>
                                              updateLesson(
                                                module.id,
                                                lesson.id,
                                                {
                                                  contentType: "pdf",
                                                }
                                              )
                                            }
                                            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                                          >
                                            📄 PDF
                                          </button>
                                        )}
                                      </div>
                                      <label className="flex items-center space-x-2">
                                        <input
                                          type="checkbox"
                                          checked={lesson.isPreview}
                                          onChange={(e) =>
                                            updateLesson(module.id, lesson.id, {
                                              isPreview: e.target.checked,
                                            })
                                          }
                                          className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                                        />
                                        <span className="text-sm text-gray-700">
                                          Free Preview
                                        </span>
                                      </label>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (confirm("Delete this lesson?"))
                                            deleteLesson(module.id, lesson.id);
                                        }}
                                        className="p-2 text-gray-400 hover:text-red-600"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={() => addLesson(module.id)}
                                    className="w-full py-2 border border-gray-300 rounded-lg text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors"
                                  >
                                    + Add Lesson
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={addModule}
                          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors font-semibold flex items-center justify-center"
                        >
                          <span className="text-2xl mr-2">+</span>
                          Add New Module
                        </button>
                      </div>
                    </div>
                  </section>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-end items-center gap-3 mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
                    </svg>
                    Save as Draft
                  </button>
                  <Link
                    href="/admin/courses"
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Link>
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                    >
                      ← Previous
                    </button>
                  )}
                  {currentStep < 2 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-admin-primary text-white rounded-lg font-medium hover:bg-admin-primary-hover"
                    >
                      Next Step: {steps[currentStep]?.name ?? "Structure"} →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-admin-primary text-white rounded-lg font-medium hover:bg-admin-primary-hover"
                    >
                      Publish Course
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right column: Step 1 = image + tags; Step 2 = Course Completeness */}
            <div className="lg:col-span-1 space-y-6">
              {currentStep === 1 && (
                <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Image
                    </label>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-admin-primary transition-colors cursor-pointer"
                    >
                      {formData.thumbnailPreview ? (
                        <div className="space-y-3">
                          <img
                            src={formData.thumbnailPreview}
                            alt="Preview"
                            className="w-full aspect-video object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                thumbnail: null,
                                thumbnailPreview: "",
                              }))
                            }
                            className="text-sm text-red-600 hover:text-red-700 font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer block">
                          <div className="text-4xl text-gray-400 mb-2">🖼️</div>
                          <p className="text-sm text-gray-600">
                            Drag and drop or{" "}
                            <span className="text-admin-primary font-medium">
                              browse
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            1280×720 recommended (JPG, PNG)
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Language
                      </label>
                      <select
                        name="language"
                        value={formData.language}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
                      >
                        <option value="English">English</option>
                        <option value="Arabic">Arabic</option>
                        <option value="French">French</option>
                        <option value="Spanish">Spanish</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Attendance Mode
                      </label>
                      <select
                        name="attendanceMode"
                        value={formData.attendanceMode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
                      >
                        <option value="">Select mode</option>
                        <option value="Online">Online</option>
                        <option value="In-person">In-person</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-800 rounded-md text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-gray-500 hover:text-red-600"
                            aria-label={`Remove ${tag}`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                        placeholder="Add tag and press Enter"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <CourseCompleteness
                  courseTitle={formData.title}
                  moduleCount={formData.modules.length}
                  videoCount={videoCount}
                  hasResources={hasResources}
                  hasPreview={hasPreview}
                />
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Footer info boxes */}
      <div className="max-w-6xl mx-auto px-6 mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex gap-3 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <span className="text-admin-primary text-lg font-bold">i</span>
          <div>
            <p className="text-sm font-medium text-gray-900">Validation Tip</p>
            <p className="text-sm text-gray-700">
              Ensure course identification details are unique within your
              department to avoid conflicts during enrollment.
            </p>
          </div>
        </div>
        <div className="flex gap-3 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <span className="text-admin-primary" aria-hidden>
            💡
          </span>
          <div>
            <p className="text-sm font-medium text-gray-900">Best Practice</p>
            <p className="text-sm text-gray-700">
              A clear description improves SEO and helps prospective students
              find your course.
            </p>
          </div>
        </div>
        <div className="flex gap-3 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <span className="text-admin-primary" aria-hidden>
            ↻
          </span>
          <div>
            <p className="text-sm font-medium text-gray-900">Autosave Active</p>
            <p className="text-sm text-gray-700">
              Your progress is automatically saved every 30 seconds to the
              cloud.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
