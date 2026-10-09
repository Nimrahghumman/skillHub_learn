import React from 'react';
import { Review } from '../../types';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, className = '' }) => {
  return (
    <div
      className={`glass-panel p-7 rounded-2xl shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between border border-slate-200/80 group ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <Quote className="w-6 h-6 text-indigo-300/60 group-hover:text-indigo-500 transition-colors" />
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
          "{review.comment}"
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={review.avatar}
            alt={review.authorName}
            className="w-10 h-10 rounded-full object-cover border-2 border-indigo-200 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold text-slate-900">{review.authorName}</h4>
              <span title="Verified Graduate">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {review.authorRole} · <span className="font-medium text-slate-600">{review.authorCompany}</span>
            </p>
          </div>
        </div>

        <span className="text-[10px] text-slate-400 hidden sm:inline">
          {review.date}
        </span>
      </div>
    </div>
  );
};
