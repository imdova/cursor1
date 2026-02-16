"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { mockQuizzes } from "@/lib/quizData";
import { courses } from "@/lib/data";
import { Quiz } from "@/types/quiz";

export default function EditQuizPage() {
  const router = useRouter();
  const params = useParams();
  const quizId = params.id as string;

  const quiz = mockQuizzes.find((q) => q.id === quizId);

  const [formData, setFormData] = useState<Partial<Quiz>>(() =>
    quiz
      ? {
          title: quiz.title,
          description: quiz.description,
          courseId: quiz.courseId,
          duration: quiz.duration,
          passingScore: quiz.passingScore,
          maxAttempts: quiz.maxAttempts,
          isPublished: quiz.isPublished,
        }
      : {},
  );

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
            ? parseInt(value) || 0
            : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Quiz updated successfully!");
    router.push("/instructor/quizzes");
  };

  if (!quiz) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Quiz not found
          </h2>
          <button
            onClick={() => router.push("/instructor/quizzes")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Quiz</h1>
        <p className="text-gray-600">Update quiz information</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
          {/* Basic Information */}
          <div className="p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-1 h-6 bg-blue-600 rounded-full mr-3"></span>
              Basic Information
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quiz Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Course <span className="text-red-500">*</span>
                </label>
                <select
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Quiz Settings */}
          <div className="p-8 bg-gray-50">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-1 h-6 bg-blue-600 rounded-full mr-3"></span>
              Quiz Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <span className="mr-2">⏱️</span>
                  Duration (minutes) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  required
                />
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <span className="mr-2">🎯</span>
                  Passing Score (%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="passingScore"
                  value={formData.passingScore}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  required
                />
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <span className="mr-2">🔄</span>
                  Max Attempts <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="maxAttempts"
                  value={formData.maxAttempts}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  required
                />
              </div>
            </div>
          </div>

          {/* Publish Status */}
          <div className="p-8">
            <div className="flex items-center p-4 bg-blue-50 rounded-lg border-2 border-blue-100">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleInputChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
              />
              <label className="ml-3 text-sm font-semibold text-gray-700 cursor-pointer">
                Publish quiz
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-8 bg-gray-50 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push("/instructor/quizzes")}
              className="px-8 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-white hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
