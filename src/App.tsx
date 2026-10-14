import React, { useState, useEffect } from 'react';
import {
  initialProfile,
  initialVitals,
  initialProblems,
  initialReports,
  initialMedications,
  initialAppointments,
  initialJournal,
  initialGoals,
  initialTimeline,
} from './data/mockData';
import {
  HealthProblem,
  MedicalReport,
  Medication,
  Appointment,
  JournalEntry,
  HealthGoal,
  UserProfile,
  BodyRegion,
  TimelineItem,
} from './types/health';
import { Sidebar, TopNavbar } from './components/common/Navigation';
import { HealthDashboard } from './components/dashboard/HealthDashboard';
import { HealthAssistant } from './components/assistant/HealthAssistant';
import { HealthProblems } from './components/problems/HealthProblems';
import { SymptomChecker } from './components/symptomChecker/SymptomChecker';
import { InteractiveBodyMap } from './components/bodyMap/InteractiveBodyMap';
import { MedicalReportsCenter } from './components/reports/MedicalReportsCenter';
import { AiReportAnalyzer } from './components/reports/AiReportAnalyzer';
import { MedicationManager } from './components/medications/MedicationManager';
import { HealthTimeline } from './components/timeline/HealthTimeline';
import { HealthAnalytics } from './components/analytics/HealthAnalytics';
import { DailyHealthJournal } from './components/journal/DailyHealthJournal';
import { AppointmentManager } from './components/appointments/AppointmentManager';
import { WellnessPlanner } from './components/wellness/WellnessPlanner';
import { HealthEducation } from './components/education/HealthEducation';
import { EmergencyInfo } from './components/emergency/EmergencyInfo';
import { ProfileSettings } from './components/profile/ProfileSettings';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'te' | 'hi'>('en');

  // Application Health State
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('carevista_profile');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [vitals, setVitals] = useState(initialVitals);

  const [problems, setProblems] = useState<HealthProblem[]>(() => {
    const saved = localStorage.getItem('carevista_problems');
    return saved ? JSON.parse(saved) : initialProblems;
  });

  const [reports, setReports] = useState<MedicalReport[]>(() => {
    const saved = localStorage.getItem('carevista_reports');
    return saved ? JSON.parse(saved) : initialReports;
  });

  const [medications, setMedications] = useState<Medication[]>(() => {
    const saved = localStorage.getItem('carevista_medications');
    return saved ? JSON.parse(saved) : initialMedications;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('carevista_appointments');
    return saved ? JSON.parse(saved) : initialAppointments;
  });

  const [journalHistory, setJournalHistory] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('carevista_journal');
    return saved ? JSON.parse(saved) : initialJournal;
  });

  const [goals, setGoals] = useState<HealthGoal[]>(() => {
    const saved = localStorage.getItem('carevista_goals');
    return saved ? JSON.parse(saved) : initialGoals;
  });

  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>(() => {
    const saved = localStorage.getItem('carevista_timeline');
    return saved ? JSON.parse(saved) : initialTimeline;
  });

  // Prefill state when transitioning from Body Map or Symptom Checker to Health Problems
  const [bodyMapPrefill, setBodyMapPrefill] = useState<{
    region: BodyRegion | null;
    name: string | null;
  }>({ region: null, name: null });

  // Selected report for Analyzer view
  const [analyzerReport, setAnalyzerReport] = useState<MedicalReport>(reports[0]);

  // Sync dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Persistence to local storage
  useEffect(() => {
    localStorage.setItem('carevista_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('carevista_problems', JSON.stringify(problems));
  }, [problems]);

  useEffect(() => {
    localStorage.setItem('carevista_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('carevista_medications', JSON.stringify(medications));
  }, [medications]);

  useEffect(() => {
    localStorage.setItem('carevista_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('carevista_journal', JSON.stringify(journalHistory));
  }, [journalHistory]);

  useEffect(() => {
    localStorage.setItem('carevista_goals', JSON.stringify(goals));
  }, [goals]);

  // Handlers
  const handleAddProblem = (newProb: HealthProblem) => {
    setProblems([newProb, ...problems]);
    // Add to timeline
    const tlItem: TimelineItem = {
      id: `tl-${Date.now()}`,
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'problem',
      title: `Logged Concern: ${newProb.name}`,
      subtitle: `${newProb.category} • Severity ${newProb.severity}/10`,
      badgeText: 'Health Issue',
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
      referenceId: newProb.id,
    };
    setTimelineItems([tlItem, ...timelineItems]);
  };

  const handleUpdateProblem = (updated: HealthProblem) => {
    setProblems(problems.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleDeleteProblem = (id: string) => {
    setProblems(problems.filter((p) => p.id !== id));
  };

  const handleUploadReport = (newRep: MedicalReport) => {
    setReports([newRep, ...reports]);
    setAnalyzerReport(newRep);
    const tlItem: TimelineItem = {
      id: `tl-${Date.now()}`,
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'report',
      title: `Uploaded: ${newRep.name}`,
      subtitle: `${newRep.hospital} • ${newRep.type}`,
      badgeText: 'Lab Report',
      badgeColor: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
      referenceId: newRep.id,
    };
    setTimelineItems([tlItem, ...timelineItems]);
  };

  const handleVerifyReport = (reportId: string) => {
    setReports(
      reports.map((r) =>
        r.id === reportId ? { ...r, verificationStatus: 'Verified' as const } : r
      )
    );
  };

  const handleUpdateMedication = (updated: Medication) => {
    setMedications(medications.map((m) => (m.id === updated.id ? updated : m)));
  };

  const handleAddMedication = (newMed: Medication) => {
    setMedications([newMed, ...medications]);
  };

  const handleAddAppointment = (newApt: Appointment) => {
    setAppointments([newApt, ...appointments]);
  };

  const handleToggleQuestion = (aptId: string, qId: string) => {
    setAppointments(
      appointments.map((a) => {
        if (a.id === aptId) {
          return {
            ...a,
            doctorQuestions: a.doctorQuestions.map((q) =>
              q.id === qId ? { ...q, answered: !q.answered } : q
            ),
          };
        }
        return a;
      })
    );
  };

  const handleAddQuestionToAppointment = (aptId: string, qText: string) => {
    setAppointments(
      appointments.map((a) => {
        if (a.id === aptId) {
          return {
            ...a,
            doctorQuestions: [
              ...a.doctorQuestions,
              { id: `q-${Date.now()}`, text: qText, answered: false },
            ],
          };
        }
        return a;
      })
    );
  };

  const handleAddDoctorQuestionGlobal = (qText: string) => {
    if (appointments.length > 0) {
      handleAddQuestionToAppointment(appointments[0].id, qText);
    }
  };

  const handleSaveJournalEntry = (entry: JournalEntry) => {
    setJournalHistory([entry, ...journalHistory]);
  };

  const handleUpdateGoalCurrent = (goalId: string, delta: number) => {
    setGoals(
      goals.map((g) => {
        if (g.id === goalId) {
          return {
            ...g,
            current: Math.max(0, g.current + delta),
          };
        }
        return g;
      })
    );
  };

  const handleExportAllData = () => {
    const fullBackup = {
      profile,
      vitals,
      problems,
      reports,
      medications,
      appointments,
      journalHistory,
      goals,
      timelineItems,
      exportedAt: new Date().toISOString(),
      platform: 'CareVista AI Personal Health Copilot',
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `carevista_health_dossier_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetAllData = () => {
    if (window.confirm('Reset all health records to initial baseline? This action cannot be undone.')) {
      localStorage.clear();
      setProfile(initialProfile);
      setVitals(initialVitals);
      setProblems(initialProblems);
      setReports(initialReports);
      setMedications(initialMedications);
      setAppointments(initialAppointments);
      setJournalHistory(initialJournal);
      setGoals(initialGoals);
      setTimelineItems(initialTimeline);
      alert('Health profile has been reset to default baseline.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col antialiased selection:bg-teal-500 selection:text-white">
      {/* Left Navigation Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tabId) => setCurrentTab(tabId)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area (Offset for Desktop Sidebar) */}
      <div className="lg:pl-72 flex flex-col flex-1 min-h-screen">
        {/* Top Navbar */}
        <TopNavbar
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          onSelectTab={(tabId) => setCurrentTab(tabId)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          language={language}
          onChangeLanguage={setLanguage}
          userName={profile.name}
        />

        {/* Dynamic Page Router */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {currentTab === 'dashboard' && (
            <HealthDashboard
              profile={profile}
              vitals={vitals}
              problems={problems}
              reports={reports}
              medications={medications}
              appointments={appointments}
              goals={goals}
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onTakeMedication={(med) => {
                handleUpdateMedication({ ...med, statusToday: 'taken' });
              }}
            />
          )}

          {currentTab === 'assistant' && (
            <HealthAssistant
              activeProblems={problems}
              reports={reports}
              medications={medications}
              onAddDoctorQuestion={handleAddDoctorQuestionGlobal}
            />
          )}

          {currentTab === 'problems' && (
            <HealthProblems
              problems={problems}
              onAddProblem={handleAddProblem}
              onUpdateProblem={handleUpdateProblem}
              onDeleteProblem={handleDeleteProblem}
              prefillRegion={bodyMapPrefill.region}
              prefillName={bodyMapPrefill.name}
              onClearPrefill={() => setBodyMapPrefill({ region: null, name: null })}
            />
          )}

          {currentTab === 'symptomChecker' && (
            <SymptomChecker
              onTransferToProblem={(probData) => {
                setBodyMapPrefill({
                  region: probData.bodyPart,
                  name: probData.name,
                });
                setCurrentTab('problems');
              }}
              onAskAiAboutSymptoms={(prompt) => {
                setCurrentTab('assistant');
              }}
            />
          )}

          {currentTab === 'bodyMap' && (
            <InteractiveBodyMap
              onQuickLogProblem={(region, defaultName) => {
                setBodyMapPrefill({ region, name: defaultName });
                setCurrentTab('problems');
              }}
            />
          )}

          {currentTab === 'reports' && (
            <MedicalReportsCenter
              reports={reports}
              onUploadReport={handleUploadReport}
              onOpenAnalyzer={(rep) => {
                setAnalyzerReport(rep);
                setCurrentTab('analyzer');
              }}
            />
          )}

          {currentTab === 'analyzer' && (
            <AiReportAnalyzer
              report={analyzerReport}
              onVerifyReport={handleVerifyReport}
              onAddDoctorQuestion={handleAddDoctorQuestionGlobal}
            />
          )}

          {currentTab === 'medications' && (
            <MedicationManager
              medications={medications}
              onUpdateMedication={handleUpdateMedication}
              onAddMedication={handleAddMedication}
            />
          )}

          {currentTab === 'timeline' && (
            <HealthTimeline
              timelineItems={timelineItems}
              onNavigateToRecord={(type) => {
                if (type === 'problem') setCurrentTab('problems');
                if (type === 'report') setCurrentTab('reports');
                if (type === 'medication') setCurrentTab('medications');
              }}
            />
          )}

          {currentTab === 'analytics' && <HealthAnalytics />}

          {currentTab === 'journal' && (
            <DailyHealthJournal
              journalHistory={journalHistory}
              onSaveJournalEntry={handleSaveJournalEntry}
            />
          )}

          {currentTab === 'appointments' && (
            <AppointmentManager
              appointments={appointments}
              onAddAppointment={handleAddAppointment}
              onToggleQuestion={handleToggleQuestion}
              onAddQuestionToAppointment={handleAddQuestionToAppointment}
            />
          )}

          {currentTab === 'wellness' && (
            <WellnessPlanner
              goals={goals}
              onUpdateGoalCurrent={handleUpdateGoalCurrent}
            />
          )}

          {currentTab === 'education' && <HealthEducation />}

          {currentTab === 'emergency' && <EmergencyInfo profile={profile} />}

          {currentTab === 'profile' && (
            <ProfileSettings
              profile={profile}
              isDarkMode={isDarkMode}
              onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
              onUpdateProfile={setProfile}
              onExportAllData={handleExportAllData}
              onResetAllData={handleResetAllData}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
