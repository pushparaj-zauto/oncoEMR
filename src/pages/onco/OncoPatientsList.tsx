import { Box, Container, Typography, Grid, Paper, Chip, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  mockOncoPatient1,
  mockOncoPatient2,
  mockOncoPatient3,
  mockOncoPatient4,
  mockOncoPatient5,
} from '../../data/oncologyMockData';
import { OncologyPatient } from '../../types/oncology';

export default function OncoPatientsList() {
  const navigate = useNavigate();

  const patients: OncologyPatient[] = [
    mockOncoPatient1,
    mockOncoPatient2,
    mockOncoPatient3,
    mockOncoPatient4,
    mockOncoPatient5,
  ];

  const getRouteForPatient = (patient: OncologyPatient): string => {
    switch (patient.oncoStatus) {
      case 'Diagnostic Evaluation':
        return `/onco/diagnostic/${patient.id}`;
      case 'Treatment Planning':
        return `/onco/planning/${patient.id}`;
      case 'Induction':
      case 'Consolidation':
        return `/onco/chemo/${patient.id}`;
      case 'Maintenance':
        return `/onco/maintenance/${patient.id}`;
      case 'Palliative':
        return `/onco/palliative/${patient.id}`;
      default:
        return `/onco/diagnostic/${patient.id}`;
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
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
            Oncology EMR
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Select a patient to view their oncology journey
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {patients.map((patient) => (
            <Grid item xs={12} key={patient.id}>
              <Paper
                sx={{
                  p: 3,
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s',
                  },
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  {/* Patient Info */}
                  <Grid item xs={12} md={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <PersonIcon sx={{ color: 'primary.main' }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {patient.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {patient.age} years • {patient.gender}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      MRN: {patient.mrn}
                    </Typography>
                  </Grid>

                  {/* Cancer Details */}
                  <Grid item xs={12} md={3}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {patient.cancerSite} Cancer
                    </Typography>
                    {patient.histology && (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        {patient.histology}
                      </Typography>
                    )}
                    {patient.stage && (
                      <Chip label={`Stage ${patient.stage}`} size="small" color="error" sx={{ mt: 0.5 }} />
                    )}
                  </Grid>

                  {/* Status */}
                  <Grid item xs={12} md={2}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      OncoStatus
                    </Typography>
                    <Chip
                      label={patient.oncoStatus}
                      color={getStatusColor(patient.oncoStatus)}
                      sx={{ fontWeight: 600 }}
                    />
                  </Grid>

                  {/* Intent */}
                  <Grid item xs={12} md={2}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      Treatment Intent
                    </Typography>
                    {patient.treatmentIntent ? (
                      <Chip
                        label={patient.treatmentIntent}
                        size="small"
                        color={
                          patient.treatmentIntent === 'Curative'
                            ? 'success'
                            : patient.treatmentIntent === 'Palliative'
                            ? 'info'
                            : 'warning'
                        }
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Not Set
                      </Typography>
                    )}
                  </Grid>

                  {/* Action */}
                  <Grid item xs={12} md={2} sx={{ textAlign: 'right' }}>
                    <Button
                      variant="contained"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => navigate(getRouteForPatient(patient))}
                      sx={{ fontWeight: 600 }}
                    >
                      Open
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Info Box */}
        <Paper sx={{ mt: 4, p: 3, bgcolor: 'info.light', border: '2px solid', borderColor: 'info.main' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'info.dark', mb: 2 }}>
            📋 Demo Patient Overview
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">
                • <strong>{mockOncoPatient1.name}:</strong> Diagnostic Evaluation stage
              </Typography>
              <Typography variant="body2">
                • <strong>{mockOncoPatient2.name}:</strong> Treatment Planning stage
              </Typography>
              <Typography variant="body2">
                • <strong>{mockOncoPatient3.name}:</strong> Active chemotherapy (Induction)
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">
                • <strong>{mockOncoPatient4.name}:</strong> Palliative care with chemo
              </Typography>
              <Typography variant="body2">
                • <strong>{mockOncoPatient5.name}:</strong> Maintenance therapy
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
