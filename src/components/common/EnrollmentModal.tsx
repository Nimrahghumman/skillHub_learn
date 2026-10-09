import React, { useState } from 'react';
import { Course } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle2, ShieldCheck, Clock, BookOpen, ArrowRight, Sparkles, Award } from 'lucide-react';
import { Button } from './Button';

interface EnrollmentModalProps {
  course: Course;
  onClose: () => void;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ course, onClose }) => {
  const { enrollCourse, navigate, isEnrolled, user } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(isEnrolled(course.id));

  const handleConfirmEnrollment = async () => {
    setIsProcessing(true);
    await new Promise((res) => setTimeout(res, 500));
    enrollCourse(course.id);
    setIsProcessing(false);
    setIsSuccess(true);
  };

  const handleStartCourse = () => {
    onClose();
    const firstLesson = course.curriculum[0]?.lessons[0];
    navigate('/dashboard');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">
              {isSuccess ? 'Enrollment Confirmed' : 'Confirm Enrollment'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {!isSuccess ? (
            <>
              {/* Course Preview Lockup */}
              <div className="flex gap-4 items-start p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-20 h-16 rounded-lg object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                    {course.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate mt-0.5">
                    {course.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Instructor: {course.instructor.name}
                  </p>
                </div>
              </div>

              {/* Course Specifications */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                  <span className="text-[10px] text-slate-500 block">Duration</span>
                  <strong className="text-slate-900">{course.duration}</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                  <span className="text-[10px] text-slate-500 block">Lessons</span>
                  <strong className="text-slate-900">{course.totalLessons} Units</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                  <span className="text-[10px] text-slate-500 block">Tuition</span>
                  <strong className="text-emerald-700">
                    {course.isFree ? 'FREE' : `$${course.price}`}
                  </strong>
                </div>
              </div>

              {/* What is Included */}
              <div className="space-y-2 text-xs text-slate-600 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Full access to on-demand HD lessons and exercises</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified Certificate of Completion upon passing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Lifetime access with community forum code reviews</span>
                </div>
              </div>

              {/* Student info indicator */}
              <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span className="text-slate-700">
                    Enrolling as <strong>{user?.name || 'Student'}</strong>
                  </span>
                </div>
                <span className="text-indigo-700 font-semibold text-[11px]">Instant Access</span>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  You are Enrolled!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto mt-1">
                  <strong>{course.title}</strong> has been added to your Student Dashboard. Track lessons, take quizzes, and earn your certificate!
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Curriculum Progress:</span>
                  <span className="font-semibold text-indigo-600">0% (Ready to start)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Lessons:</span>
                  <span className="font-semibold text-slate-800">{course.totalLessons} lessons</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Certificate Status:</span>
                  <span className="font-semibold text-emerald-600">Unlocks on completion</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onClose}>
            {isSuccess ? 'Dismiss' : 'Cancel'}
          </Button>

          {!isSuccess ? (
            <Button
              size="md"
              variant="primary"
              isLoading={isProcessing}
              onClick={handleConfirmEnrollment}
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              {course.isFree ? 'Confirm Free Enrollment' : `Enroll for $${course.price}`}
            </Button>
          ) : (
            <Button
              size="md"
              variant="primary"
              onClick={handleStartCourse}
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Go to Dashboard
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
