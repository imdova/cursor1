'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { courses, categories } from '@/lib/data';
import { Course } from '@/types/course';
import CourseCard from '@/components/CourseCard';
import Image from 'next/image';

export default function InstructorCoursesPage() {
  const [courseList, setCourseList] = useState<Course[]>(courses.slice(0, 6)); // Simulating instructor's courses
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterSubCategory, setFilterSubCategory] = useState<string>('all');
  const [filterPriceRange, setFilterPriceRange] = useState<string>('all');
  const [filterDateRange, setFilterDateRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  // Get subcategories for selected category
  const selectedCategoryData = categories.find((cat) => cat.name === filterCategory);
  const availableSubCategories = selectedCategoryData?.subCategories || [];

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let filtered: Course[] = [...courseList];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        filtered = filtered.filter(
          (course) =>
            course.title?.toLowerCase().includes(query) ||
            course.description?.toLowerCase().includes(query) ||
            course.instructor?.toLowerCase().includes(query)
        );
      }
    }

    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter((course) => course.category === filterCategory);
    }

    // Subcategory filter
    if (filterSubCategory !== 'all') {
      filtered = filtered.filter((course) => course.subCategory === filterSubCategory);
    }

    // Price range filter
    if (filterPriceRange !== 'all') {
      if (filterPriceRange === 'free') {
        filtered = filtered.filter((course) => course.price === 0);
      } else if (filterPriceRange === 'under-50') {
        filtered = filtered.filter((course) => course.price < 50);
      } else if (filterPriceRange === '50-100') {
        filtered = filtered.filter((course) => course.price >= 50 && course.price <= 100);
      } else if (filterPriceRange === 'over-100') {
        filtered = filtered.filter((course) => course.price > 100);
      }
    }

    // Date range filter
    if (filterDateRange !== 'all') {
      const now = new Date();
      filtered = filtered.filter((course) => {
        // Include courses without createdAt (treat as "unknown date" that could match any filter)
        // This provides consistent behavior since createdAt is optional
        if (!course.createdAt) return true;
        
        const createdDate = new Date(course.createdAt);
        // Validate date
        if (isNaN(createdDate.getTime())) return true;
        
        const daysDiff = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
        // Handle future dates (negative daysDiff) - exclude them from past date filters
        if (daysDiff < 0) return false;

        if (filterDateRange === 'last-7-days') return daysDiff <= 7;
        if (filterDateRange === 'last-30-days') return daysDiff <= 30;
        if (filterDateRange === 'last-90-days') return daysDiff <= 90;
        if (filterDateRange === 'last-year') return daysDiff <= 365;
        return true;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        // If dates are invalid, treat as 0 (oldest) so they sort to the end
        const validDateA = isNaN(dateA) ? 0 : dateA;
        const validDateB = isNaN(dateB) ? 0 : dateB;
        // Secondary sort by title for stability
        if (validDateB === validDateA) {
          return a.title.localeCompare(b.title);
        }
        return validDateB - validDateA;
      } else if (sortBy === 'oldest') {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        // If dates are invalid, treat as 0 (oldest) so they sort to the beginning
        const validDateA = isNaN(dateA) ? 0 : dateA;
        const validDateB = isNaN(dateB) ? 0 : dateB;
        // Secondary sort by title for stability
        if (validDateA === validDateB) {
          return a.title.localeCompare(b.title);
        }
        return validDateA - validDateB;
      } else if (sortBy === 'price-low') {
        // Secondary sort by title for stability
        if (a.price === b.price) {
          return a.title.localeCompare(b.title);
        }
        return a.price - b.price;
      } else if (sortBy === 'price-high') {
        // Secondary sort by title for stability
        if (b.price === a.price) {
          return a.title.localeCompare(b.title);
        }
        return b.price - a.price;
      } else if (sortBy === 'students') {
        // Secondary sort by title for stability
        if (b.studentCount === a.studentCount) {
          return a.title.localeCompare(b.title);
        }
        return b.studentCount - a.studentCount;
      } else if (sortBy === 'rating') {
        // Secondary sort by title for stability
        if (b.rating === a.rating) {
          return a.title.localeCompare(b.title);
        }
        return b.rating - a.rating;
      }
      return 0;
    });

    return filtered;
  }, [courseList, searchQuery, filterCategory, filterSubCategory, filterPriceRange, filterDateRange, sortBy]);

  const handleDelete = (courseId: string) => {
    if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      setCourseList(courseList.filter((course) => course.id !== courseId));
    }
  };

  const calculateDiscount = (course: Course) => {
    if (course.originalPrice && course.originalPrice > course.price && course.originalPrice > 0) {
      return Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
    }
    return 0;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    // Validate date before formatting
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterCategory('all');
    setFilterSubCategory('all');
    setFilterPriceRange('all');
    setFilterDateRange('all');
    setSortBy('newest');
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
          <div className="text-4xl sm:text-6xl mb-4">📚</div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No courses yet</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6">Get started by creating your first course</p>
          <Link
            href="/instructor/courses/new"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Create Your First Course
          </Link>
        </div>
      ) : (
        <>
          {/* Filters and View Toggle */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              {/* Search */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* View Toggle */}
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  📋 List
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  ⊞ Grid
                </button>
              </div>
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
              {/* Category Filter */}
              <select
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  setFilterSubCategory('all');
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Subcategory Filter */}
              <select
                value={filterSubCategory}
                onChange={(e) => setFilterSubCategory(e.target.value)}
                disabled={filterCategory === 'all' || availableSubCategories.length === 0}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="all">All Subcategories</option>
                {availableSubCategories.map((subCat) => (
                  <option key={subCat.id} value={subCat.name}>
                    {subCat.name}
                  </option>
                ))}
              </select>

              {/* Price Range Filter */}
              <select
                value={filterPriceRange}
                onChange={(e) => setFilterPriceRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Prices</option>
                <option value="free">Free</option>
                <option value="under-50">Under $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="over-100">Over $100</option>
              </select>

              {/* Date Range Filter */}
              <select
                value={filterDateRange}
                onChange={(e) => setFilterDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Dates</option>
                <option value="last-7-days">Last 7 Days</option>
                <option value="last-30-days">Last 30 Days</option>
                <option value="last-90-days">Last 90 Days</option>
                <option value="last-year">Last Year</option>
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="students">Most Students</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Clear Filters and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="text-sm text-gray-600">
                Showing {filteredCourses.length} of {courseList.length} courses
              </div>
              {(searchQuery || filterCategory !== 'all' || filterSubCategory !== 'all' || filterPriceRange !== 'all' || filterDateRange !== 'all' || sortBy !== 'newest') && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Content Area */}
          {viewMode === 'list' ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Course</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Sub Category</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Discount</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Students</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Created</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Rating</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredCourses.map((course) => {
                      const discount = calculateDiscount(course);
                      return (
                        <tr key={course.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-3">
                              <Image
                                src={course.image}
                                alt={course.title}
                                width={500}
                                height={500}
                                className="w-16 h-10 object-cover rounded"
                              />
                              <div className="min-w-0">
                                <Link
                                  href={`/instructor/courses/${course.id}`}
                                  className="font-semibold text-gray-900 text-sm truncate hover:text-blue-600 transition-colors block"
                                >
                                  {course.title}
                                </Link>
                                <p className="text-xs text-gray-500 truncate">{course.instructor}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {course.category}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {course.subCategory || '—'}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {course.price === 0 ? (
                              <span className="font-semibold text-green-600">Free</span>
                            ) : (
                              <span className="font-semibold">${course.price.toFixed(2)}</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {discount > 0 ? (
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                                {discount}%
                              </span>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {course.studentCount.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-600">
                            {formatDate(course.createdAt)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <span className="text-yellow-500 mr-1">★</span>
                              <span className="font-semibold text-sm">{course.rating}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                              Published
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-2">
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
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Tablet/Mobile Table */}
              <div className="lg:hidden divide-y divide-gray-200">
                {filteredCourses.map((course) => {
                  const discount = calculateDiscount(course);
                  return (
                    <div key={course.id} className="p-4">
                      <div className="flex items-start space-x-3 mb-3">
                        <Image
                          src={course.image}
                          alt={course.title}
                          width={500}
                          height={500}
                          className="w-20 h-12 object-cover rounded shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/instructor/courses/${course.id}`}
                            className="font-semibold text-gray-900 text-sm mb-1 truncate hover:text-blue-600 transition-colors block"
                          >
                            {course.title}
                          </Link>
                          <p className="text-xs text-gray-500 mb-2">{course.instructor}</p>
                          <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-2">
                            <span className="px-2 py-0.5 bg-gray-100 rounded">{course.category}</span>
                            {course.subCategory && (
                              <span className="px-2 py-0.5 bg-gray-100 rounded">{course.subCategory}</span>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                            <div>
                              <span className="font-semibold">Price: </span>
                              {course.price === 0 ? (
                                <span className="text-green-600 font-semibold">Free</span>
                              ) : (
                                <span>${course.price.toFixed(2)}</span>
                              )}
                              {discount > 0 && (
                                <span className="ml-1 px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs font-semibold">
                                  {discount}% off
                                </span>
                              )}
                            </div>
                            <div>
                              <span className="font-semibold">Students: </span>
                              {course.studentCount.toLocaleString()}
                            </div>
                            <div>
                              <span className="font-semibold">Created: </span>
                              {formatDate(course.createdAt)}
                            </div>
                            <div>
                              <span className="font-semibold">Rating: </span>
                              <span className="text-yellow-500">★</span> {course.rating}
                            </div>
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
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} detailsPath={`/instructor/courses/${course.id}`} />
              ))}
            </div>
          )}

          {filteredCourses.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">No courses found</h2>
              <p className="text-gray-600 mb-6">Try adjusting your filters</p>
              <button
                onClick={clearFilters}
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
