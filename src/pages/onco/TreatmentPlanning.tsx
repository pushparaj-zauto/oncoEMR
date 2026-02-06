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
} from '@mui/material';
import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { OncologyPatient } from '../../types/oncology';
import PatientContextBar from '../../components/onco/PatientContextBar';

interface TreatmentPlanningProps {
  patient: OncologyPatient;
}

export default function TreatmentPlanning({ patient }: TreatmentPlanningProps) {
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
    <Box>
      {/* Global Patient Context Bar */}
      <PatientContextBar patient={patient} />

      <Container maxWidth="xl" sx={{ mt: 4, mb: 5 }}>
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: 600, color: 'primary.main', letterSpacing: 0.3 }}
        >
          Treatment Planning
        </Typography>

        <Grid container spacing={3}>
          {/* Left Column - Confirmed Diagnosis & Patient Fitness */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'success.dark', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                Confirmed Diagnosis
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ width: '45%' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Final Histopathology</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.primary">{patient.histology}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Tumor Subtype</Typography>
                    </TableCell>
                    <TableCell>
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
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Final TNM Stage</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={patient.tnmStage || 'Pending'} size="small" color="secondary" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Clinical Stage</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={`Stage ${patient.stage}`} size="small" color="secondary" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>

            <Paper elevation={1} sx={{ p: 3, mt: 2, borderRadius: 2 }}>
              <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                Patient Fitness Snapshot
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>ECOG Performance</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={patient.ecogStatus} size="small" color="primary" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Major Comorbidities</Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                        {patient.comorbidities?.diabetes && <Chip label="Diabetes" size="small" />}
                        {patient.comorbidities?.cardiacDisease && <Chip label="Cardiac" size="small" />}
                        {patient.comorbidities?.renalDisease && <Chip label="Renal" size="small" />}
                        {!patient.comorbidities?.diabetes &&
                          !patient.comorbidities?.cardiacDisease &&
                          !patient.comorbidities?.renalDisease && (
                            <Typography variant="body2" color="success.main">None</Typography>
                          )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Organ Function</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label="Normal" size="small" color="success" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>

            {/* MDT Decision Summary */}
            {patient.mdtDecision && (
              <Paper elevation={1} sx={{ p: 3, mt: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
                <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'info.dark', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                  MDT Decision Summary
                </Typography>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>MDT Status</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={patient.mdtDecision.status}
                          size="small"
                          color={patient.mdtDecision.status === 'Approved' ? 'success' : 'warning'}
                          icon={patient.mdtDecision.status === 'Approved' ? <CheckCircleIcon /> : undefined}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Date of Discussion</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{patient.mdtDecision.date}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ verticalAlign: 'top' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Decision Summary</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{patient.mdtDecision.summary}</Typography>
                      </TableCell>
                    </TableRow>
                    {patient.mdtDecision.participants && (
                      <TableRow>
                        <TableCell sx={{ verticalAlign: 'top' }}>
                          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Participants</Typography>
                        </TableCell>
                        <TableCell>
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
            )}
          </Grid>

          {/* Middle Column - Treatment Intent & Strategy */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, border: '2px solid', borderColor: 'primary.main' }}>
              <Typography
                variant="overline"
                sx={{ mb: 2, fontWeight: 700, color: 'primary.main', textAlign: 'center', display: 'block', fontSize: '0.9rem', letterSpacing: 1 }}
              >
                Treatment Intent (Critical)
              </Typography>

              <FormControl component="fieldset" fullWidth>
                <RadioGroup value={intent} onChange={handleIntentChange}>
                  <FormControlLabel
                    value="Curative"
                    control={<Radio onClick={() => handleRadioClick('Curative')} />}
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight={600}>
                          Curative
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Goal is cure
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="Disease Control"
                    control={<Radio onClick={() => handleRadioClick('Disease Control')} />}
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight={600}>
                          Disease Control
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Long-term control
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="Palliative"
                    control={<Radio onClick={() => handleRadioClick('Palliative')} />}
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight={600}>
                          Palliative
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Symptom relief
                        </Typography>
                      </Box>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Paper>

            <Paper sx={{ p: 3, mt: 2 }}>
              <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                Treatment Strategy Map
              </Typography>

              {patient.treatmentStrategy && (
                <>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
                      Planned Modalities:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {patient.treatmentStrategy.surgery && (
                        <Chip label="Surgery" size="small" color="primary" />
                      )}
                      {patient.treatmentStrategy.systemicTherapy && (
                        <Chip label="Chemotherapy" size="small" color="primary" />
                      )}
                      {patient.treatmentStrategy.radiation && (
                        <Chip label="Radiation" size="small" color="primary" />
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
                      sx={{ p: 2, bgcolor: 'grey.50', border: '2px dashed', borderColor: 'primary.main' }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 500, textAlign: 'center' }}>
                        {patient.treatmentStrategy.sequence}
                      </Typography>
                    </Paper>
                  </Box>
                </>
              )}
            </Paper>

            {/* Selected Protocol (if planning chemo) */}
            {patient.treatmentStrategy?.systemicTherapy && (
              <Paper sx={{ p: 3, mt: 2, bgcolor: 'success.light' }}>
                <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'success.dark', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                  Selected Primary Protocol
                </Typography>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Regimen Name</TableCell>
                      <TableCell>
                        {patient.cancerSite === 'Breast'
                          ? 'AC-T (Doxorubicin + Cyclophosphamide → Paclitaxel)'
                          : patient.cancerSite === 'Colon'
                          ? 'FOLFOX'
                          : 'Carboplatin + Paclitaxel'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Planned Cycles</TableCell>
                      <TableCell>
                        {patient.cancerSite === 'Breast' ? '8 cycles' : '6 cycles'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Cycle Frequency</TableCell>
                      <TableCell>Every 21 days</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Dose Intent</TableCell>
                      <TableCell>
                        <Chip label="Standard" size="small" color="success" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            )}
          </Grid>

          {/* Right Column - Baseline & Risks */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                Baseline for Treatment Start
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Baseline Labs</TableCell>
                    <TableCell>
                      <Chip label="Done" size="small" color="success" icon={<CheckCircleIcon />} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Baseline Imaging</TableCell>
                    <TableCell>
                      <Chip label="Documented" size="small" color="success" icon={<CheckCircleIcon />} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Fertility Counseling</TableCell>
                    <TableCell>
                      {patient.age < 50 && patient.gender === 'Female' ? (
                        <Chip label="Done" size="small" color="success" icon={<CheckCircleIcon />} />
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          N/A
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Patient Consent</TableCell>
                    <TableCell>
                      <Chip label="Obtained" size="small" color="success" icon={<CheckCircleIcon />} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>

            <Paper sx={{ p: 3, mt: 2, bgcolor: 'warning.light' }}>
              <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'warning.dark', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                Treatment Risks & Precautions
              </Typography>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
                  High-Risk Toxicity Flags:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Chip label="Myelosuppression" size="small" color="warning" />
                  <Chip label="Neuropathy" size="small" color="warning" />
                  {patient.comorbidities?.cardiacDisease && (
                    <Chip label="Cardiotoxicity" size="small" color="error" />
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

            <Paper
              sx={{
                p: 3,
                mt: 2,
                bgcolor: patient.mdtDecision?.status === 'Approved' ? 'success.main' : 'grey.300',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <Typography variant="overline" sx={{ fontWeight: 700, mb: 1, display: 'block', fontSize: '0.85rem', letterSpacing: 1.2 }}>
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
                }}
              />

              {patient.mdtDecision?.status === 'Approved' && (
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 2,
                    bgcolor: 'white',
                    color: 'success.main',
                    fontWeight: 600,
                    '&:hover': { bgcolor: 'grey.100' },
                  }}
                >
                  Activate Treatment Plan
                </Button>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
