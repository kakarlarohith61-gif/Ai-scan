export type AmbulanceCategory = 'bls' | 'als' | 'icu' | 'pediatric' | 'air';

export type TriageCode = 'Code Red' | 'Code Amber' | 'Code Yellow';

export type DispatchStatus =
  | 'idle'
  | 'verifying'
  | 'locating'
  | 'dispatched'
  | 'en_route'
  | 'arriving'
  | 'arrived';

export interface AmbulanceFleetOption {
  id: AmbulanceCategory;
  name: string;
  tagline: string;
  eta: string;
  approxMinutes: number;
  equipment: string[];
  crew: string[];
  bestFor: string;
  badge: string;
  badgeColor: string;
  availableCount: number;
  accentColor: string;
}

export interface NearbyHospital {
  id: string;
  name: string;
  distanceKm: number;
  driveMins: number;
  traumaLevel: 'Level 1 Trauma' | 'Level 2 Trauma' | 'Cardiac Center' | 'Multi-Specialty';
  emergencyBeds: number;
  icuBeds: number;
  rating: number;
  phone: string;
  address: string;
}

export interface ActiveAmbulanceBooking {
  id: string;
  patientName: string;
  patientPhone: string;
  pickupAddress: string;
  coordinates: { lat: number; lng: number };
  emergencyReason: string;
  triageCode: TriageCode;
  ambulanceType: AmbulanceCategory;
  ambulanceName: string;
  hospitalDestination: string;
  status: DispatchStatus;
  driverName: string;
  driverPhone: string;
  driverRating: number;
  paramedicDoctor: string;
  vehicleNumber: string;
  etaMinutes: number;
  distanceKm: number;
  speedKmH: number;
  vitalVesselSpo2: number;
  vitalVesselPulse: number;
  bookedAt: string;
  notes?: string;
  shareToken: string;
}
