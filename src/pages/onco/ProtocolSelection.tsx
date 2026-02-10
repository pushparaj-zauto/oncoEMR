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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Alert,
  Fab,
  IconButton,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScienceIcon from '@mui/icons-material/Science';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MicIcon from '@mui/icons-material/Mic';
import HomeIcon from '@mui/icons-material/Home';
import ActionFooter from '../../components/onco/ActionFooter';
import { useState } from 'react';
import { OncologyPatient } from '../../types/oncology';
import PatientContextBar from '../../components/onco/PatientContextBar';
import { ProtocolCatalogEntry, getProtocolsForCancerSite } from '../../data/oncologyMockData';

const getToxicityColor = (level: string) => {
  if (level.includes('Low')) return 'success';
  if (level.includes('Moderate')) return 'warning';
  return 'error';
};

interface ProtocolSelectionProps {
  patient: OncologyPatient;
  hideContextBar?: boolean;
  onBack?: () => void;
  onContinue?: (protocol: ProtocolCatalogEntry) => void;
}

export default function ProtocolSelection({
  patient,
  hideContextBar,
  onBack,
  onContinue,
}: ProtocolSelectionProps) {
  const protocols = getProtocolsForCancerSite(patient.cancerSite);
  const defaultProtocol = protocols.find((p) => p.recommended)?.id || '';
  const [selectedId, setSelectedId] = useState<string>(defaultProtocol);

  const selectedProtocol = protocols.find((p) => p.id === selectedId);

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
          <ScienceIcon sx={{ color: 'primary.main', fontSize: 22 }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Protocol Selection
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
          <Typography variant="body2">
            Showing recommended protocols for <strong>{patient.cancerSite}</strong>
            {patient.stage ? ` — Stage ${patient.stage}` : ''}. Select a protocol then proceed to
            customise.
          </Typography>
        </Alert>

        {/* Protocol List — one card per protocol */}
        <FormControl component="fieldset" fullWidth>
          <RadioGroup value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
            <Grid container spacing={2}>
              {protocols.map((protocol) => {
                const isSelected = selectedId === protocol.id;
                return (
                  <Grid item xs={12} key={protocol.id}>
                    <Paper
                      variant="outlined"
                      sx={{
                        overflow: 'hidden',
                        borderRadius: 2,
                        border: isSelected ? '2px solid' : '1px solid',
                        borderColor: isSelected ? 'primary.main' : 'divider',
                        bgcolor: isSelected
                          ? (theme) => alpha(theme.palette.primary.main, 0.03)
                          : 'white',
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                        '&:hover': {
                          borderColor: isSelected ? 'primary.main' : 'primary.light',
                          bgcolor: isSelected
                            ? (theme) => alpha(theme.palette.primary.main, 0.05)
                            : 'grey.50',
                        },
                      }}
                      onClick={() => setSelectedId(protocol.id)}
                    >
                      {/* Recommended badge */}
                      {protocol.recommended && (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            px: 2,
                            py: 0.5,
                            bgcolor: (theme) => alpha(theme.palette.success.main, 0.08),
                            borderBottom: '1px solid',
                            borderColor: (theme) => alpha(theme.palette.success.main, 0.15),
                          }}
                        >
                          <StarIcon sx={{ fontSize: 14, color: 'success.main' }} />
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 700,
                              color: 'success.dark',
                              fontSize: '0.65rem',
                              letterSpacing: 0.5,
                            }}
                          >
                            RECOMMENDED
                          </Typography>
                        </Box>
                      )}

                      <Box sx={{ p: 2.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                          <FormControlLabel
                            value={protocol.id}
                            control={<Radio size="small" sx={{ p: 0.5 }} />}
                            label=""
                            sx={{ m: 0, mr: 0 }}
                          />
                          <Box sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                {protocol.name}
                              </Typography>
                              {isSelected && (
                                <CheckCircleIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                              )}
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                              {protocol.description}
                            </Typography>

                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{ mb: 1.5, flexWrap: 'wrap' }}
                              useFlexGap
                            >
                              <Chip
                                label={`Intent: ${protocol.intent}`}
                                size="small"
                                variant="outlined"
                                sx={{ height: 24, fontSize: '0.7rem', fontWeight: 600 }}
                              />
                              <Chip
                                label={`Evidence: ${protocol.evidence}`}
                                size="small"
                                variant="outlined"
                                color="info"
                                sx={{ height: 24, fontSize: '0.7rem', fontWeight: 600 }}
                              />
                              <Chip
                                label={`Toxicity: ${protocol.toxicity}`}
                                size="small"
                                variant="outlined"
                                color={getToxicityColor(protocol.toxicity) as any}
                                sx={{ height: 24, fontSize: '0.7rem', fontWeight: 600 }}
                              />
                            </Stack>

                            <Divider sx={{ my: 1.5 }} />

                            <Grid container spacing={2}>
                              <Grid item xs={4}>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  fontWeight={600}
                                  display="block"
                                >
                                  Drugs
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                  {protocol.drugs.join(', ')}
                                </Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  fontWeight={600}
                                  display="block"
                                >
                                  Cycles
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                  {protocol.cycles}
                                </Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  fontWeight={600}
                                  display="block"
                                >
                                  Frequency
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                  {protocol.frequency}
                                </Typography>
                              </Grid>
                            </Grid>

                            {protocol.notes && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ mt: 1, display: 'block', fontStyle: 'italic' }}
                              >
                                {protocol.notes}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </RadioGroup>
        </FormControl>
      </Container>

      <ActionFooter
        primaryLabel="Customize & Activate"
        primaryDisabled={!selectedProtocol}
        onPrimaryClick={() => selectedProtocol && onContinue?.(selectedProtocol)}
        primaryStartIcon={null}
        primaryEndIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
      />
    </Box>
  );
}
