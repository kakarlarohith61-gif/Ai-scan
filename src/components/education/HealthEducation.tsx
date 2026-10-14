import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Search,
  ExternalLink,
} from 'lucide-react';
import { HeartIllustration, LungsIllustration, BrainIllustration } from '../illustrations/MedicalIllustrations';

interface Article {
  id: string;
  title: string;
  category: 'Cardiovascular' | 'Metabolism' | 'Neurology & Sleep' | 'Ergonomics';
  readTime: string;
  illustration: 'heart' | 'lungs' | 'brain';
  summary: string;
  takeaways: string[];
  mythBuster: { myth: string; fact: string };
}

const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Demystifying Your Lipid Profile: HDL, LDL, and Triglycerides',
    category: 'Cardiovascular',
    readTime: '4 min read',
    illustration: 'heart',
    summary:
      'Total cholesterol alone does not tell the complete cardiovascular story. High-density lipoprotein (HDL) serves as a vascular vacuum cleaner, while small dense LDL particles can penetrate vascular endothelium.',
    takeaways: [
      'HDL > 50 mg/dL provides active vascular endothelial protection.',
      'Dietary soluble fiber (oats, legumes) binds bile acids to gently lower LDL.',
      'Regular aerobic walking is the single most proven driver of HDL elevation.',
    ],
    mythBuster: {
      myth: 'All cholesterol is toxic and should be brought as close to zero as possible.',
      fact: 'Cholesterol is an essential cellular building block required for steroid hormones, vitamin D synthesis, and cell membrane integrity.',
    },
  },
  {
    id: 'art-2',
    title: 'The Science of Circadian Sleep Architecture & Melatonin',
    category: 'Neurology & Sleep',
    readTime: '5 min read',
    illustration: 'brain',
    summary:
      'Sleep is not passive downtime. During slow-wave and REM sleep, the glymphatic system clears metabolic waste (including beta-amyloid), while neuroplastic consolidation occurs.',
    takeaways: [
      'Morning sunlight exposure within 45 minutes of waking anchors circadian melatonin release 16 hours later.',
      'Blue light after 9 PM delays the nocturnal melatonin surge by up to 90 minutes.',
      'Magnesium glycinate acts as a natural NMDA receptor regulator and promotes GABAergic relaxation.',
    ],
    mythBuster: {
      myth: 'You can easily "catch up" on five days of chronic sleep deprivation over the weekend.',
      fact: 'Glymphatic metabolic clearance cannot compensate for a multi-day sleep debt in a single weekend marathon.',
    },
  },
  {
    id: 'art-3',
    title: 'Digital Eye Strain & Asthenopia: The 20-20-20 Protocol',
    category: 'Ergonomics',
    readTime: '3 min read',
    illustration: 'lungs',
    summary:
      'Staring at fixed computer displays holds the ciliary muscles in continuous isometric accommodation, causing micro-spasms that radiate into temporal tension headaches.',
    takeaways: [
      'Every 20 minutes, focus on an object 20 feet away for 20 seconds.',
      'Blink rate drops from 18 times/min to under 5 times/min during focused screen reading.',
      'Position monitors 20-26 inches away with the top line of text slightly below eye level.',
    ],
    mythBuster: {
      myth: 'Computer glasses completely eliminate the need for taking breaks.',
      fact: 'Lenses reduce refractive and blue-spectrum glare, but only ocular muscle relaxation can alleviate asthenopia.',
    },
  },
];

export const HealthEducation: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filtered = ARTICLES.filter((a) => {
    const matchCat = selectedCategory === 'All' || a.category === selectedCategory;
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-sm font-semibold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Clinical Evidence Library</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Health Education & Science Guides
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Curated medical explanations, lifestyle science, and clinical myth busters.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search medical guides..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none w-56 md:w-64"
          />
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        {['All', 'Cardiovascular', 'Neurology & Sleep', 'Ergonomics'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((art) => (
          <div
            key={art.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-2xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                  {art.category}
                </span>
                <span className="text-2xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {art.readTime}
                </span>
              </div>

              <div className="my-3 flex items-center justify-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                {art.illustration === 'heart' && <HeartIllustration size={48} />}
                {art.illustration === 'lungs' && <LungsIllustration size={48} />}
                {art.illustration === 'brain' && <BrainIllustration size={48} />}
              </div>

              <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                {art.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {art.summary}
              </p>

              {/* Key Takeaways */}
              <div className="mt-4 space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">
                  Key Clinical Takeaways:
                </span>
                {art.takeaways.map((t, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-2xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>

              {/* Myth Buster Box */}
              <div className="mt-4 p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-2xs space-y-1">
                <div className="font-bold text-amber-800 dark:text-amber-300">
                  ⚡ Myth vs. Fact:
                </div>
                <div className="text-slate-600 dark:text-slate-400 line-through">
                  "{art.mythBuster.myth}"
                </div>
                <div className="text-slate-800 dark:text-slate-200 font-medium">
                  → {art.mythBuster.fact}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
