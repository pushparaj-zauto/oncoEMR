import {
  OncologyPatient,
  DiagnosticEvent,
  PendingAction,
} from '../types/oncology';

// Mock Oncology Patient 1 - Diagnostic Evaluation Stage
export const mockOncoPatient1: OncologyPatient = {
  id: 'ONC-001',
  name: 'Ramesh Kumar',
  mrn: '102334',
  age: 58,
  gender: 'Male',
  cancerSite: 'Lung',
  histology: 'Adenocarcinoma',
  stage: 'IV',
  tnmStage: 'T3N2M1',
  ecogStatus: 2,
  oncoStatus: 'Diagnostic Evaluation',
  urgencyFlag: true,
  chiefComplaint: 'Persistent cough with hemoptysis',
  historyOfPresentIllness: '58-year-old male with a 3-month history of progressive dry cough, recently productive with blood-tinged sputum. Reports 10kg weight loss, night sweats, and fatigue. No history of fever or chest pain.',
  symptomDuration: '3 months',
  alarmSymptoms: true,
  
  vitals: {
    bp: '138/88',
    hr: 82,
    temp: 36.8,
    resp: 20,
    spo2: 96,
    height: 172,
    weight: 65,
    bmi: 22.0
  },

  patientHistory: {
    medical: ['Hypertension (10 years)', 'Type 2 Diabetes (5 years)'],
    family: ['Father died of lung cancer at 65', 'Mother has hypertension'],
    social: ['Smoker (20 pack-years)', 'Social drinker', 'Factory worker']
  },
  
  diagnosticTracker: {
    biopsy: 'Done',
    imaging: 'Done',
    metastaticWorkup: 'Pending',
    tumorMarkers: 'Done',
  },
  
  clinicalFindings: {
    primaryLesion: '4.5 cm mass in right upper lobe',
    nodes: 'Present',
    suspectedMetastasis: true,
  },
  
  provisionalAssessment: {
    probableDiagnosis: 'Lung Adenocarcinoma',
    tentativeStage: 'Stage IV (Metastatic)',
    resectable: 'No',
  },
  
  comorbidities: {
    diabetes: true,
    cardiacDisease: false,
    renalDisease: false,
    priorCancer: false,
  },
  
  alerts: [
    {
      type: 'Suspected Advanced Disease',
      message: 'Suspected liver metastasis on imaging',
    },
    {
      type: 'Severe Symptoms',
      message: 'Significant hemoptysis requiring urgent evaluation',
    },
  ],
  
  diagnosisDate: '2026-01-15',
};

// Mock Oncology Patient 2 - Treatment Planning Stage
export const mockOncoPatient2: OncologyPatient = {
  id: 'ONC-002',
  name: 'Priya Sharma',
  mrn: '103445',
  age: 45,
  gender: 'Female',
  cancerSite: 'Breast',
  histology: 'Invasive Ductal Carcinoma',
  stage: 'IIIA',
  tnmStage: 'T2N2M0',
  ecogStatus: 0,
  oncoStatus: 'Treatment Planning',
  urgencyFlag: false,

  chiefComplaint: 'Painless lump in left breast',
  historyOfPresentIllness: '45-year-old female noticed a lump in left breast during self-exam 2 months ago. No skin changes or nipple discharge. Reports mild tenderness.',
  symptomDuration: '2 months',
  
  vitals: {
    bp: '120/75',
    hr: 74,
    temp: 36.6,
    resp: 16,
    spo2: 99,
    height: 160,
    weight: 58,
    bmi: 22.7
  },

  patientHistory: {
    medical: ['Hypothyroidism', 'Migraines'],
    family: ['Maternal aunt had breast cancer at 50'],
    social: ['Non-smoker', 'Occasional alcohol', 'School teacher']
  },
  
  diagnosticTracker: {
    biopsy: 'Confirmed',
    imaging: 'Done',
    metastaticWorkup: 'Done',
    tumorMarkers: 'Done',
  },
  
  clinicalFindings: {
    primaryLesion: '3.2 cm mass in upper outer quadrant, left breast',
    nodes: 'Present',
    suspectedMetastasis: false,
  },
  
  provisionalAssessment: {
    probableDiagnosis: 'Breast Cancer (ER+, PR+, HER2-)',
    tentativeStage: 'Stage IIIA',
    resectable: 'Yes',
  },
  
  mdtDecision: {
    status: 'Approved',
    date: '2026-02-01',
    summary: 'Neoadjuvant chemotherapy followed by surgery and adjuvant radiation',
    participants: ['Dr. Mehta (Onco)', 'Dr. Rao (Surgeon)', 'Dr. Patel (Radio)'],
  },
  
  treatmentStrategy: {
    surgery: true,
    systemicTherapy: true,
    radiation: true,
    sequence: 'Neoadjuvant Chemo → Surgery → Adjuvant Radiation + Hormonal',
  },
  
  comorbidities: {
    diabetes: false,
    cardiacDisease: false,
    renalDisease: false,
    priorCancer: false,
  },
  
  diagnosisDate: '2026-01-20',
};

