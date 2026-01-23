import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">About Medicova</h1>
            <p className="text-base sm:text-lg lg:text-xl text-green-100 max-w-3xl mx-auto px-4">
              Empowering learners worldwide with high-quality online education
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Our Mission</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4">
              At Medicova, we believe that education should be accessible, engaging, and transformative. 
              Our mission is to provide high-quality online courses that empower individuals to achieve 
              their personal and professional goals.
            </p>
            <p className="text-base sm:text-lg text-gray-600">
              We connect passionate instructors with eager learners, creating a vibrant community 
              where knowledge is shared and skills are developed.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎓</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Why Choose Medicova?</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-gray-700">Expert instructors with real-world experience</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-gray-700">Comprehensive course materials and resources</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-gray-700">Flexible learning at your own pace</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-gray-700">Lifetime access to course content</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-600 mb-2">500K+</div>
              <div className="text-sm sm:text-base text-gray-600">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-600 mb-2">10K+</div>
              <div className="text-sm sm:text-base text-gray-600">Online Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-600 mb-2">2K+</div>
              <div className="text-sm sm:text-base text-gray-600">Expert Instructors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-600 mb-2">150+</div>
              <div className="text-sm sm:text-base text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 sm:mb-12">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🌟</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Excellence</h3>
            <p className="text-sm sm:text-base text-gray-600">
              We strive for excellence in every course, ensuring the highest quality content and instruction.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🤝</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Community</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Building a supportive learning community where students and instructors thrive together.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center sm:col-span-2 md:col-span-1">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🚀</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Innovation</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Continuously innovating to provide the best learning experience and cutting-edge content.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Ready to Start Learning?</h2>
          <p className="text-base sm:text-lg lg:text-xl text-green-100 mb-6 sm:mb-8 px-4">
            Join thousands of students already learning on Medicova
          </p>
          <Link
            href="/courses"
            className="inline-block bg-white text-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
          >
            Explore Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
