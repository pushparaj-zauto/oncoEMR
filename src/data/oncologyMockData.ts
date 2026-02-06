import {
  OncologyPatient,
  DiagnosticEvent,
  PendingAction,
} from '../types/oncology';

// 1. Diagnostic Evaluation - Suspected Lung Cancer
export const mockOncoPatient1: OncologyPatient = {
  id: 'ONC-001',
  name: 'Arjun Nair',
  mrn: '240101',
  age: 62,
  gender: 'Male',
  cancerSite: 'Lung',
  histology: 'Suspected Adenocarcinoma',
  stage: 'TBD',
  tnmStage: 'cT4N2M1a',
  ecogStatus: 1,
  oncoStatus: 'Diagnostic Evaluation',
  urgencyFlag: true,
  chiefComplaint: 'Cough with blood-streaked sputum',
  historyOfPresentIllness: '62yo male, chronic smoker (40PY), presenting with 3-week history of hemoptysis and 5kg weight loss. CT Chest showed 4.2cm RUL mass with pleural effusion.',
  symptomDuration: '3 weeks',
  alarmSymptoms: true,
  
  vitals: {
    bp: '142/88',
    hr: 86,
    temp: 36.9,
    resp: 22,
    spo2: 95,
    height: 175,
    weight: 68,
    bmi: 22.2
  },

  patientHistory: {
    medical: ['Hypertension', 'COPD (GOLD Stage II)'],
    family: ['No history of lung cancer'],
    social: ['Current smoker', 'Retired railway clerk']
  },
  
  diagnosticTracker: {
    biopsy: 'Pending',
    imaging: 'Done',
    metastaticWorkup: 'Pending',
    tumorMarkers: 'Pending',
  },
  
  clinicalFindings: {
    primaryLesion: '4.2 cm mass RUL',
    nodes: 'Mediastinal lymphadenopathy',
    suspectedMetastasis: true,
  },
  
  provisionalAssessment: {
    probableDiagnosis: 'Non-Small Cell Lung Cancer',
    tentativeStage: 'Stage IVA',
    resectable: 'Unlikely',
  },
  
  comorbidities: {
    diabetes: false,
    cardiacDisease: true,
    renalDisease: false,
    priorCancer: false,
  },
  
  alerts: [
    {
      type: 'Urgent Action',
      message: 'Pleural fluid cytology pending - required for staging',
    },
  ],
  
  diagnosisDate: '2026-02-01',
};

// 2. Treatment Planning - Breast Cancer
export const mockOncoPatient2: OncologyPatient = {
  id: 'ONC-002',
  name: 'Priya Sharma',
  mrn: '240102',
  age: 45,
  gender: 'Female',
  cancerSite: 'Breast',
  histology: 'Invasive Ductal Carcinoma',
  stage: 'IIIA',
  tnmStage: 'cT3N1M0',
  ecogStatus: 0,
  oncoStatus: 'Treatment Planning',
  urgencyFlag: false,

  chiefComplaint: 'Lump in left breast',
  historyOfPresentIllness: '45yo female, self-detected lump. Mammogram BIRADS 5. Core biopsy confirmed IDC, ER+/PR+, HER2-.',
  symptomDuration: '1 month',
  
  vitals: {
    bp: '118/74',
    hr: 72,
    temp: 36.6,
    resp: 16,
    spo2: 99,
    height: 162,
    weight: 60,
    bmi: 22.8
  },

  patientHistory: {
    medical: ['None'],
    family: ['Maternal aunt - Breast Ca at 50'],
    social: ['School teacher', 'Non-smoker']
  },
  
  diagnosticTracker: {
    biopsy: 'Confirmed',
    imaging: 'Done',
    metastaticWorkup: 'Done',
    tumorMarkers: 'Done',
  },
  
  clinicalFindings: {
    primaryLesion: '5.5 cm mass LUQ',
    nodes: 'Palpable axillary node',
    suspectedMetastasis: false,
  },
  
  provisionalAssessment: {
    probableDiagnosis: 'Breast Cancer (Luminal B)',
    tentativeStage: 'Stage IIIA',
    resectable: 'Yes (post-neoadjuvant)',
  },
  
  mdtDecision: {
    status: 'Approved',
    date: '2026-02-05',
    summary: 'Neoadjuvant AC-T chemotherapy -> Surgery -> Radiation + Hormone Therapy',
    participants: ['Dr. Rao (Med Onco)', 'Dr. Sarah (Surg Onco)'],
  },
  
  treatmentStrategy: {
    surgery: true,
    systemicTherapy: true,
    radiation: true,
    sequence: 'Neoadjuvant Chemo',
  },
  
  diagnosisDate: '2026-01-25',
};

