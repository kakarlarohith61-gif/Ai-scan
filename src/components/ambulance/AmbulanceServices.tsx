import React, { useState } from 'react';
import {
  ShieldAlert,
  PhoneCall,
  Clock,
  Radio,
  Hospital,
  AlertTriangle,
  Heart,
  Wind,
  Activity,
  CheckCircle2,
  Navigation,
  Sparkles,
  MapPin,
  Flame,
  ArrowRight,
  Info,
  Car,
  Plane,
} from 'lucide-react';
import { AMBULANCE_FLEET, NEARBY_HOSPITALS, EMERGENCY_REASONS } from '../../data/ambulanceData';
import { AmbulanceCategory, ActiveAmbulanceBooking } from '../../types/ambulance';
import { UserProfile } from '../../types/health';
import { AmbulanceVehicleAnimation } from './AmbulanceVehicleAnimation';
import { AmbulanceLiveTracker } from './AmbulanceLiveTracker';
import { CPRMetronome } from './CPRMetronome';

interface Props {
  profile: UserProfile;
  activeBooking: ActiveAmbulanceBooking | null;
  onOpenDispatchModal: (type?: AmbulanceCategory) => void;
  onCancelBooking: () => void;
}

export const AmbulanceServices: React.FC<Props> = ({
  profile,
  activeBooking,
  onOpenDispatchModal,
  onCancelBooking,
}) => {
  const [selectedFleetTab, setSelectedFleetTab] = useState<'all' | 'ground' | 'air'>('all');
  const [vehicleAnimationSpeed, setVehicleAnimationSpeed] = useState<'normal' | 'fast' | 'urgent'>('urgent');

  const filteredFleet = AMBULANCE_FLEET.filter((f) => {
    if (selectedFleetTab === 'ground') return f.id !== 'air';
    if (selectedFleetTab === 'air') return f.id === 'air';
    return true;
  });

  return (
    <div className="w-full space-y-8 animate-fade-in pb-12">
      {/* Top Emergency Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-700 via-rose-800 to-slate-900 text-white p-6 lg:p-8 shadow-2xl shadow-rose-900/30">
        {/* Ambient siren glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-white/20 backdrop-blur-md text-rose-100 border border-white/20">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping"></span>
              <span>CareVista Rapid Ambulance Dispatch Network • 24/7 Priority SOS</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-black tracking-tight">
              Emergency Ambulance Dispatch & Live Radar Tracking
            </h1>

            <p className="text-sm lg:text-base text-rose-100/90 leading-relaxed">
              Instant one-tap dispatch for Basic Life Support (BLS), Advanced Cardiac Support (ALS), Mobile ICU, and Aeromedical Air Ambulances with real-time GPS telemetry and hospital ER pre-notification.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenDispatchModal('als')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-rose-700 hover:bg-rose-50 font-black text-sm shadow-xl transition-all cursor-pointer animate-siren-beacon"
              >
                <ShieldAlert className="w-5 h-5 text-rose-600 animate-pulse" />
                <span>Dispatch Ambulance Now</span>
              </button>

              <a
                href="tel:911"
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-rose-950/80 hover:bg-rose-950 text-white font-bold text-sm border border-rose-400/40 transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-rose-300" />
                <span>Call Emergency (911 / 108 / 112)</span>
              </a>
            </div>
          </div>

          {/* Real-time Fleet Readiness Badge Cluster */}
          <div className="grid grid-cols-2 gap-3 shrink-0 self-start lg:self-auto">
            <div className="p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="text-3xs text-rose-200 uppercase font-extrabold tracking-wider">
                Fleet Within 5km
              </div>
              <div className="text-2xl font-black font-mono text-white mt-1">18 Units</div>
              <span className="text-3xs text-emerald-300 font-semibold flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Active on road
              </span>
            </div>

            <div className="p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="text-3xs text-rose-200 uppercase font-extrabold tracking-wider">
                Avg Response Time
              </div>
              <div className="text-2xl font-black font-mono text-white mt-1">5.2 mins</div>
              <span className="text-3xs text-amber-200 font-semibold mt-0.5 block">
                Green signal priority
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Booking Tracker (If booking exists) */}
      {activeBooking && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Radio className="w-5 h-5 text-rose-600 animate-pulse" />
              <span>Active SOS Dispatch Mission</span>
            </h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
              Live Satellite Sync
            </span>
          </div>

          <AmbulanceLiveTracker
            booking={activeBooking}
            onCancelBooking={onCancelBooking}
          />
        </div>
      )}

      {/* Animated Ambulance Showcase Module */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Dynamic Emergency Fleet Vehicles</span>
              <span className="text-2xs font-extrabold text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full">
                Interactive Simulation
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              High-visibility emergency vehicle equipped with automated telemetry, dual sirens, and ventilator arrays.
            </p>
          </div>
        </div>

        {/* The Animated Vehicle Component */}
        <AmbulanceVehicleAnimation
          variant="road"
          speed={vehicleAnimationSpeed}
          isEmergencyActive={true}
          interactive={true}
          showRoad={true}
        />
      </div>

      {/* Fleet Catalog & Specifications */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Specialized Ambulance Fleet Options
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select the appropriate level of pre-hospital clinical intervention for your medical situation.
            </p>
          </div>

          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 text-xs font-bold">
            <button
              onClick={() => setSelectedFleetTab('all')}
              className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                selectedFleetTab === 'all'
                  ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              All Units ({AMBULANCE_FLEET.length})
            </button>
            <button
              onClick={() => setSelectedFleetTab('ground')}
              className={`px-3 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                selectedFleetTab === 'ground'
                  ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Ground Rapid (4)</span>
            </button>
            <button
              onClick={() => setSelectedFleetTab('air')}
              className={`px-3 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                selectedFleetTab === 'air'
                  ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>Air Chopper (1)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFleet.map((fleet) => (
            <div
              key={fleet.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none flex flex-col justify-between hover:border-rose-400/50 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-3xs font-extrabold px-3 py-1 rounded-full ${fleet.badgeColor}`}>
                    {fleet.badge}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>ETA {fleet.eta}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                    {fleet.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {fleet.tagline}
                  </p>
                </div>

                {/* Best For Tag */}
                <div className="p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 text-2xs">
                  <span className="font-extrabold text-rose-700 dark:text-rose-300 block uppercase tracking-wider mb-0.5">
                    Recommended For
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {fleet.bestFor}
                  </span>
                </div>

                {/* Equipment Checklist */}
                <div>
                  <span className="text-3xs font-extrabold uppercase tracking-widest text-slate-400 block mb-2">
                    Onboard Clinical Equipment
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {fleet.equipment.slice(0, 4).map((eq, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{eq}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Crew Details */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-2xs text-slate-500">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Certified Crew Onboard:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {fleet.crew.map((member, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-3xs text-slate-400 uppercase font-bold block">
                    Available Units
                  </span>
                  <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
                    {fleet.availableCount} Ready in Area
                  </span>
                </div>

                <button
                  onClick={() => onOpenDispatchModal(fleet.id)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/30 transition-all cursor-pointer"
                >
                  <span>Book {fleet.id === 'air' ? 'Chopper' : 'Unit'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CPR Metronome & First Aid Section */}
      <CPRMetronome />

      {/* Nearby Hospital Emergency Rooms Directory */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Hospital className="w-5 h-5 text-teal-600" />
              <span>Receiving Emergency Trauma Hospitals</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pre-alerted emergency departments with active telemetry handoff capabilities.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {NEARBY_HOSPITALS.map((hosp) => (
            <div
              key={hosp.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-2xs mb-1">
                  <span className="px-2 py-0.5 rounded-full font-bold bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
                    {hosp.traumaLevel}
                  </span>
                  <span className="font-mono font-bold text-slate-400">
                    {hosp.distanceKm} km ({hosp.driveMins} mins)
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {hosp.name}
                </h4>
                <div className="text-3xs text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{hosp.address}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-2xs">
                  <span className="text-slate-400">ER Trauma Beds:</span>
                  <span className="font-bold text-emerald-600">{hosp.emergencyBeds} open</span>
                </div>
                <div className="flex items-center justify-between text-2xs">
                  <span className="text-slate-400">ICU Capacity:</span>
                  <span className="font-bold text-teal-600">{hosp.icuBeds} open</span>
                </div>

                <a
                  href={`tel:${hosp.phone}`}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-2xs transition-all cursor-pointer"
                >
                  <PhoneCall className="w-3 h-3 text-rose-600" />
                  <span>Call Hospital ER</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
