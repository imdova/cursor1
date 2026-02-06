import CourseCard from "@/components/CourseCard";
import { Container } from "@/components/ui";
import { courses } from "@/lib/courses";

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">All Courses</h1>
          <p className="text-gray-600 text-lg">
            Discover thousands of courses to help you achieve your goals
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </Container>
    </div>
  );
}
