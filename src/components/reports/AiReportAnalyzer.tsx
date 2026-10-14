import React, { useState } from 'react';
import { MedicalReport, BiomarkerMeasurement, ResultFlag } from '../../types/health';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  HelpCircle,
  CheckSquare,
  FileText,
  Scan,
  RefreshCw,
  Share2,
  Calendar,
  Building,
} from 'lucide-react';
import { ReportIllustration } from '../illustrations/MedicalIllustrations';

interface Props {
  report: MedicalReport;
  onVerifyReport: (reportId: string) => void;
  onAddDoctorQuestion?: (qText: string) => void;
}

export const AiReportAnalyzer: React.FC<Props> = ({
  report,
  onVerifyReport,
  onAddDoctorQuestion,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedBiomarker, setSelectedBiomarker] = useState<BiomarkerMeasurement | null>(
    report.measurements[0] || null
  );
  const [verified, setVerified] = useState(report.verificationStatus === 'Verified');
  const [copiedQuestion, setCopiedQuestion] = useState<string | null>(null);

  const handleRescan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1500);
  };

  const handleToggleVerification = () => {
    const nextState = !verified;
    setVerified(nextState);
    if (nextState) {
      onVerifyReport(report.id);
    }
  };

  const handleCopyQuestion = (q: string) => {
    if (onAddDoctorQuestion) {
      onAddDoctorQuestion(q);
      setCopiedQuestion(q);
      setTimeout(() => setCopiedQuestion(null), 2500);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-sm font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>AI Clinical Document Understanding Engine</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            AI Medical Report Analyzer
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Translating complex clinical biomarkers, laboratory units, and reference ranges into actionable clarity.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRescan}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-semibold text-xs cursor-pointer transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>Re-analyze Document</span>
          </button>

          <button
            onClick={handleToggleVerification}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
              verified
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 hover:bg-teal-100'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{verified ? 'Verified by Patient' : 'Confirm & Verify Results'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Scanner Card + Right Biomarker Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Document Overview & Simulated Scanner */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-5 relative overflow-hidden">
            {/* Laser Scan Animation Line */}
            {isScanning && <div className="animate-scan-line z-20"></div>}

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <ReportIllustration size={48} />
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {report.name}
                  </h3>
                  <div className="text-2xs font-mono text-slate-400">
                    {report.reportCode} • {report.type}
                  </div>
                </div>
              </div>

              <span
                className={`text-2xs px-2.5 py-0.5 rounded-full font-bold ${
                  verified
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                }`}
              >
                {verified ? 'Verified' : 'Pending Review'}
              </span>
            </div>

            {/* Metadata Box */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-400">
              <div>
                <span className="text-2xs text-slate-400 block font-semibold uppercase">Facility</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{report.hospital}</span>
              </div>
              <div>
                <span className="text-2xs text-slate-400 block font-semibold uppercase">Attending Clinician</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{report.doctorName || 'Pathology Staff'}</span>
              </div>
              <div>
                <span className="text-2xs text-slate-400 block font-semibold uppercase">Specimen Date</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{report.testDate}</span>
              </div>
              <div>
                <span className="text-2xs text-slate-400 block font-semibold uppercase">Total Markers Extracted</span>
                <span className="font-mono font-bold text-teal-600 dark:text-teal-400">{report.measurements.length}</span>
              </div>
            </div>

            {/* Plain-Language AI Summary Card */}
            <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-900 text-xs leading-relaxed text-teal-900 dark:text-teal-100 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-teal-700 dark:text-teal-300">
                <Sparkles className="w-4 h-4" />
                <span>Executive AI Plain-Language Breakdown</span>
              </div>
              <p>{report.aiSummary}</p>
            </div>

            {/* Doctor Questions from this Report */}
            {report.doctorQuestions && report.doctorQuestions.length > 0 && (
              <div className="pt-2 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  <CheckSquare className="w-3.5 h-3.5 text-teal-600" />
                  <span>Targeted Questions to Ask Your Doctor</span>
                </div>
                <div className="space-y-1.5">
                  {report.doctorQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-start justify-between gap-2 text-xs"
                    >
                      <span className="text-slate-800 dark:text-slate-200">{q}</span>
                      <button
                        onClick={() => handleCopyQuestion(q)}
                        className="px-2 py-1 rounded-md bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 hover:bg-teal-100 text-2xs font-bold cursor-pointer shrink-0"
                      >
                        {copiedQuestion === q ? '✓ Added' : '+ Add to Visit'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Interactive Biomarker Extraction Table & Deep Dive */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Extracted Biomarkers & Reference Ranges
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Click any parameter below to view medical terminology translation and past trajectories.
              </p>
            </div>

            {/* Biomarker List Grid */}
            <div className="space-y-3">
              {report.measurements.map((bm) => {
                const isSelected = selectedBiomarker?.id === bm.id;
                const flagColor =
                  bm.flag === 'Optimal'
                    ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200'
                    : bm.flag === 'Normal'
                    ? 'text-teal-700 bg-teal-50 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200'
                    : bm.flag === 'Borderline' || bm.flag === 'High'
                    ? 'text-amber-700 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200'
                    : 'text-sky-700 bg-sky-50 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200';

                return (
                  <div
                    key={bm.id}
                    onClick={() => setSelectedBiomarker(bm)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-teal-500 bg-teal-50/20 dark:bg-teal-950/20 shadow-sm ring-2 ring-teal-500/10'
                        : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          {bm.parameter}
                        </div>
                        <div className="text-2xs text-slate-400 mt-0.5">
                          Standard Range: {bm.referenceRange}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-base font-mono font-bold text-slate-900 dark:text-white">
                            {bm.value} <span className="text-xs text-slate-400 font-normal">{bm.unit}</span>
                          </div>
                          {bm.previousValue && (
                            <div className="text-2xs text-slate-400 flex items-center justify-end gap-1">
                              <span>Prior: {bm.previousValue} {bm.unit}</span>
                              {Number(bm.value) > Number(bm.previousValue) ? (
                                <TrendingUp className="w-3 h-3 text-teal-500" />
                              ) : (
                                <TrendingDown className="w-3 h-3 text-sky-500" />
                              )}
                            </div>
                          )}
                        </div>

                        <span className={`text-2xs px-2.5 py-1 rounded-lg font-bold border ${flagColor}`}>
                          {bm.flag}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Biomarker Deep-Dive Card */}
            {selectedBiomarker && (
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      Clinical Terminology: {selectedBiomarker.parameter}
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
                    Current: {selectedBiomarker.value} {selectedBiomarker.unit}
                  </span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedBiomarker.explanation}
                </p>

                {/* Range Bar Graphic */}
                <div className="pt-2">
                  <div className="flex justify-between text-2xs text-slate-400 mb-1">
                    <span>Reference Target: {selectedBiomarker.referenceRange}</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      Result: {selectedBiomarker.value} {selectedBiomarker.unit}
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        selectedBiomarker.flag === 'Optimal' || selectedBiomarker.flag === 'Normal'
                          ? 'bg-emerald-500'
                          : selectedBiomarker.flag === 'Borderline'
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: '65%' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
