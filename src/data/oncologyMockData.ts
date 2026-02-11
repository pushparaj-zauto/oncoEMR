import {
  OncologyPatient,
  DiagnosticEvent,
  PendingAction,
  VisitRecord,
} from '../types/oncology';

// 1. Treatment Planning - Breast Cancer
export const mockOncoPatient5: OncologyPatient = {
  id: 'ONC-002',
  name: 'Mrs. Kavitha',
  mrn: '240102',
  age: 45,
  gender: 'Female',
  cancerSite: 'Breast',
  histology: 'Invasive Ductal Carcinoma',
  stage: 'IIIA',
  tnmStage: 'cT3N1M0',
  ecogStatus: 0,
  treatmentIntent: 'Curative',
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
    medical: ['None', 'NKA'],
    family: ['Maternal aunt - Breast Ca at 50'],
    social: ['School teacher', 'Non-smoker', 'Married, 2 children']
  },
  
  diagnosticTracker: {
    biopsy: 'Confirmed',
    imaging: 'Done',
    metastaticWorkup: 'Pending',
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
  
  histopathology: {
    type: 'Invasive Ductal Carcinoma',
    grade: 'Grade II',
    margins: 'Not applicable (pre-surgery)',
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
  
  comorbidities: {
    diabetes: false,
    cardiacDisease: false,
    renalDisease: false,
    priorCancer: false,
  },

  alerts: [
    {
      type: 'Urgent Action',
      message: 'Counseling for Fertility Preservation before Chemo start'
    }
  ],

  diagnosisDate: '2026-01-25',
};

// 2. Active Treatment (Induction) - Colon Cancer
export const mockOncoPatient2: OncologyPatient = {
  id: 'ONC-003',
  name: 'Mr. Kishore',
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
    bp: '134/84',
    hr: 88,
    temp: 36.9,
    resp: 18,
    spo2: 97,
    height: 170,
    weight: 72,
    bmi: 24.9,
    glucose: 168 // Elevated due to steroid pre-medication
  },

  patientHistory: {
    medical: ['Diabetes Type 2', 'Hyperlipidemia', 'Allergy: Sulfa drugs'],
    family: ['No history of CRC'],
    social: ['Businessman', 'Occasional alcohol']
  },
  
  diagnosticTracker: {
      biopsy: 'Confirmed',
      imaging: 'Done',
      metastaticWorkup: 'Done',
      tumorMarkers: 'Done'
  },

  clinicalFindings: {
      primaryLesion: 'Resected Sigmoid Mass',
      nodes: '3/15 Positive',
      suspectedMetastasis: false
  },

  provisionalAssessment: {
    probableDiagnosis: 'Colon Adenocarcinoma',
    tentativeStage: 'Stage III',
    resectable: 'Yes (Resected)',
  },
  
  histopathology: {
    type: 'Adenocarcinoma',
    grade: 'Moderately differentiated',
    margins: 'Clear',
  },

  mdtDecision: {
    status: 'Approved',
    date: '2025-12-15',
    summary: 'Upfront Surgery (Done) -> Adjuvant FOLFOX x6 months -> Surveillance',
    participants: ['Dr. Rao (Med Onco)', 'Dr. Sarah (Surg Onco)', 'Dr. Pathak (Pathology)']
  },
  
  treatmentStrategy: {
    surgery: true,
    systemicTherapy: true,
    radiation: false,
    sequence: 'Surgery -> Adjuvant Chemo',
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
    maintenanceRationale: 'Adjuvant therapy to eradicate micrometastases',
    timeOnTherapy: '1 Month',
    totalExposure: '2 Cycles',
    doseInterruptions: 'None',
    stopCriteria: [
      'Completion of 6 months therapy',
      'Severe Neuropathy (Grade 3+)',
      'Disease Recurrence'
    ]
  },

  preCycleLabs: {
    date: '2026-02-07',
    cbc: {
      wbc: 5.8,
      anc: 3200,
      hgb: 11.8,
      platelets: 185000
    },
    chemistry: {
      creatinine: 0.9,
      bilirubin: 0.7,
      alt: 28,
      ast: 32
    },
    tumorMarkers: {
      cea: 4.2 // Down from 12.5 at diagnosis
    }
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

  comorbidities: {
      diabetes: true,
      cardiacDisease: false,
      renalDisease: false,
      priorCancer: false
  },
  
  alerts: [
      {
          type: 'Urgent Action',
          message: 'Monitor blood glucose during steroid administration'
      }
  ],
  
  diagnosisDate: '2025-12-10',
  treatmentStartDate: '2026-01-10',
};

// 4. Palliative Care - Pancreatic Cancer
export const mockOncoPatient4: OncologyPatient = {
  id: 'ONC-004',
  name: 'Mrs. Lakshmi',
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
    bp: '98/62',
    hr: 102,
    temp: 37.2,
    resp: 22,
    spo2: 92,
    height: 155,
    weight: 44, // Lost 4kg in last month
    bmi: 18.3
  },

  patientHistory: {
      medical: ['Hypothyroidism', 'Osteoporosis'],
      family: ['Unknown'],
      social: ['Widow', 'Lives with daughter']
  },

  diagnosticTracker: {
    biopsy: 'Confirmed',
    imaging: 'Done',
    metastaticWorkup: 'Done',
    tumorMarkers: 'Done',
  },

  clinicalFindings: {
    primaryLesion: 'Pancreatic Head Mass (Stented)',
    nodes: 'Retroperitoneal LN',
    suspectedMetastasis: true,
  },
  
  provisionalAssessment: {
    probableDiagnosis: 'Metastatic Pancreatic Adenocarcinoma',
    tentativeStage: 'Stage IV',
    resectable: 'No (Unresectable)',
  },
  
  histopathology: {
    type: 'Ductal Adenocarcinoma',
    grade: 'Poorly differentiated',
    margins: 'Not applicable',
  },

  mdtDecision: {
    status: 'Approved',
    date: '2025-10-20',
    summary: 'Palliative Chemotherapy + Best Supportive Care. Monitor Pain.',
    participants: ['Dr. Rao (Med Onco)', 'Dr. Palliative']
  },

  qolMetrics: {
    painScore: 7,
    previousPainScore: 8, // Was worse last visit
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
    supportiveMeds: [
      { category: 'Pain Relief', medication: 'Morphine SR 30 mg BD' },
      { category: 'Breakthrough Pain', medication: 'Morphine IR 10 mg PRN' },
      { category: 'Anti-emetic', medication: 'Ondansetron 8 mg PRN' },
      { category: 'Anxiolytic', medication: 'Lorazepam 0.5 mg PRN' },
      { category: 'Appetite Stimulant', medication: 'Megestrol 400 mg OD' },
    ],
    progressNote: 'Pain remains poorly controlled despite current regimen. Consider palliative care team review for opioid optimization. Appetite declining, weight loss 4kg in past month. Family meeting scheduled to discuss goals of care.',
  },
  
  currentProtocol: {
    name: 'Gemcitabine + Nab-Paclitaxel',
    cycles: 6,
    cycleFrequency: 28, // Days 1, 8, 15
    startDate: '2026-01-05',
    drugs: [
      { name: 'Gemcitabine', doseBasis: 'BSA', dose: '1000 mg/m²', day: 'D1, D8, D15', status: 'Pending D15' },
      { name: 'Nab-Paclitaxel', doseBasis: 'BSA', dose: '125 mg/m²', day: 'D1, D8, D15', status: 'Pending D15' },
    ],
    maintenanceRationale: 'Palliative symptom control and survival extension',
    timeOnTherapy: '1 Month',
    totalExposure: '1 Cycle',
    doseInterruptions: 'D15 delayed (Neutropenia)',
    stopCriteria: [
      'Unmanageable toxicity',
      'Decline in ECOG status',
      'Patient withdrawal of consent'
    ]
  },

  treatmentStrategy: {
      surgery: false,
      systemicTherapy: true,
      radiation: false,
      sequence: 'Palliative Chemotherapy + Best Supportive Care'
  },

  comorbidities: {
      diabetes: false,
      cardiacDisease: false,
      renalDisease: false,
      priorCancer: false,
      other: ['Cachexia']
  },

  cycleOutcomes: [
    {
      cycleNumber: 1,
      response: 'Too Early',
      toxicity: 'Grade 2',
      toxicityDescription: 'Neutropenia (D15 held), fatigue, nausea',
      decision: 'D15 held, resume next cycle',
      date: '2026-01-05',
      qolImpact: 'Worsened',
    },
  ],

  responseAssessments: [
    {
      assessmentDate: '2025-12-20',
      assessmentNumber: 1,
      scanResults: [
        {
          type: 'CT Abdomen + Pelvis',
          date: '2025-12-18',
          site: 'Pancreatic head mass + hepatic metastases',
          baseline: 'Pancreatic mass 4.2 cm, liver mets sum 5.8 cm',
          current: 'Pancreatic mass 4.8 cm, liver mets sum 7.2 cm, new peritoneal nodule',
          changePercent: 24,
          recistCategory: 'Progressive Disease (PD)',
        },
        {
          type: 'CT Chest',
          date: '2025-12-18',
          site: 'Lungs',
          baseline: 'Clear',
          current: 'No pulmonary metastases',
          changePercent: 0,
          recistCategory: 'Not Evaluable (NE)',
        },
      ],
      markerTrends: [
        {
          name: 'CA 19-9',
          baseline: 850,
          current: 1420,
          unit: 'U/mL',
          trend: 'Rising',
          normal: { min: 0, max: 37 },
        },
        {
          name: 'CEA',
          baseline: 8.5,
          current: 14.2,
          unit: 'ng/mL',
          trend: 'Rising',
          normal: { min: 0, max: 5 },
        },
      ],
      overallResponse: 'Progressive Disease (PD)',
      clinicalBenefit: false,
      toxicitySummary: 'Progressive disease on FOLFIRINOX after 4 cycles. Worsening abdominal pain, new peritoneal deposits. Grade 3 neutropenia and intractable nausea necessitated dose reductions. Performance status declined ECOG 1→2.',
      cumulativeToxicity: [
        'Grade 3 neutropenia (on FOLFIRINOX)',
        'Grade 2 nausea/vomiting (persistent)',
        'Grade 1 peripheral neuropathy (Oxaliplatin)',
        'Weight loss 6 kg over 3 months',
      ],
      doctorAssessment: 'Disease progression on FOLFIRINOX. Switch to second-line Gemcitabine + Nab-Paclitaxel. Palliative care co-management for pain and nutritional support. Goals of care discussion recommended.',
      nextStep: 'Change Regimen',
      nextStepDetails: 'Start Gemcitabine + Nab-Paclitaxel. Reassess after 2 cycles. Concurrent palliative care for symptom optimisation.',
    },
  ],

  preCycleLabs: {
    date: '2026-02-01',
    cbc: {
      wbc: 3.2,
      anc: 1100,
      hgb: 9.8,
      platelets: 125000,
    },
    chemistry: {
      creatinine: 0.8,
      bilirubin: 2.1,
      alt: 52,
      ast: 48,
    },
    tumorMarkers: {
      cea: 14.2,
    },
  },

  alerts: [
      {
          type: 'Severe Symptoms',
          message: 'Pain poorly controlled - Palliative team review required'
      },
      {
          type: 'Poor Performance Status',
          message: 'ECOG 2 - Caution with chemo toxicity'
      }
  ],
  
  diagnosisDate: '2025-10-15',
  treatmentStartDate: '2025-10-28',
  lastReviewDate: '2026-02-01',
};

