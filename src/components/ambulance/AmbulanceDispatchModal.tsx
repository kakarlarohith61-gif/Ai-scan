import React, { useState } from 'react';
import {
  X,
  PhoneCall,
  MapPin,
  ShieldAlert,
  AlertTriangle,
  Radio,
  CheckCircle2,
  Sparkles,
  Navigation,
  Activity,
  Heart,
  Wind,
  Baby,
  Clock,
  Zap,
} from 'lucide-react';
import { AMBULANCE_FLEET, EMERGENCY_REASONS, NEARBY_HOSPITALS } from '../../data/ambulanceData';
import { AmbulanceCategory, ActiveAmbulanceBooking, TriageCode } from '../../types/ambulance';
import { UserProfile } from '../../types/health';
import { AmbulanceVehicleAnimation } from './AmbulanceVehicleAnimation';
import { AmbulanceLiveTracker } from './AmbulanceLiveTracker';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  initialType?: AmbulanceCategory;
  activeBooking?: ActiveAmbulanceBooking | null;
  onBookingCreated: (booking: ActiveAmbulanceBooking) => void;
  onCancelBooking: () => void;
}

export const AmbulanceDispatchModal: React.FC<Props> = ({
  isOpen,
  onClose,
  profile,
  initialType = 'als',
  activeBooking,
  onBookingCreated,
  onCancelBooking,
}) => {
  const [selectedFleetId, setSelectedFleetId] = useState<AmbulanceCategory>(initialType);
  const [selectedReasonId, setSelectedReasonId] = useState(EMERGENCY_REASONS[0].id);
  const [selectedHospitalId, setSelectedHospitalId] = useState(NEARBY_HOSPITALS[0].id);
  const [pickupAddress, setPickupAddress] = useState('742 Evergreen Terrace, Sector 4, Metro Central');
  const [contactNumber, setContactNumber] = useState(profile.emergencyContact.phone);
  const [patientNotes, setPatientNotes] = useState('');
  const [notifyICEContacts, setNotifyICEContacts] = useState(true);
  const [isLocating, setIsLocating] = useState(false);
  const [isDispatching, setIsDispatching] = useState(false);

  if (!isOpen) return null;

  const selectedFleet = AMBULANCE_FLEET.find((f) => f.id === selectedFleetId) || AMBULANCE_FLEET[0];
  const selectedReason = EMERGENCY_REASONS.find((r) => r.id === selectedReasonId) || EMERGENCY_REASONS[0];
  const selectedHospital = NEARBY_HOSPITALS.find((h) => h.id === selectedHospitalId) || NEARBY_HOSPITALS[0];

  const handleUseCurrentGPS = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLocating(false);
          setPickupAddress(`GPS Lat ${pos.coords.latitude.toFixed(4)}, Lng ${pos.coords.longitude.toFixed(4)} • Near Metro Park`);
        },
        () => {
          setIsLocating(false);
          setPickupAddress('Current GPS: Sector 9 Medical Enclave, City Central');
        },
        { timeout: 4000 }
      );
    } else {
      setTimeout(() => {
        setIsLocating(false);
        setPickupAddress('Current GPS: Sector 9 Medical Enclave, City Central');
      }, 700);
    }
  };

  const handleConfirmDispatch = () => {
    setIsDispatching(true);

    setTimeout(() => {
      const newBooking: ActiveAmbulanceBooking = {
        id: `amb-${Date.now()}`,
        patientName: profile.name,
        patientPhone: contactNumber,
        pickupAddress,
        coordinates: { lat: 37.7749, lng: -122.4194 },
        emergencyReason: selectedReason.label,
        triageCode: selectedReason.triage,
        ambulanceType: selectedFleet.id,
        ambulanceName: selectedFleet.name,
        hospitalDestination: selectedHospital.name,
        status: 'en_route',
        driverName: 'Rajesh Kumar',
        driverPhone: '+1 (800) 108-9111',
        driverRating: 4.98,
        paramedicDoctor: 'Dr. Aryan Sharma (EMT-P)',
        vehicleNumber: selectedFleet.id === 'air' ? 'MEDEVAC-1' : 'AMB-108-CRITICAL',
        etaMinutes: selectedFleet.approxMinutes,
        distanceKm: 2.1,
        speedKmH: 74,
        vitalVesselSpo2: 98,
        vitalVesselPulse: 82,
        bookedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        notes: patientNotes,
        shareToken: Math.random().toString(36).substring(2, 9),
      };

      setIsDispatching(false);
      onBookingCreated(newBooking);

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#38bdf8', '#ffffff'],
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 flex items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-rose-600 via-rose-700 to-rose-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md animate-pulse">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xs font-extrabold uppercase tracking-widest text-rose-200">
                  CareVista Emergency Hotline 108 / 911 / 112
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black">
                {activeBooking ? 'Live Ambulance SOS Dispatch' : 'Instant Emergency Ambulance Dispatch'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-rose-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Active Booking Mode */}
          {activeBooking ? (
            <div className="space-y-6">
              <AmbulanceVehicleAnimation
                variant={activeBooking.ambulanceType === 'air' ? 'air' : 'road'}
                speed="urgent"
                isEmergencyActive={true}
                interactive={true}
              />
              <AmbulanceLiveTracker
                booking={activeBooking}
                onCancelBooking={onCancelBooking}
              />
            </div>
          ) : (
            <>
              {/* Animated Vehicle Banner */}
              <AmbulanceVehicleAnimation
                variant={selectedFleetId === 'air' ? 'air' : 'road'}
                speed="urgent"
                isEmergencyActive={true}
                interactive={true}
              />

              {/* Step 1: Emergency Triage / Condition Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                    Step 1: Select Emergency Condition
                  </span>
                  <span className="text-2xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded-full">
                    {selectedReason.triage}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {EMERGENCY_REASONS.map((reason) => {
                    const isSelected = selectedReasonId === reason.id;
                    return (
                      <button
                        key={reason.id}
                        type="button"
                        onClick={() => setSelectedReasonId(reason.id)}
                        className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-rose-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                            {reason.id === 'chest_pain' && <Heart className="w-3.5 h-3.5" />}
                            {reason.id === 'difficulty_breathing' && <Wind className="w-3.5 h-3.5" />}
                            {reason.id === 'stroke' && <Activity className="w-3.5 h-3.5" />}
                            {reason.id === 'unconscious' && <AlertTriangle className="w-3.5 h-3.5" />}
                            {reason.id === 'trauma' && <ShieldAlert className="w-3.5 h-3.5" />}
                            {reason.id === 'maternity' && <Baby className="w-3.5 h-3.5" />}
                            {reason.id === 'seizure' && <Zap className="w-3.5 h-3.5" />}
                            {reason.id === 'scheduled' && <Clock className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-800 dark:text-slate-100">
                              {reason.label}
                            </div>
                          </div>
                        </div>

                        <span
                          className={`text-3xs font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                            reason.triage === 'Code Red'
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
                          }`}
                        >
                          {reason.triage}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Choose Fleet Type */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-teal-500" />
                  Step 2: Choose Ambulance Tier & Crew
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {AMBULANCE_FLEET.map((fleet) => {
                    const isSelected = selectedFleetId === fleet.id;
                    return (
                      <button
                        key={fleet.id}
                        type="button"
                        onClick={() => setSelectedFleetId(fleet.id)}
                        className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 shadow-md ring-2 ring-teal-500/20'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <span className={`text-3xs font-bold px-2 py-0.5 rounded-full ${fleet.badgeColor}`}>
                            {fleet.badge}
                          </span>
                          <h4 className="font-black text-xs text-slate-900 dark:text-white mt-1.5">
                            {fleet.name.split('(')[0]}
                          </h4>
                          <span className="text-3xs text-slate-400 block line-clamp-2 mt-0.5">
                            {fleet.tagline}
                          </span>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-2xs">
                          <span className="font-bold text-rose-600 dark:text-rose-400">
                            ETA {fleet.eta}
                          </span>
                          <span className="text-3xs text-slate-400 font-mono">
                            {fleet.availableCount} near
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Location & Hospital Destination */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pickup Address */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-2xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      Pickup Address
                    </label>
                    <button
                      type="button"
                      onClick={handleUseCurrentGPS}
                      disabled={isLocating}
                      className="text-3xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Radio className={`w-3 h-3 ${isLocating ? 'animate-spin' : ''}`} />
                      <span>{isLocating ? 'Detecting GPS...' : 'Auto-Detect GPS'}</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter patient exact address, floor, landmark"
                  />
                  <div className="flex items-center gap-2 text-2xs text-slate-500">
                    <span>Contact:</span>
                    <input
                      type="text"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-2xs font-mono font-bold"
                    />
                  </div>
                </div>

                {/* Receiving Hospital */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <label className="text-2xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Radio className="w-3.5 h-3.5 text-sky-500" />
                    Destination Hospital ER
                  </label>
                  <select
                    value={selectedHospitalId}
                    onChange={(e) => setSelectedHospitalId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {NEARBY_HOSPITALS.map((hosp) => (
                      <option key={hosp.id} value={hosp.id}>
                        {hosp.name} ({hosp.distanceKm} km • {hosp.traumaLevel})
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center gap-2 text-2xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    <Sparkles className="w-3 h-3" />
                    <span>{selectedHospital.emergencyBeds} ER Trauma Beds • {selectedHospital.icuBeds} ICU Available</span>
                  </div>
                </div>
              </div>

              {/* ICE Contact Auto-Alert Toggle */}
              <div className="p-3.5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    id="notifyICE"
                    checked={notifyICEContacts}
                    onChange={(e) => setNotifyICEContacts(e.target.checked)}
                    className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 cursor-pointer"
                  />
                  <label htmlFor="notifyICE" className="text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
                    Auto-SMS Live Tracking link to Primary ICE Contact ({profile.emergencyContact.name}: {profile.emergencyContact.phone})
                  </label>
                </div>
                <span className="text-3xs font-bold text-rose-600 uppercase font-mono">
                  Recommended
                </span>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>All Emergency hotlines (911/112/108) monitored 24/7 with zero call waiting</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:911"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-rose-600" />
              <span>Direct Dial 911 / 108</span>
            </a>

            {!activeBooking && (
              <button
                onClick={handleConfirmDispatch}
                disabled={isDispatching}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-extrabold text-xs shadow-xl shadow-rose-600/30 transition-all cursor-pointer animate-siren-beacon"
              >
                <ShieldAlert className="w-4 h-4 animate-bounce" />
                <span>{isDispatching ? 'Dispatched! Connecting...' : `Dispatch ${selectedFleet.name.split('(')[0]} (ETA ${selectedFleet.eta})`}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
