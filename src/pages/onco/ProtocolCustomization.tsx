import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Chip,
  Button,
  Stack,
  Divider,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Fab,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TuneIcon from '@mui/icons-material/Tune';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MicIcon from '@mui/icons-material/Mic';
import HomeIcon from '@mui/icons-material/Home';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useState } from 'react';
import { OncologyPatient } from '../../types/oncology';
import PatientContextBar from '../../components/onco/PatientContextBar';
import StageTransitionDialog from '../../components/onco/StageTransitionDialog';
import { ProtocolCatalogEntry } from '../../data/oncologyMockData';

interface DrugRow {
  name: string;
  dose: string;
  day: string;
}

interface ProtocolCustomizationProps {
  patient: OncologyPatient;
  protocol: ProtocolCatalogEntry;
  hideContextBar?: boolean;
  onBack?: () => void;
  onActivate?: () => void;
}

export default function ProtocolCustomization({
  patient,
  protocol,
  hideContextBar,
  onBack,
  onActivate,
}: ProtocolCustomizationProps) {
  // Editable state derived from protocol
  const [cycleCount, setCycleCount] = useState(protocol.cycles);
  const [frequency, setFrequency] = useState(protocol.frequency);
  const [drugs, setDrugs] = useState<DrugRow[]>(
    protocol.drugs.map((d) => {
      // Parse dose strings like "Oxaliplatin 85 mg/m²" → name + dose
      const match = d.match(/^(.+?)\s+(\d[\d./mgkAUC² ]*\S*)$/);
      return {
        name: match ? match[1] : d,
        dose: match ? match[2] : '—',
        day: 'D1',
      };
    })
  );
  const [supportMeds, setSupportMeds] = useState('Ondansetron 8 mg IV, Dexamethasone 12 mg IV');
  const [showActivateDialog, setShowActivateDialog] = useState(false);
  const [activated, setActivated] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleDrugDoseChange = (index: number, newDose: string) => {
    setDrugs((prev) => prev.map((d, i) => (i === index ? { ...d, dose: newDose } : d)));
  };

  const handleConfirmActivation = () => {
    setShowActivateDialog(false);
    setActivated(true);
    setShowSnackbar(true);
    onActivate?.();
  };

  return (
    <Box sx={{ pb: 10 }}>
      {!hideContextBar && <PatientContextBar patient={patient} />}

      <Container maxWidth="lg" sx={{ mt: 4, mb: 5 }}>
        {/* Back arrow */}
        <IconButton
          onClick={onBack}
          size="small"
          sx={{ mb: 2, ml: -1, color: 'text.secondary' }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>

        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <TuneIcon sx={{ color: 'primary.main', fontSize: 22 }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Protocol Customization
          </Typography>
          <Chip
            label={protocol.name}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ ml: 1, fontWeight: 600 }}
          />
        </Box>

        <Grid container spacing={3}>
          {/* ── Card 1: Drug Doses ── */}
          <Grid item xs={12} md={7}>
            <Typography
              variant="overline"
              sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.8rem', letterSpacing: 1.2, mb: 1, display: 'block' }}
            >
              Drug Doses
            </Typography>
            <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem' }}>
                      Drug
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', width: '35%' }}>
                      Dose
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', width: '15%' }}>
                      Day
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {drugs.map((drug, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {drug.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={drug.dose}
                          onChange={(e) => handleDrugDoseChange(idx, e.target.value)}
                          variant="outlined"
                          disabled={activated}
                          sx={{
                            '& .MuiOutlinedInput-root': { fontSize: '0.85rem' },
                            '& .MuiOutlinedInput-input': { py: 0.75, px: 1 },
                          }}
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{drug.day}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>

          {/* ── Card 2: Cycle & Frequency ── */}
          <Grid item xs={12} md={5}>
            <Typography
              variant="overline"
              sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.8rem', letterSpacing: 1.2, mb: 1, display: 'block' }}
            >
              Schedule
            </Typography>
            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
              <Stack spacing={2}>
                <TextField
                  label="Cycle Count"
                  size="small"
                  value={cycleCount}
                  onChange={(e) => setCycleCount(e.target.value)}
                  disabled={activated}
                  fullWidth
                />
                <TextField
                  label="Cycle Frequency"
                  size="small"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  disabled={activated}
                  fullWidth
                />
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={600}
                sx={{ mb: 0.5, display: 'block' }}
              >
                Protocol Info
              </Typography>
              <Stack spacing={0.5}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Intent
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {protocol.intent}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Evidence
                  </Typography>
                  <Chip
                    label={protocol.evidence}
                    size="small"
                    variant="outlined"
                    color="info"
                    sx={{ height: 20, fontSize: '0.7rem' }}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Toxicity
                  </Typography>
                  <Chip
                    label={protocol.toxicity}
                    size="small"
                    variant="outlined"
                    color={
                      (protocol.toxicity.includes('Low')
                        ? 'success'
                        : protocol.toxicity.includes('Moderate')
                          ? 'warning'
                          : 'error') as any
                    }
                    sx={{ height: 20, fontSize: '0.7rem' }}
                  />
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* ── Card 3: Support Medications ── */}
          <Grid item xs={12}>
            <Typography
              variant="overline"
              sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.8rem', letterSpacing: 1.2, mb: 1, display: 'block' }}
            >
              Support Medications
            </Typography>
            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
              <TextField
                size="small"
                multiline
                minRows={2}
                value={supportMeds}
                onChange={(e) => setSupportMeds(e.target.value)}
                disabled={activated}
                fullWidth
                placeholder="Pre-medications, anti-emetics, growth factors…"
                sx={{
                  '& .MuiOutlinedInput-root': { fontSize: '0.85rem' },
                }}
              />
            </Paper>
          </Grid>
        </Grid>

        {/* Activation confirmation */}
        {activated && (
          <Alert
            severity="success"
            icon={<CheckCircleIcon />}
            sx={{ mt: 3, borderRadius: 2, fontWeight: 600 }}
          >
            Protocol activated — Patient moved to Active Treatment.
          </Alert>
        )}
      </Container>

      {/* ─── Sticky Bottom Bar ─── */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
          py: 0.75,
          px: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
        <Button
          variant="text"
          startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
          onClick={onBack}
          sx={{ textTransform: 'none', fontWeight: 600, fontSize: '0.85rem' }}
        >
          Back to Protocol List
        </Button>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Fab
            size="small"
            sx={{
              bgcolor: 'white',
              border: '2px solid',
              borderColor: 'primary.main',
              color: 'primary.main',
              width: 36,
              height: 36,
              minHeight: 36,
              '&:hover': { bgcolor: 'grey.50' },
            }}
          >
            <MicIcon sx={{ fontSize: '1rem' }} />
          </Fab>

          {!activated && (
            <Button
              variant="contained"
              startIcon={<PlayArrowIcon sx={{ fontSize: 16 }} />}
              onClick={() => setShowActivateDialog(true)}
              sx={{
                px: 2.5,
                py: 0.75,
                fontWeight: 600,
                borderRadius: 1.5,
                textTransform: 'none',
                fontSize: '0.85rem',
                bgcolor: 'success.main',
                '&:hover': { bgcolor: 'success.dark' },
              }}
            >
              Activate Protocol
            </Button>
          )}

          {activated && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={
                <Box component="span" sx={{ fontSize: '0.9rem' }}>
                  ✓
                </Box>
              }
              sx={{
                px: 2,
                py: 0.5,
                fontWeight: 600,
                borderRadius: 1.5,
                textTransform: 'none',
                fontSize: '0.8rem',
              }}
            >
              Finish and Next Patient
            </Button>
          )}

          <Fab color="primary" size="small" sx={{ width: 36, height: 36, minHeight: 36 }}>
            <HomeIcon sx={{ fontSize: '1rem' }} />
          </Fab>
        </Box>
      </Box>

      {/* Stage Transition Dialog */}
      <StageTransitionDialog
        open={showActivateDialog}
        onClose={() => setShowActivateDialog(false)}
        onConfirm={handleConfirmActivation}
        currentStage={patient.oncoStatus}
        targetStage="Induction"
        patientName={patient.name}
        details={`Protocol: ${protocol.name}. ${cycleCount}, ${frequency}. This will activate the protocol and move the patient to Active Treatment.`}
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
