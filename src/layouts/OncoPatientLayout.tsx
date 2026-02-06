import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar, IconButton, Divider, Chip, Paper } from '@mui/material';
import { Outlet, useNavigate, useLocation, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import ScienceIcon from '@mui/icons-material/Science'; // Diagnostic
import AssignmentIcon from '@mui/icons-material/Assignment'; // Planning
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid'; // Chemo
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'; // Maintenance
import SpaIcon from '@mui/icons-material/Spa'; // Palliative
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'; // Vitals/Overview
import { allPatients } from '../data/oncologyMockData';

export default function OncoPatientLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { patientId } = useParams();
  
  const patient = allPatients.find(p => p.id === patientId);

  if (!patient) {
    return <Box sx={{ p: 4 }}>Patient not found</Box>;
  }

  const menuItems = [
    { label: 'Diagnostic Findings', icon: <ScienceIcon />, path: 'diagnostic', color: '#ff9800' },
    { label: 'Treatment Planning', icon: <AssignmentIcon />, path: 'planning', color: '#2196f3' },
    { label: 'Chemo Protocol', icon: <MedicationLiquidIcon />, path: 'chemo', color: '#7c4dff' },
    { label: 'Maintenance Review', icon: <VerifiedUserIcon />, path: 'maintenance', color: '#4caf50' },
    { label: 'Palliative Care', icon: <SpaIcon />, path: 'palliative', color: '#00bcd4' },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', bgcolor: '#f8f9fa' }}>
      {/* Side Navigation Panel */}
      <Paper 
        elevation={0}
        sx={{ 
          width: 280, 
          flexShrink: 0, 
          display: 'flex', 
          flexDirection: 'column',
          borderRight: '1px solid',
          borderColor: 'divider',
          bgcolor: 'white',
          zIndex: 1200
        }}
      >
        {/* Back Button & Header */}
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <IconButton onClick={() => navigate('/onco')} sx={{ mb: 1, color: 'text.secondary' }}>
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
              {patient.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                {patient.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {patient.age}y • {patient.gender}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip 
              label={`Stage ${patient.stage}`} 
              size="small" 
              sx={{ bgcolor: 'error.lighter', color: 'error.main', fontWeight: 600, fontSize: '0.7rem', height: 20 }} 
            />
            <Chip 
              label={patient.cancerSite} 
              size="small" 
              sx={{ bgcolor: 'primary.lighter', color: 'primary.main', fontWeight: 600, fontSize: '0.7rem', height: 20 }} 
            />
          </Box>
        </Box>

        {/* Navigation Menu */}
        <List sx={{ px: 2, py: 2, flexGrow: 1 }}>
          <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, pl: 2, mb: 1, display: 'block' }}>
            Clinical Journey
          </Typography>
          {menuItems.map((item) => {
             const isActive = location.pathname.includes(item.path);
             return (
              <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
                <ListItemButton 
                  onClick={() => navigate(item.path)}
                  selected={isActive}
                  sx={{ 
                    borderRadius: 2,
                    py: 1.5,
                    bgcolor: isActive ? `${item.color}15` : 'transparent',
                    color: isActive ? item.color : 'text.secondary',
                    '&.Mui-selected': {
                      bgcolor: `${item.color}15`,
                      color: item.color,
                      '&:hover': { bgcolor: `${item.color}25` }
                    },
                    '&:hover': {
                      bgcolor: 'action.hover',
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: isActive ? item.color : 'text.disabled' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label} 
                    primaryTypographyProps={{ 
                      fontSize: '0.875rem', 
                      fontWeight: isActive ? 600 : 500 
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'grey.50' }}>
            <Typography variant="caption" color="text.secondary" align="center" display="block">
                Onco EMR Patient View
            </Typography>
        </Box>
      </Paper>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 0, position: 'relative' }}>
         {/* This Outlet renders the child routes (Diagnostic, Planning, etc.) */}
         <Outlet context={{ hideContextBar: true }} /> 
      </Box>
    </Box>
  );
}
