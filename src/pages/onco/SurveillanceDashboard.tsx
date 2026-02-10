import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Button,
  Divider,
  Stack,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import ChatIcon from '@mui/icons-material/Chat';
import LayersIcon from '@mui/icons-material/Layers';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CelebrationIcon from '@mui/icons-material/Celebration';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { alpha } from '@mui/material/styles';
import { OncologyPatient } from '../../types/oncology';
import PatientContextBar from '../../components/onco/PatientContextBar';

interface SurveillanceDashboardProps {
  patient: OncologyPatient;
  hideContextBar?: boolean;
}

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
        boxShadow: (theme) => `0 2px 8px ${alpha(theme.palette.primary.main, 0.2)}`,
      },
    }}
  >
    <MicIcon sx={{ fontSize: 16 }} />
  </IconButton>
);

const getScheduleStatusColor = (status: string) => {
  switch (status) {
    case 'Up-to-date': return 'success';
    case 'Due': return 'warning';
    case 'Overdue': return 'error';
    default: return 'default';
  }
};

const getScheduleStatusIcon = (status: string) => {
  switch (status) {
    case 'Up-to-date': return <CheckCircleIcon sx={{ fontSize: 18, color: 'success.main' }} />;
    case 'Due': return <ScheduleIcon sx={{ fontSize: 18, color: 'warning.main' }} />;
    case 'Overdue': return <WarningAmberIcon sx={{ fontSize: 18, color: 'error.main' }} />;
    default: return null;
  }
};

