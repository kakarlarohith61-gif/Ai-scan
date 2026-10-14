# CareVista AI — Personal Health Copilot
> **"Your Health. Your Journey. Your AI Companion."**

CareVista AI is a modern, intelligent, and production-oriented **AI-Powered Personal Health Copilot** designed to help individuals understand, organize, monitor, and manage their personal healthcare journey.

---

## 🌟 Architecture & Features

### 1. Smart Health Dashboard (`/dashboard`)
- **Personalized Patient Greeting** with animated medical illustrations (Heartbeat, Lungs, Brain).
- **Daily Biometric Overview**: Blood Pressure (118/76 mmHg), Heart Rate (72 bpm), SpO2 (99%), Fasting Glucose (94 mg/dL).
- **Active Concerns Widget**: Direct link to symptom severity tracking and recovery graphs.
- **Medication Reminders**: One-click "Mark Taken" button with celebratory micro-confetti.
- **Doctor Consultation Card**: Upcoming appointment countdown and checklist preview.
- **Recent AI Insights Banner**: Synthesized health observations based on latest labs and journal entries.

### 2. Conversational AI Health Assistant (`/assistant`)
- **Multilingual Healthcare Support**: Instant toggling between **English**, **Telugu (తెలుగు)**, and **Hindi (हिंदी)**.
- **Voice Interactions**:
  - **Speech-to-Text**: Dictate questions using the browser Web Speech Recognition API (`webkitSpeechRecognition`).
  - **Text-to-Speech**: Listen to audio readouts of AI guidance using the SpeechSynthesis API.
- **Authorized Context Review**: The AI references active problems, verified lab reports, and medication schedules.
- **Doctor Questions Generator**: 1-click addition of generated questions into your doctor visit checklist.
- **Clinical Safety Guardrails & Emergency Detection**: Immediate high-priority warning banner when red-flag symptoms are detected.

### 3. My Health Problems (`/problems`)
- **Comprehensive Problem Form**:
  - Problem name, anatomical category, affected body region.
  - Multi-select symptoms pill tags.
  - Severity scale (1 to 10) with dynamic color bar.
  - Frequency (Occasional, Daily, Continuous), start date, detailed descriptions.
  - Doctor diagnosis, current medications, and additional clinical notes.
- **Interactive Daily Severity Trajectory Chart**: 7-day progress bars showing symptom progression.
- **AI Clinical Guidance Accordion**:
  - Evidence-informed safe self-care instructions.
  - Potential causes (strictly framed as possibilities, never diagnoses).
  - Warning signs requiring urgent medical care.
  - Doctor talking points.

### 4. Symptom Checker (`/symptomChecker`)
- Step-by-step diagnostic triage wizard:
  - **Step 1**: Primary symptom selection.
  - **Step 2**: Duration, severity slider, and pain quality (Throbbing, Sharp, Burning, Dull).
  - **Step 3**: Accompanying symptoms and Emergency Red Flag screen.
  - **Step 4**: Clinical Triage Tier (Safe Home Care, Schedule Clinic Visit, or Urgent Care Needed).
- Direct 1-click transfer into **Active Health Problems** or send to **AI Health Assistant**.

### 5. Interactive Human Body Map (`/bodyMap`)
- **Responsive Vector Anatomy Model**:
  - Front (Anterior) and Back (Posterior) view toggle with smooth 3D flip.
  - Clickable interactive regions: Head & Neck, Chest/Heart/Lungs, Abdomen, Back/Spine, Arms, Hands/Wrists, Pelvis, Legs/Knees, Feet/Ankles.
  - Pulsing hover highlights and region glow.
- **Detailed Region Drawer**:
  - Internal organ map & common regional symptoms.
  - Targeted clinical triage questionnaire.
  - "Log Health Problem for [Region]" direct pre-filled action.
- Searchable text selector for full accessibility.

### 6. Medical Reports Upload Center (`/reports`)
- Support for **PDF, JPG, PNG, WEBP**, and camera-based capture simulation.
- Comprehensive medical report table with all required columns:
  - Report ID, Name, Category, Test Date, Upload Date, Facility, Doctor.
  - Extracted Parameters, Values, Units, Reference Ranges, Result Flags.
  - Verification Status (Verified by Patient, Pending Review).
