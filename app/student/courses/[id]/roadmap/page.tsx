"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROUTES } from "@/constants";

/**
 * Redirect /student/courses/[id]/roadmap to /student/courses/[id]
 * so the "roadmap" slug is no longer used.
 */
export default function RoadmapRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = typeof params.id === "string" ? params.id : "";

  useEffect(() => {
    if (courseId) {
      router.replace(ROUTES.STUDENT.COURSE_OVERVIEW(courseId));
    }
  }, [courseId, router]);

  return (
    <div className="min-h-[200px] flex items-center justify-center text-gray-500">
      Redirecting to course…
    </div>
  );
}
