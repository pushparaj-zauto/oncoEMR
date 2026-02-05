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
          {/* Left Column */}
          <Grid item xs={12} md={4}>
            <PatientInfo patient={mockPatient} currentVisit={mockCurrentVisit} />
            <Vitals />
            <Allergies allergies={mockAllergies} />
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
          py: 1,
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
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Fab
            size="small"
            sx={{
              bgcolor: 'white',
              border: '2px solid',
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': { bgcolor: 'grey.50' },
            }}
          >
            <MicIcon sx={{ fontSize: '1.2rem' }} />
          </Fab>
          <Fab
            size="small"
            sx={{
              bgcolor: 'white',
              border: '2px solid',
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': { bgcolor: 'grey.50' },
            }}
          >
            <Box
              sx={{
                fontWeight: 700,
                fontSize: '0.85rem',
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
              '&:hover': { bgcolor: 'grey.50' },
            }}
          >
            <LayersIcon sx={{ fontSize: '1.2rem' }} />
          </Fab>
          <Fab
            size="small"
            sx={{
              bgcolor: 'white',
              border: '2px solid',
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': { bgcolor: 'grey.50' },
            }}
          >
            <ChatIcon sx={{ fontSize: '1.2rem' }} />
          </Fab>
          <Fab
            size="small"
            sx={{
              bgcolor: 'white',
              border: '2px solid',
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': { bgcolor: 'grey.50' },
            }}
          >
            <MoreHorizIcon sx={{ fontSize: '1.2rem' }} />
          </Fab>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            startIcon={<Box component="span" sx={{ fontSize: '1rem' }}>✓</Box>}
            sx={{ px: 2.5, py: 0.75, fontWeight: 600, borderRadius: 1.5, textTransform: 'none' }}
          >
            Finish and Next Patient
          </Button>
          <Fab color="primary" size="small">
            <HomeIcon sx={{ fontSize: '1.2rem' }} />
          </Fab>
        </Box>
      </Box>
    </Box>
  );
}
