import React from 'react';
import {
  LayoutDashboard,
  Sparkles,
  AlertCircle,
  Stethoscope,
  Activity,
  FileText,
  ScanLine,
  Pill,
  Clock,
  TrendingUp,
  BookOpen,
  Calendar,
  Target,
  GraduationCap,
  ShieldAlert,
  User,
  Sun,
  Moon,
  Globe,
  PhoneCall,
  Menu,
  X,
} from 'lucide-react';
import { MedicalShieldIllustration } from '../illustrations/MedicalIllustrations';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  category: 'Core' | 'Diagnostics' | 'Wellness' | 'Safety';
}

export const NAV_ITEMS: NavItem[] = [
  // 1. Core
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, category: 'Core' },
  { id: 'assistant', label: 'AI Health Assistant', icon: <Sparkles className="w-4 h-4" />, badge: 'AI', category: 'Core' },
  { id: 'problems', label: 'My Health Problems', icon: <AlertCircle className="w-4 h-4" />, badge: '2', category: 'Core' },
  { id: 'symptomChecker', label: 'Symptom Checker', icon: <Stethoscope className="w-4 h-4" />, category: 'Core' },
  { id: 'bodyMap', label: 'Interactive Body Map', icon: <Activity className="w-4 h-4" />, category: 'Core' },

  // 2. Diagnostics & Meds
  { id: 'reports', label: 'Medical Reports', icon: <FileText className="w-4 h-4" />, category: 'Diagnostics' },
  { id: 'analyzer', label: 'AI Report Analyzer', icon: <ScanLine className="w-4 h-4" />, badge: 'OCR', category: 'Diagnostics' },
  { id: 'medications', label: 'My Medications', icon: <Pill className="w-4 h-4" />, badge: 'Today', category: 'Diagnostics' },
  { id: 'timeline', label: 'Health Timeline', icon: <Clock className="w-4 h-4" />, category: 'Diagnostics' },

  // 3. Wellness & Analytics
  { id: 'analytics', label: 'Trends & Analytics', icon: <TrendingUp className="w-4 h-4" />, category: 'Wellness' },
  { id: 'journal', label: 'Daily Health Journal', icon: <BookOpen className="w-4 h-4" />, category: 'Wellness' },
  { id: 'appointments', label: 'Appointments & Prep', icon: <Calendar className="w-4 h-4" />, category: 'Wellness' },
  { id: 'wellness', label: 'Wellness Planner', icon: <Target className="w-4 h-4" />, category: 'Wellness' },

  // 4. Safety & Knowledge
  { id: 'education', label: 'Health Education', icon: <GraduationCap className="w-4 h-4" />, category: 'Safety' },
  { id: 'emergency', label: 'Emergency Info & SOS', icon: <ShieldAlert className="w-4 h-4 text-rose-500" />, badge: 'SOS', category: 'Safety' },
  { id: 'profile', label: 'Profile & Privacy', icon: <User className="w-4 h-4" />, category: 'Safety' },
];

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isMobileOpen,
  onCloseMobile,
}) => {
  const categories = ['Core', 'Diagnostics', 'Wellness', 'Safety'] as const;

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
        ></div>
      )}

      {/* Main Sidebar Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-sky-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <span className="font-extrabold text-lg tracking-wider">CV</span>
            </div>
            <div>
              <h1 className="font-black text-xl text-slate-900 dark:text-white tracking-tight leading-none">
                CareVista <span className="text-teal-600 dark:text-teal-400">AI</span>
              </h1>
              <span className="text-3xs font-semibold text-slate-400 tracking-wider uppercase block mt-1">
                Personal Health Copilot
              </span>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items (Categorized & Scrollable) */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
          {categories.map((cat) => {
            const items = NAV_ITEMS.filter((i) => i.category === cat);
            return (
              <div key={cat} className="space-y-1">
                <span className="text-3xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 block">
                  {cat}
                </span>
                {items.map((item) => {
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        onCloseMobile();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md shadow-teal-600/20'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-teal-500'}>
                          {item.icon}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-3xs font-bold px-2 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : item.badge === 'SOS'
                              ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                              : 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Footer Card: Security Status */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <div className="text-2xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">
                AES-256 Vault Active
              </span>
              <span className="text-slate-400">HIPAA Compliant Isolation</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

interface TopNavbarProps {
  onOpenMobileMenu: () => void;
  onSelectTab: (tabId: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  language: 'en' | 'te' | 'hi';
  onChangeLanguage: (l: 'en' | 'te' | 'hi') => void;
  userName: string;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onOpenMobileMenu,
  onSelectTab,
  isDarkMode,
  onToggleDarkMode,
  language,
  onChangeLanguage,
  userName,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Mobile Toggle & Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <span className="text-xs text-slate-400 font-medium">Platform Status</span>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>All AI Health Services Operational</span>
          </div>
        </div>
      </div>

      {/* Right Controls: Language, Dark Mode, Emergency SOS, Profile */}
      <div className="flex items-center gap-2.5">
        {/* Language selector */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 text-xs font-bold">
          <Globe className="w-3.5 h-3.5 text-slate-400 mx-1.5" />
          {(['en', 'te', 'hi'] as const).map((l) => (
            <button
              key={l}
              onClick={() => onChangeLanguage(l)}
              className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                language === l
                  ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-2xs'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {l === 'en' ? 'EN' : l === 'te' ? 'తె' : 'हिं'}
            </button>
          ))}
        </div>

        {/* Dark Mode Button */}
        <button
          onClick={onToggleDarkMode}
          title="Toggle Dark Mode"
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* SOS Emergency Quick Button */}
        <button
          onClick={() => onSelectTab('emergency')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-700 dark:text-rose-300 font-bold text-xs border border-rose-200 dark:border-rose-900 transition-all cursor-pointer shadow-xs"
        >
          <PhoneCall className="w-3.5 h-3.5 animate-pulse text-rose-600" />
          <span className="hidden sm:inline">SOS Emergency</span>
        </button>

        {/* User Avatar */}
        <button
          onClick={() => onSelectTab('profile')}
          className="flex items-center gap-2 pl-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            {userName.charAt(0)}
          </div>
        </button>
      </div>
    </header>
  );
};
