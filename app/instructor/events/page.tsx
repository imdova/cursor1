'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockEvents } from '@/lib/eventData';
import { Event } from '@/types/event';

export default function EventsOverviewPage() {
  const [events] = useState<Event[]>(mockEvents);

  const upcomingEvents = events.filter((e) => e.status === 'published' || e.status === 'draft');
  const completedEvents = events.filter((e) => e.status === 'completed');
  const totalAttendees = events.reduce((sum, e) => sum + e.currentAttendees, 0);
  const totalRevenue = events.reduce((sum, e) => sum + (e.price * e.currentAttendees), 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Events Overview</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage and track your events</p>
        </div>
        <Link
          href="/instructor/events/new"
          className="w-full sm:w-auto bg-green-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center text-sm sm:text-base"
        >
          + Create New Event
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Events</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{events.length}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-xl sm:text-2xl">📅</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Upcoming Events</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{upcomingEvents.length}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-xl sm:text-2xl">🎯</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Attendees</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{totalAttendees}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-xl sm:text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-xl sm:text-2xl">💰</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200 mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Quick Actions</h2>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
          <Link
            href="/instructor/events/new"
            className="w-full sm:w-auto bg-green-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center text-sm sm:text-base"
          >
            + Create New Event
          </Link>
          <Link
            href="/instructor/events/manage"
            className="w-full sm:w-auto bg-gray-100 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center text-sm sm:text-base"
          >
            Manage Events
          </Link>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 sm:mb-8">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Upcoming Events</h2>
        </div>
        {upcomingEvents.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-600">No upcoming events</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          event.status === 'published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <span>📅 {new Date(event.startDate).toLocaleDateString()}</span>
                      <span>🕐 {event.startTime} - {event.endTime}</span>
                      {event.isOnline ? (
                        <span>🌐 Online</span>
                      ) : (
                        <span>📍 {event.location}</span>
                      )}
                      <span>👥 {event.currentAttendees}/{event.maxAttendees || '∞'} attendees</span>
                      <span>💰 ${event.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 ml-4">
                    <Link
                      href={`/instructor/events/${event.id}/edit`}
                      className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold"
                    >
                      Edit
                    </Link>
                    <Link
                      href="/instructor/events/manage"
                      className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-semibold"
                    >
                      Manage
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm sm:text-base">✓</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm sm:text-base">New registration</p>
              <p className="text-xs sm:text-sm text-gray-600 truncate">John Doe registered for "Web Development Workshop"</p>
            </div>
            <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap flex-shrink-0">2h ago</span>
          </div>
          <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm sm:text-base">📝</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm sm:text-base">Event created</p>
              <p className="text-xs sm:text-sm text-gray-600 truncate">You created "Data Science Bootcamp"</p>
            </div>
            <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap flex-shrink-0">1d ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
