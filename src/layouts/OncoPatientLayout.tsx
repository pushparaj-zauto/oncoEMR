import { useRef, useEffect } from 'react';
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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [location.pathname]);
  
  const patient = allPatients.find(p => p.id === patientId);

  if (!patient) {
    return <Box sx={{ p: 4 }}>Patient not found</Box>;
  }

  const menuItems = [
    { label: 'Patient Summary', icon: <MonitorHeartIcon />, path: 'summary', color: '#e91e63' },
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
        <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <IconButton onClick={() => navigate('/onco')} size="small" sx={{ mb: 2, color: 'text.secondary', ml: -1 }}>
              <ArrowBackIcon fontSize="small" />
          </IconButton>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Avatar 
              sx={{ 
                bgcolor: 'primary.main', 
                width: 52, 
                height: 52, 
                fontSize: '1.25rem', 
                boxShadow: 3,
                fontWeight: 600
              }}
            >
              {patient.name.replace(/^(Mr|Mrs|Ms|Dr|Miss|Master)\.?\s+/i, "").charAt(0)}
            </Avatar>
            
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.1, mb: 0.5, fontSize: '1rem' }}>
                {patient.name}
              </Typography>
              
              <Box sx={{ mb: 0.5 }}>
                 <Box sx={{ 
                  bgcolor: 'grey.50', 
                  px: 0.75, 
                  py: 0, 
                  borderRadius: 0.5, 
                  border: '1px solid', 
                  borderColor: 'grey.200',
                  display: 'inline-block'
                }}>
                   <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.65rem' }}>
                      ID {patient.mrn}
                   </Typography>
                </Box>
              </Box>

              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 400, display: 'block', mb: 0.5 }}>
                  {patient.age}y • {patient.gender}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                 <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main', fontSize: '0.8rem' }}>
                  {patient.cancerSite}
                </Typography>
                <Chip 
                  label={`Stage ${patient.stage}`} 
                  size="small" 
                  sx={{ 
                    height: 18, 
                    fontSize: '0.6rem', 
                    fontWeight: 600,
                    bgcolor: 'error.lighter',
                    color: 'error.main',
                    borderRadius: 1
                  }} 
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Navigation Menu */}
        <List sx={{ px: 2, py: 2, flexGrow: 1 }}>
          <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, pl: 2, mb: 1, display: 'block' }}>
            Clinical Journey
          </Typography>
          {menuItems.map((item) => {
             const isActive = location.pathname.includes(item.path);

             // Logic to determine if this step is accessible for this patient
             let isAccessible = true;
             
             // Base foundation (always available)
             if (item.path === 'summary' || item.path === 'diagnostic') {
               isAccessible = true;
             }
             
             // Palliative View (Mutually exclusive mostly)
             else if (patient.oncoStatus === 'Palliative') {
                isAccessible = item.path === 'palliative';
             }
             
             // Standard Curative/Control Journey
             else {
               // Hide Palliative tab for non-palliative patients
               if (item.path === 'palliative') return null;

               // Progressive Unlocking
               switch (patient.oncoStatus) {
                 case 'Discharged':
                 case 'Diagnostic Evaluation':
                   // Only Summary & Diagnostic allowed
                   isAccessible = false; // logic handled by base foundation check above
                   break;
                   
                 case 'Treatment Planning':
                   isAccessible = item.path === 'planning';
                   break;
                   
                 case 'Induction':
                 case 'Consolidation':
                   // Can see Planning & Chemo
                   isAccessible = item.path === 'planning' || item.path === 'chemo';
                   break;
                   
                 case 'Maintenance':
                   // Can see everything including Maintenance (e.g. Oral Chemo)
                   isAccessible = true;
                   break;

                 case 'Observation':
                   // Survivorship/Remission - Block Planning/Chemo, show Maintenance(Surveillance)
                   isAccessible = item.path === 'maintenance';
                   break;
                   
                 default:
                   isAccessible = false;
               }
             }

             if (!isAccessible) return null;

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
                  <ListItemIcon sx={{ minWidth: 40, color: isActive ? item.color : 'text.secondary' }}>
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
      <Box ref={scrollRef} sx={{ flexGrow: 1, overflow: 'auto', p: 0, position: 'relative' }}>
         {/* This Outlet renders the child routes (Diagnostic, Planning, etc.) */}
         <Outlet context={{ hideContextBar: true }} /> 
      </Box>
    </Box>
  );
}
