import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PatientDashboard from './pages/PatientDashboard';
import PatientsList from './pages/PatientsList';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
// Oncology Pages
import OncoPatientsList from './pages/onco/OncoPatientsList';
import DiagnosticEvaluation from './pages/onco/DiagnosticEvaluation';
import TreatmentPlanning from './pages/onco/TreatmentPlanning';
import ChemoProtocolWorkspace from './pages/onco/ChemoProtocolWorkspace';
import MaintenanceReview from './pages/onco/MaintenanceReview';
import PalliativeDashboard from './pages/onco/PalliativeDashboard';
import {
  mockOncoPatient1,
  mockOncoPatient2,
  mockOncoPatient3,
  mockOncoPatient4,
  mockOncoPatient5,
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ display: 'flex' }}>
          <Header />
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              mt: 8,
              bgcolor: '#f5f5f5',
            }}
          >
            <Routes>
              {/* General EMR Routes */}
              <Route path="/" element={<OncoPatientsList />} />
              <Route path="/day-care" element={<Navigate to="/" replace />} />
              <Route path="/in-patient" element={<Navigate to="/" replace />} />
              <Route path="/emergency" element={<Navigate to="/" replace />} />
              <Route path="/patients" element={<PatientsList />} />
              <Route path="/patient/:patientId" element={<PatientDashboard />} />
              
              {/* Oncology EMR Routes */}
              <Route path="/onco" element={<OncoPatientsList />} />
              <Route 
                path="/onco/diagnostic/:patientId" 
                element={
                  <DiagnosticEvaluation 
                    patient={mockOncoPatient1} 
                    diagnosticEvents={mockDiagnosticEvents}
                    pendingActions={mockPendingActions}
                  />
                } 
              />
              <Route 
                path="/onco/planning/:patientId" 
                element={<TreatmentPlanning patient={mockOncoPatient2} />} 
              />
              <Route 
                path="/onco/chemo/:patientId" 
                element={<ChemoProtocolWorkspace patient={mockOncoPatient3} />} 
              />
              <Route 
                path="/onco/maintenance/:patientId" 
                element={<MaintenanceReview patient={mockOncoPatient5} />} 
              />
              <Route 
                path="/onco/palliative/:patientId" 
                element={<PalliativeDashboard patient={mockOncoPatient4} />} 
              />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