// 5. Maintenance - Lung Cancer (Targeted Therapy)
export const mockOncoPatient1: OncologyPatient = {
  id: 'ONC-005',
  name: 'Mr. Selvam',
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
  
  histopathology: {
    type: 'Adenocarcinoma (EGFR Exon 19 del)',
    grade: 'Moderately differentiated',
    margins: 'Not applicable (unresectable)',
  },

  currentProtocol: {
    name: 'Osimertinib Maintenance',
    cycles: 14,
    cycleFrequency: 30,
    startDate: '2024-12-05',
    drugs: [
      { name: 'Osimertinib', doseBasis: 'Fixed', dose: '80 mg', day: 'Daily', status: 'Given' },
    ],
    maintenanceRationale: 'Continued after excellent response to first-line EGFR TKI therapy',
    timeOnTherapy: '14 months',
    totalExposure: '420 days',
    doseInterruptions: 'None',
    stopCriteria: [
      'Disease progression',
      'Unacceptable toxicity',
      'Patient preference'
    ]
  },
  
  vitals: {
    bp: '118/72',
    hr: 68,
    temp: 36.5,
    resp: 15,
    spo2: 99,
    height: 165,  // Shorter than Kishore (170cm)
    weight: 62,   // Lighter patient
    bmi: 22.8
  },
  
  patientHistory: {
      medical: ['Ex-smoker (Quit 10 years ago)'],
      family: ['No significant history'],
      social: ['IT Professional', 'Married']
  },

  treatmentStrategy: {
    surgery: false,
    systemicTherapy: true,
    radiation: false,
    sequence: 'Maintenance TKI',
  },
  
  cycleOutcomes: [
      {
          cycleNumber: 1,
          response: 'Too Early',
          decision: 'Continue',
          date: '2024-12-05',
          toxicity: 'Grade 1',
          toxicityDescription: 'Mild rash, diarrhea',
          qolImpact: 'Minimal Impact'
      },
      {
          cycleNumber: 2,
          response: 'Too Early',
          decision: 'Continue',
          date: '2025-01-05',
          toxicity: 'Grade 1',
          toxicityDescription: 'Acneiform rash developing',
          qolImpact: 'Stable'
      },
      {
          cycleNumber: 3,
          response: 'Partial Response (-42%)',
          decision: 'Continue',
          date: '2025-02-05',
          toxicity: 'Grade 1',
          toxicityDescription: 'Dry skin, mild acneiform rash',
          qolImpact: 'Improved (symptom relief)'
      },
      {
          cycleNumber: 4,
          response: 'Partial Response',
          decision: 'Continue',
          date: '2025-03-05',
          toxicity: 'Grade 1',
          toxicityDescription: 'Stable skin toxicity',
          qolImpact: 'Improved (symptom relief)'
      },
      {
          cycleNumber: 5,
          response: 'Partial Response',
          decision: 'Continue',
          date: '2025-04-05',
          toxicity: 'Grade 1',
          toxicityDescription: 'Dry skin persists',
          qolImpact: 'Stable'
      },
      {
          cycleNumber: 6,
          response: 'Partial Response (-58%)',
          decision: 'Continue',
          date: '2025-05-05',
          toxicity: 'Grade 1',
          toxicityDescription: 'Persistent dry skin',
          qolImpact: 'Stable'
      },
      {
          cycleNumber: 7,
          response: 'Stable Disease',
          decision: 'Continue',
          date: '2025-06-05',
          toxicity: 'Grade 1',
          toxicityDescription: 'Mild dry skin',
          qolImpact: 'Stable'
      },
      {
          cycleNumber: 8,
          response: 'Stable Disease',
          decision: 'Continue',
          date: '2025-07-05',
          toxicity: 'Grade 1',
          toxicityDescription: 'Dry skin, early paronychia',
          qolImpact: 'Stable'
      },
      {
          cycleNumber: 9,
          response: 'Stable Disease',
          decision: 'Continue',
          date: '2025-08-05',
          toxicity: 'Grade 1-2',
          toxicityDescription: 'Paronychia developing (Grade 2)',
          qolImpact: 'Stable'
      },
      {
          cycleNumber: 10,
          response: 'Stable Disease',
          decision: 'Continue',
          date: '2025-09-05',
          toxicity: 'Grade 2',
          toxicityDescription: 'Paronychia managed with topical care',
          qolImpact: 'Stable'
      },
      {
          cycleNumber: 11,
          response: 'Stable Disease',
          decision: 'Continue',
          date: '2025-10-05',
          toxicity: 'Grade 1',
          toxicityDescription: 'Improving paronychia',
          qolImpact: 'Stable'
      },
      {
          cycleNumber: 12,
          response: 'Stable Disease',
          decision: 'Continue',
          date: '2025-11-05',
          toxicity: 'Grade 1',
          toxicityDescription: 'Dry skin, managed paronychia',
          qolImpact: 'Stable'
      },
      {
          cycleNumber: 13,
          response: 'Stable Disease',
          decision: 'Continue',
          date: '2025-12-05',
          toxicity: 'Grade 1',
          toxicityDescription: 'Well-controlled skin toxicity',
          qolImpact: 'Stable'
      },
      {
          cycleNumber: 14,
          response: 'Stable Disease',
          decision: 'Continue',
          date: '2026-01-15',
          toxicity: 'Grade 1',
          toxicityDescription: 'Dry skin, Paronychia (controlled)',
          qolImpact: 'Stable'
      }
  ],

  responseAssessments: [
    {
      assessmentDate: '2025-03-10',
      assessmentNumber: 1,
      scanResults: [
        {
          type: 'CT Chest + Upper Abdomen',
          date: '2025-03-08',
          site: 'Primary RLL lesion + mediastinal nodes',
          baseline: 'Sum of target lesions 6.8 cm (RLL mass 4.5 cm, mediastinal node 2.3 cm)',
          current: 'Sum 3.9 cm (RLL mass 2.6 cm, mediastinal node 1.3 cm)',
          changePercent: -43,
          recistCategory: 'Partial Response (PR)'
        },
        {
          type: 'CT Brain',
          date: '2025-03-08',
          site: 'Intracranial',
          baseline: 'No measurable metastases',
          current: 'No new lesions, no enhancement',
          changePercent: 0,
          recistCategory: 'Stable Disease (SD)'
        }
      ],
      markerTrends: [
        {
          name: 'Serum CEA',
          baseline: 12.5,
          current: 4.1,
          unit: 'ng/mL',
          trend: 'Falling',
          normal: { min: 0, max: 5 }
        },
        {
          name: 'Plasma EGFR Ex19del ctDNA',
          baseline: 100,
          current: 8,
          unit: 'relative copies/mL',
          trend: 'Falling',
          normal: { min: 0, max: 1 }
        }
      ],
      overallResponse: 'Partial Response (PR)',
      clinicalBenefit: true,
      toxicitySummary: 'Excellent early radiologic response with >40% reduction in target lesion burden on Osimertinib. Patient reports improved cough and dyspnoea with weight stabilisation. Toxicity limited to Grade 1 acneiform rash and intermittent loose stools, controlled with topical emollients and loperamide as needed. No red flag symptoms for ILD or cardiac toxicity.',
      cumulativeToxicity: [
        'Grade 1 acneiform rash (ongoing)',
        'Intermittent Grade 1 diarrhea (resolved)',
        'No clinical features of ILD / pneumonitis',
        'No QTc prolongation or LV dysfunction documented'
      ],
      doctorAssessment: 'Radiologically confirmed partial response by RECIST with significant symptomatic improvement on first-line Osimertinib. Skin and GI toxicity are mild and manageable. No evidence of CNS progression. Treatment intent remains long-term disease control.',
      nextStep: 'Continue Treatment',
      nextStepDetails: 'Continue Osimertinib 80 mg OD with routine dermatology and cardiac monitoring. Repeat imaging at 6–8 months or earlier if new symptoms arise.'
    },
    {
      assessmentDate: '2025-09-15',
      assessmentNumber: 2,
      scanResults: [
        {
          type: 'CT Chest + Upper Abdomen',
          date: '2025-09-12',
          site: 'Primary RLL lesion + mediastinal nodes',
          baseline: 'Initial pre-treatment sum 6.8 cm',
          current: 'Sum 2.8 cm (RLL mass 1.9 cm, mediastinal node 0.9 cm)',
          changePercent: -59,
          recistCategory: 'Partial Response (PR)'
        },
        {
          type: 'CT Brain',
          date: '2025-09-12',
          site: 'Intracranial',
          baseline: 'No measurable metastases',
          current: 'No new lesions, no leptomeningeal disease',
          changePercent: 0,
          recistCategory: 'Stable Disease (SD)'
        }
      ],
      markerTrends: [
        {
          name: 'Serum CEA',
          baseline: 12.5,
          current: 3.6,
          unit: 'ng/mL',
          trend: 'Falling',
          normal: { min: 0, max: 5 }
        },
        {
          name: 'Plasma EGFR Ex19del ctDNA',
          baseline: 100,
          current: 2,
          unit: 'relative copies/mL',
          trend: 'Falling',
          normal: { min: 0, max: 1 }
        }
      ],
      overallResponse: 'Partial Response (PR)',
      clinicalBenefit: true,
      toxicitySummary: 'Sustained deep partial response with close to 60% shrinkage from baseline. Patient continues on full-dose Osimertinib. Skin toxicity now mainly dry skin with early paronychia around great toes; managed with emollients, urea-based creams and local care. No diarrhoea, no dyspnoea, performance status ECOG 0.',
      cumulativeToxicity: [
        'Grade 1 xerosis (dry skin)',
        'Grade 2 paronychia (improving with local care)',
        'Prior Grade 1 diarrhea (resolved)',
        'No ILD / pneumonitis on imaging',
        'Baseline and interval echocardiograms within normal limits'
      ],
      doctorAssessment: 'Patient demonstrates durable partial response on Osimertinib with excellent performance status and preserved quality of life. Toxicities are predominantly cutaneous and manageable with supportive care. No systemic dose reductions required at this stage.',
      nextStep: 'Continue Treatment',
      nextStepDetails: 'Maintain Osimertinib 80 mg OD. Continue dermatology support for paronychia and skin care. Schedule next systemic imaging at 12–14 months on treatment or sooner if clinical progression is suspected.'
    },
    {
      assessmentDate: '2026-01-20',
      assessmentNumber: 3,
      scanResults: [
        {
          type: 'CT Chest + Upper Abdomen',
          date: '2026-01-18',
          site: 'Primary RLL lesion + mediastinal nodes',
          baseline: 'Initial pre-treatment sum 6.8 cm',
          current: 'Sum 2.7 cm (RLL mass 1.8 cm, mediastinal node 0.9 cm)',
          changePercent: -60,
          recistCategory: 'Stable Disease (SD)'
        },
        {
          type: 'CT Brain',
          date: '2026-01-18',
          site: 'Intracranial',
          baseline: 'No measurable metastases',
          current: 'No new lesions; screening still negative',
          changePercent: 0,
          recistCategory: 'Stable Disease (SD)'
        }
      ],
      markerTrends: [
        {
          name: 'Serum CEA',
          baseline: 12.5,
          current: 3.9,
          unit: 'ng/mL',
          trend: 'Stable',
          normal: { min: 0, max: 5 }
        },
        {
          name: 'Plasma EGFR Ex19del ctDNA',
          baseline: 100,
          current: 2,
          unit: 'relative copies/mL',
          trend: 'Stable',
          normal: { min: 0, max: 1 }
        }
      ],
      overallResponse: 'Stable Disease (SD)',
      clinicalBenefit: true,
      toxicitySummary: 'Radiologically stable disease with maintained reduction in tumour burden compared to baseline after 14 months of Osimertinib. No new metastatic sites. Patient remains asymptomatic apart from chronic low-grade dry skin and controlled paronychia; no pulmonary or cardiac toxicity identified.',
      cumulativeToxicity: [
        'Chronic Grade 1 xerosis (ongoing, moisturiser dependent)',
        'Grade 1 paronychia (controlled, no secondary infection)',
        'No history of ILD / pneumonitis',
        'No significant cardiotoxicity (serial ECG / Echo normal)'
      ],
      doctorAssessment: 'After 14 months of EGFR TKI therapy, the disease remains radiologically stable with sustained volume reduction and excellent functional status (ECOG 0). Toxicity profile remains favourable and manageable, supporting continued targeted therapy as long as benefit is maintained.',
      nextStep: 'Continue Treatment',
      nextStepDetails: 'Continue Osimertinib 80 mg OD with ongoing clinical and laboratory surveillance. Plan next CT chest/abdomen in 4–6 months, with earlier review if new respiratory symptoms, worsening skin toxicity, or biochemical/clinical progression occurs.'
    }
  ],

  comorbidities: {
      diabetes: false,
      cardiacDisease: false,
      renalDisease: false,
      priorCancer: false
  },

  alerts: [
      {
          type: 'Urgent Action',
          message: 'Dermatology referral for paronychia management'
      }
  ],

  mdtDecision: {
    status: 'Approved',
    date: '2024-11-25',
    summary: 'EGFR Mutation confirmed (Exon 19 del). Start First-Line Osimertinib. Monitor for pneumonitis/cardiac toxicity.',
    participants: ['Dr. Rao (Med Onco)', 'Dr. Sarah (Surg Onco)', 'Dr. Pathak (Pathology)']
  },

  diagnosisDate: '2024-11-20',
  treatmentStartDate: '2024-12-05',
  lastReviewDate: '2026-01-15',
};

