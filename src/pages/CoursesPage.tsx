import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { COURSES } from '../data/coursesData';
import { CourseCard } from '../components/common/CourseCard';
import { Button } from '../components/common/Button';
import { Search, Filter, BookOpen, X, Sparkles, SlidersHorizontal } from 'lucide-react';
import { DifficultyLevel, CourseCategory } from '../types';

export const CoursesPage: React.FC = () => {
  const { searchQuery, setSearchQuery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'All'>('All');
  const [priceFilter, setPriceFilter] = useState<'All' | 'Free' | 'Paid'>('All');

  const categories: Array<CourseCategory | 'All'> = [
    'All',
    'Web Development',
    'JavaScript',
    'React',
    'Next.js',
    'Python',
    'UI/UX Design',
    'Database',
    'Backend Development',
  ];

  const difficulties: Array<DifficultyLevel | 'All'> = [
    'All',
    'Beginner',
    'Intermediate',
    'Advanced',
  ];

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.shortDescription.toLowerCase().includes(q) ||
        course.fullDescription.toLowerCase().includes(q) ||
        course.category.toLowerCase().includes(q) ||
        course.difficulty.toLowerCase().includes(q) ||
        course.skillsGained.some((s) => s.toLowerCase().includes(q)) ||
        course.instructor.name.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === 'All' || course.category === selectedCategory;

      const matchesDifficulty =
        selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;

      const matchesPrice =
        priceFilter === 'All' ||
        (priceFilter === 'Free' && course.isFree) ||
        (priceFilter === 'Paid' && !course.isFree);

      return matchesSearch && matchesCategory && matchesDifficulty && matchesPrice;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, priceFilter]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setPriceFilter('All');
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official SkillHub Curriculum</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore All Courses & Career Tracks
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Gain job-ready skills with project-based courses taught by industry veterans. Master Web Development, JavaScript, React, Next.js, Python, UI/UX Design, Database systems, and Backend engineering.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs mb-8 space-y-5">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, skills (e.g. Hooks, Server Components, Pandas)..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-8 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results count & Clear */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end text-xs text-slate-500 font-medium">
              <span>
                Showing <strong className="text-slate-900 tabular-nums">{filteredCourses.length}</strong> of{' '}
                {COURSES.length} courses
              </span>
              {(selectedCategory !== 'All' ||
                selectedDifficulty !== 'All' ||
                priceFilter !== 'All' ||
                searchQuery) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-indigo-600 hover:text-indigo-800 underline font-semibold cursor-pointer"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
              <span className="text-xs font-semibold text-slate-500 mr-2 shrink-0 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sub-Filters: Level & Price */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              {/* Difficulty Level */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-500 mr-1">Level:</span>
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      selectedDifficulty === diff
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>

              {/* Price filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-500 mr-1">Tuition:</span>
                {(['All', 'Free', 'Paid'] as const).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setPriceFilter(tier)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      priceFilter === tier
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Course Grid with Smooth Scroll Reveals */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-12 shadow-2xs">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">No courses match your criteria</h3>
            <p className="text-xs text-slate-500 mb-6">
              We couldn't find any courses matching your current filters. Try resetting or searching for a different keyword.
            </p>
            <Button variant="primary" size="sm" onClick={clearFilters}>
              Reset All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
