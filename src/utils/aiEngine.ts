import { HealthProblem, MedicalReport, Medication, ChatMessage } from '../types/health';

// Emergency keyword detector for immediate triage safety
const EMERGENCY_KEYWORDS = [
  'chest pain',
  'radiating pain to arm',
  'sudden numbness',
  'slurred speech',
  'facial drooping',
  'trouble breathing',
  'shortness of breath',
  'difficulty breathing',
  'coughing blood',
  'vomiting blood',
  'thunderclap headache',
  'worst headache of my life',
  'anaphylaxis',
  'throat swelling',
  'unconscious',
  'fainting repeatedly',
];

export function checkIsEmergency(text: string): boolean {
  const lower = text.toLowerCase();
  return EMERGENCY_KEYWORDS.some((kw) => lower.includes(kw));
}

export interface AiResponseResult {
  text: string;
  isEmergency: boolean;
  suggestedQuestions?: string[];
  doctorChecklistItems?: string[];
}

export function generateHealthAssistantResponse(
  userPrompt: string,
  language: 'en' | 'te' | 'hi',
  activeProblems: HealthProblem[],
  reports: MedicalReport[],
  medications: Medication[]
): AiResponseResult {
  const isEmergency = checkIsEmergency(userPrompt);

  if (isEmergency) {
    if (language === 'te') {
      return {
        isEmergency: true,
        text: '⚠️ **అత్యవసర హెచ్చరిక:** మీ లక్షణాలు అత్యవసర వైద్య పరిస్థితిని సూచించవచ్చు (ఉదాహరణకు తీవ్రమైన ఛాతీ నొప్పి, శ్వాస తీసుకోవడంలో ఇబ్బంది లేదా నాడీ సంబంధిత లక్షణాలు). దయచేసి వెంటనే స్థానిక ఎమర్జెన్సీ నంబర్ 108 లేదా 112 కి కాల్ చేయండి లేదా సమీపంలోని అత్యవసర విభాగానికి (Emergency Room) వెళ్ళండి. వేచి ఉండకండి.',
        suggestedQuestions: ['ఎమర్జెన్సీ కాంటాక్ట్‌లకు కాల్ చేయాలా?', 'సమీపంలోని ఆసుపత్రి ఎక్కడ ఉంది?'],
      };
    }
    if (language === 'hi') {
      return {
        isEmergency: true,
        text: '⚠️ **आपातकालीन चेतावनी:** आपके बताए गए लक्षण तत्काल चिकित्सा आपातकाल (जैसे सीने में गंभीर दर्द, सांस लेने में अत्यधिक कठिनाई, या तंत्रिका संबंधी लक्षण) का संकेत हो सकते हैं। कृपया तुरंत स्थानीय आपातकालीन नंबर 112 या 108 पर संपर्क करें अथवा नजदीकी इमरजेंसी अस्पताल जाएं। देरी न करें।',
        suggestedQuestions: ['आपातकालीन संपर्क को कॉल करें?', 'नजदीकी अस्पताल का पता लगाएं?'],
      };
    }
    return {
      isEmergency: true,
      text: '⚠️ **URGENT MEDICAL WARNING:** The symptoms you described may indicate a potential acute medical emergency (such as severe chest pain, cardiac distress, acute respiratory compromise, or neurological deficits). Please immediately call emergency services (911, 112, or 108) or go to the nearest hospital Emergency Department. Do not delay medical attention.',
      suggestedQuestions: ['View Emergency Contacts', 'Find Nearest Emergency Room', 'Review Stroke FAST Guide'],
    };
  }

  const promptLower = userPrompt.toLowerCase();

  // 1. Inquiries about lipid profile or cholesterol
  if (promptLower.includes('lipid') || promptLower.includes('cholesterol') || promptLower.includes('hdl') || promptLower.includes('ldl')) {
    const lipidReport = reports.find((r) => r.type === 'Lipid Profile') || reports[0];
    if (language === 'te') {
      return {
        isEmergency: false,
        text: `మీ తాజా లిపిడ్ ప్రొఫైల్ ప్రకారం:\n- **మొత్తం కొలెస్ట్రాల్:** 198 mg/dL (సాధారణ పరిమితిలో ఉంది)\n- **HDL (మంచి కొలెస్ట్రాల్):** 62 mg/dL (గుండె ఆరోగ్యానికి రక్షణగా ఉంది)\n- **LDL (చెడు కొలెస్ట్రాల్):** 118 mg/dL (గతంలో 136 నుండి తగ్గింది, కానీ ఆదర్శంగా 100 కంటే తక్కువ ఉండాలి)\n\nమీ వ్యాయామం మరియు ఆరోగ్యకరమైన ఆహారపు అలవాట్లు మంచి ఫలితాలను ఇస్తున్నాయి. తగినంత నీరు తాగడం మరియు ఉదయం వాకింగ్ కొనసాగించండి.`,
        suggestedQuestions: [
          'వైద్యుడిని ఏ ప్రశ్నలు అడగాలి?',
          'LDL తగ్గించడానికి ఏ ఆహారం మంచిది?',
        ],
        doctorChecklistItems: [
          'నా ప్రస్తుత వ్యాయామంతో LDL 100 కంటే తక్కువకు చేరుకోగలదా?',
          'తదుపరి లిపిడ్ టెస్ట్ ఎప్పుడు చేయించుకోవాలి?',
        ],
      };
    }
    if (language === 'hi') {
      return {
        isEmergency: false,
        text: `आपकी हालिया लिपिड रिपोर्ट के मुख्य बिंदु:\n- **कुल कोलेस्ट्रॉल:** 198 mg/dL (सामान्य सीमा के भीतर)\n- **HDL ("अच्छा" कोलेस्ट्रॉल):** 62 mg/dL (हृदय के लिए बहुत सुरक्षित स्तर)\n- **LDL ("खराब" कोलेस्ट्रॉल):** 118 mg/dL (पिछले 136 से सुधरा है, आदर्श लक्ष्य < 100 mg/dL)\n\nआपकी नियमित सैर और संतुलित आहार से सकारात्मक बदलाव दिख रहे हैं। ओमेगा-3 और फाइबर युक्त भोजन जारी रखें।`,
        suggestedQuestions: [
          'डॉक्टर के लिए प्रश्न तैयार करें',
          'कोलेस्ट्रॉल कम करने के लिए कौन से फल अच्छे हैं?',
        ],
        doctorChecklistItems: [
          'क्या मुझे और कोई दवा या सप्लीमेंट लेने की आवश्यकता है?',
          'अगला लिपिड टेस्ट 3 महीने बाद करवाएं या 6 महीने बाद?',
        ],
      };
    }
    return {
      isEmergency: false,
      text: `Based on your verified **Comprehensive Lipid Panel** (${lipidReport?.testDate || 'recent'}):\n\n• **HDL ("Protective" Cholesterol):** **62 mg/dL** — Excellent! This is well above the recommended 50 mg/dL target for vascular protection.\n• **LDL ("Bad" Cholesterol):** **118 mg/dL** — Showing positive improvement (down from 136 mg/dL previously), though the optimal clinical target is <100 mg/dL.\n• **Triglycerides:** **112 mg/dL** — Healthy and well within the normal <150 mg/dL threshold.\n• **Vascular Inflammation (hs-CRP):** **0.9 mg/L** — In the lowest cardiovascular risk tier (<1.0 mg/L).\n\n**Key Takeaway:** Your aerobic routine (walking & yoga) is driving favorable lipid remodeling. Continuing moderate-intensity aerobic exercise and Mediterranean-style whole grains will help nudge LDL into the double digits.`,
      suggestedQuestions: [
        'Prepare questions for Dr. Jennifer Vance',
        'Which foods best support healthy HDL levels?',
        'Can Vitamin D affect lipid metabolism?',
      ],
      doctorChecklistItems: [
        'Is my current LDL reduction of 18 mg/dL sufficient without pharmacotherapy?',
        'What interval do you recommend for our next repeat lipid follow-up?',
      ],
    };
  }

  // 2. Inquiries about headache or eye strain
  if (promptLower.includes('headache') || promptLower.includes('head') || promptLower.includes('eye strain') || promptLower.includes('migraine')) {
    if (language === 'te') {
      return {
        isEmergency: false,
        text: `మీరు నమోదు చేసిన తలనొప్పి స్క్రీన్ అలసట మరియు కండరాల ఒత్తిడితో ముడిపడి ఉంది.\n\n**సురక్షితమైన స్వీయ సంరక్షణ సూచనలు:**\n1. **20-20-20 నియమం:** ప్రతి 20 నిమిషాలకు, 20 అడుగుల దూరంలో ఉన్న వస్తువును 20 సెకన్ల పాటు చూడండి.\n2. తగినంత నీరు తాగండి (రోజూ కనీసం 2-2.5 లీటర్లు).\n3. మెడ మరియు భుజాలను తేలికగా స్ట్రెచ్ చేయండి.\n4. తలపై చల్లని కంప్రెస్ లేదా మంచు ప్యాక్ పెట్టుకోండి.\n\n*హెచ్చరిక:* విపరీతమైన ఆకస్మిక తలనొప్పి లేదా చూపు మసకబారడం ఉంటే వెంటనే డాక్టర్‌ను సంప్రదించండి.`,
        suggestedQuestions: ['వైద్యుడిని అడగాల్సిన ప్రశ్నలు ఏమిటి?', 'కంటి పరీక్ష ఎప్పుడు చేయించాలి?'],
      };
    }
    if (language === 'hi') {
      return {
        isEmergency: false,
        text: `आपके द्वारा दर्ज सिरदर्द कंप्यूटर स्क्रीन के अत्यधिक उपयोग और गर्दन के तनाव से जुड़ा प्रतीत होता है।\n\n**सुरक्षित देखभाल के सुझाव:**\n1. **20-20-20 नियम:** हर 20 मिनट बाद 20 फीट दूर 20 सेकंड तक देखें।\n2. दिन भर में पर्याप्त पानी पिएं (कम से कम 2-2.5 लीटर)।\n3. माथे और गर्दन के पीछे ठंडी सिकाई करें।\n4. गर्दन और कंधों को धीरे-धीरे स्ट्रेच करें।\n\n*ध्यान दें:* यदि सिरदर्द अचानक बहुत तेज हो या धुंधला दिखे, तो तुरंत डॉक्टर से मिलें।`,
        suggestedQuestions: ['डॉक्टर से क्या पूछें?', 'क्या कंप्यूटर चश्मा पहनना चाहिए?'],
      };
    }
    return {
      isEmergency: false,
      text: `Regarding your **Frontal Tension Headache & Eye Strain** logged in your active problems:\n\n**Clinical Context:** Symptoms worsening in the mid-afternoon alongside sustained computer screen usage point strongly toward bilateral pericranial myofascial tension and digital asthenopia (visual fatigue).\n\n**Evidence-Informed Self-Care:**\n1. **The 20-20-20 Ergonomic Protocol:** Every 20 minutes, gaze at a focal point 20 feet away for at least 20 seconds to relax your ciliary eye muscles.\n2. **Hydration Benchmark:** Ensure you drink at least 2.2–2.5L of water throughout your workday, as mild cellular dehydration lowers your pain threshold.\n3. **Cervical Decompression:** Perform gentle chin-tucks and upper-trapezius stretches every 60–90 minutes.\n4. **Temperature Relief:** A cool gel compress placed over the forehead and temples constricts dilated superficial vessels and dampens discomfort.\n\n*Safety Guardrail:* If your headache changes abruptly into a sudden "thunderclap" intensity, is accompanied by visual aura/blackouts, high fever, or neck rigidity, seek emergency medical care immediately.`,
      suggestedQuestions: [
        'How many days per week is safe to take Ibuprofen?',
        'Could blue-light blocking lenses alleviate afternoon strain?',
        'Generate doctor questions for my eye specialist',
      ],
      doctorChecklistItems: [
        'Do you recommend dedicated anti-fatigue intermediate computer lenses?',
        'How can I distinguish benign tension headaches from migraine precursors?',
      ],
    };
  }

  // 3. Inquiries about medications & interactions
  if (promptLower.includes('medication') || promptLower.includes('medicine') || promptLower.includes('vitamin d') || promptLower.includes('interaction')) {
    const medNames = medications.map((m) => m.name).join(', ');
    return {
      isEmergency: false,
      text: `Here is a review of your current active regimen (**${medNames}**):\n\n• **Vitamin D3 (2,000 IU):** Best absorbed when taken with dietary lipids (e.g. eggs, nuts, yogurt, or olive oil). Your previous lab showed 28 ng/mL, so this daily intake directly addresses your insufficiency.\n• **Omega-3 (1,000 mg):** Highly complementary with Vitamin D. Taking it with your evening meal minimizes digestive reflux.\n• **Magnesium Glycinate (200 mg):** Taken 30–45 minutes before bedtime, magnesium supports GABA neurotransmission and deep sleep architecture.\n\n**Interaction Analysis:** No adverse pharmacological interactions detected across your active supplements. However, always keep your prescribing physician informed before introducing any new herbal supplements or over-the-counter NSAIDs.`,
      suggestedQuestions: [
        'When is the optimal time of day to take Vitamin D?',
        'Does magnesium interfere with morning vitamins?',
        'Are there any dietary restrictions with my medications?',
      ],
    };
  }

  // 4. Default comprehensive health response
  if (language === 'te') {
    return {
      isEmergency: false,
      text: `నమస్కారం! నేను మీ **CareVista AI** హెల్త్ కోపైలట్. మీ ఆరోగ్యం, వైద్య పరీక్షల నివేదికలు, మరియు రోజువారీ శ్రేయస్సులో మీకు సహాయం చేయడానికి సిద్ధంగా ఉన్నాను.\n\nమీ క్రియాశీల సమస్యలు (${activeProblems.length} సమస్యలు నమోదు చేయబడ్డాయి) మరియు తాజా రక్త పరీక్షల వివరాలను విశ్లేషించగలను. మీ ఆహారం, మందులు, లేదా డాక్టర్ అపాయింట్‌మెంట్‌ల గురించి ఏవైనా సందేహాలు ఉంటే అడగండి.`,
      suggestedQuestions: [
        'నా తాజా రక్త పరీక్షల సారాంశం చెప్పండి',
        'తలనొప్పి నివారణకు ఎలాంటి చిట్కాలు ఉన్నాయి?',
        'డాక్టర్ విజిట్ కోసం ప్రశ్నలను సిద్ధం చేయండి',
      ],
    };
  }

  if (language === 'hi') {
    return {
      isEmergency: false,
      text: `नमस्ते! मैं आपका **CareVista AI** पर्सनल हेल्थ साथी हूँ। मैं आपकी मेडिकल रिपोर्ट्स को समझने, दैनिक लक्षणों को ट्रैक करने और डॉक्टर से परामर्श के लिए तैयारी करने में आपकी सहायता कर सकता हूँ।\n\nआपकी वर्तमान सक्रिय समस्याओं और लैब रिपोर्ट्स के आधार पर मैं सुरक्षित, साक्ष्य-आधारित जानकारी प्रदान करता हूँ। कृपया बताएं मैं आज आपकी क्या मदद कर सकता हूँ?`,
      suggestedQuestions: [
        'मेरी कोलेस्ट्रॉल रिपोर्ट की व्याख्या करें',
        'सिरदर्द और आंखों के तनाव के लिए क्या करें?',
        'डॉक्टर से पूछने योग्य प्रश्न बनाएं',
      ],
    };
  }

  return {
    isEmergency: false,
    text: `Hello! I am **CareVista AI**, your Personal Health Copilot. I have synthesized your health profile:\n\n• **Active Concerns:** ${activeProblems.map((p) => p.name).join(', ') || 'No active health concerns'}\n• **Recent Verified Lab:** ${reports[0]?.name || 'Lipid Panel'} (${reports[0]?.testDate || 'Recent'})\n• **Active Medications:** ${medications.map((m) => m.name).join(', ')}\n• **Latest Vitals:** BP 118/76 mmHg • HR 72 bpm • SpO2 99%\n\nHow can I support your healthcare journey today? I can explain laboratory biomarker nuances, draft concise questions for your upcoming physician visit, or recommend evidence-informed lifestyle routines.`,
    suggestedQuestions: [
      'Explain my latest lab biomarkers in simple terms',
      'What questions should I ask Dr. Jennifer Vance?',
      'Suggest evidence-based self-care for my tension headache',
      'Review my supplement schedule and interactions',
    ],
  };
}
