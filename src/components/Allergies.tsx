import { Paper, Typography, Box, IconButton, Button } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AddIcon from '@mui/icons-material/Add';
import { Allergy } from '../types';

interface AllergiesProps {
  allergies: Allergy[];
}

export default function Allergies({ allergies }: AllergiesProps) {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningAmberIcon sx={{ color: 'warning.main', fontSize: '1.25rem' }} />
          <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: '1rem', color: 'text.primary' }}>
            Allergies
          </Typography>
        </Box>
        <IconButton size="small" color="primary">
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ bgcolor: '#fff8e1', p: 1.5, borderRadius: 1, border: '1px solid #ffe082' }}>
        <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5, fontSize: '0.875rem', color: 'text.primary' }}>
          Drug Allergies:
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', mb: 1.5 }}>
          {allergies.length === 0 ? 'No known drug allergies' : allergies.map(a => a.name).join(', ')}
        </Typography>
        <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5, fontSize: '0.875rem', color: 'text.primary' }}>
          Food Allergies:
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
          None
        </Typography>
      </Box>
    </Box>
  );
}
