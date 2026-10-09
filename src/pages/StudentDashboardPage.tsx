import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { COURSES } from '../data/coursesData';
import { CourseProgress } from '../components/common/CourseProgress';
import { Button } from '../components/common/Button';
import { LessonList } from '../components/common/LessonList';
import { CertificateModal } from '../components/common/CertificateModal';
import { DashboardSidebar, DashboardTab } from '../components/dashboard/DashboardSidebar';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  Calendar,
  PlayCircle,
  FileCheck2,
  Sparkles,
  Save,
  CheckCircle,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { Course } from '../types';

export const StudentDashboardPage: React.FC = () => {
  const {
    user,
    enrollments,
    isLessonCompleted,
    toggleLessonCompletion,
    openLessonModal,
    recordQuizScore,
    updateUserProfile,
    navigate,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<DashboardTab>('courses');
  const [selectedCertificateCourse, setSelectedCertificateCourse] = useState<Course | null>(null);

  // Profile form state
  const [profileName, setProfileName] = useState(user?.name || 'Alex Johnson');
  const [profileHeadline, setProfileHeadline] = useState(
    user?.headline || 'Aspiring Full Stack Web Developer'
  );
  const [profileBio, setProfileBio] = useState(
    user?.bio || 'Learning modern web architecture with React, Next.js, and TypeScript.'
  );

  // Active quiz state
  const [activeQuizCourseId, setActiveQuizCourseId] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Derive enrolled course objects
  const enrolledCourses: Course[] = Object.keys(enrollments)
    .map((id) => COURSES.find((c) => c.id === id))
    .filter((c): c is Course => Boolean(c));

  // Compute metrics
  const totalEnrolled = enrolledCourses.length;
  let totalCompletedLessonsCount = 0;
  let totalQuizScoresSum = 0;
  let gradedQuizzesCount = 0;

  Object.values(enrollments).forEach((progress) => {
    totalCompletedLessonsCount += progress.completedLessonIds.length;
    if (progress.quizScore !== undefined) {
      totalQuizScoresSum += progress.quizScore;
      gradedQuizzesCount += 1;
    }
  });

  const avgQuizScore =
    gradedQuizzesCount > 0 ? Math.round(totalQuizScoresSum / gradedQuizzesCount) : 92;

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: profileName,
      headline: profileHeadline,
      bio: profileBio,
    });
  };

  const handleStartQuiz = (courseId: string) => {
    setActiveQuizCourseId(courseId);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleQuizAnswer = (questionId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = (course: Course) => {
    if (!course.quiz) return;
    let correctCount = 0;
    course.quiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const score = Math.round((correctCount / course.quiz.length) * 100);
    recordQuizScore(course.id, score);
    setQuizSubmitted(true);
  };

  // Upcoming live workshops schedule data
  const upcomingSessions = [
    {
      id: 'ws-1',
      title: 'Deep Dive: React Server Components & Streaming SSR',
      instructor: 'Dr. Sarah Lin',
      date: 'Tomorrow at 10:00 AM PST',
      duration: '60 min',
      level: 'Advanced',
    },
    {
      id: 'ws-2',
      title: 'Ask Me Anything: Breaking into Full-Stack Engineering',
      instructor: 'Alex Rivera',
      date: 'Thursday at 2:00 PM PST',
      duration: '45 min',
      level: 'All Levels',
    },
    {
      id: 'ws-3',
      title: 'Python Data Pipeline Optimization & Memory Tuning',
      instructor: 'Marcus Vance',
      date: 'Next Tuesday at 11:30 AM PST',
      duration: '75 min',
      level: 'Intermediate',
    },
  ];

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* 1. Welcome Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          {/* Subtle Ambient Dots */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/20 blur-2xl rounded-full animate-ambient-glow"
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={
                  user?.avatar ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80'
                }
                alt={user?.name || 'Student'}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-indigo-400/30 shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Welcome back, {user?.name || 'Alex'}!
                  </h1>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/20 px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3 text-indigo-300" /> Active Student
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  {user?.headline || 'Continue where you left off. You are making steady progress toward your goals.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="md"
                onClick={() => navigate('/courses')}
                iconRight={<ChevronRight className="w-4 h-4" />}
              >
                Browse New Courses
              </Button>
            </div>
          </div>
        </div>

        {/* 2. Top Summary Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold">Enrolled Courses</span>
              <BookOpen className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {totalEnrolled}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Across 3 tech domains</p>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold">Completed Lessons</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {totalCompletedLessonsCount}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Hands-on tutorials finished</p>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold">Hours Learned</span>
              <Clock className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
              24.5 hrs
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Self-paced study time</p>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold">Avg Quiz Score</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {avgQuizScore}%
            </div>
            <p className="text-[11px] text-slate-500 mt-1">High honor tier</p>
          </div>
        </div>

        {/* 3. Main Dashboard Body: Sidebar + Stage Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Dedicated Dashboard Sidebar */}
          <DashboardSidebar
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
            enrolledCount={enrolledCourses.length}
            completedLessonsCount={totalCompletedLessonsCount}
          />

          {/* Main Stage Panel */}
          <div className="flex-1 w-full min-w-0">
            {/* Tab: My Courses */}
            {activeTab === 'courses' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Enrolled Courses</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Continue learning and track your curriculum progress.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate('/courses')}
                  >
                    Explore More
                  </Button>
                </div>

                {enrolledCourses.length > 0 ? (
                  <div className="space-y-6">
                    {enrolledCourses.map((course) => {
                      const progress = enrollments[course.id];
                      const completedLessons = progress?.completedLessonIds || [];
                      const totalLessonsInCurriculum = course.curriculum.reduce(
                        (acc, mod) => acc + mod.lessons.length,
                        0
                      );
                      const remainingLessons = Math.max(
                        0,
                        totalLessonsInCurriculum - completedLessons.length
                      );
                      const quizScore = progress?.quizScore;

                      // Find next uncompleted lesson, or default to first
                      let nextLesson = course.curriculum[0]?.lessons[0];
                      for (const mod of course.curriculum) {
                        for (const les of mod.lessons) {
                          if (!completedLessons.includes(les.id)) {
                            nextLesson = les;
                            break;
                          }
                        }
                        if (nextLesson && !completedLessons.includes(nextLesson.id)) break;
                      }

                      return (
                        <div
                          key={course.id}
                          className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:border-slate-300 transition-all space-y-5"
                        >
                          {/* Course Top Info */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
                                <span>{course.category}</span>
                                <span aria-hidden="true">·</span>
                                <span>{course.difficulty}</span>
                                <span aria-hidden="true">·</span>
                                <span className="font-mono text-slate-500">{course.duration}</span>
                              </div>
                              <h3 className="text-lg font-bold text-slate-900">
                                {course.title}
                              </h3>
                              <p className="text-xs text-slate-500 mt-0.5">
                                Instructor: {course.instructor.name} ({course.instructor.role})
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  navigate('/course-details', { courseId: course.id })
                                }
                              >
                                View Details
                              </Button>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => {
                                  if (nextLesson) openLessonModal(course.id, nextLesson);
                                }}
                                icon={<PlayCircle className="w-4 h-4" />}
                              >
                                Continue Learning
                              </Button>
                            </div>
                          </div>

                          {/* Progress Statistics & Quiz Result Row */}
                          <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                            <div className="flex items-center gap-4 text-slate-600 font-medium">
                              <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                {completedLessons.length} Completed
                              </span>
                              <span aria-hidden="true" className="text-slate-300">·</span>
                              <span className="text-slate-600">
                                {remainingLessons} Remaining
                              </span>
                              <span aria-hidden="true" className="text-slate-300">·</span>
                              <span className="font-mono text-slate-500">
                                {totalLessonsInCurriculum} Total Lessons
                              </span>
                            </div>

                            {/* Quiz results preview */}
                            {quizScore !== undefined ? (
                              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-lg">
                                <Award className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Quiz Score: {quizScore}%</span>
                              </div>
                            ) : course.quiz ? (
                              <button
                                type="button"
                                onClick={() => handleStartQuiz(course.id)}
                                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-lg cursor-pointer"
                              >
                                Take Quiz ({course.quiz.length} Qs)
                              </button>
                            ) : null}
                          </div>

                          {/* Progress Bar */}
                          <CourseProgress
                            completedCount={completedLessons.length}
                            totalCount={totalLessonsInCurriculum}
                          />

                          {/* Reusable LessonList Component */}
                          <div className="pt-2">
                            <LessonList
                              courseId={course.id}
                              modules={course.curriculum}
                              allowCompletionToggle={true}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
                    <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      No courses enrolled yet
                    </h3>
                    <p className="text-xs text-slate-500 mb-6">
                      Explore our curriculum and enroll in HTML & CSS, JavaScript, React, Next.js, or Full Stack bootcamp to begin!
                    </p>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => navigate('/courses')}
                    >
                      Explore Course Catalog
                    </Button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Tab: Lesson Tracker & Log */}
            {activeTab === 'progress' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Curriculum Lesson Tracker
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Complete interactive tutorials and exercises across your enrolled tracks. Check items off as you learn.
                  </p>
                </div>

                <div className="space-y-6">
                  {enrolledCourses.map((c) => (
                    <div key={c.id} className="space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h4 className="text-sm font-bold text-slate-900">{c.title}</h4>
                        <span className="text-xs text-indigo-600 font-semibold">
                          {enrollments[c.id]?.completedLessonIds.length || 0} finished
                        </span>
                      </div>
                      <LessonList
                        courseId={c.id}
                        modules={c.curriculum}
                        allowCompletionToggle={true}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tab: Quizzes */}
            {activeTab === 'quizzes' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Course Quizzes & Assessments
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Validate your knowledge and earn certificate verification marks by taking course quizzes.
                  </p>
                </div>

                {/* List of enrolled courses with quiz action */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enrolledCourses.map((c) => {
                    const score = enrollments[c.id]?.quizScore;
                    return (
                      <div
                        key={c.id}
                        className="p-5 border border-slate-200 rounded-xl hover:border-indigo-300 transition-colors flex items-center justify-between bg-slate-50/40"
                      >
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{c.title}</h4>
                          <p className="text-xs text-slate-500 mt-1">
                            {c.quiz?.length || 2} Concept Questions
                          </p>
                          {score !== undefined ? (
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 mt-2">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Recorded Score: {score}%</span>
                            </div>
                          ) : (
                            <span className="text-xs text-amber-600 font-medium mt-2 block">
                              Quiz not taken yet
                            </span>
                          )}
                        </div>

                        <Button
                          size="sm"
                          variant={score !== undefined ? 'outline' : 'primary'}
                          onClick={() => handleStartQuiz(c.id)}
                        >
                          {score !== undefined ? 'Retake Quiz' : 'Take Quiz'}
                        </Button>
                      </div>
                    );
                  })}
                </div>

                {/* Active Quiz Taker Simulator */}
                {activeQuizCourseId && (() => {
                  const quizCourse = COURSES.find((c) => c.id === activeQuizCourseId);
                  if (!quizCourse || !quizCourse.quiz) return null;

                  return (
                    <div className="mt-8 pt-8 border-t border-slate-200 space-y-6 bg-slate-50 p-6 rounded-xl border">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-indigo-600 uppercase">
                            Active Examination
                          </span>
                          <h3 className="text-lg font-bold text-slate-900">
                            {quizCourse.title} - Knowledge Assessment
                          </h3>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setActiveQuizCourseId(null)}
                        >
                          Close Quiz
                        </Button>
                      </div>

                      <div className="space-y-6">
                        {quizCourse.quiz.map((q, idx) => (
                          <div
                            key={q.id}
                            className="p-5 bg-white rounded-xl border border-slate-200 space-y-3"
                          >
                            <p className="text-sm font-bold text-slate-900">
                              {idx + 1}. {q.question}
                            </p>
                            <div className="space-y-2">
                              {q.options.map((opt, optIdx) => {
                                const isSelected = quizAnswers[q.id] === optIdx;
                                const isCorrect = q.correctAnswer === optIdx;

                                let optClass =
                                  'p-3 rounded-lg border text-xs text-slate-700 cursor-pointer transition-colors block w-full text-left ';
                                if (quizSubmitted) {
                                  if (isCorrect) {
                                    optClass += 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold';
                                  } else if (isSelected && !isCorrect) {
                                    optClass += 'bg-rose-50 border-rose-300 text-rose-800 font-semibold';
                                  } else {
                                    optClass += 'bg-slate-50 border-slate-200 text-slate-500';
                                  }
                                } else {
                                  optClass += isSelected
                                    ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-medium'
                                    : 'bg-white border-slate-200 hover:bg-slate-50';
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    type="button"
                                    disabled={quizSubmitted}
                                    onClick={() => handleQuizAnswer(q.id, optIdx)}
                                    className={optClass}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                            {quizSubmitted && (
                              <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-200">
                                <strong>Explanation:</strong> {q.explanation}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {!quizSubmitted ? (
                        <Button
                          size="md"
                          variant="primary"
                          onClick={() => handleSubmitQuiz(quizCourse)}
                        >
                          Submit Quiz Answers
                        </Button>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Button
                            size="md"
                            variant="primary"
                            onClick={() => setActiveQuizCourseId(null)}
                          >
                            Complete Assessment
                          </Button>
                          <Button
                            size="md"
                            variant="outline"
                            onClick={() => handleStartQuiz(quizCourse.id)}
                          >
                            Try Again
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </motion.div>
            )}

            {/* Tab: Certificates */}
            {activeTab === 'certificates' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Verified Certificates
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Industry credential diplomas verified on the SkillHub Academic Registry.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enrolledCourses.map((c) => {
                    const score = enrollments[c.id]?.quizScore;
                    const isUnlocked = (enrollments[c.id]?.completedLessonIds.length || 0) > 0 || (score !== undefined);

                    return (
                      <div
                        key={c.id}
                        className="p-6 rounded-xl border border-slate-200 flex flex-col justify-between space-y-4 bg-gradient-to-br from-white to-slate-50"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
                              {c.category} Track
                            </span>
                            <h4 className="text-sm font-bold text-slate-900 mt-1">
                              {c.title}
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Lead Instructor: {c.instructor.name}
                            </p>
                          </div>
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                            <FileCheck2 className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Credential Ready</span>
                          </span>

                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => setSelectedCertificateCourse(c)}
                          >
                            View Certificate
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Tab: Upcoming Live Workshops */}
            {activeTab === 'upcoming' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Upcoming Live Sessions & Cohort Labs
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Join live code walkthroughs, design review crits, and interactive Q&A sessions.
                  </p>
                </div>

                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-5 rounded-xl border border-slate-200 hover:border-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{session.date}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-slate-500">{session.duration}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {session.title}
                        </h4>
                        <p className="text-xs text-slate-500">
                          Host: {session.instructor} · Level: {session.level}
                        </p>
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          showToast(`RSVP registered for "${session.title}"! Calendar invite dispatched.`, 'success')
                        }
                      >
                        RSVP Workshop
                      </Button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tab: Profile */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-6 max-w-2xl"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Student Profile Information
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Customize your public student portfolio and skill credentials.
                  </p>
                </div>

                <form onSubmit={handleProfileSave} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Registered Email
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || 'alex.johnson@skillhub.edu'}
                      className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Professional Headline
                    </label>
                    <input
                      type="text"
                      value={profileHeadline}
                      onChange={(e) => setProfileHeadline(e.target.value)}
                      placeholder="e.g. Aspiring Full Stack Developer"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Bio / Learning Goals
                    </label>
                    <textarea
                      rows={3}
                      value={profileBio}
                      onChange={(e) => setProfileBio(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    icon={<Save className="w-4 h-4" />}
                  >
                    Save Profile Changes
                  </Button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Certificate Preview Modal */}
      {selectedCertificateCourse && (
        <CertificateModal
          course={selectedCertificateCourse}
          onClose={() => setSelectedCertificateCourse(null)}
        />
      )}
    </div>
  );
};