// 3. Active Treatment (Induction) - Colon Cancer
export const mockOncoPatient3: OncologyPatient = {
  id: 'ONC-003',
  name: 'Suresh Patel',
  mrn: '240103',
  age: 58,
  gender: 'Male',
  cancerSite: 'Colon',
  histology: 'Adenocarcinoma',
  stage: 'III',
  tnmStage: 'pT3N1M0',
  ecogStatus: 0,
  treatmentIntent: 'Curative',
  oncoStatus: 'Induction',

  chiefComplaint: 'Post-op follow up, Cycle 2 Chemo',
  historyOfPresentIllness: 'Status post hemicolectomy for Sigmoid colon cancer. 3/15 LN positive. Now on Adjuvant FOLFOX.',
  symptomDuration: 'N/A',
  
  vitals: {
    bp: '130/80',
    hr: 78,
    temp: 36.8,
    resp: 18,
    spo2: 98,
    height: 170,
    weight: 74,
    bmi: 25.6
  },

  patientHistory: {
    medical: ['Diabetes Type 2', 'Hyperlipidemia'],
    family: ['No history of CRC'],
    social: ['Businessman', 'Occasional alcohol']
  },
  
  currentProtocol: {
    name: 'mFOLFOX6',
    cycles: 12,
    cycleFrequency: 14,
    startDate: '2026-01-10',
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
      response: 'N/A (Adjuvant)',
      toxicity: 'Grade 1',
      toxicityDescription: 'Cold sensitivity (Oxaliplatin)',
      decision: 'Proceed',
      date: '2026-01-10',
      qolImpact: 'Stable',
    },
    {
      cycleNumber: 2,
      response: 'N/A',
      toxicity: 'Grade 1',
      toxicityDescription: 'Mild fatigue',
      decision: 'Proceed',
      date: '2026-01-24',
      qolImpact: 'Stable',
    }
  ],
  
  diagnosisDate: '2025-12-10',
  treatmentStartDate: '2026-01-10',
};

// 4. Palliative Care - Pancreatic Cancer
export const mockOncoPatient4: OncologyPatient = {
  id: 'ONC-004',
  name: 'Anjali Desai',
  mrn: '240104',
  age: 68,
  gender: 'Female',
  cancerSite: 'Pancreas',
  histology: 'Ductal Adenocarcinoma',
  stage: 'IV',
  tnmStage: 'cT4N1M1',
  ecogStatus: 2,
  treatmentIntent: 'Palliative',
  oncoStatus: 'Palliative',
  urgencyFlag: true,

  chiefComplaint: 'Severe abdominal pain and jaundice',
  historyOfPresentIllness: 'Metastatic pancreatic ca (Liver mets). Stent placed for biliary obstruction. Failing FOLFIRINOX, switched to Gemcitabine/Abraxane. Pain control main issue.',
  symptomDuration: 'Chronic',

  vitals: {
    bp: '110/70',
    hr: 92,
    temp: 36.5,
    resp: 20,
    spo2: 94,
    height: 155,
    weight: 48,
    bmi: 19.9
  },

  qolMetrics: {
    painScore: 7,
    symptoms: {
      pain: true,
      fatigue: true,
      nausea: true,
      breathlessness: false,
      anxiety: true,
    },
    mobility: 'Requires Assistance',
    appetite: 'Poor',
    sleep: 'Poor',
    dailyActivity: 'Dependent',
  },
  
  currentProtocol: {
    name: 'Gemcitabine + Nab-Paclitaxel',
    cycles: 6,
    cycleFrequency: 28, // Days 1, 8, 15
    startDate: '2026-01-05',
    drugs: [
      { name: 'Gemcitabine', doseBasis: 'BSA', dose: '1000 mg/m²', day: 'D1, D8, D15', status: 'Pending D15' },
    ],
  },
  
  diagnosisDate: '2025-10-15',
};

