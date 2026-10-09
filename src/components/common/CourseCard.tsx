import React, { useState } from 'react';
import { Course } from '../../types';
import { useApp } from '../../context/AppContext';
import { Button } from './Button';
import { EnrollmentModal } from './EnrollmentModal';
import {
  Bookmark,
  Clock,
  BarChart2,
  Star,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Layers,
  Sparkles,
  PlayCircle,
} from 'lucide-react';

interface CourseCardProps {
  course: Course;
  className?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, className = '' }) => {
  const { navigate, isEnrolled, bookmarkedCourseIds, toggleBookmark } = useApp();
  const [imageError, setImageError] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);

  const enrolled = isEnrolled(course.id);
  const isBookmarked = bookmarkedCourseIds.includes(course.id);

  const handleCardClick = () => {
    navigate('/course-details', { courseId: course.id });
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`group flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 hover:border-indigo-300 transition-all duration-300 overflow-hidden cursor-pointer ${className}`}
      >
        {/* Course Visual Container */}
        <div className="relative aspect-video w-full bg-slate-900 overflow-hidden shrink-0">
          {!imageError ? (
            <img
              src={course.image}
              alt={course.title}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-950 text-white p-4 text-center">
              <BookOpen className="w-10 h-10 text-indigo-300 mb-2" />
              <span className="text-sm font-semibold text-slate-100">{course.title}</span>
            </div>
          )}

          {/* Media overlay subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20 pointer-events-none" />

          {/* Price & Free/Paid Badge (Top-Left) */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
            <span
              className={`px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-md shadow-xs ${
                course.isFree
                  ? 'bg-emerald-600/95 text-white ring-1 ring-emerald-400/30'
                  : 'bg-indigo-600/95 text-white ring-1 ring-indigo-400/30'
              }`}
            >
              {course.isFree ? 'FREE' : `$${course.price}`}
            </span>
            {course.originalPrice && (
              <span className="px-2 py-0.5 rounded text-[11px] text-white/80 line-through bg-black/50 backdrop-blur-xs hidden sm:inline">
                ${course.originalPrice}
              </span>
            )}
          </div>

          {/* Bookmark Action (Top-Right) */}
          <button
            type="button"
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark course'}
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(course.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-all duration-200 z-10 ${
              isBookmarked
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-900/60 text-white hover:bg-slate-900/85 hover:scale-105'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Enrolled Badge indicator (Bottom-Left) */}
          {enrolled && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-600/95 backdrop-blur-md text-white rounded-lg text-xs font-semibold shadow z-10">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Enrolled</span>
            </div>
          )}

          {/* Certificate Badge (Bottom-Right) */}
          {course.certificateIncluded && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-slate-950/75 backdrop-blur-md text-slate-200 rounded-lg text-[11px] font-medium border border-white/10 z-10">
              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Certificate</span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="flex flex-col flex-1 p-5 space-y-3.5">
          {/* Metadata Row: Category, Level, Duration, Lessons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span className="text-indigo-600 font-bold uppercase tracking-wider text-[11px]">
              {course.category}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1">
              <BarChart2 className="w-3.5 h-3.5 text-slate-400" />
              {course.difficulty}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {course.duration} ({course.learningHours}h total)
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              {course.totalLessons} lessons
            </span>
          </div>

          {/* Course Title */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2 leading-snug">
            {course.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {course.shortDescription}
          </p>

          {/* Skills Covered Preview Pills */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {course.skillsGained.slice(0, 3).map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md border border-slate-200/60"
              >
                {skill}
              </span>
            ))}
            {course.skillsGained.length > 3 && (
              <span className="text-[10px] text-slate-400 self-center font-medium">
                +{course.skillsGained.length - 3} more
              </span>
            )}
          </div>

          {/* Enrolled Count & Rating Row */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <div className="flex items-center gap-1 text-slate-600 font-medium">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span className="tabular-nums">
                {course.enrolledCount.toLocaleString()} learners
              </span>
            </div>
            <div className="flex items-center gap-1 text-slate-800 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="tabular-nums">{course.rating}</span>
              <span className="text-slate-400 font-normal">({course.reviewsCount.toLocaleString()})</span>
            </div>
          </div>

          {/* Instructor Profile Row */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <span className="font-semibold text-slate-800 truncate block text-xs">
                  {course.instructor.name}
                </span>
                <span className="text-[10px] text-slate-400 truncate block">
                  {course.instructor.role.split('&')[0].trim()}
                </span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs font-extrabold text-slate-900 block">
                {course.isFree ? 'FREE' : `$${course.price}`}
              </span>
            </div>
          </div>

          {/* Action Buttons: View Details & Enroll Now */}
          <div className="pt-2 flex items-center gap-2 mt-auto">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 hover:border-indigo-400 hover:text-indigo-600 transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/course-details', { courseId: course.id });
              }}
              iconRight={<ArrowRight className="w-3.5 h-3.5" />}
            >
              View Details
            </Button>

            {!enrolled ? (
              <Button
                variant="primary"
                size="sm"
                className="transition-all duration-200 hover:shadow-md hover:shadow-indigo-500/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEnrollModal(true);
                }}
              >
                Enroll Now
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-800 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/dashboard');
                }}
                icon={<PlayCircle className="w-3.5 h-3.5" />}
              >
                Continue Learning
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Enrollment Confirmation Modal */}
      {showEnrollModal && (
        <EnrollmentModal
          course={course}
          onClose={() => setShowEnrollModal(false)}
        />
      )}
    </>
  );
};
