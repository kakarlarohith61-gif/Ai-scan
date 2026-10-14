import React, { useState, useRef, useEffect } from 'react';
import {
  ChatMessage,
  HealthProblem,
  MedicalReport,
  Medication,
} from '../../types/health';
import { generateHealthAssistantResponse, checkIsEmergency } from '../../utils/aiEngine';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  FileText,
  AlertTriangle,
  Sparkles,
  Trash2,
  CheckSquare,
  Globe,
  Paperclip,
  CheckCircle,
} from 'lucide-react';
import { HeartIllustration } from '../illustrations/MedicalIllustrations';

interface Props {
  activeProblems: HealthProblem[];
  reports: MedicalReport[];
  medications: Medication[];
  onAddDoctorQuestion?: (questionText: string) => void;
}

export const HealthAssistant: React.FC<Props> = ({
  activeProblems,
  reports,
  medications,
  onAddDoctorQuestion,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-welcome',
      sender: 'assistant',
      content:
        'Hello! I am **CareVista AI**, your Personal Health Copilot.\n\nI am connected with your authorized health records (2 active health concerns, 3 medical reports, and current medications). How can I assist you with your health today?',
      timestamp: 'Just now',
      language: 'en',
      suggestedQuestions: [
        'Explain my latest lipid profile report in simple terms',
        'What questions should I ask my cardiologist at my upcoming visit?',
        'Suggest safe self-care for my afternoon tension headache',
        'Review my daily supplements and check interactions',
      ],
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [language, setLanguage] = useState<'en' | 'te' | 'hi'>('en');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [attachedReportId, setAttachedReportId] = useState<string | null>(null);
  const [copiedQuestionId, setCopiedQuestionId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Voice Recognition (Web Speech API)
  const toggleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please type your message.');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  // Text-To-Speech (Web Speech Synthesis)
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language,
      attachedReportId: attachedReportId || undefined,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setAttachedReportId(null);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = generateHealthAssistantResponse(
        query,
        language,
        activeProblems,
        reports,
        medications
      );

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        content: aiResponse.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language,
        isEmergencyAlert: aiResponse.isEmergency,
        suggestedQuestions: aiResponse.suggestedQuestions,
        doctorChecklistItems: aiResponse.doctorChecklistItems,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 900);
  };

  const clearChat = () => {
    if (window.confirm('Clear current conversation history?')) {
      setMessages([
        {
          id: 'm-welcome-reset',
          sender: 'assistant',
          content: 'Chat history cleared. How can I assist you today?',
          timestamp: 'Just now',
          language,
        },
      ]);
    }
  };

  const handleAddQuestionToVisit = (qText: string) => {
    if (onAddDoctorQuestion) {
      onAddDoctorQuestion(qText);
      setCopiedQuestionId(qText);
      setTimeout(() => setCopiedQuestionId(null), 2500);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none flex flex-col h-[760px] overflow-hidden">
      {/* Top Header Bar */}
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-slate-900 dark:text-white text-lg">
                CareVista AI Health Assistant
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300">
                Context-Aware
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your Health. Your Journey. Your AI Companion.
            </p>
          </div>
        </div>

        {/* Action Controls: Language, TTS, Clear */}
        <div className="flex items-center gap-2">
          {/* Multilingual Selector */}
          <div className="flex items-center bg-white dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1" />
            {(['en', 'te', 'hi'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  language === lang
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {lang === 'en' ? 'EN' : lang === 'te' ? 'తెలుగు' : 'हिंदी'}
              </button>
            ))}
          </div>

          <button
            onClick={() => speakText(messages[messages.length - 1]?.content || '')}
            title={isSpeaking ? 'Mute AI voice' : 'Listen to last response'}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
          >
            {isSpeaking ? (
              <VolumeX className="w-5 h-5 text-rose-500 animate-pulse" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={clearChat}
            title="Clear Chat History"
            className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Safety Guardrail Alert Header */}
      <div className="px-6 py-2 bg-teal-50/60 dark:bg-teal-950/30 border-b border-teal-100/60 dark:border-teal-900/40 flex items-center justify-between text-xs text-teal-800 dark:text-teal-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-500"></span>
          <span>
            <strong>Clinical Safety Protocol:</strong> AI suggestions are informational & educational. Never a substitute for certified medical diagnosis.
          </span>
        </div>
        <span className="hidden sm:inline font-mono opacity-75">HIPAA/GDPR Private Context</span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-2`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 md:p-5 shadow-xs transition-all ${
                  isUser
                    ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-br-xs'
                    : msg.isEmergencyAlert
                    ? 'bg-rose-50 dark:bg-rose-950/50 border-2 border-rose-500 text-rose-950 dark:text-rose-100 rounded-bl-xs'
                    : 'bg-slate-100 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 rounded-bl-xs border border-slate-200/60 dark:border-slate-700/60'
                }`}
              >
                {/* Emergency banner inside bubble if triggered */}
                {msg.isEmergencyAlert && (
                  <div className="flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400 pb-2 mb-2 border-b border-rose-200 dark:border-rose-800 text-sm">
                    <AlertTriangle className="w-5 h-5 animate-bounce" />
                    <span>EMERGENCY PROTOCOL ACTIVATED</span>
                  </div>
                )}

                {/* Attached Report Indicator */}
                {msg.attachedReportId && (
                  <div className="flex items-center gap-2 mb-2 p-2 rounded-lg bg-teal-800/40 text-teal-100 text-xs">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Attached Document: {msg.attachedReportId}</span>
                  </div>
                )}

                {/* Content with Markdown line breaks */}
                <div className="text-sm leading-relaxed whitespace-pre-line space-y-2">
                  {msg.content}
                </div>

                {/* Doctor Questions Checklist Box if generated */}
                {msg.doctorChecklistItems && msg.doctorChecklistItems.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider mb-2">
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>Doctor Visit Checklist Generated:</span>
                    </div>
                    <div className="space-y-1.5">
                      {msg.doctorChecklistItems.map((q, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                        >
                          <span>{q}</span>
                          <button
                            onClick={() => handleAddQuestionToVisit(q)}
                            className="ml-2 px-2 py-1 rounded-md bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 hover:bg-teal-100 text-2xs font-semibold cursor-pointer shrink-0"
                          >
                            {copiedQuestionId === q ? (
                              <span className="flex items-center gap-1 text-emerald-600">
                                <CheckCircle className="w-3 h-3" /> Added!
                              </span>
                            ) : (
                              '+ Add to Doctor Visit'
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className={`text-2xs mt-2 text-right ${
                    isUser ? 'text-teal-100' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {/* Suggested Follow-up Questions Chips */}
              {!isUser && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 max-w-[85%] mt-1 pl-1">
                  {msg.suggestedQuestions.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(sug)}
                      className="text-xs px-3 py-1.5 rounded-full bg-slate-100 hover:bg-teal-50 dark:bg-slate-800 dark:hover:bg-teal-950/60 text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-300 border border-slate-200/80 dark:border-slate-700 transition-all cursor-pointer text-left"
                    >
                      💡 {sug}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 w-24">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce"></span>
            <span
              className="w-2 h-2 rounded-full bg-teal-500 animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></span>
            <span
              className="w-2 h-2 rounded-full bg-teal-500 animate-bounce"
              style={{ animationDelay: '0.4s' }}
            ></span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Report Attachment Bar if selected */}
      {attachedReportId && (
        <div className="px-6 py-2 bg-teal-50 dark:bg-teal-950/50 border-t border-teal-200 dark:border-teal-800 flex items-center justify-between text-xs text-teal-800 dark:text-teal-300">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-600" />
            <span>Attached to prompt: <strong>{attachedReportId}</strong></span>
          </div>
          <button
            onClick={() => setAttachedReportId(null)}
            className="text-slate-400 hover:text-rose-500 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Input Tray */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          {/* Quick attach lab report dropdown */}
          <div className="relative group">
            <button
              type="button"
              title="Attach Medical Report to Context"
              className="p-2.5 rounded-xl text-slate-500 hover:text-teal-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <div className="absolute bottom-full left-0 mb-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 hidden group-hover:block z-20">
              <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1 block">
                Attach Medical Report
              </span>
              {reports.map((r) => (
                <div
                  key={r.id}
                  onClick={() => setAttachedReportId(`${r.name} (${r.reportCode})`)}
                  className="px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950/60 hover:text-teal-700 cursor-pointer truncate"
                >
                  📄 {r.name}
                </div>
              ))}
            </div>
          </div>

          {/* Voice Input button */}
          <button
            type="button"
            onClick={toggleSpeechRecognition}
            title={isListening ? 'Listening... click to stop' : 'Speak your question'}
            className={`p-2.5 rounded-xl transition-all cursor-pointer ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse'
                : 'text-slate-500 hover:text-teal-600 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              language === 'te'
                ? 'మీ ఆరోగ్యం గురించి ఏదైనా అడగండి...'
                : language === 'hi'
                ? 'अपने स्वास्थ्य के बारे में पूछें...'
                : 'Ask CareVista AI about symptoms, lab results, medications...'
            }
            className="flex-1 px-4 py-3 text-sm rounded-2xl bg-slate-100 dark:bg-slate-800 border-none text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-3 rounded-2xl bg-teal-600 hover:bg-teal-500 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md shadow-teal-600/20 transition-all cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
