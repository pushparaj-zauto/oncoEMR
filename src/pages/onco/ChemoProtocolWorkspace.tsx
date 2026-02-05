import {
  Box,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
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
    return <Typography>No active protocol</Typography>;
  }

  const currentCycle = selectedCycle + 1;
  const cycleOutcome = patient.cycleOutcomes?.find((c) => c.cycleNumber === currentCycle);

  return (
    <Box>
      {/* Global Patient Context Bar */}
      <PatientContextBar patient={patient} />

      <Container maxWidth="xl" sx={{ mt: 3, mb: 4, overflowX: 'hidden' }}>
          {/* Protocol Header */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ bgcolor: 'primary.dark', color: 'white', p: 2.5 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
                    {patient.currentProtocol.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Cycle Interval: <strong>{patient.currentProtocol.cycleFrequency} days</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Total Cycles: <strong>{patient.currentProtocol.cycles}</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Start Date: <strong>{patient.currentProtocol.startDate}</strong>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                  <Typography variant="caption" sx={{ display: 'block', mb: 0.5, opacity: 0.9 }}>
                    Completed Cycles
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800 }}>
                    {patient.cycleOutcomes?.length || 0} / {patient.currentProtocol.cycles}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

        {/* Cycle Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={selectedCycle}
            onChange={(_, newValue) => setSelectedCycle(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': { fontWeight: 600 },
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

        <Grid container spacing={3}>
          {/* Left Column - Drug Administration */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, overflow: 'hidden' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                Cycle {currentCycle} – Drug Administration
              </Typography>

                <Table size="small" sx={{ minWidth: 0, tableLayout: 'fixed' }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.100' }}>
                    <TableCell sx={{ fontWeight: 700 }}>Drug</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Dose Basis</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Final Dose</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Day</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patient.currentProtocol.drugs.map((drug, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontWeight: 600, width: '30%', overflowWrap: 'break-word' }}>{drug.name}</TableCell>
                      <TableCell sx={{ width: '25%', overflowWrap: 'break-word' }}>{drug.doseBasis}</TableCell>
                      <TableCell sx={{ width: '20%', overflowWrap: 'break-word' }}>{drug.dose}</TableCell>
                      <TableCell sx={{ width: '10%' }}>{drug.day}</TableCell>
                      <TableCell>
                        {cycleOutcome ? (
                          <Chip
                            label={drug.status || 'Given'}
                            size="small"
                            color={drug.status === 'Held' ? 'warning' : 'success'}
                            icon={drug.status === 'Held' ? <PauseCircleIcon /> : <CheckCircleIcon />}
                          />
                        ) : (
                          <Chip label="Pending" size="small" color="default" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                </Table>

              {/* Pre-medication / Supportive Care */}
              <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'info.dark' }}>
                  Pre-medications:
                </Typography>
                <Typography variant="body2">
                  • Dexamethasone 12 mg IV
                  <br />
                  • Ondansetron 8 mg IV
                  <br />• Ranitidine 50 mg IV
                </Typography>
              </Box>

              {/* Administration Notes */}
              {cycleOutcome && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    Administration Notes:
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    defaultValue={cycleOutcome.notes || 'All drugs administered as per protocol. Patient tolerated well.'}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Right Column - Cycle Outcome */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, border: '2px solid', borderColor: 'success.main' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'success.dark' }}>
                Cycle {currentCycle} – Outcome
              </Typography>

              {cycleOutcome ? (
                <>
                    <Table size="small" sx={{ minWidth: 0, tableLayout: 'fixed' }}>
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600, width: '35%' }}>Date Administered</TableCell>
                          <TableCell sx={{ width: '65%' }}>{cycleOutcome.date}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Response</TableCell>
                          <TableCell>
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
                            />
                          </TableCell>
                        </TableRow>
                        {cycleOutcome.toxicity && (
                          <>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 600, width: '35%' }}>Toxicity Grade</TableCell>
                              <TableCell>
                                <Chip
                                  label={cycleOutcome.toxicity}
                                  size="small"
                                  color={
                                    cycleOutcome.toxicity === 'Grade 1' || cycleOutcome.toxicity === 'Grade 2'
                                      ? 'warning'
                                      : 'error'
                                  }
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 600, verticalAlign: 'top', width: '35%' }}>Toxicity Details</TableCell>
                              <TableCell>{cycleOutcome.toxicityDescription}</TableCell>
                            </TableRow>
                          </>
                        )}
                        {cycleOutcome.qolImpact && (
                          <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>QoL Impact</TableCell>
                            <TableCell>
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
                              />
                            </TableCell>
                          </TableRow>
                        )}
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600, verticalAlign: 'top' }}>Decision</TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: 'success.main' }}>
                              {cycleOutcome.decision}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                  {cycleOutcome.notes && (
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1, borderLeft: '4px solid', borderColor: 'primary.main' }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
                        Clinical Notes:
                      </Typography>
                      <Typography variant="body2">{cycleOutcome.notes}</Typography>
                    </Box>
                  )}
                </>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    Cycle not yet administered
                  </Typography>
                  <Button variant="contained" color="primary">
                    Start Cycle {currentCycle}
                  </Button>
                </Box>
              )}
            </Paper>

            {/* Lab Values for this Cycle */}
            <Paper sx={{ p: 3, mt: 2, overflow: 'hidden' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                Pre-Cycle Lab Values
              </Typography>
                <Table size="small" sx={{ minWidth: 0, tableLayout: 'fixed' }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.100' }}>
                      <TableCell sx={{ fontWeight: 700 }}>Parameter</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Value</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ width: '40%' }}>Hemoglobin</TableCell>
                      <TableCell sx={{ width: '40%' }}>12.5 g/dL</TableCell>
                      <TableCell>
                        <Chip label="Normal" size="small" color="success" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>WBC</TableCell>
                      <TableCell>6.2 × 10³/µL</TableCell>
                      <TableCell>
                        <Chip label="Normal" size="small" color="success" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Platelets</TableCell>
                      <TableCell>185 × 10³/µL</TableCell>
                      <TableCell>
                        <Chip label="Normal" size="small" color="success" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Creatinine</TableCell>
                      <TableCell>0.9 mg/dL</TableCell>
                      <TableCell>
                        <Chip label="Normal" size="small" color="success" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                    </Table>
                  </Paper>
                  </Grid>
        </Grid>

        {/* Treatment Timeline - Full Width */}
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
            Treatment Timeline
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
            {Array.from({ length: patient.currentProtocol.cycles }, (_, i) => {
              const outcome = patient.cycleOutcomes?.find((c) => c.cycleNumber === i + 1);
              return (
                <Box
                  key={i}
                  sx={{
                    minWidth: 150,
                    p: 2,
                    border: '2px solid',
                    borderColor: outcome ? 'success.main' : 'grey.300',
                    borderRadius: 2,
                    bgcolor: outcome ? 'success.light' : 'grey.50',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>
                    Cycle {i + 1}
                  </Typography>
                  {outcome ? (
                    <>
                      <Chip label={outcome.response} size="small" color="success" sx={{ mb: 1 }} />
                      <Typography variant="caption" sx={{ display: 'block' }}>
                        {outcome.date}
                      </Typography>
                      {outcome.toxicity && (
                        <Chip label={outcome.toxicity} size="small" color="warning" sx={{ mt: 1 }} />
                      )}
                    </>
                  ) : (
                    <Chip label="Pending" size="small" color="default" />
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
