'use client';

import { useState } from 'react';
import Link from 'next/link';
import { courses } from '@/lib/data';
import { Course } from '@/types/course';

export default function InstructorCoursesPage() {
  const [courseList, setCourseList] = useState<Course[]>(courses.slice(0, 3)); // Simulating instructor's courses

  const handleDelete = (courseId: string) => {
    if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      setCourseList(courseList.filter((course) => course.id !== courseId));
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage and organize your courses</p>
        </div>
        <Link
          href="/instructor/courses/new"
          className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center text-sm sm:text-base"
        >
          + Create New Course
        </Link>
      </div>

      {courseList.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No courses yet</h2>
          <p className="text-gray-600 mb-6">Get started by creating your first course</p>
          <Link
            href="/instructor/courses/new"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Create Your First Course
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Course</th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Students</th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Rating</th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {courseList.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <div className="flex items-center space-x-3 lg:space-x-4">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-16 h-10 lg:w-20 lg:h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm lg:text-base">{course.title}</p>
                          <p className="text-xs lg:text-sm text-gray-500">{course.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-gray-700 text-sm">
                      {course.studentCount.toLocaleString()}
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="font-semibold text-sm">{course.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <span className="px-2 lg:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        Published
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <div className="flex items-center space-x-2 lg:space-x-3">
                        <Link
                          href={`/instructor/courses/${course.id}/edit`}
                          className="text-blue-600 hover:text-blue-700 font-semibold text-xs lg:text-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="text-red-600 hover:text-red-700 font-semibold text-xs lg:text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-200">
            {courseList.map((course) => (
              <div key={course.id} className="p-4">
                <div className="flex items-start space-x-3 mb-3">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-20 h-12 object-cover rounded flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm mb-1">{course.title}</p>
                    <p className="text-xs text-gray-500 mb-2">{course.category}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-600">
                      <span>{course.studentCount.toLocaleString()} students</span>
                      <span className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        {course.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    Published
                  </span>
                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/instructor/courses/${course.id}/edit`}
                      className="text-blue-600 hover:text-blue-700 font-semibold text-xs"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="text-red-600 hover:text-red-700 font-semibold text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
