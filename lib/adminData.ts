export interface AdminStats {
  allStudents: number;
  enrolledStudents: number;
  activeCourses: number;
  certificatesEarned: number;
  activeInstructors: number;
  totalSales: number;
  activeAcademies: number;
  netProfit: number;
}

export interface SalesData {
  date: string;
  courses: number;
  students: number;
  instructors: number;
  academies: number;
  sales: number;
}

export interface TopCourse {
  id: string;
  title: string;
  instructor: string;
  instructorImage?: string;
  image: string;
  ranking: number;
  enrollments: number;
  revenue: number;
}

export interface TopInstructor {
  id: string;
  name: string;
  image?: string;
  courses: number;
  enrolledStudents: number;
  reviews: number;
  ranking: number;
}

export interface CountryData {
  country: string;
  code: string;
  students: number;
  enrollments: number;
  percentage: number;
}

export const adminStats: AdminStats = {
  allStudents: 32,
  enrolledStudents: 22,
  activeCourses: 44,
  certificatesEarned: 1845,
  activeInstructors: 9,
  totalSales: 53668,
  activeAcademies: 2,
  netProfit: 21540,
};

export const salesData: SalesData[] = [
  { date: '2026-01-01', courses: 0, students: 0, instructors: 0, academies: 0, sales: 0 },
  { date: '2026-01-02', courses: 1, students: 2, instructors: 0, academies: 0, sales: 500 },
  { date: '2026-01-03', courses: 1, students: 3, instructors: 0, academies: 0, sales: 750 },
  { date: '2026-01-04', courses: 2, students: 5, instructors: 1, academies: 0, sales: 1200 },
  { date: '2026-01-05', courses: 2, students: 7, instructors: 1, academies: 0, sales: 1500 },
  { date: '2026-01-06', courses: 3, students: 10, instructors: 1, academies: 0, sales: 2000 },
  { date: '2026-01-07', courses: 3, students: 12, instructors: 1, academies: 0, sales: 2200 },
  { date: '2026-01-08', courses: 4, students: 15, instructors: 2, academies: 0, sales: 2800 },
  { date: '2026-01-09', courses: 4, students: 17, instructors: 2, academies: 0, sales: 3100 },
  { date: '2026-01-10', courses: 5, students: 20, instructors: 2, academies: 1, sales: 3500 },
  { date: '2026-01-11', courses: 5, students: 22, instructors: 2, academies: 1, sales: 3800 },
  { date: '2026-01-12', courses: 6, students: 25, instructors: 3, academies: 1, sales: 4200 },
  { date: '2026-01-13', courses: 6, students: 27, instructors: 3, academies: 1, sales: 4500 },
  { date: '2026-01-14', courses: 7, students: 30, instructors: 3, academies: 1, sales: 5000 },
  { date: '2026-01-15', courses: 7, students: 32, instructors: 4, academies: 1, sales: 5300 },
  { date: '2026-01-16', courses: 8, students: 35, instructors: 4, academies: 1, sales: 5800 },
  { date: '2026-01-17', courses: 8, students: 37, instructors: 4, academies: 1, sales: 6100 },
  { date: '2026-01-18', courses: 9, students: 40, instructors: 5, academies: 1, sales: 6500 },
  { date: '2026-01-19', courses: 9, students: 42, instructors: 5, academies: 2, sales: 7000 },
  { date: '2026-01-20', courses: 10, students: 44, instructors: 5, academies: 2, sales: 7300 },
  { date: '2026-01-21', courses: 10, students: 46, instructors: 6, academies: 2, sales: 7600 },
  { date: '2026-01-22', courses: 11, students: 48, instructors: 6, academies: 2, sales: 8000 },
  { date: '2026-01-23', courses: 11, students: 50, instructors: 6, academies: 2, sales: 8300 },
];

export const topCourses: TopCourse[] = [
  {
    id: '1',
    title: 'CPHQ Revision January 2026',
    instructor: 'Ahmed Habib',
    instructorImage: 'https://i.pravatar.cc/40?img=1',
    image: 'https://picsum.photos/400/250?random=1',
    ranking: 1,
    enrollments: 27,
    revenue: 2430,
  },
  {
    id: '2',
    title: 'Introduction to Healthcare Quality',
    instructor: 'Ahmed Habib',
    instructorImage: 'https://i.pravatar.cc/40?img=1',
    image: 'https://picsum.photos/400/250?random=2',
    ranking: 2,
    enrollments: 22,
    revenue: 1980,
  },
  {
    id: '3',
    title: 'Data Science Bootcamp: From Zero to Hero',
    instructor: 'Abdelrahman Ahmed',
    instructorImage: 'https://i.pravatar.cc/40?img=2',
    image: 'https://picsum.photos/400/250?random=3',
    ranking: 4,
    enrollments: 18,
    revenue: 1620,
  },
  {
    id: '4',
    title: 'Advanced React Patterns',
    instructor: 'Sarah Johnson',
    instructorImage: 'https://i.pravatar.cc/40?img=3',
    image: 'https://picsum.photos/400/250?random=4',
    ranking: 5,
    enrollments: 15,
    revenue: 1350,
  },
  {
    id: '5',
    title: 'Python for Data Analysis',
    instructor: 'Michael Chen',
    instructorImage: 'https://i.pravatar.cc/40?img=4',
    image: 'https://picsum.photos/400/250?random=5',
    ranking: 6,
    enrollments: 12,
    revenue: 1080,
  },
];

export const topInstructors: TopInstructor[] = [
  {
    id: '1',
    name: 'Ahmed Habib',
    image: 'https://i.pravatar.cc/40?img=1',
    courses: 3,
    enrolledStudents: 27,
    reviews: 0.0,
    ranking: 1,
  },
  {
    id: '2',
    name: 'Ahmed Mahmoud',
    image: 'https://i.pravatar.cc/40?img=5',
    courses: 2,
    enrolledStudents: 2,
    reviews: 0.0,
    ranking: 2,
  },
  {
    id: '3',
    name: 'Abdelrahman Ahmed',
    image: 'https://i.pravatar.cc/40?img=2',
    courses: 2,
    enrolledStudents: 18,
    reviews: 4.5,
    ranking: 3,
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    image: 'https://i.pravatar.cc/40?img=3',
    courses: 1,
    enrolledStudents: 15,
    reviews: 4.8,
    ranking: 4,
  },
  {
    id: '5',
    name: 'Michael Chen',
    image: 'https://i.pravatar.cc/40?img=4',
    courses: 1,
    enrolledStudents: 12,
    reviews: 4.2,
    ranking: 5,
  },
];

export const countryData: CountryData[] = [
  { country: 'Egypt', code: 'EG', students: 1245, enrollments: 1245, percentage: 29.1 },
  { country: 'Saudi Arabia', code: 'SA', students: 987, enrollments: 987, percentage: 23.0 },
  { country: 'UAE', code: 'AE', students: 856, enrollments: 856, percentage: 20.0 },
  { country: 'Jordan', code: 'JO', students: 674, enrollments: 674, percentage: 15.7 },
  { country: 'Kuwait', code: 'KW', students: 523, enrollments: 523, percentage: 12.2 },
];

export const courseTypeData = {
  total: 44,
  paid: { count: 37, percentage: 84 },
  free: { count: 7, percentage: 16 },
};
