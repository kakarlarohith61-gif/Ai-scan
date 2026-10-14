import React, { useState } from 'react';
import { TimelineItem } from '../../types/health';
import {
  Clock,
  Calendar,
  Filter,
  FileText,
  AlertCircle,
  Pill,
  Activity,
  HeartPulse,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Props {
  timelineItems: TimelineItem[];
  onNavigateToRecord?: (type: string, referenceId?: string) => void;
}

export const HealthTimeline: React.FC<Props> = ({
  timelineItems,
  onNavigateToRecord,
}) => {
  const [filterType, setFilterType] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredItems = timelineItems.filter((item) => {
    if (filterType === 'All') return true;
    return item.type === filterType;
  });

  const getItemIcon = (type: TimelineItem['type']) => {
    switch (type) {
      case 'report':
        return <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
      case 'problem':
        return <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'medication':
        return <Pill className="w-4 h-4 text-teal-600 dark:text-teal-400" />;
      case 'appointment':
        return <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'vitals':
        return <HeartPulse className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      default:
        return <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-sm font-semibold uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>Chronological Healthcare Journey</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Personal Health Timeline
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Unified longitudinal chronicle of clinical milestones, lab reports, symptoms, and medical visits.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {['All', 'report', 'problem', 'medication', 'vitals'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer capitalize ${
                filterType === t
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              {t === 'report' ? 'Reports' : t === 'problem' ? 'Health Issues' : t === 'medication' ? 'Medications' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Timeline Feed */}
      <div className="relative pl-6 md:pl-10 space-y-6 before:content-[''] before:absolute before:left-3 md:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {filteredItems.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div key={item.id} className="relative group">
              {/* Timeline Node Bullet */}
              <div className="absolute -left-6 md:-left-10 top-3 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-2 border-teal-500 shadow-md flex items-center justify-center -translate-x-1/2 group-hover:scale-110 transition-transform">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              </div>

              {/* Timeline Card */}
              <div className="p-5 md:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none hover:border-teal-400/80 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
                      {getItemIcon(item.type)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span className={`text-2xs px-2.5 py-0.5 rounded-full font-bold ${item.badgeColor}`}>
                      {item.badgeText}
                    </span>
                    <span className="text-2xs text-slate-400 font-mono">
                      {item.date} • {item.time}
                    </span>
                  </div>
                </div>

                {item.details && (
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.details}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
