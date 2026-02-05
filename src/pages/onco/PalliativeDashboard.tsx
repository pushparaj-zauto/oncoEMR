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

      <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
            Palliative Care Dashboard
          </Typography>
          <Chip
            label="PALLIATIVE INTENT"
            color="info"
            sx={{ fontWeight: 700, fontSize: '0.9rem', py: 2.5, px: 1 }}
          />
        </Box>

        <Grid container spacing={3}>
          {/* Pain Score - Large Prominent Display */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                border: '3px solid',
                borderColor: `${getPainColor(painScore)}.main`,
                bgcolor: `${getPainColor(painScore)}.light`,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Pain Score (0–10)
              </Typography>
              <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
                <Box
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    border: '8px solid',
                    borderColor: `${getPainColor(painScore)}.main`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'white',
                  }}
                >
                  <Typography variant="h1" sx={{ fontWeight: 700, color: `${getPainColor(painScore)}.main` }}>
                    {painScore}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Previously: <strong>{previousPainScore}</strong>
                </Typography>
                <Chip
                  label={`↓ ${previousPainScore - painScore} points`}
                  size="small"
                  color="success"
                  sx={{ fontWeight: 600 }}
                />
              </Box>

              {/* Pain Score Slider */}
              <Box sx={{ mt: 3, px: 2 }}>
                <Slider
                  value={painScore}
                  min={0}
                  max={10}
                  marks
                  disabled
                  color={getPainColor(painScore)}
                  sx={{
                    '& .MuiSlider-markLabel': {
                      fontSize: '0.7rem',
                    },
                  }}
                />
              </Box>
            </Paper>

            {/* Care Goal */}
            <Paper sx={{ p: 3, mt: 2, bgcolor: 'info.light', border: '2px solid', borderColor: 'info.main' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'info.dark' }}>
                Care Goal
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Comfort-focused care, continue current chemotherapy for disease control and symptom management.
              </Typography>
            </Paper>
          </Grid>

          {/* Symptom Checklist */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                Symptom Assessment
              </Typography>

              {patient.qolMetrics?.symptoms && (
                <Box>
                  <FormControlLabel
                    control={<Checkbox checked={patient.qolMetrics.symptoms.pain} />}
                    label={
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          Pain
                        </Typography>
                        <Chip label="Improved" size="small" color="success" sx={{ mt: 0.5 }} />
                      </Box>
                    }
                    sx={{ width: '100%', mb: 2, alignItems: 'flex-start' }}
                  />
                  <FormControlLabel
                    control={<Checkbox checked={patient.qolMetrics.symptoms.fatigue} />}
                    label={
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          Fatigue
                        </Typography>
                        <Chip label="Stable" size="small" color="default" sx={{ mt: 0.5 }} />
                      </Box>
                    }
                    sx={{ width: '100%', mb: 2, alignItems: 'flex-start' }}
                  />
                  <FormControlLabel
                    control={<Checkbox checked={patient.qolMetrics.symptoms.breathlessness} />}
                    label={
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          Breathlessness
                        </Typography>
                        <Chip label="Stable" size="small" color="default" sx={{ mt: 0.5 }} />
                      </Box>
                    }
                    sx={{ width: '100%', mb: 2, alignItems: 'flex-start' }}
                  />
                  <FormControlLabel
                    control={<Checkbox checked={patient.qolMetrics.symptoms.nausea} />}
                    label={
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          Nausea
                        </Typography>
                      </Box>
                    }
                    sx={{ width: '100%', mb: 2, alignItems: 'flex-start' }}
                  />
                  <FormControlLabel
                    control={<Checkbox checked={patient.qolMetrics.symptoms.anxiety} />}
                    label={
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          Anxiety
                        </Typography>
                      </Box>
                    }
                    sx={{ width: '100%', alignItems: 'flex-start' }}
                  />
                </Box>
              )}
            </Paper>

            {/* Supportive Medications */}
            <Paper sx={{ p: 3, mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                Supportive Medications
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Pain Relief</TableCell>
                    <TableCell>Morphine SR 30 mg BD</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Anti-emetic</TableCell>
                    <TableCell>Ondansetron 8 mg PRN</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Anxiolytic</TableCell>
                    <TableCell>Lorazepam 0.5 mg PRN</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Appetite Stimulant</TableCell>
                    <TableCell>Megestrol 400 mg OD</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Grid>

          {/* Quality of Life Metrics */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, bgcolor: 'success.light' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'success.dark' }}>
                Quality of Life
              </Typography>

              {patient.qolMetrics && (
                <Box>
                  {/* Mobility */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <AccessibleIcon sx={{ color: 'success.dark' }} />
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Mobility
                      </Typography>
                    </Box>
                    <Chip
                      label={patient.qolMetrics.mobility}
                      color={patient.qolMetrics.mobility === 'Independent' ? 'success' : 'warning'}
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>

                  {/* Sleep */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <HotelIcon sx={{ color: 'success.dark' }} />
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Sleep
                      </Typography>
                    </Box>
                    <Chip
                      label={patient.qolMetrics.sleep}
                      color={
                        patient.qolMetrics.sleep === 'Good'
                          ? 'success'
                          : patient.qolMetrics.sleep === 'Fair'
                          ? 'warning'
                          : 'error'
                      }
                      sx={{ fontWeight: 600 }}
                      icon={
                        patient.qolMetrics.sleep === 'Good' ? (
                          <SentimentVerySatisfiedIcon />
                        ) : patient.qolMetrics.sleep === 'Fair' ? (
                          <SentimentSatisfiedIcon />
                        ) : (
                          <SentimentDissatisfiedIcon />
                        )
                      }
                    />
                  </Box>

                  {/* Daily Activity */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <FavoriteIcon sx={{ color: 'success.dark' }} />
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Daily Activity
                      </Typography>
                    </Box>
                    <Chip
                      label={patient.qolMetrics.dailyActivity}
                      color={patient.qolMetrics.dailyActivity === 'Independent' ? 'success' : 'warning'}
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>

                  {/* Appetite */}
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <RestaurantIcon sx={{ color: 'success.dark' }} />
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Appetite
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={patient.qolMetrics.appetite}
                        color={
                          patient.qolMetrics.appetite === 'Good'
                            ? 'success'
                            : patient.qolMetrics.appetite === 'Fair'
                            ? 'warning'
                            : 'error'
                        }
                        sx={{ fontWeight: 600 }}
                      />
                      <Chip label="Improved" size="small" color="success" />
                    </Box>
                  </Box>
                </Box>
              )}
            </Paper>

            {/* Chemotherapy Status (if continuing) */}
            {patient.currentProtocol && (
              <Paper sx={{ p: 3, mt: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                  Current Treatment
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Protocol:</strong> {patient.currentProtocol.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Cycles Completed:</strong> {patient.cycleOutcomes?.length || 0} /{' '}
                  {patient.currentProtocol.cycles}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={((patient.cycleOutcomes?.length || 0) / patient.currentProtocol.cycles) * 100}
                    color="primary"
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  Last cycle: {patient.cycleOutcomes?.[patient.cycleOutcomes.length - 1]?.date}
                </Typography>
              </Paper>
            )}

            {/* Clinical Notes */}
            <Paper sx={{ p: 3, mt: 2, bgcolor: 'grey.50' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                Progress Notes
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                defaultValue="Patient tolerating treatment better this cycle. Pain score reduced from 7 to 3. Appetite improved, now able to eat regular meals. Breathing improved significantly. Family support is strong. Continue current management."
                variant="outlined"
                size="small"
              />
            </Paper>
          </Grid>
        </Grid>

        {/* Overall Status Banner */}
        <Paper
          sx={{
            mt: 3,
            p: 3,
            bgcolor: 'success.main',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Overall Assessment: Quality of Life Improving
          </Typography>
          <Typography variant="body1">
            Patient responding well to palliative chemotherapy with significant symptom improvement. Continue current
            treatment plan with regular symptom monitoring.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
