import { Box, Container, Grid, Paper, Typography, Divider, Chip, IconButton, Stack, List, ListItem, ListItemText, LinearProgress } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import EditIcon from '@mui/icons-material/Edit';
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
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import BiotechIcon from '@mui/icons-material/Biotech';
import { alpha } from '@mui/material/styles';
import { OncologyPatient, OncoStatus } from '../../types/oncology';
import PatientContextBar from '../../components/onco/PatientContextBar';
import ActionFooter from '../../components/onco/ActionFooter';

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

const EditButton = () => (
  <IconButton 
    size="small" 
    sx={{ 
        ml: 0.75,
        border: '1px solid',
        borderColor: 'grey.400', 
        borderRadius: 1, 
        p: 0.5,
        color: 'grey.600',
        transition: 'all 0.2s',
        '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.grey[600], 0.1),
            borderColor: 'grey.600',
            transform: 'translateY(-1px)',
            boxShadow: (theme) => `0 2px 8px ${alpha(theme.palette.grey[600], 0.2)}`
        }
    }}
  >
    <EditIcon sx={{ fontSize: 14 }} />
  </IconButton>
);

export default function PatientSummary({ patient, hideContextBar }: PatientSummaryProps) {
  // Define the oncology journey stages (state machine)
  const journeyStages: { key: string; label: string; icon: React.ReactNode; color: string; statuses: OncoStatus[] }[] = [
    { key: 'diagnostic', label: 'Diagnostic', icon: <ScienceIcon sx={{ fontSize: 16 }} />, color: '#ff9800', statuses: ['Diagnostic Evaluation'] },
    { key: 'planning', label: 'Planning', icon: <AssignmentIcon sx={{ fontSize: 16 }} />, color: '#2196f3', statuses: ['Treatment Planning'] },
    { key: 'treatment', label: 'Treatment', icon: <MedicationLiquidIcon sx={{ fontSize: 16 }} />, color: '#7c4dff', statuses: ['Induction', 'Consolidation'] },
    { key: 'response', label: 'Response', icon: <AssessmentIcon sx={{ fontSize: 16 }} />, color: '#e91e63', statuses: ['Response Assessment'] },
    { key: 'surveillance', label: 'Surveillance', icon: <MonitorHeartIcon sx={{ fontSize: 16 }} />, color: '#4caf50', statuses: ['Observation', 'Maintenance'] },
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
            {/* Stage Journey Tracker */}
            <Grid item xs={12}>
                <Paper sx={{ p: 1.25, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.7rem', letterSpacing: 1 }}>
                                Disease Journey
                            </Typography>
                            <Chip
                                label={`Current: ${patient.oncoStatus}`}
                                size="small"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: '0.68rem',
                                    height: 20,
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
                        {isPalliative && (
                            <Chip icon={<SpaIcon sx={{ fontSize: '12px !important' }} />} label="Palliative Pathway" color="info" size="small" sx={{ fontWeight: 600, height: 20 }} />
                        )}
                        {isDischarged && (
                            <Chip label="Discharged — No Onco Journey" color="default" size="small" sx={{ fontWeight: 600, height: 20 }} />
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
                                                width: 36,
                                                height: 36,
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '2px solid',
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
                                                boxShadow: state === 'current' ? `0 0 0 3px ${alpha(stage.color, 0.15)}` : 'none',
                                            }}
                                        >
                                            {state === 'completed' ? (
                                                <CheckCircleIcon sx={{ fontSize: 18 }} />
                                            ) : (
                                                stage.icon
                                            )}
                                        </Box>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                mt: 0.5,
                                                fontWeight: state === 'current' ? 700 : 500,
                                                color: state === 'current' ? stage.color
                                                    : state === 'completed' ? 'success.main'
                                                    : 'text.disabled',
                                                fontSize: '0.65rem',
                                                textAlign: 'center',
                                            }}
                                        >
                                            {stage.label}
                                        </Typography>
                                        {state === 'current' && (
                                            <FiberManualRecordIcon sx={{ fontSize: 6, color: stage.color, mt: 0.15, animation: 'pulse 2s infinite' }} />
                                        )}
                                    </Box>

                                    {/* Connector Line */}
                                    {!isLast && (
                                        <Box
                                            sx={{
                                                flex: 1,
                                                height: 2,
                                                bgcolor: state === 'completed' || getStageState(index + 1) === 'completed' || getStageState(index + 1) === 'current'
                                                    ? 'success.main'
                                                    : 'grey.200',
                                                borderRadius: 2,
                                                mb: 1.8,
                                                mx: -1,
                                                transition: 'background-color 0.3s',
                                            }}
                                        />
                                    )}
                                </Box>
                            );
                        })}
                    </Box>
                </Paper>
            </Grid>

            {/* === Oncology Snapshot Cards === */}
            <Grid item xs={12} md={3}>
                <Paper 
                  sx={{ 
                    p: 0, 
                    borderRadius: 2.5, 
                    height: '100%',
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: alpha('#7c4dff', 0.15),
                    transition: 'box-shadow 0.2s',
                    '&:hover': { boxShadow: `0 4px 20px ${alpha('#7c4dff', 0.12)}` }
                  }}
                >
                  <Box sx={{ 
                    px: 2, py: 1.25, 
                    bgcolor: alpha('#7c4dff', 0.06),
                    borderBottom: '1px solid',
                    borderColor: alpha('#7c4dff', 0.1),
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1 
                  }}>
                    <LocalHospitalIcon sx={{ fontSize: 18, color: '#7c4dff' }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#7c4dff', fontSize: '0.75rem', letterSpacing: 0.5 }}>
                      Current Treatment
                    </Typography>
                  </Box>
                  <Box sx={{ px: 2, py: 1.5 }}>
                    {patient.currentProtocol ? (
                      <>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.75, fontSize: '0.85rem' }}>
                          {patient.currentProtocol.name}
                        </Typography>
                        {patient.currentProtocol.drugs.map((drug, i) => (
                          <Typography key={i} variant="caption" sx={{ display: 'block', color: 'text.secondary', lineHeight: 1.6, fontSize: '0.72rem' }}>
                            {drug.name} {drug.dose} — {drug.day}
                          </Typography>
                        ))}
                        <Divider sx={{ my: 1.25 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.68rem' }}>Time on therapy</Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.72rem' }}>
                            {patient.currentProtocol.timeOnTherapy || `${patient.currentProtocol.cycles} cycles`}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.68rem' }}>Intent</Typography>
                          <Chip 
                            label={patient.treatmentIntent || 'Curative'} 
                            size="small" 
                            sx={{ 
                              height: 18, fontSize: '0.62rem', fontWeight: 600, 
                              bgcolor: patient.treatmentIntent === 'Palliative' ? alpha('#ff9800', 0.12) : alpha('#4caf50', 0.12),
                              color: patient.treatmentIntent === 'Palliative' ? '#e65100' : '#2e7d32',
                              border: '1px solid',
                              borderColor: patient.treatmentIntent === 'Palliative' ? alpha('#ff9800', 0.3) : alpha('#4caf50', 0.3),
                            }} 
                          />
                        </Box>
                        {patient.currentProtocol.doseInterruptions && (
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.68rem' }}>Dose interruptions</Typography>
                            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.72rem', color: patient.currentProtocol.doseInterruptions === 'None' ? 'success.main' : 'warning.main' }}>
                              {patient.currentProtocol.doseInterruptions}
                            </Typography>
                          </Box>
                        )}
                      </>
                    ) : (
                      <Box sx={{ py: 0.5 }}>
                        {patient.mdtDecision?.status === 'Approved' ? (
                          <>
                            <Chip 
                              label="MDT Approved" 
                              size="small" 
                              sx={{ 
                                height: 20, fontSize: '0.65rem', fontWeight: 700, mb: 1,
                                bgcolor: alpha('#4caf50', 0.1), color: '#2e7d32',
                                border: '1px solid', borderColor: alpha('#4caf50', 0.3)
                              }} 
                            />
                            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.78rem', mb: 0.75, color: 'text.primary' }}>
                              {patient.treatmentStrategy?.sequence || 'Pending'}
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontSize: '0.68rem', lineHeight: 1.5, mb: 1 }}>
                              {patient.mdtDecision.summary}
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                              {patient.treatmentStrategy?.surgery && <Chip label="Surgery" size="small" sx={{ height: 18, fontSize: '0.6rem', fontWeight: 600, bgcolor: alpha('#2196f3', 0.1), color: '#1565c0' }} />}
                              {patient.treatmentStrategy?.systemicTherapy && <Chip label="Systemic" size="small" sx={{ height: 18, fontSize: '0.6rem', fontWeight: 600, bgcolor: alpha('#7c4dff', 0.1), color: '#7c4dff' }} />}
                              {patient.treatmentStrategy?.radiation && <Chip label="Radiation" size="small" sx={{ height: 18, fontSize: '0.6rem', fontWeight: 600, bgcolor: alpha('#ff9800', 0.1), color: '#e65100' }} />}
                            </Box>
                          </>
                        ) : (
                          <Box sx={{ textAlign: 'center', py: 1 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', fontSize: '0.78rem', mb: 0.5 }}>
                              No active protocol
                            </Typography>
                            <Typography variant="caption" color="text.disabled">
                              {patient.treatmentStrategy?.sequence || 'Pending treatment decision'}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>
                </Paper>
            </Grid>

            <Grid item xs={12} md={3}>
                <Paper 
                  sx={{ 
                    p: 0, 
                    borderRadius: 2.5, 
                    height: '100%',
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: alpha('#e91e63', 0.15),
                    transition: 'box-shadow 0.2s',
                    '&:hover': { boxShadow: `0 4px 20px ${alpha('#e91e63', 0.12)}` }
                  }}
                >
                  <Box sx={{ 
                    px: 2, py: 1.25, 
                    bgcolor: alpha('#e91e63', 0.06),
                    borderBottom: '1px solid',
                    borderColor: alpha('#e91e63', 0.1),
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1 
                  }}>
                    <AssessmentIcon sx={{ fontSize: 18, color: '#e91e63' }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#e91e63', fontSize: '0.75rem', letterSpacing: 0.5 }}>
                      Disease Status
                    </Typography>
                  </Box>
                  <Box sx={{ px: 2, py: 1.5 }}>
                    {(() => {
                      const latestResponse = patient.responseAssessments?.length 
                        ? patient.responseAssessments[patient.responseAssessments.length - 1] 
                        : null;
                      const latestCycle = patient.cycleOutcomes?.length 
                        ? patient.cycleOutcomes[patient.cycleOutcomes.length - 1] 
                        : null;
                      
                      // Check if this is an adjuvant setting (no measurable disease)
                      const isAdjuvant = latestCycle?.response?.includes('N/A') || latestCycle?.response?.includes('Adjuvant');
                      // Check if patient is pre-treatment
                      const isPreTreatment = !patient.currentProtocol && !latestResponse && !latestCycle;
                      
                      // PRE-TREATMENT / PLANNING phase
                      if (isPreTreatment) {
                        return (
                          <>
                            <Chip 
                              label="Pre-Treatment" 
                              size="small" 
                              sx={{ height: 22, fontSize: '0.68rem', fontWeight: 700, mb: 1.25, bgcolor: alpha('#2196f3', 0.1), color: '#1565c0', border: '1px solid', borderColor: alpha('#2196f3', 0.25) }}
                            />
                            {patient.provisionalAssessment && (
                              <>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.68rem' }}>Diagnosis</Typography>
                                  <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>{patient.provisionalAssessment.probableDiagnosis}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.68rem' }}>Stage</Typography>
                                  <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>{patient.provisionalAssessment.tentativeStage}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.68rem' }}>Resectable</Typography>
                                  <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>{patient.provisionalAssessment.resectable}</Typography>
                                </Box>
                              </>
                            )}
                            {patient.clinicalFindings && (
                              <>
                                <Divider sx={{ my: 1 }} />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.25 }}>
                                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.66rem' }}>Primary</Typography>
                                  <Typography variant="caption" sx={{ fontWeight: 500, fontSize: '0.68rem' }}>{patient.clinicalFindings.primaryLesion}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.66rem' }}>Nodes</Typography>
                                  <Typography variant="caption" sx={{ fontWeight: 500, fontSize: '0.68rem' }}>{patient.clinicalFindings.nodes}</Typography>
                                </Box>
                              </>
                            )}
                          </>
                        );
                      }

                      // ADJUVANT setting — no measurable disease, show marker trends if available
                      if (isAdjuvant && !latestResponse) {
                        return (
                          <>
                            <Chip 
                              label="Adjuvant — No Measurable Disease" 
                              size="small" 
                              sx={{ height: 22, fontSize: '0.65rem', fontWeight: 700, mb: 1.25, bgcolor: alpha('#2196f3', 0.1), color: '#1565c0', border: '1px solid', borderColor: alpha('#2196f3', 0.25) }}
                            />
                            <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontSize: '0.7rem', lineHeight: 1.5, mb: 1 }}>
                              Disease surgically resected. Chemo is adjuvant — response assessment via tumor markers & surveillance imaging.
                            </Typography>
                            {patient.preCycleLabs?.tumorMarkers && (
                              <>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem', display: 'block', mb: 0.5 }}>Tumor Markers</Typography>
                                {patient.preCycleLabs.tumorMarkers.cea !== undefined && (
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.25 }}>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.66rem' }}>CEA</Typography>
                                    <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem', color: patient.preCycleLabs.tumorMarkers.cea <= 5 ? 'success.main' : 'warning.main' }}>
                                      {patient.preCycleLabs.tumorMarkers.cea} ng/mL {patient.preCycleLabs.tumorMarkers.cea <= 5 ? '(Normal)' : '(Elevated)'}
                                    </Typography>
                                  </Box>
                                )}
                                {patient.preCycleLabs.tumorMarkers.ca125 !== undefined && (
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.25 }}>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.66rem' }}>CA 125</Typography>
                                    <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>
                                      {patient.preCycleLabs.tumorMarkers.ca125} U/mL
                                    </Typography>
                                  </Box>
                                )}
                              </>
                            )}
                          </>
                        );
                      }

                      // STANDARD path — has response data
                      const responseLabel = latestResponse?.overallResponse || latestCycle?.response || 'Not assessed';
                      const isPositive = responseLabel.includes('Partial Response') || responseLabel.includes('Complete Response') || responseLabel === 'Stable Disease' || responseLabel.includes('Stable');
                      const isPD = responseLabel.includes('Progressive');
                      
                      return (
                        <>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1 }}>
                            {isPD ? <TrendingUpIcon sx={{ fontSize: 20, color: 'error.main' }} /> 
                              : isPositive ? <TrendingDownIcon sx={{ fontSize: 20, color: 'success.main' }} /> 
                              : <TrendingFlatIcon sx={{ fontSize: 20, color: 'grey.500' }} />}
                            <Chip 
                              label={responseLabel}
                              size="small"
                              sx={{ 
                                height: 22, fontSize: '0.7rem', fontWeight: 700,
                                bgcolor: isPD ? alpha('#f44336', 0.1) : isPositive ? alpha('#4caf50', 0.1) : 'grey.100',
                                color: isPD ? '#c62828' : isPositive ? '#2e7d32' : 'text.secondary',
                                border: '1px solid',
                                borderColor: isPD ? alpha('#f44336', 0.25) : isPositive ? alpha('#4caf50', 0.25) : 'divider',
                              }}
                            />
                          </Box>
                          
                          {latestResponse?.scanResults?.[0] && (
                            <>
                              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5, fontSize: '0.68rem' }}>
                                Last scan: {latestResponse.scanResults[0].date}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.68rem' }}>
                                  Tumor burden change
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 700, color: latestResponse.scanResults[0].changePercent <= 0 ? 'success.main' : 'error.main', fontSize: '0.85rem' }}>
                                  {latestResponse.scanResults[0].changePercent > 0 ? '+' : ''}{latestResponse.scanResults[0].changePercent}%
                                </Typography>
                              </Box>
                              <LinearProgress 
                                variant="determinate" 
                                value={Math.min(100, Math.abs(latestResponse.scanResults[0].changePercent))} 
                                sx={{ 
                                  height: 5, borderRadius: 3, mb: 1,
                                  bgcolor: 'grey.100',
                                  '& .MuiLinearProgress-bar': { 
                                    bgcolor: latestResponse.scanResults[0].changePercent <= 0 ? 'success.main' : 'error.main',
                                    borderRadius: 3 
                                  } 
                                }} 
                              />
                            </>
                          )}
                          
                          {latestResponse?.markerTrends?.slice(0, 2).map((m, i) => (
                            <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.25 }}>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.66rem' }}>{m.name}</Typography>
                              <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem', color: m.trend === 'Falling' ? 'success.main' : m.trend === 'Rising' ? 'error.main' : 'text.primary' }}>
                                {m.current} {m.unit} ({m.trend})
                              </Typography>
                            </Box>
                          ))}
                        </>
                      );
                    })()}
                  </Box>
                </Paper>
            </Grid>

            <Grid item xs={12} md={3}>
                <Paper 
                  sx={{ 
                    p: 0, 
                    borderRadius: 2.5, 
                    height: '100%',
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: alpha('#009688', 0.15),
                    transition: 'box-shadow 0.2s',
                    '&:hover': { boxShadow: `0 4px 20px ${alpha('#009688', 0.12)}` }
                  }}
                >
                  <Box sx={{ 
                    px: 2, py: 1.25, 
                    bgcolor: alpha('#009688', 0.06),
                    borderBottom: '1px solid',
                    borderColor: alpha('#009688', 0.1),
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1 
                  }}>
                    <DirectionsRunIcon sx={{ fontSize: 18, color: '#009688' }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#009688', fontSize: '0.75rem', letterSpacing: 0.5 }}>
                      ECOG Performance
                    </Typography>
                  </Box>
                  <Box sx={{ px: 2, py: 1.5 }}>
                    {/* Big ECOG Score */}
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
                      <Typography variant="h3" sx={{ fontWeight: 800, color: patient.ecogStatus <= 1 ? '#009688' : patient.ecogStatus <= 2 ? '#ff9800' : '#f44336', lineHeight: 1 }}>
                        {patient.ecogStatus}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>/ 4</Typography>
                    </Box>
                    
                    {/* ECOG Description */}
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary', mb: 1.25, fontSize: '0.78rem', lineHeight: 1.4 }}>
                      {patient.ecogStatus === 0 ? 'Fully active, no restrictions' 
                        : patient.ecogStatus === 1 ? 'Restricted strenuous activity, ambulatory' 
                        : patient.ecogStatus === 2 ? 'Ambulatory, capable of self-care, up >50% of waking hours' 
                        : patient.ecogStatus === 3 ? 'Limited self-care, confined to bed/chair >50%' 
                        : 'Completely disabled'}
                    </Typography>

                    <Divider sx={{ my: 1 }} />
                    
                    {/* ECOG visual scale */}
                    <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                      {[0, 1, 2, 3, 4].map(level => (
                        <Box 
                          key={level} 
                          sx={{ 
                            flex: 1, height: 6, borderRadius: 3,
                            bgcolor: level <= patient.ecogStatus 
                              ? (patient.ecogStatus <= 1 ? '#009688' : patient.ecogStatus <= 2 ? '#ff9800' : '#f44336')
                              : 'grey.200',
                            transition: 'all 0.3s',
                          }} 
                        />
                      ))}
                    </Box>

                    {/* Latest toxicity from cycle outcomes */}
                    {patient.cycleOutcomes?.length ? (() => {
                      const latest = patient.cycleOutcomes[patient.cycleOutcomes.length - 1];
                      return (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.66rem', display: 'block' }}>Latest toxicity</Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>
                            {latest.toxicity} — {latest.toxicityDescription}
                          </Typography>
                        </Box>
                      );
                    })() : null}
                  </Box>
                </Paper>
            </Grid>

            <Grid item xs={12} md={3}>
                <Paper 
                  sx={{ 
                    p: 0, 
                    borderRadius: 2.5, 
                    height: '100%',
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: alpha('#ff9800', 0.15),
                    transition: 'box-shadow 0.2s',
                    '&:hover': { boxShadow: `0 4px 20px ${alpha('#ff9800', 0.12)}` }
                  }}
                >
                  <Box sx={{ 
                    px: 2, py: 1.25, 
                    bgcolor: alpha('#ff9800', 0.06),
                    borderBottom: '1px solid',
                    borderColor: alpha('#ff9800', 0.1),
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1 
                  }}>
                    <BiotechIcon sx={{ fontSize: 18, color: '#ff9800' }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#ff9800', fontSize: '0.75rem', letterSpacing: 0.5 }}>
                      Recent Investigations
                    </Typography>
                  </Box>
                  <Box sx={{ px: 2, py: 1.5 }}>
                    {/* Diagnostic tracker summary */}
                    {patient.diagnosticTracker && (
                      <Box sx={{ mb: 1 }}>
                        {Object.entries(patient.diagnosticTracker).map(([key, value]) => (
                          <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                            <Typography variant="caption" sx={{ fontSize: '0.68rem', color: 'text.secondary', textTransform: 'capitalize' }}>
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </Typography>
                            <Chip 
                              label={value} 
                              size="small" 
                              sx={{ 
                                height: 18, fontSize: '0.6rem', fontWeight: 600,
                                bgcolor: value === 'Confirmed' || value === 'Done' ? alpha('#4caf50', 0.1) 
                                  : value === 'Pending' ? alpha('#ff9800', 0.1) 
                                  : 'grey.50',
                                color: value === 'Confirmed' || value === 'Done' ? '#2e7d32' 
                                  : value === 'Pending' ? '#e65100' 
                                  : 'text.secondary',
                              }} 
                            />
                          </Box>
                        ))}
                      </Box>
                    )}
                    
                    <Divider sx={{ my: 1 }} />
                    
                    {/* Latest scan info or pre-cycle labs */}
                    {patient.responseAssessments?.length ? (() => {
                      const latest = patient.responseAssessments[patient.responseAssessments.length - 1];
                      return (
                        <>
                          <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem', display: 'block', mb: 0.5 }}>
                            Last imaging
                          </Typography>
                          {latest.scanResults.slice(0, 2).map((scan, i) => (
                            <Box key={i} sx={{ mb: 0.5 }}>
                              <Typography variant="caption" sx={{ fontSize: '0.66rem', color: 'text.secondary' }}>
                                {scan.type}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block', fontSize: '0.66rem', fontWeight: 500 }}>
                                {scan.date} — {scan.recistCategory}
                              </Typography>
                            </Box>
                          ))}
                        </>
                      );
                    })() : patient.preCycleLabs ? (
                      <>
                        <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem', display: 'block', mb: 0.75 }}>
                          Pre-Cycle Labs ({patient.preCycleLabs.date})
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.35 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.66rem' }}>WBC</Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.68rem', color: patient.preCycleLabs.cbc.wbc < 4 ? 'warning.main' : 'text.primary' }}>
                            {patient.preCycleLabs.cbc.wbc} K/µL
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.35 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.66rem' }}>Hgb</Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.68rem', color: patient.preCycleLabs.cbc.hgb < 10 ? 'error.main' : patient.preCycleLabs.cbc.hgb < 12 ? 'warning.main' : 'text.primary' }}>
                            {patient.preCycleLabs.cbc.hgb} g/dL
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.35 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.66rem' }}>Platelets</Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.68rem', color: patient.preCycleLabs.cbc.platelets < 100000 ? 'error.main' : 'text.primary' }}>
                            {(patient.preCycleLabs.cbc.platelets / 1000).toFixed(0)}K
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.35 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.66rem' }}>Creatinine</Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.68rem', color: patient.preCycleLabs.chemistry.creatinine > 1.2 ? 'warning.main' : 'text.primary' }}>
                            {patient.preCycleLabs.chemistry.creatinine} mg/dL
                          </Typography>
                        </Box>
                      </>
                    ) : (
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.72rem', display: 'block', mb: 0.5 }}>
                          {patient.clinicalFindings ? (
                            <>
                              <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem', display: 'block', mb: 0.5 }}>Clinical Findings</Typography>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.35 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.66rem' }}>Primary</Typography>
                                <Typography variant="caption" sx={{ fontWeight: 500, fontSize: '0.68rem' }}>{patient.clinicalFindings.primaryLesion}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.35 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.66rem' }}>Nodes</Typography>
                                <Typography variant="caption" sx={{ fontWeight: 500, fontSize: '0.68rem' }}>{patient.clinicalFindings.nodes}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.66rem' }}>Metastasis</Typography>
                                <Typography variant="caption" sx={{ fontWeight: 500, fontSize: '0.68rem', color: patient.clinicalFindings.suspectedMetastasis ? 'error.main' : 'success.main' }}>
                                  {patient.clinicalFindings.suspectedMetastasis ? 'Suspected' : 'Not suspected'}
                                </Typography>
                              </Box>
                            </>
                          ) : 'No investigations assessed yet'}
                        </Typography>
                      </Box>
                    )}
                  </Box>
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
                            <EditButton />
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
                            <EditButton />
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
                            <EditButton />
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
                            <EditButton />
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
                            <EditButton />
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

            {/* Vitals Section */}
            <Grid item xs={12}>
                <Paper sx={{ p: 2, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.75rem', letterSpacing: 1 }}>
                            Vitals
                        </Typography>
                        <MicButton />
                        <EditButton />
                    </Box>
                    <Grid container spacing={1.5}>
                        <Grid item xs={6} md={2}>
                            <Paper variant="outlined" sx={{ px: 1.5, py: 1, textAlign: 'center', bgcolor: 'grey.50', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.7rem', lineHeight: 1.2 }}>BP</Typography>
                                <Typography variant="subtitle1" color="primary.main" sx={{ fontWeight: 600, lineHeight: 1.3 }}>{patient.vitals?.bp || '--'}</Typography>
                                <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'grey.600' }}>mmHg</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Paper variant="outlined" sx={{ px: 1.5, py: 1, textAlign: 'center', bgcolor: 'grey.50', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.7rem', lineHeight: 1.2 }}>Heart Rate</Typography>
                                <Typography variant="subtitle1" color="primary.main" sx={{ fontWeight: 600, lineHeight: 1.3 }}>{patient.vitals?.hr || '--'}</Typography>
                                <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'grey.600' }}>bpm</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Paper variant="outlined" sx={{ px: 1.5, py: 1, textAlign: 'center', bgcolor: 'grey.50', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.7rem', lineHeight: 1.2 }}>Temperature</Typography>
                                <Typography variant="subtitle1" color="primary.main" sx={{ fontWeight: 600, lineHeight: 1.3 }}>{patient.vitals?.temp || '--'}</Typography>
                                <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'grey.600' }}>°C</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Paper variant="outlined" sx={{ px: 1.5, py: 1, textAlign: 'center', bgcolor: 'grey.50', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.7rem', lineHeight: 1.2 }}>SpO2</Typography>
                                <Typography variant="subtitle1" color="primary.main" sx={{ fontWeight: 600, lineHeight: 1.3 }}>{patient.vitals?.spo2 || '--'}</Typography>
                                <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'grey.600' }}>%</Typography>
                            </Paper>
                        </Grid>
                         <Grid item xs={6} md={2}>
                            <Paper variant="outlined" sx={{ px: 1.5, py: 1, textAlign: 'center', bgcolor: 'grey.50', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.7rem', lineHeight: 1.2 }}>Respiratory Rate</Typography>
                                <Typography variant="subtitle1" color="primary.main" sx={{ fontWeight: 600, lineHeight: 1.3 }}>{patient.vitals?.resp || '--'}</Typography>
                                <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'grey.600' }}>/min</Typography>
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
                                                <Typography variant="caption" sx={{ fontSize: '0.6rem', display: 'block', color: 'grey.600', fontWeight: 500 }}>
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
                                                <Typography variant="caption" sx={{ fontSize: '0.6rem', display: 'block', mt: 0.5, lineHeight: 1.3, maxWidth: 140, color: 'grey.700' }}>
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
        </Grid>
      </Container>
      <ActionFooter primaryLabel="Finish and Next Patient" />
    </Box>
  );
}
