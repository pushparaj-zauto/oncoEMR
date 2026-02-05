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
    <Box sx={{ minHeight: 'calc(100vh - 64px)', pb: 10 }}>
      <Container maxWidth="xl" sx={{ pt: 3 }}>
        <Grid container spacing={3}>
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
          left: '220px',
          right: 0,
          bgcolor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
          py: 1.5,
          px: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          zIndex: 1000,
        }}
      >
        <Fab color="primary" size="medium">
          <MicIcon />
        </Fab>
        <Fab
          size="medium"
          sx={{
            bgcolor: 'white',
            border: '2px solid',
            borderColor: 'divider',
            '&:hover': { bgcolor: 'grey.100' },
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              bgcolor: 'primary.main',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.75rem',
            }}
          >
            Rx
          </Box>
        </Fab>
        <Fab
          size="medium"
          sx={{
            bgcolor: 'white',
            border: '2px solid',
            borderColor: 'divider',
            '&:hover': { bgcolor: 'grey.100' },
          }}
        >
          <LayersIcon />
        </Fab>
        <Fab
          size="medium"
          sx={{
            bgcolor: 'white',
            border: '2px solid',
            borderColor: 'divider',
            '&:hover': { bgcolor: 'grey.100' },
          }}
        >
          <ChatIcon />
        </Fab>
        <Fab
          size="medium"
          sx={{
            bgcolor: 'orange',
            color: 'white',
            '&:hover': { bgcolor: 'darkorange' },
            position: 'relative',
          }}
        >
          <WarningIcon />
          <Box
            sx={{
              position: 'absolute',
              top: -4,
              right: -4,
              bgcolor: 'error.main',
              color: 'white',
              borderRadius: '50%',
              width: 20,
              height: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              fontWeight: 600,
            }}
          >
            3
          </Box>
        </Fab>
        <Fab
          size="medium"
          sx={{
            bgcolor: 'white',
            border: '2px solid',
            borderColor: 'divider',
            '&:hover': { bgcolor: 'grey.100' },
          }}
        >
          <MoreHorizIcon />
        </Fab>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ px: 4, py: 1.5, fontWeight: 600 }}
        >
          Finish and Next Patient
        </Button>
        <Fab color="primary" size="medium">
          <HomeIcon />
        </Fab>
      </Box>
    </Box>
  );
}
