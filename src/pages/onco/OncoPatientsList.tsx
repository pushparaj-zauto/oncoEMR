import { Box, Container, Typography, Grid, Paper, Chip, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { allPatients } from '../../data/oncologyMockData';
import { OncologyPatient } from '../../types/oncology';

export default function OncoPatientsList() {
  const navigate = useNavigate();

  const patients: OncologyPatient[] = allPatients;

  const getRouteForPatient = (patient: OncologyPatient): string => {
    switch (patient.oncoStatus) {
      case 'Diagnostic Evaluation':
        return `/onco/patient-view/${patient.id}/diagnostic`;
      case 'Treatment Planning':
        return `/onco/patient-view/${patient.id}/planning`;
      case 'Induction':
      case 'Consolidation':
        return `/onco/patient-view/${patient.id}/chemo`;
      case 'Maintenance':
        return `/onco/patient-view/${patient.id}/maintenance`;
      case 'Palliative':
        return `/onco/patient-view/${patient.id}/palliative`;
      case 'Discharged':
        return `/onco/patient-view/${patient.id}/diagnostic`; // Or a specific discharge summary page if it exists, otherwise diagnostic/summary default
      default:
        return `/onco/patient-view/${patient.id}/diagnostic`;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Diagnostic Evaluation':
        return 'warning';
      case 'Treatment Planning':
        return 'info';
      case 'Induction':
      case 'Consolidation':
        return 'primary';
      case 'Maintenance':
        return 'success';
      case 'Palliative':
        return 'secondary';
      case 'Discharged':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main', mb: 0.5 }}>
            Oncology EMR
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Select a patient to view their oncology journey
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {patients.map((patient) => (
            <Grid item xs={12} key={patient.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    transition: 'all 0.2s',
                  },
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  {/* Patient Info */}
                  <Grid item xs={12} md={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <PersonIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {patient.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                      {patient.age} years • {patient.gender}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      MRN: {patient.mrn}
                    </Typography>
                  </Grid>

                  {/* Cancer Details */}
                  <Grid item xs={12} md={3}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, fontSize: '0.875rem' }}>
                      {patient.cancerSite} Cancer
                    </Typography>
                    {patient.histology && (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: '0.813rem' }}>
                        {patient.histology}
                      </Typography>
                    )}
                    {patient.stage && (
                      <Chip 
                        label={`Stage ${patient.stage}`} 
                        size="small" 
                        variant="outlined"
                        sx={{ 
                          mt: 0.5,
                          borderColor: 'error.main',
                          color: 'error.main',
                          fontWeight: 500,
                          fontSize: '0.75rem'
                        }} 
                      />
                    )}
                  </Grid>

                  {/* Status */}
                  <Grid item xs={12} md={2}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 500 }}>
                      OncoStatus
                    </Typography>
                    <Chip
                      label={patient.oncoStatus}
                      color={getStatusColor(patient.oncoStatus)}
                      size="small"
                      sx={{ fontWeight: 500, fontSize: '0.75rem' }}
                    />
                  </Grid>

                  {/* Intent */}
                  <Grid item xs={12} md={2}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 500 }}>
                      Treatment Intent
                    </Typography>
                    {patient.treatmentIntent ? (
                      <Chip
                        label={patient.treatmentIntent}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: patient.treatmentIntent === 'Curative' ? 'success.main' : patient.treatmentIntent === 'Palliative' ? 'info.main' : 'warning.main',
                          color: patient.treatmentIntent === 'Curative' ? 'success.main' : patient.treatmentIntent === 'Palliative' ? 'info.main' : 'warning.main',
                          fontWeight: 500,
                          fontSize: '0.75rem'
                        }}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.813rem' }}>
                        Not Set
                      </Typography>
                    )}
                  </Grid>

                  {/* Action */}
                  <Grid item xs={12} md={2} sx={{ textAlign: 'right' }}>
                    <Button
                      variant="contained"
                      endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
                      onClick={() => navigate(getRouteForPatient(patient))}
                      size="small"
                      sx={{ fontWeight: 500, fontSize: '0.875rem', textTransform: 'none' }}
                    >
                      Open
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}
