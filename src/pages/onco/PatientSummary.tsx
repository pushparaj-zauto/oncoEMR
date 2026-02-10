import { Box, Container, Grid, Paper, Typography, Divider, Chip, IconButton, Stack, List, ListItem, ListItemText } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import ScienceIcon from '@mui/icons-material/Science';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import SpaIcon from '@mui/icons-material/Spa';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { alpha } from '@mui/material/styles';
import { OncologyPatient, OncoStatus } from '../../types/oncology';
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
  // Define the oncology journey stages (state machine)
  const journeyStages: { key: string; label: string; icon: React.ReactNode; color: string; statuses: OncoStatus[] }[] = [
    { key: 'diagnostic', label: 'Diagnostic', icon: <ScienceIcon sx={{ fontSize: 18 }} />, color: '#ff9800', statuses: ['Diagnostic Evaluation'] },
    { key: 'planning', label: 'Planning', icon: <AssignmentIcon sx={{ fontSize: 18 }} />, color: '#2196f3', statuses: ['Treatment Planning'] },
    { key: 'treatment', label: 'Treatment', icon: <MedicationLiquidIcon sx={{ fontSize: 18 }} />, color: '#7c4dff', statuses: ['Induction', 'Consolidation'] },
    { key: 'response', label: 'Response', icon: <AssessmentIcon sx={{ fontSize: 18 }} />, color: '#e91e63', statuses: ['Response Assessment'] },
    { key: 'surveillance', label: 'Surveillance', icon: <MonitorHeartIcon sx={{ fontSize: 18 }} />, color: '#4caf50', statuses: ['Observation', 'Maintenance'] },
  ];

  // Handle palliative as a special branch
  const isPalliative = patient.oncoStatus === 'Palliative';
  const isDischarged = patient.oncoStatus === 'Discharged';

  // Determine current stage index
  const currentStageIndex = journeyStages.findIndex(s => s.statuses.includes(patient.oncoStatus));

  const getStageState = (index: number) => {
    if (isPalliative || isDischarged) return 'inactive';
    if (index < currentStageIndex) return 'completed';
    if (index === currentStageIndex) return 'current';
    return 'upcoming';
  };

  return (
    <Box sx={{ pb: 10 }}>
      {!hideContextBar && <PatientContextBar patient={patient} />}

      <Container maxWidth="xl" sx={{ mt: 4, mb: 5 }}>
        <Grid container spacing={3}>
            {/* Vitals Section */}
            <Grid item xs={12}>
                <Paper sx={{ p: 2, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.75rem', letterSpacing: 1 }}>
                            Vitals
                        </Typography>
                        <MicButton />
                    </Box>
                    <Grid container spacing={1.5}>
                        <Grid item xs={6} md={2}>
                            <Paper variant="outlined" sx={{ px: 1.5, py: 1, textAlign: 'center', bgcolor: 'grey.50', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.7rem', lineHeight: 1.2 }}>BP</Typography>
                                <Typography variant="subtitle1" color="primary.main" sx={{ fontWeight: 600, lineHeight: 1.3 }}>{patient.vitals?.bp || '--'}</Typography>
                                <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.65rem' }}>mmHg</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Paper variant="outlined" sx={{ px: 1.5, py: 1, textAlign: 'center', bgcolor: 'grey.50', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.7rem', lineHeight: 1.2 }}>Heart Rate</Typography>
                                <Typography variant="subtitle1" color="primary.main" sx={{ fontWeight: 600, lineHeight: 1.3 }}>{patient.vitals?.hr || '--'}</Typography>
                                <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.65rem' }}>bpm</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Paper variant="outlined" sx={{ px: 1.5, py: 1, textAlign: 'center', bgcolor: 'grey.50', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.7rem', lineHeight: 1.2 }}>Temperature</Typography>
                                <Typography variant="subtitle1" color="primary.main" sx={{ fontWeight: 600, lineHeight: 1.3 }}>{patient.vitals?.temp || '--'}</Typography>
                                <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.65rem' }}>°C</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Paper variant="outlined" sx={{ px: 1.5, py: 1, textAlign: 'center', bgcolor: 'grey.50', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.7rem', lineHeight: 1.2 }}>SpO2</Typography>
                                <Typography variant="subtitle1" color="primary.main" sx={{ fontWeight: 600, lineHeight: 1.3 }}>{patient.vitals?.spo2 || '--'}</Typography>
                                <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.65rem' }}>%</Typography>
                            </Paper>
                        </Grid>
                         <Grid item xs={6} md={2}>
                            <Paper variant="outlined" sx={{ px: 1.5, py: 1, textAlign: 'center', bgcolor: 'grey.50', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.7rem', lineHeight: 1.2 }}>Respiratory Rate</Typography>
                                <Typography variant="subtitle1" color="primary.main" sx={{ fontWeight: 600, lineHeight: 1.3 }}>{patient.vitals?.resp || '--'}</Typography>
                                <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.65rem' }}>/min</Typography>
                            </Paper>
                        </Grid>
                         <Grid item xs={6} md={2}>
                            <Paper variant="outlined" sx={{ px: 1.5, py: 1, textAlign: 'center', bgcolor: 'grey.50', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.7rem', lineHeight: 1.2 }}>BMI</Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.3, color: patient.vitals?.bmi && patient.vitals.bmi > 25 ? 'warning.main' : 'primary.main' }}>{patient.vitals?.bmi || '--'}</Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                                    {patient.vitals?.weight}kg / {patient.vitals?.height}cm
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            {/* Stage Journey Tracker */}
            <Grid item xs={12}>
                <Paper sx={{ p: 2.5, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.75rem', letterSpacing: 1 }}>
                            Disease Journey — State Machine
                        </Typography>
                        {isPalliative && (
                            <Chip icon={<SpaIcon sx={{ fontSize: '14px !important' }} />} label="Palliative Pathway" color="info" size="small" sx={{ fontWeight: 600 }} />
                        )}
                        {isDischarged && (
                            <Chip label="Discharged — No Onco Journey" color="default" size="small" sx={{ fontWeight: 600 }} />
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0, position: 'relative' }}>
                        {journeyStages.map((stage, index) => {
                            const state = getStageState(index);
                            const isLast = index === journeyStages.length - 1;

                            return (
                                <Box key={stage.key} sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                    {/* Stage Node */}
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative', zIndex: 1 }}>
                                        <Box
                                            sx={{
                                                width: 44,
                                                height: 44,
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '3px solid',
                                                borderColor: state === 'current' ? stage.color
                                                    : state === 'completed' ? 'success.main'
                                                    : 'grey.300',
                                                bgcolor: state === 'current' ? alpha(stage.color, 0.12)
                                                    : state === 'completed' ? alpha('#4caf50', 0.08)
                                                    : 'grey.50',
                                                color: state === 'current' ? stage.color
                                                    : state === 'completed' ? 'success.main'
                                                    : 'grey.400',
                                                transition: 'all 0.3s',
                                                boxShadow: state === 'current' ? `0 0 0 4px ${alpha(stage.color, 0.2)}` : 'none',
                                            }}
                                        >
                                            {state === 'completed' ? (
                                                <CheckCircleIcon sx={{ fontSize: 22 }} />
                                            ) : (
                                                stage.icon
                                            )}
                                        </Box>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                mt: 1,
                                                fontWeight: state === 'current' ? 700 : 500,
                                                color: state === 'current' ? stage.color
                                                    : state === 'completed' ? 'success.main'
                                                    : 'text.disabled',
                                                fontSize: '0.7rem',
                                                textAlign: 'center',
                                            }}
                                        >
                                            {stage.label}
                                        </Typography>
                                        {state === 'current' && (
                                            <FiberManualRecordIcon sx={{ fontSize: 8, color: stage.color, mt: 0.25, animation: 'pulse 2s infinite' }} />
                                        )}
                                    </Box>

                                    {/* Connector Line */}
                                    {!isLast && (
                                        <Box
                                            sx={{
                                                flex: 1,
                                                height: 3,
                                                bgcolor: state === 'completed' || getStageState(index + 1) === 'completed' || getStageState(index + 1) === 'current'
                                                    ? 'success.main'
                                                    : 'grey.200',
                                                borderRadius: 2,
                                                mb: 3,
                                                mx: -1,
                                                transition: 'background-color 0.3s',
                                            }}
                                        />
                                    )}
                                </Box>
                            );
                        })}
                    </Box>

                    {/* Current Stage Status Label */}
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Chip
                            label={`Current: ${patient.oncoStatus}`}
                            size="small"
                            sx={{
                                fontWeight: 700,
                                fontSize: '0.75rem',
                                bgcolor: isPalliative ? alpha('#00bcd4', 0.1)
                                    : currentStageIndex >= 0 ? alpha(journeyStages[currentStageIndex].color, 0.1)
                                    : 'grey.100',
                                color: isPalliative ? '#00838f'
                                    : currentStageIndex >= 0 ? journeyStages[currentStageIndex].color
                                    : 'text.secondary',
                                border: '1px solid',
                                borderColor: isPalliative ? alpha('#00bcd4', 0.3)
                                    : currentStageIndex >= 0 ? alpha(journeyStages[currentStageIndex].color, 0.3)
                                    : 'divider',
                            }}
                        />
                    </Box>
                </Paper>
            </Grid>

            {/* Visit History Timeline */}
            {patient.visitHistory && patient.visitHistory.length > 0 && (
                <Grid item xs={12}>
                    <Paper sx={{ p: 2.5, borderRadius: 2 }}>
                        <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.75rem', letterSpacing: 1, mb: 2, display: 'block' }}>
                            Visit History Timeline
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0, overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { height: 4 }, '&::-webkit-scrollbar-thumb': { background: '#d1d1d1', borderRadius: 4 } }}>
                            {patient.visitHistory.map((visit, index) => {
                                const stageColor = journeyStages.find(s => s.statuses.includes(visit.stage))?.color || '#9e9e9e';
                                const isLast = index === patient.visitHistory!.length - 1;

                                return (
                                    <Box key={visit.visitId} sx={{ display: 'flex', alignItems: 'flex-start', minWidth: 160 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                                            {/* Dot */}
                                            <Box
                                                sx={{
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: '50%',
                                                    bgcolor: stageColor,
                                                    border: '2px solid white',
                                                    boxShadow: `0 0 0 2px ${alpha(stageColor, 0.3)}`,
                                                    position: 'relative',
                                                    zIndex: 1,
                                                }}
                                            />
                                            {/* Connector */}
                                            {!isLast && (
                                                <Box sx={{ width: '100%', position: 'relative', mt: -0.75 }}>
                                                    <Box sx={{ position: 'absolute', left: '50%', right: '-50%', top: 0, height: 2, bgcolor: 'grey.200' }} />
                                                </Box>
                                            )}
                                            {/* Visit Card */}
                                            <Box sx={{ mt: 1.5, textAlign: 'center', px: 1 }}>
                                                <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.6rem', display: 'block' }}>
                                                    {visit.date}
                                                </Typography>
                                                <Chip
                                                    label={visit.visitType}
                                                    size="small"
                                                    sx={{
                                                        height: 20,
                                                        fontSize: '0.6rem',
                                                        fontWeight: 600,
                                                        bgcolor: alpha(stageColor, 0.1),
                                                        color: stageColor,
                                                        mt: 0.5,
                                                        maxWidth: 140,
                                                        '& .MuiChip-label': { overflow: 'hidden', textOverflow: 'ellipsis' }
                                                    }}
                                                />
                                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem', display: 'block', mt: 0.5, lineHeight: 1.3, maxWidth: 140 }}>
                                                    {visit.summary.length > 50 ? visit.summary.substring(0, 50) + '...' : visit.summary}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Paper>
                </Grid>
            )}

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
                        History
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
