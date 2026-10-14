import React, { useState } from 'react';
import { UserProfile } from '../../types/health';
import {
  User,
  Shield,
  Lock,
  Globe,
  Moon,
  Sun,
  Download,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Save,
} from 'lucide-react';
import { MedicalShieldIllustration } from '../illustrations/MedicalIllustrations';

interface Props {
  profile: UserProfile;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onUpdateProfile: (updated: UserProfile) => void;
  onExportAllData: () => void;
  onResetAllData: () => void;
}

export const ProfileSettings: React.FC<Props> = ({
  profile,
  isDarkMode,
  onToggleDarkMode,
  onUpdateProfile,
  onExportAllData,
  onResetAllData,
}) => {
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age);
  const [sex, setSex] = useState(profile.sex);
  const [bloodGroup, setBloodGroup] = useState(profile.bloodGroup);
  const [heightCm, setHeightCm] = useState(profile.heightCm);
  const [weightKg, setWeightKg] = useState(profile.weightKg);
  const [preferredLanguage, setPreferredLanguage] = useState(profile.preferredLanguage);
  const [aiConsentGranted, setAiConsentGranted] = useState(profile.aiConsentGranted);
  const [isSaved, setIsSaved] = useState(false);

  const bmi = (weightKg / Math.pow(heightCm / 100, 2)).toFixed(1);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...profile,
      name,
      age,
      sex,
      bloodGroup,
      heightCm,
      weightKg,
      preferredLanguage,
      aiConsentGranted,
    };
    onUpdateProfile(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-sm font-semibold uppercase tracking-wider">
            <User className="w-4 h-4" />
            <span>Account Security & Biometric Preferences</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Profile & Privacy Governance
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Manage personal health demographics, patient consent, encryption settings, and data export.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-all shadow-md shadow-teal-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{isSaved ? 'Changes Saved!' : 'Save Settings'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Demographics Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-5">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            Personal Health Demographics
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Biological Sex
              </label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value as any)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100 cursor-pointer"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100 cursor-pointer font-bold font-mono"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Calculated BMI
              </label>
              <div className="px-3.5 py-2.5 text-sm rounded-xl bg-teal-50 dark:bg-teal-950/60 font-mono font-bold text-teal-700 dark:text-teal-300">
                {bmi} kg/m²
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.5"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          {/* Theme & Language */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-slate-900 dark:text-white block">
                  Interface Appearance
                </span>
                <span className="text-xs text-slate-400">
                  Toggle between soft clinical light mode and sleek dark mode.
                </span>
              </div>
              <button
                type="button"
                onClick={onToggleDarkMode}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer hover:bg-slate-200"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-slate-900 dark:text-white block">
                  Preferred Healthcare Language
                </span>
                <span className="text-xs text-slate-400">
                  CareVista AI adapts terminology, summaries, and speech.
                </span>
              </div>
              <select
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border-none outline-none cursor-pointer"
              >
                <option value="en">English (US)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="hi">हिंदी (Hindi)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right: Privacy, Security & Data Export */}
        <div className="lg:col-span-5 space-y-6">
          {/* Privacy Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-teal-100 dark:bg-teal-900/60 text-teal-600 dark:text-teal-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Data Privacy & Encryption
                </h3>
                <span className="text-2xs text-emerald-600 font-bold">
                  AES-256 Encrypted & RLS Isolated
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                <Lock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Zero Model Training:</strong> Your medical documents and health journals are NEVER used for AI foundation training.
                </span>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                <FileCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Row-Level Security (RLS):</strong> Health data is quarantined strictly to your authenticated session.
                </span>
              </div>
            </div>

            {/* AI Consent Toggle */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-slate-900 dark:text-white block">
                  AI Context Consent
                </span>
                <span className="text-2xs text-slate-400">
                  Authorize copilot to review lab reports
                </span>
              </div>
              <input
                type="checkbox"
                checked={aiConsentGranted}
                onChange={(e) => setAiConsentGranted(e.target.checked)}
                className="w-4 h-4 accent-teal-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Export & Reset Actions */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Data Portability & Management
            </h4>

            <div className="space-y-2">
              <button
                type="button"
                onClick={onExportAllData}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 text-teal-700 dark:text-teal-300 font-bold text-xs transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export Complete Health Dossier (.JSON)</span>
              </button>

              <button
                type="button"
                onClick={onResetAllData}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 text-rose-700 dark:text-rose-300 font-bold text-xs transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Reset All Health Records</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
