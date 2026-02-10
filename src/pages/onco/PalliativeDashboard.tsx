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
  LinearProgress,
  Checkbox,
  Slider,
  Stack,
  Divider,
  Button,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import ActionFooter from '../../components/onco/ActionFooter';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessibleIcon from '@mui/icons-material/Accessible';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HotelIcon from '@mui/icons-material/Hotel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { alpha } from '@mui/material/styles';
import { OncologyPatient } from '../../types/oncology';
import PatientContextBar from '../../components/onco/PatientContextBar';

interface PalliativeDashboardProps {
  patient: OncologyPatient;
  hideContextBar?: boolean;
}

// Reusable MicButton component matching DiagnosticEvaluation style
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

// Section Header component matching MaintenanceReview style
const SectionHeader = ({ title, color = 'primary.main', action }: { title: string, color?: string, action?: React.ReactNode }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="overline" sx={{ fontWeight: 700, color: color, fontSize: '0.85rem', letterSpacing: 1.2 }}>
            {title}
        </Typography>
        {action}
    </Box>
);

export default function PalliativeDashboard({ patient, hideContextBar }: PalliativeDashboardProps) {
  const getPainColor = (score: number): 'success' | 'warning' | 'error' => {
    if (score <= 3) return 'success';
    if (score <= 6) return 'warning';
    return 'error';
  };

  const painScore = patient.qolMetrics?.painScore || 3;
  const previousPainScore = patient.qolMetrics?.previousPainScore || painScore;
  const painDiff = previousPainScore - painScore;

  return (
    <Box sx={{ pb: 10 }}>
      {/* Global Patient Context Bar */}
      {!hideContextBar && <PatientContextBar patient={patient} />}

      <Container maxWidth="xl" sx={{ mt: 2, mb: 5 }}>
        {/* Page Header - Simplified */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main', letterSpacing: 0.3 }}>
              Palliative Care Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Concise summary of symptoms, QoL metrics and current therapy
            </Typography>
          </Box>
          <Chip
            label="PALLIATIVE INTENT"
            color="primary"
            sx={{ fontWeight: 600, fontSize: '0.8rem', py: 0.5 }}
            variant="outlined"
          />
        </Box>

        <Grid container spacing={4}>
          {/* Column 1: Current Treatment & Pain Score */}
          <Grid item xs={12} md={4}>
            {/* Current Treatment */}
            {patient.currentProtocol && (
              <Box sx={{ mb: 4 }}>
                <SectionHeader title="Current Treatment" action={<MicButton />} />
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ width: '35%', borderBottom: 'none', pl: 0 }}>
                          <Typography variant="body2" color="text.secondary">Protocol</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                          <Typography variant="body2" fontWeight={500}>{patient.currentProtocol.name}</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0 }}>
                          <Typography variant="body2" color="text.secondary">Progress</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                          <Typography variant="body2" fontWeight={600}>
                            {patient.cycleOutcomes?.length || 0} / {patient.currentProtocol.cycles} Cycles
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <LinearProgress
                    variant="determinate"
                    value={((patient.cycleOutcomes?.length || 0) / patient.currentProtocol.cycles) * 100}
                    color="primary"
                    sx={{ height: 4, borderRadius: 1, bgcolor: 'grey.200', mt: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5 }}>
                    Last cycle: {patient.cycleOutcomes?.[patient.cycleOutcomes.length - 1]?.date}
                  </Typography>
                </Paper>
              </Box>
            )}

            {/* Pain Score - Minimalistic */}
            <Box sx={{ mb: 4 }}>
              <SectionHeader title="Pain Score (0–10)" action={<MicButton />} />
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  {/* Compact pain score display */}
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '3px solid',
                      borderColor: `${getPainColor(painScore)}.main`,
                      bgcolor: (theme) => alpha(theme.palette[getPainColor(painScore)].main, 0.08),
                      flexShrink: 0,
                    }}
                  >
                    <Typography variant="h3" sx={{ fontWeight: 700, color: `${getPainColor(painScore)}.main`, lineHeight: 1 }}>
                      {painScore}
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Previously: <strong>{previousPainScore}</strong>
                      </Typography>
                      {painDiff !== 0 && (
                        <Chip 
                          icon={painDiff > 0 ? <TrendingDownIcon sx={{ fontSize: '14px !important' }} /> : <TrendingUpIcon sx={{ fontSize: '14px !important' }} />}
                          label={`${Math.abs(painDiff)} pts`} 
                          size="small" 
                          color={painDiff > 0 ? 'success' : 'error'} 
                          variant="outlined"
                          sx={{ height: 22, fontSize: '0.7rem', fontWeight: 600 }}
                        />
                      )}
                    </Box>
                    <Slider
                      value={painScore}
                      min={0}
                      max={10}
                      marks
                      disabled
                      color={getPainColor(painScore)}
                      sx={{ py: 1 }}
                    />
                  </Box>
                </Box>
              </Paper>
            </Box>

            {/* Care Goal - Clean */}
            <Box>
              <SectionHeader title="Care Goal" color="info.dark" action={<MicButton />} />
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2.5, 
                  borderRadius: 2, 
                  border: '1px solid', 
                  borderColor: (theme) => alpha(theme.palette.info.main, 0.3),
                  bgcolor: (theme) => alpha(theme.palette.info.main, 0.02)
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary', lineHeight: 1.6 }}>
                  Comfort-focused care; continue current chemotherapy for disease control and symptom management.
                </Typography>
              </Paper>
            </Box>
          </Grid>

          {/* Column 2: Symptom Checklist & Meds */}
          <Grid item xs={12} md={4}>
            {/* Symptom Assessment */}
            <Box sx={{ mb: 4 }}>
              <SectionHeader title="Symptom Assessment" action={<MicButton />} />
              <Paper variant="outlined" sx={{ p: 0, borderRadius: 2, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
                {patient.qolMetrics?.symptoms && (
                  <List disablePadding>
                    {[
                      { key: 'pain', label: 'Pain', checked: patient.qolMetrics.symptoms.pain, status: 'Improved' },
                      { key: 'fatigue', label: 'Fatigue', checked: patient.qolMetrics.symptoms.fatigue, status: 'Stable' },
                      { key: 'breathlessness', label: 'Breathlessness', checked: patient.qolMetrics.symptoms.breathlessness, status: 'Stable' },
                      { key: 'nausea', label: 'Nausea', checked: patient.qolMetrics.symptoms.nausea, status: null },
                      { key: 'anxiety', label: 'Anxiety', checked: patient.qolMetrics.symptoms.anxiety, status: null },
                    ].map((symptom, index, arr) => (
                      <ListItem 
                        key={symptom.key}
                        divider={index < arr.length - 1}
                        sx={{ py: 1.5, px: 2 }}
                      >
                        <Checkbox 
                          checked={symptom.checked} 
                          size="small" 
                          sx={{ p: 0.5, mr: 1.5 }} 
                        />
                        <ListItemText 
                          primary={
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>{symptom.label}</Typography>
                          }
                        />
                        {symptom.status && (
                          <Chip 
                            label={symptom.status} 
                            size="small" 
                            color={symptom.status === 'Improved' ? 'success' : 'default'} 
                            variant="outlined"
                            sx={{ height: 22, fontSize: '0.7rem', fontWeight: 600, borderRadius: 1 }} 
                          />
                        )}
                      </ListItem>
                    ))}
                  </List>
                )}
              </Paper>
            </Box>

            {/* Supportive Medications */}
            <Box>
              <SectionHeader title="Supportive Medications" action={<MicButton />} />
              <Paper variant="outlined" sx={{ p: 0, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Table size="small">
                  <TableBody>
                    {patient.qolMetrics?.supportiveMeds ? (
                      patient.qolMetrics.supportiveMeds.map((med, idx) => (
                        <TableRow key={idx}>
                          <TableCell sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.85rem', borderBottom: idx === (patient.qolMetrics?.supportiveMeds?.length || 0) - 1 ? 'none' : undefined }}>
                            {med.category}
                          </TableCell>
                          <TableCell sx={{ fontWeight: 500, fontSize: '0.85rem', color: 'text.primary', borderBottom: idx === (patient.qolMetrics?.supportiveMeds?.length || 0) - 1 ? 'none' : undefined }}>
                            {med.medication}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} sx={{ color: 'text.secondary', fontStyle: 'italic' }}>No medications recorded</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Paper>
            </Box>
          </Grid>

          {/* Column 3: Quality of Life & Notes */}
          <Grid item xs={12} md={4}>
            {/* Quality of Life */}
            <Box sx={{ mb: 4 }}>
              <SectionHeader title="Quality of Life" color="success.dark" action={<MicButton />} />
              <Paper variant="outlined" sx={{ p: 0, borderRadius: 2, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
                {patient.qolMetrics && (
                  <List disablePadding>
                    {/* Mobility */}
                    <ListItem divider sx={{ py: 1.5, px: 2.5 }}>
                      <AccessibleIcon sx={{ color: 'text.secondary', fontSize: '1.2rem', mr: 1.5 }} />
                      <ListItemText 
                        primary={<Typography variant="body2" fontWeight={500}>Mobility</Typography>}
                      />
                      <Chip
                        label={patient.qolMetrics.mobility}
                        size="small"
                        variant="outlined"
                        color={patient.qolMetrics.mobility === 'Independent' ? 'success' : 'warning'}
                        sx={{ fontWeight: 600, height: 22, fontSize: '0.7rem', borderRadius: 1 }}
                      />
                    </ListItem>

                    {/* Sleep */}
                    <ListItem divider sx={{ py: 1.5, px: 2.5 }}>
                      <HotelIcon sx={{ color: 'text.secondary', fontSize: '1.2rem', mr: 1.5 }} />
                      <ListItemText 
                        primary={<Typography variant="body2" fontWeight={500}>Sleep</Typography>}
                      />
                      <Chip
                        label={patient.qolMetrics.sleep}
                        size="small"
                        variant="outlined"
                        color={
                          patient.qolMetrics.sleep === 'Good'
                            ? 'success'
                            : patient.qolMetrics.sleep === 'Fair'
                            ? 'warning'
                            : 'error'
                        }
                        sx={{ fontWeight: 600, height: 22, fontSize: '0.7rem', borderRadius: 1 }}
                      />
                    </ListItem>

                    {/* Daily Activity */}
                    <ListItem divider sx={{ py: 1.5, px: 2.5 }}>
                      <FavoriteIcon sx={{ color: 'text.secondary', fontSize: '1.2rem', mr: 1.5 }} />
                      <ListItemText 
                        primary={<Typography variant="body2" fontWeight={500}>Daily Activity</Typography>}
                      />
                      <Chip
                        label={patient.qolMetrics.dailyActivity}
                        size="small"
                        variant="outlined"
                        color={patient.qolMetrics.dailyActivity === 'Independent' ? 'success' : 'warning'}
                        sx={{ fontWeight: 600, height: 22, fontSize: '0.7rem', borderRadius: 1 }}
                      />
                    </ListItem>

                    {/* Appetite */}
                    <ListItem sx={{ py: 1.5, px: 2.5 }}>
                      <RestaurantIcon sx={{ color: 'text.secondary', fontSize: '1.2rem', mr: 1.5 }} />
                      <ListItemText 
                        primary={<Typography variant="body2" fontWeight={500}>Appetite</Typography>}
                      />
                      <Stack direction="row" spacing={0.5}>
                        <Chip
                          label={patient.qolMetrics.appetite}
                          size="small"
                          variant="outlined"
                          color={
                            patient.qolMetrics.appetite === 'Good'
                              ? 'success'
                              : patient.qolMetrics.appetite === 'Fair'
                              ? 'warning'
                              : 'error'
                          }
                          sx={{ fontWeight: 600, height: 22, fontSize: '0.7rem', borderRadius: 1 }}
                        />
                        <Chip label="Improved" size="small" color="success" sx={{ height: 22, fontSize: '0.65rem', fontWeight: 600, borderRadius: 1 }} />
                      </Stack>
                    </ListItem>
                  </List>
                )}
              </Paper>
            </Box>

            {/* Progress Notes */}
            <Box>
              <SectionHeader title="Progress Notes" action={<MicButton />} />
              <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" sx={{ lineHeight: 1.7, color: 'text.primary' }}>
                  {patient.qolMetrics?.progressNote || 'No progress notes recorded.'}
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        {/* Overall Assessment - Clean Banner */}
        <Box sx={{ mt: 4 }}>
          <Paper 
            variant="outlined"
            sx={{ 
              p: 2.5, 
              borderRadius: 2,
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.success.main, 0.3),
              bgcolor: (theme) => alpha(theme.palette.success.main, 0.04),
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <CheckCircleIcon sx={{ color: 'success.main', fontSize: '2rem' }} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'success.dark', mb: 0.25 }}>
                Overall Assessment: Quality of Life Improving
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Patient responding well to palliative chemotherapy with significant symptom improvement. Continue current treatment plan with regular symptom monitoring.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>

      <ActionFooter primaryLabel="Finish and Next Patient" />
    </Box>
  );
}
