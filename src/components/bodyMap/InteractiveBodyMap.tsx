import React, { useState } from 'react';
import { BodyRegion } from '../../types/health';
import { Search, RotateCw, AlertCircle, PlusCircle, CheckCircle2 } from 'lucide-react';
import { HeartIllustration, LungsIllustration, BrainIllustration } from '../illustrations/MedicalIllustrations';

interface BodyRegionData {
  id: BodyRegion;
  name: string;
  side: 'front' | 'back' | 'both';
  organs: string[];
  commonSymptoms: string[];
  triageQuestions: string[];
  description: string;
}

const BODY_REGIONS_DATABASE: Record<BodyRegion, BodyRegionData> = {
  head: {
    id: 'head',
    name: 'Head & Neck',
    side: 'both',
    organs: ['Brain', 'Cranial Nerves', 'Eyes', 'Sinuses', 'Cervical Spine', 'Throat'],
    commonSymptoms: [
      'Frontal / Temporal Headache',
      'Migraine with Aura',
      'Eye Strain / Asthenopia',
      'Sinus Pressure & Congestion',
      'Neck Muscle Stiffness',
      'Dizziness / Vertigo',
    ],
    triageQuestions: [
      'Did the headache begin abruptly like a thunderclap?',
      'Is there sensitivity to bright light or sound?',
      'Do you notice visual halos or blurry vision?',
    ],
    description: 'Encompasses cranial, facial, visual, and cervical spinal structures. High susceptibility to screen tension and postural fatigue.',
  },
  neck: {
    id: 'neck',
    name: 'Neck & Cervical Spine',
    side: 'both',
    organs: ['Cervical Vertebrae C1-C7', 'Thyroid Gland', 'Carotid Arteries', 'Trapezius'],
    commonSymptoms: [
      'Tech-neck cervical strain',
      'Radicular tingling down arm',
      'Throat soreness / difficulty swallowing',
      'Swollen lymph nodes',
    ],
    triageQuestions: [
      'Does pain shoot down into your shoulder or fingers?',
      'Can you touch your chin comfortably to your chest?',
    ],
    description: 'Supports the head and houses the thyroid and cervical neural root exits.',
  },
  chest: {
    id: 'chest',
    name: 'Chest, Heart & Lungs',
    side: 'front',
    organs: ['Heart & Coronary Vessels', 'Lungs & Bronchial Tree', 'Aorta', 'Ribcage & Costal Cartilage'],
    commonSymptoms: [
      'Substernal pressure / tightness',
      'Shortness of breath on exertion',
      'Palpitations or skipped beats',
      'Sharp pain when inhaling deeply (pleuritic)',
      'Costochondritis ribcage tenderness',
    ],
    triageQuestions: [
      'Does the chest sensation radiate to your left arm, jaw, or neck?',
      'Is shortness of breath present even while resting?',
      'Are you experiencing sweating or cold clamminess?',
    ],
    description: 'Houses critical cardiovascular and pulmonary organs. Chest discomfort always warrants careful evaluation.',
  },
  abdomen: {
    id: 'abdomen',
    name: 'Abdomen & Digestive Tract',
    side: 'front',
    organs: ['Stomach', 'Liver & Gallbladder', 'Pancreas', 'Small & Large Intestines', 'Kidneys'],
    commonSymptoms: [
      'Epigastric burning / Acid reflux',
      'Post-meal bloating & gas',
      'Right upper quadrant tenderness',
      'Lower abdominal cramping',
      'Changes in bowel regularity',
    ],
    triageQuestions: [
      'Does pain worsen significantly after eating fatty or spicy foods?',
      'Have you noticed severe localized rebound tenderness?',
      'Is nausea or fever present?',
    ],
    description: 'Central digestive hub. Commonly affected by stress, dietary sensitivities, and gut motility shifts.',
  },
  back: {
    id: 'back',
    name: 'Back & Lumbar Spine',
    side: 'back',
    organs: ['Thoracic Spine', 'Lumbar Spine L1-L5', 'Sacroiliac Joints', 'Erector Spinae Muscles'],
    commonSymptoms: [
      'Lower back dull muscular ache',
      'Sciatic nerve shooting pain into glutes',
      'Morning lumbar stiffness',
      'Between-shoulder-blades tension',
    ],
    triageQuestions: [
      'Does numbness radiate into your feet or toes?',
      'Have you experienced any sudden loss of bowel or bladder control?',
    ],
    description: 'Core kinetic support pillar. High prevalence of postural fatigue from prolonged sedentary chair work.',
  },
  arms: {
    id: 'arms',
    name: 'Arms & Shoulders',
    side: 'both',
    organs: ['Rotator Cuff', 'Deltoid', 'Biceps & Triceps', 'Brachial Plexus'],
    commonSymptoms: [
      'Rotator cuff impingement pain',
      'Tennis / Golfer elbow tendinitis',
      'Biceps tendon strain',
      'Arm heaviness during overhead reach',
    ],
    triageQuestions: [
      'Is overhead arm movement restricted or painful?',
      'Did a specific lifting injury trigger this pain?',
    ],
    description: 'Upper limb kinetic chain involving glenohumeral mobility and upper limb muscular endurance.',
  },
  hands: {
    id: 'hands',
    name: 'Hands & Wrists',
    side: 'both',
    organs: ['Carpal Tunnel', 'Median & Ulnar Nerves', 'Phalangeal Joints', 'Flexor Tendons'],
    commonSymptoms: [
      'Carpal tunnel numbness in thumb/index',
      'Typing wrist fatigue & soreness',
      'Morning finger joint stiffness',
      'Trigger finger clicking sensation',
    ],
    triageQuestions: [
      'Do fingers wake you up at night with tingling numbness?',
      'Is grip strength weakened when holding objects?',
    ],
    description: 'Fine motor terminals heavily stressed during repetitive typing, mouse use, and smartphone grip.',
  },
  pelvis: {
    id: 'pelvis',
    name: 'Pelvis & Hips',
    side: 'both',
    organs: ['Hip Joint & Labrum', 'Pelvic Floor', 'Piriformis', 'Sacrum'],
    commonSymptoms: [
      'Hip flexor tightness from sitting',
      'Deep groin ache upon walking',
      'Sacroiliac joint irritation',
      'Piriformis syndrome glute tension',
    ],
    triageQuestions: [
      'Does putting weight on the leg cause acute groin pain?',
    ],
    description: 'Weight-bearing pelvis linking spine to lower extremities.',
  },
  legs: {
    id: 'legs',
    name: 'Legs & Knees',
    side: 'both',
    organs: ['Quadriceps & Hamstrings', 'Patellar Tendon', 'Meniscus', 'Calf Muscles'],
    commonSymptoms: [
      'Patellofemoral knee pain when using stairs',
      'Runner’s knee / IT band friction',
      'Nighttime calf muscle cramps',
      'Hamstring tightness after runs',
    ],
    triageQuestions: [
      'Does the knee joint give way or catch/lock during movement?',
      'Is there visible swelling or heat around the joint?',
    ],
    description: 'Primary locomotor joints carrying up to 4x body weight during athletic acceleration.',
  },
  feet: {
    id: 'feet',
    name: 'Feet & Ankles',
    side: 'both',
    organs: ['Plantar Fascia', 'Achilles Tendon', 'Talocrural Joint', 'Metatarsals'],
    commonSymptoms: [
      'First-step morning heel pain (Plantar fasciitis)',
      'Achilles tendon stiffness',
      'Ankle ligament sprain vulnerability',
      'Ball of foot tingling (Morton neuroma)',
    ],
    triageQuestions: [
      'Is the sharpest heel pain during your very first morning steps?',
      'Can you support full weight on the foot without severe pain?',
    ],
    description: 'Foundation kinetic arches absorbing high ground reaction forces with every stride.',
  },
};

