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
      <Toolbar sx={{ gap: 2 }}>
        <IconButton edge="start" color="inherit">
          <MenuIcon />
        </IconButton>

        <Button
          startIcon={<HomeIcon />}
          sx={{ color: 'primary.main', textTransform: 'none' }}
        >
          Home
        </Button>

        <TextField
          placeholder="Search patient..."
          size="small"
          sx={{ width: 200 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" sx={{ bgcolor: 'primary.main', color: 'white', p: 0.5 }}>
                  <SearchIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          sx={{ textTransform: 'none' }}
        >
          Add Patient
        </Button>

        <Typography variant="body2" color="text.secondary">
          Hospital
        </Typography>

        <TextField
          placeholder="Search orga"
          size="small"
          sx={{ width: 150 }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <AccountBalanceWalletIcon sx={{ fontSize: 20, color: 'primary.main' }} />
          <Typography variant="body2" color="primary.main" fontWeight={600}>
            Credits: 100,517
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="body2">Admin</Typography>
          <Switch size="small" />
        </Box>

        <IconButton>
          <CalendarTodayIcon />
        </IconButton>

        <IconButton>
          <RefreshIcon />
        </IconButton>

        <IconButton>
          <NotificationsIcon />
        </IconButton>

        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>A</Avatar>
      </Toolbar>
    </AppBar>
  );
}
