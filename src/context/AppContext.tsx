import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, EnrolledCourseProgress, Lesson } from '../types';
import { COURSES } from '../data/coursesData';

interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  currentPath: string;
  activeCourseId: string | null;
  searchQuery: string;
  navigate: (path: string, params?: { courseId?: string; search?: string }) => void;
  setSearchQuery: (query: string) => void;
  
  // Auth
  user: User | null;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (name: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (updates: Partial<User>) => void;

  // Enrollment & Progress
  enrollments: Record<string, EnrolledCourseProgress>;
  enrollCourse: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
  toggleLessonCompletion: (courseId: string, lessonId: string) => void;
  isLessonCompleted: (courseId: string, lessonId: string) => boolean;
  recordQuizScore: (courseId: string, score: number) => void;

  // Lesson Viewer Modal
  activeLessonModal: { courseId: string; lesson: Lesson } | null;
  openLessonModal: (courseId: string, lesson: Lesson) => void;
  closeLessonModal: () => void;

  // Bookmarks
  bookmarkedCourseIds: string[];
  toggleBookmark: (courseId: string) => void;

  // Toast
  toast: ToastNotification | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const DEFAULT_USER: User = {
  id: 'usr-student-1',
  name: 'Alex Johnson',
  email: 'alex.johnson@skillhub.edu',
  role: 'Student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
  headline: 'Aspiring Full Stack Web Developer',
  bio: 'Learning modern web architecture with React, Next.js, and TypeScript. Passionate about performant design systems and cloud APIs.',
};

const DEFAULT_ENROLLMENTS: Record<string, EnrolledCourseProgress> = {
  'react-complete-guide': {
    courseId: 'react-complete-guide',
    enrolledAt: '2026-02-15',
    lastAccessedAt: '2026-03-01',
    completedLessonIds: ['l-301', 'l-302'],
    quizScore: 92,
  },
  'html-css-mastery': {
    courseId: 'html-css-mastery',
    enrolledAt: '2026-01-10',
    lastAccessedAt: '2026-02-28',
    completedLessonIds: ['l-101', 'l-102', 'l-103', 'l-104'],
    quizScore: 95,
  },
  'javascript-deep-dive': {
    courseId: 'javascript-deep-dive',
    enrolledAt: '2026-02-01',
    lastAccessedAt: '2026-03-02',
    completedLessonIds: ['l-201'],
    quizScore: 85,
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Auth state
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('skillhub_user');
      if (saved) return JSON.parse(saved);
      return DEFAULT_USER; // Default logged-in state so Student Dashboard works immediately
    } catch {
      return DEFAULT_USER;
    }
  });

  // Enrollments state
  const [enrollments, setEnrollments] = useState<Record<string, EnrolledCourseProgress>>(() => {
    try {
      const saved = localStorage.getItem('skillhub_enrollments');
      if (saved) return JSON.parse(saved);
      return DEFAULT_ENROLLMENTS;
    } catch {
      return DEFAULT_ENROLLMENTS;
    }
  });

  // Bookmarks
  const [bookmarkedCourseIds, setBookmarkedCourseIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('skillhub_bookmarks');
      if (saved) return JSON.parse(saved);
      return ['fullstack-web-development', 'nextjs-app-router'];
    } catch {
      return ['fullstack-web-development', 'nextjs-app-router'];
    }
  });

  // Modal & Toast
  const [activeLessonModal, setActiveLessonModal] = useState<{ courseId: string; lesson: Lesson } | null>(null);
  const [toast, setToast] = useState<ToastNotification | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('skillhub_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('skillhub_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('skillhub_enrollments', JSON.stringify(enrollments));
    } catch (e) {
      console.error(e);
    }
  }, [enrollments]);

  useEffect(() => {
    try {
      localStorage.setItem('skillhub_bookmarks', JSON.stringify(bookmarkedCourseIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedCourseIds]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3800);
  };

  const navigate = (path: string, params?: { courseId?: string; search?: string }) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (params?.courseId) {
      setActiveCourseId(params.courseId);
    }
    if (params?.search !== undefined) {
      setSearchQuery(params.search);
    }
    setCurrentPath(path);
  };

  const login = async (email: string): Promise<boolean> => {
    // Realistic simulation
    const namePart = email.split('@')[0].replace(/[._]/g, ' ');
    const formattedName = namePart ? namePart.charAt(0).toUpperCase() + namePart.slice(1) : 'Student User';
    const loggedUser: User = {
      id: 'usr-' + Date.now(),
      name: formattedName.length > 2 ? formattedName : 'Alex Johnson',
      email,
      role: 'Student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      headline: 'Active Learner at SkillHub',
      bio: 'Enthusiastic web engineer leveling up in high-impact technologies.',
    };
    setUser(loggedUser);
    showToast(`Welcome back, ${loggedUser.name}!`, 'success');
    navigate('/dashboard');
    return true;
  };

  const register = async (name: string, email: string): Promise<boolean> => {
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name: name.trim() || 'New Student',
      email,
      role: 'Student',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80',
      headline: 'New Student at SkillHub',
      bio: 'Excited to start learning modern technical engineering.',
    };
    setUser(newUser);
    showToast(`Account created! Welcome to SkillHub, ${newUser.name}.`, 'success');
    navigate('/dashboard');
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast('You have been safely signed out.', 'info');
    navigate('/');
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    showToast('Profile information updated successfully.', 'success');
  };

  const enrollCourse = (courseId: string) => {
    const course = COURSES.find((c) => c.id === courseId);
    if (!course) return;

    if (enrollments[courseId]) {
      showToast(`You are already enrolled in "${course.title}".`, 'info');
      navigate('/dashboard');
      return;
    }

    setEnrollments((prev) => ({
      ...prev,
      [courseId]: {
        courseId,
        enrolledAt: new Date().toISOString().split('T')[0],
        lastAccessedAt: new Date().toISOString().split('T')[0],
        completedLessonIds: [],
        quizScore: undefined,
      },
    }));

    showToast(`Successfully enrolled in "${course.title}"! Welcome aboard.`, 'success');
    navigate('/dashboard');
  };

  const isEnrolled = (courseId: string): boolean => {
    return Boolean(enrollments[courseId]);
  };

  const toggleLessonCompletion = (courseId: string, lessonId: string) => {
    setEnrollments((prev) => {
      const record = prev[courseId] || {
        courseId,
        enrolledAt: new Date().toISOString().split('T')[0],
        lastAccessedAt: new Date().toISOString().split('T')[0],
        completedLessonIds: [],
      };

      const exists = record.completedLessonIds.includes(lessonId);
      const nextCompleted = exists
        ? record.completedLessonIds.filter((id) => id !== lessonId)
        : [...record.completedLessonIds, lessonId];

      if (!exists) {
        showToast('Lesson marked as completed! Keep going.', 'success');
      } else {
        showToast('Lesson marked as incomplete.', 'info');
      }

      return {
        ...prev,
        [courseId]: {
          ...record,
          lastAccessedAt: new Date().toISOString().split('T')[0],
          completedLessonIds: nextCompleted,
        },
      };
    });
  };

  const isLessonCompleted = (courseId: string, lessonId: string): boolean => {
    return Boolean(enrollments[courseId]?.completedLessonIds.includes(lessonId));
  };

  const recordQuizScore = (courseId: string, score: number) => {
    setEnrollments((prev) => {
      const record = prev[courseId] || {
        courseId,
        enrolledAt: new Date().toISOString().split('T')[0],
        lastAccessedAt: new Date().toISOString().split('T')[0],
        completedLessonIds: [],
      };

      return {
        ...prev,
        [courseId]: {
          ...record,
          quizScore: score,
        },
      };
    });
    showToast(`Quiz score saved: ${score}%!`, 'success');
  };

  const openLessonModal = (courseId: string, lesson: Lesson) => {
    setActiveLessonModal({ courseId, lesson });
  };

  const closeLessonModal = () => {
    setActiveLessonModal(null);
  };

  const toggleBookmark = (courseId: string) => {
    setBookmarkedCourseIds((prev) => {
      const isBookmarked = prev.includes(courseId);
      if (isBookmarked) {
        showToast('Removed from saved courses.', 'info');
        return prev.filter((id) => id !== courseId);
      } else {
        showToast('Saved to your wishlist!', 'success');
        return [...prev, courseId];
      }
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        activeCourseId,
        searchQuery,
        navigate,
        setSearchQuery,
        user,
        login,
        register,
        logout,
        updateUserProfile,
        enrollments,
        enrollCourse,
        isEnrolled,
        toggleLessonCompletion,
        isLessonCompleted,
        recordQuizScore,
        activeLessonModal,
        openLessonModal,
        closeLessonModal,
        bookmarkedCourseIds,
        toggleBookmark,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
