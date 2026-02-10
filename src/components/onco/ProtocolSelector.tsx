import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Grid,
  Stack,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Alert,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScienceIcon from '@mui/icons-material/Science';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';

export interface ProtocolOption {
  id: string;
  name: string;
  description: string;
  intent: string;
  evidence: string;
  toxicity: 'Low' | 'Low–Moderate' | 'Moderate' | 'Moderate–High' | 'High';
  recommended?: boolean;
  drugs: string[];
  cycles: string;
  frequency: string;
  notes?: string;
}

interface ProtocolSelectorProps {
  protocols: ProtocolOption[];
  selectedProtocolId?: string;
  onSelect: (protocol: ProtocolOption) => void;
  cancerSite: string;
  stage?: string;
}

const getToxicityColor = (level: string) => {
  if (level.includes('Low')) return 'success';
  if (level.includes('Moderate')) return 'warning';
  return 'error';
};

export default function ProtocolSelector({
  protocols,
  selectedProtocolId,
  onSelect,
  cancerSite,
  stage,
}: ProtocolSelectorProps) {
  const [selected, setSelected] = useState<string>(selectedProtocolId || '');

  const handleSelect = (protocolId: string) => {
    setSelected(protocolId);
    const protocol = protocols.find((p) => p.id === protocolId);
    if (protocol) onSelect(protocol);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <ScienceIcon sx={{ color: 'primary.main', fontSize: 20 }} />
        <Typography
          variant="overline"
          sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2 }}
        >
          Protocol Selection
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
        <Typography variant="body2">
          Showing recommended protocols for <strong>{cancerSite}</strong>
          {stage ? ` — Stage ${stage}` : ''}. Select a protocol to proceed.
        </Typography>
      </Alert>

      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          value={selected}
          onChange={(e) => handleSelect(e.target.value)}
        >
          <Grid container spacing={2}>
            {protocols.map((protocol) => {
              const isSelected = selected === protocol.id;
              return (
                <Grid item xs={12} key={protocol.id}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 0,
                      borderRadius: 2,
                      border: isSelected ? '2px solid' : '1px solid',
                      borderColor: isSelected ? 'primary.main' : 'divider',
                      bgcolor: isSelected
                        ? (theme) => alpha(theme.palette.primary.main, 0.04)
                        : 'white',
                      transition: 'all 0.2s',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      '&:hover': {
                        borderColor: isSelected ? 'primary.main' : 'primary.light',
                        bgcolor: isSelected
                          ? (theme) => alpha(theme.palette.primary.main, 0.06)
                          : 'grey.50',
                      },
                    }}
                    onClick={() => handleSelect(protocol.id)}
                  >
                    {/* Top bar if recommended */}
                    {protocol.recommended && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          px: 2,
                          py: 0.5,
                          bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
                          borderBottom: '1px solid',
                          borderColor: (theme) => alpha(theme.palette.success.main, 0.2),
                        }}
                      >
                        <StarIcon sx={{ fontSize: 14, color: 'success.main' }} />
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: 700, color: 'success.dark', fontSize: '0.65rem', letterSpacing: 0.5 }}
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

                          <Stack direction="row" spacing={1} sx={{ mb: 1.5, flexWrap: 'wrap' }} useFlexGap>
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
                              <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">
                                Drugs
                              </Typography>
                              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                {protocol.drugs.join(', ')}
                              </Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">
                                Cycles
                              </Typography>
                              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                {protocol.cycles}
                              </Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">
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

      {selected && (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Chip
            icon={<CheckCircleIcon />}
            label={`Selected: ${protocols.find((p) => p.id === selected)?.name}`}
            color="primary"
            sx={{ fontWeight: 600, px: 1 }}
          />
        </Box>
      )}
    </Box>
  );
}
