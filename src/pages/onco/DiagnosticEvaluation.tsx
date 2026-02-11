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
  Button,
  Fab,
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
        boxShadow: (theme) => `0 2px 8px ${alpha(theme.palette.grey[600], 0.2)}`,
      },
    }}
  >
    <EditIcon sx={{ fontSize: 14 }} />
  </IconButton>
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
    <Box sx={{ pb: 10 }}>
      {/* Global Patient Context Bar */}
      {!hideContextBar && <PatientContextBar patient={patient} />}

      <Container maxWidth="xl" sx={{ mt: 4, mb: 5 }}>
        {/* Alerts Panel - Full Width */}
        {patient.alerts && patient.alerts.length > 0 && (
          <Box sx={{ mb: 4 }}>
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
        <Grid container spacing={4}>
          {/* Left Column - Patient Snapshot & Problem Summary */}
          <Grid item xs={12} md={4}>
            
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                  Problem Summary
                </Typography>
                <MicButton />
                <EditButton />
              </Box>
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Table size="small">
                    <TableBody>
                    <TableRow>
                        <TableCell sx={{ width: '40%', borderBottom: 'none', pl: 0 }}>
                        <Typography variant="subtitle2" color="text.secondary">Chief Complaint</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Typography variant="body2" color="text.primary" fontWeight={500}>{patient.chiefComplaint}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0 }}>
                        <Typography variant="subtitle2" color="text.secondary">Duration</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Typography variant="body2" color="text.primary">{patient.symptomDuration}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0 }}>
                        <Typography variant="subtitle2" color="text.secondary">Alarm Symptoms</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                        <Chip 
                            label={patient.alarmSymptoms ? 'Yes' : 'No'} 
                            size="small" 
                            color={patient.alarmSymptoms ? 'error' : 'success'} 
                            variant={patient.alarmSymptoms ? 'filled' : 'outlined'}
                        />
                        </TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
              </Paper>
            </Box>

             {/* Pending Actions */}
             <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="overline" sx={{ fontWeight: 700, color: 'warning.dark', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                      Pending Actions
                  </Typography>
                  <MicButton />
                <EditButton />
                </Box>
                <Paper variant="outlined" sx={{ borderRadius: 2, borderColor: 'warning.light', bgcolor: alpha('#ed6c02', 0.02) }}>
                    <List dense>
                        {pendingActions.map((action, index) => {
                        const getButtonLabel = (actionText: string) => {
                            if (actionText.toLowerCase().includes('schedule') || actionText.toLowerCase().includes('mdt')) return 'Schedule';
                            if (actionText.toLowerCase().includes('referral') || actionText.toLowerCase().includes('counseling')) return 'Refer';
                            if (actionText.toLowerCase().includes('workup') || actionText.toLowerCase().includes('mri') || actionText.toLowerCase().includes('evaluation')) return 'Order';
                            return 'Review';
                        };
                        return (
                        <Box key={index}>
                            <ListItem sx={{ py: 1.5 }}>
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
                            <Button
                                variant="outlined"
                                size="small"
                                sx={{
                                    ml: 1,
                                    textTransform: 'none',
                                    fontSize: '0.7rem',
                                    py: 0.25,
                                    px: 1.5,
                                    minWidth: 'auto',
                                    borderRadius: 1,
                                    fontWeight: 600,
                                }}
                            >
                                {getButtonLabel(action.action)}
                            </Button>
                            </ListItem>
                            {index < pendingActions.length - 1 && <Divider component="li" variant="inset" sx={{ ml: 6 }} />}
                        </Box>
                        );
                        })}
                    </List>
                </Paper>
             </Box>
          </Grid>

          {/* Middle Column - Diagnostic Status Tracker */}
          <Grid item xs={12} md={4}>
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography
                      variant="overline"
                      sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2 }}
                  >
                      Diagnostic Status
                  </Typography>
                  <MicButton />
                <EditButton />
                </Box>
                <Paper variant="outlined" sx={{ p: 0, borderRadius: 2, overflow: 'hidden' }}>
                    <Box sx={{ bgcolor: 'primary.50', p: 1.5, borderBottom: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
                         <Stack direction="row" spacing={2} justifyContent="center">
                            <Stack direction="row" spacing={0.5} alignItems="center">
                            <CheckCircleIcon sx={{ fontSize: 14, color: 'success.main' }} />
                            <Typography variant="caption" color="text.secondary">Done</Typography>
                            </Stack>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                            <PendingIcon sx={{ fontSize: 14, color: 'warning.main' }} />
                            <Typography variant="caption" color="text.secondary">Pending</Typography>
                            </Stack>
                        </Stack>
                    </Box>
                    
                    <Box sx={{ p: 2 }}>  
                        {patient.diagnosticTracker && (
                            <Stack spacing={0}>
                            {Object.entries(patient.diagnosticTracker).map(([key, status], index) => (
                                <Box 
                                key={key} 
                                sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center', 
                                    py: 1.5, 
                                    borderBottom: index < Object.keys(patient.diagnosticTracker!).length - 1 ? '1px dashed' : 'none',
                                    borderColor: 'divider',
                                }}
                                >
                                <Typography variant="body2" sx={{ textTransform: 'capitalize', fontWeight: 500, color: 'text.primary' }}>
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </Typography>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    {getStatusIcon(status)}
                                    <Chip 
                                        label={status} 
                                        size="small" 
                                        variant="outlined" 
                                        color={getStatusColor(status) as any} 
                                        sx={{ height: 20, fontSize: '0.7rem' }}
                                    />
                                </Stack>
                                </Box>
                            ))}
                            </Stack>
                        )}
                    </Box>
                </Paper>
            </Box>

            {/* Diagnostic Events Timeline */}
            <Box sx={{ mt: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                  Timeline
                </Typography>
                <MicButton />
                <EditButton />
              </Box>
              <Paper variant="outlined" sx={{ p: 0, borderRadius: 2 }}>
                <List disablePadding>
                    {diagnosticEvents.map((event, index) => (
                    <Box key={index}>
                        <ListItem alignItems="flex-start" sx={{ py: 2, px: 3 }}>
                        <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>{getStatusIcon(event.status)}</ListItemIcon>
                        <ListItemText
                            primary={
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{event.type}</Typography>
                                    <Typography variant="caption" color="text.secondary">{event.date}</Typography>
                                </Box>
                            }
                            secondary={
                            event.result && (
                                <Typography variant="body2" color="text.primary" sx={{ mt: 0.5, lineHeight: 1.4 }}>
                                    {event.result}
                                </Typography>
                            )
                            }
                        />
                        </ListItem>
                        {index < diagnosticEvents.length - 1 && <Divider component="li" />}
                    </Box>
                    ))}
                </List>
              </Paper>
            </Box>
          </Grid>

          {/* Right Column - Clinical & Assessment */}
          <Grid item xs={12} md={4}>
            {/* Clinical Findings */}
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                        Clinical Findings
                    </Typography>
                    <MicButton />
                <EditButton />
                </Box>

              <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                {patient.clinicalFindings ? (
                    <Stack spacing={2}>
                         <Box>
                             <Typography variant="caption" color="text.secondary" display="block" gutterBottom>Primary Lesion</Typography>
                             <Typography variant="body1" fontWeight={500}>{patient.clinicalFindings.primaryLesion}</Typography>
                         </Box>
                         <Divider />
                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                             <Box>
                                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>Nodes</Typography>
                                <Typography variant="body2">{patient.clinicalFindings.nodes}</Typography>
                             </Box>
                             <Chip 
                                label={patient.clinicalFindings.nodes === 'Present' || patient.clinicalFindings.nodes.includes('Present') || patient.clinicalFindings.nodes.includes('pathy') ? 'Significant' : 'Normal'} 
                                size="small" 
                                color={patient.clinicalFindings.nodes.includes('Present') || patient.clinicalFindings.nodes.includes('pathy') ? 'warning' : 'default'}
                                variant="outlined"
                            />
                         </Box>
                          <Divider />
                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                             <Typography variant="body2" color="text.secondary">Suspected Metastasis</Typography>
                             <Chip 
                                label={patient.clinicalFindings.suspectedMetastasis ? 'Yes' : 'No'} 
                                size="small" 
                                color={patient.clinicalFindings.suspectedMetastasis ? 'error' : 'success'} 
                            />
                         </Box>
                    </Stack>
                ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>No findings recorded.</Typography>
                )}
              </Paper>
            </Box>

            {/* Histopathology */}
            {patient.histopathology && (
              <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                    Histopathology
                  </Typography>
                  <MicButton />
                  <EditButton />
                </Box>
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block" gutterBottom>Type</Typography>
                      <Typography variant="body1" fontWeight={500}>{patient.histopathology.type}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block" gutterBottom>Grade</Typography>
                      <Typography variant="body2">{patient.histopathology.grade}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block" gutterBottom>Margins</Typography>
                      <Typography variant="body2">{patient.histopathology.margins}</Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Box>
            )}

            {/* Provisional Assessment */}
            <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                        Provisional Assessment
                    </Typography>
                    <MicButton />
                <EditButton />
                </Box>
              
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: (theme) => alpha(theme.palette.primary.main, 0.02), borderColor:  (theme) => alpha(theme.palette.primary.main, 0.2) }}>
                {patient.provisionalAssessment ? (
                     <Stack spacing={2}>
                        <Box>
                            <Typography variant="caption" color="primary" display="block" gutterBottom sx={{ fontWeight: 600 }}>Probable Diagnosis</Typography>
                            <Typography variant="h6" color="text.primary" sx={{ fontSize: '1.1rem' }}>
                                {patient.provisionalAssessment.probableDiagnosis}
                            </Typography>
                        </Box>
                        
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Paper variant="outlined" sx={{ p: 1.5, bgcolor: 'background.paper', textAlign: 'center' }}>
                                    <Typography variant="caption" color="text.secondary" display="block">Tentative Stage</Typography>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                      {patient.tnmStage ? `${patient.tnmStage} (${patient.provisionalAssessment.tentativeStage})` : patient.provisionalAssessment.tentativeStage}
                                    </Typography>
                                </Paper>
                            </Grid>
                             <Grid item xs={6}>
                                <Paper variant="outlined" sx={{ p: 1.5, bgcolor: 'background.paper', textAlign: 'center' }}>
                                    <Typography variant="caption" color="text.secondary" display="block">Resectable?</Typography>
                                    <Typography 
                                        variant="subtitle2" 
                                        sx={{ 
                                            fontWeight: 600, 
                                            color: patient.provisionalAssessment.resectable === 'Yes' ? 'success.main' : 
                                                   patient.provisionalAssessment.resectable === 'No' ? 'error.main' : 'warning.main'
                                        }}
                                    >
                                        {patient.provisionalAssessment.resectable}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                   </Stack>
                ) : (
                   <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>No assessment recorded.</Typography>
                )}
              </Paper>
            </Box>

            {/* Comorbidity Risk */}
            {patient.comorbidities && (
               <Box sx={{ mt: 4 }}>
                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                   <Typography variant="overline" sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.8rem', letterSpacing: 1 }}>
                    Comorbidities
                   </Typography>
                   <MicButton />
                <EditButton />
                 </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {patient.comorbidities.diabetes && <Chip label="Diabetes" size="small" variant="outlined" />}
                  {patient.comorbidities.cardiacDisease && <Chip label="Cardiac Disease" size="small" variant="outlined" />}
                  {patient.comorbidities.renalDisease && <Chip label="Renal Disease" size="small" variant="outlined" />}
                  {patient.comorbidities.priorCancer && <Chip label="Prior Cancer" size="small" variant="outlined" />}
                  {!patient.comorbidities.diabetes && !patient.comorbidities.cardiacDisease && !patient.comorbidities.renalDisease && !patient.comorbidities.priorCancer && (
                    <Typography variant="caption" color="text.secondary">No major comorbidities</Typography>
                  )}
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>

      </Container>
      <ActionFooter primaryLabel="Finish and Next Patient" />
    </Box>
  );
}