- Search, filter by category/flag, and preview modal.

### 7. AI Medical Report Analyzer (`/analyzer`)
- **Interactive Document OCR Pipeline**:
  - Animated laser scanline visualizer.
  - Structured extraction of clinical biomarkers with reference ranges preserved.
  - Out-of-range visual indicators (Optimal, Normal, Borderline, Low, High, Critical).
  - Plain-language AI summary translating medical jargon into everyday terms.
  - Questions to ask your doctor generated from out-of-range findings.
  - Patient verification confirmation toggle.

### 8. My Medications & Adherence Tracker (`/medications`)
- Prescription schedules, dosage, meal guidelines (before/after food), and supply counter.
- Today's Pill Schedule with interactive **Taken**, **Skipped**, and **Missed** actions.
- Adherence streak tracker with 100% weekly completion badges.
- Drug and food interaction safety alerts.
- Add new medication modal.

### 9. Health History & Timeline (`/timeline`)
- Chronological vertical timeline unifying problems, lab uploads, doctor visits, and vitals milestones.
- Filter chips: All, Medical Reports, Health Issues, Medications, and Vitals.
- Expandable cards with clinical detail snippets.

### 10. Health Trends and Analytics (`/analytics`)
- High-precision responsive SVG charts:
  - **Blood Pressure Trajectory**: Systolic vs Diastolic over time with normal guideline threshold.
  - **Glycemic Curve**: Fasting and post-meal glucose.
  - **Lipid Remodeling**: HDL ("Good") elevation vs LDL ("Bad") reduction.
  - **Sleep Duration**: Restful hours bar chart.
- Time range filters: 7D, 30D, 90D, 1Y.

### 11. Daily Health Journal (`/journal`)
- **Expressive Mood Logger**: 6 emotional states with custom emojis.
- **Hydration Tracker**: 8 interactive clickable water glasses with +250ml counter.
- **Sleep & Rest**: Hours slider and sleep quality rating.
- **Movement**: Workout duration and exercise type.
- **Daily Symptoms & Personal Reflections**: Multi-day journal log calendar.

### 12. Appointments and Reminders (`/appointments`)
- Doctor visit scheduler with specialist, clinic, date/time, and reminder alerts.
- **Doctor Questions Checklist**: Auto-generated by AI and user-customizable, with real-time checkboxes for during the visit.

### 13. Personal Wellness Planner (`/wellness`)
- Tailored health goals: Hydration, Active Steps, Restful Sleep, and Medication Adherence.
- Circular progress indicators with interactive progress increment buttons.
- Daily healthy habits checkoff list.

### 14. Health Education Library (`/education`)
- Curated clinical articles on Cardiovascular health, Sleep architecture, and Eye strain.
- Reading time, key clinical takeaways, and common medical myth busters.

### 15. Emergency Information & SOS (`/emergency`)
- **Critical In Case of Emergency (ICE) Card**:
  - Blood group, severe allergies, chronic conditions, and 1-click dial ICE contacts.
- **Stroke FAST Protocol**: Face, Arm, Speech, Time guide.
- **Emergency Hotline Directory**: 911 / 112 / 108 / Poison Control (1-800-222-1222) / 988.

### 16. Profile and Privacy Settings (`/profile`)
- Demographics, age, biological sex, height, weight, and automated BMI calculation.
- Dark Mode / Light Mode toggle.
- Multilingual language preference.
- Privacy governance: AES-256 encryption status, Row Level Security (RLS) isolation, AI consent toggle.
- **Export Complete Health Dossier**: Download all health records as structured `.JSON`.
- Reset health records action.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Custom Medical Design Tokens, Glassmorphism, Responsive SVGs
- **Icons**: Lucide React
- **Animations**: CSS Keyframe pulses (heartbeat, breath, float, laser scan), Canvas Confetti
- **Audio & Speech**: Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)

---

## 🚀 Running Locally

```bash
# Install dependencies
npm.cmd install

# Start development server
npm.cmd run dev
```

Visit **`http://localhost:5173/`** in your browser.
