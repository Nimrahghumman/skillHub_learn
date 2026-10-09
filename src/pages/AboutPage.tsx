import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Target, Compass, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useApp();

  const values = [
    {
      title: 'Real-World Production Scenarios',
      description: 'We abandon artificial toy code. Every assignment mirrors actual pull requests, system bottlenecks, and architectural constraints encountered at scale.',
    },
    {
      title: 'Rigorous Depth over Shallow Breadth',
      description: 'Understanding memory allocation, the JavaScript call stack, or database execution plans creates developers who can solve unknown problems.',
    },
    {
      title: 'Accessible & Equitable Education',
      description: 'World-class tech education should not be locked behind $25,000 bootcamps. SkillHub offers high-caliber curriculum directly to motivated learners globally.',
    },
    {
      title: 'Continuous Industry Alignment',
      description: 'Our curriculum updates constantly as frameworks evolve—from React 19 and Next.js App Router to cloud-native serverless backends.',
    },
  ];

  const milestones = [
    { year: '2023', title: 'SkillHub Founded', desc: 'Started by senior engineers tired of superficial bootcamps.' },
    { year: '2024', title: '10,000 Graduates', desc: 'Introduced interactive browser code execution sandboxes.' },
    { year: '2025', title: 'Global University Partnerships', desc: 'Curriculum adopted by accredited university computer science tracks.' },
    { year: '2026', title: '85,000+ Active Students', desc: 'Ranked top tech career accelerator by industry hiring consortiums.' },
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 1. Header & What SkillHub is */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              About SkillHub
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Bridging the Gap Between Academic Theory and Production Engineering
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              SkillHub is a premier online learning platform engineered to empower students, career switchers, and software engineers with rigorous, project-backed technical education.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              We replace rote video watching with hands-on labs, real code reviews, and structured curricula spanning HTML, CSS, JavaScript, React, Next.js, Python, Node.js, and MongoDB.
            </p>
            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/courses')}
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                Explore Learning Tracks
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900">
              <img
                src="/src/assets/images/about_team_learning_1791391068916.jpg"
                alt="Instructors and learners collaborating in modern workshop"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 2. Mission and Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                To democratize high-rigor computer science and engineering education. We equip any determined student with the architectural intuition, clean code craftsmanship, and modern stack proficiency required to thrive in engineering teams.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center gap-2 text-xs font-semibold text-indigo-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>Measurable student transformation</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                <Compass className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Our Vision</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                A world where talent and dedication define engineering opportunity, not geographic pedigree or costly gatekeeping. We envision a global network of confident builders creating resilient digital systems for the next century.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center gap-2 text-xs font-semibold text-purple-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>Lifelong technical excellence</span>
            </div>
          </div>
        </div>

        {/* 3. Why Students Should Learn with SkillHub */}
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-xs">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Educational Pillars
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Why Learn With SkillHub?
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Our unique instructional framework combines theoretical clarity with rigorous execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{v.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-8">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Milestone Timeline */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Platform Milestones
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-2"
              >
                <span className="text-xl font-extrabold text-indigo-600 font-mono">
                  {m.year}
                </span>
                <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Team / Invitation CTA */}
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-8 sm:p-12 text-white text-center space-y-4">
          <Sparkles className="w-8 h-8 text-indigo-300 mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Start Your Journey with SkillHub Today
          </h2>
          <p className="text-xs sm:text-sm text-indigo-200 max-w-xl mx-auto">
            Explore 8 comprehensive curriculums across frontend, backend, databases, and full stack systems.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-indigo-700 hover:bg-slate-100"
              onClick={() => navigate('/courses')}
            >
              Browse All Courses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
