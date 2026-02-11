// Oncology-specific type definitions

export type TreatmentIntent = 'Curative' | 'Disease Control' | 'Palliative' | 'None';

export type OncoStatus = 
  | 'Diagnostic Evaluation'
  | 'Treatment Planning'
  | 'Induction'
  | 'Consolidation'
  | 'Maintenance'
  | 'Response Assessment'
  | 'Palliative'
  | 'Observation'
  | 'Discharged';

export type DiagnosticStatus = 'Not done' | 'Done' | 'Pending' | 'Confirmed' | 'Confirmed Benign' | 'Not Indicated' | 'Normal';

export type ECOGPerformanceStatus = 0 | 1 | 2 | 3 | 4;

export type MDTStatus = 'Pending' | 'Approved' | 'Modified';

export type TreatmentModality = 'Surgery' | 'Chemotherapy' | 'Radiation' | 'Immunotherapy' | 'Supportive Care';

export type ResponseType = 
  | 'Complete Response' 
  | 'Partial Response' 
  | 'Partial Response (-42%)' 
  | 'Partial Response (-58%)' 
  | 'Stable Disease' 
  | 'Progressive Disease' 
  | 'Too Early' 
  | 'N/A' 
  | 'N/A (Adjuvant)';

export type ToxicityGrade = 'Grade 1' | 'Grade 1-2' | 'Grade 2' | 'Grade 3' | 'Grade 4';

export type QoLStatus = 'Improved' | 'Improved (symptom relief)' | 'Minimal Impact' | 'Stable' | 'Worsened';

export interface DiagnosticTracker {
  biopsy: DiagnosticStatus;
  imaging: DiagnosticStatus;
  metastaticWorkup: DiagnosticStatus;
  tumorMarkers: DiagnosticStatus;
}

export interface ClinicalFindings {
  primaryLesion: string;
  nodes: string;
  suspectedMetastasis: boolean;
}

export interface Histopathology {
  type: string;
  grade: string;
  margins: string;
}

export interface ProvisionalAssessment {
  probableDiagnosis: string;
  tentativeStage: string;
  resectable: string;
}

export interface Comorbidity {
  diabetes: boolean;
  cardiacDisease: boolean;
  renalDisease: boolean;
  priorCancer: boolean;
  other?: string[];
}

export interface Alert {
  type: 'Suspected Advanced Disease' | 'Poor Performance Status' | 'Severe Symptoms' | 'Emergency' | 'Urgent Action';
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
  step?: number; // For multi-step protocols
  maintenanceRationale?: string;
  timeOnTherapy?: string;
  totalExposure?: string;
  doseInterruptions?: string;
  stopCriteria?: string[];
  drugs: ChemoDrug[];
}

export interface ChemoDrug {
  name: string;
  doseBasis: 'AUC' | 'BSA' | 'Fixed';
  dose: string;
  day: string;
  status?: 'Given' | 'Held' | 'Pending' | string;
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
  previousPainScore?: number; // For tracking trend
  symptoms: {
    pain: boolean;
    fatigue: boolean;
    nausea: boolean;
    breathlessness: boolean;
    anxiety: boolean;
  };
  mobility: 'Independent' | 'Partially Independent' | 'Dependent' | 'Requires Assistance';
  sleep: 'Good' | 'Fair' | 'Poor';
  dailyActivity: 'Independent' | 'Partially Independent' | 'Dependent';
  appetite: 'Good' | 'Fair' | 'Poor';
  supportiveMeds?: Array<{ category: string; medication: string }>;
  progressNote?: string;
}

export interface Vitals {
  bp: string;
  hr: number;
  temp: number;
  resp: number;
  spo2: number;
  height: number; // cm
  weight: number; // kg
  bmi: number;
  glucose?: number; // mg/dL - for diabetic patients on steroids
}

export interface PreCycleLabs {
  date: string;
  cbc: {
    wbc: number;
    anc: number;
    hgb: number;
    platelets: number;
  };
  chemistry: {
    creatinine: number;
    bilirubin: number;
    alt: number;
    ast: number;
  };
  tumorMarkers?: {
    cea?: number;
    ca125?: number;
    psa?: number;
  };
}

export interface PatientHistory {
  medical: string[];
  family: string[];
  social: string[];
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
  historyOfPresentIllness?: string;
  symptomDuration?: string;
  alarmSymptoms?: boolean;
  
  // Vitals
  vitals?: Vitals;
  
  // Patient History
  patientHistory?: PatientHistory;

  // Diagnostic
  diagnosticTracker?: DiagnosticTracker;
  clinicalFindings?: ClinicalFindings;
  provisionalAssessment?: ProvisionalAssessment;
  histopathology?: Histopathology;
  
  // Planning & Treatment
  mdtDecision?: MDTDecision;
  treatmentStrategy?: TreatmentStrategy;
  currentProtocol?: ChemoProtocol;
  preCycleLabs?: PreCycleLabs;
  
  // Outcomes
  cycleOutcomes?: CycleOutcome[];
  qolMetrics?: QoLMetrics;
  
  // Comorbidities & Alerts
  comorbidities?: Comorbidity;
  alerts?: Alert[];
  
  // Response Assessment
  responseAssessments?: ResponseAssessment[];
  
  // Surveillance
  surveillanceData?: SurveillanceData;
  
  // Visit History
  visitHistory?: VisitRecord[];
  
  // Metadata
  diagnosisDate?: string;
  treatmentStartDate?: string;
  lastReviewDate?: string;
}

export type RECISTResponse = 'Complete Response (CR)' | 'Partial Response (PR)' | 'Stable Disease (SD)' | 'Progressive Disease (PD)' | 'Not Evaluable (NE)';

export interface ScanResult {
  type: string; // CT, PET-CT, MRI etc.
  date: string;
  site: string;
  baseline: string;
  current: string;
  changePercent: number; // negative = shrinkage
  recistCategory: RECISTResponse;
}

export interface MarkerTrend {
  name: string;
  baseline: number;
  current: number;
  unit: string;
  trend: 'Rising' | 'Falling' | 'Stable';
  normal?: { min: number; max: number };
}

export interface ResponseAssessment {
  assessmentDate: string;
  assessmentNumber: number;
  scanResults: ScanResult[];
  markerTrends: MarkerTrend[];
  overallResponse: RECISTResponse;
  clinicalBenefit: boolean;
  toxicitySummary: string;
  cumulativeToxicity: string[];
  doctorAssessment: string;
  nextStep: 'Continue Treatment' | 'Proceed to Surgery' | 'Switch to Surveillance' | 'Change Regimen' | 'Palliative Transition' | 'MDT Review';
  nextStepDetails: string;
}

export interface SurveillanceSchedule {
  test: string;
  frequency: string;
  lastDone: string;
  nextDue: string;
  status: 'Up-to-date' | 'Due' | 'Overdue';
  result?: string;
}

export interface SurveillanceData {
  remissionDate: string;
  treatmentCompleted: string;
  totalTreatmentDuration: string;
  schedules: SurveillanceSchedule[];
  lateToxicities: string[];
  psychosocialNotes: string;
  functionalStatus: string;
  returnToWork: boolean;
  nextClinicVisit: string;
  yearsInSurveillance: number;
}

export interface VisitRecord {
  visitId: string;
  date: string;
  stage: OncoStatus;
  visitType: string; // 'Cycle 1 Day 1', 'MDT Review', 'Follow-up', etc.
  summary: string;
  doctor: string;
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
