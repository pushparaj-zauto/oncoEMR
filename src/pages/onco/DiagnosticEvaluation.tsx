import {
  Box,
  Container,
  Typography,
  Chip,
  Stack,
  Alert,
  Button,
  Avatar,
  Tooltip,
  IconButton,
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ActionFooter from '../../components/onco/ActionFooter';
import PendingIcon from '@mui/icons-material/Pending';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { alpha } from '@mui/material/styles';
import { OncologyPatient, DiagnosticEvent, PendingAction } from '../../types/oncology';
import PatientContextBar from '../../components/onco/PatientContextBar';

interface DiagnosticEvaluationProps {
  patient: OncologyPatient;
  diagnosticEvents: DiagnosticEvent[];
  pendingActions: PendingAction[];
  hideContextBar?: boolean;
}

/* ── Tiny icon buttons for mic / edit ── */
const MicButton = () => (
  <IconButton
    size="small"
    sx={{
      ml: 1,
      border: '1px solid',
      borderColor: 'primary.main',
      borderRadius: 1,
      p: 0.3,
      color: 'primary.main',
      '&:hover': { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08) },
    }}
  >
    <MicIcon sx={{ fontSize: 14 }} />
  </IconButton>
);

const EditButton = () => (
  <IconButton
    size="small"
    sx={{
      ml: 0.5,
      border: '1px solid',
      borderColor: 'grey.400',
      borderRadius: 1,
      p: 0.3,
      color: 'grey.500',
      '&:hover': { bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08) },
    }}
  >
    <EditIcon sx={{ fontSize: 13 }} />
  </IconButton>
);

/* ── Reusable section header ── */
const SectionLabel = ({ label, color = 'primary.main', warning = false }: { label: string; color?: string; warning?: boolean }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
    <Typography
      variant="overline"
      sx={{
        fontWeight: 700,
        color: warning ? 'warning.dark' : color,
        fontSize: '0.75rem',
        letterSpacing: 1.5,
        lineHeight: 1,
      }}
    >
      {label}
    </Typography>
    <MicButton />
    <EditButton />
  </Box>
);

/* ── Compact key-value row ── */
const KVRow = ({ label, value, chip }: { label: string; value?: React.ReactNode; chip?: React.ReactNode }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      py: 0.6,
      minHeight: 28,
    }}
  >
    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, minWidth: 110, flexShrink: 0 }}>
      {label}
    </Typography>
    {chip || (
      <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500, textAlign: 'right' }}>
        {value}
      </Typography>
    )}
  </Box>
);

