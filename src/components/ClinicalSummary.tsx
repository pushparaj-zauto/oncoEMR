import { Paper, Typography, Box, Button } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

export default function ClinicalSummary() {
  return (
    <Paper elevation={1} sx={{ p: 1.5, mb: 2, minHeight: 160 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: '1rem', color: 'text.primary' }}>
          Clinical Summary
        </Typography>
        <Button variant="outlined" size="small" startIcon={<NoteAddIcon sx={{ fontSize: '1rem' }} />} sx={{ fontSize: '0.8rem', py: 0.5, color: 'primary.main', borderColor: 'primary.main' }}>
          Add Notes
        </Button>
      </Box>

      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
          No clinical summary data available for this visit.
        </Typography>
      </Box>
    </Paper>
  );
}
