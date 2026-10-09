import React from 'react';
import { Lesson, CurriculumModule } from '../../types';
import { useApp } from '../../context/AppContext';
import { PlayCircle, CheckCircle2, Clock, Code2, BookOpen } from 'lucide-react';

interface LessonListProps {
  courseId: string;
  modules: CurriculumModule[];
  onOpenLesson?: (lesson: Lesson) => void;
  allowCompletionToggle?: boolean;
  className?: string;
}

export const LessonList: React.FC<LessonListProps> = ({
  courseId,
  modules,
  onOpenLesson,
  allowCompletionToggle = true,
  className = '',
}) => {
  const { openLessonModal, isLessonCompleted, toggleLessonCompletion } = useApp();

  const handleOpen = (lesson: Lesson) => {
    if (onOpenLesson) {
      onOpenLesson(lesson);
    } else {
      openLessonModal(courseId, lesson);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {modules.map((module, modIdx) => (
        <div
          key={module.id}
          className="rounded-xl border border-slate-200/90 overflow-hidden bg-white shadow-2xs"
        >
          {/* Module Header */}
          <div className="px-5 py-3.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                Module {modIdx + 1}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                {module.title}
              </h4>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {module.lessons.length} Lessons
            </span>
          </div>

          {/* Lessons list */}
          <div className="divide-y divide-slate-100">
            {module.lessons.map((lesson) => {
              const isDone = isLessonCompleted(courseId, lesson.id);
              return (
                <div
                  key={lesson.id}
                  className="px-5 py-3 flex items-center justify-between hover:bg-slate-50/70 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    {allowCompletionToggle && (
                      <button
                        type="button"
                        onClick={() => toggleLessonCompletion(courseId, lesson.id)}
                        className={`p-1 rounded transition-colors ${
                          isDone
                            ? 'text-emerald-600 hover:text-emerald-700'
                            : 'text-slate-300 hover:text-indigo-600'
                        }`}
                        title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}

                    <div
                      onClick={() => handleOpen(lesson)}
                      className="cursor-pointer"
                    >
                      <h5
                        className={`text-xs font-semibold group-hover:text-indigo-600 transition-colors ${
                          isDone ? 'line-through text-slate-400' : 'text-slate-800'
                        }`}
                      >
                        {lesson.title}
                      </h5>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {lesson.duration}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">{lesson.type}</span>
                        {lesson.codeSnippet && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="flex items-center gap-0.5 text-indigo-600 font-medium">
                              <Code2 className="w-3 h-3" /> Code Lab
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpen(lesson)}
                    className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50/60 hover:bg-indigo-100 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span>Watch</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