// Mock Oncology Patient 3 - On Chemotherapy (Induction)
export const mockOncoPatient3: OncologyPatient = {
  id: 'ONC-003',
  name: 'Suresh Patel',
  mrn: '104556',
  age: 62,
  gender: 'Male',
  cancerSite: 'Colon',
  histology: 'Adenocarcinoma',
  stage: 'III',
  tnmStage: 'T3N1M0',
  ecogStatus: 1,
  treatmentIntent: 'Curative',
  oncoStatus: 'Induction',
  urgencyFlag: false,

  chiefComplaint: 'Blood in stool and abdominal pain',
  historyOfPresentIllness: '62-year-old male with 4-month history of altered bowel habits and intermittent rectal bleeding. Colonoscopy confirmed mass in sigmoid colon.',
  symptomDuration: '4 months',
  
  vitals: {
    bp: '130/85',
    hr: 78,
    temp: 37.0,
    resp: 18,
    spo2: 97,
    height: 175,
    weight: 78,
    bmi: 25.5
  },

  patientHistory: {
    medical: ['Hyperlipidemia', 'Hemorrhoids'],
    family: ['No history of CRC in first-degree relatives'],
    social: ['Ex-smoker (quit 10 years ago)', 'Moderate alcohol intake']
  },
  
  diagnosticTracker: {
    biopsy: 'Confirmed',
    imaging: 'Done',
    metastaticWorkup: 'Done',
    tumorMarkers: 'Done',
  },
  
  mdtDecision: {
    status: 'Approved',
    date: '2026-01-10',
    summary: 'FOLFOX chemotherapy for 12 cycles post-surgery',
  },
  
  treatmentStrategy: {
    surgery: true,
    systemicTherapy: true,
    radiation: false,
    sequence: 'Surgery completed → Adjuvant FOLFOX',
  },
  
  currentProtocol: {
    name: 'FOLFOX',
    cycles: 12,
    cycleFrequency: 14,
    startDate: '2026-01-25',
    drugs: [
      { name: 'Oxaliplatin', doseBasis: 'BSA', dose: '85 mg/m²', day: 'D1', status: 'Given' },
      { name: 'Leucovorin', doseBasis: 'BSA', dose: '400 mg/m²', day: 'D1', status: 'Given' },
      { name: '5-FU Bolus', doseBasis: 'BSA', dose: '400 mg/m²', day: 'D1', status: 'Given' },
      { name: '5-FU Infusion', doseBasis: 'BSA', dose: '2400 mg/m²', day: 'D1-D2', status: 'Given' },
    ],
  },
  
  cycleOutcomes: [
    {
      cycleNumber: 1,
      response: 'Stable Disease',
      toxicity: 'Grade 1',
      toxicityDescription: 'Mild nausea, well controlled',
      decision: 'Proceed with Cycle 2',
      date: '2026-01-25',
      qolImpact: 'Stable',
      notes: 'Patient tolerating well, good compliance',
    },
    {
      cycleNumber: 2,
      response: 'Stable Disease',
      toxicity: 'Grade 2',
      toxicityDescription: 'Peripheral neuropathy in fingers',
      decision: 'Continue protocol, monitor neuropathy',
      date: '2026-02-08',
      qolImpact: 'Stable',
    },
  ],
  
  comorbidities: {
    diabetes: false,
    cardiacDisease: false,
    renalDisease: false,
    priorCancer: false,
  },
  
  diagnosisDate: '2025-12-15',
  treatmentStartDate: '2026-01-25',
  lastReviewDate: '2026-02-08',
};

