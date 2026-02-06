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
  Tabs,
  Tab,
  Button,
  TextField,
  TableHead,
} from '@mui/material';
import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { OncologyPatient } from '../../types/oncology';
import PatientContextBar from '../../components/onco/PatientContextBar';

interface ChemoProtocolWorkspaceProps {
  patient: OncologyPatient;
}

export default function ChemoProtocolWorkspace({ patient }: ChemoProtocolWorkspaceProps) {
  const [selectedCycle, setSelectedCycle] = useState(0);

  if (!patient.currentProtocol) {
    return <Typography sx={{ p: 3 }}>No active protocol</Typography>;
  }

  const currentCycle = selectedCycle + 1;
  const cycleOutcome = patient.cycleOutcomes?.find((c) => c.cycleNumber === currentCycle);

  return (
    <Box sx={{ overflowX: 'hidden', width: '100%' }}>
      {/* Global Patient Context Bar */}
      <PatientContextBar patient={patient} />

      <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
        {/* Protocol Header */}
        <Paper elevation={3} sx={{ mb: 3, p: 1.5, borderRadius: 2, bgcolor: 'primary.dark', color: 'white' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="overline" sx={{ display: 'block', opacity: 0.8, letterSpacing: 1, lineHeight: 1, fontSize: '0.65rem' }}>
                Active Protocol
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, mt: 0.25, fontSize: '1.1rem' }}>
                {patient.currentProtocol.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <Box>
                  <Typography variant="caption" sx={{ display: 'block', opacity: 0.7, fontSize: '0.65rem' }}>CYCLE INTERVAL</Typography>
                  <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.8rem' }}>{patient.currentProtocol.cycleFrequency} days</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ display: 'block', opacity: 0.7, fontSize: '0.65rem' }}>TOTAL CYCLES</Typography>
                  <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.8rem' }}>{patient.currentProtocol.cycles}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ display: 'block', opacity: 0.7, fontSize: '0.65rem' }}>START DATE</Typography>
                  <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.8rem' }}>{patient.currentProtocol.startDate}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 1, px: 2, borderRadius: 2, display: 'inline-block', minWidth: 100, textAlign: 'center' }}>
                <Typography variant="caption" sx={{ display: 'block', mb: 0, opacity: 0.9, fontSize: '0.65rem' }}>
                  COMPLETED CYCLES
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  {patient.cycleOutcomes?.length || 0} / {patient.currentProtocol.cycles}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Cycle Tabs */}
        <Paper sx={{ mb: 3, borderRadius: 2 }}>
          <Tabs
            value={selectedCycle}
            onChange={(_, newValue) => setSelectedCycle(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            indicatorColor="primary"
            textColor="primary"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': { fontWeight: 600, minHeight: 48, fontSize: '0.85rem' },
              minHeight: 48
            }}
          >
            {Array.from({ length: patient.currentProtocol.cycles }, (_, i) => (
              <Tab
                key={i}
                label={`Cycle ${i + 1}`}
                icon={
                  patient.cycleOutcomes?.some((c) => c.cycleNumber === i + 1) ? (
                    <CheckCircleIcon sx={{ fontSize: '1rem' }} />
                  ) : undefined
                }
                iconPosition="end"
              />
            ))}
          </Tabs>
        </Paper>

        <Grid container spacing={2}>
          {/* Left Column - Drug Administration */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, borderRadius: 2, height: '100%' }}>
              <Typography variant="overline" sx={{ mb: 1.5, fontWeight: 700, color: 'primary.main', fontSize: '0.75rem', letterSpacing: 1.2, display: 'block' }}>
                Cycle {currentCycle} – Drug Administration
              </Typography>

              <Table size="small" sx={{ minWidth: 0, tableLayout: 'fixed' }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 700, px: 1, color: 'text.secondary', fontSize: '0.75rem' }}>Drug</TableCell>
                    <TableCell sx={{ fontWeight: 700, px: 1, color: 'text.secondary', fontSize: '0.75rem' }}>Basis</TableCell>
                    <TableCell sx={{ fontWeight: 700, px: 1, color: 'text.secondary', fontSize: '0.75rem' }}>Dose</TableCell>
                    <TableCell sx={{ fontWeight: 700, px: 1, width: '20%', color: 'text.secondary', fontSize: '0.75rem' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patient.currentProtocol.drugs.map((drug, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontWeight: 600, px: 1, py: 0.75, width: '35%', overflowWrap: 'break-word', fontSize: '0.8rem' }}>
                        {drug.name}
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.7rem' }}>Day {drug.day}</Typography>
                      </TableCell>
                      <TableCell sx={{ width: '20%', px: 1, py: 0.75, fontSize: '0.8rem' }}>{drug.doseBasis}</TableCell>
                      <TableCell sx={{ width: '25%', px: 1, py: 0.75, fontSize: '0.8rem' }}>{drug.dose}</TableCell>
                      <TableCell sx={{ px: 1, py: 0.75 }}>
                        {cycleOutcome ? (
                          <Chip
                            label={drug.status || 'Given'}
                            size="small"
                            color={drug.status === 'Held' ? 'warning' : 'success'}
                            icon={drug.status === 'Held' ? <PauseCircleIcon sx={{ fontSize: '0.9rem' }} /> : <CheckCircleIcon sx={{ fontSize: '0.9rem' }} />}
                            sx={{ height: 20, fontSize: '0.65rem', '& .MuiChip-label': { px: 1 } }}
                          />
                        ) : (
                          <Chip label="Pending" size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pre-medication / Supportive Care */}
              <Box sx={{ mt: 2.5, p: 1.5, bgcolor: 'info.light', borderRadius: 2 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, color: 'info.dark', display: 'block', letterSpacing: 0.5, fontSize: '0.7rem' }}>
                  PRE-MEDICATIONS
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" display="block">• Dexamethasone 12 mg IV</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" display="block">• Ondansetron 8 mg IV</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" display="block">• Ranitidine 50 mg IV</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Right Column - Cycle Outcome & Labs */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: cycleOutcome ? 'success.light' : 'divider' }}>
              <Typography variant="overline" sx={{ mb: 1.5, fontWeight: 700, color: cycleOutcome ? 'success.dark' : 'text.secondary', fontSize: '0.75rem', letterSpacing: 1.2, display: 'block' }}>
                Cycle {currentCycle} – Outcome
              </Typography>

              {cycleOutcome ? (
                <Box>
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                     <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.7rem' }}>ADMINISTERED DATE</Typography>
                        <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.8rem' }}>{cycleOutcome.date}</Typography>
                     </Grid>
                     <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.7rem' }}>RESPONSE</Typography>
                        <Chip
                              label={cycleOutcome.response}
                              size="small"
                              color={
                                cycleOutcome.response === 'Complete Response'
                                  ? 'success'
                                  : cycleOutcome.response === 'Partial Response'
                                  ? 'info'
                                  : cycleOutcome.response === 'Stable Disease'
                                  ? 'warning'
                                  : 'error'
                              }
                              sx={{ mt: 0.5, height: 20, fontSize: '0.65rem' }}
                            />
                     </Grid>
                  </Grid>

                  <Table size="small" sx={{ minWidth: 0, tableLayout: 'fixed' }}>
                    <TableBody>
                      {cycleOutcome.toxicity && (
                        <>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 600, width: '35%', px: 1, py: 0.5, fontSize: '0.8rem' }}>Toxicity Grade</TableCell>
                            <TableCell sx={{ px: 1, py: 0.5 }}>
                              <Chip
                                label={cycleOutcome.toxicity}
                                size="small"
                                color={
                                  cycleOutcome.toxicity === 'Grade 1' || cycleOutcome.toxicity === 'Grade 2'
                                    ? 'warning'
                                    : 'error'
                                }
                                sx={{ height: 20, fontSize: '0.65rem' }}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 600, verticalAlign: 'top', width: '35%', px: 1, py: 0.5, fontSize: '0.8rem' }}>Details</TableCell>
                            <TableCell sx={{ px: 1, py: 0.5, fontSize: '0.8rem' }}>{cycleOutcome.toxicityDescription}</TableCell>
                          </TableRow>
                        </>
                      )}
                      {cycleOutcome.qolImpact && (
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600, px: 1, py: 0.5, fontSize: '0.8rem' }}>QoL Impact</TableCell>
                          <TableCell sx={{ px: 1, py: 0.5 }}>
                            <Chip
                              label={cycleOutcome.qolImpact}
                              size="small"
                              color={
                                cycleOutcome.qolImpact === 'Improved'
                                  ? 'success'
                                  : cycleOutcome.qolImpact === 'Worsened'
                                  ? 'error'
                                  : 'default'
                              }
                              sx={{ height: 20, fontSize: '0.65rem' }}
                            />
                          </TableCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, verticalAlign: 'top', px: 1, py: 0.5, fontSize: '0.8rem' }}>Decision</TableCell>
                        <TableCell sx={{ px: 1, py: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: 'success.main', fontSize: '0.8rem' }}>
                            {cycleOutcome.decision}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  {cycleOutcome.notes && (
                    <Box sx={{ mt: 2, p: 1.5, bgcolor: 'grey.50', borderRadius: 1, borderLeft: '4px solid', borderColor: 'primary.main' }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 0.25, fontSize: '0.7rem' }}>
                        CLINICAL NOTES
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{cycleOutcome.notes}</Typography>
                    </Box>
                  )}
                  
                  {/* Administration Notes Input (Read-only view for past cycles typically, or editable) */}
                   <Box sx={{ mt: 2 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 0.5, fontSize: '0.7rem' }}>
                        ADMINISTRATION NOTES
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        defaultValue={cycleOutcome.notes || 'All drugs administered as per protocol. Patient tolerated well.'}
                        size="small"
                        variant="outlined"
                        InputProps={{ sx: { fontSize: '0.8rem' } }}
                      />
                    </Box>

                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 6, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Cycle not yet administered
                  </Typography>
                  <Button variant="contained" color="primary" disableElevation size="small">
                    Start Cycle {currentCycle}
                  </Button>
                </Box>
              )}
            </Paper>

            {/* Lab Values for this Cycle */}
            <Paper sx={{ p: 2, mt: 2, borderRadius: 2 }}>
              <Typography variant="overline" sx={{ mb: 1.5, fontWeight: 700, color: 'primary.main', fontSize: '0.75rem', letterSpacing: 1.2, display: 'block' }}>
                Pre-Cycle Lab Values
              </Typography>
              <Grid container spacing={1}>
                 {[
                    { name: 'Hemoglobin', value: '12.5 g/dL', status: 'Normal' },
                    { name: 'WBC', value: '6.2 × 10³/µL', status: 'Normal' },
                    { name: 'Platelets', value: '185 × 10³/µL', status: 'Normal' },
                    { name: 'Creatinine', value: '0.9 mg/dL', status: 'Normal' },
                 ].map((lab, i) => (
                    <Grid item xs={6} sm={3} key={i}>
                       <Box sx={{ p: 1, bgcolor: 'grey.50', borderRadius: 2, textAlign: 'center' }}>
                          <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.7rem' }}>{lab.name}</Typography>
                           <Typography variant="body2" fontWeight={600} display="block" sx={{ my: 0.25, fontSize: '0.8rem' }}>{lab.value}</Typography>
                           <Chip label={lab.status} size="small" color="success" sx={{ height: 16, fontSize: '0.6rem' }} />
                       </Box>
                    </Grid>
                 ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Treatment Timeline - Full Width */}
        <Paper sx={{ p: 2, mt: 2, borderRadius: 2 }}>
          <Typography variant="overline" sx={{ mb: 1.5, fontWeight: 700, color: 'primary.main', fontSize: '0.75rem', letterSpacing: 1.2, display: 'block' }}>
            Treatment Timeline
          </Typography>
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 1.5, 
              overflowX: 'auto', 
              pb: 1,
              // Custom Scrollbar Styles
              '&::-webkit-scrollbar': {
                height: '4px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1', 
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#bdbdbd', 
                borderRadius: '4px',
                '&:hover': {
                  background: '#a6a6a6', 
                },
              },
            }}
          >
            {Array.from({ length: patient.currentProtocol.cycles }, (_, i) => {
              const outcome = patient.cycleOutcomes?.find((c) => c.cycleNumber === i + 1);
              return (
                <Box
                  key={i}
                  sx={{
                    minWidth: 120,
                    p: 1.5,
                    border: '1px solid',
                    borderColor: outcome ? 'success.light' : 'divider',
                    borderRadius: 2,
                    bgcolor: outcome ? 'success.light' : 'background.paper',
                    textAlign: 'center',
                    opacity: outcome ? 1 : 0.7
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: 'block', color: outcome ? 'success.dark' : 'text.primary', fontSize: '0.7rem' }}>
                    CYCLE {i + 1}
                  </Typography>
                  {outcome ? (
                    <>
                      <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5, fontSize: '0.75rem' }}>{outcome.date}</Typography>
                      <Chip label={outcome.response} size="small" color="success" variant="filled" sx={{ height: 16, fontSize: '0.6rem' }} />
                    </>
                  ) : (
                     <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>Pending</Typography>
                  )}
                </Box>
              );
            })}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