interface Props {
  onSelectRegion?: (region: BodyRegion) => void;
  onQuickLogProblem?: (region: BodyRegion, defaultName: string) => void;
}

export const InteractiveBodyMap: React.FC<Props> = ({ onSelectRegion, onQuickLogProblem }) => {
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');
  const [selectedRegion, setSelectedRegion] = useState<BodyRegion>('head');
  const [searchFilter, setSearchFilter] = useState('');
  const [hoveredRegion, setHoveredRegion] = useState<BodyRegion | null>(null);

  const activeData = BODY_REGIONS_DATABASE[selectedRegion];

  const handleRegionClick = (region: BodyRegion) => {
    setSelectedRegion(region);
    if (onSelectRegion) onSelectRegion(region);
  };

  const filteredRegions = Object.values(BODY_REGIONS_DATABASE).filter((r) =>
    r.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    r.commonSymptoms.some((s) => s.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none transition-all">
      {/* Header & Accessibility Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-sm font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
            Interactive Anatomical Navigator
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Interactive Human Body Map
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
            Click on any body region to inspect anatomical systems, common symptom patterns, and log health entries.
          </p>
        </div>

        {/* View Switcher & Search */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search body part or symptom..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="pl-9 pr-3 py-2 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-teal-500 outline-none w-52 md:w-64"
            />
          </div>

          <button
            onClick={() => setViewSide(viewSide === 'front' ? 'back' : 'front')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/60 font-medium text-sm transition-all border border-teal-200/60 dark:border-teal-800 cursor-pointer"
          >
            <RotateCw className="w-4 h-4 text-teal-600 dark:text-teal-400 animate-spin-slow" />
            <span>View: {viewSide === 'front' ? 'Front' : 'Back'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Body Vector + Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-start">
        {/* Left: Interactive Vector Body Graphic */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-teal-50/30 dark:from-slate-950/40 dark:to-teal-950/20 rounded-3xl border border-slate-100 dark:border-slate-800/80 relative">
          {/* Quick Body Side Badge */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 shadow-sm border border-slate-200/60 dark:border-slate-700 text-slate-600 dark:text-slate-300">
            {viewSide === 'front' ? 'Anterior (Front)' : 'Posterior (Back)'}
          </div>

          {hoveredRegion && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-teal-500 text-white shadow-md animate-fade-in">
              {BODY_REGIONS_DATABASE[hoveredRegion]?.name}
            </div>
          )}

          {/* SVG Human Anatomy Vector */}
          <div className="relative w-64 md:w-72 h-[480px] my-2 select-none">
            <svg
              viewBox="0 0 200 400"
              className="w-full h-full drop-shadow-lg filter transition-all duration-300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="bodyDefault" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#E2E8F0" />
                  <stop offset="100%" stop-color="#CBD5E1" />
                </linearGradient>
                <linearGradient id="bodySelected" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#2DD4BF" />
                  <stop offset="100%" stop-color="#0D9488" />
                </linearGradient>
                <linearGradient id="bodyHover" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#38BDF8" />
                  <stop offset="100%" stop-color="#0284C7" />
                </linearGradient>
              </defs>

              {/* HEAD & NECK */}
              <g
                className="cursor-pointer transition-all duration-200"
                onClick={() => handleRegionClick('head')}
                onMouseEnter={() => setHoveredRegion('head')}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                <circle
                  cx="100"
                  cy="38"
                  r="24"
                  fill={selectedRegion === 'head' ? 'url(#bodySelected)' : hoveredRegion === 'head' ? 'url(#bodyHover)' : 'url(#bodyDefault)'}
                  stroke={selectedRegion === 'head' ? '#0F766E' : '#94A3B8'}
                  strokeWidth="2"
                />
                {/* Neck */}
                <rect
                  x="92"
                  y="60"
                  width="16"
                  height="16"
                  rx="4"
                  fill={selectedRegion === 'head' ? 'url(#bodySelected)' : hoveredRegion === 'head' ? 'url(#bodyHover)' : 'url(#bodyDefault)'}
                  stroke={selectedRegion === 'head' ? '#0F766E' : '#94A3B8'}
                  strokeWidth="2"
                />
              </g>

              {/* CHEST (Front) or UPPER BACK (Back) */}
              <g
                className="cursor-pointer transition-all duration-200"
                onClick={() => handleRegionClick(viewSide === 'front' ? 'chest' : 'back')}
                onMouseEnter={() => setHoveredRegion(viewSide === 'front' ? 'chest' : 'back')}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                <path
                  d="M72 76 C72 74 128 74 128 76 C136 94 138 120 134 136 C130 144 70 144 66 136 C62 120 64 94 72 76 Z"
                  fill={
                    (viewSide === 'front' && selectedRegion === 'chest') || (viewSide === 'back' && selectedRegion === 'back')
                      ? 'url(#bodySelected)'
                      : (viewSide === 'front' && hoveredRegion === 'chest') || (viewSide === 'back' && hoveredRegion === 'back')
                      ? 'url(#bodyHover)'
                      : 'url(#bodyDefault)'
                  }
                  stroke={
                    (viewSide === 'front' && selectedRegion === 'chest') || (viewSide === 'back' && selectedRegion === 'back')
                      ? '#0F766E'
                      : '#94A3B8'
                  }
                  strokeWidth="2"
                />
              </g>

              {/* ABDOMEN (Front) or LOWER BACK (Back) */}
              <g
                className="cursor-pointer transition-all duration-200"
                onClick={() => handleRegionClick(viewSide === 'front' ? 'abdomen' : 'back')}
                onMouseEnter={() => setHoveredRegion(viewSide === 'front' ? 'abdomen' : 'back')}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                <path
                  d="M66 136 C70 144 130 144 134 136 C132 160 130 186 126 196 C122 202 78 202 74 196 C70 186 68 160 66 136 Z"
                  fill={
                    (viewSide === 'front' && selectedRegion === 'abdomen') || (viewSide === 'back' && selectedRegion === 'back')
                      ? 'url(#bodySelected)'
                      : (viewSide === 'front' && hoveredRegion === 'abdomen') || (viewSide === 'back' && hoveredRegion === 'back')
                      ? 'url(#bodyHover)'
                      : 'url(#bodyDefault)'
                  }
                  stroke={
                    (viewSide === 'front' && selectedRegion === 'abdomen') || (viewSide === 'back' && selectedRegion === 'back')
                      ? '#0F766E'
                      : '#94A3B8'
                  }
                  strokeWidth="2"
                />
              </g>

              {/* ARMS (Left & Right) */}
              <g
                className="cursor-pointer transition-all duration-200"
                onClick={() => handleRegionClick('arms')}
                onMouseEnter={() => setHoveredRegion('arms')}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                {/* Left Arm */}
                <path
                  d="M68 80 C60 90 48 126 44 156 C42 172 40 188 38 202 C34 202 44 206 48 200 C52 186 56 160 62 136 Z"
                  fill={selectedRegion === 'arms' ? 'url(#bodySelected)' : hoveredRegion === 'arms' ? 'url(#bodyHover)' : 'url(#bodyDefault)'}
                  stroke={selectedRegion === 'arms' ? '#0F766E' : '#94A3B8'}
                  strokeWidth="2"
                />
                {/* Right Arm */}
                <path
                  d="M132 80 C140 90 152 126 156 156 C158 172 160 188 162 202 C166 202 156 206 152 200 C148 186 144 160 138 136 Z"
                  fill={selectedRegion === 'arms' ? 'url(#bodySelected)' : hoveredRegion === 'arms' ? 'url(#bodyHover)' : 'url(#bodyDefault)'}
                  stroke={selectedRegion === 'arms' ? '#0F766E' : '#94A3B8'}
                  strokeWidth="2"
                />
              </g>

              {/* HANDS (Left & Right) */}
              <g
                className="cursor-pointer transition-all duration-200"
                onClick={() => handleRegionClick('hands')}
                onMouseEnter={() => setHoveredRegion('hands')}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                <circle
                  cx="37"
                  cy="216"
                  r="9"
                  fill={selectedRegion === 'hands' ? 'url(#bodySelected)' : hoveredRegion === 'hands' ? 'url(#bodyHover)' : 'url(#bodyDefault)'}
                  stroke={selectedRegion === 'hands' ? '#0F766E' : '#94A3B8'}
                  strokeWidth="2"
                />
                <circle
                  cx="163"
                  cy="216"
                  r="9"
                  fill={selectedRegion === 'hands' ? 'url(#bodySelected)' : hoveredRegion === 'hands' ? 'url(#bodyHover)' : 'url(#bodyDefault)'}
                  stroke={selectedRegion === 'hands' ? '#0F766E' : '#94A3B8'}
                  strokeWidth="2"
                />
              </g>

              {/* PELVIS / HIPS */}
              <g
                className="cursor-pointer transition-all duration-200"
                onClick={() => handleRegionClick('pelvis')}
                onMouseEnter={() => setHoveredRegion('pelvis')}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                <path
                  d="M74 196 C78 202 122 202 126 196 C130 212 126 230 118 238 C108 244 92 244 82 238 C74 230 70 212 74 196 Z"
                  fill={selectedRegion === 'pelvis' ? 'url(#bodySelected)' : hoveredRegion === 'pelvis' ? 'url(#bodyHover)' : 'url(#bodyDefault)'}
                  stroke={selectedRegion === 'pelvis' ? '#0F766E' : '#94A3B8'}
                  strokeWidth="2"
                />
              </g>

              {/* LEGS & KNEES */}
              <g
                className="cursor-pointer transition-all duration-200"
                onClick={() => handleRegionClick('legs')}
                onMouseEnter={() => setHoveredRegion('legs')}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                {/* Left Leg */}
                <path
                  d="M78 238 C86 244 96 242 96 256 C96 280 94 310 92 342 C88 344 80 344 76 342 C74 310 72 278 74 246 Z"
                  fill={selectedRegion === 'legs' ? 'url(#bodySelected)' : hoveredRegion === 'legs' ? 'url(#bodyHover)' : 'url(#bodyDefault)'}
                  stroke={selectedRegion === 'legs' ? '#0F766E' : '#94A3B8'}
                  strokeWidth="2"
                />
                {/* Right Leg */}
                <path
                  d="M122 238 C114 244 104 242 104 256 C104 280 106 310 108 342 C112 344 120 344 124 342 C126 310 128 278 126 246 Z"
                  fill={selectedRegion === 'legs' ? 'url(#bodySelected)' : hoveredRegion === 'legs' ? 'url(#bodyHover)' : 'url(#bodyDefault)'}
                  stroke={selectedRegion === 'legs' ? '#0F766E' : '#94A3B8'}
                  strokeWidth="2"
                />
              </g>

              {/* FEET & ANKLES */}
              <g
                className="cursor-pointer transition-all duration-200"
                onClick={() => handleRegionClick('feet')}
                onMouseEnter={() => setHoveredRegion('feet')}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                {/* Left Foot */}
                <path
                  d="M74 344 C78 346 90 346 92 348 C94 358 84 366 70 366 C64 366 66 356 74 344 Z"
                  fill={selectedRegion === 'feet' ? 'url(#bodySelected)' : hoveredRegion === 'feet' ? 'url(#bodyHover)' : 'url(#bodyDefault)'}
                  stroke={selectedRegion === 'feet' ? '#0F766E' : '#94A3B8'}
                  strokeWidth="2"
                />
                {/* Right Foot */}
                <path
                  d="M126 344 C122 346 110 346 108 348 C106 358 116 366 130 366 C136 366 134 356 126 344 Z"
                  fill={selectedRegion === 'feet' ? 'url(#bodySelected)' : hoveredRegion === 'feet' ? 'url(#bodyHover)' : 'url(#bodyDefault)'}
                  stroke={selectedRegion === 'feet' ? '#0F766E' : '#94A3B8'}
                  strokeWidth="2"
                />
              </g>
            </svg>
          </div>

          {/* Quick Select Buttons Grid for Mobile & Accessibility */}
          <div className="flex flex-wrap justify-center gap-1.5 mt-2 w-full">
            {Object.keys(BODY_REGIONS_DATABASE).map((key) => {
              const reg = BODY_REGIONS_DATABASE[key as BodyRegion];
              const isSelected = selectedRegion === key;
              return (
                <button
                  key={key}
                  onClick={() => handleRegionClick(key as BodyRegion)}
                  className={`text-xs px-2.5 py-1 rounded-lg transition-all font-medium cursor-pointer ${
                    isSelected
                      ? 'bg-teal-600 text-white shadow-sm ring-2 ring-teal-300'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {reg.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Region Anatomical & Symptom Intelligence Card */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
            {/* Top Region Title & Organ Tags */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300">
                  {selectedRegion === 'head' && <BrainIllustration size={40} />}
                  {selectedRegion === 'chest' && <HeartIllustration size={40} />}
                  {selectedRegion === 'abdomen' && <LungsIllustration size={40} />}
                  {!['head', 'chest', 'abdomen'].includes(selectedRegion) && (
                    <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white font-bold text-lg">
                      {activeData.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {activeData.name}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
                    {activeData.description}
                  </p>
                </div>
              </div>

              {/* Direct Problem Logging CTA */}
              <button
                onClick={() => {
                  if (onQuickLogProblem) {
                    onQuickLogProblem(selectedRegion, `Issue in ${activeData.name}`);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-all shadow-md shadow-teal-600/20 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Log Health Problem</span>
              </button>
            </div>

            {/* Anatomical Structures / Organs */}
            <div className="mt-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Key Anatomical Structures
              </span>
              <div className="flex flex-wrap gap-2">
                {activeData.organs.map((organ, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-white dark:bg-slate-700/80 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-600 shadow-2xs"
                  >
                    {organ}
                  </span>
                ))}
              </div>
            </div>

            {/* Common Symptom Patterns */}
            <div className="mt-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Common Symptoms in this Region
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {activeData.commonSymptoms.map((symptom, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      if (onQuickLogProblem) {
                        onQuickLogProblem(selectedRegion, symptom);
                      }
                    }}
                    className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-700/60 border border-slate-200/60 dark:border-slate-600/60 hover:border-teal-400 dark:hover:border-teal-500 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-500 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        {symptom}
                      </span>
                    </div>
                    <span className="text-xs text-teal-600 dark:text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      + Log
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Triage Safety Questionnaire */}
            <div className="mt-6 pt-5 border-t border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <AlertCircle className="w-4 h-4" />
                Targeted Triage Questions
              </div>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {activeData.triageQuestions.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
