import { Typography, Box, Button, Tabs, Tab } from '@mui/material';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AddIcon from '@mui/icons-material/Add';
import { VitalSigns } from '../types';

interface VitalsProps {
  vitals?: VitalSigns;
}

export default function Vitals({ vitals }: VitalsProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MonitorHeartIcon sx={{ color: 'primary.main', fontSize: '1.25rem' }} />
          <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: '1rem', color: 'text.primary' }}>
            Vitals
          </Typography>
        </Box>
        <Box>
          <Tabs value={0} sx={{ minHeight: 32 }}>
            <Tab label="TRENDS" sx={{ minHeight: 32, py: 0.5, px: 2, fontSize: '0.75rem', fontWeight: 600, color: 'primary.main' }} />
            <Tab label="HISTORY" sx={{ minHeight: 32, py: 0.5, px: 2, fontSize: '0.75rem' }} />
          </Tabs>
        </Box>
      </Box>

      {!vitals ? (
        <Box sx={{ textAlign: 'center', py: 2.5, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
            No vitals data available for this visit.
          </Typography>
          <Button variant="outlined" startIcon={<AddIcon />} size="small" sx={{ fontSize: '0.8rem', py: 0.5 }}>
            Add Vitals
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              Height
            </Typography>
            <Typography variant="body1" fontWeight={600} sx={{ fontSize: '0.95rem', color: 'text.primary' }}>
              {vitals.height} {vitals.heightUnit}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              Weight
            </Typography>
            <Typography variant="body1" fontWeight={600} sx={{ fontSize: '0.95rem', color: 'text.primary' }}>
              {vitals.weight} {vitals.weightUnit}
            </Typography>
          </Box>
          {vitals.temperature && (
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                Temperature
              </Typography>
              <Typography variant="body1" fontWeight={600} sx={{ fontSize: '0.95rem', color: 'text.primary' }}>
                {vitals.temperature}°F
              </Typography>
            </Box>
          )}
          {vitals.bloodPressure && (
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                Blood Pressure
              </Typography>
              <Typography variant="body1" fontWeight={600} sx={{ fontSize: '0.95rem', color: 'text.primary' }}>
                {vitals.bloodPressure}
              </Typography>
            </Box>
          )}
          {vitals.heartRate && (
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                Heart Rate
              </Typography>
              <Typography variant="body1" fontWeight={600} sx={{ fontSize: '0.95rem', color: 'text.primary' }}>
                {vitals.heartRate} bpm
              </Typography>
            </Box>
          )}
          {vitals.respiratoryRate && (
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                Respiratory Rate
              </Typography>
              <Typography variant="body1" fontWeight={600} sx={{ fontSize: '0.95rem', color: 'text.primary' }}>
                {vitals.respiratoryRate} /min
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
