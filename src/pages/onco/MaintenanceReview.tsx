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
  Fab,
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import ChatIcon from '@mui/icons-material/Chat';
import LayersIcon from '@mui/icons-material/Layers';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HomeIcon from '@mui/icons-material/Home';
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
    <Box sx={{ pb: 10 }}>
      {/* Global Patient Context Bar */}
      <PatientContextBar patient={patient} />

      <Container maxWidth="xl" sx={{ mt: 4, mb: 5 }}>

        <Grid container spacing={3}>
          {/* Left Column - Active Therapy */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                Active Therapy
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ width: '40%' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Medication</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.primary">Osimertinib (Tagrisso)</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Dose</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.primary">80 mg once daily</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Route</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.primary">Oral</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Start Date</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.primary">{patient.treatmentStartDate || '2025-10-20'}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Duration</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label="Until Progression" size="small" color="info" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Review Interval</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.primary">Every 4 weeks</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>

            <Paper elevation={1} sx={{ p: 3, mt: 2, borderRadius: 2 }}>
              <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'success.dark', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
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
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                "Patient reports excellent compliance with daily medication."
              </Typography>
            </Paper>

            <Paper elevation={1} sx={{ p: 3, mt: 2, bgcolor: 'primary.50', borderRadius: 2, border: '1px solid', borderColor: 'primary.100' }}>
              <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'primary.dark', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                Treatment Duration
              </Typography>
              <Box sx={{ textAlign: 'center', py: 1 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  3.5
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary', mt: 0.5 }}>
                  Months on Therapy
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Middle Column - Last Review Outcome */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2, borderTop: '4px solid', borderTopColor: 'primary.main', borderLeft: 0 }}>
              <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                Last Review Outcome
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Review Date</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.primary">{patient.lastReviewDate || '2026-02-01'}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Disease Status</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label="Stable" size="small" color="success" icon={<CheckCircleIcon />} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Imaging Findings</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.primary">No new lesions, stable disease</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Tumor Markers</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label="Within Normal Range" size="small" color="success" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Side Effects</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.primary">Mild skin rash (Grade 1)</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ verticalAlign: 'top' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Next Review</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        10 Jun 2026
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>

            {/* QoL Summary */}
            {patient.qolMetrics && (
              <Paper elevation={1} sx={{ p: 3, mt: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
                <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'text.primary', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                  Quality of Life Summary
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'white', borderRadius: 1.5, boxShadow: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.7rem' }}>
                        Pain Score
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mt: 0.5 }}>
                        {patient.qolMetrics.painScore}/10
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'white', borderRadius: 1.5, boxShadow: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.7rem' }}>
                        Mobility
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary', mt: 0.5 }}>
                        {patient.qolMetrics.mobility}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'white', borderRadius: 1.5, boxShadow: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.7rem' }}>
                        Sleep
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary', mt: 0.5 }}>
                        {patient.qolMetrics.sleep}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'white', borderRadius: 1.5, boxShadow: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.7rem' }}>
                        Appetite
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary', mt: 0.5 }}>
                        {patient.qolMetrics.appetite}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2, p: 2, bgcolor: 'white', borderRadius: 1.5, boxShadow: 1 }}>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                    <TrendingUpIcon sx={{ color: 'success.main', fontSize: 20 }} />
                    <span style={{ fontWeight: 600, color: '#212121' }}>Overall Trend:</span> Improved appetite, reduced fatigue
                  </Typography>
                </Box>
              </Paper>
            )}
          </Grid>

          {/* Right Column - Review History */}
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                Review History
              </Typography>
              <Box>
                {reviewDates.reverse().map((date, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2.5,
                      mb: 2,
                      borderRadius: 1.5,
                      bgcolor: index === 0 ? 'primary.main' : 'grey.50',
                      color: index === 0 ? 'white' : 'inherit',
                      boxShadow: index === 0 ? 2 : 0,
                      transition: 'all 0.2s',
                      '&:hover': {
                        boxShadow: 2,
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: index === 0 ? 'white' : 'text.primary' }}>
                        Review {4 - index}
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 500, color: index === 0 ? 'rgba(255,255,255,0.8)' : 'text.secondary' }}>
                        {date}
                      </Typography>
                    </Box>
                    <Chip 
                      label="Disease Stable" 
                      size="small" 
                      sx={{ 
                        mr: 0.5, 
                        bgcolor: index === 0 ? 'rgba(255,255,255,0.2)' : 'success.light',
                        color: index === 0 ? 'white' : 'success.dark',
                        fontWeight: 600,
                        borderRadius: 1
                      }} 
                    />
                    <Chip 
                      label="Continue Rx" 
                      size="small" 
                      sx={{ 
                        bgcolor: index === 0 ? 'rgba(255,255,255,0.2)' : 'info.light',
                        color: index === 0 ? 'white' : 'info.dark',
                        fontWeight: 600,
                        borderRadius: 1
                      }} 
                    />
                  </Box>
                ))}
              </Box>
            </Paper>

            <Paper elevation={1} sx={{ p: 3, mt: 2, bgcolor: 'warning.light', borderRadius: 2 }}>
              <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'warning.dark', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                Monitoring Plan
              </Typography>
              <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 700, color: 'text.primary' }}>
                Next Actions:
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>  
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
              sx={{ 
                mt: 2, 
                py: 1.5, 
                fontWeight: 700, 
                borderRadius: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                boxShadow: 2,
                '&:hover': {
                  boxShadow: 4,
                }
              }}
            >
              Record New Review
            </Button>
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
