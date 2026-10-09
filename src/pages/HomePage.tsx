import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { COURSES, PLATFORM_STATS, WHY_CHOOSE_ITEMS, REVIEWS } from '../data/coursesData';
import { Button } from '../components/common/Button';
import { CourseCard } from '../components/common/CourseCard';
import { ReviewCard } from '../components/common/ReviewCard';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Code2,
  Award,
  Users,
  CheckCircle,
  Star,
  Quote,
  Terminal,
  PlayCircle,
  Search,
  CheckCircle2,
  Zap,
  X,
  Play,
  Pause,
  Clock,
  ShieldCheck,
  Flame,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate } = useApp();
  const [heroSearch, setHeroSearch] = useState('');
  const [showTourModal, setShowTourModal] = useState(false);
  const [isTourPlaying, setIsTourPlaying] = useState(true);

  const popularCourses = COURSES.slice(0, 6);

  // Quick jump filter topics
  const quickTopics = [
    { label: 'React.js', query: 'React' },
    { label: 'Next.js', query: 'Next.js' },
    { label: 'Python', query: 'Python' },
    { label: 'Node.js', query: 'Node.js' },
    { label: 'Full Stack', query: 'Full Stack' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate('/courses', { search: heroSearch.trim() });
    } else {
      navigate('/courses');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Upgraded Premium Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-slate-50/80 py-16 sm:py-20 lg:py-28 border-b border-slate-200/60">
        {/* Subtle Ambient Background Gradient Glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[780px] h-[520px] bg-gradient-to-tr from-indigo-500/12 via-purple-500/10 to-sky-400/8 blur-3xl rounded-full animate-ambient-glow"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 -right-20 w-[420px] h-[420px] bg-purple-400/10 blur-3xl rounded-full animate-ambient-glow"
          style={{ animationDelay: '3s' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-20 w-96 h-96 bg-indigo-400/10 blur-3xl rounded-full animate-ambient-glow"
          style={{ animationDelay: '5s' }}
        />

        {/* Subtle Ambient Moving Particles */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/6 w-2 h-2 rounded-full bg-indigo-400/40 animate-particle-1" />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-purple-400/30 animate-particle-2" />
          <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 rounded-full bg-sky-400/40 animate-particle-3" />
        </div>

        {/* Subtle Architectural Grid Pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:24px_24px]"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: Animated Copy & Interactive Actions */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              {/* Animated Top Kicker / Announcement Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-indigo-50/90 border border-indigo-200/80 shadow-2xs text-xs font-semibold text-indigo-700 backdrop-blur-xs"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-beacon absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
                </span>
                <span>Next-Generation Technical Curriculum</span>
                <span className="text-indigo-300" aria-hidden="true">|</span>
                <span className="text-indigo-600/80 font-medium hidden sm:inline">2026 Edition</span>
              </motion.div>

              {/* Animated Headline with Gradient Flourish */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]"
              >
                Learn Skills.{' '}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                  Build Your Future.
                </span>
              </motion.h1>

              {/* Animated Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed"
              >
                SkillHub provides modern, project-driven computer science education. Master HTML & CSS, JavaScript, React, Next.js, Python, and Full Stack architecture with industry architects.
              </motion.p>

              {/* Interactive Search Bar in Hero */}
              <motion.form
                onSubmit={handleSearchSubmit}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
                className="relative max-w-lg"
              >
                <div className="relative flex items-center shadow-xs bg-white rounded-xl border border-slate-200/90 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                  <Search className="w-4 h-4 text-slate-400 ml-3.5 shrink-0" />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Search courses: React, Next.js, Python, MongoDB..."
                    className="w-full py-2.5 pl-2.5 pr-20 text-xs sm:text-sm text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Explore
                  </button>
                </div>
              </motion.form>

              {/* Interactive Primary & Secondary Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.32, ease: 'easeOut' }}
                className="flex flex-wrap items-center gap-3.5 pt-1"
              >
                {/* Primary Button with interactive hover lift, sliding arrow, and subtle sheen sweep */}
                <button
                  type="button"
                  onClick={() => navigate('/courses')}
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 rounded-xl shadow-sm hover:shadow-indigo-500/25 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 cursor-pointer"
                >
                  {/* Subtle Shimmer Sweeper */}
                  <span className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-12 pointer-events-none opacity-0 group-hover:opacity-100 animate-button-shine" />
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>

                {/* Secondary Button: Interactive Platform Tour Preview */}
                <button
                  type="button"
                  onClick={() => setShowTourModal(true)}
                  className="group inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl shadow-2xs hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4 text-indigo-600 transition-transform duration-200 group-hover:scale-110" />
                  <span>Platform Tour</span>
                </button>
              </motion.div>

              {/* Quick Topic Jump Chips */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500"
              >
                <span className="font-medium text-slate-400 mr-1">Popular tracks:</span>
                {quickTopics.map((topic) => (
                  <button
                    key={topic.label}
                    type="button"
                    onClick={() => navigate('/courses', { search: topic.query })}
                    className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all text-xs font-medium cursor-pointer shadow-2xs"
                  >
                    {topic.label}
                  </button>
                ))}
              </motion.div>

              {/* Trust markers */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="pt-4 border-t border-slate-200/70 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>85,000+ Students</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>100% Project-Based</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Verified Certificates</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Hero Visual Showcase with Floating Animated Cards */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative mx-auto max-w-md lg:max-w-none"
              >
                {/* Hairline Glowing Border Wrapper */}
                <div className="p-0.5 rounded-2xl bg-gradient-to-tr from-indigo-500/25 via-purple-500/20 to-sky-400/20 shadow-xl">
                  {/* Main Visual Display Frame */}
                  <div className="relative aspect-[4/3] rounded-[15px] overflow-hidden bg-slate-900 group">
                    <img
                      src="/src/assets/images/hero_skillhub_learning_1791391029901.jpg"
                      alt="Focused student learning software engineering online"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                    />
                    {/* Media Contrast Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent pointer-events-none" />

                    {/* Internal Interactive Banner Badge */}
                    <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-lg border border-slate-100/90 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-xs">
                          <Code2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Career-Ready Projects</p>
                          <p className="text-[11px] text-slate-500">From fundamentals to full-stack cloud</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100/80 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Flame className="w-3 h-3 text-orange-500" />
                        <span>Live Labs</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Animated Education Card 1: Verified Certificate (Top-Right) */}
                <div className="absolute -top-5 -right-2 sm:-right-5 animate-hero-float pointer-events-auto">
                  <div className="bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-lg border border-slate-200/90 flex items-center gap-3 hover:border-indigo-300 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 leading-tight">Verified Certificate</p>
                      <p className="text-[10px] text-slate-500">Industry Credential</p>
                    </div>
                  </div>
                </div>

                {/* Floating Animated Education Card 2: 100+ Hands-on Labs (Bottom-Left) */}
                <div className="absolute -bottom-5 -left-2 sm:-left-5 animate-hero-float-delayed pointer-events-auto">
                  <div className="bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-lg border border-slate-200/90 flex items-center gap-3 hover:border-purple-300 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-slate-900 leading-tight">100+ Code Labs</span>
                        <Zap className="w-3 h-3 text-amber-500 fill-amber-400" />
                      </div>
                      <p className="text-[10px] text-slate-500">Real Pull Requests</p>
                    </div>
                  </div>
                </div>

                {/* Floating Animated Education Card 3: Student Rating Stack (Top-Left on desktop) */}
                <div className="hidden sm:flex absolute -top-5 -left-4 animate-hero-float-reverse pointer-events-auto">
                  <div className="bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-md border border-slate-200/90 flex items-center gap-2.5">
                    <div className="flex -space-x-1.5 overflow-hidden">
                      <img
                        className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
                        alt="Student"
                      />
                      <img
                        className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
                        alt="Student"
                      />
                      <img
                        className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
                        alt="Student"
                      />
                    </div>
                    <div className="text-[11px] leading-tight">
                      <div className="flex items-center gap-1 text-slate-900 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>4.95 / 5.0</span>
                      </div>
                      <span className="text-[10px] text-slate-500">85k+ Learners</span>
                    </div>
                  </div>
                </div>

                {/* Floating Micro Tech Badge (Desktop-only clean flourish) */}
                <div className="hidden lg:flex absolute top-1/2 -right-7 -translate-y-1/2 animate-hero-float-delayed pointer-events-none">
                  <div className="bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-md flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    <span>Next.js 15</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Platform Tour Video Modal */}
      {showTourModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-3xl bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50 text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">SkillHub Platform Tour (2 min)</h3>
                  <p className="text-[11px] text-slate-400">Interactive curriculum & hands-on development preview</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowTourModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close tour modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Simulation */}
            <div className="p-6">
              <div className="relative aspect-video rounded-xl bg-slate-950 overflow-hidden flex flex-col justify-between p-5 border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono">Chapter 1: The Modern Curriculum Architecture</span>
                  <span className="bg-white/10 px-2 py-0.5 rounded text-white text-[11px] font-mono">1080p 60fps</span>
                </div>

                <div className="flex flex-col items-center justify-center py-8">
                  <button
                    type="button"
                    onClick={() => setIsTourPlaying(!isTourPlaying)}
                    className="w-16 h-16 rounded-full bg-indigo-600/90 hover:bg-indigo-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label={isTourPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isTourPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5 fill-current" />}
                  </button>
                  <p className="text-xs text-slate-300 mt-3 font-medium">
                    {isTourPlaying ? 'Streaming platform walkthrough...' : 'Paused'}
                  </p>
                </div>

                {/* Scrub bar */}
                <div className="space-y-2">
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`bg-indigo-500 h-full rounded-full transition-all duration-300 ${
                        isTourPlaying ? 'w-3/5' : 'w-1/4'
                      }`}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>{isTourPlaying ? '01:14' : '00:30'}</span>
                    <span>02:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Ready to dive in? Choose from 8 comprehensive tracks.
              </span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-transparent text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white"
                  onClick={() => setShowTourModal(false)}
                >
                  Close
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    setShowTourModal(false);
                    navigate('/courses');
                  }}
                  iconRight={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Browse Courses
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Platform Statistics Section */}
      <section className="bg-slate-900 py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {PLATFORM_STATS.map((stat, i) => (
              <div key={i} className={`pt-4 md:pt-0 ${i !== 0 ? 'md:pl-8' : ''}`}>
                <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-200 mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {stat.context}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Popular Courses Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Explore Curriculum
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
                Popular & High-Demand Courses
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-xl">
                Curated learning paths designed to take you from foundational syntax to shipping production-ready systems.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/courses')}
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              View All 8 Courses
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose SkillHub Section */}
      <section className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Why Learn With Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Engineered for Real Career Outcomes
            </h2>
            <p className="text-base text-slate-600 mt-3">
              Traditional bootcamps rely on shallow exercises. SkillHub prioritizes deep conceptual understanding and real-world system patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_CHOOSE_ITEMS.map((item, idx) => {
              const icons = [
                <Code2 className="w-6 h-6 text-indigo-600" />,
                <BookOpen className="w-6 h-6 text-purple-600" />,
                <Award className="w-6 h-6 text-blue-600" />,
                <Users className="w-6 h-6 text-emerald-600" />,
              ];
              return (
                <div
                  key={item.id}
                  className="p-6 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-md transition-all duration-200 flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-5 shadow-xs">
                    {icons[idx % 4]}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed flex-1">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Student Reviews Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Student Stories
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Verified Student Reviews
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Hear from graduates who transformed their engineering trajectories through SkillHub.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call to Action Banner */}
      <section className="py-16 bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Accelerate Your Tech Career?
          </h2>
          <p className="text-indigo-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Join thousands of developers leveling up their technical competence. Enroll in courses today and earn verified industry certificates.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-indigo-700 hover:bg-slate-100"
              onClick={() => navigate('/courses')}
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Explore All Courses
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10"
              onClick={() => navigate('/register')}
            >
              Create Free Account
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

