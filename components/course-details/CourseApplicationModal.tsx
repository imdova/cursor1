"use client";

import { useState } from "react";
import { X } from "lucide-react";

const SPECIALTY_OPTIONS = [
  "Doctor",
  "Dentist",
  "Pharmacist",
  "Nurse",
  "Technician",
  "Healthcare Administrator",
  "Medical Student",
  "Other",
];

interface CourseApplicationModalProps {
  onClose: () => void;
  courseTitle?: string;
}

export default function CourseApplicationModal({
  onClose,
  courseTitle,
}: CourseApplicationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+20",
    whatsapp: "",
    specialty: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: submit to API
    alert("Application submitted successfully. We will contact you soon.");
    onClose();
  };

  const inputClass =
    "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a47c2] focus:border-[#0a47c2] bg-white";
  const selectClass =
    "w-full pl-3 pr-9 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a47c2] focus:border-[#0a47c2] bg-white text-black appearance-none cursor-pointer bg-no-repeat bg-[length:14px] bg-[right_0.5rem_center]";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-application-title"
    >
      <div
        className="course-application-modal bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`.course-application-modal option { color: #000; }`}</style>
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2
                id="course-application-title"
                className="text-xl sm:text-2xl font-bold text-black"
              >
                Course Application
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                After submitting you will have access to one of our exclusive
                courses.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors shrink-0"
              aria-label="Close"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="app-name" className={labelClass}>
                Name
              </label>
              <input
                id="app-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label htmlFor="app-email" className={labelClass}>
                Email Address
              </label>
              <input
                id="app-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="Your Email Address"
                required
              />
            </div>
            <div>
              <label className={labelClass}>WhatsApp Number</label>
              <div className="flex">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="w-24 px-2 py-2 text-sm border border-gray-300 rounded-l-lg border-r-0 focus:outline-none focus:ring-2 focus:ring-[#0a47c2] bg-white text-black appearance-none cursor-pointer"
                >
                  <option value="+20" className="text-black">🇪🇬 +20</option>
                  <option value="+1" className="text-black">+1</option>
                  <option value="+44" className="text-black">+44</option>
                  <option value="+971" className="text-black">+971</option>
                  <option value="+966" className="text-black">+966</option>
                  <option value="+91" className="text-black">+91</option>
                </select>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className={`flex-1 ${inputClass} rounded-l-none`}
                  placeholder="Your WhatsApp Number"
                />
              </div>
            </div>
            <div>
              <label htmlFor="app-specialty" className={labelClass}>
                Specialty
              </label>
              <select
                id="app-specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className={selectClass}
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")" }}
                required
              >
                <option value="" className="text-black">Select Your specialty</option>
                {SPECIALTY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="text-black">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0a47c2] hover:bg-[#083a9e] transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
