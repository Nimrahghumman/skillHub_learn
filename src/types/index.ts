export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type CourseCategory =
  | 'Web Development'
  | 'JavaScript'
  | 'React'
  | 'Next.js'
  | 'Python'
  | 'UI/UX Design'
  | 'Database'
  | 'Backend Development';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'exercise';
  summary: string;
  content?: string;
  codeSnippet?: string;
}

export interface CurriculumModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: CourseCategory;
  difficulty: DifficultyLevel;
  duration: string;
  learningHours: number;
  totalLessons: number;
  rating: number;
  reviewsCount: number;
  enrolledCount: number;
  price: number;
  originalPrice?: number;
  isFree: boolean;
  certificateIncluded: boolean;
  image: string;
  accentColor: string;
  badgeTag: string;
  instructor: Instructor;
  learningOutcomes: string[];
  skillsGained: string[];
  practicalOutcomes: string[];
  prerequisites: string[];
  curriculum: CurriculumModule[];
  quiz?: QuizQuestion[];
  courseReviews?: Review[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Student' | 'Instructor';
  avatar: string;
  headline?: string;
  bio?: string;
}

export interface EnrolledCourseProgress {
  courseId: string;
  enrolledAt: string;
  lastAccessedAt: string;
  completedLessonIds: string[];
  quizScore?: number;
}

export interface Review {
  id: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  courseTitle: string;
}
