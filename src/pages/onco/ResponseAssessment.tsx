import {
  Box,
  Container,
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

const SectionLabel = ({ label, color = 'primary.main' }: { label: string; color?: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
    <Typography
      variant="overline"
      sx={{ fontWeight: 700, color, fontSize: '0.75rem', letterSpacing: 1.5, lineHeight: 1 }}
    >
      {label}
    </Typography>
    <MicButton />
    <EditButton />
  </Box>
);

const cardSx = {
  p: 1.75,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
};

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

      <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
        {/* Overall Response Banner */}
        <Box
          sx={{
            mb: 2,
            px: 2.5,
            py: 1.75,
            borderRadius: 2,
            bgcolor: getRecistBgColor(latestAssessment.overallResponse),
            border: '1.5px solid',
            borderColor: latestAssessment.overallResponse.includes('Complete') ? 'success.main'
              : latestAssessment.overallResponse.includes('Partial') ? 'info.main'
              : latestAssessment.overallResponse.includes('Stable') ? 'warning.main'
              : 'error.main',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1.5, display: 'block', mb: 0.25, fontSize: '0.68rem' }}>
              OVERALL RESPONSE — ASSESSMENT #{latestAssessment.assessmentNumber}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {latestAssessment.overallResponse}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Assessment Date: {latestAssessment.assessmentDate}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Chip
              label={latestAssessment.clinicalBenefit ? 'Clinical Benefit: Yes' : 'Clinical Benefit: No'}
              color={latestAssessment.clinicalBenefit ? 'success' : 'error'}
              variant="outlined"
              size="small"
              sx={{ fontWeight: 600, mb: 0.75, fontSize: '0.72rem' }}
            />
            <Box sx={{ display: 'flex', gap: 0.75, justifyContent: 'flex-end' }}>
              <Chip
                label={`Treatment: ${patient.currentProtocol?.name || 'N/A'}`}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.68rem', height: 20 }}
              />
              <Chip
                label={`${patient.currentProtocol?.totalExposure || 'N/A'} completed`}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.68rem', height: 20 }}
              />
            </Box>
          </Box>
        </Box>

        {/* ═══════ ROW 1: Imaging Table + Clinical Assessment ═══════ */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' },
            gap: 2,
            mb: 2,
          }}
        >
          {/* Imaging Results */}
          <Box sx={cardSx}>
            <SectionLabel label="Imaging Response (RECIST 1.1)" />
            <Box sx={{ mx: -2, mb: -2 }}>
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
            </Box>
          </Box>

          {/* Clinical Assessment + Next Step */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Clinical Assessment */}
            <Box sx={cardSx}>
              <SectionLabel label="Clinical Assessment" />
              <Typography variant="body2" sx={{ lineHeight: 1.6, fontStyle: 'italic', color: 'text.primary', fontSize: '0.82rem' }}>
                "{latestAssessment.doctorAssessment}"
              </Typography>
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary">Assessing Physician</Typography>
                <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.82rem' }}>Dr. Rao (Med Onco)</Typography>
              </Box>
            </Box>

            {/* Next Step Decision */}
            <Box
              sx={{
                ...cardSx,
                border: '1.5px solid',
                borderColor: 'success.main',
                bgcolor: alpha('#4caf50', 0.03),
              }}
            >
              <SectionLabel label="Next Step Decision" color="success.dark" />
              <Box sx={{ textAlign: 'center', mb: 1.5 }}>
                <Chip
                  label={latestAssessment.nextStep}
                  color="success"
                  sx={{ fontWeight: 700, fontSize: '0.82rem', px: 2, py: 2 }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', lineHeight: 1.5, fontSize: '0.82rem' }}>
                {latestAssessment.nextStepDetails}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ mb: 1, display: 'block', textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.65rem' }}>
                Response-Based Routing
              </Typography>
              <Stack spacing={0.75}>
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
                      px: 1.5,
                      py: 0.75,
                      borderRadius: 1,
                      bgcolor: route.active ? alpha('#4caf50', 0.08) : 'grey.50',
                      border: '1px solid',
                      borderColor: route.active ? 'success.main' : 'divider',
                    }}
                  >
                    <Box>
                      <Typography variant="body2" fontWeight={route.active ? 700 : 500} color={route.active ? 'success.dark' : 'text.secondary'} sx={{ fontSize: '0.78rem' }}>
                        {route.response}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.68rem' }}>{route.action}</Typography>
                    </Box>
                    {route.active && <CheckCircleIcon sx={{ color: 'success.main', fontSize: 18 }} />}
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* ═══════ ROW 2: Tumor Markers + Toxicity ═══════ */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
            mb: 2,
          }}
        >
          {/* Tumor Marker Trends */}
          <Box sx={cardSx}>
            <SectionLabel label="Tumor Marker Trends" />
            <Stack spacing={1.25}>
              {latestAssessment.markerTrends.map((marker, index) => {
                const isNormal = marker.normal
                  ? marker.current >= marker.normal.min && marker.current <= marker.normal.max
                  : false;
                const percentChange = ((marker.current - marker.baseline) / marker.baseline * 100).toFixed(1);

                return (
                  <Box key={index} sx={{ p: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle2" fontWeight={700} sx={{ fontSize: '0.82rem' }}>{marker.name}</Typography>
                      {getTrendIcon(marker.trend)}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.65rem' }}>Baseline</Typography>
                        <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.82rem' }}>{marker.baseline} {marker.unit}</Typography>
                      </Box>
                      <ArrowForwardIcon sx={{ fontSize: 14, color: 'text.disabled', mt: 1.5 }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.65rem' }}>Current</Typography>
                        <Typography variant="body2" fontWeight={700} color={isNormal ? 'success.main' : 'warning.main'} sx={{ fontSize: '0.82rem' }}>
                          {marker.current} {marker.unit}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color={Number(percentChange) < 0 ? 'success.main' : 'error.main'} fontWeight={600} sx={{ fontSize: '0.72rem' }}>
                        {Number(percentChange) > 0 ? '+' : ''}{percentChange}%
                      </Typography>
                      {marker.normal && (
                        <Chip
                          label={isNormal ? 'Normal' : 'Above Normal'}
                          size="small"
                          color={isNormal ? 'success' : 'warning'}
                          variant="outlined"
                          sx={{ height: 18, fontSize: '0.6rem', fontWeight: 600 }}
                        />
                      )}
                    </Box>
                    {marker.normal && (
                      <Box sx={{ mt: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min((marker.current / marker.normal.max) * 100, 100)}
                          sx={{
                            height: 4,
                            borderRadius: 2,
                            bgcolor: 'grey.100',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: isNormal ? 'success.main' : 'warning.main',
                              borderRadius: 2,
                            },
                          }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.25 }}>
                          <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.6rem' }}>{marker.normal.min}</Typography>
                          <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.6rem' }}>{marker.normal.max} {marker.unit}</Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Stack>
          </Box>

          {/* Toxicity Summary */}
          <Box sx={{ ...cardSx, bgcolor: alpha('#ed6c02', 0.02) }}>
            <SectionLabel label="Cumulative Toxicity" color="warning.dark" />
            <Typography variant="body2" sx={{ mb: 1.25, lineHeight: 1.6, fontSize: '0.82rem' }}>
              {latestAssessment.toxicitySummary}
            </Typography>
            <Divider sx={{ my: 1.25 }} />
            <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ mb: 0.75, display: 'block', fontSize: '0.65rem' }}>
              RESIDUAL TOXICITIES
            </Typography>
            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
              {latestAssessment.cumulativeToxicity.map((tox, i) => (
                <Chip
                  key={i}
                  label={tox}
                  size="small"
                  variant="outlined"
                  color={tox.toLowerCase().includes('resolved') ? 'success' : 'warning'}
                  sx={{ fontSize: '0.7rem', fontWeight: 500, height: 22 }}
                />
              ))}
            </Stack>
          </Box>
        </Box>

        {/* ═══════ ROW 3: Treatment Completed + Clinical Decision Actions ═══════ */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'auto 1fr' },
            gap: 2,
            mb: 2,
          }}
        >
          {/* Treatment Stats */}
          <Box sx={cardSx}>
            <SectionLabel label="Treatment Completed" />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 1.25 }}>
              {[
                { label: 'Protocol', value: patient.currentProtocol?.name || 'N/A' },
                { label: 'Cycles Given', value: patient.currentProtocol?.totalExposure || 'N/A' },
                { label: 'Duration', value: patient.currentProtocol?.timeOnTherapy || 'N/A' },
                { label: 'Dose Interruptions', value: patient.currentProtocol?.doseInterruptions || 'None' },
              ].map((item, i) => (
                <Box key={i} sx={{ p: 1.25, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.65rem' }}>{item.label}</Typography>
                  <Typography variant="body2" fontWeight={600} sx={{ mt: 0.25, fontSize: '0.82rem' }}>{item.value}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Decision Actions */}
          <Box sx={cardSx}>
            <Typography variant="overline" sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.7rem', letterSpacing: 1, mb: 1.25, display: 'block' }}>
              Clinical Decision Actions
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'nowrap', overflowX: 'auto' }}>
              <Button
                variant="contained"
                color="success"
                size="small"
                sx={{ fontWeight: 600, py: 1, px: 1.5, textTransform: 'none', borderRadius: 1.5, fontSize: '0.78rem', whiteSpace: 'nowrap' }}
                startIcon={<VisibilityIcon sx={{ fontSize: 16 }} />}
                onClick={() => handleTransitionRequest('Observation', 'Complete/Partial Response — moving to surveillance protocol for ongoing monitoring.', 'success')}
              >
                Surveillance
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ fontWeight: 600, py: 1, px: 1.5, textTransform: 'none', borderRadius: 1.5, fontSize: '0.78rem', whiteSpace: 'nowrap' }}
                startIcon={<VerifiedUserIcon sx={{ fontSize: 16 }} />}
                onClick={() => handleTransitionRequest('Maintenance', 'Stable disease / partial response — starting maintenance therapy.', 'default')}
              >
                Maintenance
              </Button>
              <Button
                variant="outlined"
                color="warning"
                size="small"
                sx={{ fontWeight: 600, py: 1, px: 1.5, textTransform: 'none', borderRadius: 1.5, fontSize: '0.78rem', whiteSpace: 'nowrap' }}
                startIcon={<EditIcon sx={{ fontSize: 14 }} />}
                onClick={() => handleTransitionRequest('Treatment Planning', 'Change in treatment plan required — returning to planning.', 'warning')}
              >
                Change Plan
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                sx={{ fontWeight: 600, py: 1, px: 1.5, textTransform: 'none', borderRadius: 1.5, fontSize: '0.78rem', whiteSpace: 'nowrap' }}
                startIcon={<SpaIcon sx={{ fontSize: 14 }} />}
                onClick={() => handleTransitionRequest('Palliative', 'Patient unfit for further curative treatment — transitioning to palliative care.', 'warning')}
              >
                Palliative
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                sx={{ fontWeight: 600, py: 1, px: 1.5, textTransform: 'none', borderRadius: 1.5, fontSize: '0.78rem', whiteSpace: 'nowrap' }}
              >
                MDT Review
              </Button>
            </Box>
          </Box>
        </Box>
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
