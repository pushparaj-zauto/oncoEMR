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

            {/* Cycle Navigation - Clean Card Design */}
             <Grid item xs={12}>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        gap: 1.5, 
                        overflowX: 'auto',
                        pt: 0.5,
                        pb: 1.5,
                        '&::-webkit-scrollbar': { height: '4px' },
                        '&::-webkit-scrollbar-track': { background: 'transparent' },
                        '&::-webkit-scrollbar-thumb': { background: '#d1d1d1', borderRadius: '4px' },
                    }}
                >
                    {Array.from({ length: patient.currentProtocol.cycles }, (_, i) => {
                        const outcome = patient.cycleOutcomes?.find((c) => c.cycleNumber === i + 1);
                        const isSelected = selectedCycle === i;
                        const isCompleted = !!outcome;
                        
                        return (
                            <Paper
                                key={i}
                                elevation={0}
                                onClick={() => setSelectedCycle(i)}
                                sx={{
                                    minWidth: 115,
                                    p: 1.5,
                                    cursor: 'pointer',
                                    border: '2px solid',
                                    borderColor: isSelected ? 'primary.main' : isCompleted ? 'success.light' : 'grey.200',
                                    borderRadius: 2.5,
                                    bgcolor: isSelected 
                                        ? alpha('#6366f1', 0.08) 
                                        : isCompleted 
                                            ? alpha('#2e7d32', 0.04) 
                                            : 'grey.50',
                                    transition: 'all 0.2s ease',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        borderColor: isSelected ? 'primary.main' : isCompleted ? 'success.main' : 'primary.light',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                    },
                                }}
                            >
                                {/* Top accent bar for selected */}
                                {isSelected && (
                                    <Box sx={{ 
                                        position: 'absolute', 
                                        top: 0, 
                                        left: 0, 
                                        right: 0, 
                                        height: 3, 
                                        bgcolor: 'primary.main',
                                        borderRadius: '4px 4px 0 0'
                                    }} />
                                )}
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.75 }}>
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            fontWeight: 700, 
                                            color: isSelected ? 'primary.main' : 'text.secondary',
                                            fontSize: '0.7rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: 0.5
                                        }}
                                    >
                                        Cycle {i + 1}
                                    </Typography>
                                    {isCompleted && (
                                        <CheckCircleIcon sx={{ fontSize: '0.85rem', color: 'success.main' }} />
                                    )}
                                </Box>
                                
                                {outcome ? (
                                    <>
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                fontWeight: 600, 
                                                color: 'text.primary',
                                                fontSize: '0.8rem',
                                                mb: 0.75
                                            }}
                                        >
                                            {outcome.date}
                                        </Typography>
                                        <Chip 
                                            label={outcome.response.length > 12 ? outcome.response.substring(0, 12) + '...' : outcome.response} 
                                            size="small" 
                                            sx={{ 
                                                height: 22, 
                                                fontSize: '0.65rem',
                                                bgcolor: outcome.response.includes('Complete') ? alpha('#2e7d32', 0.12) :
                                                         outcome.response.includes('Partial') ? alpha('#0288d1', 0.12) :
                                                         outcome.response.includes('Adjuvant') ? alpha('#ed6c02', 0.15) : alpha('#9e9e9e', 0.12),
                                                color: outcome.response.includes('Complete') ? '#1b5e20' :
                                                       outcome.response.includes('Partial') ? '#01579b' :
                                                       outcome.response.includes('Adjuvant') ? '#e65100' : '#616161',
                                                fontWeight: 600,
                                                '& .MuiChip-label': { px: 1 }
                                            }} 
                                        />
                                    </>
                                ) : (
                                    <Box sx={{ py: 1.25 }}>
                                        <Typography 
                                            variant="caption" 
                                            sx={{ 
                                                color: 'text.disabled', 
                                                fontStyle: 'italic',
                                                fontSize: '0.75rem'
                                            }}
                                        >
                                            Scheduled
                                        </Typography>
                                    </Box>
                                )}
                            </Paper>
                        );
                    })}
                </Box>
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

               {/* Pre-Cycle Lab Values - Single Row */}
               <Box sx={{ mt: 4 }}>
                  <Typography variant="overline" sx={{ mb: 2, fontWeight: 700, color: 'text.secondary', fontSize: '0.8rem', letterSpacing: 1, display: 'block' }}>
                    Pre-Cycle Labs
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {[
                      { name: 'Hemoglobin', value: '12.5', unit: 'g/dL', status: 'Normal' },
                      { name: 'WBC', value: '6.2', unit: '10³/µL', status: 'Normal' },
                      { name: 'Platelets', value: '185', unit: '10³/µL', status: 'Normal' },
                      { name: 'Creatinine', value: '0.9', unit: 'mg/dL', status: 'Normal' },
                    ].map((lab, i) => (
                      <Paper 
                        key={i} 
                        variant="outlined" 
                        sx={{ 
                          flex: 1, 
                          p: 1.5, 
                          borderRadius: 2, 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          minWidth: 0
                        }}
                      >
                        <Box sx={{ minWidth: 0 }}>
                          <Typography variant="caption" color="text.secondary" display="block" noWrap>{lab.name}</Typography>
                          <Typography variant="subtitle2" fontWeight={600} noWrap>
                            {lab.value} <Typography component="span" variant="caption" color="text.secondary">{lab.unit}</Typography>
                          </Typography>
                        </Box>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main', flexShrink: 0, ml: 1 }} />
                      </Paper>
                    ))}
                  </Box>
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

          </Grid>
        </Grid>


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
