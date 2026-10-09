import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COURSES } from '../../data/coursesData';
import { Button } from './Button';
import { X, CheckCircle2, Play, Pause, Code2, BookOpen, Clock, FileText } from 'lucide-react';

export const LessonViewerModal: React.FC = () => {
  const { activeLessonModal, closeLessonModal, isLessonCompleted, toggleLessonCompletion } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'notes' | 'code'>('video');

  if (!activeLessonModal) return null;

  const { courseId, lesson } = activeLessonModal;
  const course = COURSES.find((c) => c.id === courseId);
  const isCompleted = isLessonCompleted(courseId, lesson.id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold mb-0.5">
              <span>{course?.title || 'Course'}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-slate-500 font-normal">
                <Clock className="w-3.5 h-3.5" /> {lesson.duration}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">{lesson.title}</h2>
          </div>

          <button
            type="button"
            onClick={closeLessonModal}
            aria-label="Close lesson modal"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Media Player Simulation */}
          <div className="relative aspect-video w-full rounded-xl bg-slate-950 overflow-hidden shadow-inner flex flex-col justify-between p-5 text-white mb-6">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-mono">SkillHub Interactive Player</span>
              <span className="bg-white/10 px-2 py-0.5 rounded text-slate-200 font-medium">1080p HD</span>
            </div>

            <div className="flex flex-col items-center justify-center py-8">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-indigo-600/90 hover:bg-indigo-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
              </button>
              <p className="text-xs text-slate-400 mt-3 font-medium">
                {isPlaying ? 'Playing lesson stream...' : 'Click to stream tutorial video'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden cursor-pointer">
                <div
                  className={`bg-indigo-500 h-full rounded-full transition-all duration-300 ${
                    isPlaying ? 'w-2/3' : 'w-1/4'
                  }`}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>{isPlaying ? '08:42' : '02:15'}</span>
                <span>{lesson.duration}</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 border-b border-slate-200 mb-4 pb-2">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'video'
                  ? 'bg-slate-100 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'notes'
                  ? 'bg-slate-100 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lesson Notes
            </button>
            {lesson.codeSnippet && (
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'code'
                    ? 'bg-slate-100 text-indigo-700'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Code Snippet
              </button>
            )}
          </div>

          {/* Tab Content */}
          <div className="min-h-[120px] text-sm text-slate-700 leading-relaxed">
            {activeTab === 'video' && (
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Key Takeaway</h4>
                <p className="text-slate-600">{lesson.summary}</p>
                {lesson.content && (
                  <p className="text-slate-600 mt-2">{lesson.content}</p>
                )}
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                  <p>Study tips: Re-run the examples in your local environment. Focus on practical patterns and memory footprints.</p>
                </div>
                <div className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                  <p>Check the attached reference links and official documentation for deeper edge cases.</p>
                </div>
              </div>
            )}

            {activeTab === 'code' && lesson.codeSnippet && (
              <div className="relative rounded-lg bg-slate-900 text-slate-200 p-4 font-mono text-xs overflow-x-auto">
                <div className="flex items-center justify-between text-slate-400 mb-2 border-b border-slate-800 pb-1">
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-indigo-400" /> Source Example
                  </span>
                </div>
                <pre>{lesson.codeSnippet}</pre>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-100">
          <Button
            variant={isCompleted ? 'outline' : 'primary'}
            size="sm"
            onClick={() => toggleLessonCompletion(courseId, lesson.id)}
            icon={<CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-600' : ''}`} />}
          >
            {isCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}
          </Button>

          <Button variant="ghost" size="sm" onClick={closeLessonModal}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};
