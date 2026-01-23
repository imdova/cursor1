'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockQuizzes } from '@/lib/quizData';
import { Quiz } from '@/types/quiz';

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(mockQuizzes);

  const handleDelete = (quizId: string) => {
    if (confirm('Are you sure you want to delete this quiz? This action cannot be undone.')) {
      setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Quiz Management</h1>
          <p className="text-sm sm:text-base text-gray-600">Create and manage quizzes for your courses</p>
        </div>
        <Link
          href="/instructor/quizzes/new"
          className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center text-sm sm:text-base"
        >
          + Create New Quiz
        </Link>
      </div>

      {quizzes.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No quizzes yet</h2>
          <p className="text-gray-600 mb-6">Get started by creating your first quiz</p>
          <Link
            href="/instructor/quizzes/new"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Create Your First Quiz
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Quiz Title</th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Course</th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Questions</th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Duration</th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {quizzes.map((quiz) => (
                  <tr key={quiz.id} className="hover:bg-gray-50">
                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm lg:text-base">{quiz.title}</p>
                        <p className="text-xs lg:text-sm text-gray-500 line-clamp-1">{quiz.description}</p>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-gray-700 text-sm">
                      {quiz.courseName || 'N/A'}
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-gray-700 text-sm">
                      {quiz.questions.length}
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-gray-700 text-sm">
                      {quiz.duration} min
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <span
                        className={`px-2 lg:px-3 py-1 rounded-full text-xs font-semibold ${
                          quiz.isPublished
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {quiz.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                      <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                        <Link
                          href={`/instructor/quizzes/${quiz.id}/preview`}
                          className="text-blue-600 hover:text-blue-700 font-semibold text-xs lg:text-sm"
                          title="Preview as student"
                        >
                          👁️
                        </Link>
                        <Link
                          href={`/instructor/quizzes/${quiz.id}/edit`}
                          className="text-blue-600 hover:text-blue-700 font-semibold text-xs lg:text-sm"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/instructor/quizzes/${quiz.id}/questions`}
                          className="text-purple-600 hover:text-purple-700 font-semibold text-xs lg:text-sm"
                        >
                          Questions
                        </Link>
                        <button
                          onClick={() => handleDelete(quiz.id)}
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
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="p-4">
                <div className="mb-3">
                  <p className="font-semibold text-gray-900 text-sm mb-1">{quiz.title}</p>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{quiz.description}</p>
                  <div className="flex items-center space-x-3 text-xs text-gray-600 mb-2">
                    <span>{quiz.courseName || 'N/A'}</span>
                    <span>•</span>
                    <span>{quiz.questions.length} questions</span>
                    <span>•</span>
                    <span>{quiz.duration} min</span>
                  </div>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      quiz.isPublished
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {quiz.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-200">
                  <Link
                    href={`/instructor/quizzes/${quiz.id}/preview`}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-xs"
                  >
                    👁️ Preview
                  </Link>
                  <Link
                    href={`/instructor/quizzes/${quiz.id}/edit`}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-xs"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/instructor/quizzes/${quiz.id}/questions`}
                    className="text-purple-600 hover:text-purple-700 font-semibold text-xs"
                  >
                    Questions
                  </Link>
                  <button
                    onClick={() => handleDelete(quiz.id)}
                    className="text-red-600 hover:text-red-700 font-semibold text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
