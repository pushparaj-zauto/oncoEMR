export interface Patient {
  id: string;
  name: string;
  mrn: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  dateOfBirth: string;
}

export interface Visit {
  id: string;
  date: string;
  time: string;
  provider: string;
  type: 'Out Patient' | 'In Patient' | 'Emergency';
  status: 'Scheduled' | 'In Consultation' | 'Completed' | 'Cancelled';
  vitalSigns?: VitalSigns;
  notes?: string;
}

export interface VitalSigns {
  height: number;
  heightUnit: 'cm' | 'in';
  weight: number;
  weightUnit: 'kg' | 'lbs';
  temperature?: number;
  bloodPressure?: string;
  heartRate?: number;
  respiratoryRate?: number;
}

export interface Allergy {
  name: string;
  type: 'Drug' | 'Food' | 'Environmental';
  severity: 'Mild' | 'Moderate' | 'Severe';
  reaction?: string;
}

export interface Investigation {
  id: string;
  name: string;
  type: string;
  status: 'Ordered' | 'In Progress' | 'Completed' | 'Cancelled';
  orderedDate: string;
  result?: string;
}
