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
  Fab,
  Stack,
  Divider,
  alpha,
  Tooltip,
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import ChatIcon from '@mui/icons-material/Chat';
import LayersIcon from '@mui/icons-material/Layers';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HomeIcon from '@mui/icons-material/Home';
import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PendingIcon from '@mui/icons-material/Pending';
import { OncologyPatient } from '../../types/oncology';
import PatientContextBar from '../../components/onco/PatientContextBar';

interface ChemoProtocolWorkspaceProps {
  patient: OncologyPatient;
  hideContextBar?: boolean;
}

const MicButton = () => (
  <Fab 
    size="small" 
    sx={{ 
        boxShadow: 'none',
        bgcolor: 'transparent',
        border: '1px solid',
        borderColor: 'primary.main', 
        width: 32,
        height: 32,
        minHeight: 32,
        color: 'primary.main',
        '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            transform: 'translateY(-1px)',
        }
    }}
  >
    <MicIcon sx={{ fontSize: 16 }} />
  </Fab>
);

export default function ChemoProtocolWorkspace({ patient, hideContextBar }: ChemoProtocolWorkspaceProps) {
  const [selectedCycle, setSelectedCycle] = useState(0);

  if (!patient.currentProtocol) {
    return <Typography sx={{ p: 3 }}>No active protocol</Typography>;
  }

  const currentCycle = selectedCycle + 1;
  const cycleOutcome = patient.cycleOutcomes?.find((c) => c.cycleNumber === currentCycle);

  return (
    <Box sx={{ overflowX: 'hidden', width: '100%', pb: 10 }}>
      {/* Global Patient Context Bar */}
      {!hideContextBar && <PatientContextBar patient={patient} />}

      <Container maxWidth="xl" sx={{ mt: 4, mb: 5 }}>
        <Grid container spacing={4}>
            {/* Header Section */}
            <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <Typography variant="overline" sx={{ mb: 1, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
                                Active Protocol
                            </Typography>
                             <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                                {patient.currentProtocol.name}
                            </Typography>
                            <Stack direction="row" spacing={4} sx={{ mt: 2 }}>
                                <Box>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>CYCLE INTERVAL</Typography>
                                    <Typography variant="body2" fontWeight={500}>{patient.currentProtocol.cycleFrequency} days</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>TOTAL CYCLES</Typography>
                                    <Typography variant="body2" fontWeight={500}>{patient.currentProtocol.cycles}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>START DATE</Typography>
                                    <Typography variant="body2" fontWeight={500}>{patient.currentProtocol.startDate}</Typography>
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                             <Box sx={{ p: 2, bgcolor: 'primary.50', borderRadius: 2, display: 'inline-block', minWidth: 140, textAlign: 'center', border: '1px solid', borderColor: 'primary.100' }}>
                                <Typography variant="caption" sx={{ display: 'block', mb: 0, color: 'primary.main', fontWeight: 700, letterSpacing: 0.5 }}>
                                    PROGRESS
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.dark' }}>
                                    {patient.cycleOutcomes?.length || 0} <span style={{ fontSize: '1rem', color: '#666', fontWeight: 400 }}>/ {patient.currentProtocol.cycles}</span>
                                </Typography>
                                <Typography variant="caption" color="text.secondary">Cycles Completed</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            {/* Cycle Tabs */}
             <Grid item xs={12}>
                <Paper variant="outlined" sx={{ borderRadius: 2, mb: 1 }}>
                    <Tabs
                        value={selectedCycle}
                        onChange={(_, newValue) => setSelectedCycle(newValue)}
                        variant="scrollable"
                        scrollButtons="auto"
                        indicatorColor="primary"
                        textColor="primary"
                        sx={{
                        '& .MuiTab-root': { 
                            fontWeight: 600, 
                            minHeight: 52, 
                            fontSize: '0.85rem',
                            textTransform: 'none',
                             px: 3
                        },
                        minHeight: 52
                        }}
                    >
                        {Array.from({ length: patient.currentProtocol.cycles }, (_, i) => (
                        <Tab
                            key={i}
                            label={`Cycle ${i + 1}`}
                            icon={
                            patient.cycleOutcomes?.some((c) => c.cycleNumber === i + 1) ? (
                                <CheckCircleIcon sx={{ fontSize: '1rem', color: 'success.main' }} />
                            ) : undefined
                            }
                            iconPosition="end"
                        />
                        ))}
                    </Tabs>
                </Paper>
             </Grid>

          {/* Left Column - Drug Administration */}
          <Grid item xs={12} md={7}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
                 <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                    Cycle {currentCycle} Administration
                </Typography>
                 <MicButton />
            </Box>
           
            <Paper variant="outlined" sx={{ p: 0, borderRadius: 2, overflow: 'hidden' }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', py: 1.5 }}>Drug</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', py: 1.5 }}>Basis</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', py: 1.5 }}>Dose</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', py: 1.5 }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patient.currentProtocol.drugs.map((drug, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="body2" fontWeight={600} color="text.primary">{drug.name}</Typography>
                        <Chip label={`Day ${drug.day}`} size="small" sx={{ mt: 0.5, height: 20, fontSize: '0.65rem', bgcolor: 'grey.100' }} />
                      </TableCell>
                      <TableCell sx={{ py: 2 }}><Typography variant="body2">{drug.doseBasis}</Typography></TableCell>
                      <TableCell sx={{ py: 2 }}><Typography variant="body2">{drug.dose}</Typography></TableCell>
                      <TableCell align="right" sx={{ py: 2 }}>
                        {cycleOutcome ? (
                          <Chip
                            label={drug.status || 'Given'}
                            size="small"
                            color={drug.status === 'Held' ? 'warning' : 'success'}
                            variant={drug.status === 'Held' ? 'outlined' : 'filled'}
                            icon={drug.status === 'Held' ? <PauseCircleIcon sx={{ fontSize: '0.9rem' }} /> : <CheckCircleIcon sx={{ fontSize: '0.9rem' }} />}
                            sx={{ fontWeight: 500 }}
                          />
                        ) : (
                          <Chip label="Pending" size="small" variant="outlined" sx={{ borderColor: 'grey.300', color: 'text.secondary' }} />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>

              {/* Pre-medication / Supportive Care */}
               <Box sx={{ mt: 4 }}>
                   <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'text.secondary', fontSize: '0.8rem', letterSpacing: 1, display: 'block' }}>
                    Pre-Medications & Supportive Care
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
                    <Grid container spacing={2}>
                        {[
                            { name: 'Dexamethasone', dose: '12 mg IV' },
                            { name: 'Ondansetron', dose: '8 mg IV' },
                            { name: 'Ranitidine', dose: '50 mg IV' }
                        ].map((med, i) => (
                            <Grid item xs={12} sm={4} key={i}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CheckCircleIcon color="success" sx={{ fontSize: 16, opacity: 0.7 }} />
                                    <Box>
                                        <Typography variant="body2" fontWeight={500}>{med.name}</Typography>
                                        <Typography variant="caption" color="text.secondary">{med.dose}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                  </Paper>
               </Box>
          </Grid>

          {/* Right Column - Cycle Outcome & Labs */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
                 <Typography variant="overline" sx={{ fontWeight: 700, color: cycleOutcome ? 'success.main' : 'text.secondary', fontSize: '0.85rem', letterSpacing: 1.2 }}>
                    Cycle Outcome
                </Typography>
            </Box>

             <Paper variant="outlined" sx={{ p: 0, borderRadius: 2 }}>
                {cycleOutcome ? (
                  <Box>
                    <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="caption" color="text.secondary" display="block">DATE ADMINISTERED</Typography>
                                <Typography variant="subtitle2" fontWeight={600} sx={{ mt: 0.5 }}>{cycleOutcome.date}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="caption" color="text.secondary" display="block">RESPONSE</Typography>
                                <Chip
                                    label={cycleOutcome.response}
                                    size="small"
                                    color={
                                        cycleOutcome.response.includes('Complete') ? 'success' :
                                        cycleOutcome.response.includes('Partial') ? 'info' :
                                        cycleOutcome.response.includes('Stable') ? 'warning' : 'error'
                                    }
                                    sx={{ mt: 0.5, fontWeight: 500 }}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Table size="small">
                      <TableBody>
                        {cycleOutcome.toxicity && (
                          <TableRow>
                            <TableCell component="th" scope="row" sx={{ color: 'text.secondary', borderBottom: 'none', pl: 3, py: 1.5, width: '40%' }}>Toxicity</TableCell>
                            <TableCell sx={{ borderBottom: 'none', pr: 3, py: 1.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                     <Chip
                                        label={cycleOutcome.toxicity}
                                        size="small"
                                        variant="outlined"
                                        color={['Grade 1', 'Grade 2'].includes(cycleOutcome.toxicity) ? 'warning' : 'error'}
                                        sx={{ height: 24 }}
                                    />
                                    {cycleOutcome.toxicityDescription && (
                                        <Tooltip title={cycleOutcome.toxicityDescription}>
                                            <InfoOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary', cursor: 'pointer' }} />
                                        </Tooltip>
                                    )}
                                </Box>
                            </TableCell>
                          </TableRow>
                        )}
                        {cycleOutcome.qolImpact && (
                           <TableRow>
                            <TableCell component="th" scope="row" sx={{ color: 'text.secondary', borderBottom: 'none', pl: 3, py: 1.5 }}>QoL Impact</TableCell>
                            <TableCell sx={{ borderBottom: 'none', pr: 3, py: 1.5 }}>
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        color: cycleOutcome.qolImpact === 'Improved' ? 'success.main' : 'error.main',
                                        fontWeight: 500
                                    }}
                                >
                                    {cycleOutcome.qolImpact}
                                </Typography>
                            </TableCell>
                          </TableRow>
                        )}
                         <TableRow>
                            <TableCell component="th" scope="row" sx={{ color: 'text.secondary', pl: 3, py: 1.5 }}>Decision</TableCell>
                            <TableCell sx={{ pr: 3, py: 1.5 }}>
                                <Typography variant="body2" fontWeight={600} color="primary.main">{cycleOutcome.decision}</Typography>
                            </TableCell>
                          </TableRow>
                      </TableBody>
                    </Table>

                    {/* Notes Section within Card */}
                    <Box sx={{ p: 3, bgcolor: 'grey.50' }}>
                         <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1 }}>
                            CLINICAL NOTES
                         </Typography>
                         <Typography variant="body2" color="text.primary" sx={{ mb: 2, fontStyle: 'italic' }}>
                             "{cycleOutcome.notes || 'No specific notes recorded.'}"
                         </Typography>
                         
                         <Divider sx={{ my: 2 }} />
                         
                         <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1 }}>
                            ADDITIONAL COMMENTS
                         </Typography>
                         <TextField
                            fullWidth
                            multiline
                            rows={2}
                            placeholder="Add administration notes..."
                            size="small"
                            sx={{ bgcolor: 'white' }}
                        />
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 8, px: 3 }}>
                    <PendingIcon sx={{ fontSize: 40, color: 'grey.300', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>Cycle Pending</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      This cycle has not been administered yet.
                    </Typography>
                    <Button variant="contained" disableElevation>
                      Start Administration
                    </Button>
                  </Box>
                )}
             </Paper>

            {/* Pre-Cycle Lab Values */}
            <Box sx={{ mt: 4 }}>
                 <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'text.secondary', fontSize: '0.8rem', letterSpacing: 1, display: 'block' }}>
                    Pre-Cycle Labs
                </Typography>
                <Grid container spacing={2}>
                    {[
                    { name: 'Hemoglobin', value: '12.5', unit: 'g/dL', status: 'Normal' },
                    { name: 'WBC', value: '6.2', unit: '10³/µL', status: 'Normal' },
                    { name: 'Platelets', value: '185', unit: '10³/µL', status: 'Normal' },
                    { name: 'Creatinine', value: '0.9', unit: 'mg/dL', status: 'Normal' },
                    ].map((lab, i) => (
                    <Grid item xs={6} key={i}>
                        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="caption" color="text.secondary" display="block">{lab.name}</Typography>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {lab.value} <Typography component="span" variant="caption" color="text.secondary">{lab.unit}</Typography>
                                </Typography>
                            </Box>
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
                        </Paper>
                    </Grid>
                    ))}
                </Grid>
            </Box>
          </Grid>
        </Grid>

        {/* Treatment Timeline - Full Width */}
        <Box sx={{ mt: 6 }}>
           <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', letterSpacing: 1.2, display: 'block' }}>
            Treatment Timeline
          </Typography>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
             <Box 
            sx={{ 
              display: 'flex', 
              gap: 2, 
              overflowX: 'auto', 
              pb: 1,
              '&::-webkit-scrollbar': { height: '6px' },
              '&::-webkit-scrollbar-track': { background: '#f1f1f1', borderRadius: '4px' },
              '&::-webkit-scrollbar-thumb': { background: '#d1d1d1', borderRadius: '4px', '&:hover': { background: '#b0b0b0' } },
            }}
          >
            {Array.from({ length: patient.currentProtocol.cycles }, (_, i) => {
              const outcome = patient.cycleOutcomes?.find((c) => c.cycleNumber === i + 1);
              const isCurrent = i + 1 === currentCycle;
              
              return (
                <Box
                  key={i}
                  sx={{
                    minWidth: 140,
                    p: 0,
                    border: '1px solid',
                    borderColor: isCurrent ? 'primary.main' : outcome ? 'success.light' : 'divider',
                    borderRadius: 2,
                    bgcolor: outcome ? alpha('#2e7d32', 0.04) : 'background.paper',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                    {isCurrent && <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, bgcolor: 'primary.main' }} />}
                    
                    <Box sx={{ p: 2 }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: 'block', color: 'text.secondary', fontSize: '0.7rem', textTransform: 'uppercase' }}>
                            CYCLE {i + 1}
                        </Typography>
                        
                         {outcome ? (
                            <>
                            <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>{outcome.date}</Typography>
                            <Chip 
                                label={outcome.response} 
                                size="small" 
                                color="success" 
                                variant="outlined" 
                                sx={{ height: 20, fontSize: '0.65rem', width: '100%' }} 
                            />
                            </>
                        ) : (
                             <Box sx={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>Pending</Typography>
                             </Box>
                        )}
                    </Box>
                </Box>
              );
            })}
          </Box>
          </Paper>
        </Box>
      </Container>
      
      {/* Bottom Action Bar */}
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
        <Box />
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Fab size="small" sx={{ bgcolor: 'white', border: '2px solid', borderColor: 'primary.main', color: 'primary.main', width: 36, height: 36, minHeight: 36, elevation: 0, boxShadow: 'none', '&:hover': { bgcolor: 'grey.50' } }}>
            <MicIcon sx={{ fontSize: '1rem' }} />
          </Fab>
          <Fab size="small" sx={{ bgcolor: 'white', border: '2px solid', borderColor: 'primary.main', color: 'primary.main', width: 36, height: 36, minHeight: 36, elevation: 0, boxShadow: 'none', '&:hover': { bgcolor: 'grey.50' } }}>
            <Box sx={{ fontWeight: 700, fontSize: '0.75rem' }}>Rx</Box>
          </Fab>
          <Fab size="small" sx={{ bgcolor: 'white', border: '2px solid', borderColor: 'primary.main', color: 'primary.main', width: 36, height: 36, minHeight: 36, elevation: 0, boxShadow: 'none', '&:hover': { bgcolor: 'grey.50' } }}>
            <LayersIcon sx={{ fontSize: '1rem' }} />
          </Fab>
          <Fab size="small" sx={{ bgcolor: 'white', border: '2px solid', borderColor: 'primary.main', color: 'primary.main', width: 36, height: 36, minHeight: 36, elevation: 0, boxShadow: 'none', '&:hover': { bgcolor: 'grey.50' } }}>
            <ChatIcon sx={{ fontSize: '1rem' }} />
          </Fab>
           <Fab size="small" sx={{ bgcolor: 'white', border: '2px solid', borderColor: 'primary.main', color: 'primary.main', width: 36, height: 36, minHeight: 36, elevation: 0, boxShadow: 'none', '&:hover': { bgcolor: 'grey.50' } }}>
            <MoreHorizIcon sx={{ fontSize: '1rem' }} />
          </Fab>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<Box component="span" sx={{ fontSize: '0.9rem' }}>✓</Box>}
            sx={{ px: 2, py: 0.5, fontWeight: 600, borderRadius: 1.5, textTransform: 'none', fontSize: '0.8rem' }}
          >
            Finish and Next Patient
          </Button>
          <Fab color="primary" size="small" sx={{ width: 36, height: 36, minHeight: 36, boxShadow: 'none' }}>
            <HomeIcon sx={{ fontSize: '1rem' }} />
          </Fab>
        </Box>
      </Box>
    </Box>
  );
}
