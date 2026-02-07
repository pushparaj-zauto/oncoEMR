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
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Divider,
  Stack,
  Fab,
  IconButton,
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import ChatIcon from '@mui/icons-material/Chat';
import LayersIcon from '@mui/icons-material/Layers';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HomeIcon from '@mui/icons-material/Home';
import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { OncologyPatient } from '../../types/oncology';
import PatientContextBar from '../../components/onco/PatientContextBar';
import { alpha } from '@mui/material/styles';

interface TreatmentPlanningProps {
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

export default function TreatmentPlanning({ patient, hideContextBar }: TreatmentPlanningProps) {
  const [intent, setIntent] = useState(patient.treatmentIntent || '');

  const handleIntentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = (event.target as HTMLInputElement).value;
    setIntent((prev) => (prev === newVal ? '' : newVal));
  };

  const handleRadioClick = (value: string) => {
    if (intent === value) {
      setIntent('');
    }
  };

  return (
    <Box sx={{ pb: 10 }}>
      {/* Global Patient Context Bar */}
      {!hideContextBar && <PatientContextBar patient={patient} />}

      <Container maxWidth="xl" sx={{ mt: 4, mb: 5 }}>
        <Grid container spacing={4}>
          {/* Left Column - Confirmed Diagnosis & Patient Fitness */}
          <Grid item xs={12} md={4}>
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="overline" sx={{ fontWeight: 700, color: 'success.dark', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                        Confirmed Diagnosis
                    </Typography>
                    <MicButton />
                </Box>
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                <Table size="small">
                    <TableBody>
                    <TableRow>
                        <TableCell sx={{ width: '45%', borderBottom: 'none', pl: 0 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Final Histopathology</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Typography variant="body2" color="text.primary">{patient.histology}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Tumor Subtype</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Typography variant="body2" color="text.primary">
                            {patient.cancerSite === 'Breast'
                            ? 'ER+, PR+, HER2-'
                            : patient.cancerSite === 'Lung'
                            ? 'EGFR Wild Type'
                            : 'Standard'}
                        </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Final TNM Stage</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Chip label={patient.tnmStage || 'Pending'} size="small" color="secondary" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Clinical Stage</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Chip label={`Stage ${patient.stage}`} size="small" color="secondary" />
                        </TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </Paper>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                        Patient Fitness Snapshot
                    </Typography>
                    <MicButton />
                </Box>
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                <Table size="small">
                    <TableBody>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>ECOG Performance</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Chip label={patient.ecogStatus} size="small" color="primary" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Major Comorbidities</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                            {patient.comorbidities?.diabetes && <Chip label="Diabetes" size="small" variant="outlined" />}
                            {patient.comorbidities?.cardiacDisease && <Chip label="Cardiac" size="small" variant="outlined" />}
                            {patient.comorbidities?.renalDisease && <Chip label="Renal" size="small" variant="outlined" />}
                            {!patient.comorbidities?.diabetes &&
                            !patient.comorbidities?.cardiacDisease &&
                            !patient.comorbidities?.renalDisease && (
                                <Typography variant="body2" color="success.main">None</Typography>
                            )}
                        </Stack>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Organ Function</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Chip label="Normal" size="small" color="success" variant="outlined" />
                        </TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </Paper>
            </Box>

            {/* MDT Decision Summary */}
            {patient.mdtDecision && (
                <Box sx={{ mt: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography variant="overline" sx={{ fontWeight: 700, color: 'info.dark', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                            MDT Decision Summary
                        </Typography>
                        <MicButton />
                    </Box>
                    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: (theme) => alpha(theme.palette.background.paper, 1) }}>
                    <Table size="small">
                        <TableBody>
                        <TableRow>
                            <TableCell sx={{ borderBottom: 'none', pl: 0 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>MDT Status</Typography>
                            </TableCell>
                            <TableCell sx={{ borderBottom: 'none' }}>
                            <Chip
                                label={patient.mdtDecision.status}
                                size="small"
                                color={patient.mdtDecision.status === 'Approved' ? 'success' : 'warning'}
                                icon={patient.mdtDecision.status === 'Approved' ? <CheckCircleIcon /> : undefined}
                            />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ borderBottom: 'none', pl: 0 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Date of Discussion</Typography>
                            </TableCell>
                            <TableCell sx={{ borderBottom: 'none' }}>
                            <Typography variant="body2">{patient.mdtDecision.date}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ verticalAlign: 'top', borderBottom: 'none', pl: 0 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Decision Summary</Typography>
                            </TableCell>
                            <TableCell sx={{ borderBottom: 'none' }}>
                            <Typography variant="body2">{patient.mdtDecision.summary}</Typography>
                            </TableCell>
                        </TableRow>
                        {patient.mdtDecision.participants && (
                            <TableRow>
                            <TableCell sx={{ verticalAlign: 'top', borderBottom: 'none', pl: 0 }}>
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Participants</Typography>
                            </TableCell>
                            <TableCell sx={{ borderBottom: 'none' }}>
                                <Stack spacing={0.5}>
                                {patient.mdtDecision.participants.map((p, i) => (
                                    <Typography key={i} variant="body2">• {p}</Typography>
                                ))}
                                </Stack>
                            </TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                    </Paper>
                </Box>
            )}
          </Grid>

          {/* Middle Column - Treatment Intent & Strategy */}
          <Grid item xs={12} md={4}>
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' }}>
                    <Typography
                        variant="overline"
                        sx={{ fontWeight: 600, color: 'primary.main', fontSize: '0.9rem', letterSpacing: 1 }}
                    >
                        Treatment Intent
                    </Typography>
                    <MicButton />
                </Box>
                <Paper variant="outlined" sx={{ p: 3, borderColor: 'primary.main', borderWidth: 1, borderStyle: 'solid', borderRadius: 2 }}>
                <FormControl component="fieldset" fullWidth>
                    <RadioGroup value={intent} onChange={handleIntentChange}>
                    {['Curative', 'Disease Control', 'Palliative'].map((option) => (
                        <Paper
                            key={option}
                            variant="outlined"
                            sx={{
                                mb: 1,
                                border: intent === option ? '2px solid' : '1px solid',
                                borderColor: intent === option ? 'primary.main' : 'divider',
                                bgcolor: intent === option ? (theme) => alpha(theme.palette.primary.main, 0.08) : 'transparent',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                                    borderColor: intent === option ? 'primary.main' : 'primary.light',
                                }
                            }}
                        >
                            <FormControlLabel
                                value={option}
                                control={<Radio size="small" onClick={() => handleRadioClick(option)} sx={{ p: 0.5 }} />}
                                label={
                                    <Typography variant="body2" fontWeight={intent === option ? 700 : 500} color={intent === option ? 'primary.main' : 'text.primary'}>
                                        {option}
                                    </Typography>
                                }
                                sx={{ m: 0, width: '100%', py: 0.5, px: 1, '& .MuiFormControlLabel-label': { width: '100%' } }}
                            />
                        </Paper>
                    ))}
                    </RadioGroup>
                </FormControl>
                </Paper>

            </Box>

            <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                        Treatment Strategy Map
                    </Typography>
                    <MicButton />
                </Box>
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                {patient.treatmentStrategy && (
                    <>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
                        Planned Modalities:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {patient.treatmentStrategy.surgery && (
                            <Chip label="Surgery" size="small" color="primary" variant="outlined" />
                        )}
                        {patient.treatmentStrategy.systemicTherapy && (
                            <Chip label="Chemotherapy" size="small" color="primary" variant="outlined" />
                        )}
                        {patient.treatmentStrategy.radiation && (
                            <Chip label="Radiation" size="small" color="primary" variant="outlined" />
                        )}
                        </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
                        Treatment Sequence:
                        </Typography>
                        <Paper
                        variant="outlined"
                        sx={{ p: 2, bgcolor: 'grey.50', border: '1px dashed', borderColor: 'primary.main' }}
                        >
                        <Typography variant="body2" sx={{ fontWeight: 500, textAlign: 'center' }}>
                            {patient.treatmentStrategy.sequence}
                        </Typography>
                        </Paper>
                    </Box>
                    </>
                )}
                </Paper>
            </Box>

            {/* Selected Protocol (if planning chemo) */}
            {patient.treatmentStrategy?.systemicTherapy && (
              <Box sx={{ mt: 4 }}>
                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="overline" sx={{ fontWeight: 700, color: 'success.dark', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                        Selected Primary Protocol
                    </Typography>
                    <MicButton />
                 </Box>
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: (theme) => alpha(theme.palette.success.main, 0.05), borderColor: (theme) => alpha(theme.palette.success.main, 0.2) }}>
                <Table size="small">
                    <TableBody>
                    <TableRow>
                        <TableCell sx={{ color: 'text.secondary', fontWeight: 500, borderBottom: 'none', pl: 0 }}>Regimen Name</TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Typography variant="body2" fontWeight={600}>
                            {patient.currentProtocol?.name || 'Standard Protocol'}
                        </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ color: 'text.secondary', fontWeight: 500, borderBottom: 'none', pl: 0 }}>Planned Cycles</TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        {patient.currentProtocol?.cycles || 6} cycles
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ color: 'text.secondary', fontWeight: 500, borderBottom: 'none', pl: 0 }}>Cycle Frequency</TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>Every {patient.currentProtocol?.cycleFrequency || 21} days</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ color: 'text.secondary', fontWeight: 500, borderBottom: 'none', pl: 0 }}>Dose Intent</TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Chip label="Standard" size="small" color="success" variant="outlined" />
                        </TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </Paper>
              </Box>
            )}
          </Grid>

          {/* Right Column - Baseline & Risks */}
          <Grid item xs={12} md={4}>
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                     <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                        Baseline for Treatment Start
                    </Typography>
                    <MicButton />
                </Box>
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                <Table size="small">
                    <TableBody>
                    <TableRow>
                        <TableCell sx={{ color: 'text.secondary', fontWeight: 500, borderBottom: 'none', pl: 0 }}>Baseline Labs</TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Chip label="Done" size="small" color="success" icon={<CheckCircleIcon />} variant="outlined" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ color: 'text.secondary', fontWeight: 500, borderBottom: 'none', pl: 0 }}>Baseline Imaging</TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Chip label="Documented" size="small" color="success" icon={<CheckCircleIcon />} variant="outlined" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ color: 'text.secondary', fontWeight: 500, borderBottom: 'none', pl: 0 }}>Fertility Counseling</TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        {patient.age < 50 && patient.gender === 'Female' ? (
                            <Chip label="Done" size="small" color="success" icon={<CheckCircleIcon />} variant="outlined" />
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                            N/A
                            </Typography>
                        )}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ color: 'text.secondary', fontWeight: 500, borderBottom: 'none', pl: 0 }}>Patient Consent</TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Chip label="Obtained" size="small" color="success" icon={<CheckCircleIcon />} variant="outlined" />
                        </TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </Paper>
            </Box>

            <Box sx={{ mt: 4 }}>
                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="overline" sx={{ fontWeight: 700, color: 'warning.dark', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                        Treatment Risks & Precautions
                    </Typography>
                    <MicButton />
                 </Box>
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: (theme) => alpha(theme.palette.warning.main, 0.05), borderColor: (theme) => alpha(theme.palette.warning.main, 0.2) }}>
                <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
                    High-Risk Toxicity Flags:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    <Chip label="Myelosuppression" size="small" color="warning" variant="outlined" />
                    <Chip label="Neuropathy" size="small" color="warning" variant="outlined" />
                    {patient.comorbidities?.cardiacDisease && (
                        <Chip label="Cardiotoxicity" size="small" color="error" variant="outlined" />
                    )}
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
                    Special Monitoring:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    • CBC before each cycle
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    • Renal function monitoring
                    </Typography>
                    {patient.comorbidities?.cardiacDisease && (
                    <Typography variant="body2" color="text.secondary">
                        • ECHO every 3 cycles
                    </Typography>
                    )}
                </Box>
                </Paper>
            </Box>

            <Paper
              variant="outlined"
              sx={{
                p: 3,
                mt: 4,
                bgcolor: patient.mdtDecision?.status === 'Approved' ? (theme) => alpha(theme.palette.success.main, 0.1) : (theme) => alpha(theme.palette.grey[300], 0.3),
                textAlign: 'center',
                borderColor: patient.mdtDecision?.status === 'Approved' ? 'success.main' : 'divider'
              }}
            >
              <Typography variant="overline" sx={{ fontWeight: 700, mb: 1, display: 'block', fontSize: '0.85rem', letterSpacing: 1.2, color: 'text.primary' }}>
                Plan Activation Status
              </Typography>
              <Chip
                label={
                  patient.mdtDecision?.status === 'Approved'
                    ? 'MDT APPROVED - Ready to Activate'
                    : patient.mdtDecision?.status === 'Modified'
                    ? 'MODIFIED - Pending Review'
                    : 'DRAFT - Under Planning'
                }
                sx={{
                  bgcolor: 'white',
                  color: patient.mdtDecision?.status === 'Approved' ? 'success.main' : 'grey.700',
                  fontWeight: 600,
                  border: '1px solid',
                  borderColor: patient.mdtDecision?.status === 'Approved' ? 'success.main' : 'grey.400'
                }}
              />

              {patient.mdtDecision?.status === 'Approved' && (
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 2,
                    bgcolor: 'success.main',
                    color: 'white',
                    fontWeight: 600,
                    boxShadow: 2,
                    '&:hover': { bgcolor: 'success.dark' },
                  }}
                >
                  Activate Treatment Plan
                </Button>
              )}
            </Paper>
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
