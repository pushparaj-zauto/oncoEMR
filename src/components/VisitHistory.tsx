import {
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  Divider,
  IconButton,
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Visit } from '../types';

interface VisitHistoryProps {
  visits: Visit[];
}

export default function VisitHistory({ visits }: VisitHistoryProps) {
  return (
    <Paper elevation={1} sx={{ p: 1.5, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <HistoryIcon sx={{ color: 'primary.main', fontSize: '1.25rem' }} />
          <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: '1rem', color: 'text.primary' }}>
            Past Visit History
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
            {visits.length} visit{visits.length !== 1 ? 's' : ''}
          </Typography>
          <IconButton size="small">
            <RefreshIcon sx={{ fontSize: '1.1rem' }} />
          </IconButton>
        </Box>
      </Box>

      {visits.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
            No past visits available
          </Typography>
        </Box>
      ) : (
        visits.map((visit, index) => (
          <Box key={visit.id}>
            {index > 0 && <Divider sx={{ my: 2 }} />}
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Box>
                  <Typography variant="body1" fontWeight={600} sx={{ fontSize: '0.95rem', color: 'text.primary' }}>
                    {visit.date} {visit.time}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: '0.875rem' }}>
                    Provider: {visit.provider}
                  </Typography>
                </Box>
                <Chip label={visit.type} size="small" variant="outlined" sx={{ fontSize: '0.75rem', height: 24, fontWeight: 500 }} />
              </Box>

              {visit.vitalSigns && (
                <Box sx={{ mt: 1.5, mb: 1.5 }}>
                  <Typography variant="body2" fontWeight={600} sx={{ mb: 0.75, fontSize: '0.875rem', color: 'text.primary' }}>
                    Vital Signs
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        Height
                      </Typography>
                      <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.875rem' }}>
                        {visit.vitalSigns.height} {visit.vitalSigns.heightUnit}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        Weight
                      </Typography>
                      <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.875rem' }}>
                        {visit.vitalSigns.weight} {visit.vitalSigns.weightUnit}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}

              <Box sx={{ display: 'flex', gap: 1, mt: 1.5, flexWrap: 'wrap' }}>
                <Button size="small" variant="outlined" startIcon={<VisibilityIcon sx={{ fontSize: '1rem' }} />} sx={{ fontSize: '0.8rem', py: 0.5, color: 'primary.main', borderColor: 'primary.main' }}>
                  View Details
                </Button>
                <Button size="small" variant="outlined" startIcon={<DescriptionIcon sx={{ fontSize: '1rem' }} />} sx={{ fontSize: '0.8rem', py: 0.5, color: 'primary.main', borderColor: 'primary.main' }}>
                  View Note
                </Button>
                <Button size="small" variant="outlined" startIcon={<AssessmentIcon sx={{ fontSize: '1rem' }} />} sx={{ fontSize: '0.8rem', py: 0.5, color: 'primary.main', borderColor: 'primary.main' }}>
                  Report
                </Button>
              </Box>
            </Box>
          </Box>
        ))
      )}
    </Paper>
  );
}
