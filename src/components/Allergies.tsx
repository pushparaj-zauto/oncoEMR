import { Paper, Typography, Box, IconButton, Button } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AddIcon from '@mui/icons-material/Add';
import { Allergy } from '../types';

interface AllergiesProps {
  allergies: Allergy[];
}

export default function Allergies({ allergies }: AllergiesProps) {
  return (
    <Paper elevation={1} sx={{ p: 1.5, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningAmberIcon sx={{ color: 'warning.main' }} />
          <Typography variant="h6" fontWeight={600}>
            Allergies
          </Typography>
        </Box>
        <IconButton size="small" color="primary">
          <AddIcon />
        </IconButton>
      </Box>

      <Box sx={{ bgcolor: '#fff8e1', p: 2, borderRadius: 1 }}>
        <Typography variant="body1" fontWeight={600} sx={{ mb: 0.5 }}>
          Drug Allergies:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {allergies.length === 0 ? 'No Known Drug Allergies' : allergies.map(a => a.name).join(', ')}
        </Typography>
      </Box>
    </Paper>
  );
}
