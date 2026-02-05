import { Box, Container, Grid, Button, Fab } from '@mui/material';
import PatientInfo from '../components/PatientInfo';
import Vitals from '../components/Vitals';
import Allergies from '../components/Allergies';
import VisitHistory from '../components/VisitHistory';
import Investigations from '../components/Investigations';
import ClinicalSummary from '../components/ClinicalSummary';
import {
  mockPatient,
  mockCurrentVisit,
  mockVisits,
  mockAllergies,
  mockInvestigations,
} from '../data/mockData';
import MicIcon from '@mui/icons-material/Mic';
import ChatIcon from '@mui/icons-material/Chat';
import LayersIcon from '@mui/icons-material/Layers';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HomeIcon from '@mui/icons-material/Home';
import WarningIcon from '@mui/icons-material/Warning';

export default function PatientDashboard() {
  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', pb: 10, overflow: 'hidden' }}>
      <Container maxWidth="xl" sx={{ pt: 2, px: 1 }}>
        <Grid container spacing={2}>
          {/* Left Column - Combined Patient Info, Vitals & Allergies */}
          <Grid item xs={12} md={4}>
            <Box component="div" sx={{ 
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              bgcolor: 'background.paper',
              overflow: 'hidden',
              boxShadow: 1
            }}>
              {/* Patient Info - Fixed at top */}
              <Box sx={{ p: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                <PatientInfo patient={mockPatient} currentVisit={mockCurrentVisit} />
              </Box>
              
              {/* Vitals & Allergies - Scrollable */}
              <Box sx={{ 
                maxHeight: 'calc(100vh - 420px)',
                overflowY: 'auto',
                p: 1.5,
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#888',
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#555',
                },
              }}>
                <Vitals />
                <Allergies allergies={mockAllergies} />
              </Box>
            </Box>
          </Grid>

          {/* Middle Column */}
          <Grid item xs={12} md={5}>
            <ClinicalSummary />
            <VisitHistory visits={mockVisits} />
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={3}>
            <Investigations investigations={mockInvestigations} />
          </Grid>
        </Grid>
      </Container>

      {/* Bottom Action Bar */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
          py: 0.75,
          px: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
        {/* Empty left side or can add content later */}
        <Box />

        {/* Right side - Action buttons, Finish button and home icon */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Fab
            size="small"
            sx={{
              bgcolor: 'white',
              border: '2px solid',
              borderColor: 'primary.main',
              color: 'primary.main',
              width: 36,
              height: 36,
              minHeight: 36,
              '&:hover': { bgcolor: 'grey.50' },
            }}
          >
            <MicIcon sx={{ fontSize: '1rem' }} />
          </Fab>
          <Fab
            size="small"
            sx={{
              bgcolor: 'white',
              border: '2px solid',
              borderColor: 'primary.main',
              color: 'primary.main',
              width: 36,
              height: 36,
              minHeight: 36,
              '&:hover': { bgcolor: 'grey.50' },
            }}
          >
            <Box
              sx={{
                fontWeight: 700,
                fontSize: '0.75rem',
              }}
            >
              Rx
            </Box>
          </Fab>
          <Fab
            size="small"
            sx={{
              bgcolor: 'white',
              border: '2px solid',
              borderColor: 'primary.main',
              color: 'primary.main',
              width: 36,
              height: 36,
              minHeight: 36,
              '&:hover': { bgcolor: 'grey.50' },
            }}
          >
            <LayersIcon sx={{ fontSize: '1rem' }} />
          </Fab>
          <Fab
            size="small"
            sx={{
              bgcolor: 'white',
              border: '2px solid',
              borderColor: 'primary.main',
              color: 'primary.main',
              width: 36,
              height: 36,
              minHeight: 36,
              '&:hover': { bgcolor: 'grey.50' },
            }}
          >
            <ChatIcon sx={{ fontSize: '1rem' }} />
          </Fab>
          <Fab
            size="small"
            sx={{
              bgcolor: 'white',
              border: '2px solid',
              borderColor: 'primary.main',
              color: 'primary.main',
              width: 36,
              height: 36,
              minHeight: 36,
              '&:hover': { bgcolor: 'grey.50' },
            }}
          >
            <MoreHorizIcon sx={{ fontSize: '1rem' }} />
          </Fab>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<Box component="span" sx={{ fontSize: '0.9rem' }}>✓</Box>}
            sx={{ px: 2, py: 0.5, fontWeight: 600, borderRadius: 1.5, textTransform: 'none', fontSize: '0.8rem' }}
          >
            Finish and Next Patient
          </Button>
          <Fab color="primary" size="small" sx={{ width: 36, height: 36, minHeight: 36 }}>
            <HomeIcon sx={{ fontSize: '1rem' }} />
          </Fab>
        </Box>
      </Box>
    </Box>
  );
}
