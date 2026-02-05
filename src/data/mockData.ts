import { Patient, Visit, Allergy, Investigation } from '../types';

export interface PatientListItem {
  patient: Patient;
  currentVisit: Visit;
  token: number;
}

export const mockPatient: Patient = {
  id: '10307',
  name: 'Mr. Shivam',
  mrn: '10307',
  age: 44,
  gender: 'Male',
  phone: '9994567775',
  dateOfBirth: '1982-01-15',
};

export const mockVisits: Visit[] = [
  {
    id: '1',
    date: 'Feb 3, 2026',
    time: '05:03 PM',
    provider: 'Dr. Gunasekar',
    type: 'Out Patient',
    status: 'Completed',
    vitalSigns: {
      height: 173,
      heightUnit: 'cm',
      weight: 70,
      weightUnit: 'kg',
      temperature: 98.6,
      bloodPressure: '120/80',
      heartRate: 72,
      respiratoryRate: 16,
    },
    notes: '',
  },
];

export const mockCurrentVisit: Visit = {
  id: 'current',
  date: 'Feb 5, 2026',
  time: '10:10:00 AM',
  provider: 'Dr. Jaganathan',
  type: 'Out Patient',
  status: 'In Consultation',
};

export const mockAllergies: Allergy[] = [];

export const mockInvestigations: Investigation[] = [
  {
    id: '1',
    name: 'CBC',
    type: 'Blood Test',
    status: 'Ordered',
    orderedDate: 'Feb 5, 2026',
  },
];

// Multiple patients for the patients list
export const mockPatientsList: PatientListItem[] = [
  {
    token: 1,
    patient: {
      id: '10307',
      name: 'Mr. Shivam',
      mrn: '10307',
      age: 44,
      gender: 'Male',
      phone: '9994567775',
      dateOfBirth: '1982-01-15',
    },
    currentVisit: {
      id: '1',
      date: '05-02-2026',
      time: '10:10 AM',
      provider: 'Dr. Jaganathan',
      type: 'Out Patient',
      status: 'In Consultation',
    },
  },
  {
    token: 2,
    patient: {
      id: '10308',
      name: 'Mrs. Priya Kumar',
      mrn: '10308',
      age: 52,
      gender: 'Female',
      phone: '9876543210',
      dateOfBirth: '1974-03-20',
    },
    currentVisit: {
      id: '2',
      date: '05-02-2026',
      time: '11:30 AM',
      provider: 'Dr. Ramesh',
      type: 'Out Patient',
      status: 'Scheduled',
    },
  },
  {
    token: 3,
    patient: {
      id: '10309',
      name: 'Mr. Rajesh Singh',
      mrn: '10309',
      age: 38,
      gender: 'Male',
      phone: '9123456789',
      dateOfBirth: '1988-07-12',
    },
    currentVisit: {
      id: '3',
      date: '05-02-2026',
      time: '09:00 AM',
      provider: 'Dr. Jaganathan',
      type: 'Out Patient',
      status: 'Completed',
    },
  },
  {
    token: 4,
    patient: {
      id: '10310',
      name: 'Ms. Ananya Reddy',
      mrn: '10310',
      age: 29,
      gender: 'Female',
      phone: '9988776655',
      dateOfBirth: '1997-11-05',
    },
    currentVisit: {
      id: '4',
      date: '05-02-2026',
      time: '02:00 PM',
      provider: 'Dr. Gunasekar',
      type: 'Out Patient',
      status: 'Scheduled',
    },
  },
  {
    token: 5,
    patient: {
      id: '10311',
      name: 'Mr. Venkat Rao',
      mrn: '10311',
      age: 61,
      gender: 'Male',
      phone: '9445566778',
      dateOfBirth: '1965-02-28',
    },
    currentVisit: {
      id: '5',
      date: '05-02-2026',
      time: '03:30 PM',
      provider: 'Dr. Ramesh',
      type: 'Out Patient',
      status: 'In Consultation',
    },
  },
];
