import Link from 'next/link';

export default function InstructorDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600">Welcome back, Alex! Here&apos;s your overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Courses</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">12</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-xl sm:text-2xl">📚</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Students</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">2,458</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-xl sm:text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">$12,450</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-xl sm:text-2xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Avg. Rating</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">4.8</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-xl sm:text-2xl">⭐</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200 mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Quick Actions</h2>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
          <Link
            href="/instructor/courses/new"
            className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center text-sm sm:text-base"
          >
            + Create New Course
          </Link>
          <Link
            href="/instructor/profile"
            className="w-full sm:w-auto bg-gray-100 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center text-sm sm:text-base"
          >
            Edit Profile
          </Link>
          <Link
            href="/instructor/courses"
            className="w-full sm:w-auto bg-gray-100 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center text-sm sm:text-base"
          >
            Manage Courses
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Recent Activity</h2>
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 pb-3 sm:pb-4 border-b border-gray-200">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <span className="text-sm sm:text-base">✓</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm sm:text-base">New student enrolled</p>
              <p className="text-xs sm:text-sm text-gray-600 truncate">John Doe enrolled in &quot;Complete React Development Bootcamp&quot;</p>
            </div>
            <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap shrink-0">2h ago</span>
          </div>
          <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 pb-3 sm:pb-4 border-b border-gray-200">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
              <span className="text-sm sm:text-base">📝</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm sm:text-base">Course updated</p>
              <p className="text-xs sm:text-sm text-gray-600 truncate">You updated &quot;Python for Data Science&quot;</p>
            </div>
            <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap shrink-0">1d ago</span>
          </div>
          <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-full flex items-center justify-center shrink-0">
              <span className="text-sm sm:text-base">💰</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm sm:text-base">New sale</p>
              <p className="text-xs sm:text-sm text-gray-600 truncate">&quot;UI/UX Design Masterclass&quot; was purchased</p>
            </div>
            <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap shrink-0">2d ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
