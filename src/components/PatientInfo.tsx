import { Box, Typography, Chip, Avatar, Divider, IconButton } from '@mui/material';
import { Patient, Visit } from '../types';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface PatientInfoProps {
  patient: Patient;
  currentVisit: Visit;
}

export default function PatientInfo({ patient, currentVisit }: PatientInfoProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Consultation':
        return 'success';
      case 'Scheduled':
        return 'info';
      case 'Completed':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
        <Avatar sx={{ width: 52, height: 52, bgcolor: 'primary.main', mr: 1.5 }}>
          <PersonIcon sx={{ fontSize: '1.5rem' }} />
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600, fontSize: '1.25rem' }}>
            {patient.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center', mt: 0.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <PersonIcon sx={{ fontSize: 14 }} />
              {patient.mrn}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
              • {patient.gender}, {patient.age}y
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PhoneIcon sx={{ fontSize: 14 }} />
            {patient.phone}
          </Typography>
        </Box>
        <IconButton size="small">
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>

      <Divider sx={{ my: 1.5 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1.5 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
            <CalendarTodayIcon sx={{ fontSize: 12 }} />
            Date:
          </Typography>
          <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.875rem' }}>
            {currentVisit.date}, {currentVisit.time}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
            Type:
          </Typography>
          <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.875rem' }}>
            {currentVisit.type}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
            Provider:
          </Typography>
          <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.875rem' }}>
            {currentVisit.provider}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 1.5 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.75, fontSize: '0.75rem', display: 'block' }}>
          Status:
        </Typography>
        <Chip
          label={currentVisit.status}
          color={getStatusColor(currentVisit.status)}
          size="small"
          sx={{ fontWeight: 600, fontSize: '0.75rem', height: 24 }}
        />
      </Box>
    </Box>
  );
}