// Mock Oncology Patient 4 - Palliative Care
export const mockOncoPatient4: OncologyPatient = {
  id: 'ONC-004',
  name: 'Anjali Desai',
  mrn: '105667',
  age: 58,
  gender: 'Female',
  cancerSite: 'Lung',
  histology: 'Adenocarcinoma',
  stage: 'IV',
  tnmStage: 'T4N3M1b',
  ecogStatus: 2,
  treatmentIntent: 'Palliative',
  oncoStatus: 'Palliative',
  urgencyFlag: false,
  
  chiefComplaint: 'Severe shortness of breath and chest pain',
  historyOfPresentIllness: '58-year-old female with known metastatic lung cancer, presenting with worsening dyspnea and pleuritic chest pain. CT shows pleural effusion.',
  symptomDuration: 'Worsening over 2 weeks',

  vitals: {
    bp: '110/70',
    hr: 105,
    temp: 37.2,
    resp: 28,
    spo2: 92,
    height: 155,
    weight: 48,
    bmi: 20.0
  },

  patientHistory: {
    medical: ['COPD', 'Hypertension', 'T2DM'],
    family: ['No significant history'],
    social: ['Lives alone', 'Supported by daughter']
  },
  
  diagnosticTracker: {
    biopsy: 'Confirmed',
    imaging: 'Done',
    metastaticWorkup: 'Done',
    tumorMarkers: 'Done',
  },
  
  mdtDecision: {
    status: 'Approved',
    date: '2026-01-05',
    summary: 'Palliative chemotherapy with supportive care focus',
  },
  
  treatmentStrategy: {
    surgery: false,
    systemicTherapy: true,
    radiation: false,
    sequence: 'Palliative Carboplatin + Paclitaxel',
  },
  
  currentProtocol: {
    name: 'Carboplatin + Paclitaxel',
    cycles: 6,
    cycleFrequency: 21,
    startDate: '2026-01-15',
    drugs: [
      { name: 'Carboplatin', doseBasis: 'AUC', dose: 'AUC 5', day: 'D1', status: 'Given' },
      { name: 'Paclitaxel', doseBasis: 'BSA', dose: '175 mg/m²', day: 'D1', status: 'Given' },
      { name: 'Dexamethasone', doseBasis: 'Fixed', dose: '12 mg', day: 'D1', status: 'Given' },
    ],
  },
  
  cycleOutcomes: [
    {
      cycleNumber: 1,
      response: 'Partial Response',
      toxicity: 'Grade 2',
      toxicityDescription: 'Neuropathy, manageable',
      decision: 'Continue treatment',
      date: '2026-01-15',
      qolImpact: 'Improved',
      notes: 'Pain score reduced from 7 to 4',
    },
    {
      cycleNumber: 2,
      response: 'Partial Response',
      toxicity: 'Grade 2',
      toxicityDescription: 'Peripheral neuropathy persists',
      decision: 'Continue, monitor symptoms',
      date: '2026-02-05',
      qolImpact: 'Improved',
      notes: 'Breathing improved, appetite better',
    },
  ],
  
  qolMetrics: {
    painScore: 3,
    symptoms: {
      pain: true,
      fatigue: true,
      nausea: false,
      breathlessness: true,
      anxiety: false,
    },
    mobility: 'Partially Independent',
    sleep: 'Fair',
    dailyActivity: 'Partially Independent',
    appetite: 'Fair',
  },
  
  comorbidities: {
    diabetes: true,
    cardiacDisease: true,
    renalDisease: false,
    priorCancer: false,
  },
  
  diagnosisDate: '2025-12-01',
  treatmentStartDate: '2026-01-15',
  lastReviewDate: '2026-02-05',
};

