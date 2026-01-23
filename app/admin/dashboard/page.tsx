'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { adminStats, salesData, topCourses, topInstructors, countryData, courseTypeData } from '@/lib/adminData';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Summary');
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [activeFilter, setActiveFilter] = useState('Courses');
  const [timeRange, setTimeRange] = useState('Year');

  const tabs = ['Summary', 'Courses', 'Students', 'Instructors', 'Academy', 'Finance'];

  const formatCurrency = (amount: number) => {
    return `EGP ${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getFilterValue = (filter: string): number => {
    const lastData = salesData[salesData.length - 1];
    const key = filter.toLowerCase() as keyof typeof lastData;
    return typeof lastData[key] === 'number' ? lastData[key] as number : 0;
  };

  const getDataKey = (filter: string): string => {
    return filter.toLowerCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Welcome back! Here's your platform overview.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-white">🔔</span>
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-gray-600">👤</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* All Students */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">All Students</p>
                <p className="text-3xl font-bold text-gray-900">{adminStats.allStudents}</p>
                <p className="text-xs text-green-600 mt-2">+100.0% than last year</p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎓</span>
              </div>
            </div>
          </div>

          {/* Enrolled Students */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Enrolled Students</p>
                <p className="text-3xl font-bold text-gray-900">{adminStats.enrolledStudents}</p>
                <p className="text-xs text-purple-600 mt-2">+600.0% than last month</p>
              </div>
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </div>

          {/* Active Courses */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Courses</p>
                <p className="text-3xl font-bold text-gray-900">{adminStats.activeCourses}</p>
                <p className="text-xs text-blue-600 mt-2">+8 added this month</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
            </div>
          </div>

          {/* Certificates Earned */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Certificates Earned</p>
                <p className="text-3xl font-bold text-gray-900">{adminStats.certificatesEarned.toLocaleString()}</p>
                <p className="text-xs text-orange-600 mt-2">+14.2% vs last year</p>
              </div>
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
            </div>
          </div>

          {/* Active Instructors */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Instructors</p>
                <p className="text-3xl font-bold text-gray-900">{adminStats.activeInstructors}</p>
                <p className="text-xs text-green-600 mt-2">+2 joined this month</p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👨‍🏫</span>
              </div>
            </div>
          </div>

          {/* Total Sales */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Sales</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(adminStats.totalSales)}</p>
                <p className="text-xs text-blue-600 mt-2">+12.4% than last month</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>

          {/* Active Academies */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Academies</p>
                <p className="text-3xl font-bold text-gray-900">{adminStats.activeAcademies}</p>
                <p className="text-xs text-blue-600 mt-2">+15.0% than last month</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏛️</span>
              </div>
            </div>
          </div>

          {/* Net Profit */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Net Profit</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(adminStats.netProfit)}</p>
                <p className="text-xs text-green-600 mt-2">+8.1% YoY growth</p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💵</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Statistics Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Sales Statistics</h2>
              <p className="text-sm text-gray-600">1/1/2026 - 1/23/2026 courses overview</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setChartType('line')}
                className={`px-3 py-1 rounded ${chartType === 'line' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
              >
                📈
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`px-3 py-1 rounded ${chartType === 'bar' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
              >
                📊
              </button>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              >
                <option>Year</option>
                <option>Month</option>
                <option>Week</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-2 mb-4">
            {['Courses', 'Students', 'Instructors', 'Academies', 'Sales'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter} ({activeFilter === filter ? getFilterValue(filter) : 0})
              </button>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={300}>
            {chartType === 'line' ? (
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  stroke="#6B7280"
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                  labelFormatter={(label) => formatDate(label)}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={getDataKey(activeFilter)}
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: '#10B981', r: 4 }}
                />
              </LineChart>
            ) : (
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  stroke="#6B7280"
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                  labelFormatter={(label) => formatDate(label)}
                />
                <Legend />
                <Bar dataKey={getDataKey(activeFilter)} fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Top Courses and Top Instructors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Top Courses */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Top Courses</h2>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Search all columns..."
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                    Columns
                  </button>
                  <button className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Export
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topCourses.map((course) => (
                  <div key={course.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <span className="text-lg font-bold text-gray-400">#{course.ranking}</span>
                    </div>
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{course.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        {course.instructorImage && (
                          <img
                            src={course.instructorImage}
                            alt={course.instructor}
                            className="w-6 h-6 rounded-full"
                          />
                        )}
                        <p className="text-sm text-gray-600">{course.instructor}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Rows per page</span>
                  <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                  <span className="text-sm text-gray-600">1-10 of 10</span>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">←</button>
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">→</button>
                </div>
              </div>
              <a href="/admin/courses" className="text-green-600 hover:text-green-700 text-sm font-medium mt-4 block">
                See All Courses →
              </a>
            </div>
          </div>

          {/* Top Instructors */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Top Instructors</h2>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Search all columns..."
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                    Columns
                  </button>
                  <button className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Export
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">INSTRUCTOR</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">COURSES</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">ENROLLED STUDENTS</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">REVIEWS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topInstructors.map((instructor) => (
                      <tr key={instructor.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-gray-400">#{instructor.ranking}</span>
                            {instructor.image ? (
                              <img
                                src={instructor.image}
                                alt={instructor.name}
                                className="w-8 h-8 rounded-full"
                              />
                            ) : (
                              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-xs text-gray-600">
                                  {instructor.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            )}
                            <span className="font-medium text-gray-900">{instructor.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-700">{instructor.courses}</td>
                        <td className="py-3 px-4 text-sm text-gray-700">{instructor.enrolledStudents}</td>
                        <td className="py-3 px-4 text-sm text-gray-700">{instructor.reviews.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Rows per page</span>
                  <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                  <span className="text-sm text-gray-600">1-9 of 9</span>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">←</button>
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">→</button>
                </div>
              </div>
              <a href="/admin/instructors" className="text-green-600 hover:text-green-700 text-sm font-medium mt-4 block">
                See All Instructors →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Course Type Breakdown */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Course Type Breakdown</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'PAID', value: courseTypeData.paid.count },
                    { name: 'FREE', value: courseTypeData.free.count },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#3B82F6" />
                  <Cell fill="#10B981" />
                </Pie>
                <Tooltip />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold">
                  {courseTypeData.total} TOTAL
                </text>
                <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" className="text-sm text-gray-600">
                  Courses
                </text>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-sm text-gray-700">PAID</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {courseTypeData.paid.percentage}% ({courseTypeData.paid.count})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-700">FREE</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {courseTypeData.free.percentage}% ({courseTypeData.free.count})
                </span>
              </div>
            </div>
          </div>

          {/* Top Students By Country */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Top Students By Country</h2>
              <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                <option>Country</option>
                {countryData.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.country}
                  </option>
                ))}
              </select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={countryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="students"
                >
                  {countryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold">
                  4,285 Total
                </text>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {countryData.map((country, index) => (
                <div key={country.code} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-sm text-gray-700">
                      {country.code} {country.country}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {country.students.toLocaleString()} ({country.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Enrollments By Country */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Top Enrollments By Country</h2>
              <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                <option>Country</option>
                {countryData.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.country}
                  </option>
                ))}
              </select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={countryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="enrollments"
                >
                  {countryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold">
                  4,285 Total
                </text>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {countryData.map((country, index) => (
                <div key={country.code} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-sm text-gray-700">
                      {country.code} {country.country}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {country.enrollments.toLocaleString()} ({country.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
