import {
  Box,
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Tooltip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { OncologyPatient, DiagnosticEvent, PendingAction } from '../../types/oncology';
import PatientContextBar from '../../components/onco/PatientContextBar';

interface DiagnosticEvaluationProps {
  patient: OncologyPatient;
  diagnosticEvents: DiagnosticEvent[];
  pendingActions: PendingAction[];
}

export default function DiagnosticEvaluation({
  patient,
  diagnosticEvents,
  pendingActions,
}: DiagnosticEvaluationProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Done':
      case 'Confirmed':
        return <CheckCircleIcon sx={{ color: 'success.main', fontSize: '1.2rem' }} />;
      case 'Pending':
        return <PendingIcon sx={{ color: 'warning.main', fontSize: '1.2rem' }} />;
      case 'Not done':
        return <ErrorIcon sx={{ color: 'error.main', fontSize: '1.2rem' }} />;
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

  return (
    <Box>
      {/* Global Patient Context Bar */}
      <PatientContextBar patient={patient} />

      <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: 'primary.main' }}>
          Diagnostic Evaluation
        </Typography>

        <Grid container spacing={3}>
          {/* Patient Snapshot */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 0, borderRadius: 2 }} elevation={1}>
              <CardHeader
                title={
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    Patient Snapshot
                  </Typography>
                }
              />
              <CardContent>
                <Stack spacing={1} divider={<Divider />}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontWeight: 600 }}>Name / MRN</Typography>
                    <Typography color="text.secondary">{patient.name} / {patient.mrn}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontWeight: 600 }}>Age / Gender</Typography>
                    <Typography color="text.secondary">{patient.age} / {patient.gender}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontWeight: 600 }}>Suspected Site</Typography>
                    <Typography color="text.secondary">{patient.cancerSite}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography sx={{ fontWeight: 600 }}>ECOG Status</Typography>
                    <Chip label={patient.ecogStatus} size="small" color="primary" />
                  </Stack>
                  {patient.urgencyFlag && (
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography sx={{ fontWeight: 600 }}>Urgency Flag</Typography>
                      <Chip label="URGENT" size="small" color="error" icon={<WarningIcon />} />
                    </Stack>
                  )}
                </Stack>
              </CardContent>
            </Card>

            {/* Problem Summary */}
            <Card sx={{ mt: 2, borderRadius: 2 }} elevation={1}>
              <CardHeader
                title={
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    Problem Summary
                  </Typography>
                }
              />
              <CardContent>
                <Stack spacing={1} divider={<Divider />}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontWeight: 600 }}>Chief Complaint</Typography>
                    <Typography color="text.secondary">{patient.chiefComplaint}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontWeight: 600 }}>Duration</Typography>
                    <Typography color="text.secondary">{patient.symptomDuration}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography sx={{ fontWeight: 600 }}>Alarm Symptoms</Typography>
                    <Chip label={patient.alarmSymptoms ? 'Yes' : 'No'} size="small" color={patient.alarmSymptoms ? 'error' : 'success'} />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Diagnostic Status Tracker - CORE SECTION */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 0, borderRadius: 2, border: '2px solid', borderColor: 'primary.main' }} elevation={0}>
              <CardHeader
                title={
                  <Typography sx={{ fontWeight: 800, color: 'primary.main', textAlign: 'center' }}>
                    Diagnostic Status Tracker
                  </Typography>
                }
                subheader={<Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>(Core Section)</Typography>}
              />
              <CardContent>
                {patient.diagnosticTracker && (
                  <Stack spacing={1}>
                    {Object.entries(patient.diagnosticTracker).map(([key, status]) => (
                      <Stack key={key} direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 0.8 }}>
                        <Typography sx={{ textTransform: 'capitalize', fontWeight: 600 }}>{key.replace(/([A-Z])/g, ' $1').trim()}</Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <ListItemIcon sx={{ minWidth: 28 }}>{getStatusIcon(status)}</ListItemIcon>
                          <Chip label={status} size="small" color={getStatusColor(status)} />
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                )}

                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Avatar sx={{ width: 12, height: 12, bgcolor: 'success.main' }} />
                    <Typography variant="caption">Done</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Avatar sx={{ width: 12, height: 12, bgcolor: 'warning.main' }} />
                    <Typography variant="caption">Pending</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Avatar sx={{ width: 12, height: 12, bgcolor: 'error.main' }} />
                    <Typography variant="caption">Not Started</Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Diagnostic Events Timeline */}
            <Card sx={{ p: 0, mt: 2 }} elevation={1}>
              <CardHeader
                title={<Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>Diagnostic Events Timeline</Typography>}
              />
              <CardContent>
                <List dense>
                  {diagnosticEvents.map((event, index) => (
                    <Box key={index}>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>{getStatusIcon(event.status)}</ListItemIcon>
                        <ListItemText
                          primary={<Typography sx={{ fontWeight: 600 }}>{event.type}</Typography>}
                          secondary={
                            <>
                              <Typography component="span" variant="body2" color="text.secondary">{event.date}</Typography>
                              {event.result && (
                                <>
                                  <br />
                                  <Typography component="span" variant="body2" sx={{ fontWeight: 500 }}>{event.result}</Typography>
                                </>
                              )}
                            </>
                          }
                        />
                      </ListItem>
                      {index < diagnosticEvents.length - 1 && <Divider />}
                    </Box>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={4}>
            {/* Clinical Findings Snapshot */}
            <Card sx={{ p: 0 }} elevation={1}>
              <CardHeader title={<Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>Clinical Findings</Typography>} />
              <CardContent>
                {patient.clinicalFindings && (
                  <Stack spacing={1} divider={<Divider />}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography sx={{ fontWeight: 600 }}>Primary Lesion</Typography>
                      <Typography color="text.secondary">{patient.clinicalFindings.primaryLesion}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography sx={{ fontWeight: 600 }}>Nodes</Typography>
                      <Chip label={patient.clinicalFindings.nodes} size="small" color={patient.clinicalFindings.nodes === 'Present' ? 'error' : 'success'} />
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography sx={{ fontWeight: 600 }}>Suspected Metastasis</Typography>
                      <Chip label={patient.clinicalFindings.suspectedMetastasis ? 'Yes' : 'No'} size="small" color={patient.clinicalFindings.suspectedMetastasis ? 'error' : 'success'} />
                    </Stack>
                  </Stack>
                )}
              </CardContent>
            </Card>

            {/* Provisional Assessment */}
            <Card sx={{ p: 0, mt: 2, bgcolor: 'info.light', border: '1px solid', borderColor: 'info.main' }} elevation={0}>
              <CardHeader title={<Typography variant="h6" sx={{ fontWeight: 700, color: 'info.dark' }}>Provisional Assessment</Typography>} />
              <CardContent>
                {patient.provisionalAssessment && (
                  <Stack spacing={1} divider={<Divider />}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography sx={{ fontWeight: 600 }}>Probable Diagnosis</Typography>
                      <Typography color="text.secondary">{patient.provisionalAssessment.probableDiagnosis}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography sx={{ fontWeight: 600 }}>Tentative Stage</Typography>
                      <Typography color="text.secondary">{patient.provisionalAssessment.tentativeStage}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography sx={{ fontWeight: 600 }}>Resectable?</Typography>
                      <Chip label={patient.provisionalAssessment.resectable} size="small" color={patient.provisionalAssessment.resectable === 'Yes' ? 'success' : patient.provisionalAssessment.resectable === 'No' ? 'error' : 'warning'} />
                    </Stack>
                  </Stack>
                )}
              </CardContent>
            </Card>

            {/* Comorbidity Risk */}
            {patient.comorbidities && (
              <Card sx={{ p: 0, mt: 2 }} elevation={1}>
                <CardHeader title={<Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>Comorbidity Risk</Typography>} />
                <CardContent>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {patient.comorbidities.diabetes && <Chip label="Diabetes" size="small" color="warning" />}
                    {patient.comorbidities.cardiacDisease && <Chip label="Cardiac Disease" size="small" color="warning" />}
                    {patient.comorbidities.renalDisease && <Chip label="Renal Disease" size="small" color="warning" />}
                    {patient.comorbidities.priorCancer && <Chip label="Prior Cancer" size="small" color="warning" />}
                    {!patient.comorbidities.diabetes && !patient.comorbidities.cardiacDisease && !patient.comorbidities.renalDisease && !patient.comorbidities.priorCancer && (
                      <Typography variant="body2" color="text.secondary">No major comorbidities</Typography>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            )}

            {/* Pending Actions */}
            <Card sx={{ p: 0, mt: 2, bgcolor: 'warning.light' }} elevation={0}>
              <CardHeader title={<Typography variant="h6" sx={{ fontWeight: 700, color: 'warning.dark' }}>Pending Actions</Typography>} />
              <CardContent>
                <List dense>
                  {pendingActions.map((action, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Tooltip title={action.priority}>
                          <Avatar sx={{ width: 28, height: 28, bgcolor: action.priority === 'High' ? 'error.main' : action.priority === 'Medium' ? 'warning.main' : 'grey.400' }}>{action.priority[0]}</Avatar>
                        </Tooltip>
                      </ListItemIcon>
                      <ListItemText primary={action.action} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Alerts Panel - Full Width */}
        {patient.alerts && patient.alerts.length > 0 && (
          <Box sx={{ mt: 3 }}>
            {patient.alerts.map((alert, index) => (
              <Alert
                key={index}
                severity="error"
                icon={<WarningIcon />}
                sx={{ mb: 1, fontWeight: 500 }}
              >
                <strong>{alert.type}:</strong> {alert.message}
              </Alert>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
