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
  Button,
  Divider,
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

/* ── Small mic button reused across sections ── */
const MicButton = () => (
  <IconButton
    size="small"
    sx={{
      ml: 1.5,
      border: '1px solid',
      borderColor: 'grey.300',
      borderRadius: 1,
      p: 0.5,
      color: 'grey.500',
      transition: 'all 0.2s',
      '&:hover': {
        bgcolor: 'grey.100',
        borderColor: 'grey.400',
      },
    }}
  >
    <MicIcon sx={{ fontSize: 16 }} />
  </IconButton>
);

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

      <Container maxWidth="xl" sx={{ mt: 3, mb: 5 }}>
        <Grid container spacing={3}>
          {/* ═══════ Left column ═══════ */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {/* ── Card 1: Diagnosis & Intent ── */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography
                    variant="overline"
                    sx={{
                      fontWeight: 700,
                      color: 'text.secondary',
                      fontSize: '0.78rem',
                      letterSpacing: 1.2,
                    }}
                  >
                    Diagnosis & Intent
                  </Typography>
                  <MicButton />
                </Box>
                <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{ width: '42%', borderBottom: 'none', pl: 0, py: 0.75 }}
                        >
                          <Typography variant="body2" color="text.secondary" fontWeight={500}>
                            Histopathology
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none', py: 0.75 }}>
                          <Typography variant="body2">{patient.histology}</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0, py: 0.75 }}>
                          <Typography variant="body2" color="text.secondary" fontWeight={500}>
                            Tumor Subtype
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none', py: 0.75 }}>
                          <Typography variant="body2">
                            {patient.cancerSite === 'Breast'
                              ? 'ER+, PR+, HER2−'
                              : patient.cancerSite === 'Lung'
                                ? patient.histology?.includes('EGFR')
                                  ? patient.histology.match(/\(([^)]+)\)/)?.[1] ||
                                    'EGFR Mutant'
                                  : 'EGFR Wild Type'
                                : patient.cancerSite === 'Colon'
                                  ? 'MSS, RAS Wild-type'
                                  : 'Standard'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0, py: 0.75 }}>
                          <Typography variant="body2" color="text.secondary" fontWeight={500}>
                            Stage
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none', py: 0.75 }}>
                          <Stack direction="row" spacing={1}>
                            <Chip
                              label={patient.tnmStage || 'Pending'}
                              size="small"
                              variant="outlined"
                            />
                            <Chip
                              label={`Stage ${patient.stage}`}
                              size="small"
                              variant="outlined"
                            />
                          </Stack>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Divider sx={{ my: 1.5 }} />

                  {/* ── Segmented treatment intent ── */}
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                    sx={{ mb: 1, display: 'block' }}
                  >
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
                        fontSize: '0.8rem',
                        py: 0.75,
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
                </Paper>
              </Grid>

              {/* ── Card 2: Patient Fitness ── */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography
                    variant="overline"
                    sx={{
                      fontWeight: 700,
                      color: 'text.secondary',
                      fontSize: '0.78rem',
                      letterSpacing: 1.2,
                    }}
                  >
                    Patient Fitness
                  </Typography>
                  <MicButton />
                </Box>
                <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0, py: 0.75 }}>
                          <Typography variant="body2" color="text.secondary" fontWeight={500}>
                            ECOG
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none', py: 0.75 }}>
                          <Chip
                            label={patient.ecogStatus}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0, py: 0.75 }}>
                          <Typography variant="body2" color="text.secondary" fontWeight={500}>
                            Comorbidities
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none', py: 0.75 }}>
                          <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap' }}>
                            {patient.comorbidities?.diabetes && (
                              <Chip
                                label="Diabetes"
                                size="small"
                                variant="outlined"
                                sx={{ height: 22 }}
                              />
                            )}
                            {patient.comorbidities?.cardiacDisease && (
                              <Chip
                                label="Cardiac"
                                size="small"
                                variant="outlined"
                                sx={{ height: 22 }}
                              />
                            )}
                            {patient.comorbidities?.renalDisease && (
                              <Chip
                                label="Renal"
                                size="small"
                                variant="outlined"
                                sx={{ height: 22 }}
                              />
                            )}
                            {!patient.comorbidities?.diabetes &&
                              !patient.comorbidities?.cardiacDisease &&
                              !patient.comorbidities?.renalDisease && (
                                <Typography variant="body2" color="success.main">
                                  None
                                </Typography>
                              )}
                          </Stack>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0, py: 0.75 }}>
                          <Typography variant="body2" color="text.secondary" fontWeight={500}>
                            Organ Function
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none', py: 0.75 }}>
                          <Chip
                            label="Normal"
                            size="small"
                            color="success"
                            variant="outlined"
                            sx={{ height: 22 }}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Divider sx={{ my: 1.5 }} />

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                    sx={{ mb: 0.5, display: 'block' }}
                  >
                    Baseline Readiness
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }} useFlexGap>
                    {['Labs', 'Imaging', 'Consent'].map((label) => (
                      <Chip
                        key={label}
                        label={label}
                        size="small"
                        color="success"
                        icon={<CheckCircleIcon />}
                        variant="outlined"
                        sx={{ height: 22, '& .MuiChip-icon': { fontSize: 14 } }}
                      />
                    ))}
                    {patient.age < 50 && patient.gender === 'Female' && (
                      <Chip
                        label="Fertility"
                        size="small"
                        color="success"
                        icon={<CheckCircleIcon />}
                        variant="outlined"
                        sx={{ height: 22, '& .MuiChip-icon': { fontSize: 14 } }}
                      />
                    )}
                  </Stack>
                </Paper>
              </Grid>

              {/* ── Card 3: Treatment Strategy ── */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography
                    variant="overline"
                    sx={{
                      fontWeight: 700,
                      color: 'text.secondary',
                      fontSize: '0.78rem',
                      letterSpacing: 1.2,
                    }}
                  >
                    Treatment Strategy
                  </Typography>
                  <MicButton />
                </Box>
                <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
                  {patient.treatmentStrategy && (
                    <>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight={600}
                        sx={{ mb: 0.75, display: 'block' }}
                      >
                        Planned Modalities
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        {patient.treatmentStrategy.surgery && (
                          <Chip label="Surgery" size="small" variant="outlined" />
                        )}
                        {patient.treatmentStrategy.systemicTherapy && (
                          <Chip label="Chemotherapy" size="small" variant="outlined" />
                        )}
                        {patient.treatmentStrategy.radiation && (
                          <Chip label="Radiation" size="small" variant="outlined" />
                        )}
                      </Stack>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight={600}
                        sx={{ mb: 0.75, display: 'block' }}
                      >
                        Sequence
                      </Typography>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 1.5,
                          bgcolor: 'grey.50',
                          border: '1px dashed',
                          borderColor: 'grey.300',
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 500, textAlign: 'center' }}
                        >
                          {patient.treatmentStrategy.sequence}
                        </Typography>
                      </Paper>
                    </>
                  )}

                  <Divider sx={{ my: 1.5 }} />

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                    sx={{ mb: 0.5, display: 'block' }}
                  >
                    Risk Flags
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ flexWrap: 'wrap' }}
                    useFlexGap
                  >
                    <Chip
                      label="Myelosuppression"
                      size="small"
                      color="warning"
                      variant="outlined"
                      sx={{ height: 22 }}
                    />
                    <Chip
                      label="Neuropathy"
                      size="small"
                      color="warning"
                      variant="outlined"
                      sx={{ height: 22 }}
                    />
                    {patient.comorbidities?.cardiacDisease && (
                      <Chip
                        label="Cardiotoxicity"
                        size="small"
                        color="error"
                        variant="outlined"
                        sx={{ height: 22 }}
                      />
                    )}
                  </Stack>
                </Paper>
              </Grid>

              {/* ── Card 4: Selected Protocol (merged protocol + plan status) ── */}
              {patient.treatmentStrategy?.systemicTherapy && (
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography
                      variant="overline"
                      sx={{
                        fontWeight: 700,
                        color: 'text.secondary',
                        fontSize: '0.78rem',
                        letterSpacing: 1.2,
                      }}
                    >
                      Selected Protocol
                    </Typography>
                  </Box>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2.5,
                      borderRadius: 2,
                      borderColor: planActivated ? 'success.main' : hasProtocol ? 'primary.main' : 'divider',
                      borderWidth: planActivated || hasProtocol ? 1.5 : 1,
                    }}
                  >
                    {/* Regimen name — large */}
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{ mb: 0.5, lineHeight: 1.2 }}
                    >
                      {protocolName}
                    </Typography>

                    {/* Meta row */}
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ mb: 2, flexWrap: 'wrap' }}
                      useFlexGap
                    >
                      <Chip
                        label={protocolIntent}
                        size="small"
                        variant="outlined"
                        sx={{ height: 22, fontSize: '0.7rem', fontWeight: 600 }}
                      />
                      <Chip
                        label={protocolCycles}
                        size="small"
                        variant="outlined"
                        sx={{ height: 22, fontSize: '0.7rem', fontWeight: 600 }}
                      />
                      <Chip
                        label={protocolFrequency}
                        size="small"
                        variant="outlined"
                        sx={{ height: 22, fontSize: '0.7rem', fontWeight: 600 }}
                      />
                    </Stack>

                    {/* Status badge */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 1,
                      }}
                    >
                      <Chip
                        label={statusLabel}
                        size="small"
                        color={statusColor}
                        icon={planActivated ? <CheckCircleIcon /> : undefined}
                        sx={{ fontWeight: 600 }}
                      />

                      {/* Actions */}
                      {!planActivated && (
                        <Button
                          size="small"
                          startIcon={<EditIcon sx={{ fontSize: 14 }} />}
                          onClick={onNavigateToProtocolSelection}
                          sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.78rem',
                            color: 'text.secondary',
                          }}
                        >
                          Change Protocol
                        </Button>
                      )}
                    </Box>

                    {/* CTA inside card */}
                    <Box sx={{ mt: 2 }}>
                      {!hasProtocol && !planActivated && (
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                          onClick={onNavigateToProtocolSelection}
                          sx={{
                            fontWeight: 600,
                            textTransform: 'none',
                            fontSize: '0.85rem',
                          }}
                        >
                          Select Protocol
                        </Button>
                      )}

                      {hasProtocol &&
                        !planActivated &&
                        patient.mdtDecision?.status === 'Approved' && (
                          <Button
                            variant="contained"
                            fullWidth
                            startIcon={<PlayArrowIcon />}
                            onClick={handleActivatePlan}
                            sx={{
                              fontWeight: 600,
                              textTransform: 'none',
                              fontSize: '0.85rem',
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
                          fullWidth
                          endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                          onClick={onStartCycle}
                          sx={{
                            fontWeight: 600,
                            textTransform: 'none',
                            fontSize: '0.85rem',
                          }}
                        >
                          Start Cycle 1
                        </Button>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Grid>

          {/* ═══════ Right column — MDT Decision (compact) ═══════ */}
          <Grid item xs={12} md={4}>
            {patient.mdtDecision && (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography
                    variant="overline"
                    sx={{
                      fontWeight: 700,
                      color: 'text.secondary',
                      fontSize: '0.78rem',
                      letterSpacing: 1.2,
                    }}
                  >
                    MDT Decision
                  </Typography>
                </Box>
                <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, mb: 3 }}>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0, width: '35%' }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            fontWeight={500}
                          >
                            Status
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                          <Chip
                            label={patient.mdtDecision.status}
                            size="small"
                            color={
                              patient.mdtDecision.status === 'Approved'
                                ? 'success'
                                : 'warning'
                            }
                            icon={
                              patient.mdtDecision.status === 'Approved'
                                ? <CheckCircleIcon />
                                : undefined
                            }
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ borderBottom: 'none', pl: 0 }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            fontWeight={500}
                          >
                            Date
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                          <Typography variant="body2">
                            {patient.mdtDecision.date}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            verticalAlign: 'top',
                            borderBottom: 'none',
                            pl: 0,
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            fontWeight={500}
                          >
                            Summary
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                          <Typography variant="body2">
                            {patient.mdtDecision.summary}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      {patient.mdtDecision.participants && (
                        <TableRow>
                          <TableCell
                            sx={{
                              verticalAlign: 'top',
                              borderBottom: 'none',
                              pl: 0,
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              fontWeight={500}
                            >
                              Panel
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ borderBottom: 'none' }}>
                            <Typography variant="body2">
                              {patient.mdtDecision.participants.join(', ')}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Paper>
              </>
            )}
          </Grid>
        </Grid>
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
