// Oncology-specific type definitions

export type TreatmentIntent = 'Curative' | 'Disease Control' | 'Palliative';

export type OncoStatus = 
  | 'Diagnostic Evaluation'
  | 'Treatment Planning'
  | 'Induction'
  | 'Consolidation'
  | 'Maintenance'
  | 'Palliative'
  | 'Observation';

export type DiagnosticStatus = 'Not done' | 'Done' | 'Pending' | 'Confirmed';

export type ECOGPerformanceStatus = 0 | 1 | 2 | 3 | 4;

export type MDTStatus = 'Pending' | 'Approved' | 'Modified';

export type TreatmentModality = 'Surgery' | 'Chemotherapy' | 'Radiation' | 'Immunotherapy' | 'Supportive Care';

export type ResponseType = 'Complete Response' | 'Partial Response' | 'Stable Disease' | 'Progressive Disease';

export type ToxicityGrade = 'Grade 1' | 'Grade 2' | 'Grade 3' | 'Grade 4';

export type QoLStatus = 'Improved' | 'Stable' | 'Worsened';

export interface DiagnosticTracker {
  biopsy: DiagnosticStatus;
  imaging: DiagnosticStatus;
  metastaticWorkup: DiagnosticStatus;
  tumorMarkers: DiagnosticStatus;
}

export interface ClinicalFindings {
  primaryLesion: string;
  nodes: 'Present' | 'Absent';
  suspectedMetastasis: boolean;
}

export interface ProvisionalAssessment {
  probableDiagnosis: string;
  tentativeStage: string;
  resectable: 'Yes' | 'No' | 'Unclear';
}

export interface Comorbidity {
  diabetes: boolean;
  cardiacDisease: boolean;
  renalDisease: boolean;
  priorCancer: boolean;
  other?: string[];
}

export interface Alert {
  type: 'Suspected Advanced Disease' | 'Poor Performance Status' | 'Severe Symptoms' | 'Emergency';
  message: string;
}

export interface MDTDecision {
  status: MDTStatus;
  date: string;
  summary: string;
  participants?: string[];
}

export interface TreatmentStrategy {
  surgery: boolean;
  systemicTherapy: boolean;
  radiation: boolean;
  sequence: string;
}

export interface ChemoProtocol {
  name: string;
  cycles: number;
  cycleFrequency: number; // in days
  startDate: string;
  drugs: ChemoDrug[];
}

export interface ChemoDrug {
  name: string;
  doseBasis: 'AUC' | 'BSA' | 'Fixed';
  dose: string;
  day: string;
  status?: 'Given' | 'Held' | 'Pending';
}

export interface CycleOutcome {
  cycleNumber: number;
  response: ResponseType;
  toxicity?: ToxicityGrade;
  toxicityDescription?: string;
  decision: string;
  date: string;
  qolImpact?: QoLStatus;
  notes?: string;
}

export interface QoLMetrics {
  painScore: number; // 0-10
  symptoms: {
    pain: boolean;
    fatigue: boolean;
    nausea: boolean;
    breathlessness: boolean;
    anxiety: boolean;
  };
  mobility: 'Independent' | 'Partially Independent' | 'Dependent';
  sleep: 'Good' | 'Fair' | 'Poor';
  dailyActivity: 'Independent' | 'Partially Independent' | 'Dependent';
  appetite: 'Good' | 'Fair' | 'Poor';
}

export interface OncologyPatient {
  // Basic demographics
  id: string;
  name: string;
  mrn: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  
  // Oncology-specific
  cancerSite: string;
  histology?: string;
  stage?: string;
  tnmStage?: string;
  ecogStatus: ECOGPerformanceStatus;
  treatmentIntent?: TreatmentIntent;
  oncoStatus: OncoStatus;
  urgencyFlag?: boolean;
  
  // Clinical data
  chiefComplaint?: string;
  symptomDuration?: string;
  alarmSymptoms?: boolean;
  
  // Diagnostic
  diagnosticTracker?: DiagnosticTracker;
  clinicalFindings?: ClinicalFindings;
  provisionalAssessment?: ProvisionalAssessment;
  
  // Planning & Treatment
  mdtDecision?: MDTDecision;
  treatmentStrategy?: TreatmentStrategy;
  currentProtocol?: ChemoProtocol;
  
  // Outcomes
  cycleOutcomes?: CycleOutcome[];
  qolMetrics?: QoLMetrics;
  
  // Comorbidities & Alerts
  comorbidities?: Comorbidity;
  alerts?: Alert[];
  
  // Metadata
  diagnosisDate?: string;
  treatmentStartDate?: string;
  lastReviewDate?: string;
}

export interface DiagnosticEvent {
  type: string;
  date: string;
  result?: string;
  status: DiagnosticStatus;
}

export interface PendingAction {
  action: string;
  priority: 'High' | 'Medium' | 'Low';
}
