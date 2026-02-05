import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Select,
  FormControl,
  TextField,
  InputAdornment,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WarningIcon from '@mui/icons-material/Warning';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FeedbackIcon from '@mui/icons-material/Feedback';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import { mockPatientsList } from '../data/mockData';

export default function PatientsList() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, patientId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedPatient(patientId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPatient(null);
  };

  const handleVisitPad = () => {
    if (selectedPatient) {
      navigate(`/patient/${selectedPatient}`);
    }
    handleMenuClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Consultation':
        return 'info';
      case 'Scheduled':
        return 'warning';
      case 'Completed':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 3 }}>
        {/* Page Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <CalendarTodayIcon sx={{ color: 'primary.main', fontSize: 28 }} />
          <Typography variant="h5" fontWeight={600} sx={{ color: 'primary.main' }}>
            OUT PATIENT VISITS
          </Typography>
          <Chip
            icon={<WarningIcon />}
            label="23 Incomplete"
            color="warning"
            size="small"
          />

          <Box sx={{ ml: 'auto', display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select defaultValue="all" displayEmpty>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="scheduled">Scheduled</MenuItem>
                <MenuItem value="consultation">In Consultation</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select defaultValue="all" displayEmpty>
                <MenuItem value="all">All Doctors</MenuItem>
                <MenuItem value="jaganathan">Dr. Jaganathan</MenuItem>
                <MenuItem value="gunasekar">Dr. Gunasekar</MenuItem>
                <MenuItem value="ramesh">Dr. Ramesh</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small">
              <Select defaultValue="today" displayEmpty>
                <MenuItem value="today">Feb 5, 2026</MenuItem>
              </Select>
            </FormControl>

            <TextField
              placeholder="Search..."
              size="small"
              sx={{ width: 180 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <Button variant="outlined" size="small" startIcon={<RefreshIcon />}>
              Reset
            </Button>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>TOKEN</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>UHID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>PATIENT</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>PHONE</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>DOCTOR</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>DATE & TIME</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>STATUS</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockPatientsList.map((item) => (
                <TableRow
                  key={item.patient.id}
                  sx={{
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  <TableCell>
                    <Chip
                      label={item.token}
                      color="primary"
                      sx={{ fontWeight: 600, minWidth: 40 }}
                    />
                  </TableCell>
                  <TableCell>{item.patient.mrn}</TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {item.patient.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mt: 0.5 }}>
                        <Chip
                          label={item.patient.gender}
                          size="small"
                          color="info"
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {item.patient.age}yrs
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{item.patient.phone}</TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {item.currentVisit.provider}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      M.B.B.S.,M.D Pediatrics ACLP Consultant P...
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {item.currentVisit.date} {item.currentVisit.time}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={item.currentVisit.status.toUpperCase()}
                      color={getStatusColor(item.currentVisit.status)}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate(`/patient/${item.patient.id}`)}
                      >
                        Visit Details
                      </Button>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuClick(e, item.patient.id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" size="small" disabled>
              Previous
            </Button>
            <Button variant="contained" size="small">
              1
            </Button>
            <Button variant="outlined" size="small" disabled>
              Next
            </Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography variant="body2">Items per page:</Typography>
            <FormControl size="small">
              <Select value={20} sx={{ minWidth: 70 }}>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleVisitPad}>
          <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} />
          Visit Pad
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <VisibilityIcon sx={{ mr: 1, color: 'primary.main' }} />
          View Visit
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <FeedbackIcon sx={{ mr: 1, color: 'primary.main' }} />
          Feedback
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
          Patient Case Taking
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <HistoryIcon sx={{ mr: 1, color: 'primary.main' }} />
          Status Logs
        </MenuItem>
      </Menu>

      {/* Footer */}
      <Box
        sx={{
          py: 1.5,
          px: 3,
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="caption" color="text.secondary" align="center" display="block">
          Copyright © 2023-2025 ZautoAI. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
