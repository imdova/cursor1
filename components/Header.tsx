'use client';

import Link from 'next/link';
import { useState } from 'react';
import CategoryMegaMenu from './CategoryMegaMenu';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="bg-green-600 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <Link href="/" className="flex items-center">
              <img
                src="/images/logo-white.png"
                alt="Medicova"
                className="h-8 sm:h-10 w-auto"
              />
            </Link>
            <nav className="hidden md:flex items-center space-x-1">
              <CategoryMegaMenu />
              <Link href="/about" className="px-3 py-2 hover:bg-green-700 rounded transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="px-3 py-2 hover:bg-green-700 rounded transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          
          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder="What do you want to learn?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-white text-gray-900 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <button className="bg-white text-green-600 px-4 py-2 rounded-r-lg hover:bg-gray-100 transition-colors">
              🔍
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/instructor/dashboard" className="px-4 py-2 hover:bg-green-700 rounded transition-colors">
              Instructor
            </Link>
            <Link href="/login" className="px-4 py-2 hover:bg-green-700 rounded transition-colors">
              Log in
            </Link>
            <Link href="/signup" className="px-4 py-2 bg-green-500 hover:bg-green-400 rounded transition-colors font-semibold">
              Sign up
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="p-2 hover:bg-green-700 rounded transition-colors"
              aria-label="Search"
            >
              🔍
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-green-700 rounded transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="md:hidden pb-4">
            <div className="flex">
              <input
                type="text"
                placeholder="What do you want to learn?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 bg-white text-gray-900 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <button className="bg-white text-green-600 px-4 py-2 rounded-r-lg hover:bg-gray-100 transition-colors">
                🔍
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-green-700 py-4">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/courses"
                className="px-4 py-2 hover:bg-green-700 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore Courses
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 hover:bg-green-700 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 hover:bg-green-700 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/instructor/dashboard"
                className="px-4 py-2 hover:bg-green-700 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Instructor
              </Link>
              <div className="border-t border-green-700 pt-2 mt-2">
                <Link
                  href="/login"
                  className="block px-4 py-2 hover:bg-green-700 rounded transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="block px-4 py-2 bg-green-500 hover:bg-green-400 rounded transition-colors font-semibold mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
