import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import PatientDashboard from './pages/PatientDashboard';
import PatientsList from './pages/PatientsList';
// Layouts
import MainLayout from './layouts/MainLayout';
import OncoPatientLayout from './layouts/OncoPatientLayout';

// Oncology Pages
import OncoPatientsList from './pages/onco/OncoPatientsList';
import DiagnosticEvaluation from './pages/onco/DiagnosticEvaluation';
import PatientSummary from './pages/onco/PatientSummary';
import TreatmentPlanning from './pages/onco/TreatmentPlanning';
import ChemoProtocolWorkspace from './pages/onco/ChemoProtocolWorkspace';
import MaintenanceReview from './pages/onco/MaintenanceReview';
import PalliativeDashboard from './pages/onco/PalliativeDashboard';
import {
  allPatients,
  mockDiagnosticEvents,
  mockPendingActions,
} from './data/oncologyMockData';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7c4dff',
      dark: '#5e35b1',
      light: '#b39ddb',
    },
    secondary: {
      main: '#00bcd4',
    },
    success: {
      main: '#4caf50',
      dark: '#2e7d32',
      light: '#81c784',
    },
    warning: {
      main: '#ff9800',
      dark: '#f57c00',
      light: '#ffb74d',
    },
    error: {
      main: '#f44336',
      dark: '#d32f2f',
      light: '#e57373',
    },
    info: {
      main: '#2196f3',
      dark: '#1565c0',
      light: '#64b5f6',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
});

// Wrappers for Dynamic Patient Data
const DiagnosticWrapper = () => {
  const { patientId } = useParams();
  const patient = allPatients.find(p => p.id === patientId);
  if (!patient) return null;
  return <DiagnosticEvaluation patient={patient} diagnosticEvents={mockDiagnosticEvents} pendingActions={mockPendingActions} hideContextBar />;
};

const PlanningWrapper = () => {
  const { patientId } = useParams();
  const patient = allPatients.find(p => p.id === patientId);
  if (!patient) return null;
  return <TreatmentPlanning patient={patient} hideContextBar />;
};

const ChemoWrapper = () => {
  const { patientId } = useParams();
  const patient = allPatients.find(p => p.id === patientId);
  if (!patient) return null;
  return <ChemoProtocolWorkspace patient={patient} hideContextBar />;
};

const MaintenanceWrapper = () => {
  const { patientId } = useParams();
  const patient = allPatients.find(p => p.id === patientId);
  if (!patient) return null;
  return <MaintenanceReview patient={patient} hideContextBar />;
};

const PalliativeWrapper = () => {
  const { patientId } = useParams();
  const patient = allPatients.find(p => p.id === patientId);
  if (!patient) return null;
  return <PalliativeDashboard patient={patient} hideContextBar />;
};

const SummaryWrapper = () => {
  const { patientId } = useParams();
  const patient = allPatients.find(p => p.id === patientId);
  if (!patient) return null;
  return <PatientSummary patient={patient} hideContextBar />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Main App Layout Routes */}
          <Route element={<MainLayout />}>
             {/* General EMR Routes */}
             <Route path="/" element={<OncoPatientsList />} />
             <Route path="/day-care" element={<Navigate to="/" replace />} />
             <Route path="/in-patient" element={<Navigate to="/" replace />} />
             <Route path="/emergency" element={<Navigate to="/" replace />} />
             <Route path="/patients" element={<PatientsList />} />
             <Route path="/patient/:patientId" element={<PatientDashboard />} />
             
             {/* Oncology EMR Routes - List View */}
             <Route path="/onco" element={<OncoPatientsList />} />
          </Route>

          {/* Full Screen Patient Journey Layout */}
          <Route path="/onco/patient-view/:patientId" element={<OncoPatientLayout />}>
             <Route index element={<Navigate to="summary" replace />} />
             <Route path="summary" element={<SummaryWrapper />} />
             <Route path="diagnostic" element={<DiagnosticWrapper />} />
             <Route path="planning" element={<PlanningWrapper />} />
             <Route path="chemo" element={<ChemoWrapper />} />
             <Route path="maintenance" element={<MaintenanceWrapper />} />
             <Route path="palliative" element={<PalliativeWrapper />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
