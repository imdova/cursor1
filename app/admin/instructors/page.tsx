'use client';

import { useState } from 'react';
import Link from 'next/link';
import { topInstructors } from '@/lib/adminData';

interface Instructor {
  id: string;
  name: string;
  email: string;
  image?: string;
  courses: number;
  enrolledStudents: number;
  reviews: number;
  rating: number;
  totalRevenue: number;
  joinDate: string;
  status: 'active' | 'inactive' | 'pending';
}

const mockInstructors: Instructor[] = [
  {
    id: '1',
    name: 'Ahmed Habib',
    email: 'ahmed.habib@example.com',
    image: 'https://i.pravatar.cc/40?img=1',
    courses: 3,
    enrolledStudents: 27,
    reviews: 0,
    rating: 0,
    totalRevenue: 2430,
    joinDate: '2023-10-15',
    status: 'active',
  },
  {
    id: '2',
    name: 'Ahmed Mahmoud',
    email: 'ahmed.mahmoud@example.com',
    image: 'https://i.pravatar.cc/40?img=5',
    courses: 2,
    enrolledStudents: 2,
    reviews: 0,
    rating: 0,
    totalRevenue: 180,
    joinDate: '2024-01-10',
    status: 'active',
  },
  {
    id: '3',
    name: 'Abdelrahman Ahmed',
    email: 'abdelrahman.ahmed@example.com',
    image: 'https://i.pravatar.cc/40?img=2',
    courses: 2,
    enrolledStudents: 18,
    reviews: 45,
    rating: 4.5,
    totalRevenue: 1620,
    joinDate: '2023-11-20',
    status: 'active',
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    image: 'https://i.pravatar.cc/40?img=3',
    courses: 1,
    enrolledStudents: 15,
    reviews: 32,
    rating: 4.8,
    totalRevenue: 1350,
    joinDate: '2023-12-05',
    status: 'active',
  },
  {
    id: '5',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    image: 'https://i.pravatar.cc/40?img=4',
    courses: 1,
    enrolledStudents: 12,
    reviews: 28,
    rating: 4.2,
    totalRevenue: 1080,
    joinDate: '2024-01-01',
    status: 'active',
  },
];

export default function AdminInstructorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredInstructors = mockInstructors.filter((instructor) => {
    const matchesSearch = instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || instructor.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalInstructors = mockInstructors.length;
  const activeInstructors = mockInstructors.filter(i => i.status === 'active').length;
  const totalCourses = mockInstructors.reduce((sum, i) => sum + i.courses, 0);
  const totalRevenue = mockInstructors.reduce((sum, i) => sum + i.totalRevenue, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Instructors Management</h1>
            <p className="text-gray-600 mt-1">Manage all instructors on the platform</p>
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
            + Add Instructor
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Instructors</p>
            <p className="text-2xl font-bold text-gray-900">{totalInstructors}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Active Instructors</p>
            <p className="text-2xl font-bold text-green-600">{activeInstructors}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Courses</p>
            <p className="text-2xl font-bold text-blue-600">{totalCourses}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-purple-600">EGP {totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Instructors Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">All Instructors</h2>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                Export
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Instructor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Courses
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInstructors.map((instructor) => (
                  <tr key={instructor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {instructor.image ? (
                          <img
                            src={instructor.image}
                            alt={instructor.name}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                            <span className="text-gray-600 text-sm">
                              {instructor.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{instructor.name}</div>
                          <div className="text-sm text-gray-500">Joined {new Date(instructor.joinDate).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{instructor.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{instructor.courses}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{instructor.enrolledStudents}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {instructor.rating > 0 ? (
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900">{instructor.rating.toFixed(1)}</span>
                          <span className="text-yellow-400 ml-1">⭐</span>
                          <span className="text-sm text-gray-500 ml-1">({instructor.reviews})</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">No ratings</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      EGP {instructor.totalRevenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        instructor.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : instructor.status === 'inactive'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {instructor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-green-600 hover:text-green-900">View</button>
                        <button className="text-blue-600 hover:text-blue-900">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Suspend</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Rows per page</span>
              <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span className="text-sm text-gray-600">
                1-{filteredInstructors.length} of {filteredInstructors.length}
              </span>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">←</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">→</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
