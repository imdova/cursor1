'use client';

import { useState, useEffect } from 'react';
import type { Course } from '@/types/course';
import CourseApplicationModal from './CourseApplicationModal';

interface LimitedOfferBannerProps {
  course?: Course;
}

export default function LimitedOfferBanner({ course }: LimitedOfferBannerProps) {
  const [countdown, setCountdown] = useState({ h: 2, m: 12, s: 52 });
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown((prev) => {
        let { h, m, s } = prev;
        if (s > 0) return { ...prev, s: s - 1 };
        if (m > 0) return { h, m: m - 1, s: 59 };
        if (h > 0) return { h: h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="bg-[#030256] rounded-xl shadow-lg p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="text-[#f59e0b] font-bold text-sm sm:text-base">LIMITED OFFER</span>
        <span className="text-white">🕐</span>
      </div>
      <div className="flex items-center gap-2 text-white font-mono text-xl sm:text-2xl font-bold">
        <span>{pad(countdown.h)}</span>
        <span className="text-white/60">:</span>
        <span>{pad(countdown.m)}</span>
        <span className="text-white/60">:</span>
        <span>{pad(countdown.s)}</span>
      </div>
      <p className="text-white text-sm sm:text-base text-center sm:text-left flex-1">
        Don&apos;t miss this offer! 50% Discount for only 10 Hours
      </p>
      {course ? (
        <button
          type="button"
          onClick={() => setApplicationModalOpen(true)}
          className="shrink-0 bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
        >
          Apply Now
        </button>
      ) : (
        <a
          href="#apply"
          className="shrink-0 bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
        >
          Apply Now
        </a>
      )}
      {applicationModalOpen && course && (
        <CourseApplicationModal
          courseTitle={course.title}
          onClose={() => setApplicationModalOpen(false)}
        />
      )}
    </div>
  );
}
