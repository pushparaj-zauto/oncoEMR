import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  Stack,
  IconButton,
  Snackbar,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import MicIcon from '@mui/icons-material/Mic';
import ActionFooter from '../../components/onco/ActionFooter';
import { useState } from 'react';
import { OncologyPatient } from '../../types/oncology';
import PatientContextBar from '../../components/onco/PatientContextBar';
import { ProtocolOption } from '../../components/onco/ProtocolSelector';
import StageTransitionDialog from '../../components/onco/StageTransitionDialog';
import { getProtocolsForCancerSite } from '../../data/oncologyMockData';
import { alpha } from '@mui/material/styles';

export interface TreatmentPlanningProps {
  patient: OncologyPatient;
  hideContextBar?: boolean;
  onActivatePlan?: () => void;
  onSelectProtocol?: (protocol: ProtocolOption) => void;
  onNavigateToProtocolSelection?: () => void;
  onBack?: () => void;
  onStartCycle?: () => void;
}

/* ── Tiny icon buttons for mic / edit (matching DiagnosticEvaluation) ── */
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
const SectionLabel = ({ label, showActions = true }: { label: string; showActions?: boolean }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
    <Typography
      variant="overline"
      sx={{
        fontWeight: 700,
        color: 'primary.main',
        fontSize: '0.75rem',
        letterSpacing: 1.5,
        lineHeight: 1,
      }}
    >
      {label}
    </Typography>
    {showActions && (
      <>
        <MicButton />
        <EditButton />
      </>
    )}
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

/* ── Card wrapper matching DiagnosticEvaluation ── */
const cardSx = {
  p: 2,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
};

export default function TreatmentPlanning({
  patient,
  hideContextBar,
  onActivatePlan,
  onSelectProtocol: _onSelectProtocol,
  onNavigateToProtocolSelection,
  onBack,
  onStartCycle,
}: TreatmentPlanningProps) {
  const [intent, setIntent] = useState(patient.treatmentIntent || '');
  const [showActivateDialog, setShowActivateDialog] = useState(false);
  const [selectedProtocol] = useState<ProtocolOption | null>(null);
  const [planActivated, setPlanActivated] = useState(
    patient.oncoStatus === 'Induction' ||
      patient.oncoStatus === 'Consolidation' ||
      patient.oncoStatus === 'Maintenance' ||
      patient.oncoStatus === 'Response Assessment' ||
      patient.oncoStatus === 'Observation'
  );
  const [showSnackbar, setShowSnackbar] = useState(false);

  const availableProtocols = getProtocolsForCancerSite(patient.cancerSite);
  const recommendedProtocol =
    availableProtocols.find((p) => p.recommended) || availableProtocols[0];

  const hasProtocol = !!(
    selectedProtocol ||
    patient.currentProtocol ||
    recommendedProtocol
  );

  /* derived display values */
  const protocolName =
    selectedProtocol?.name ||
    patient.currentProtocol?.name ||
    recommendedProtocol?.name ||
    'Standard Protocol';
  const protocolCycles =
    selectedProtocol?.cycles ||
    `${patient.currentProtocol?.cycles || recommendedProtocol?.cycles || 6} cycles`;
  const protocolFrequency =
    selectedProtocol?.frequency ||
    (recommendedProtocol?.frequency
      ? recommendedProtocol.frequency
      : `Every ${patient.currentProtocol?.cycleFrequency || 21} days`);
  const protocolIntent =
    selectedProtocol?.intent || recommendedProtocol?.intent || intent || '—';

  /* handlers */
  const handleActivatePlan = () => setShowActivateDialog(true);

  const handleConfirmActivation = () => {
    setShowActivateDialog(false);
    setPlanActivated(true);
    setShowSnackbar(true);
    onActivatePlan?.();
  };

  const handleIntentChange = (
    _e: React.MouseEvent<HTMLElement>,
    newIntent: string | null,
  ) => {
    setIntent(newIntent || '');
  };

  /* ── Protocol status helpers ── */
  const statusLabel = planActivated
    ? 'Protocol Active'
    : patient.mdtDecision?.status === 'Approved'
      ? 'Ready to Activate'
      : 'Draft';

  const statusColor = planActivated
    ? 'success'
    : patient.mdtDecision?.status === 'Approved'
      ? 'success'
      : ('default' as const);

  return (
    <Box sx={{ pb: 10 }}>
      {!hideContextBar && <PatientContextBar patient={patient} />}

      <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
        {/* ═══════ ROW 1: Diagnosis | Fitness | MDT Decision ═══════ */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
            gap: 2.5,
            mb: 2.5,
          }}
        >
          {/* ── Card 1: Diagnosis & Intent ── */}
          <Box sx={cardSx}>
            <SectionLabel label="Diagnosis & Intent" />
            <KVRow label="Histopathology" value={patient.histology} />
            <KVRow
              label="Tumor Subtype"
              value={
                patient.cancerSite === 'Breast'
                  ? 'ER+, PR+, HER2−'
                  : patient.cancerSite === 'Lung'
                    ? patient.histology?.includes('EGFR')
                      ? patient.histology.match(/\(([^)]+)\)/)?.[1] || 'EGFR Mutant'
                      : 'EGFR Wild Type'
                    : patient.cancerSite === 'Colon'
                      ? 'MSS, RAS Wild-type'
                      : 'Standard'
              }
            />
            <KVRow
              label="Stage"
              chip={
                <Stack direction="row" spacing={0.5}>
                  <Chip label={patient.tnmStage || 'Pending'} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem' }} />
                  <Chip label={`Stage ${patient.stage}`} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem' }} />
                </Stack>
              }
            />

            <Box sx={{ mt: 1.5 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ mb: 0.75, display: 'block', fontSize: '0.7rem' }}>
                Treatment Intent
              </Typography>
              <ToggleButtonGroup
                value={intent}
                exclusive
                onChange={handleIntentChange}
                size="small"
                fullWidth
                sx={{
                  '& .MuiToggleButton-root': {
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.78rem',
                    py: 0.5,
                    borderColor: 'divider',
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      borderColor: 'primary.main',
                      '&:hover': { bgcolor: 'primary.dark' },
                    },
                  },
                }}
              >
                <ToggleButton value="Curative">Curative</ToggleButton>
                <ToggleButton value="Disease Control">Disease Control</ToggleButton>
                <ToggleButton value="Palliative">Palliative</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>

          {/* ── Card 2: Patient Fitness ── */}
          <Box sx={cardSx}>
            <SectionLabel label="Patient Fitness" />
            <KVRow
              label="ECOG"
              chip={<Chip label={patient.ecogStatus} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem' }} />}
            />
            <KVRow
              label="Comorbidities"
              chip={
                <Stack direction="row" spacing={0.5}>
                  {patient.comorbidities?.diabetes && <Chip label="Diabetes" size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />}
                  {patient.comorbidities?.cardiacDisease && <Chip label="Cardiac" size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />}
                  {patient.comorbidities?.renalDisease && <Chip label="Renal" size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />}
                  {!patient.comorbidities?.diabetes &&
                    !patient.comorbidities?.cardiacDisease &&
                    !patient.comorbidities?.renalDisease && (
                      <Typography variant="body2" color="success.main" sx={{ fontWeight: 500, fontSize: '0.82rem' }}>
                        None
                      </Typography>
                    )}
                </Stack>
              }
            />
            <KVRow
              label="Organ Function"
              chip={<Chip label="Normal" size="small" color="success" variant="outlined" sx={{ height: 20, fontSize: '0.7rem' }} />}
            />

            <Box sx={{ mt: 1.5 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ mb: 0.5, display: 'block', fontSize: '0.7rem' }}>
                Baseline Readiness
              </Typography>
              <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap' }} useFlexGap>
                {['Labs', 'Imaging', 'Consent'].map((label) => (
                  <Chip
                    key={label}
                    label={label}
                    size="small"
                    color="success"
                    icon={<CheckCircleIcon />}
                    variant="outlined"
                    sx={{ height: 22, fontSize: '0.7rem', '& .MuiChip-icon': { fontSize: 13 } }}
                  />
                ))}
                {patient.age < 50 && patient.gender === 'Female' && (
                  <Chip
                    label="Fertility"
                    size="small"
                    color="success"
                    icon={<CheckCircleIcon />}
                    variant="outlined"
                    sx={{ height: 22, fontSize: '0.7rem', '& .MuiChip-icon': { fontSize: 13 } }}
                  />
                )}
              </Stack>
            </Box>
          </Box>

          {/* ── Card 3: MDT Decision ── */}
          <Box sx={cardSx}>
            <SectionLabel label="MDT Decision" showActions={false} />
            {patient.mdtDecision ? (
              <>
                <KVRow
                  label="Status"
                  chip={
                    <Chip
                      label={patient.mdtDecision.status}
                      size="small"
                      color={patient.mdtDecision.status === 'Approved' ? 'success' : 'warning'}
                      icon={patient.mdtDecision.status === 'Approved' ? <CheckCircleIcon /> : undefined}
                      sx={{ height: 20, fontSize: '0.7rem' }}
                    />
                  }
                />
                <KVRow label="Date" value={patient.mdtDecision.date} />
                <Box sx={{ py: 0.6 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, display: 'block', mb: 0.3 }}>
                    Summary
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.82rem', lineHeight: 1.5 }}>
                    {patient.mdtDecision.summary}
                  </Typography>
                </Box>
                {patient.mdtDecision.participants && (
                  <Box sx={{ py: 0.6 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, display: 'block', mb: 0.3 }}>
                      Panel
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.82rem', lineHeight: 1.5 }}>
                      {patient.mdtDecision.participants.join(', ')}
                    </Typography>
                  </Box>
                )}
              </>
            ) : (
              <Typography variant="caption" color="text.secondary" fontStyle="italic" sx={{ mt: 1 }}>
                No MDT decision recorded.
              </Typography>
            )}
          </Box>
        </Box>

        {/* ═══════ ROW 2: Treatment Strategy | Selected Protocol ═══════ */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2.5,
          }}
        >
          {/* ── Card 4: Treatment Strategy ── */}
          <Box sx={cardSx}>
            <SectionLabel label="Treatment Strategy" />
            {patient.treatmentStrategy && (
              <>
                <KVRow
                  label="Modalities"
                  chip={
                    <Stack direction="row" spacing={0.5}>
                      {patient.treatmentStrategy.surgery && <Chip label="Surgery" size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem' }} />}
                      {patient.treatmentStrategy.systemicTherapy && <Chip label="Chemotherapy" size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem' }} />}
                      {patient.treatmentStrategy.radiation && <Chip label="Radiation" size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem' }} />}
                    </Stack>
                  }
                />
                <KVRow label="Sequence" value={patient.treatmentStrategy.sequence} />
              </>
            )}
            <KVRow
              label="Risk Flags"
              chip={
                <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap' }}>
                  <Chip label="Myelosuppression" size="small" color="warning" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
                  <Chip label="Neuropathy" size="small" color="warning" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
                  {patient.comorbidities?.cardiacDisease && (
                    <Chip label="Cardiotoxicity" size="small" color="error" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
                  )}
                </Stack>
              }
            />
          </Box>

          {/* ── Card 5: Selected Protocol ── */}
          {patient.treatmentStrategy?.systemicTherapy && (
            <Box sx={cardSx}>
              <SectionLabel label="Selected Protocol" showActions={false} />

              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.75, fontSize: '1.05rem', lineHeight: 1.3 }}>
                {protocolName}
              </Typography>

              <Stack direction="row" spacing={0.5} sx={{ mb: 1.5, flexWrap: 'wrap' }} useFlexGap>
                <Chip label={protocolIntent} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem', fontWeight: 600 }} />
                <Chip label={protocolCycles} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem', fontWeight: 600 }} />
                <Chip label={protocolFrequency} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem', fontWeight: 600 }} />
              </Stack>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
                <Chip
                  label={statusLabel}
                  size="small"
                  color={statusColor}
                  icon={planActivated ? <CheckCircleIcon /> : undefined}
                  sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                />
                {!planActivated && (
                  <Button
                    size="small"
                    variant="text"
                    startIcon={<EditIcon sx={{ fontSize: 13 }} />}
                    onClick={onNavigateToProtocolSelection}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.72rem',
                      color: 'warning.dark',
                      px: 1,
                      minWidth: 0,
                      '&:hover': { bgcolor: (theme) => alpha(theme.palette.warning.main, 0.08) },
                    }}
                  >
                    Change
                  </Button>
                )}
              </Box>

              {/* CTA */}
              {!hasProtocol && !planActivated && (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  endIcon={<ArrowForwardIcon sx={{ fontSize: 15 }} />}
                  onClick={onNavigateToProtocolSelection}
                  sx={{ fontWeight: 600, textTransform: 'none', fontSize: '0.82rem' }}
                >
                  Select Protocol
                </Button>
              )}

              {hasProtocol && !planActivated && patient.mdtDecision?.status === 'Approved' && (
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<PlayArrowIcon sx={{ fontSize: 16 }} />}
                  onClick={handleActivatePlan}
                  sx={{
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '0.82rem',
                    bgcolor: 'success.main',
                    '&:hover': { bgcolor: 'success.dark' },
                  }}
                >
                  Activate Protocol
                </Button>
              )}

              {planActivated && (
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForwardIcon sx={{ fontSize: 15 }} />}
                  onClick={onStartCycle}
                  sx={{ fontWeight: 600, textTransform: 'none', fontSize: '0.85rem', px: 3, py: 0.75 }}
                >
                  Start Cycle 1
                </Button>
              )}
            </Box>
          )}
        </Box>
      </Container>

      <ActionFooter
        primaryLabel={
          planActivated
            ? 'Start Cycle 1'
            : patient.treatmentStrategy?.systemicTherapy && hasProtocol && !planActivated && patient.mdtDecision?.status === 'Approved'
              ? 'Activate Protocol'
              : patient.treatmentStrategy?.systemicTherapy && !hasProtocol && !planActivated
                ? 'Select Protocol'
                : 'Treatment Planning'
        }
        onPrimaryClick={
          planActivated
            ? onStartCycle
            : patient.treatmentStrategy?.systemicTherapy && hasProtocol && !planActivated && patient.mdtDecision?.status === 'Approved'
              ? handleActivatePlan
              : patient.treatmentStrategy?.systemicTherapy && !hasProtocol && !planActivated
                ? onNavigateToProtocolSelection
                : undefined
        }
        primaryStartIcon={
          patient.treatmentStrategy?.systemicTherapy && hasProtocol && !planActivated && patient.mdtDecision?.status === 'Approved'
            ? <PlayArrowIcon sx={{ fontSize: 16 }} />
            : undefined
        }
        primaryEndIcon={
          !(patient.treatmentStrategy?.systemicTherapy && hasProtocol && !planActivated && patient.mdtDecision?.status === 'Approved')
            ? <ArrowForwardIcon sx={{ fontSize: 16 }} />
            : undefined
        }
        primaryColor={
          patient.treatmentStrategy?.systemicTherapy && hasProtocol && !planActivated && patient.mdtDecision?.status === 'Approved'
            ? 'success'
            : 'primary'
        }
      />

      {/* Stage Transition Dialog */}
      <StageTransitionDialog
        open={showActivateDialog}
        onClose={() => setShowActivateDialog(false)}
        onConfirm={handleConfirmActivation}
        currentStage={patient.oncoStatus}
        targetStage="Induction"
        patientName={patient.name}
        details={`Protocol: ${selectedProtocol?.name || patient.currentProtocol?.name || 'Selected Protocol'}. MDT Decision: ${patient.mdtDecision?.status || 'Pending'}. This will activate the treatment plan and move the patient to Active Treatment.`}
        variant="success"
      />

      {/* Success Snackbar */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setShowSnackbar(false)}
          sx={{ fontWeight: 600 }}
        >
          Protocol Activated — Patient moved to Active Treatment
        </Alert>
      </Snackbar>
    </Box>
  );
}
