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
  TableHead,
  Button,
  Divider,
  Stack,
  Fab,
  IconButton,
  Alert,
  LinearProgress,
  Snackbar,
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import ActionFooter from '../../components/onco/ActionFooter';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EditIcon from '@mui/icons-material/Edit';
import SpaIcon from '@mui/icons-material/Spa';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import { OncologyPatient, RECISTResponse, OncoStatus } from '../../types/oncology';
import PatientContextBar from '../../components/onco/PatientContextBar';
import StageTransitionDialog from '../../components/onco/StageTransitionDialog';

interface ResponseAssessmentProps {
  patient: OncologyPatient;
  hideContextBar?: boolean;
  onTransition?: (targetStage: OncoStatus, reason: string) => void;
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
        boxShadow: (theme) => `0 2px 8px ${alpha(theme.palette.primary.main, 0.2)}`,
      },
    }}
  >
    <MicIcon sx={{ fontSize: 16 }} />
  </IconButton>
);

const getRecistColor = (category: RECISTResponse) => {
  switch (category) {
    case 'Complete Response (CR)': return 'success';
    case 'Partial Response (PR)': return 'info';
    case 'Stable Disease (SD)': return 'warning';
    case 'Progressive Disease (PD)': return 'error';
    default: return 'default';
  }
};

const getRecistBgColor = (category: RECISTResponse) => {
  switch (category) {
    case 'Complete Response (CR)': return '#e8f5e9';
    case 'Partial Response (PR)': return '#e3f2fd';
    case 'Stable Disease (SD)': return '#fff3e0';
    case 'Progressive Disease (PD)': return '#ffebee';
    default: return '#f5f5f5';
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'Falling': return <TrendingDownIcon sx={{ color: 'success.main', fontSize: 20 }} />;
    case 'Rising': return <TrendingUpIcon sx={{ color: 'error.main', fontSize: 20 }} />;
    case 'Stable': return <TrendingFlatIcon sx={{ color: 'warning.main', fontSize: 20 }} />;
    default: return null;
  }
};