export default function SurveillanceDashboard({ patient, hideContextBar }: SurveillanceDashboardProps) {
  const surveillance = patient.surveillanceData;

  if (!surveillance) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <EventAvailableIcon sx={{ fontSize: 48, color: 'grey.300', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">No Surveillance Data Available</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Surveillance monitoring will begin after treatment completion and response assessment.
        </Typography>
      </Box>
    );
  }

  const overdueCount = surveillance.schedules.filter(s => s.status === 'Overdue').length;
  const dueCount = surveillance.schedules.filter(s => s.status === 'Due').length;
  const upToDateCount = surveillance.schedules.filter(s => s.status === 'Up-to-date').length;
  const totalTests = surveillance.schedules.length;

  return (
    <Box sx={{ pb: 10 }}>
      {!hideContextBar && <PatientContextBar patient={patient} />}

      <Container maxWidth="xl" sx={{ mt: 4, mb: 5 }}>
        {/* Remission Banner */}
        <Paper
          elevation={0}
          sx={{
            mb: 4,
            p: 0,
            borderRadius: 3,
            overflow: 'hidden',
            border: '2px solid',
            borderColor: 'success.light',
            bgcolor: alpha('#4caf50', 0.03),
          }}
        >
          <Box sx={{ px: 4, py: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CelebrationIcon sx={{ fontSize: 36, color: 'success.main' }} />
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'success.dark' }}>
                  In Remission — Surveillance Active
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {surveillance.yearsInSurveillance} years in surveillance • Remission since {surveillance.remissionDate}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Stack direction="row" spacing={1}>
                <Chip label={`${upToDateCount} Up-to-date`} color="success" size="small" sx={{ fontWeight: 600 }} />
                {dueCount > 0 && <Chip label={`${dueCount} Due`} color="warning" size="small" sx={{ fontWeight: 600 }} />}
                {overdueCount > 0 && <Chip label={`${overdueCount} Overdue`} color="error" size="small" sx={{ fontWeight: 600 }} />}
              </Stack>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                Next clinic visit: {surveillance.nextClinicVisit}
              </Typography>
            </Box>
          </Box>

          {/* Compliance bar */}
          <Box sx={{ px: 4, pb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>Surveillance Compliance</Typography>
              <Typography variant="caption" color="success.main" fontWeight={600}>
                {Math.round((upToDateCount / totalTests) * 100)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(upToDateCount / totalTests) * 100}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: alpha('#4caf50', 0.12),
                '& .MuiLinearProgress-bar': { bgcolor: 'success.main', borderRadius: 4 },
              }}
            />
          </Box>
        </Paper>

        <Grid container spacing={4}>
          {/* LEFT - Surveillance Schedule (Main content) */}
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                Follow-Up Schedule
              </Typography>
              <MicButton />
            </Box>

            <Paper variant="outlined" sx={{ p: 0, borderRadius: 2, overflow: 'hidden' }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', py: 1.5 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', py: 1.5 }}>Test</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', py: 1.5 }}>Frequency</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', py: 1.5 }}>Last Done</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', py: 1.5 }}>Next Due</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', py: 1.5 }}>Last Result</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {surveillance.schedules.map((sched, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        bgcolor: sched.status === 'Overdue' ? alpha('#f44336', 0.03) : sched.status === 'Due' ? alpha('#ff9800', 0.03) : 'transparent',
                      }}
                    >
                      <TableCell sx={{ py: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                          {getScheduleStatusIcon(sched.status)}
                          <Chip
                            label={sched.status}
                            size="small"
                            color={getScheduleStatusColor(sched.status) as any}
                            variant="outlined"
                            sx={{ height: 22, fontSize: '0.65rem', fontWeight: 600 }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="body2" fontWeight={600}>{sched.test}</Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="body2" color="text.secondary">{sched.frequency}</Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="body2">{sched.lastDone}</Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="body2" fontWeight={sched.status !== 'Up-to-date' ? 600 : 400} color={sched.status === 'Overdue' ? 'error.main' : sched.status === 'Due' ? 'warning.main' : 'text.primary'}>
                          {sched.nextDue}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', maxWidth: 200 }}>
                          {sched.result || '—'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>

            {/* Recurrence Watch */}
            <Box sx={{ mt: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="overline" sx={{ fontWeight: 700, color: 'warning.dark', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                  Recurrence Monitoring
                </Typography>
                <MicButton />
              </Box>
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.50', borderRadius: 2 }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" sx={{ mb: 0.5 }}>SYMPTOMS</Typography>
                      <Chip label="No B Symptoms" color="success" size="small" sx={{ fontWeight: 600 }} />
                      <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
                        No fever, night sweats, or weight loss
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.50', borderRadius: 2 }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" sx={{ mb: 0.5 }}>EXAM FINDINGS</Typography>
                      <Chip label="No Lymphadenopathy" color="success" size="small" sx={{ fontWeight: 600 }} />
                      <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
                        Last physical exam was unremarkable
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.50', borderRadius: 2 }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" sx={{ mb: 0.5 }}>IMAGING</Typography>
                      <Chip label="No Recurrence" color="success" size="small" sx={{ fontWeight: 600 }} />
                      <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
                        Last scan was clear
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>
                  Recurrence Triggers — Move back to Diagnostic/Planning if:
                </Typography>
                <Stack spacing={1}>
                  {[
                    'New lymphadenopathy or mass detected',
                    'New B-symptoms (unexplained fever, drenching sweats, >10% weight loss)',
                    'Rising LDH or ESR without other explanation',
                    'Suspicious findings on imaging',
                  ].map((trigger, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <WarningAmberIcon sx={{ fontSize: 14, color: 'warning.main' }} />
                      <Typography variant="body2" color="text.secondary">{trigger}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Box>
          </Grid>

          {/* RIGHT - Patient Wellbeing & Treatment History */}
          <Grid item xs={12} md={4}>
            {/* Treatment History Summary */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                Treatment History
              </Typography>
              <MicButton />
            </Box>
            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, mb: 4 }}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">Completed Treatment</Typography>
                  <Typography variant="body2" fontWeight={600}>{surveillance.treatmentCompleted}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">Treatment Duration</Typography>
                  <Typography variant="body2" fontWeight={500}>{surveillance.totalTreatmentDuration}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">Remission Date</Typography>
                  <Typography variant="body2" fontWeight={500}>{surveillance.remissionDate}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">Years in Surveillance</Typography>
                  <Typography variant="body1" fontWeight={700} color="success.main">{surveillance.yearsInSurveillance} years</Typography>
                </Box>
              </Stack>
            </Paper>

            {/* Late Toxicity Monitoring */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="overline" sx={{ fontWeight: 700, color: 'warning.dark', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                Late Toxicity Screening
              </Typography>
              <MicButton />
            </Box>
            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, mb: 4 }}>
              <Stack spacing={1.5}>
                {surveillance.lateToxicities.length > 0 && surveillance.lateToxicities[0] !== 'None identified' ? (
                  surveillance.lateToxicities.map((tox, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <WarningAmberIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                      <Typography variant="body2">{tox}</Typography>
                    </Box>
                  ))
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}>
                    <CheckCircleIcon sx={{ fontSize: 18, color: 'success.main' }} />
                    <Typography variant="body2" color="success.main" fontWeight={500}>No late toxicities identified</Typography>
                  </Box>
                )}
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" sx={{ mb: 1 }}>
                MONITORING FOR
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip label="Cardiotoxicity (Doxorubicin)" size="small" variant="outlined" color="warning" sx={{ fontSize: '0.7rem' }} />
                <Chip label="Secondary Malignancy" size="small" variant="outlined" color="warning" sx={{ fontSize: '0.7rem' }} />
                <Chip label="Pulmonary (Bleomycin)" size="small" variant="outlined" color="warning" sx={{ fontSize: '0.7rem' }} />
                <Chip label="Thyroid Dysfunction" size="small" variant="outlined" color="warning" sx={{ fontSize: '0.7rem' }} />
              </Stack>
            </Paper>

            {/* Psychosocial & Functional Recovery */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="overline" sx={{ fontWeight: 700, color: 'info.dark', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                Wellbeing & Recovery
              </Typography>
              <MicButton />
            </Box>
            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FavoriteIcon sx={{ fontSize: 16, color: 'error.light' }} />
                    <Typography variant="body2" color="text.secondary">Functional Status</Typography>
                  </Box>
                  <Typography variant="body2" fontWeight={600} color="success.main">{surveillance.functionalStatus}</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Return to Work/Study</Typography>
                  <Chip
                    label={surveillance.returnToWork ? 'Yes' : 'Not yet'}
                    size="small"
                    color={surveillance.returnToWork ? 'success' : 'warning'}
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">ECOG Status</Typography>
                  <Chip label={`ECOG ${patient.ecogStatus}`} size="small" color="success" variant="outlined" sx={{ fontWeight: 600 }} />
                </Box>

                <Divider />

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <PsychologyIcon sx={{ fontSize: 16, color: 'info.main' }} />
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>Psychosocial Notes</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', lineHeight: 1.6, color: 'text.secondary' }}>
                    "{surveillance.psychosocialNotes}"
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Bottom Action Bar */}
      <Box
        sx={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider',
          py: 0.75, px: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1000,
        }}
      >
        <Box />
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Fab size="small" sx={{ bgcolor: 'white', border: '2px solid', borderColor: 'primary.main', color: 'primary.main', width: 36, height: 36, minHeight: 36, '&:hover': { bgcolor: 'grey.50' } }}>
            <MicIcon sx={{ fontSize: '1rem' }} />
          </Fab>
          <Fab size="small" sx={{ bgcolor: 'white', border: '2px solid', borderColor: 'primary.main', color: 'primary.main', width: 36, height: 36, minHeight: 36, '&:hover': { bgcolor: 'grey.50' } }}>
            <Box sx={{ fontWeight: 700, fontSize: '0.75rem' }}>Rx</Box>
          </Fab>
          <Fab size="small" sx={{ bgcolor: 'white', border: '2px solid', borderColor: 'primary.main', color: 'primary.main', width: 36, height: 36, minHeight: 36, '&:hover': { bgcolor: 'grey.50' } }}>
            <LayersIcon sx={{ fontSize: '1rem' }} />
          </Fab>
          <Fab size="small" sx={{ bgcolor: 'white', border: '2px solid', borderColor: 'primary.main', color: 'primary.main', width: 36, height: 36, minHeight: 36, '&:hover': { bgcolor: 'grey.50' } }}>
            <ChatIcon sx={{ fontSize: '1rem' }} />
          </Fab>
          <Fab size="small" sx={{ bgcolor: 'white', border: '2px solid', borderColor: 'primary.main', color: 'primary.main', width: 36, height: 36, minHeight: 36, '&:hover': { bgcolor: 'grey.50' } }}>
            <MoreHorizIcon sx={{ fontSize: '1rem' }} />
          </Fab>
          <Button
            variant="contained" color="primary" size="small"
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
