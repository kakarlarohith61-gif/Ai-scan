export type SeverityLevel = 'Mild' | 'Moderate' | 'Severe';

export type ProblemStatus = 'Active' | 'Improving' | 'Resolved';

export type BodyRegion =
  | 'head'
  | 'neck'
  | 'chest'
  | 'abdomen'
  | 'back'
  | 'arms'
  | 'hands'
  | 'pelvis'
  | 'legs'
  | 'feet';

export interface HealthProblem {
  id: string;
  name: string;
  category: 'General' | 'Respiratory' | 'Digestive' | 'Skin' | 'Musculoskeletal' | 'Neurological' | 'Cardiovascular' | 'ENT';
  affectedBodyPart: BodyRegion;
  symptoms: string[];
  severity: number; // 1-10
  severityLevel: SeverityLevel;
  startDate: string;
  frequency: 'Occasional' | 'Daily' | 'Continuous';
  description: string;
  photoUrl?: string;
  existingDiagnosis?: string;
  currentMedication?: string;
  relatedReportIds?: string[];
  status: ProblemStatus;
  additionalNotes?: string;
  dailyProgress: { date: string; severity: number; note: string }[];
  aiGuidance?: {
    understanding: string;
    selfCare: string[];
    possibleCauses: string[];
    warningSigns: string[];
    doctorQuestions: string[];
  };
}

export type ReportType =
  | 'Blood Test'
  | 'Lipid Profile'
  | 'Complete Blood Count'
  | 'Comprehensive Metabolic'
  | 'Thyroid Panel'
  | 'Urinalysis'
  | 'Radiology X-Ray'
  | 'ECG / EKG'
  | 'MRI / CT Scan';

export type ResultFlag = 'Optimal' | 'Normal' | 'Borderline' | 'Low' | 'High' | 'Critical';

export interface BiomarkerMeasurement {
  id: string;
  parameter: string;
  value: number | string;
  unit: string;
  referenceRange: string;
  flag: ResultFlag;
  explanation: string;
  previousValue?: number | string;
}

export interface MedicalReport {
  id: string;
  reportCode: string; // e.g. REP-2026-881
  name: string;
  type: ReportType;
  testDate: string;
  uploadDate: string;
  hospital: string;
  doctorName?: string;
  fileSize: string;
  fileType: 'PDF' | 'PNG' | 'JPG' | 'WEBP';
  measurements: BiomarkerMeasurement[];
  aiSummary: string;
  relatedCondition?: string;
  userNotes?: string;
  verificationStatus: 'Verified' | 'Pending Review';
  doctorQuestions: string[];
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  instructions: string; // e.g. "Take after breakfast with water"
  frequency: 'Once Daily' | 'Twice Daily' | 'Three Times Daily' | 'As Needed';
  scheduleTimes: string[]; // e.g. ["08:00 AM", "08:00 PM"]
  startDate: string;
  endDate?: string;
  remainingPills: number;
  totalPills: number;
  prescribedBy: string;
  statusToday: 'taken' | 'skipped' | 'missed' | 'pending';
  history: { date: string; status: 'taken' | 'skipped' | 'missed' }[];
  aiInteractionNote?: string;
}

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  clinic: string;
  dateTime: string;
  purpose: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  doctorQuestions: { id: string; text: string; answered: boolean }[];
  visitNotes?: string;
  reminderSet: boolean;
}

export interface JournalEntry {
  id: string;
  date: string;
  mood: 'Energized' | 'Good' | 'Neutral' | 'Low' | 'Exhausted' | 'Anxious';
  moodRating: number; // 1-5
  waterGlasses: number; // target e.g. 8
  sleepHours: number;
  sleepQuality: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  exerciseMinutes: number;
  exerciseType: string;
  symptomsLogged: string[];
  notes: string;
}

export interface VitalsSnapshot {
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  heartRate: number; // bpm
  bloodGlucose: number; // mg/dL
  spo2: number; // percentage
  weight: number; // kg
  bmi: number;
  lastUpdated: string;
}

export interface HealthGoal {
  id: string;
  title: string;
  category: 'Hydration' | 'Activity' | 'Sleep' | 'Nutrition' | 'Medication' | 'Mindfulness';
  target: number;
  current: number;
  unit: string;
  deadline?: string;
  aiTip: string;
}

export interface TimelineItem {
  id: string;
  date: string;
  time: string;
  type: 'problem' | 'report' | 'appointment' | 'medication' | 'journal' | 'vitals';
  title: string;
  subtitle: string;
  badgeText: string;
  badgeColor: string;
  details?: string;
  referenceId?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  language?: 'en' | 'te' | 'hi';
  isEmergencyAlert?: boolean;
  attachedReportId?: string;
  suggestedQuestions?: string[];
  doctorChecklistItems?: string[];
}

export interface UserProfile {
  name: string;
  age: number;
  dateOfBirth: string;
  sex: 'Female' | 'Male' | 'Other';
  bloodGroup: string;
  heightCm: number;
  weightKg: number;
  allergies: string[];
  chronicConditions: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  preferredLanguage: 'en' | 'te' | 'hi';
  notificationsEnabled: boolean;
  aiConsentGranted: boolean;
  biometricLockEnabled: boolean;
}
