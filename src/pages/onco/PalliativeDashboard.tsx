import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
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
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', letterSpacing: '-0.2px' }}>
              Palliative Care Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
              Concise summary of symptoms, QoL metrics and current therapy
            </Typography>
          </Box>
          <Chip
            label="PALLIATIVE INTENT"
            color="info"
            sx={{ fontWeight: 700, fontSize: '0.9rem', py: 1.5, px: 1.2 }}
            variant="outlined"
          />
        </Box>

        <Grid container spacing={3}>
          {/* Pain Score - Large Prominent Display */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 0, overflow: 'visible' }}>
              <CardHeader
                title="Pain Score (0–10)"
                titleTypographyProps={{ variant: 'h6', fontWeight: 700 }}
                sx={{ pb: 0 }}
              />
              <CardContent sx={{ textAlign: 'center', pt: 1 }}>
                <Box
                  sx={{
                    width: 160,
                    height: 160,
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
                    mb: 1,
                  }}
                >
                  <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1 }}>
                    {painScore}
                  </Typography>
                </Box>

                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Previously: <strong>{previousPainScore}</strong>
                  </Typography>
                  <Chip label={`↓ ${previousPainScore - painScore} pts`} size="small" color="success" />
                </Stack>

                <Box sx={{ mt: 2 }}>
                  <Slider
                    value={painScore}
                    min={0}
                    max={10}
                    marks
                    disabled
                    color={getPainColor(painScore)}
                    sx={{ mt: 1 }}
                  />
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ p: 0, mt: 2, bgcolor: 'info.light', border: theme => `1px solid ${theme.palette.info.main}` }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700, color: 'info.dark' }}>
                  Care Goal
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                  Comfort-focused care; continue current chemotherapy for disease control and symptom management.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Symptom Checklist */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}>
                  Symptom Assessment
                </Typography>

                {patient.qolMetrics?.symptoms && (
                  <Box>
                    <FormControlLabel
                      control={<Checkbox checked={patient.qolMetrics.symptoms.pain} />}
                      label={
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
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
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
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
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
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
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
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
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            Anxiety
                          </Typography>
                        </Box>
                      }
                      sx={{ width: '100%', alignItems: 'flex-start' }}
                    />
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Supportive Medications */}
            <Card sx={{ mt: 2 }}>
              <CardHeader
                title="Supportive Medications"
                titleTypographyProps={{ variant: 'subtitle1', fontWeight: 700 }}
                sx={{ pb: 0 }}
              />
              <CardContent>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Pain Relief</TableCell>
                      <TableCell>Morphine SR 30 mg BD</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Anti-emetic</TableCell>
                      <TableCell>Ondansetron 8 mg PRN</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Anxiolytic</TableCell>
                      <TableCell>Lorazepam 0.5 mg PRN</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Appetite Stimulant</TableCell>
                      <TableCell>Megestrol 400 mg OD</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>

          {/* Quality of Life Metrics */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 0 }}>
              <CardHeader
                title="Quality of Life"
                titleTypographyProps={{ variant: 'h6', fontWeight: 700, color: 'success.dark' }}
                sx={{ pb: 0 }}
              />
              <CardContent sx={{ bgcolor: 'success.light' }}>
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
              </CardContent>
            </Card>

            {/* Chemotherapy Status (if continuing) */}
            {patient.currentProtocol && (
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700, color: 'primary.main' }}>
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
                </CardContent>
              </Card>
            )}

            {/* Clinical Notes */}
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}>
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Overall Status Banner */}
        <Card sx={{ mt: 3, p: 2, bgcolor: 'success.main', color: 'white', textAlign: 'center', boxShadow: 6 }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
              Overall Assessment: Quality of Life Improving
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.95 }}>
              Patient responding well to palliative chemotherapy with significant symptom improvement. Continue current
              treatment plan with regular symptom monitoring.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