// 6. Response Assessment - Colon Cancer Post-Chemo
export const mockOncoPatient3: OncologyPatient = {
  id: 'ONC-008',
  name: 'Mrs. Meena',
  mrn: '240108',
  age: 52,
  gender: 'Female',
  cancerSite: 'Colon',
  histology: 'Adenocarcinoma',
  stage: 'III',
  tnmStage: 'pT3N2M0',
  ecogStatus: 1,
  treatmentIntent: 'Curative',
  oncoStatus: 'Response Assessment',

  chiefComplaint: 'Post-chemo assessment visit',
  historyOfPresentIllness: 'Completed 12 cycles of mFOLFOX6 adjuvant chemo for Stage III colon cancer post-hemicolectomy. Now presenting for response assessment with restaging CT and tumor markers.',
  symptomDuration: 'N/A',
  
  vitals: {
    bp: '126/78',
    hr: 74,
    temp: 36.6,
    resp: 16,
    spo2: 98,
    height: 158,
    weight: 55,
    bmi: 22.0
  },

  patientHistory: {
    medical: ['Hypertension (controlled)', 'Allergy: Iodinated contrast'],
    family: ['Mother - Colon Ca at 60'],
    social: ['Homemaker', 'Non-smoker', 'Married, 3 children']
  },

  diagnosticTracker: {
    biopsy: 'Confirmed',
    imaging: 'Done',
    metastaticWorkup: 'Done',
    tumorMarkers: 'Done',
  },

  clinicalFindings: {
    primaryLesion: 'Resected (Right Hemicolectomy)',
    nodes: '4/18 Positive (Pre-treatment)',
    suspectedMetastasis: false,
  },

  provisionalAssessment: {
    probableDiagnosis: 'Colon Adenocarcinoma (Post-Treatment)',
    tentativeStage: 'Stage III (ypT0N0 post-chemo)',
    resectable: 'Resected',
  },
  
  histopathology: {
    type: 'Adenocarcinoma',
    grade: 'Moderately differentiated',
    margins: 'Clear',
  },

  mdtDecision: {
    status: 'Approved',
    date: '2025-06-15',
    summary: 'Surgery (Done) -> Adjuvant FOLFOX x12 (Done) -> Response Assessment -> Surveillance',
    participants: ['Dr. Rao (Med Onco)', 'Dr. Sarah (Surg Onco)', 'Dr. Pathak (Pathology)']
  },

  treatmentStrategy: {
    surgery: true,
    systemicTherapy: true,
    radiation: false,
    sequence: 'Surgery -> Adjuvant Chemo -> Response Assessment',
  },

  currentProtocol: {
    name: 'mFOLFOX6 (Completed)',
    cycles: 12,
    cycleFrequency: 14,
    startDate: '2025-07-01',
    drugs: [
      { name: 'Oxaliplatin', doseBasis: 'BSA', dose: '85 mg/m²', day: 'D1', status: 'Given' },
      { name: 'Leucovorin', doseBasis: 'BSA', dose: '400 mg/m²', day: 'D1', status: 'Given' },
      { name: '5-FU Bolus', doseBasis: 'BSA', dose: '400 mg/m²', day: 'D1', status: 'Given' },
      { name: '5-FU Infusion', doseBasis: 'BSA', dose: '2400 mg/m²', day: 'D1-D2', status: 'Given' },
    ],
    maintenanceRationale: 'Adjuvant therapy completed',
    timeOnTherapy: '6 Months',
    totalExposure: '12 Cycles',
    doseInterruptions: 'Cycle 10 delayed 1 week (neutropenia)',
    stopCriteria: ['Completed all planned cycles']
  },

  responseAssessments: [
    {
      assessmentDate: '2026-01-28',
      assessmentNumber: 1,
      scanResults: [
        {
          type: 'CT Abdomen + Pelvis',
          date: '2026-01-25',
          site: 'Surgical bed (Right colon)',
          baseline: 'Post-op changes',
          current: 'No recurrence at surgical site',
          changePercent: 0,
          recistCategory: 'Complete Response (CR)',
        },
        {
          type: 'CT Chest',
          date: '2026-01-25',
          site: 'Lungs',
          baseline: 'Clear',
          current: 'No pulmonary metastases',
          changePercent: 0,
          recistCategory: 'Complete Response (CR)',
        },
        {
          type: 'CT Abdomen + Pelvis',
          date: '2026-01-25',
          site: 'Liver',
          baseline: 'No lesions',
          current: 'No hepatic metastases',
          changePercent: 0,
          recistCategory: 'Complete Response (CR)',
        },
      ],
      markerTrends: [
        {
          name: 'CEA',
          baseline: 18.5,
          current: 2.1,
          unit: 'ng/mL',
          trend: 'Falling',
          normal: { min: 0, max: 5 },
        },
        {
          name: 'CA 19-9',
          baseline: 45.0,
          current: 12.0,
          unit: 'U/mL',
          trend: 'Falling',
          normal: { min: 0, max: 37 },
        },
      ],
      overallResponse: 'Complete Response (CR)',
      clinicalBenefit: true,
      toxicitySummary: 'Residual Grade 1 peripheral neuropathy (Oxaliplatin). Resolved neutropenia. No ongoing GI toxicity.',
      cumulativeToxicity: ['Peripheral neuropathy (Grade 1)', 'Fatigue (resolved)', 'Neutropenia (resolved)'],
      doctorAssessment: 'Excellent response. No evidence of residual or recurrent disease on imaging. Tumor markers normalized. Recommend transition to surveillance protocol.',
      nextStep: 'Switch to Surveillance',
      nextStepDetails: 'Begin surveillance protocol: CT every 6 months x 2 years, then annually. CEA every 3 months. Colonoscopy at 1 year post-surgery.',
    }
  ],

  cycleOutcomes: [
    { cycleNumber: 1, response: 'N/A (Adjuvant)', toxicity: 'Grade 1', toxicityDescription: 'Mild nausea', decision: 'Proceed', date: '2025-07-01', qolImpact: 'Stable' },
    { cycleNumber: 6, response: 'N/A (Adjuvant)', toxicity: 'Grade 1', toxicityDescription: 'Cold sensitivity, fatigue', decision: 'Proceed', date: '2025-09-09', qolImpact: 'Stable' },
    { cycleNumber: 10, response: 'N/A (Adjuvant)', toxicity: 'Grade 2', toxicityDescription: 'Neutropenia - delayed 1 week', decision: 'Dose delay', date: '2025-11-18', qolImpact: 'Worsened' },
    { cycleNumber: 12, response: 'N/A (Adjuvant)', toxicity: 'Grade 1', toxicityDescription: 'Peripheral neuropathy persisting', decision: 'Completed', date: '2025-12-30', qolImpact: 'Stable' },
  ],

  comorbidities: {
    diabetes: false,
    cardiacDisease: false,
    renalDisease: false,
    priorCancer: false,
  },

  alerts: [
    {
      type: 'Urgent Action',
      message: 'Schedule transition to surveillance protocol'
    }
  ],

  visitHistory: [
    { visitId: 'V001', date: '2025-05-20', stage: 'Diagnostic Evaluation', visitType: 'Initial Consultation', summary: 'New referral for colon mass found on colonoscopy', doctor: 'Dr. Rao' },
    { visitId: 'V002', date: '2025-06-01', stage: 'Diagnostic Evaluation', visitType: 'Biopsy Review', summary: 'Adenocarcinoma confirmed. Staging workup ordered.', doctor: 'Dr. Pathak' },
    { visitId: 'V003', date: '2025-06-15', stage: 'Treatment Planning', visitType: 'MDT Discussion', summary: 'MDT approved: Surgery -> Adjuvant FOLFOX', doctor: 'Dr. Rao' },
    { visitId: 'V004', date: '2025-06-22', stage: 'Treatment Planning', visitType: 'Surgery', summary: 'Right hemicolectomy. 4/18 LN positive.', doctor: 'Dr. Sarah' },
    { visitId: 'V005', date: '2025-07-01', stage: 'Induction', visitType: 'Cycle 1 Day 1', summary: 'Started mFOLFOX6. Tolerated well.', doctor: 'Dr. Rao' },
    { visitId: 'V006', date: '2025-09-09', stage: 'Induction', visitType: 'Cycle 6 Day 1', summary: 'Mid-treatment review. Cold sensitivity developing.', doctor: 'Dr. Rao' },
    { visitId: 'V007', date: '2025-12-30', stage: 'Induction', visitType: 'Cycle 12 Day 1', summary: 'Final cycle completed. Grade 1 neuropathy persists.', doctor: 'Dr. Rao' },
    { visitId: 'V008', date: '2026-01-28', stage: 'Response Assessment', visitType: 'Restaging Assessment', summary: 'CT + markers: Complete response. Recommend surveillance.', doctor: 'Dr. Rao' },
  ],

  diagnosisDate: '2025-05-20',
  treatmentStartDate: '2025-07-01',
  lastReviewDate: '2026-01-28',
};


