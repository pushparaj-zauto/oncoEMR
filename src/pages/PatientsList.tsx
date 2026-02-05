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
  Alert,
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
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
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


  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2.5 }}>
        {/* Oncology EMR Alert */}
        <Alert 
          severity="info" 
          icon={<LocalHospitalIcon />}
          sx={{ mb: 2, cursor: 'pointer' }}
          onClick={() => navigate('/onco')}
          action={
            <Button 
              color="inherit" 
              size="small"
              sx={{ fontWeight: 600 }}
            >
              Open Oncology EMR →
            </Button>
          }
        >
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            🎯 New: Oncology EMR is now available with specialized cancer care workflows!
          </Typography>
        </Alert>

        {/* Page Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
          <CalendarTodayIcon sx={{ color: 'primary.main', fontSize: '1.5rem' }} />
          <Typography variant="h6" fontWeight={600} sx={{ color: 'primary.main', fontSize: '1.1rem' }}>
            OUT PATIENT VISITS
          </Typography>
          <Chip
            icon={<WarningIcon sx={{ fontSize: '0.9rem' }} />}
            label="23 Incomplete"
            color="warning"
            size="small"
            sx={{ height: 24, fontSize: '0.75rem', fontWeight: 600 }}
          />

          <Box sx={{ ml: 'auto', display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 110 }}>
              <Select defaultValue="all" displayEmpty sx={{ fontSize: '0.875rem', height: 36 }}>
                <MenuItem value="all" sx={{ fontSize: '0.875rem' }}>All</MenuItem>
                <MenuItem value="scheduled" sx={{ fontSize: '0.875rem' }}>Scheduled</MenuItem>
                <MenuItem value="consultation" sx={{ fontSize: '0.875rem' }}>In Consultation</MenuItem>
                <MenuItem value="completed" sx={{ fontSize: '0.875rem' }}>Completed</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select defaultValue="all" displayEmpty sx={{ fontSize: '0.875rem', height: 36 }}>
                <MenuItem value="all" sx={{ fontSize: '0.875rem' }}>All Doctors</MenuItem>
                <MenuItem value="jaganathan" sx={{ fontSize: '0.875rem' }}>Dr. Jaganathan</MenuItem>
                <MenuItem value="gunasekar" sx={{ fontSize: '0.875rem' }}>Dr. Gunasekar</MenuItem>
                <MenuItem value="ramesh" sx={{ fontSize: '0.875rem' }}>Dr. Ramesh</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small">
              <Select defaultValue="today" displayEmpty sx={{ fontSize: '0.875rem', height: 36 }}>
                <MenuItem value="today" sx={{ fontSize: '0.875rem' }}>Feb 5, 2026</MenuItem>
              </Select>
            </FormControl>

            <TextField
              placeholder="Search..."
              size="small"
              sx={{ 
                width: 170,
                '& .MuiInputBase-root': { height: 36, fontSize: '0.875rem' }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: '1rem' }} />
                  </InputAdornment>
                ),
              }}
            />

            <Button 
              variant="outlined" 
              size="small" 
              startIcon={<RefreshIcon sx={{ fontSize: '1rem' }} />}
              sx={{ fontSize: '0.8rem', py: 0.75, px: 1.5 }}
            >
              Reset
            </Button>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: '0.8rem', py: 1.25 }}>TOKEN</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: '0.8rem', py: 1.25 }}>UHID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: '0.8rem', py: 1.25 }}>PATIENT</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: '0.8rem', py: 1.25 }}>PHONE</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: '0.8rem', py: 1.25 }}>DOCTOR</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: '0.8rem', py: 1.25 }}>DATE & TIME</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: '0.8rem', py: 1.25 }}>STATUS</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: '0.8rem', py: 1.25 }}>ACTIONS</TableCell>
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
                  <TableCell sx={{ py: 1.5 }}>
                    <Chip
                      label={item.token}
                      color="primary"
                      sx={{ fontWeight: 600, minWidth: 32, height: 26, fontSize: '0.8rem' }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 1.5, fontSize: '0.875rem' }}>{item.patient.mrn}</TableCell>
                  <TableCell sx={{ py: 1.5 }}>
                    <Box>
                      <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.875rem', mb: 0.25 }}>
                        {item.patient.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                        <Chip
                          label={item.patient.gender}
                          size="small"
                          sx={{ 
                            height: 18, 
                            fontSize: '0.7rem', 
                            fontWeight: 500,
                            bgcolor: item.patient.gender === 'Male' ? '#E3F2FD' : '#FCE4EC',
                            color: item.patient.gender === 'Male' ? '#1976D2' : '#C2185B',
                            border: `1px solid ${item.patient.gender === 'Male' ? '#90CAF9' : '#F8BBD0'}`,
                          }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          {item.patient.age}yrs
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 1.5, fontSize: '0.875rem' }}>{item.patient.phone}</TableCell>
                  <TableCell sx={{ py: 1.5 }}>
                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.875rem', mb: 0.25 }}>
                      {item.currentVisit.provider}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                      M.B.B.S.,M.D Pediatrics ACLP Consultant P...
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 1.5, fontSize: '0.875rem' }}>
                    {item.currentVisit.date} {item.currentVisit.time}
                  </TableCell>
                  <TableCell sx={{ py: 1.5 }}>
                    <Chip
                      label={item.currentVisit.status.toUpperCase()}
                      size="small"
                      sx={{ 
                        fontWeight: 600, 
                        fontSize: '0.7rem', 
                        height: 24,
                        bgcolor: item.currentVisit.status === 'In Consultation' ? '#E3F2FD' : 
                                item.currentVisit.status === 'Scheduled' ? '#FFF3E0' : '#E8F5E9',
                        color: item.currentVisit.status === 'In Consultation' ? '#1976D2' : 
                               item.currentVisit.status === 'Scheduled' ? '#F57C00' : '#388E3C',
                        border: `1px solid ${item.currentVisit.status === 'In Consultation' ? '#90CAF9' : 
                                             item.currentVisit.status === 'Scheduled' ? '#FFB74D' : '#81C784'}`,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 1.5 }}>
                    <Box sx={{ display: 'flex', gap: 0.75 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate(`/patient/${item.patient.id}`)}
                        sx={{ fontSize: '0.75rem', py: 0.5, px: 1.25, textTransform: 'none', fontWeight: 500 }}
                      >
                        Visit Details
                      </Button>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuClick(e, item.patient.id)}
                        sx={{ width: 32, height: 32 }}
                      >
                        <MoreVertIcon sx={{ fontSize: '1.1rem' }} />
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
          <Box sx={{ display: 'flex', gap: 0.75 }}>
            <Button 
              variant="outlined" 
              size="small" 
              disabled 
              sx={{ 
                fontSize: '0.8rem', 
                py: 0.5, 
                minWidth: 70,
                '&.Mui-disabled': {
                  color: 'text.secondary',
                  borderColor: 'divider',
                }
              }}
            >
              Previous
            </Button>
            <Button variant="contained" size="small" sx={{ fontSize: '0.8rem', py: 0.5, minWidth: 36 }}>
              1
            </Button>
            <Button 
              variant="outlined" 
              size="small" 
              disabled 
              sx={{ 
                fontSize: '0.8rem', 
                py: 0.5, 
                minWidth: 60,
                '&.Mui-disabled': {
                  color: 'text.secondary',
                  borderColor: 'divider',
                }
              }}
            >
              Next
            </Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography variant="body2" sx={{ fontSize: '0.875rem', color: 'primary.main', fontWeight: 500 }}>Items per page:</Typography>
            <FormControl size="small">
              <Select value={20} sx={{ minWidth: 65, height: 32, fontSize: '0.875rem' }}>
                <MenuItem value={20} sx={{ fontSize: '0.875rem' }}>20</MenuItem>
                <MenuItem value={50} sx={{ fontSize: '0.875rem' }}>50</MenuItem>
                <MenuItem value={100} sx={{ fontSize: '0.875rem' }}>100</MenuItem>
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
        PaperProps={{
          sx: {
            boxShadow: 3,
            borderRadius: 1,
            minWidth: 180,
          }
        }}
      >
        <MenuItem onClick={handleVisitPad} sx={{ py: 1, fontSize: '0.875rem' }}>
          <DescriptionIcon sx={{ mr: 1.5, color: 'primary.main', fontSize: '1.2rem' }} />
          Visit Pad
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ py: 1, fontSize: '0.875rem' }}>
          <VisibilityIcon sx={{ mr: 1.5, color: 'primary.main', fontSize: '1.2rem' }} />
          View Visit
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ py: 1, fontSize: '0.875rem' }}>
          <FeedbackIcon sx={{ mr: 1.5, color: 'primary.main', fontSize: '1.2rem' }} />
          Feedback
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ py: 1, fontSize: '0.875rem' }}>
          <PersonIcon sx={{ mr: 1.5, color: 'primary.main', fontSize: '1.2rem' }} />
          Patient Case Taking
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ py: 1, fontSize: '0.875rem' }}>
          <HistoryIcon sx={{ mr: 1.5, color: 'primary.main', fontSize: '1.2rem' }} />
          Status Logs
        </MenuItem>
      </Menu>

      {/* Footer */}
      <Box
        sx={{
          py: 1,
          px: 2.5,
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ fontSize: '0.75rem' }}>
          Copyright © 2023-2025 ZautoAI. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
