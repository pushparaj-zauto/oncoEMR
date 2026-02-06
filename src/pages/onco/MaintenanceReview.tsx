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
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
  Tooltip
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import ChatIcon from '@mui/icons-material/Chat';
import LayersIcon from '@mui/icons-material/Layers';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { alpha } from '@mui/material/styles';
import { OncologyPatient } from '../../types/oncology';
import PatientContextBar from '../../components/onco/PatientContextBar';

interface MaintenanceReviewProps {
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
            boxShadow: (theme) => `0 2px 8px ${alpha(theme.palette.primary.main, 0.2)}`
        }
    }}
  >
    <MicIcon sx={{ fontSize: 16 }} />
  </IconButton>
);

export default function MaintenanceReview({ patient, hideContextBar }: MaintenanceReviewProps) {
  const reviewDates = [
    '2025-11-15',
    '2025-12-15',
    '2026-01-15',
    '2026-02-15',
  ];

  return (
    <Box sx={{ pb: 10 }}>
      {/* Global Patient Context Bar */}
      {!hideContextBar && <PatientContextBar patient={patient} />}

      <Container maxWidth="xl" sx={{ mt: 4, mb: 5 }}>

        <Grid container spacing={4}>
          {/* Left Column - Active Therapy */}
          <Grid item xs={12} md={4}>
            
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                        Active Therapy
                    </Typography>
                    <MicButton />
                </Box>
                
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Table size="small">
                    <TableBody>
                    <TableRow>
                        <TableCell sx={{ width: '40%', borderBottom: 'none', pl: 0 }}>
                        <Typography variant="subtitle2" color="text.secondary">Medication</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Typography variant="body2" color="text.primary" fontWeight={600}>Osimertinib (Tagrisso)</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0 }}>
                        <Typography variant="subtitle2" color="text.secondary">Dose</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Typography variant="body2" color="text.primary">80 mg once daily</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0 }}>
                        <Typography variant="subtitle2" color="text.secondary">Route</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Typography variant="body2" color="text.primary">Oral</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0 }}>
                        <Typography variant="subtitle2" color="text.secondary">Start Date</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Typography variant="body2" color="text.primary">{patient.treatmentStartDate || '2025-10-20'}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0 }}>
                        <Typography variant="subtitle2" color="text.secondary">Duration</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Chip label="Until Progression" size="small" color="info" variant="outlined" sx={{ height: 24 }} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0 }}>
                        <Typography variant="subtitle2" color="text.secondary">Review Interval</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Typography variant="body2" color="text.primary">Every 4 weeks</Typography>
                        </TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </Paper>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'success.dark', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                    Compliance & Adherence
                </Typography>
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Medication Adherence
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                        98%
                    </Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={98} color="success" sx={{ height: 8, borderRadius: 1, bgcolor: alpha('#4caf50', 0.1) }} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', bgcolor: 'grey.50', p: 1.5, borderRadius: 1, borderLeft: '3px solid', borderColor: 'success.main' }}>
                    "Patient reports excellent compliance with daily medication."
                </Typography>
                </Paper>
            </Box>

            <Paper variant="outlined" sx={{ p: 3, mt: 4, bgcolor: (theme) => alpha(theme.palette.primary.main, 0.02), borderRadius: 2, borderColor:  (theme) => alpha(theme.palette.primary.main, 0.2) }}>
              <Typography variant="overline" sx={{ mb: 1, fontWeight: 700, color: 'primary.dark', fontSize: '0.75rem', letterSpacing: 1.2, display: 'block' }}>
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
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                        Last Review Outcome
                    </Typography>
                    <MicButton />
                </Box>
                
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, borderTop: '4px solid', borderTopColor: 'primary.main' }}>
                <Table size="small">
                    <TableBody>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0 }}>
                        <Typography variant="subtitle2" color="text.secondary">Review Date</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Typography variant="body2" color="text.primary">{patient.lastReviewDate || '2026-02-01'}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0 }}>
                        <Typography variant="subtitle2" color="text.secondary">Disease Status</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Chip label="Stable" size="small" color="success" variant="filled" icon={<CheckCircleIcon />} sx={{ '& .MuiChip-label': { px: 1 } }} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0 }}>
                        <Typography variant="subtitle2" color="text.secondary">Imaging Findings</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Typography variant="body2" color="text.primary">No new lesions, stable disease</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0 }}>
                        <Typography variant="subtitle2" color="text.secondary">Tumor Markers</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Chip label="Normal Range" size="small" color="success" variant="outlined" sx={{ height: 24 }} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0, verticalAlign: 'top', py: 1 }}>
                        <Typography variant="subtitle2" color="text.secondary">Side Effects</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none', py: 1 }}>
                        <Typography variant="body2" color="text.primary">Mild skin rash (Grade 1)</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0, verticalAlign: 'top', pt: 2 }}>
                        <Typography variant="subtitle2" color="primary.main">Next Review</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none', pt: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            10 Jun 2026
                        </Typography>
                        </TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </Paper>
            </Box>

            {/* QoL Summary */}
            {patient.qolMetrics && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'text.primary', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                  Quality of Life Summary
                </Typography>
                <Paper variant="outlined" sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: (theme) => alpha(theme.palette.background.default, 0.5), borderRadius: 1.5, border: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.7rem' }}>
                        Pain Score
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mt: 0.5 }}>
                        {patient.qolMetrics.painScore}/10
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: (theme) => alpha(theme.palette.background.default, 0.5), borderRadius: 1.5, border: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.7rem' }}>
                        Mobility
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary', mt: 0.5 }}>
                        {patient.qolMetrics.mobility}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: (theme) => alpha(theme.palette.background.default, 0.5), borderRadius: 1.5, border: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.7rem' }}>
                        Sleep
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary', mt: 0.5 }}>
                        {patient.qolMetrics.sleep}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: (theme) => alpha(theme.palette.background.default, 0.5), borderRadius: 1.5, border: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.7rem' }}>
                        Appetite
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary', mt: 0.5 }}>
                        {patient.qolMetrics.appetite}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2, p: 2, bgcolor: (theme) => alpha(theme.palette.success.main, 0.05), borderRadius: 1.5, border: '1px solid', borderColor: alpha('#4caf50', 0.2) }}>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.primary' }}>
                    <TrendingUpIcon sx={{ color: 'success.main', fontSize: 20 }} />
                    <span style={{ fontWeight: 600 }}>Overall Trend:</span> Improved appetite, reduced fatigue
                  </Typography>
                </Box>
              </Paper>
             </Box>
            )}
          </Grid>

          {/* Right Column - Review History */}
          <Grid item xs={12} md={4}>
             <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                        Review History
                    </Typography>
                    <MicButton />
                </Box>

            <Paper variant="outlined" sx={{ p: 0, borderRadius: 2 }}>
              <Box>
                {reviewDates.reverse().map((date, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2.5,
                      borderBottom: index !== reviewDates.length - 1 ? '1px solid' : 'none',
                      borderColor: 'divider',
                      bgcolor: index === 0 ? alpha('#1976d2', 0.04) : 'transparent',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: index === 0 ? 'primary.main' : 'text.primary' }}>
                        Review {4 - index}
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                        {date}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                        <Chip 
                        label="Stable" 
                        size="small" 
                        variant="outlined"
                        color={index === 0 ? 'success' : 'default'}
                        sx={{ 
                            height: 20, 
                            fontSize: '0.7rem',
                            fontWeight: 500
                        }} 
                        />
                        <Chip 
                        label="Continue Rx" 
                        size="small" 
                        variant="outlined"
                        color={index === 0 ? 'info' : 'default'}
                        sx={{ 
                            height: 20, 
                            fontSize: '0.7rem',
                            fontWeight: 500
                        }} 
                        />
                    </Stack>
                  </Box>
                ))}
              </Box>
            </Paper>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'warning.dark', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                    Monitoring Plan
                </Typography>
                <Paper variant="outlined" sx={{ p: 3, bgcolor: (theme) => alpha(theme.palette.warning.main, 0.02), borderRadius: 2, borderColor: (theme) => alpha(theme.palette.warning.main, 0.3) }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 700, color: 'text.primary' }}>
                    Next Actions:
                </Typography>
                <List dense disablePadding>
                    {[
                        'CT Chest scheduled for 05 Mar 2026',
                        'Routine bloods every 4 weeks',
                        'Monitor for skin toxicity',
                        'Continue supportive care'
                    ].map((item, idx) => (
                         <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                             <Box component="span" sx={{ mr: 1.5, color: 'warning.main', fontSize: '1.2rem', lineHeight: 0 }}>•</Box>
                             <ListItemText primary={<Typography variant="body2" color="text.primary">{item}</Typography>} />
                         </ListItem>
                    ))}
                </List>
                </Paper>
            </Box>

            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{ 
                mt: 4, 
                py: 1.5, 
                fontWeight: 700, 
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                boxShadow: 'none',
                border: '1px solid',
                borderColor: 'primary.main',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
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
