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
  FormControlLabel,
  TextField,
  Slider,
  Stack,
  Divider,
} from '@mui/material';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessibleIcon from '@mui/icons-material/Accessible';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HotelIcon from '@mui/icons-material/Hotel';
import { OncologyPatient } from '../../types/oncology';
import PatientContextBar from '../../components/onco/PatientContextBar';

interface PalliativeDashboardProps {
  patient: OncologyPatient;
}

export default function PalliativeDashboard({ patient }: PalliativeDashboardProps) {
  const getPainColor = (score: number) => {
    if (score <= 3) return 'success';
    if (score <= 6) return 'warning';
    return 'error';
  };

  const painScore = patient.qolMetrics?.painScore || 3;
  const previousPainScore = 7; // Mock previous score

  return (
    <Box>
      {/* Global Patient Context Bar */}
      <PatientContextBar patient={patient} />

      <Container maxWidth="xl" sx={{ mt: 4, mb: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
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
            color="info"
            sx={{ fontWeight: 700, fontSize: '0.85rem', py: 0.5 }}
            variant="outlined"
          />
        </Box>

        <Grid container spacing={3}>
          {/* Column 1: Current Treatment & Pain Score */}
          <Grid item xs={12} md={4}>
            {/* Current Treatment (Moved here) */}
             {patient.currentProtocol && (
              <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                  Current Treatment
                </Typography>
                <Box>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>Protocol:</strong> {patient.currentProtocol.name}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">Progress</Typography>
                    <Typography variant="caption" fontWeight={600}>
                      {patient.cycleOutcomes?.length || 0} / {patient.currentProtocol.cycles} Cycles
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={((patient.cycleOutcomes?.length || 0) / patient.currentProtocol.cycles) * 100}
                    color="primary"
                    sx={{ height: 6, borderRadius: 1, bgcolor: 'grey.200' }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                    Last cycle: {patient.cycleOutcomes?.[patient.cycleOutcomes.length - 1]?.date}
                  </Typography>
                </Box>
              </Paper>
            )}

            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                Pain Score (0–10)
              </Typography>
              
              <Box sx={{ textAlign: 'center', pt: 1 }}>
                <Box
                  sx={{
                    width: 140,
                    height: 140,
                    mx: 'auto',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    background: theme =>
                      `linear-gradient(135deg, ${theme.palette[getPainColor(painScore)].light}, ${theme.palette[getPainColor(painScore)].main})`,
                    color: 'common.white',
                    mb: 2,
                  }}
                >
                  <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1 }}>
                    {painScore}
                  </Typography>
                </Box>

                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Previously: <strong>{previousPainScore}</strong>
                  </Typography>
                  <Chip label={`↓ ${previousPainScore - painScore} pts`} size="small" color="success" />
                </Stack>

                <Slider
                  value={painScore}
                  min={0}
                  max={10}
                  marks
                  disabled
                  color={getPainColor(painScore)}
                  sx={{ width: '90%' }}
                />
              </Box>
            </Paper>

            <Paper elevation={1} sx={{ p: 3, mt: 3, borderRadius: 2, bgcolor: 'info.light', border: '1px solid', borderColor: 'info.main' }}>
              <Typography variant="overline" sx={{ mb: 1, fontWeight: 700, color: 'info.dark', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                Care Goal
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                Comfort-focused care; continue current chemotherapy for disease control and symptom management.
              </Typography>
            </Paper>
          </Grid>

          {/* Column 2: Symptom Checklist & Meds */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                Symptom Assessment
              </Typography>

              {patient.qolMetrics?.symptoms && (
                <Box>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Checkbox checked={patient.qolMetrics.symptoms.pain} size="small" sx={{ p: 0.5, mt: 0.5, mr: 1 }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Pain</Typography>
                        <Chip label="Improved" size="small" color="success" sx={{ mt: 0.5, height: 20, fontSize: '0.7rem' }} />
                      </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Checkbox checked={patient.qolMetrics.symptoms.fatigue} size="small" sx={{ p: 0.5, mt: 0.5, mr: 1 }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Fatigue</Typography>
                        <Chip label="Stable" size="small" color="default" sx={{ mt: 0.5, height: 20, fontSize: '0.7rem' }} />
                      </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Checkbox checked={patient.qolMetrics.symptoms.breathlessness} size="small" sx={{ p: 0.5, mt: 0.5, mr: 1 }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Breathlessness</Typography>
                        <Chip label="Stable" size="small" color="default" sx={{ mt: 0.5, height: 20, fontSize: '0.7rem' }} />
                      </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Checkbox checked={patient.qolMetrics.symptoms.nausea} size="small" sx={{ p: 0.5, mr: 1 }} />
                      <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>Nausea</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Checkbox checked={patient.qolMetrics.symptoms.anxiety} size="small" sx={{ p: 0.5, mr: 1 }} />
                      <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>Anxiety</Typography>
                    </Box>
                  </Stack>
                </Box>
              )}
            </Paper>

            {/* Supportive Medications */}
            <Paper elevation={1} sx={{ p: 3, mt: 3, borderRadius: 2 }}>
              <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                Supportive Medications
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Pain Relief</TableCell>
                    <TableCell>Morphine SR 30 mg BD</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Anti-emetic</TableCell>
                    <TableCell>Ondansetron 8 mg PRN</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Anxiolytic</TableCell>
                    <TableCell>Lorazepam 0.5 mg PRN</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Appetite Stimulant</TableCell>
                    <TableCell>Megestrol 400 mg OD</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Grid>

          {/* Column 3: Quality of Life & Notes */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'success.dark', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                Quality of Life
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                {patient.qolMetrics && (
                  <Stack spacing={2}>
                    {/* Mobility */}
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <AccessibleIcon sx={{ color: 'success.main', fontSize: '1.1rem' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Mobility</Typography>
                      </Box>
                      <Chip
                        label={patient.qolMetrics.mobility}
                        size="small"
                        variant="outlined"
                        color={patient.qolMetrics.mobility === 'Independent' ? 'success' : 'warning'}
                        sx={{ fontWeight: 600, height: 24 }}
                      />
                    </Box>

                    <Divider />

                    {/* Sleep */}
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <HotelIcon sx={{ color: 'success.main', fontSize: '1.1rem' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Sleep</Typography>
                      </Box>
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
                        sx={{ fontWeight: 600, height: 24 }}
                        icon={
                          patient.qolMetrics.sleep === 'Good' ? (
                            <SentimentVerySatisfiedIcon sx={{ fontSize: '1rem !important' }} />
                          ) : patient.qolMetrics.sleep === 'Fair' ? (
                            <SentimentSatisfiedIcon sx={{ fontSize: '1rem !important' }} />
                          ) : (
                            <SentimentDissatisfiedIcon sx={{ fontSize: '1rem !important' }} />
                          )
                        }
                      />
                    </Box>

                    <Divider />

                    {/* Daily Activity */}
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <FavoriteIcon sx={{ color: 'success.main', fontSize: '1.1rem' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Daily Activity</Typography>
                      </Box>
                      <Chip
                        label={patient.qolMetrics.dailyActivity}
                        size="small"
                        variant="outlined"
                        color={patient.qolMetrics.dailyActivity === 'Independent' ? 'success' : 'warning'}
                        sx={{ fontWeight: 600, height: 24 }}
                      />
                    </Box>

                    <Divider />

                    {/* Appetite */}
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <RestaurantIcon sx={{ color: 'success.main', fontSize: '1.1rem' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Appetite</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
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
                          sx={{ fontWeight: 600, height: 24 }}
                        />
                        <Chip label="Improved" size="small" color="success" sx={{ height: 24 }} />
                      </Box>
                    </Box>
                  </Stack>
                )}
              </Box>
            </Paper>

            {/* Clinical Notes */}
            <Paper elevation={1} sx={{ p: 3, mt: 3, borderRadius: 2 }}>
              <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                Progress Notes
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                defaultValue="Patient tolerating treatment better this cycle. Pain score reduced from 7 to 3. Appetite improved, now able to eat regular meals. Breathing improved significantly. Family support is strong. Continue current management."
                variant="outlined"
                size="small"
                InputProps={{
                    style: { fontSize: '0.875rem', lineHeight: 1.6 }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'grey.50',
                  }
                }}
              />
            </Paper>
          </Grid>
        </Grid>

        {/* Overall Status Banner */}
        <Paper 
          elevation={3}
          sx={{ 
            mt: 3, 
            p: 2, 
            bgcolor: 'success.main', 
            color: 'white', 
            textAlign: 'center',
            borderRadius: 2
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5, fontSize: '1.1rem' }}>
            Overall Assessment: Quality of Life Improving
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.95 }}>
            Patient responding well to palliative chemotherapy with significant symptom improvement. Continue current
            treatment plan with regular symptom monitoring.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