export default function ResponseAssessment({ patient, hideContextBar, onTransition }: ResponseAssessmentProps) {
  const latestAssessment = patient.responseAssessments?.[patient.responseAssessments.length - 1];
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingTransition, setPendingTransition] = useState<{ target: OncoStatus; reason: string; variant: 'default' | 'warning' | 'success' } | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleTransitionRequest = (target: OncoStatus, reason: string, variant: 'default' | 'warning' | 'success' = 'default') => {
    setPendingTransition({ target, reason, variant });
    setDialogOpen(true);
  };

  const handleConfirmTransition = () => {
    if (pendingTransition) {
      onTransition?.(pendingTransition.target, pendingTransition.reason);
      setSnackbarMessage(`Patient moved to ${pendingTransition.target}`);
      setShowSnackbar(true);
    }
    setDialogOpen(false);
    setPendingTransition(null);
  };

  if (!latestAssessment) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <AssessmentIcon sx={{ fontSize: 48, color: 'grey.300', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">No Response Assessment Available</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Response assessment will be available after treatment cycles are completed.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 10 }}>
      {!hideContextBar && <PatientContextBar patient={patient} />}

      <Container maxWidth="xl" sx={{ mt: 4, mb: 5 }}>
        {/* Overall Response Banner */}
        <Paper
          elevation={0}
          sx={{
            mb: 4,
            p: 0,
            borderRadius: 3,
            overflow: 'hidden',
            border: '2px solid',
            borderColor: latestAssessment.overallResponse.includes('Complete') ? 'success.main'
              : latestAssessment.overallResponse.includes('Partial') ? 'info.main'
              : latestAssessment.overallResponse.includes('Stable') ? 'warning.main'
              : 'error.main',
          }}
        >
          <Box
            sx={{
              px: 4,
              py: 2,
              bgcolor: getRecistBgColor(latestAssessment.overallResponse),
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1.5, display: 'block', mb: 0.5, fontSize: '0.7rem' }}>
                OVERALL RESPONSE — ASSESSMENT #{latestAssessment.assessmentNumber}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {latestAssessment.overallResponse}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Assessment Date: {latestAssessment.assessmentDate}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Chip
                label={latestAssessment.clinicalBenefit ? 'Clinical Benefit: Yes' : 'Clinical Benefit: No'}
                color={latestAssessment.clinicalBenefit ? 'success' : 'error'}
                variant="outlined"
                sx={{ fontWeight: 600, mb: 1 }}
              />
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Chip
                  label={`Treatment: ${patient.currentProtocol?.name || 'N/A'}`}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.7rem' }}
                />
                <Chip
                  label={`${patient.currentProtocol?.totalExposure || 'N/A'} completed`}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.7rem' }}
                />
              </Box>
            </Box>
          </Box>
        </Paper>

        <Grid container spacing={4}>
          {/* LEFT - Imaging Results (RECIST) */}
          <Grid item xs={12} md={7}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                Imaging Response (RECIST 1.1)
              </Typography>
              <MicButton />
            </Box>

            <Paper variant="outlined" sx={{ p: 0, borderRadius: 2, overflow: 'hidden' }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', py: 1.5 }}>Scan / Site</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', py: 1.5 }}>Baseline</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', py: 1.5 }}>Current</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', py: 1.5 }}>Change</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', py: 1.5 }}>RECIST Category</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {latestAssessment.scanResults.map((scan, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="body2" fontWeight={600}>{scan.type}</Typography>
                        <Typography variant="caption" color="text.secondary" display="block">{scan.site}</Typography>
                        <Typography variant="caption" color="text.disabled">{scan.date}</Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="body2">{scan.baseline}</Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="body2" fontWeight={500}>{scan.current}</Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {scan.changePercent < 0 ? (
                            <TrendingDownIcon sx={{ fontSize: 16, color: 'success.main' }} />
                          ) : scan.changePercent > 0 ? (
                            <TrendingUpIcon sx={{ fontSize: 16, color: 'error.main' }} />
                          ) : (
                            <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
                          )}
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            color={scan.changePercent <= 0 ? 'success.main' : 'error.main'}
                          >
                            {scan.changePercent === 0 ? 'No change' : `${scan.changePercent > 0 ? '+' : ''}${scan.changePercent}%`}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ py: 2 }}>
                        <Chip
                          label={scan.recistCategory}
                          size="small"
                          color={getRecistColor(scan.recistCategory) as any}
                          sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>

            {/* Tumor Marker Trends */}
            <Box sx={{ mt: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                  Tumor Marker Trends
                </Typography>
                <MicButton />
              </Box>
              <Grid container spacing={2}>
                {latestAssessment.markerTrends.map((marker, index) => {
                  const isNormal = marker.normal
                    ? marker.current >= marker.normal.min && marker.current <= marker.normal.max
                    : false;
                  const percentChange = ((marker.current - marker.baseline) / marker.baseline * 100).toFixed(1);

                  return (
                    <Grid item xs={12} sm={6} key={index}>
                      <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                          <Typography variant="subtitle2" fontWeight={700}>{marker.name}</Typography>
                          {getTrendIcon(marker.trend)}
                        </Box>

                        <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                          <Box>
                            <Typography variant="caption" color="text.secondary" display="block">Baseline</Typography>
                            <Typography variant="body2" fontWeight={500}>{marker.baseline} {marker.unit}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ArrowForwardIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                          </Box>
                          <Box>
                            <Typography variant="caption" color="text.secondary" display="block">Current</Typography>
                            <Typography variant="body1" fontWeight={700} color={isNormal ? 'success.main' : 'warning.main'}>
                              {marker.current} {marker.unit}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="caption" color={Number(percentChange) < 0 ? 'success.main' : 'error.main'} fontWeight={600}>
                            {Number(percentChange) > 0 ? '+' : ''}{percentChange}%
                          </Typography>
                          {marker.normal && (
                            <Chip
                              label={isNormal ? 'Normal Range' : 'Above Normal'}
                              size="small"
                              color={isNormal ? 'success' : 'warning'}
                              variant="outlined"
                              sx={{ height: 22, fontSize: '0.65rem', fontWeight: 600 }}
                            />
                          )}
                        </Box>

                        {/* Visual bar */}
                        {marker.normal && (
                          <Box sx={{ mt: 1.5 }}>
                            <LinearProgress
                              variant="determinate"
                              value={Math.min((marker.current / marker.normal.max) * 100, 100)}
                              sx={{
                                height: 6,
                                borderRadius: 3,
                                bgcolor: 'grey.100',
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: isNormal ? 'success.main' : 'warning.main',
                                  borderRadius: 3,
                                },
                              }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                              <Typography variant="caption" color="text.disabled">{marker.normal.min}</Typography>
                              <Typography variant="caption" color="text.disabled">{marker.normal.max} {marker.unit}</Typography>
                            </Box>
                          </Box>
                        )}
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>

            {/* Toxicity Summary */}
            <Box sx={{ mt: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="overline" sx={{ fontWeight: 700, color: 'warning.dark', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                  Cumulative Toxicity Summary
                </Typography>
                <MicButton />
              </Box>
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: alpha('#ed6c02', 0.02) }}>
                <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                  {latestAssessment.toxicitySummary}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ mb: 1, display: 'block' }}>
                  RESIDUAL TOXICITIES
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {latestAssessment.cumulativeToxicity.map((tox, i) => (
                    <Chip
                      key={i}
                      label={tox}
                      size="small"
                      variant="outlined"
                      color={tox.toLowerCase().includes('resolved') ? 'success' : 'warning'}
                      sx={{ fontSize: '0.75rem', fontWeight: 500 }}
                    />
                  ))}
                </Stack>
              </Paper>
            </Box>
          </Grid>

          {/* RIGHT - Clinical Decision & Next Steps */}
          <Grid item xs={12} md={5}>
            {/* Doctor's Assessment */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                Clinical Assessment
              </Typography>
              <MicButton />
            </Box>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 4 }}>
              <Typography variant="body2" sx={{ lineHeight: 1.7, fontStyle: 'italic', color: 'text.primary' }}>
                "{latestAssessment.doctorAssessment}"
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary">Assessing Physician</Typography>
                <Typography variant="body2" fontWeight={600}>Dr. Rao (Med Onco)</Typography>
              </Box>
            </Paper>

            {/* Response Decision Matrix */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="overline" sx={{ fontWeight: 700, color: 'success.dark', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                Next Step Decision
              </Typography>
              <MicButton />
            </Box>
            <Paper
              variant="outlined"
              sx={{
                p: 3,
                borderRadius: 2,
                mb: 4,
                border: '2px solid',
                borderColor: 'success.main',
                bgcolor: alpha('#4caf50', 0.03),
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Chip
                  label={latestAssessment.nextStep}
                  color="success"
                  sx={{ fontWeight: 700, fontSize: '0.85rem', px: 2, py: 2.5 }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', lineHeight: 1.6 }}>
                {latestAssessment.nextStepDetails}
              </Typography>

              <Divider sx={{ my: 3 }} />

              {/* Response-based routing */}
              <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>
                Response-Based Routing
              </Typography>
              <Stack spacing={1}>
                {[
                  { response: 'Complete/Partial Response', action: 'Continue treatment or Surgery', active: latestAssessment.overallResponse.includes('Complete') || latestAssessment.overallResponse.includes('Partial') },
                  { response: 'Stable Disease', action: 'Continue or Surveillance', active: latestAssessment.overallResponse.includes('Stable') },
                  { response: 'Progressive Disease', action: 'Back to Treatment Planning', active: latestAssessment.overallResponse.includes('Progressive') },
                  { response: 'Patient Unfit', action: 'Palliative Transition', active: false },
                ].map((route, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 1.5,
                      borderRadius: 1.5,
                      bgcolor: route.active ? alpha('#4caf50', 0.08) : 'grey.50',
                      border: '1px solid',
                      borderColor: route.active ? 'success.main' : 'divider',
                    }}
                  >
                    <Box>
                      <Typography variant="body2" fontWeight={route.active ? 700 : 500} color={route.active ? 'success.dark' : 'text.secondary'}>
                        {route.response}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">{route.action}</Typography>
                    </Box>
                    {route.active && <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />}
                  </Box>
                ))}
              </Stack>
            </Paper>

            {/* Treatment Summary Stats */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                Treatment Completed
              </Typography>
              <MicButton />
            </Box>
            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
              <Grid container spacing={2}>
                {[
                  { label: 'Protocol', value: patient.currentProtocol?.name || 'N/A' },
                  { label: 'Cycles Given', value: patient.currentProtocol?.totalExposure || 'N/A' },
                  { label: 'Duration', value: patient.currentProtocol?.timeOnTherapy || 'N/A' },
                  { label: 'Dose Interruptions', value: patient.currentProtocol?.doseInterruptions || 'None' },
                ].map((item, i) => (
                  <Grid item xs={6} key={i}>
                    <Box sx={{ p: 1.5, bgcolor: 'grey.50', borderRadius: 1.5 }}>
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.7rem' }}>{item.label}</Typography>
                      <Typography variant="body2" fontWeight={600} sx={{ mt: 0.5 }}>{item.value}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Action Buttons - Decision Workflow */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="overline" sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem', letterSpacing: 1, mb: 1.5, display: 'block' }}>
                CLINICAL DECISION ACTIONS
              </Typography>
              <Stack spacing={1.5}>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ fontWeight: 600, py: 1.5, textTransform: 'none', borderRadius: 2 }}
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleTransitionRequest('Observation', 'Complete/Partial Response — Moving to Surveillance protocol for ongoing monitoring.', 'success')}
                >
                  Move to Surveillance
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ fontWeight: 600, py: 1.5, textTransform: 'none', borderRadius: 2 }}
                  startIcon={<VerifiedUserIcon />}
                  onClick={() => handleTransitionRequest('Maintenance', 'Stable disease / Partial response — Starting maintenance therapy.', 'default')}
                >
                  Start Maintenance
                </Button>
                <Button
                  variant="outlined"
                  color="warning"
                  fullWidth
                  sx={{ fontWeight: 600, py: 1.5, textTransform: 'none', borderRadius: 2 }}
                  startIcon={<EditIcon />}
                  onClick={() => handleTransitionRequest('Treatment Planning', 'Change in treatment plan required — Returning to planning.', 'warning')}
                >
                  Change Treatment Plan
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  sx={{ fontWeight: 600, py: 1.5, textTransform: 'none', borderRadius: 2 }}
                  startIcon={<SpaIcon />}
                  onClick={() => handleTransitionRequest('Palliative', 'Patient unfit for further curative treatment — Transitioning to palliative care.', 'warning')}
                >
                  Palliative Transition
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ fontWeight: 600, py: 1.5, textTransform: 'none', borderRadius: 2 }}
                >
                  Request MDT Review
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <ActionFooter primaryLabel="Finish and Next Patient" />

      {/* Stage Transition Dialog */}
      {pendingTransition && (
        <StageTransitionDialog
          open={dialogOpen}
          onClose={() => { setDialogOpen(false); setPendingTransition(null); }}
          onConfirm={handleConfirmTransition}
          currentStage={patient.oncoStatus}
          targetStage={pendingTransition.target}
          patientName={patient.name}
          details={pendingTransition.reason}
          variant={pendingTransition.variant}
        />
      )}

      {/* Success Snackbar */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setShowSnackbar(false)} sx={{ fontWeight: 600 }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
