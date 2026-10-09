import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Award,
  Calendar,
  User as UserIcon,
  CheckCircle2,
  FileCheck2,
  LogOut,
  Sparkles,
} from 'lucide-react';

export type DashboardTab = 'courses' | 'progress' | 'quizzes' | 'certificates' | 'upcoming' | 'profile';

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  enrolledCount: number;
  completedLessonsCount: number;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeTab,
  onTabChange,
  enrolledCount,
  completedLessonsCount,
}) => {
  const { user, logout } = useApp();

  const navItems: Array<{ id: DashboardTab; label: string; icon: React.ReactNode; badge?: string | number }> = [
    {
      id: 'courses',
      label: 'My Courses',
      icon: <BookOpen className="w-4 h-4" />,
      badge: enrolledCount,
    },
    {
      id: 'progress',
      label: 'Lesson Tracker',
      icon: <CheckCircle2 className="w-4 h-4" />,
      badge: completedLessonsCount,
    },
    {
      id: 'quizzes',
      label: 'Quiz Center',
      icon: <Award className="w-4 h-4" />,
    },
    {
      id: 'certificates',
      label: 'Certificates',
      icon: <FileCheck2 className="w-4 h-4" />,
    },
    {
      id: 'upcoming',
      label: 'Workshops',
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      id: 'profile',
      label: 'Profile & Bio',
      icon: <UserIcon className="w-4 h-4" />,
    },
  ];

  return (
    <aside className="w-full lg:w-64 bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* User Mini Profile */}
        <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
          <img
            src={
              user?.avatar ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80'
            }
            alt={user?.name || 'Student'}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/20 shadow-xs"
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-bold text-slate-900 truncate">
              {user?.name || 'Alex Johnson'}
            </h3>
            <p className="text-[11px] text-slate-500 truncate">
              {user?.email || 'student@skillhub.edu'}
            </p>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded mt-0.5">
              <Sparkles className="w-2.5 h-2.5" /> Active Learner
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-white' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold tabular-nums ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Sign Out */}
      <div className="pt-5 border-t border-slate-100 mt-6">
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
