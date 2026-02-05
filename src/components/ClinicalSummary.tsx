import { Paper, Typography, Box, Button, TextField } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

export default function ClinicalSummary() {
  return (
    <Paper elevation={1} sx={{ p: 1.5, mb: 2, minHeight: 180 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography variant="h6" fontWeight={600}>
          Clinical Summary
        </Typography>
        <Button variant="outlined" size="small" startIcon={<NoteAddIcon />}>
          Add Notes
        </Button>
      </Box>

      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          No clinical summary data available for this visit.
        </Typography>
      </Box>
    </Paper>
  );
}