export default function DiagnosticEvaluation({
  patient,
  diagnosticEvents,
  pendingActions,
  hideContextBar,
}: DiagnosticEvaluationProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Done':
      case 'Confirmed':
        return <CheckCircleIcon sx={{ color: 'success.main', fontSize: '1rem' }} />;
      case 'Pending':
        return <PendingIcon sx={{ color: 'warning.main', fontSize: '1rem' }} />;
      case 'Not done':
        return <ErrorIcon sx={{ color: 'error.main', fontSize: '1rem' }} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done':
      case 'Confirmed':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Not done':
        return 'error';
      default:
        return 'default';
    }
  };

  const getButtonLabel = (actionText: string) => {
    if (actionText.toLowerCase().includes('schedule') || actionText.toLowerCase().includes('mdt')) return 'Schedule';
    if (actionText.toLowerCase().includes('referral') || actionText.toLowerCase().includes('counseling')) return 'Refer';
    if (actionText.toLowerCase().includes('workup') || actionText.toLowerCase().includes('mri') || actionText.toLowerCase().includes('evaluation')) return 'Order';
    return 'Review';
  };

  return (
    <Box sx={{ pb: 10 }}>
      {!hideContextBar && <PatientContextBar patient={patient} />}

      <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
        {/* ─── Alert Banner ─── */}
        {patient.alerts && patient.alerts.length > 0 && (
          <Box sx={{ mb: 2 }}>
            {patient.alerts.map((alert, idx) => (
              <Alert
                key={idx}
                severity="error"
                icon={<WarningIcon sx={{ fontSize: 18 }} />}
                sx={{ py: 0.5, fontWeight: 500, borderRadius: 1.5, fontSize: '0.85rem' }}
              >
                <strong>{alert.type}:</strong> {alert.message}
              </Alert>
            ))}
          </Box>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            ROW 1 — Problem  |  Clinical Findings  |  Diagnostic Status
        ═══════════════════════════════════════════════════════════════ */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
            gap: 2.5,
            mb: 2.5,
          }}
        >
          {/* ── Col 1: Problem Summary ── */}
          <Box
            sx={{
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            <SectionLabel label="Problem Summary" />
            <KVRow label="Chief Complaint" value={patient.chiefComplaint} />
            <KVRow label="Duration" value={patient.symptomDuration} />
            <KVRow
              label="Alarm Symptoms"
              chip={
                <Chip
                  label={patient.alarmSymptoms ? 'Yes' : 'No'}
                  size="small"
                  color={patient.alarmSymptoms ? 'error' : 'success'}
                  variant={patient.alarmSymptoms ? 'filled' : 'outlined'}
                  sx={{ height: 20, fontSize: '0.7rem' }}
                />
              }
            />
          </Box>

          {/* ── Col 2: Clinical Findings ── */}
          <Box
            sx={{
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            <SectionLabel label="Clinical Findings" />
            {patient.clinicalFindings ? (
              <>
                <KVRow label="Primary Lesion" value={patient.clinicalFindings.primaryLesion} />
                <KVRow
                  label="Nodes"
                  chip={
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.82rem' }}>
                        {patient.clinicalFindings.nodes}
                      </Typography>
                      <Chip
                        label={
                          patient.clinicalFindings.nodes === 'Present' ||
                          patient.clinicalFindings.nodes.includes('Present') ||
                          patient.clinicalFindings.nodes.includes('pathy')
                            ? 'Significant'
                            : 'Normal'
                        }
                        size="small"
                        color={
                          patient.clinicalFindings.nodes.includes('Present') ||
                          patient.clinicalFindings.nodes.includes('pathy')
                            ? 'warning'
                            : 'default'
                        }
                        variant="outlined"
                        sx={{ height: 18, fontSize: '0.65rem', '& .MuiChip-label': { px: 0.6 } }}
                      />
                    </Stack>
                  }
                />
                <KVRow
                  label="Metastasis"
                  chip={
                    <Chip
                      label={patient.clinicalFindings.suspectedMetastasis ? 'Yes' : 'No'}
                      size="small"
                      color={patient.clinicalFindings.suspectedMetastasis ? 'error' : 'success'}
                      sx={{ height: 20, fontSize: '0.7rem' }}
                    />
                  }
                />
              </>
            ) : (
              <Typography variant="caption" color="text.secondary" fontStyle="italic">
                No findings recorded.
              </Typography>
            )}
          </Box>

          {/* ── Col 3: Diagnostic Status ── */}
          <Box
            sx={{
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            <SectionLabel label="Diagnostic Status" />
            {patient.diagnosticTracker && (
              <Stack spacing={0}>
                {Object.entries(patient.diagnosticTracker).map(([key, status]) => (
                  <Box
                    key={key}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 0.6,
                    }}
                  >
                    <Typography variant="body2" sx={{ textTransform: 'capitalize', fontWeight: 500, fontSize: '0.82rem' }}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Typography>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      {getStatusIcon(status)}
                      <Chip
                        label={status}
                        size="small"
                        variant="outlined"
                        color={getStatusColor(status) as any}
                        sx={{ height: 18, fontSize: '0.65rem', '& .MuiChip-label': { px: 0.8 } }}
                      />
                    </Stack>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>
        </Box>

        {/* ═══════════════════════════════════════════════════════════════
            ROW 2 — Histopathology+Assessment  |  Pending Actions  |  Timeline
        ═══════════════════════════════════════════════════════════════ */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1.2fr' },
            gap: 2.5,
          }}
        >
          {/* ── Col 1: Histopathology + Provisional Assessment ── */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Histopathology */}
            {patient.histopathology && (
              <Box sx={{ p: 2, pb: 1.5 }}>
                <SectionLabel label="Histopathology" />
                <KVRow label="Type" value={patient.histopathology.type} />
                <KVRow label="Grade" value={patient.histopathology.grade} />
                <KVRow label="Margins" value={patient.histopathology.margins} />
              </Box>
            )}

            {/* Provisional Assessment */}
            <Box
              sx={{
                p: 2,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.03),
                flexGrow: 1,
              }}
            >
              <SectionLabel label="Provisional Assessment" />
              {patient.provisionalAssessment ? (
                <>
                  <Typography variant="caption" color="primary" sx={{ fontWeight: 600, display: 'block', mb: 0.2, fontSize: '0.7rem' }}>
                    Probable Diagnosis
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.95rem', mb: 1.5, lineHeight: 1.3 }}>
                    {patient.provisionalAssessment.probableDiagnosis}
                  </Typography>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1.5,
                        p: 1,
                        textAlign: 'center',
                        bgcolor: 'background.paper',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.65rem' }}>
                        Tentative Stage
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.8rem', lineHeight: 1.4 }}>
                        {patient.tnmStage
                          ? `${patient.tnmStage} (${patient.provisionalAssessment.tentativeStage})`
                          : patient.provisionalAssessment.tentativeStage}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1.5,
                        p: 1,
                        textAlign: 'center',
                        bgcolor: 'background.paper',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.65rem' }}>
                        Resectable?
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          color:
                            patient.provisionalAssessment.resectable === 'Yes'
                              ? 'success.main'
                              : patient.provisionalAssessment.resectable === 'No'
                              ? 'error.main'
                              : 'warning.main',
                        }}
                      >
                        {patient.provisionalAssessment.resectable}
                      </Typography>
                    </Box>
                  </Box>
                </>
              ) : (
                <Typography variant="caption" color="text.secondary" fontStyle="italic">
                  No assessment recorded.
                </Typography>
              )}
            </Box>
          </Box>

          {/* ── Col 2: Pending Actions ── */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ p: 2, pb: 1 }}>
              <SectionLabel label="Pending Actions" warning />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              {pendingActions.map((action, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2,
                    py: 1,
                    bgcolor: idx % 2 === 0 ? alpha('#ed6c02', 0.03) : 'transparent',
                    '&:hover': { bgcolor: alpha('#ed6c02', 0.06) },
                  }}
                >
                  <Tooltip title={action.priority}>
                    <Avatar
                      sx={{
                        width: 22,
                        height: 22,
                        bgcolor:
                          action.priority === 'High'
                            ? 'error.main'
                            : action.priority === 'Medium'
                            ? 'warning.main'
                            : 'grey.400',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {action.priority[0]}
                    </Avatar>
                  </Tooltip>
                  <Typography variant="body2" sx={{ flex: 1, fontWeight: 500, fontSize: '0.82rem', lineHeight: 1.3 }}>
                    {action.action}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      textTransform: 'none',
                      fontSize: '0.65rem',
                      py: 0.15,
                      px: 1,
                      minWidth: 'auto',
                      borderRadius: 1,
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    {getButtonLabel(action.action)}
                  </Button>
                </Box>
              ))}
            </Box>

            {/* ── Comorbidities ── */}
            {patient.comorbidities && (
              <Box sx={{ px: 2, py: 1.5, mt: 'auto' }}>
                <Typography variant="overline" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.7rem', letterSpacing: 1 }}>
                  Comorbidities
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                  {patient.comorbidities.diabetes && <Chip label="Diabetes" size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />}
                  {patient.comorbidities.cardiacDisease && <Chip label="Cardiac" size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />}
                  {patient.comorbidities.renalDisease && <Chip label="Renal" size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />}
                  {patient.comorbidities.priorCancer && <Chip label="Prior Ca" size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />}
                  {!patient.comorbidities.diabetes &&
                    !patient.comorbidities.cardiacDisease &&
                    !patient.comorbidities.renalDisease &&
                    !patient.comorbidities.priorCancer && (
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.72rem' }}>
                        No major comorbidities
                      </Typography>
                    )}
                </Box>
              </Box>
            )}
          </Box>

          {/* ── Col 3: Diagnostic Timeline ── */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ px: 2, pt: 2, pb: 1 }}>
              <SectionLabel label="Timeline" />
            </Box>
            {diagnosticEvents.map((event, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  gap: 1.5,
                  px: 2,
                  py: 1,
                  position: 'relative',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                {/* Timeline dot + line */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 0.3 }}>
                  {getStatusIcon(event.status)}
                  {idx < diagnosticEvents.length - 1 && (
                    <Box sx={{ width: 1.5, flexGrow: 1, bgcolor: 'divider', mt: 0.5, borderRadius: 1 }} />
                  )}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.82rem' }}>
                      {event.type}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0, ml: 1, fontSize: '0.72rem' }}>
                      {event.date}
                    </Typography>
                  </Box>
                  {event.result && (
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.3, display: 'block', mt: 0.2 }}>
                      {event.result}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
      <ActionFooter primaryLabel="Finish and Next Patient" />
    </Box>
  );
}
