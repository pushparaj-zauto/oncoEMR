import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonIcon from '@mui/icons-material/Person';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import WarningIcon from '@mui/icons-material/Warning';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const DRAWER_WIDTH = 220;

const menuSections = [
  {
    title: 'PATIENT MANAGEMENT',
    items: [
      { text: 'Patients', icon: <PeopleIcon />, path: '/patients' },
    ],
  },
  {
    title: 'VISITS',
    items: [
      { text: 'Out Patient', icon: <PersonIcon />, path: '/' },
      { text: 'Day Care Service', icon: <EventAvailableIcon />, path: '/day-care' },
      { text: 'In Patient', icon: <HotelIcon />, path: '/in-patient' },
      { text: 'Emergency', icon: <WarningIcon />, path: '/emergency' },
    ],
  },
  {
    title: 'BED MANAGEMENT',
    items: [
      { text: 'Beds', icon: <HotelIcon />, path: '/beds' },
    ],
  },
  {
    title: 'DOCTOR MANAGEMENT',
    items: [
      { text: 'Doctors', icon: <MedicalServicesIcon />, path: '/doctors' },
    ],
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          bgcolor: '#fafafa',
          borderRight: '1px solid #e0e0e0',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LocalHospitalIcon sx={{ color: 'white' }} />
        </Box>
      </Box>

      <Box sx={{ px: 2, mb: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Search menu...
        </Typography>
      </Box>

      <Divider />

      <List sx={{ pt: 0 }}>
        {menuSections.map((section) => (
          <Box key={section.title}>
            <ListItem sx={{ pt: 2, pb: 0.5 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                {section.title}
              </Typography>
            </ListItem>
            {section.items.map((item) => (
              <ListItemButton
                key={item.text}
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ fontSize: '0.875rem' }}
                />
              </ListItemButton>
            ))}
          </Box>
        ))}
      </List>

      <Box sx={{ mt: 'auto', p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Accounts
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          Reports
        </Typography>
      </Box>
    </Drawer>
  );
}
