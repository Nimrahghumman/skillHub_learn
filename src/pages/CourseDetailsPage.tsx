import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { COURSES, REVIEWS } from '../data/coursesData';
import { Button } from '../components/common/Button';
import { EnrollmentModal } from '../components/common/EnrollmentModal';
import { CertificateModal } from '../components/common/CertificateModal';
import { ReviewCard } from '../components/common/ReviewCard';
import {
  Clock,
  BarChart2,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Star,
  PlayCircle,
  FileCode,
  ArrowLeft,
  Share2,
  Bookmark,
  ShieldCheck,
  Video,
  Users,
  Award,
  Zap,
  Check,
  Sparkles,
} from 'lucide-react';
import { Lesson } from '../types';

export const CourseDetailsPage: React.FC = () => {
  const {
    activeCourseId,
    navigate,
    isEnrolled,
    openLessonModal,
    isLessonCompleted,
    bookmarkedCourseIds,
    toggleBookmark,
    showToast,
  } = useApp();

  // Find selected course, default to first if null
  const course = COURSES.find((c) => c.id === activeCourseId) || COURSES[0];
  const enrolled = isEnrolled(course.id);
  const isBookmarked = bookmarkedCourseIds.includes(course.id);

  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [course.id]);

  // Curriculum accordion expansion state
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [course.curriculum[0]?.id || 'mod-1']: true,
  });

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Course link copied to clipboard!', 'info');
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/courses')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Courses</span>
          </button>

          <span className="text-xs text-slate-400 font-medium">
            Category: <strong className="text-slate-700">{course.category}</strong>
          </span>
        </div>

        {/* 1. Hero Header Area: Course Overview & Media Lockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-12">
          {/* Main Info (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Metadata Badges */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 font-medium">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold">
                {course.category}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <BarChart2 className="w-3.5 h-3.5 text-slate-400" />
                {course.difficulty}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {course.duration} ({course.learningHours} Total Hours)
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                {course.totalLessons} Lessons
              </span>
            </div>

            {/* Course Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {course.title}
            </h1>

            {/* Short Description */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              {course.shortDescription}
            </p>

            {/* Full Course Overview */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Course Overview
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {course.fullDescription}
              </p>
            </div>

            {/* Instructor Quick Profile */}
            <div className="flex items-center gap-4 pt-2">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-indigo-200 shadow-xs"
              />
              <div>
                <p className="text-xs text-slate-500 font-medium">Lead Instructor</p>
                <h3 className="text-base font-bold text-slate-900">{course.instructor.name}</h3>
                <p className="text-xs text-slate-600">{course.instructor.role}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                  <span className="flex items-center gap-1 text-slate-700 font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {course.instructor.rating} rating
                  </span>
                  <span>·</span>
                  <span>{course.instructor.studentsCount.toLocaleString()} students</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Action Box / Sticky Enrollment Card (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-5 sticky top-24">
            {/* Thumbnail with Preview Button */}
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 relative group">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => {
                    const firstLesson = course.curriculum[0]?.lessons[0];
                    if (firstLesson) openLessonModal(course.id, firstLesson);
                  }}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/95 text-slate-900 font-semibold text-xs shadow hover:bg-white transition-transform hover:scale-105 cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4 text-indigo-600" />
                  <span>Preview Lesson 1</span>
                </button>
              </div>
            </div>

            {/* Price Row */}
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {course.isFree ? 'FREE' : `$${course.price}`}
                  </span>
                  {course.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      ${course.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-slate-700 text-xs font-semibold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="tabular-nums font-bold">{course.rating}</span>
                  <span className="text-slate-400">({course.reviewsCount})</span>
                </div>
              </div>

              {/* Action: Enroll Now Button */}
              {!enrolled ? (
                <Button
                  size="lg"
                  variant="primary"
                  className="w-full"
                  onClick={() => setShowEnrollModal(true)}
                >
                  {course.isFree ? 'Enroll for Free' : `Enroll Now ($${course.price})`}
                </Button>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>You are enrolled in this course</span>
                  </div>
                  <Button
                    size="lg"
                    variant="primary"
                    className="w-full"
                    onClick={() => navigate('/dashboard')}
                  >
                    Go to Dashboard
                  </Button>
                </div>
              )}

              {/* Utility actions */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleBookmark(course.id)}
                  icon={<Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-indigo-600 text-indigo-600' : ''}`} />}
                >
                  {isBookmarked ? 'Saved' : 'Wishlist'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleShare}
                  icon={<Share2 className="w-3.5 h-3.5" />}
                >
                  Share
                </Button>
              </div>
            </div>

            {/* Course Features Guarantee */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{course.duration} on-demand video & tutorials</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Interactive code labs & GitHub repositories</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{course.enrolledCount.toLocaleString()} active students enrolled</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Verified Certificate of Completion</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. What Students Will Learn & Practical Outcomes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Learning Outcomes */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              What You Will Learn
            </h2>
            <div className="space-y-3">
              {course.learningOutcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-1 shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {outcome}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* What Students Will Be Able To Do (Practical Capabilities) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-400" />
              <h2 className="text-xl font-bold text-slate-900">
                What You Will Be Able to Do
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Concrete projects and real-world competencies you will master:
            </p>
            <div className="space-y-3">
              {course.practicalOutcomes.map((capability, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">
                    ✓
                  </span>
                  <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                    {capability}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Skills Covered Tags */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-12 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            Skills Covered in this Course
          </h2>
          <div className="flex flex-wrap gap-2 pt-1">
            {course.skillsGained.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 shadow-2xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* 4. Full Course Curriculum & Lesson List */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-12 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Course Curriculum & Lessons
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {course.curriculum.length} modules · {course.totalLessons} total lessons · {course.duration}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const allExpanded = Object.keys(expandedModules).length === course.curriculum.length;
                if (allExpanded) {
                  setExpandedModules({});
                } else {
                  const all: Record<string, boolean> = {};
                  course.curriculum.forEach((m) => (all[m.id] = true));
                  setExpandedModules(all);
                }
              }}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
            >
              Toggle All Modules
            </button>
          </div>

          <div className="space-y-4">
            {course.curriculum.map((mod) => {
              const isExpanded = Boolean(expandedModules[mod.id]);
              return (
                <div
                  key={mod.id}
                  className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleModule(mod.id)}
                    className="w-full px-5 py-4 bg-slate-50/80 hover:bg-slate-100 flex items-center justify-between text-left transition-colors cursor-pointer"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{mod.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{mod.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 font-medium">
                        {mod.lessons.length} lessons
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="divide-y divide-slate-100 bg-white">
                      {mod.lessons.map((lesson: Lesson) => {
                        const completed = isLessonCompleted(course.id, lesson.id);
                        return (
                          <div
                            key={lesson.id}
                            className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50/60 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => openLessonModal(course.id, lesson)}
                                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                                  completed
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                                }`}
                              >
                                {completed ? (
                                  <CheckCircle2 className="w-4 h-4" />
                                ) : (
                                  <PlayCircle className="w-4 h-4" />
                                )}
                              </button>
                              <div>
                                <h4 className="text-xs font-semibold text-slate-900">
                                  {lesson.title}
                                </h4>
                                <span className="text-[11px] text-slate-500">{lesson.summary}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <span className="text-xs text-slate-500 font-mono">
                                {lesson.duration}
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => openLessonModal(course.id, lesson)}
                              >
                                Watch
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Requirements & Prerequisites */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-12 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            Requirements & Prerequisites
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
            {course.prerequisites.map((prereq, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                <span>{prereq}</span>
              </li>
            ))}
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
              <span>A computer with modern browser (Chrome, Safari, Edge, Firefox) and stable internet connection.</span>
            </li>
          </ul>
        </div>

        {/* 6. Instructor Full Profile */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-12 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Instructor Profile</h2>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shadow-xs shrink-0"
            />
            <div className="space-y-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">{course.instructor.name}</h3>
                <p className="text-xs text-slate-500">{course.instructor.role}</p>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                {course.instructor.bio}
              </p>
              <div className="flex items-center gap-6 text-xs text-slate-500 pt-1">
                <div>
                  <strong className="text-slate-900 tabular-nums">
                    {course.instructor.studentsCount.toLocaleString()}
                  </strong>{' '}
                  Students
                </div>
                <div>
                  <strong className="text-slate-900 tabular-nums">{course.instructor.coursesCount}</strong>{' '}
                  Courses
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <strong className="text-slate-900 tabular-nums">{course.instructor.rating}</strong>{' '}
                  Instructor Rating
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Student Reviews for this Track */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-12 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Student Reviews & Ratings</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Rated {course.rating} / 5.0 by {course.reviewsCount.toLocaleString()} verified learners
              </p>
            </div>
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        {/* 8. Certificate Information Callout */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 mb-12 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 bg-white/10 px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" /> Official Academic Credential
            </div>
            <h3 className="text-xl font-bold">Earn Your Verified Certificate</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Upon passing this course's lessons and assessments, you will be issued a cryptographic certificate verifiable by hiring managers worldwide.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="md"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              onClick={() => setShowCertModal(true)}
            >
              Preview Diploma
            </Button>
            <Button
              size="md"
              variant="secondary"
              className="bg-white text-indigo-900 hover:bg-slate-100"
              onClick={() => setShowEnrollModal(true)}
            >
              {enrolled ? 'Go to Dashboard' : 'Enroll Now'}
            </Button>
          </div>
        </div>
      </div>

      {/* Enrollment Modal */}
      {showEnrollModal && (
        <EnrollmentModal
          course={course}
          onClose={() => setShowEnrollModal(false)}
        />
      )}

      {/* Certificate Preview Modal */}
      {showCertModal && (
        <CertificateModal
          course={course}
          onClose={() => setShowCertModal(false)}
        />
      )}
    </div>
  );
};
