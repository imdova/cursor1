"use client";

import { useState } from "react";

interface Student {
  id: string;
  name: string;
  email: string;
  image?: string;
  enrolledCourses: number;
  completedCourses: number;
  certificates: number;
  country: string;
  joinDate: string;
  status: "active" | "inactive" | "suspended";
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Ahmed Mohamed",
    email: "ahmed.mohamed@example.com",
    image: "https://i.pravatar.cc/40?img=1",
    enrolledCourses: 5,
    completedCourses: 3,
    certificates: 2,
    country: "EG",
    joinDate: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Ali",
    email: "sarah.ali@example.com",
    image: "https://i.pravatar.cc/40?img=2",
    enrolledCourses: 8,
    completedCourses: 6,
    certificates: 5,
    country: "SA",
    joinDate: "2023-12-20",
    status: "active",
  },
  {
    id: "3",
    name: "Mohamed Hassan",
    email: "mohamed.hassan@example.com",
    image: "https://i.pravatar.cc/40?img=3",
    enrolledCourses: 3,
    completedCourses: 1,
    certificates: 1,
    country: "AE",
    joinDate: "2024-01-10",
    status: "active",
  },
  {
    id: "4",
    name: "Fatima Ibrahim",
    email: "fatima.ibrahim@example.com",
    image: "https://i.pravatar.cc/40?img=4",
    enrolledCourses: 12,
    completedCourses: 10,
    certificates: 8,
    country: "JO",
    joinDate: "2023-11-05",
    status: "active",
  },
  {
    id: "5",
    name: "Omar Khalil",
    email: "omar.khalil@example.com",
    image: "https://i.pravatar.cc/40?img=5",
    enrolledCourses: 2,
    completedCourses: 0,
    certificates: 0,
    country: "KW",
    joinDate: "2024-01-20",
    status: "active",
  },
];

export default function AdminStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || student.status === selectedStatus;
    const matchesCountry =
      selectedCountry === "all" || student.country === selectedCountry;
    return matchesSearch && matchesStatus && matchesCountry;
  });

  const totalStudents = mockStudents.length;
  const activeStudents = mockStudents.filter(
    (s) => s.status === "active"
  ).length;
  const totalEnrollments = mockStudents.reduce(
    (sum, s) => sum + s.enrolledCourses,
    0
  );
  const totalCertificates = mockStudents.reduce(
    (sum, s) => sum + s.certificates,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Students Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage all students on the platform
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Countries</option>
                <option value="EG">Egypt</option>
                <option value="SA">Saudi Arabia</option>
                <option value="AE">UAE</option>
                <option value="JO">Jordan</option>
                <option value="KW">Kuwait</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Students</p>
            <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Active Students</p>
            <p className="text-2xl font-bold text-green-600">
              {activeStudents}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Enrollments</p>
            <p className="text-2xl font-bold text-blue-600">
              {totalEnrollments}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Certificates Issued</p>
            <p className="text-2xl font-bold text-purple-600">
              {totalCertificates}
            </p>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                All Students
              </h2>
              <button className="px-4 py-2 bg-admin-primary text-white rounded-lg hover:bg-admin-primary-hover text-sm">
                Export
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enrolled
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Certificates
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
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {student.image ? (
                          <img
                            src={student.image}
                            alt={student.name}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                            <span className="text-gray-600 text-sm">
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {student.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Joined{" "}
                            {new Date(student.joinDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {student.country}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.enrolledCourses}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.completedCourses}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.certificates}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          student.status === "active"
                            ? "bg-green-100 text-green-800"
                            : student.status === "inactive"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-admin-primary hover:text-admin-primary-hover">
                          View
                        </button>
                        <button className="text-admin-primary hover:text-admin-primary-hover">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Suspend
                        </button>
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
                1-{filteredStudents.length} of {filteredStudents.length}
              </span>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                ←
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
