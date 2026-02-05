import { Paper, Typography, Box, Button, IconButton, Tabs, Tab } from '@mui/material';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AddIcon from '@mui/icons-material/Add';
import { VitalSigns } from '../types';

interface VitalsProps {
  vitals?: VitalSigns;
}

export default function Vitals({ vitals }: VitalsProps) {
  return (
    <Paper elevation={1} sx={{ p: 1.5, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MonitorHeartIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h6" fontWeight={600}>
            Vitals
          </Typography>
        </Box>
        <Box>
          <Tabs value={0} sx={{ minHeight: 36 }}>
            <Tab label="Trends" sx={{ minHeight: 36, py: 0.5, px: 2 }} />
            <Tab label="History" sx={{ minHeight: 36, py: 0.5, px: 2 }} />
          </Tabs>
        </Box>
      </Box>

      {!vitals ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            No vitals data available for this visit.
          </Typography>
          <Button variant="outlined" startIcon={<AddIcon />} size="small">
            Add Vitals
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Height
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {vitals.height} {vitals.heightUnit}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Weight
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {vitals.weight} {vitals.weightUnit}
            </Typography>
          </Box>
          {vitals.temperature && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                Temperature
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {vitals.temperature}°F
              </Typography>
            </Box>
          )}
          {vitals.bloodPressure && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                Blood Pressure
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {vitals.bloodPressure}
              </Typography>
            </Box>
          )}
          {vitals.heartRate && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                Heart Rate
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {vitals.heartRate} bpm
              </Typography>
            </Box>
          )}
          {vitals.respiratoryRate && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                Respiratory Rate
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {vitals.respiratoryRate} /min
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Paper>
  );
}
