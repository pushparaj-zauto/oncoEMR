import { Box, Paper, Typography, Chip, Avatar, Divider, IconButton } from '@mui/material';
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
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main', mr: 2 }}>
          <PersonIcon fontSize="large" />
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 600 }}>
            {patient.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              <PersonIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
              {patient.mrn}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • {patient.gender}, {patient.age}y
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            <PhoneIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
            {patient.phone}
          </Typography>
        </Box>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            <CalendarTodayIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
            Date:
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            {currentVisit.date}, {currentVisit.time}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Type:
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            {currentVisit.type}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Provider:
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            {currentVisit.provider}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Status:
        </Typography>
        <Chip
          label={currentVisit.status}
          color={getStatusColor(currentVisit.status)}
          size="small"
          sx={{ fontWeight: 500 }}
        />
      </Box>
    </Paper>
  );
}
