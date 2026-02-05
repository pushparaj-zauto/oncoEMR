import { Box, Chip, Typography } from '@mui/material';
import { OncologyPatient } from '../../types/oncology';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface PatientContextBarProps {
  patient: OncologyPatient;
}

export default function PatientContextBar({ patient }: PatientContextBarProps) {
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
      {/* Patient Demographics */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <PersonIcon />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {patient.name} ({patient.age})
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          | MRN: {patient.mrn}
        </Typography>
      </Box>

      <Box sx={{ width: '2px', height: '30px', bgcolor: 'rgba(255,255,255,0.3)' }} />

      {/* Cancer Details */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LocalHospitalIcon />
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {patient.cancerSite} {patient.histology && `- ${patient.histology}`}
        </Typography>
        {patient.stage && (
          <Chip
            label={`Stage ${patient.stage}`}
            size="small"
            sx={{
              bgcolor: 'error.main',
              color: 'white',
              fontWeight: 600,
            }}
          />
        )}
      </Box>

      <Box sx={{ width: '2px', height: '30px', bgcolor: 'rgba(255,255,255,0.3)' }} />

      {/* Treatment Intent */}
      {patient.treatmentIntent && (
        <>
          <Box>
            <Typography variant="caption" sx={{ opacity: 0.8, display: 'block' }}>
              Intent
            </Typography>
            <Chip
              label={patient.treatmentIntent.toUpperCase()}
              size="small"
              color={getIntentColor(patient.treatmentIntent)}
              sx={{ fontWeight: 600 }}
            />
          </Box>
          <Box sx={{ width: '2px', height: '30px', bgcolor: 'rgba(255,255,255,0.3)' }} />
        </>
      )}

      {/* OncoStatus */}
      <Box>
        <Typography variant="caption" sx={{ opacity: 0.8, display: 'block' }}>
          OncoStatus
        </Typography>
        <Chip
          label={patient.oncoStatus.toUpperCase()}
          size="small"
          color={getStatusColor(patient.oncoStatus)}
          sx={{ fontWeight: 600 }}
        />
      </Box>

      {/* ECOG Status */}
      <Box sx={{ ml: 'auto' }}>
        <Typography variant="caption" sx={{ opacity: 0.8, display: 'block' }}>
          ECOG Performance
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {patient.ecogStatus}
        </Typography>
      </Box>
    </Box>
  );
}
