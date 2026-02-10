import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { OncologyPatient, OncoStatus } from '../types/oncology';
import { allPatients as initialPatients } from '../data/oncologyMockData';

// Deep clone helper
const clonePatient = (p: OncologyPatient): OncologyPatient => JSON.parse(JSON.stringify(p));

interface PatientStoreContextType {
  patients: OncologyPatient[];
  getPatient: (id: string) => OncologyPatient | undefined;
  updatePatientStatus: (id: string, newStatus: OncoStatus) => void;
  updatePatient: (id: string, updates: Partial<OncologyPatient>) => void;
  activateTreatmentPlan: (id: string) => void;
  completeCycle: (id: string, cycleNumber: number) => void;
  transitionStage: (id: string, targetStage: OncoStatus, reason?: string) => void;
}

const PatientStoreContext = createContext<PatientStoreContextType | null>(null);

export function PatientStoreProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<OncologyPatient[]>(() =>
    initialPatients.map(clonePatient)
  );

  const getPatient = useCallback(
    (id: string) => patients.find((p) => p.id === id),
    [patients]
  );

  const updatePatientStatus = useCallback((id: string, newStatus: OncoStatus) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...clonePatient(p), oncoStatus: newStatus } : p))
    );
  }, []);

  const updatePatient = useCallback((id: string, updates: Partial<OncologyPatient>) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...clonePatient(p), ...updates } : p))
    );
  }, []);

  const activateTreatmentPlan = useCallback((id: string) => {
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const updated = clonePatient(p);
        updated.oncoStatus = 'Induction';
        updated.treatmentStartDate = updated.treatmentStartDate || new Date().toISOString().split('T')[0];
        // Generate placeholder cycle outcomes if none exist and protocol is defined
        if (updated.currentProtocol && (!updated.cycleOutcomes || updated.cycleOutcomes.length === 0)) {
          updated.cycleOutcomes = [];
        }
        return updated;
      })
    );
  }, []);

  const completeCycle = useCallback((id: string, cycleNumber: number) => {
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const updated = clonePatient(p);
        const existing = updated.cycleOutcomes?.find((c) => c.cycleNumber === cycleNumber);
        if (!existing && updated.cycleOutcomes) {
          updated.cycleOutcomes.push({
            cycleNumber,
            response: 'Too Early',
            toxicity: 'Grade 1',
            toxicityDescription: 'To be assessed',
            decision: 'Proceed',
            date: new Date().toISOString().split('T')[0],
            qolImpact: 'Stable',
          });
        }
        // If all planned cycles completed, auto-suggest response assessment
        if (
          updated.currentProtocol &&
          updated.cycleOutcomes &&
          updated.cycleOutcomes.length >= updated.currentProtocol.cycles
        ) {
          updated.oncoStatus = 'Response Assessment';
        }
        return updated;
      })
    );
  }, []);

  const transitionStage = useCallback((id: string, targetStage: OncoStatus, _reason?: string) => {
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const updated = clonePatient(p);
        updated.oncoStatus = targetStage;

        // Set last review date on any transition
        updated.lastReviewDate = new Date().toISOString().split('T')[0];

        // Add visit record for audit trail
        const visit = {
          visitId: `V${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          stage: targetStage,
          visitType: `Stage Transition → ${targetStage}`,
          summary: _reason || `Patient moved to ${targetStage}`,
          doctor: 'Dr. Rao',
        };
        if (!updated.visitHistory) updated.visitHistory = [];
        updated.visitHistory.push(visit);

        return updated;
      })
    );
  }, []);

  return (
    <PatientStoreContext.Provider
      value={{
        patients,
        getPatient,
        updatePatientStatus,
        updatePatient,
        activateTreatmentPlan,
        completeCycle,
        transitionStage,
      }}
    >
      {children}
    </PatientStoreContext.Provider>
  );
}

export function usePatientStore() {
  const ctx = useContext(PatientStoreContext);
  if (!ctx) throw new Error('usePatientStore must be used within PatientStoreProvider');
  return ctx;
}
