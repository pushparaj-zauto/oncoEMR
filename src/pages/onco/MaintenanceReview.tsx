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
  Button,
  LinearProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { OncologyPatient } from '../../types/oncology';
import PatientContextBar from '../../components/onco/PatientContextBar';

interface MaintenanceReviewProps {
  patient: OncologyPatient;
}

export default function MaintenanceReview({ patient }: MaintenanceReviewProps) {
  const reviewDates = [
    '2025-11-15',
    '2025-12-15',
    '2026-01-15',
    '2026-02-15',
  ];

  return (
    <Box>
      {/* Global Patient Context Bar */}
      <PatientContextBar patient={patient} />

      <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: 'primary.main' }}>
          Maintenance Overview
        </Typography>

        <Grid container spacing={3}>
          {/* Left Column - Active Therapy */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, border: '2px solid', borderColor: 'success.main' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'success.dark' }}>
                Active Therapy
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Medication</TableCell>
                    <TableCell>Osimertinib (Tagrisso)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Dose</TableCell>
                    <TableCell>80 mg once daily</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Route</TableCell>
                    <TableCell>Oral</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Start Date</TableCell>
                    <TableCell>
                      {patient.treatmentStartDate || '2025-10-20'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
                    <TableCell>
                      <Chip label="Until Progression" size="small" color="info" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Review Interval</TableCell>
                    <TableCell>Every 4 weeks</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>

            <Paper sx={{ p: 3, mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                Compliance & Adherence
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Medication Adherence
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                    98%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={98} color="success" sx={{ height: 8, borderRadius: 1 }} />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Patient reports excellent compliance with daily medication.
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, mt: 2, bgcolor: 'info.light' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'info.dark' }}>
                Treatment Duration
              </Typography>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h2" sx={{ fontWeight: 700, color: 'info.dark' }}>
                  3.5
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Months on Therapy
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Middle Column - Last Review Outcome */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, border: '2px solid', borderColor: 'primary.main' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                Last Review Outcome
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Review Date</TableCell>
                    <TableCell>{patient.lastReviewDate || '2026-02-01'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Disease Status</TableCell>
                    <TableCell>
                      <Chip label="Stable" size="small" color="success" icon={<CheckCircleIcon />} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Imaging Findings</TableCell>
                    <TableCell>No new lesions, stable disease</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Tumor Markers</TableCell>
                    <TableCell>
                      <Chip label="Within Normal Range" size="small" color="success" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Side Effects</TableCell>
                    <TableCell>Mild skin rash (Grade 1)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, verticalAlign: 'top' }}>Next Review</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        10 Jun 2026
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>

            {/* QoL Summary */}
            {patient.qolMetrics && (
              <Paper sx={{ p: 3, mt: 2, bgcolor: 'success.light' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'success.dark' }}>
                  Quality of Life Summary
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'white', borderRadius: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        Pain Score
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                        {patient.qolMetrics.painScore}/10
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'white', borderRadius: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        Mobility
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: 'success.main' }}>
                        {patient.qolMetrics.mobility}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'white', borderRadius: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        Sleep
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: 'success.main' }}>
                        {patient.qolMetrics.sleep}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'white', borderRadius: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        Appetite
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: 'success.main' }}>
                        {patient.qolMetrics.appetite}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2, p: 1.5, bgcolor: 'white', borderRadius: 1 }}>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TrendingUpIcon sx={{ color: 'success.main' }} />
                    <strong>Overall Trend:</strong> Improved appetite, reduced fatigue
                  </Typography>
                </Box>
              </Paper>
            )}
          </Grid>

          {/* Right Column - Review History */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                Review History
              </Typography>
              <Box>
                {reviewDates.reverse().map((date, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      mb: 2,
                      border: '1px solid',
                      borderColor: index === 0 ? 'primary.main' : 'divider',
                      borderRadius: 1,
                      bgcolor: index === 0 ? 'primary.light' : 'white',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        Review {4 - index}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {date}
                      </Typography>
                    </Box>
                    <Chip label="Disease Stable" size="small" color="success" sx={{ mr: 0.5 }} />
                    <Chip label="Continue Rx" size="small" color="info" />
                  </Box>
                ))}
              </Box>
            </Paper>

            <Paper sx={{ p: 3, mt: 2, bgcolor: 'warning.light' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'warning.dark' }}>
                Monitoring Plan
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Next Actions:</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • CT Chest scheduled for 05 Mar 2026
                <br />
                • Routine bloods every 4 weeks
                <br />
                • Monitor for skin toxicity
                <br />• Continue supportive care
              </Typography>
            </Paper>

            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 2, py: 1.5, fontWeight: 600 }}
            >
              Record New Review
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
