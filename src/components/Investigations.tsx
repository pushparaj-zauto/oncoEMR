import { Paper, Typography, Box, Chip, IconButton } from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import MicIcon from '@mui/icons-material/Mic';
import PrintIcon from '@mui/icons-material/Print';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Investigation } from '../types';

interface InvestigationsProps {
  investigations: Investigation[];
}

export default function Investigations({ investigations }: InvestigationsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ordered':
        return 'warning';
      case 'In Progress':
        return 'info';
      case 'Completed':
        return 'success';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Paper elevation={1} sx={{ p: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ScienceIcon sx={{ color: 'primary.main', fontSize: '1.25rem' }} />
          <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: '1rem', color: 'text.primary' }}>
            Investigations
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.75 }}>
          <IconButton size="small" color="primary">
            <MicIcon sx={{ fontSize: '1.2rem' }} />
          </IconButton>
          <IconButton size="small" color="primary">
            <PrintIcon sx={{ fontSize: '1.2rem' }} />
          </IconButton>
        </Box>
      </Box>

      {investigations.map((inv) => (
        <Box
          key={inv.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 1.5,
            mb: 1,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            '&:hover': {
              bgcolor: 'action.hover',
              borderColor: 'primary.light',
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body1" fontWeight={600} sx={{ fontSize: '0.95rem', color: 'text.primary' }}>
              {inv.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
              Ordered: {inv.orderedDate}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip
              label={inv.status}
              color={getStatusColor(inv.status)}
              size="small"
              sx={{ fontSize: '0.75rem', height: 24, fontWeight: 600 }}
              icon={
                inv.status === 'Completed' ? (
                  <CheckCircleIcon sx={{ fontSize: '1rem' }} />
                ) : inv.status === 'Cancelled' ? (
                  <CancelIcon sx={{ fontSize: '1rem' }} />
                ) : undefined
              }
            />
          </Box>
        </Box>
      ))}

      {investigations.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
            No investigations ordered
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
