import React from 'react';
import { Course } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Award, CheckCircle2, Copy, Download, Share2, ShieldCheck } from 'lucide-react';
import { Button } from './Button';

interface CertificateModalProps {
  course: Course;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ course, onClose }) => {
  const { user, showToast } = useApp();

  const studentName = user?.name || 'Alex Johnson';
  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const credentialId = `SKL-${course.slug.toUpperCase().slice(0, 4)}-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(`https://skillhub.edu/verify/${credentialId}`);
    showToast('Certificate verification link copied!', 'success');
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold">Verified Student Certificate</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Surface */}
        <div className="p-8 sm:p-12 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
          <div className="relative border-4 border-double border-indigo-900/40 p-8 sm:p-10 rounded-xl bg-white shadow-inner text-center space-y-6">
            {/* Seal / Emblem */}
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg">
              <Award className="w-9 h-9" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-indigo-700 font-bold">
                SkillHub Certificate of Completion
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-serif">
                {studentName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto">
                has successfully mastered and completed the curriculum requirements for
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-indigo-900 mt-1">
                {course.title}
              </h3>
            </div>

            {/* Verification Details */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-6 text-xs text-slate-600 max-w-lg mx-auto">
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Lead Instructor
                </span>
                <p className="font-semibold text-slate-900 mt-0.5">{course.instructor.name}</p>
                <p className="text-[10px] text-slate-500 font-serif italic">Verified Signature</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Issue Date & Credential ID
                </span>
                <p className="font-semibold text-slate-900 mt-0.5">{issueDate}</p>
                <p className="text-[10px] font-mono text-indigo-600">{credentialId}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Cryptographically verifiable on SkillHub Registry</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyLink}
              icon={<Copy className="w-3.5 h-3.5" />}
            >
              Copy Link
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={handleDownload}
              icon={<Download className="w-3.5 h-3.5" />}
            >
              Print / Save PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
