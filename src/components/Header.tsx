import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Switch,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import RefreshIcon from '@mui/icons-material/Refresh';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Header() {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: 'white',
        color: 'text.primary',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar sx={{ gap: 1.5, minHeight: 56 }}>
        <IconButton edge="start" color="inherit" size="small">
          <MenuIcon fontSize="small" />
        </IconButton>

        <Button
          startIcon={<HomeIcon fontSize="small" />}
          sx={{ 
            color: 'primary.main', 
            textTransform: 'none',
            fontSize: '0.813rem',
            fontWeight: 400,
            px: 1
          }}
        >
          Home
        </Button>

        <TextField
          placeholder="Search patient..."
          size="small"
          sx={{ 
            width: 180,
            '& .MuiInputBase-root': {
              fontSize: '0.813rem',
              height: 36
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" sx={{ bgcolor: 'primary.main', color: 'white', p: 0.5, mr: -0.5 }}>
                  <SearchIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          startIcon={<PersonAddIcon sx={{ fontSize: 18 }} />}
          sx={{ 
            textTransform: 'none',
            fontSize: '0.813rem',
            fontWeight: 500,
            px: 2,
            py: 0.5,
            boxShadow: 1
          }}
        >
          Add Patient
        </Button>

        <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
          Hospital
        </Typography>

        <TextField
          placeholder="Search orga"
          size="small"
          sx={{ 
            width: 140,
            '& .MuiInputBase-root': {
              fontSize: '0.813rem',
              height: 36
            }
          }}
        />

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <AccountBalanceWalletIcon sx={{ fontSize: 18, color: 'primary.main' }} />
          <Typography variant="caption" color="primary.main" fontWeight={600}>
            Credits: 100,517
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="caption" fontSize="0.75rem">Admin</Typography>
          <Switch size="small" />
        </Box>

        <IconButton size="small">
          <CalendarTodayIcon fontSize="small" />
        </IconButton>

        <IconButton size="small">
          <RefreshIcon fontSize="small" />
        </IconButton>

        <IconButton size="small">
          <NotificationsIcon fontSize="small" />
        </IconButton>

        <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main', fontSize: '0.875rem' }}>A</Avatar>
      </Toolbar>
    </AppBar>
  );
}
