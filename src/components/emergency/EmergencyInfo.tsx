import React from 'react';
import { UserProfile } from '../../types/health';
import {
  PhoneCall,
  AlertTriangle,
  ShieldAlert,
  Heart,
  Activity,
  Hospital,
  MapPin,
  ExternalLink,
  Info,
} from 'lucide-react';
import { MedicalShieldIllustration } from '../illustrations/MedicalIllustrations';

interface Props {
  profile: UserProfile;
}

export const EmergencyInfo: React.FC<Props> = ({ profile }) => {
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-sm font-semibold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 animate-bounce" />
            <span>In Case of Emergency (ICE) Critical Card</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Emergency Information & Hotline SOS
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Critical medical details, first responder information, and emergency triage protocols.
          </p>
        </div>

        {/* Big Emergency Call Button */}
        <a
          href="tel:911"
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition-all shadow-lg shadow-rose-600/30 cursor-pointer self-start sm:self-auto"
        >
          <PhoneCall className="w-5 h-5 animate-pulse" />
          <span>Call Emergency (911 / 112 / 108)</span>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: ICE Critical Medical Badge */}
        <div className="lg:col-span-5 bg-gradient-to-br from-rose-600 via-rose-700 to-rose-900 text-white rounded-3xl p-6 lg:p-8 shadow-xl shadow-rose-600/20 space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MedicalShieldIllustration size={44} />
              <div>
                <span className="text-2xs font-bold uppercase tracking-wider text-rose-200">
                  Paramedic / First Responder Data
                </span>
                <h3 className="text-2xl font-black">{profile.name}</h3>
              </div>
            </div>

            <div className="text-right">
              <span className="text-3xs uppercase tracking-wider text-rose-200 block">
                Blood Group
              </span>
              <span className="text-3xl font-black font-mono">{profile.bloodGroup}</span>
            </div>
          </div>

          {/* Critical Vitals Grid */}
          <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white/10 backdrop-blur-md text-xs">
            <div>
              <span className="text-3xs text-rose-200 block uppercase">Age / Sex</span>
              <span className="font-bold">{profile.age} yrs / {profile.sex}</span>
            </div>
            <div>
              <span className="text-3xs text-rose-200 block uppercase">Height</span>
              <span className="font-bold">{profile.heightCm} cm</span>
            </div>
            <div>
              <span className="text-3xs text-rose-200 block uppercase">Weight</span>
              <span className="font-bold">{profile.weightKg} kg</span>
            </div>
          </div>

          {/* Severe Allergies */}
          <div>
            <span className="text-3xs font-bold text-rose-200 uppercase tracking-wider block mb-1">
              ⚠️ Severe Known Allergies
            </span>
            <div className="flex flex-wrap gap-1.5">
              {profile.allergies.map((all, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white text-rose-800 shadow-xs"
                >
                  {all}
                </span>
              ))}
            </div>
          </div>

          {/* Chronic Conditions */}
          <div>
            <span className="text-3xs font-bold text-rose-200 uppercase tracking-wider block mb-1">
              Active Medical Conditions
            </span>
            <div className="flex flex-wrap gap-1.5">
              {profile.chronicConditions.map((cond, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-800/80 text-rose-100 border border-rose-500/50"
                >
                  {cond}
                </span>
              ))}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="pt-3 border-t border-rose-500/50 flex items-center justify-between">
            <div>
              <span className="text-3xs text-rose-200 block uppercase">Primary ICE Contact</span>
              <span className="font-bold text-sm">
                {profile.emergencyContact.name} ({profile.emergencyContact.relationship})
              </span>
              <div className="text-xs font-mono text-rose-100 mt-0.5">
                {profile.emergencyContact.phone}
              </div>
            </div>

            <a
              href={`tel:${profile.emergencyContact.phone}`}
              className="p-3 rounded-2xl bg-white text-rose-700 hover:bg-rose-50 font-bold transition-all shadow-md"
            >
              <PhoneCall className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right: Emergency Triage Guidelines & Hotlines */}
        <div className="lg:col-span-7 space-y-6">
          {/* Stroke FAST Protocol */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-4">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Stroke Recognition — FAST Clinical Protocol</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-center">
                <span className="text-xl font-black text-rose-600 block">F</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white block mt-0.5">Face Drooping</span>
                <span className="text-3xs text-slate-500">Ask them to smile</span>
              </div>
              <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-center">
                <span className="text-xl font-black text-rose-600 block">A</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white block mt-0.5">Arm Weakness</span>
                <span className="text-3xs text-slate-500">Raise both arms</span>
              </div>
              <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-center">
                <span className="text-xl font-black text-rose-600 block">S</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white block mt-0.5">Speech Slur</span>
                <span className="text-3xs text-slate-500">Repeat simple phrase</span>
              </div>
              <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-center">
                <span className="text-xl font-black text-rose-600 block">T</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white block mt-0.5">Time to Call</span>
                <span className="text-3xs text-slate-500">Dial 911 / 112 immediately</span>
              </div>
            </div>
          </div>

          {/* Regional Emergency Directory */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Emergency Hotlines Directory
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Emergency Services (USA/Global)</div>
                  <div className="text-2xs text-slate-400">Police, Fire, Paramedics</div>
                </div>
                <span className="font-mono font-bold text-rose-600 text-sm">911 / 112</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">National Ambulance (India)</div>
                  <div className="text-2xs text-slate-400">Medical emergency dispatch</div>
                </div>
                <span className="font-mono font-bold text-teal-600 text-sm">108</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Poison Control Center</div>
                  <div className="text-2xs text-slate-400">24/7 toxic exposure guidance</div>
                </div>
                <span className="font-mono font-bold text-indigo-600 text-sm">1-800-222-1222</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Suicide & Crisis Lifeline</div>
                  <div className="text-2xs text-slate-400">Emotional support hotline</div>
                </div>
                <span className="font-mono font-bold text-purple-600 text-sm">988</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
