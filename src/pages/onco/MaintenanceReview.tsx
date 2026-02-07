import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Chip,
  Button,
  LinearProgress,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
  useTheme
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import ChatIcon from '@mui/icons-material/Chat';
import LayersIcon from '@mui/icons-material/Layers';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EventIcon from '@mui/icons-material/Event';
import EditIcon from '@mui/icons-material/Edit';
import { alpha } from '@mui/material/styles';
import { OncologyPatient } from '../../types/oncology';
import PatientContextBar from '../../components/onco/PatientContextBar';

interface MaintenanceReviewProps {
  patient: OncologyPatient;
  hideContextBar?: boolean;
}

// Reusing the MicButton from DiagnosticEvaluation for consistency
const MicButton = () => (
  <IconButton 
    size="small" 
    sx={{ 
        ml: 1.5,
        border: '1px solid',
        borderColor: 'primary.main', 
        borderRadius: 1, 
        p: 0.5,
        color: 'primary.main',
        transition: 'all 0.2s',
        '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            borderColor: 'primary.dark',
            transform: 'translateY(-1px)',
            boxShadow: (theme) => `0 2px 8px ${alpha(theme.palette.primary.main, 0.2)}`
        }
    }}
  >
    <MicIcon sx={{ fontSize: 16 }} />
  </IconButton>
);

const SectionHeader = ({ title, action }: { title: string, action?: React.ReactNode }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.9rem', letterSpacing: 1.1 }}>
            {title}
        </Typography>
        {action}
    </Box>
);

const DataField = ({ label, value, highlight = false }: { label: string, value: React.ReactNode, highlight?: boolean }) => (
    <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, display: 'block', mb: 0.5, fontSize: '0.8rem' }}>
            {label}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: highlight ? 700 : 500, color: highlight ? 'primary.main' : 'text.primary', fontSize: highlight ? '1rem' : '0.95rem', lineHeight: 1.4 }}>
            {value}
        </Typography>
    </Box>
);

