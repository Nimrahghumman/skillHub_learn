import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import {
  Mail,
  MapPin,
  Clock,
  Phone,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Course Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // FAQ accordion state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Are the courses completely self-paced?',
      a: 'Yes! All courses feature lifetime on-demand access to video lessons, coding challenges, and downloadable project source repositories. You can learn at whatever pace suits your schedule.',
    },
    {
      q: 'Do I receive a certificate upon finishing a course?',
      a: 'Yes. Upon completing all lessons and scoring 80% or higher on the curriculum assessment, you receive a verified digital certificate with a verifiable credential ID you can link directly to LinkedIn or your resume.',
    },
    {
      q: 'Can I ask instructors questions if I get stuck on a code bug?',
      a: 'Absolutely. Every enrolled course includes dedicated community discussion channels, weekly live workshops, and mentor office hours.',
    },
    {
      q: 'What hardware/software do I need to get started?',
      a: 'A computer (Mac, Windows, or Linux) with a modern browser (Chrome, Firefox, Edge, or Safari) and any code editor (we recommend Visual Studio Code). All course tools are free and open source.',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 600));
    setIsLoading(false);
    setSubmitted(true);
    showToast('Your message was successfully received. Our support team will reply within 24 hours.', 'success');
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            We’re Here to Help You Succeed
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Have questions about a course, technical prerequisites, enterprise team accounts, or student mentorship? Reach out to our team.
          </p>
        </div>

        {/* Contact Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form Card (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Send us a Message
            </h2>

            {submitted ? (
              <div className="p-8 text-center bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Message Received!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <strong>{name}</strong>. We have received your inquiry regarding "<strong>{subject}</strong>" and our student support team will follow up at <strong>{email}</strong> shortly.
                </p>
                <div className="pt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Liam Foster"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="liam@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject *
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white cursor-pointer"
                  >
                    <option value="Course Inquiry">General Course Inquiry</option>
                    <option value="Curriculum Question">Technical Curriculum Question</option>
                    <option value="Certificate Verification">Certificate & Grading Verification</option>
                    <option value="Partnership">University / Enterprise Partnership</option>
                    <option value="Technical Support">Platform Bug or Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you need help with..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto"
                  isLoading={isLoading}
                  iconRight={<Send className="w-4 h-4" />}
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Contact Information Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
              <h3 className="text-base font-bold text-slate-900">
                Contact Information
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Direct Email</strong>
                    <span className="text-slate-600">support@skillhub.edu</span>
                    <span className="text-slate-400 block text-xs">Admissions: admissions@skillhub.edu</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Student Hotline</strong>
                    <span className="text-slate-600">+1 (800) 555-SKILL</span>
                    <span className="text-slate-400 block text-xs">Toll-free worldwide</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Innovation Campus</strong>
                    <span className="text-slate-600">450 University Tech Way, Suite 300</span>
                    <span className="text-slate-400 block text-xs">San Francisco, CA 94107</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Support Hours</strong>
                    <span className="text-slate-600">Monday – Friday: 8:00 AM – 7:00 PM PST</span>
                    <span className="text-slate-400 block text-xs">Weekend emergency forum coverage</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100">
              <h4 className="text-sm font-bold text-indigo-950 mb-1">
                Have a Quick Code Question?
              </h4>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                Check our interactive lesson viewer in any course or jump into the Student Dashboard discussion channels.
              </p>
              <span className="text-xs font-semibold text-indigo-700">
                Average reply turnaround: &lt; 2 hours
              </span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-bold text-slate-900">{faq.q}</span>
                    {isOpen ? (
                      <ChevronDown className="w-4 h-4 text-slate-400 rotate-180 transition-transform" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 transition-transform" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