// Diagnostic Events Timeline (for Mrs. Kavitha - Treatment Planning)
export const mockDiagnosticEvents: DiagnosticEvent[] = [
  { type: 'Mammogram', date: '2026-01-10', result: 'BIRADS 5 - Highly suspicious mass LUQ', status: 'Done' },
  { type: 'Core Biopsy', date: '2026-01-14', result: 'Invasive Ductal Carcinoma, ER+/PR+, HER2-', status: 'Done' },
  { type: 'Breast MRI', date: '2026-01-18', result: '5.5 cm mass, nipple involvement', status: 'Done' },
  { type: 'CT Chest/Abdomen', date: '2026-01-22', result: 'Axillary node, liver imaging suboptimal', status: 'Done' },
  { type: 'Liver MRI', date: '2026-02-08', status: 'Pending' },
];

// Pending Actions (for Mrs. Kavitha - Treatment Planning)
export const mockPendingActions: PendingAction[] = [
  { action: 'Complete metastatic workup - Liver MRI pending', priority: 'High' },
  { action: 'Fertility preservation counseling before chemo', priority: 'High' },
  { action: 'Baseline cardiac echo (for anthracycline)', priority: 'Medium' },
  { action: 'Genetic testing (BRCA) - family history positive', priority: 'Medium' },
];

