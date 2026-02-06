import { Box, Container, Grid, Paper, Typography, Divider, Chip, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import { alpha } from '@mui/material/styles';
import { OncologyPatient } from '../../types/oncology';
import PatientContextBar from '../../components/onco/PatientContextBar';

interface PatientSummaryProps {
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

export default function PatientSummary({ patient, hideContextBar }: PatientSummaryProps) {
  return (
    <Box sx={{ pb: 10 }}>
      {!hideContextBar && <PatientContextBar patient={patient} />}

      <Container maxWidth="xl" sx={{ mt: 4, mb: 5 }}>
        <Grid container spacing={3}>
            {/* Vitals Section */}
            <Grid item xs={12}>
                <Paper sx={{ p: 3, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                            Patient Vitals
                        </Typography>
                        <MicButton />
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={2}>
                            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>BP</Typography>
                                <Typography variant="h6" color="primary.main">{patient.vitals?.bp || '--'}</Typography>
                                <Typography variant="caption" color="text.disabled">mmHg</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>Heart Rate</Typography>
                                <Typography variant="h6" color="primary.main">{patient.vitals?.hr || '--'}</Typography>
                                <Typography variant="caption" color="text.disabled">bpm</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>Temperature</Typography>
                                <Typography variant="h6" color="primary.main">{patient.vitals?.temp || '--'}</Typography>
                                <Typography variant="caption" color="text.disabled">°C</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>SpO2</Typography>
                                <Typography variant="h6" color="primary.main">{patient.vitals?.spo2 || '--'}</Typography>
                                <Typography variant="caption" color="text.disabled">%</Typography>
                            </Paper>
                        </Grid>
                         <Grid item xs={6} md={2}>
                            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>Respiratory Rate</Typography>
                                <Typography variant="h6" color="primary.main">{patient.vitals?.resp || '--'}</Typography>
                                <Typography variant="caption" color="text.disabled">/min</Typography>
                            </Paper>
                        </Grid>
                         <Grid item xs={6} md={2}>
                            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>BMI</Typography>
                                <Typography variant="h6" color={patient.vitals?.bmi && patient.vitals.bmi > 25 ? 'warning.main' : 'primary.main'}>{patient.vitals?.bmi || '--'}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {patient.vitals?.weight}kg / {patient.vitals?.height}cm
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            {/* Left Column: Clinical Story */}
            <Grid item xs={12} md={7}>
                <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                     <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                        Clinical Presentation
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <Typography variant="subtitle2" color="text.secondary">Chief Complaint</Typography>
                            <MicButton />
                        </Box>
                         <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {patient.chiefComplaint || 'Not recorded'}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Typography variant="subtitle2" color="text.secondary">History of Present Illness</Typography>
                            <MicButton />
                        </Box>
                        <Typography variant="body1" sx={{ lineHeight: 1.6, color: 'text.primary' }}>
                            {patient.historyOfPresentIllness || 'No detailed history recorded.'}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ display: 'flex', gap: 4 }}>
                         <Box>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>Symptom Duration</Typography>
                            <Chip label={patient.symptomDuration} size="small" variant="outlined" />
                         </Box>
                         <Box>
                             <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>Alarm Symptoms</Typography>
                             <Chip 
                                label={patient.alarmSymptoms ? 'Present' : 'Absent'} 
                                color={patient.alarmSymptoms ? 'error' : 'default'} 
                                size="small" 
                            />
                         </Box>
                    </Box>
                </Paper>
            </Grid>

            {/* Right Column: History */}
            <Grid item xs={12} md={5}>
                <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                     <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                        Patient History
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                            Medical History
                            <MicButton />
                        </Typography>
                        {patient.patientHistory?.medical && patient.patientHistory.medical.length > 0 ? (
                            <ul style={{ margin: 0, paddingLeft: 20 }}>
                                {patient.patientHistory.medical.map((item, index) => (
                                    <li key={index} style={{ marginBottom: 4 }}>
                                        <Typography variant="body2">{item}</Typography>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>None recorded</Typography>
                        )}
                    </Box>

                     <Divider sx={{ my: 2 }} />

                     <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                            Family History
                            <MicButton />
                        </Typography>
                        {patient.patientHistory?.family && patient.patientHistory.family.length > 0 ? (
                            <ul style={{ margin: 0, paddingLeft: 20 }}>
                                {patient.patientHistory.family.map((item, index) => (
                                    <li key={index} style={{ marginBottom: 4 }}>
                                        <Typography variant="body2">{item}</Typography>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>None recorded</Typography>
                        )}
                    </Box>

                    <Divider sx={{ my: 2 }} />

                     <Box>
                        <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                            Social History
                            <MicButton />
                        </Typography>
                        {patient.patientHistory?.social && patient.patientHistory.social.length > 0 ? (
                            <ul style={{ margin: 0, paddingLeft: 20 }}>
                                {patient.patientHistory.social.map((item, index) => (
                                    <li key={index} style={{ marginBottom: 4 }}>
                                        <Typography variant="body2">{item}</Typography>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>None recorded</Typography>
                        )}
                    </Box>
                </Paper>
            </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
