import { Paper, Typography, Box, Chip, IconButton, Button } from '@mui/material';
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
    <Paper elevation={2} sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ScienceIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h6" fontWeight={600}>
            Investigations
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small" color="primary">
            <MicIcon />
          </IconButton>
          <IconButton size="small" color="primary">
            <PrintIcon />
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
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body1" fontWeight={600}>
              {inv.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Ordered: {inv.orderedDate}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip
              label={inv.status}
              color={getStatusColor(inv.status)}
              size="small"
              icon={
                inv.status === 'Completed' ? (
                  <CheckCircleIcon />
                ) : inv.status === 'Cancelled' ? (
                  <CancelIcon />
                ) : undefined
              }
            />
          </Box>
        </Box>
      ))}

      {investigations.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body2" color="text.secondary">
            No investigations ordered
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