export const allPatients: OncologyPatient[] = [
  mockOncoPatient1, // Mr. Selvam - Maintenance (Lung Cancer)
  mockOncoPatient2, // Mr. Kishore - Induction (Colon Cancer)
  mockOncoPatient3, // Mrs. Meena - Response Assessment (Colon Cancer)
  mockOncoPatient4, // Mrs. Lakshmi - Palliative (Pancreatic Cancer)
  mockOncoPatient5, // Mrs. Kavitha - Treatment Planning (Breast Cancer)
];

// ─── Protocol Catalog for Protocol Selection ─────────────────────────────
export interface ProtocolCatalogEntry {
  id: string;
  name: string;
  description: string;
  intent: string;
  evidence: string;
  toxicity: 'Low' | 'Low–Moderate' | 'Moderate' | 'Moderate–High' | 'High';
  recommended?: boolean;
  drugs: string[];
  cycles: string;
  frequency: string;
  notes?: string;
  cancerSites: string[]; // Which cancer sites this protocol applies to
}

export const protocolCatalog: ProtocolCatalogEntry[] = [
  // Lung Cancer Protocols
  {
    id: 'LUNG-001',
    name: 'Osimertinib (Tagrisso)',
    description: 'First-line EGFR TKI for EGFR-mutated advanced NSCLC. Oral daily therapy with excellent CNS penetration.',
    intent: 'Disease Control',
    evidence: 'NCCN Category 1',
    toxicity: 'Low–Moderate',
    recommended: true,
    drugs: ['Osimertinib 80mg PO Daily'],
    cycles: 'Continuous',
    frequency: 'Daily (30-day review)',
    notes: 'Preferred for EGFR Exon 19 del / L858R. Monitor for pneumonitis & cardiac toxicity.',
    cancerSites: ['Lung'],
  },
  {
    id: 'LUNG-002',
    name: 'Carboplatin + Pemetrexed',
    description: 'Platinum doublet chemotherapy for non-squamous NSCLC without actionable mutations.',
    intent: 'Disease Control',
    evidence: 'NCCN Category 1',
    toxicity: 'Moderate–High',
    drugs: ['Carboplatin AUC 5', 'Pemetrexed 500 mg/m²'],
    cycles: '4–6 cycles',
    frequency: 'Every 21 days',
    notes: 'Consider pembrolizumab combination if PD-L1 ≥ 50%.',
    cancerSites: ['Lung'],
  },
  {
    id: 'LUNG-003',
    name: 'Pembrolizumab + Chemotherapy',
    description: 'Immunotherapy combined with platinum doublet for advanced NSCLC regardless of PD-L1 status.',
    intent: 'Disease Control',
    evidence: 'NCCN Category 1',
    toxicity: 'Moderate–High',
    drugs: ['Pembrolizumab 200mg', 'Carboplatin AUC 5', 'Pemetrexed 500 mg/m²'],
    cycles: '4 cycles chemo + maintenance',
    frequency: 'Every 21 days',
    notes: 'Maintenance pembrolizumab + pemetrexed after 4 cycles.',
    cancerSites: ['Lung'],
  },

  // Breast Cancer Protocols
  {
    id: 'BREAST-001',
    name: 'AC-T (Dose-Dense)',
    description: 'Dose-dense Doxorubicin/Cyclophosphamide followed by Paclitaxel. Standard neoadjuvant/adjuvant for ER+/HER2- breast cancer.',
    intent: 'Curative',
    evidence: 'NCCN Category 1',
    toxicity: 'Moderate–High',
    recommended: true,
    drugs: ['Doxorubicin 60 mg/m²', 'Cyclophosphamide 600 mg/m²', '→ Paclitaxel 175 mg/m²'],
    cycles: '4 AC + 4 T',
    frequency: 'Every 14 days (with G-CSF)',
    notes: 'Preferred for Luminal B / high-risk ER+ breast cancer. Follow with endocrine therapy.',
    cancerSites: ['Breast'],
  },
  {
    id: 'BREAST-002',
    name: 'TC (Docetaxel + Cyclophosphamide)',
    description: 'Non-anthracycline regimen for lower-risk breast cancer or patients with cardiac concerns.',
    intent: 'Curative',
    evidence: 'NCCN Category 2A',
    toxicity: 'Moderate',
    drugs: ['Docetaxel 75 mg/m²', 'Cyclophosphamide 600 mg/m²'],
    cycles: '4 cycles',
    frequency: 'Every 21 days',
    notes: 'Consider for patients with pre-existing cardiac risk.',
    cancerSites: ['Breast'],
  },
  {
    id: 'BREAST-003',
    name: 'CMF (Classic)',
    description: 'Cyclophosphamide, Methotrexate, 5-Fluorouracil. Lower-intensity option for elderly or frail patients.',
    intent: 'Curative',
    evidence: 'NCCN Category 2A',
    toxicity: 'Low–Moderate',
    drugs: ['Cyclophosphamide', 'Methotrexate', '5-FU'],
    cycles: '6 cycles',
    frequency: 'Every 28 days',
    notes: 'Lower efficacy but better tolerability for frail patients.',
    cancerSites: ['Breast'],
  },

  // Colon Cancer Protocols
  {
    id: 'COLON-001',
    name: 'mFOLFOX6',
    description: 'Modified FOLFOX6 — standard adjuvant regimen for Stage III colon cancer after surgery.',
    intent: 'Curative',
    evidence: 'NCCN Category 1',
    toxicity: 'Moderate',
    recommended: true,
    drugs: ['Oxaliplatin 85 mg/m²', 'Leucovorin 400 mg/m²', '5-FU Bolus 400 mg/m²', '5-FU Infusion 2400 mg/m²'],
    cycles: '12 cycles (6 months)',
    frequency: 'Every 14 days',
    notes: 'Monitor for neuropathy. Consider 3-month course for low-risk Stage III.',
    cancerSites: ['Colon'],
  },
  {
    id: 'COLON-002',
    name: 'CAPOX (XELOX)',
    description: 'Capecitabine + Oxaliplatin. Oral alternative to FOLFOX for adjuvant colon cancer treatment.',
    intent: 'Curative',
    evidence: 'NCCN Category 1',
    toxicity: 'Moderate',
    drugs: ['Oxaliplatin 130 mg/m²', 'Capecitabine 1000 mg/m² BD D1-14'],
    cycles: '8 cycles (6 months)',
    frequency: 'Every 21 days',
    notes: 'Oral 5-FU prodrug. Good for patients preferring fewer infusions.',
    cancerSites: ['Colon'],
  },
  {
    id: 'COLON-003',
    name: 'Capecitabine Monotherapy',
    description: 'Single-agent oral fluoropyrimidine for patients unfit for oxaliplatin-based regimens.',
    intent: 'Curative',
    evidence: 'NCCN Category 2A',
    toxicity: 'Low–Moderate',
    drugs: ['Capecitabine 1250 mg/m² BD D1-14'],
    cycles: '8 cycles',
    frequency: 'Every 21 days',
    notes: 'Consider for elderly or patients with neuropathy risk.',
    cancerSites: ['Colon'],
  },

  // Pancreas Cancer Protocols
  {
    id: 'PANC-001',
    name: 'Gemcitabine + Nab-Paclitaxel',
    description: 'First-line regimen for metastatic pancreatic adenocarcinoma. Better tolerated than FOLFIRINOX.',
    intent: 'Palliative',
    evidence: 'NCCN Category 1',
    toxicity: 'Moderate–High',
    recommended: true,
    drugs: ['Gemcitabine 1000 mg/m²', 'Nab-Paclitaxel 125 mg/m²'],
    cycles: '6 cycles',
    frequency: 'D1, D8, D15 q28d',
    notes: 'Monitor for myelosuppression. Dose adjust for neutropenia.',
    cancerSites: ['Pancreas'],
  },
  {
    id: 'PANC-002',
    name: 'FOLFIRINOX',
    description: 'Intensive multi-drug regimen for fit patients with metastatic pancreatic cancer.',
    intent: 'Palliative',
    evidence: 'NCCN Category 1',
    toxicity: 'High',
    drugs: ['Oxaliplatin 85 mg/m²', 'Irinotecan 180 mg/m²', 'Leucovorin 400 mg/m²', '5-FU 2400 mg/m²'],
    cycles: '12 cycles',
    frequency: 'Every 14 days',
    notes: 'Only for ECOG 0-1. Higher response rate but more toxic.',
    cancerSites: ['Pancreas'],
  },

  // Lymphoma Protocols
  {
    id: 'LYMPH-001',
    name: 'ABVD',
    description: 'Standard first-line regimen for Hodgkin Lymphoma. Well-established with high cure rates.',
    intent: 'Curative',
    evidence: 'NCCN Category 1',
    toxicity: 'Moderate',
    recommended: true,
    drugs: ['Doxorubicin 25 mg/m²', 'Bleomycin 10 units/m²', 'Vinblastine 6 mg/m²', 'Dacarbazine 375 mg/m²'],
    cycles: '4–6 cycles',
    frequency: 'Every 28 days (D1, D15)',
    notes: 'PET-adapted therapy. Monitor pulmonary function (Bleomycin).',
    cancerSites: ['Lymphoma'],
  },
  {
    id: 'LYMPH-002',
    name: 'AVD + Brentuximab',
    description: 'Brentuximab vedotin combined with AVD for advanced Hodgkin Lymphoma.',
    intent: 'Curative',
    evidence: 'NCCN Category 1',
    toxicity: 'Moderate–High',
    drugs: ['Brentuximab Vedotin 1.2 mg/kg', 'Doxorubicin', 'Vinblastine', 'Dacarbazine'],
    cycles: '6 cycles',
    frequency: 'Every 28 days (D1, D15)',
    notes: 'Alternative for Stage III-IV HL. Higher neuropathy risk.',
    cancerSites: ['Lymphoma'],
  },
];

// Helper to get protocols for a specific cancer site
export function getProtocolsForCancerSite(site: string): ProtocolCatalogEntry[] {
  return protocolCatalog.filter(p => p.cancerSites.some(s => s.toLowerCase() === site.toLowerCase()));
}
