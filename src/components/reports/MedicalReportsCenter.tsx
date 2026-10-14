import React, { useState } from 'react';
import { MedicalReport, ReportType, ResultFlag } from '../../types/health';
import {
  FileText,
  Search,
  Filter,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Eye,
  Download,
  Calendar,
  Building,
  User,
  Plus,
  Sparkles,
  Camera,
  X,
} from 'lucide-react';
import { ReportIllustration } from '../illustrations/MedicalIllustrations';

interface Props {
  reports: MedicalReport[];
  onUploadReport: (newReport: MedicalReport) => void;
  onOpenAnalyzer: (report: MedicalReport) => void;
}

export const MedicalReportsCenter: React.FC<Props> = ({
  reports,
  onUploadReport,
  onOpenAnalyzer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedFlagFilter, setSelectedFlagFilter] = useState<string>('All');
  const [previewReport, setPreviewReport] = useState<MedicalReport | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // New Upload Form State
  const [uploadName, setUploadName] = useState('');
  const [uploadType, setUploadType] = useState<ReportType>('Lipid Profile');
  const [uploadHospital, setUploadHospital] = useState('Metropolis Diagnostics');
  const [uploadDoctor, setUploadDoctor] = useState('Dr. Jennifer Vance');
  const [uploadTestDate, setUploadTestDate] = useState(new Date().toISOString().split('T')[0]);
  const [isProcessingUpload, setIsProcessingUpload] = useState(false);

  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reportCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.hospital.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'All' || r.type === selectedType;

    const matchesFlag =
      selectedFlagFilter === 'All' ||
      r.measurements.some((m) => m.flag === selectedFlagFilter);

    return matchesSearch && matchesType && matchesFlag;
  });

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadName.trim()) return;

    setIsProcessingUpload(true);

    setTimeout(() => {
      const newReport: MedicalReport = {
        id: `rep-${Date.now()}`,
        reportCode: `REP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        name: uploadName,
        type: uploadType,
        testDate: uploadTestDate,
        uploadDate: new Date().toISOString().split('T')[0],
        hospital: uploadHospital,
        doctorName: uploadDoctor,
        fileSize: '1.2 MB',
        fileType: 'PDF',
        verificationStatus: 'Pending Review',
        measurements: [
          {
            id: `m-${Date.now()}-1`,
            parameter: 'Primary Marker',
            value: 120,
            unit: 'mg/dL',
            referenceRange: '70 - 140 mg/dL',
            flag: 'Normal',
            explanation: 'Standard baseline biomarker extracted from uploaded document.',
          },
          {
            id: `m-${Date.now()}-2`,
            parameter: 'Secondary Indicator',
            value: 4.8,
            unit: 'mmol/L',
            referenceRange: '3.5 - 5.5 mmol/L',
            flag: 'Optimal',
            explanation: 'Metabolic balance indicator within optimal health parameters.',
          },
        ],
        aiSummary: `AI Document Extraction complete for ${uploadName}. Biomarkers were parsed into structured tables and units are preserved. Out-of-range indicators are ready for clinical review.`,
        doctorQuestions: [
          `Are there dietary lifestyle factors influencing these ${uploadType} parameters?`,
          'When is the next repeat monitoring interval scheduled?',
        ],
      };

      onUploadReport(newReport);
      setIsProcessingUpload(false);
      setIsUploadModalOpen(false);
      setUploadName('');
      onOpenAnalyzer(newReport);
    }, 1200);
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-sm font-semibold uppercase tracking-wider">
            <ReportIllustration size={24} />
            <span>Digital Medical Document Archive</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Medical Reports & Lab Results
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Securely store, organize, verify, and understand all clinical pathology and diagnostic reports.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-all shadow-md shadow-teal-600/20 cursor-pointer self-start sm:self-auto"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Medical Report</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by report name, code, hospital, or doctor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border-none outline-none cursor-pointer"
          >
            <option value="All">All Types</option>
            <option value="Lipid Profile">Lipid Profile</option>
            <option value="Complete Blood Count">Complete Blood Count</option>
            <option value="Comprehensive Metabolic">Metabolic Panel</option>
            <option value="Thyroid Panel">Thyroid Panel</option>
            <option value="Radiology X-Ray">Radiology</option>
          </select>

          <select
            value={selectedFlagFilter}
            onChange={(e) => setSelectedFlagFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border-none outline-none cursor-pointer"
          >
            <option value="All">All Result Flags</option>
            <option value="Optimal">Optimal</option>
            <option value="Normal">Normal</option>
            <option value="Borderline">Borderline</option>
            <option value="Low">Low</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Comprehensive Medical Report Management Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-100/50 dark:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-2xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Report ID & Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Test Date</th>
                <th className="py-3.5 px-4">Laboratory / Hospital</th>
                <th className="py-3.5 px-4">Key Biomarkers</th>
                <th className="py-3.5 px-4">Verification</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-sm">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No medical reports matching your query.
                  </td>
                </tr>
              ) : (
                filteredReports.map((rep) => {
                  const hasBorderlineOrHigh = rep.measurements.some(
                    (m) => m.flag === 'Borderline' || m.flag === 'High' || m.flag === 'Low'
                  );

                  return (
                    <tr
                      key={rep.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* ID & Title */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">
                              {rep.name}
                            </div>
                            <div className="text-2xs font-mono text-slate-400">
                              {rep.reportCode} • {rep.fileSize}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {rep.type}
                      </td>

                      {/* Test Date */}
                      <td className="py-4 px-4 text-xs text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{rep.testDate}</span>
                        </div>
                      </td>

                      {/* Hospital & Doctor */}
                      <td className="py-4 px-4 text-xs text-slate-600 dark:text-slate-400">
                        <div className="font-medium text-slate-800 dark:text-slate-200">
                          {rep.hospital}
                        </div>
                        {rep.doctorName && (
                          <div className="text-2xs text-slate-400">{rep.doctorName}</div>
                        )}
                      </td>

                      {/* Key Biomarkers extracted */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {rep.measurements.slice(0, 3).map((m) => (
                            <span
                              key={m.id}
                              className={`text-2xs px-2 py-0.5 rounded-md font-bold ${
                                m.flag === 'Optimal'
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                                  : m.flag === 'Borderline' || m.flag === 'High'
                                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                                  : m.flag === 'Low'
                                  ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300'
                                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                              }`}
                            >
                              {m.parameter}: {m.value} {m.unit}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Verification Status */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 text-2xs px-2.5 py-0.5 rounded-full font-bold ${
                            rep.verificationStatus === 'Verified'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                          }`}
                        >
                          {rep.verificationStatus === 'Verified' ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <AlertCircle className="w-3 h-3 text-amber-600" />
                          )}
                          <span>{rep.verificationStatus}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onOpenAnalyzer(rep)}
                            title="Run AI Report Analyzer"
                            className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 hover:bg-teal-100 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>AI Insights</span>
                          </button>

                          <button
                            onClick={() => setPreviewReport(rep)}
                            title="Preview Document Details"
                            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Modal */}
      {previewReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {previewReport.name}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  {previewReport.reportCode} • {previewReport.hospital} • {previewReport.testDate}
                </p>
              </div>
              <button
                onClick={() => setPreviewReport(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AI Summary in Preview */}
            <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200/60 dark:border-teal-900/40 text-xs leading-relaxed text-teal-900 dark:text-teal-200">
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>AI Clinical Plain-Language Explanation:</span>
              </div>
              {previewReport.aiSummary}
            </div>

            {/* Extracted Biomarkers Table */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Biomarkers & Measured Parameters
              </span>
              <div className="space-y-2">
                {previewReport.measurements.map((m) => (
                  <div
                    key={m.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{m.parameter}</div>
                      <div className="text-2xs text-slate-400">
                        Ref: {m.referenceRange} • {m.explanation}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-slate-900 dark:text-white">
                        {m.value} {m.unit}
                      </div>
                      <span
                        className={`text-2xs px-2 py-0.5 rounded-full font-bold ${
                          m.flag === 'Optimal'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                            : m.flag === 'Borderline' || m.flag === 'High'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                            : m.flag === 'Low'
                            ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {m.flag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  setPreviewReport(null);
                  onOpenAnalyzer(previewReport);
                }}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-all cursor-pointer shadow-md shadow-teal-600/20"
              >
                Open in Full AI Analyzer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal with Camera / PDF Simulator */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Upload & Analyze Medical Report
                </h3>
                <p className="text-xs text-slate-500">
                  Support for PDF, JPG, PNG, WEBP, and camera-based document scan.
                </p>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drag & Drop / Camera Dropzone */}
            <div className="p-8 rounded-2xl border-2 border-dashed border-teal-300 dark:border-teal-700 bg-teal-50/30 dark:bg-teal-950/20 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-900/60 text-teal-600 dark:text-teal-400 mx-auto flex items-center justify-center">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Drag and drop your report or browse files
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Multi-page PDFs, high-resolution scans up to 25MB supported.
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <label className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 font-semibold text-xs cursor-pointer hover:bg-teal-50">
                  Browse Files
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setUploadName(e.target.files[0].name.replace(/\.[^/.]+$/, ''));
                      }
                    }}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setUploadName('Mobile Camera Scan — Diagnostic Lab Report')}
                  className="px-4 py-2 rounded-xl bg-teal-600 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer hover:bg-teal-500"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Camera Scan</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSimulateUpload} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Report Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Comprehensive Metabolic Panel (CMP)"
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Report Type
                  </label>
                  <select
                    value={uploadType}
                    onChange={(e) => setUploadType(e.target.value as ReportType)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100 cursor-pointer"
                  >
                    <option value="Lipid Profile">Lipid Profile</option>
                    <option value="Complete Blood Count">Complete Blood Count</option>
                    <option value="Comprehensive Metabolic">Metabolic Panel</option>
                    <option value="Thyroid Panel">Thyroid Panel</option>
                    <option value="Urinalysis">Urinalysis</option>
                    <option value="Radiology X-Ray">Radiology X-Ray</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Test Date
                  </label>
                  <input
                    type="date"
                    value={uploadTestDate}
                    onChange={(e) => setUploadTestDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-slate-500 hover:text-slate-800 text-sm font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessingUpload || !uploadName.trim()}
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-md shadow-teal-600/20 cursor-pointer flex items-center gap-2"
                >
                  {isProcessingUpload ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Processing OCR & AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Extract & Analyze with AI</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
