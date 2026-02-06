import { Box, Chip, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { OncologyPatient } from '../../types/oncology';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface PatientContextBarProps {
  patient: OncologyPatient;
}

export default function PatientContextBar({ patient }: PatientContextBarProps) {
  const navigate = useNavigate();

  const getIntentColor = (intent?: string) => {
    switch (intent) {
      case 'Curative': return 'success';
      case 'Disease Control': return 'warning';
      case 'Palliative': return 'info';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Diagnostic Evaluation': return 'warning';
      case 'Treatment Planning': return 'info';
      case 'Induction':
      case 'Consolidation': return 'primary';
      case 'Maintenance': return 'success';
      case 'Palliative': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'primary.dark',
        color: 'white',
        py: 1.5,
        px: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        boxShadow: 2,
      }}
    >
      <IconButton 
        onClick={() => navigate(-1)}
        sx={{ 
          color: 'inherit', 
          p: 0.5,
          border: '1px solid rgba(255,255,255,0.2)'
        }}
        aria-label="back"
      >
        <ArrowBackIcon />
      </IconButton>
      {/* Patient Demographics */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <PersonIcon />
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {patient.name} ({patient.age})
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          | MRN: {patient.mrn}
        </Typography>
      </Box>

      <Box sx={{ width: '1px', height: '24px', bgcolor: 'rgba(255,255,255,0.2)' }} />

      {/* Cancer Details */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LocalHospitalIcon />
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {patient.cancerSite} {patient.histology && `- ${patient.histology}`}
        </Typography>
        {patient.stage && (
          <Chip
            label={`Stage ${patient.stage}`}
            size="small"
            sx={{
              bgcolor: 'error.main',
              color: 'white',
              fontWeight: 500,
              height: 20,
              fontSize: '0.75rem'
            }}
          />
        )}
      </Box>

      <Box sx={{ width: '1px', height: '24px', bgcolor: 'rgba(255,255,255,0.2)' }} />

      {/* Treatment Intent */}
      {patient.treatmentIntent && (
        <>
          <Box>
            <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mb: 0.5 }}>
              Intent
            </Typography>
            <Chip
              label={patient.treatmentIntent.toUpperCase()}
              size="small"
              color={getIntentColor(patient.treatmentIntent)}
              sx={{ fontWeight: 600, height: 20, fontSize: '0.7rem' }}
            />
          </Box>
          <Box sx={{ width: '1px', height: '24px', bgcolor: 'rgba(255,255,255,0.2)' }} />
        </>
      )}

      {/* OncoStatus */}
      <Box>
        <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mb: 0.5 }}>
          OncoStatus
        </Typography>
        <Chip
          label={patient.oncoStatus.toUpperCase()}
          size="small"
          color={getStatusColor(patient.oncoStatus)}
          sx={{ fontWeight: 600, height: 20, fontSize: '0.7rem' }}
        />
      </Box>

      {/* ECOG Status */}
      <Box sx={{ ml: 'auto', textAlign: 'right' }}>
        <Typography variant="caption" sx={{ opacity: 0.7, display: 'block' }}>
          ECOG Performance
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
          {patient.ecogStatus}
        </Typography>
      </Box>
    </Box>
  );
}