// 5. Maintenance - Lung Cancer (Targeted Therapy)
export const mockOncoPatient5: OncologyPatient = {
  id: 'ONC-005',
  name: 'Vikram Singh',
  mrn: '240105',
  age: 55,
  gender: 'Male',
  cancerSite: 'Lung',
  histology: 'Adenocarcinoma (EGFR Exon 19 del)',
  stage: 'IV',
  tnmStage: 'cT2N2M1b',
  ecogStatus: 0,
  treatmentIntent: 'Disease Control',
  oncoStatus: 'Maintenance',

  chiefComplaint: 'Routine follow-up',
  historyOfPresentIllness: 'Metastatic EGFR+ Lung Ca. On Osimertinib 80mg OD for 14 months. Last scan showed Stable Disease. Complains of mild dry skin.',
  symptomDuration: 'N/A',

  diagnosticTracker: {
    biopsy: 'Confirmed',
    imaging: 'Done',
    metastaticWorkup: 'Done',
    tumorMarkers: 'Done',
  },
  
  clinicalFindings: {
    primaryLesion: '3.5 cm in RLL',
    nodes: 'Mediastinal LN',
    suspectedMetastasis: true,
  },
  
  provisionalAssessment: {
    probableDiagnosis: 'Lung Adenocarcinoma',
    tentativeStage: 'Stage IV',
    resectable: 'No',
  },

  currentProtocol: {
    name: 'Osimertinib Maintenance',
    cycles: 14,
    cycleFrequency: 30,
    startDate: '2024-12-05',
    drugs: [
      { name: 'Osimertinib', doseBasis: 'Fixed', dose: '80 mg', day: 'Daily', status: 'Given' },
    ],
  },
  
  vitals: {
    bp: '122/78',
    hr: 70,
    temp: 36.6,
    resp: 16,
    spo2: 98,
    height: 172,
    weight: 71,
    bmi: 24.0
  },
  
  treatmentStrategy: {
    surgery: false,
    systemicTherapy: true,
    radiation: false,
    sequence: 'Maintenance TKI',
  },
  
  diagnosisDate: '2024-11-20',
  treatmentStartDate: '2024-12-05',
  lastReviewDate: '2026-01-15',
};

// 6. Survivorship - Hodgkin Lymphoma
export const mockOncoPatient6: OncologyPatient = {
  id: 'ONC-006',
  name: 'Meera Reddy',
  mrn: '240106',
  age: 26,
  gender: 'Female',
  cancerSite: 'Lymphoma',
  histology: 'Hodgkin Lymphoma (Nodular Sclerosis)',
  stage: 'Remission',
  tnmStage: 'Stage IIA',
  ecogStatus: 0,
  treatmentIntent: 'Curative',
  oncoStatus: 'Observation', // Changed to Observation for strict surveillance flow

  chiefComplaint: 'Annual Surveillance',
  historyOfPresentIllness: 'Completed 4 cycles ABVD in 2024. PET-CT complete metabolic response (Deauville 1). No B symptoms.',
  symptomDuration: 'N/A',

  vitals: {
    bp: '110/65',
    hr: 68,
    temp: 36.7,
    resp: 14,
    spo2: 100,
    height: 160,
    weight: 56,
    bmi: 21.9
  },

  diagnosisDate: '2024-02-10',
  lastReviewDate: '2026-02-01',
};

// 7. Generic EMR - Non-Oncology / Discharged
export const mockOncoPatient7: OncologyPatient = {
  id: 'GEN-001',
  name: 'Rajesh Gupta',
  mrn: '240107',
  age: 34,
  gender: 'Male',
  cancerSite: 'Benign',
  histology: 'Reactive Lymphadenitis',
  stage: 'N/A',
  tnmStage: 'N/A',
  ecogStatus: 0,
  oncoStatus: 'Discharged',
  treatmentIntent: 'None',

  chiefComplaint: 'Neck swelling',
  historyOfPresentIllness: 'Referred for prolonged cervical lymphadenopathy. Excision biopsy performed.',
  symptomDuration: '2 months',

  vitals: {
    bp: '120/80',
    hr: 76,
    temp: 37.0,
    resp: 16,
    spo2: 99,
    height: 178,
    weight: 80,
    bmi: 25.2
  },

  diagnosticTracker: {
    biopsy: 'Confirmed Benign',
    imaging: 'Done',
    metastaticWorkup: 'Not Indicated', 
    tumorMarkers: 'Normal',
  },
  
  clinicalFindings: {
    primaryLesion: 'Enlarged cervical LN',
    nodes: 'Reactive features',
    suspectedMetastasis: false,
  },

  mdtDecision: {
    status: 'Approved',
    date: '2026-02-04',
    summary: 'Benign pathology. No evidence of malignancy. Discharge to primary care.',
  },

  diagnosisDate: '2026-02-02',
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
  mockOncoPatient5, // Maintenance (5 steps)
  mockOncoPatient3, // Induction (4 steps)
  mockOncoPatient2, // Planning (3 steps)
  mockOncoPatient6, // Observation (3 steps - Survivorship)
  mockOncoPatient4, // Palliative (3 steps - Specialized)
  mockOncoPatient1, // Diagnostic (2 steps)
  mockOncoPatient7, // Discharged (2 steps)
];
