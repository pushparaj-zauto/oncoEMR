import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Chip,
  Stack,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableRow,
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

      <Container maxWidth="xl" sx={{ mt: 4, mb: 5 }}>
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: 600, color: 'primary.main', letterSpacing: 0.3 }}
        >
          Diagnostic Evaluation
        </Typography>

        <Grid container spacing={3}>
          {/* Left Column - Patient Snapshot & Problem Summary */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                Patient Snapshot
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ width: '40%' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Name / MRN</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.primary">{patient.name} / {patient.mrn}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Age / Gender</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.primary">{patient.age} / {patient.gender}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Suspected Site</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.primary">{patient.cancerSite}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>ECOG Status</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={patient.ecogStatus} size="small" color="primary" />
                    </TableCell>
                  </TableRow>
                  {patient.urgencyFlag && (
                    <TableRow>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Urgency Flag</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label="URGENT" size="small" color="error" icon={<WarningIcon />} />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Paper>

            <Paper elevation={1} sx={{ p: 3, mt: 2, borderRadius: 2 }}>
              <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                Problem Summary
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ width: '40%' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Chief Complaint</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.primary">{patient.chiefComplaint}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Duration</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.primary">{patient.symptomDuration}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Alarm Symptoms</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={patient.alarmSymptoms ? 'Yes' : 'No'} 
                        size="small" 
                        color={patient.alarmSymptoms ? 'error' : 'success'} 
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Grid>

          {/* Middle Column - Diagnostic Status Tracker */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, border: '2px solid', borderColor: 'primary.main', borderRadius: 2 }}>
              <Typography
                variant="overline"
                sx={{ mb: 1, fontWeight: 700, color: 'primary.main', textAlign: 'center', display: 'block', fontSize: '0.9rem', letterSpacing: 1 }}
              >
                Diagnostic Status Tracker
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mb: 2 }}>
                (Core Section)
              </Typography>
              
              {patient.diagnosticTracker && (
                <Stack spacing={1}>
                  {Object.entries(patient.diagnosticTracker).map(([key, status]) => (
                    <Box 
                      key={key} 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        py: 1, 
                        borderBottom: '1px dashed',
                        borderColor: 'divider',
                        '&:last-child': { borderBottom: 'none' }
                      }}
                    >
                      <Typography variant="body2" sx={{ textTransform: 'capitalize', fontWeight: 600 }}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        {getStatusIcon(status)}
                        <Chip label={status} size="small" color={getStatusColor(status)} />
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              )}

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 1 }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Avatar sx={{ width: 10, height: 10, bgcolor: 'success.main' }} />
                  <Typography variant="caption" color="text.secondary">Done</Typography>
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Avatar sx={{ width: 10, height: 10, bgcolor: 'warning.main' }} />
                  <Typography variant="caption" color="text.secondary">Pending</Typography>
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Avatar sx={{ width: 10, height: 10, bgcolor: 'error.main' }} />
                  <Typography variant="caption" color="text.secondary">Not Started</Typography>
                </Stack>
              </Stack>
            </Paper>

            {/* Diagnostic Events Timeline */}
            <Paper sx={{ p: 3, mt: 2 }}>
              <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                Diagnostic Events Timeline
              </Typography>
              <List dense disablePadding>
                {diagnosticEvents.map((event, index) => (
                  <Box key={index}>
                    <ListItem sx={{ px: 0, py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>{getStatusIcon(event.status)}</ListItemIcon>
                      <ListItemText
                        primary={<Typography variant="body2" sx={{ fontWeight: 600 }}>{event.type}</Typography>}
                        secondary={
                          <>
                            <Typography component="span" variant="caption" color="text.secondary" display="block">
                              {event.date}
                            </Typography>
                            {event.result && (
                              <Typography component="span" variant="body2" sx={{ fontWeight: 500, color: 'text.primary', mt: 0.5, display: 'block' }}>
                                {event.result}
                              </Typography>
                            )}
                          </>
                        }
                      />
                    </ListItem>
                    {index < diagnosticEvents.length - 1 && <Divider component="li" />}
                  </Box>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Right Column - Clinical & Assessment */}
          <Grid item xs={12} md={4}>
            {/* Clinical Findings */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                Clinical Findings
              </Typography>
              {patient.clinicalFindings && (
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ width: '40%' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Primary Lesion</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.primary">{patient.clinicalFindings.primaryLesion}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Nodes</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={patient.clinicalFindings.nodes} 
                          size="small" 
                          color={patient.clinicalFindings.nodes === 'Present' ? 'error' : 'success'} 
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Suspected Metastasis</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={patient.clinicalFindings.suspectedMetastasis ? 'Yes' : 'No'} 
                          size="small" 
                          color={patient.clinicalFindings.suspectedMetastasis ? 'error' : 'success'} 
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </Paper>

            {/* Provisional Assessment */}
            <Paper sx={{ p: 3, mt: 2, bgcolor: 'info.light' }}>
              <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'info.dark', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                Provisional Assessment
              </Typography>
              {patient.provisionalAssessment && (
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ width: '40%' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Probable Diagnosis</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.primary" fontWeight={500}>
                          {patient.provisionalAssessment.probableDiagnosis}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Tentative Stage</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.primary">{patient.provisionalAssessment.tentativeStage}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Resectable?</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={patient.provisionalAssessment.resectable} 
                          size="small" 
                          color={
                            patient.provisionalAssessment.resectable === 'Yes' ? 'success' : 
                            patient.provisionalAssessment.resectable === 'No' ? 'error' : 'warning'
                          } 
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </Paper>

            {/* Comorbidity Risk */}
            {patient.comorbidities && (
              <Paper sx={{ p: 3, mt: 2 }}>
                <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                  Comorbidity Risk
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {patient.comorbidities.diabetes && <Chip label="Diabetes" size="small" color="warning" />}
                  {patient.comorbidities.cardiacDisease && <Chip label="Cardiac Disease" size="small" color="warning" />}
                  {patient.comorbidities.renalDisease && <Chip label="Renal Disease" size="small" color="warning" />}
                  {patient.comorbidities.priorCancer && <Chip label="Prior Cancer" size="small" color="warning" />}
                  {!patient.comorbidities.diabetes && !patient.comorbidities.cardiacDisease && !patient.comorbidities.renalDisease && !patient.comorbidities.priorCancer && (
                    <Typography variant="body2" color="success.main">No major comorbidities</Typography>
                  )}
                </Box>
              </Paper>
            )}

            {/* Pending Actions */}
            <Paper sx={{ p: 3, mt: 2, bgcolor: 'warning.light' }}>
              <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'warning.dark', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                Pending Actions
              </Typography>
              <List dense disablePadding>
                {pendingActions.map((action, index) => (
                  <Box key={index}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Tooltip title={action.priority}>
                          <Avatar 
                            sx={{ 
                              width: 24, 
                              height: 24, 
                              bgcolor: action.priority === 'High' ? 'error.main' : action.priority === 'Medium' ? 'warning.main' : 'grey.400',
                              fontSize: '0.75rem',
                              fontWeight: 700
                            }}
                          >
                            {action.priority[0]}
                          </Avatar>
                        </Tooltip>
                      </ListItemIcon>
                      <ListItemText 
                        primary={<Typography variant="body2" sx={{ fontWeight: 500 }}>{action.action}</Typography>} 
                      />
                    </ListItem>
                    {index < pendingActions.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </Paper>
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
                sx={{ mb: 1, fontWeight: 500, borderRadius: 2 }}
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