// Mock Oncology Patient 5 - Maintenance Therapy
export const mockOncoPatient5: OncologyPatient = {
  id: 'ONC-005',
  name: 'Vikram Singh',
  mrn: '106778',
  age: 55,
  gender: 'Male',
  cancerSite: 'Lung',
  histology: 'Adenocarcinoma (EGFR+)',
  stage: 'IV',
  tnmStage: 'T2N1M1a',
  ecogStatus: 1,
  treatmentIntent: 'Disease Control',
  oncoStatus: 'Maintenance',
  urgencyFlag: false,

  chiefComplaint: 'Routine follow-up',
  historyOfPresentIllness: '55-year-old male on maintenance Osimertinib. Asymptomatic at present. Tolerating therapy well.',
  symptomDuration: 'N/A',

  vitals: {
    bp: '124/80',
    hr: 70,
    temp: 36.5,
    resp: 16,
    spo2: 98,
    height: 170,
    weight: 70,
    bmi: 24.2
  },

  patientHistory: {
    medical: ['None significant'],
    family: ['Father died of MI at 60'],
    social: ['Non-smoker', 'Non-drinker', 'Yoga instructor']
  },
  
  diagnosticTracker: {
    biopsy: 'Confirmed',
    imaging: 'Done',
    metastaticWorkup: 'Done',
    tumorMarkers: 'Done',
  },
  
  mdtDecision: {
    status: 'Approved',
    date: '2025-10-15',
    summary: 'Targeted therapy with Osimertinib, continue until progression',
  },
  
  treatmentStrategy: {
    surgery: false,
    systemicTherapy: true,
    radiation: false,
    sequence: 'Maintenance Osimertinib',
  },
  
  qolMetrics: {
    painScore: 1,
    symptoms: {
      pain: false,
      fatigue: false,
      nausea: false,
      breathlessness: false,
      anxiety: false,
    },
    mobility: 'Independent',
    sleep: 'Good',
    dailyActivity: 'Independent',
    appetite: 'Good',
  },
  
  comorbidities: {
    diabetes: false,
    cardiacDisease: false,
    renalDisease: false,
    priorCancer: false,
  },
  
  diagnosisDate: '2025-09-01',
  treatmentStartDate: '2025-10-20',
  lastReviewDate: '2026-02-01',
};

// Diagnostic Events Timeline
export const mockDiagnosticEvents: DiagnosticEvent[] = [
  { type: 'CT Chest', date: '2026-01-12', result: '4.5 cm mass right upper lobe', status: 'Done' },
  { type: 'Biopsy', date: '2026-01-14', result: 'Adenocarcinoma confirmed', status: 'Done' },
  { type: 'PET Scan', date: '2026-01-18', result: 'Hypermetabolic lesion, SUV 8.5', status: 'Done' },
  { type: 'Liver Imaging', date: '2026-01-20', status: 'Pending' },
];

// Pending Actions
export const mockPendingActions: PendingAction[] = [
  { action: 'Complete metastatic workup - Liver MRI pending', priority: 'High' },
  { action: 'Schedule MDT discussion after pending reports', priority: 'High' },
  { action: 'Baseline cardiac evaluation', priority: 'Medium' },
  { action: 'Genetic counseling referral', priority: 'Low' },
];

export const allPatients: OncologyPatient[] = [
  mockOncoPatient1,
  mockOncoPatient2,
  mockOncoPatient3,
  mockOncoPatient4,
  mockOncoPatient5,
];
