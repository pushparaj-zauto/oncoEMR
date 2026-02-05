import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PatientDashboard from './pages/PatientDashboard';
import PatientsList from './pages/PatientsList';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7c4dff',
    },
    secondary: {
      main: '#00bcd4',
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
    error: {
      main: '#f44336',
    },
    info: {
      main: '#2196f3',
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
              <Route path="/" element={<PatientsList />} />
              <Route path="/patients" element={<PatientsList />} />
              <Route path="/patient/:patientId" element={<PatientDashboard />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