export default function MaintenanceReview({ patient, hideContextBar }: MaintenanceReviewProps) {
  const theme = useTheme();
  // Build review history from the last 4 cycle outcomes + add a pending next review
  const cycleOutcomes = patient.cycleOutcomes || [];
  const lastFourCycles = cycleOutcomes.slice(-3); // Last 3 completed cycles
  const reviewDates = [
    ...lastFourCycles.map(c => ({
      date: c.date,
      status: c.response.includes('Stable') ? 'Stable' : c.response.includes('Partial') ? 'Responding' : 'Completed',
      note: c.toxicityDescription || 'Routine'
    })),
    { date: '2026-02-15', status: 'Pending', note: 'Upcoming' },
  ];

  return (
    <Box sx={{ pb: 12, bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Global Patient Context Bar */}
      {!hideContextBar && <PatientContextBar patient={patient} />}

      <Container maxWidth="xl" sx={{ mt: 4, mb: 5 }}>
        <Grid container spacing={4}>
            
            {/* LEFT PANEL - CLINICAL SNAPSHOT (Swapped from Right) */}
            <Grid item xs={12} md={8} lg={8}>
                <Paper 
                    elevation={0} 
                    sx={{ 
                        p: 0, 
                        borderRadius: 3, 
                        border: '1px solid', 
                        borderColor: 'divider',
                        overflow: 'hidden'
                    }}
                >
                    {/* Header Banner */}
                    <Box sx={{ px: 3, py: 2.5, bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                                Maintenance Protocol
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Last Review: <Box component="span" sx={{ fontWeight: 500, color: 'text.primary' }}>2026-01-15</Box>
                            </Typography>
                         </Box>
                         <Box sx={{ display: 'flex', gap: 1 }}>
                            <Chip icon={<CheckCircleIcon sx={{ fontSize: '16px !important' }} />} label="Stable" color="success" size="small" sx={{ fontWeight: 600, borderRadius: 1.5 }} />
                            <Chip label="Cycle 14" color="default" variant="outlined" size="small" sx={{ fontWeight: 500, borderRadius: 1.5 }} />
                         </Box>
                    </Box>

                    <Box sx={{ p: 4 }}>
                        {/* Section 1: Active Therapy */}
                         <Box sx={{ mb: 5 }}>
                             <SectionHeader title="Current Therapy Protocol" action={<MicButton />} />
                             <Grid container spacing={4}>
                                <Grid item xs={12} md={7}>
                                     <Box sx={{ p: 2.5, border: '1px solid', borderColor: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.02), borderRadius: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                                            <Box sx={{ p: 1.5, bgcolor: 'white', borderRadius: 1.5, border: '1px solid', borderColor: 'divider' }}>
                                                <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontSize: '0.6rem', fontWeight: 600, textTransform: 'uppercase' }}>RX</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle1" fontWeight={600} color="primary.main">Osimertinib (Tagrisso)</Typography>
                                                <Typography variant="body2" color="text.secondary" fontWeight={400}>80mg Oral • Once Daily</Typography>
                                            </Box>
                                        </Box>
                                        
                                        <Divider sx={{ my: 1.5, borderStyle: 'dashed', borderColor: alpha(theme.palette.primary.main, 0.2) }} />
                                        
                                        <Box sx={{ display: 'flex', gap: 4 }}>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontSize: '0.8rem' }}>Start Date</Typography>
                                                <Typography variant="subtitle1" fontWeight={500} sx={{ fontSize: '0.9rem' }}>{patient.currentProtocol?.startDate || 'N/A'}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontSize: '0.8rem' }}>Review Interval</Typography>
                                                <Typography variant="subtitle1" fontWeight={500} sx={{ fontSize: '0.9rem' }}>Every 4 weeks</Typography>
                                            </Box>
                                        </Box>
                                     </Box>
                                     
                                     {/* Stopping Criteria - Moved to Left Column */}
                                    <Box sx={{ mt: 3, pl: 1 }}>
                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', mb: 1, display: 'block' }}>
                                            Maintenance continues until
                                        </Typography>
                                        <List dense disablePadding>
                                            {(patient.currentProtocol?.stopCriteria || ['Disease progression', 'Unacceptable toxicity', 'Patient preference']).map((criteria, idx) => (
                                                <ListItem key={idx} sx={{ px: 0, py: 0.25 }}>
                                                    <Box component="span" sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'text.disabled', mr: 1, mt: 0.8, alignSelf: 'flex-start' }} />
                                                    <ListItemText 
                                                        primary={<Typography variant="body2" sx={{ fontSize: '0.85rem' }}>{criteria}</Typography>} 
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <Box sx={{ pl: { md: 2 } }}>
                                        {/* Maintenance Rationale */}
                                        <Box sx={{ mb: 1 }}>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', fontWeight: 500, mb: 0.5 }}>
                                                Maintenance Rationale
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.3 }}>
                                                {patient.currentProtocol?.maintenanceRationale || 'Continued after response to first-line therapy'}
                                            </Typography>
                                        </Box>

                                        {/* Time & Exposure Grid */}
                                        <Grid container spacing={2} sx={{ mb: 2 }}>
                                            <Grid item xs={6}>
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', fontWeight: 500, mb: 0.5 }}>
                                                    Time on therapy
                                                </Typography>
                                                <Typography variant="subtitle1" color="primary.main" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                                                    {patient.currentProtocol?.timeOnTherapy || '3.5 Months'}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                 <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', fontWeight: 500, mb: 0.5 }}>
                                                    Total exposure
                                                </Typography>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                                                    {patient.currentProtocol?.totalExposure || '105 days'}
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        {/* Dose Interruptions */}
                                        <Box sx={{ mb: 2 }}>
                                             <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', fontWeight: 500, mb: 0.5 }}>
                                                Dose interruptions
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
                                                {patient.currentProtocol?.doseInterruptions || 'None'}
                                            </Typography>
                                        </Box>


                                    </Box>
                                </Grid>
                             </Grid>
                         </Box>

                        <Divider sx={{ mb: 5, borderStyle: 'dashed' }} />

                        {/* Section 2: Last Review & Findings (Stacked below) */}
                        <Box sx={{ mb: 4 }}>
                            <SectionHeader title="Last Review Outcome" action={<MicButton />} />
                            
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={6}>
                                    <DataField label="Interval History" value="No new specific complaints. Denies cough, dyspnea, or hemoptysis. Reports good appetite." />
                                    <Box sx={{ mt: 3, mb: 3 }}>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, display: 'block', mb: 1, fontSize: '0.8rem' }}>
                                            Side Effects
                                        </Typography>
                                        <Stack direction="row" spacing={1}>
                                            <Chip label="Rash - Grade 1" size="small" sx={{ borderRadius: 1, bgcolor: 'orange', color: 'white', fontWeight: 600, fontSize: '0.75rem' }} />
                                            <Chip label="Paronychia - Grade 1" size="small" sx={{ borderRadius: 1, bgcolor: 'orange', color: 'white', fontWeight: 600, fontSize: '0.75rem' }} />
                                        </Stack>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.04), borderRadius: 2 }}>
                                         <Box>
                                            <Typography variant="body2" color="text.secondary" display="block" fontSize="0.8rem">Next Review</Typography>
                                            <Typography variant="subtitle1" fontWeight={700} color="primary.main" fontSize="0.95rem">10 Jun 2026</Typography>
                                         </Box>
                                         <Button size="small" variant="text" sx={{ fontSize: '0.75rem' }}>Schedule</Button>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                     <DataField label="Imaging Findings (2026-01-15)" value="Stable disease. 3.5cm RLL mass (Previously 3.6cm). No new lesions." />
                                     
                                     <Box sx={{ mt: 2, mb: 2 }}>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, display: 'block', mb: 1, fontSize: '0.8rem' }}>
                                            Tumor Markers
                                        </Typography>
                                        <Chip label="Normal Range" size="small" color="success" variant="outlined" sx={{ fontWeight: 600 }} />
                                     </Box>

                                     <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                                        <Grid container spacing={2}>
                                            {[
                                                { l: 'ECOG', v: '0' },
                                                { l: 'Pain', v: '0/10' },
                                                { l: 'Weight', v: `${patient.vitals?.weight || 'N/A'} kg` }
                                            ].map((m, i) => (
                                                <Grid item xs={4} key={i}>
                                                    <Box sx={{ textAlign: 'center' }}>
                                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.7rem' }}>{m.l}</Typography>
                                                        <Typography variant="subtitle1" fontWeight={700} fontSize="0.9rem">{m.v}</Typography>
                                                    </Box>
                                                </Grid>
                                            ))}
                                        </Grid>
                                     </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Paper>
            </Grid>

            {/* RIGHT PANEL - HISTORY & PLAN (Swapped from Left) */}
            <Grid item xs={12} md={4} lg={4}>
                <Paper 
                    elevation={0} 
                    sx={{ 
                        borderRadius: 3, 
                        border: '1px solid', 
                        borderColor: 'divider',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden'
                    }}
                >
                    <Box sx={{ p: 1.5, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', bgcolor: 'grey.50', flexShrink: 0 }}>
                         <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                            Review History
                        </Typography>
                         <MicButton />
                    </Box>

                    {/* Review History List - Auto Height */}
                    <Box sx={{ 
                        p: 0
                    }}>
                        <List disablePadding>
                            {reviewDates.slice().reverse().map((review, index) => {
                                const reviewNumber = reviewDates.length - index;
                                return (
                                <ListItem 
                                    key={index} 
                                    divider={index !== reviewDates.length - 1}
                                    sx={{ 
                                        px: 2, 
                                        py: 1.5,
                                        bgcolor: index === 0 ? alpha(theme.palette.primary.main, 0.02) : 'transparent',
                                        '&:hover': { bgcolor: 'action.hover' },
                                        transition: 'background-color 0.2s',
                                        alignItems: 'flex-start'
                                    }}
                                >
                                    <ListItemText 
                                        disableTypography
                                        primary={
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, alignItems: 'center' }}>
                                                <Typography variant="subtitle1" fontWeight={700} color="primary.main" fontSize="0.95rem">
                                                    Review {reviewNumber}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" fontSize="0.8rem">
                                                    {review.date}
                                                </Typography>
                                            </Box>
                                        }
                                        secondary={
                                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                {review.status === 'Pending' ? (
                                                    <Chip label="Due" size="small" color="primary" variant="outlined" sx={{ height: 22, fontSize: '0.7rem', fontWeight: 600, borderRadius: 1 }} />
                                                ) : (
                                                    <Chip label={review.status} size="small" color="success" variant="outlined" sx={{ height: 22, fontSize: '0.7rem', fontWeight: 600, borderRadius: 1 }} />
                                                )}
                                                <Chip label="Continue Rx" size="small" color="default" variant="outlined" sx={{ height: 22, fontSize: '0.7rem', fontWeight: 500, borderRadius: 1, borderColor: 'divider' }} />
                                            </Box>
                                        }
                                    />
                                </ListItem>
                                );
                            })}
                        </List>
                    </Box>

                    {/* Fixed Forward Plan Section - Outside Scroll */}
                     <Box sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'white', flexShrink: 0 }}>
                         <Typography variant="overline" sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem', letterSpacing: 1.1, mb: 1, display: 'block' }}>
                            Forward Plan
                        </Typography>
                         <List dense disablePadding sx={{ mb: 1 }}>
                            {[
                                'CT Chest scheduled: 05 Mar 2026',
                                'Routine bloods every 4 weeks',
                                'Dermatology referral (Paronychia)'
                            ].map((item, i) => (
                                <ListItem key={i} sx={{ px: 0, py: 0.5 }}>
                                    <Box component="span" sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'warning.main', mr: 1.5, display: 'inline-block', mt: 0.5, flexShrink: 0 }} />
                                    <ListItemText primary={<Typography variant="body2" color="text.primary" fontSize="0.85rem">{item}</Typography>} />
                                </ListItem>
                            ))}
                         </List>
                    </Box>
                    
                    <Box sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', flexShrink: 0 }}>
                         <Button 
                            variant="outlined" 
                            fullWidth 
                            startIcon={<EditIcon />}
                            size="small"
                            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
                        >
                            Update Plan
                         </Button>
                    </Box>
                </Paper>
            </Grid>

        </Grid>
      </Container>
      
      {/* Bottom Action Bar (Restored from DiagnosticEvaluation) */}
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
