'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Event } from '@/types/event';

export default function NewEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Event>>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    location: '',
    isOnline: false,
    meetingLink: '',
    category: '',
    maxAttendees: undefined,
    price: 0,
    status: 'draft',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : type === 'number'
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Event created successfully!');
    router.push('/instructor/events');
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Event</h1>
          <p className="text-gray-600">Add a new event to your schedule</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
            {/* Basic Information */}
            <div className="p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-1 h-6 bg-green-600 rounded-full mr-3"></span>
                Basic Information
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Event Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Web Development Workshop"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-white placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Describe your event..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-white placeholder-gray-400 resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Event Type
                  </label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, isOnline: false }))}
                      className={`flex-1 px-6 py-4 rounded-lg font-semibold transition-all duration-200 ${
                        !formData.isOnline
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg transform scale-105'
                          : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-green-500 hover:bg-gray-50'
                      }`}
                    >
                      📍 In-Person
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, isOnline: true }))}
                      className={`flex-1 px-6 py-4 rounded-lg font-semibold transition-all duration-200 ${
                        formData.isOnline
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg transform scale-105'
                          : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-green-500 hover:bg-gray-50'
                      }`}
                    >
                      🌐 Online
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Date and Time */}
            <div className="p-8 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-1 h-6 bg-green-600 rounded-full mr-3"></span>
                Date & Time
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-green-300 transition-all duration-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    required
                  />
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-green-300 transition-all duration-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-green-300 transition-all duration-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    required
                  />
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-green-300 transition-all duration-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Location or Meeting Link */}
            <div className="p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-1 h-6 bg-green-600 rounded-full mr-3"></span>
                {formData.isOnline ? 'Meeting Details' : 'Location Details'}
              </h3>
              
              {formData.isOnline ? (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Meeting Link <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔗</span>
                    <input
                      type="url"
                      name="meetingLink"
                      value={formData.meetingLink}
                      onChange={handleInputChange}
                      placeholder="https://meet.example.com/event"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-white placeholder-gray-400"
                      required={formData.isOnline}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">📍</span>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g. Tech Hub, Downtown"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-white placeholder-gray-400"
                      required={!formData.isOnline}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Category and Settings */}
            <div className="p-8 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-1 h-6 bg-green-600 rounded-full mr-3"></span>
                Event Settings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-green-300 transition-all duration-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Masterclass">Masterclass</option>
                    <option value="Bootcamp">Bootcamp</option>
                    <option value="Webinar">Webinar</option>
                    <option value="Conference">Conference</option>
                    <option value="Seminar">Seminar</option>
                  </select>
                </div>
                <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-green-300 transition-all duration-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Max Attendees
                  </label>
                  <input
                    type="number"
                    name="maxAttendees"
                    value={formData.maxAttendees || ''}
                    onChange={handleInputChange}
                    min="1"
                    placeholder="No limit"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 placeholder-gray-400"
                  />
                </div>
                <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-green-300 transition-all duration-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="p-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-white appearance-none cursor-pointer"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="p-8 bg-gray-50 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/instructor/events')}
                className="px-8 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-white hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
