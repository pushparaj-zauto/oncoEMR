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
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
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
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                Patient Snapshot
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Name / MRN</TableCell>
                    <TableCell>
                      {patient.name} / {patient.mrn}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Age / Gender</TableCell>
                    <TableCell>
                      {patient.age} / {patient.gender}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Suspected Site</TableCell>
                    <TableCell>{patient.cancerSite}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>ECOG Status</TableCell>
                    <TableCell>
                      <Chip label={patient.ecogStatus} size="small" color="primary" />
                    </TableCell>
                  </TableRow>
                  {patient.urgencyFlag && (
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Urgency Flag</TableCell>
                      <TableCell>
                        <Chip label="URGENT" size="small" color="error" icon={<WarningIcon />} />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Paper>

            {/* Problem Summary */}
            <Paper sx={{ p: 3, mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                Problem Summary
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Chief Complaint</TableCell>
                    <TableCell>{patient.chiefComplaint}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
                    <TableCell>{patient.symptomDuration}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Alarm Symptoms</TableCell>
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

          {/* Diagnostic Status Tracker - CORE SECTION */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, border: '2px solid', borderColor: 'primary.main' }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: 600, color: 'primary.main', textAlign: 'center' }}
              >
                🎯 Diagnostic Status Tracker
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', mb: 2, textAlign: 'center', color: 'text.secondary' }}>
                (Core Section)
              </Typography>

              {patient.diagnosticTracker && (
                <Box>
                  {Object.entries(patient.diagnosticTracker).map(([key, status]) => (
                    <Box
                      key={key}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1.5,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <Typography sx={{ textTransform: 'capitalize', fontWeight: 500 }}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getStatusIcon(status)}
                        <Chip label={status} size="small" color={getStatusColor(status)} />
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}

              <Box sx={{ mt: 3, display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'success.main' }} />
                  <Typography variant="caption">Done</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'warning.main' }} />
                  <Typography variant="caption">Pending</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'error.main' }} />
                  <Typography variant="caption">Not Started</Typography>
                </Box>
              </Box>
            </Paper>

            {/* Diagnostic Events Timeline */}
            <Paper sx={{ p: 3, mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                Diagnostic Events Timeline
              </Typography>
              <List dense>
                {diagnosticEvents.map((event, index) => (
                  <Box key={index}>
                    <ListItem sx={{ px: 0 }}>
                      <Box sx={{ mr: 1 }}>{getStatusIcon(event.status)}</Box>
                      <ListItemText
                        primary={event.type}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.secondary">
                              {event.date}
                            </Typography>
                            {event.result && (
                              <>
                                <br />
                                <Typography component="span" variant="body2" sx={{ fontWeight: 500 }}>
                                  {event.result}
                                </Typography>
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
            </Paper>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={4}>
            {/* Clinical Findings Snapshot */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                Clinical Findings
              </Typography>
              {patient.clinicalFindings && (
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Primary Lesion</TableCell>
                      <TableCell>{patient.clinicalFindings.primaryLesion}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Nodes</TableCell>
                      <TableCell>
                        <Chip
                          label={patient.clinicalFindings.nodes}
                          size="small"
                          color={patient.clinicalFindings.nodes === 'Present' ? 'error' : 'success'}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Suspected Metastasis</TableCell>
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
            <Paper sx={{ p: 3, mt: 2, bgcolor: 'info.light', border: '1px solid', borderColor: 'info.main' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'info.dark' }}>
                Provisional Assessment
              </Typography>
              {patient.provisionalAssessment && (
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Probable Diagnosis</TableCell>
                      <TableCell>{patient.provisionalAssessment.probableDiagnosis}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Tentative Stage</TableCell>
                      <TableCell>{patient.provisionalAssessment.tentativeStage}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Resectable?</TableCell>
                      <TableCell>
                        <Chip
                          label={patient.provisionalAssessment.resectable}
                          size="small"
                          color={
                            patient.provisionalAssessment.resectable === 'Yes'
                              ? 'success'
                              : patient.provisionalAssessment.resectable === 'No'
                              ? 'error'
                              : 'warning'
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
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                  Comorbidity Risk
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {patient.comorbidities.diabetes && <Chip label="Diabetes" size="small" color="warning" />}
                  {patient.comorbidities.cardiacDisease && (
                    <Chip label="Cardiac Disease" size="small" color="warning" />
                  )}
                  {patient.comorbidities.renalDisease && (
                    <Chip label="Renal Disease" size="small" color="warning" />
                  )}
                  {patient.comorbidities.priorCancer && (
                    <Chip label="Prior Cancer" size="small" color="warning" />
                  )}
                  {!patient.comorbidities.diabetes &&
                    !patient.comorbidities.cardiacDisease &&
                    !patient.comorbidities.renalDisease &&
                    !patient.comorbidities.priorCancer && (
                      <Typography variant="body2" color="text.secondary">
                        No major comorbidities
                      </Typography>
                    )}
                </Box>
              </Paper>
            )}

            {/* Pending Actions */}
            <Paper sx={{ p: 3, mt: 2, bgcolor: 'warning.light' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'warning.dark' }}>
                Pending Actions
              </Typography>
              <List dense>
                {pendingActions.map((action, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <Chip
                      label={action.priority}
                      size="small"
                      color={action.priority === 'High' ? 'error' : action.priority === 'Medium' ? 'warning' : 'default'}
                      sx={{ mr: 1 }}
                    />
                    <ListItemText primary={action.action} />
                  </ListItem>
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
