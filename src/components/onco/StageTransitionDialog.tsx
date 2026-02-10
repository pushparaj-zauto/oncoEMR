import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
  Alert,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { OncoStatus } from '../../types/oncology';

interface StageTransitionDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentStage: OncoStatus;
  targetStage: OncoStatus;
  patientName: string;
  details?: string;
  variant?: 'default' | 'warning' | 'success';
}

const getStageColor = (stage: OncoStatus): string => {
  switch (stage) {
    case 'Diagnostic Evaluation': return '#ff9800';
    case 'Treatment Planning': return '#2196f3';
    case 'Induction': return '#7c4dff';
    case 'Consolidation': return '#7c4dff';
    case 'Response Assessment': return '#e91e63';
    case 'Maintenance': return '#4caf50';
    case 'Observation': return '#009688';
    case 'Palliative': return '#00bcd4';
    case 'Discharged': return '#9e9e9e';
    default: return '#7c4dff';
  }
};

export default function StageTransitionDialog({
  open,
  onClose,
  onConfirm,
  currentStage,
  targetStage,
  patientName,
  details,
  variant = 'default',
}: StageTransitionDialogProps) {
  const variantConfig = {
    default: { color: 'primary' as const, icon: <ArrowForwardIcon />, severity: 'info' as const },
    warning: { color: 'warning' as const, icon: <WarningAmberIcon />, severity: 'warning' as const },
    success: { color: 'success' as const, icon: <CheckCircleIcon />, severity: 'success' as const },
  };
  const config = variantConfig[variant];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" fontWeight={700}>
          Confirm Stage Transition
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Alert severity={config.severity} sx={{ mb: 3, borderRadius: 2 }}>
          You are about to transition <strong>{patientName}</strong> to a new clinical stage.
        </Alert>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            py: 3,
            px: 2,
            bgcolor: 'grey.50',
            borderRadius: 2,
            mb: 2,
          }}
        >
          <Chip
            label={currentStage}
            sx={{
              fontWeight: 700,
              bgcolor: alpha(getStageColor(currentStage), 0.15),
              color: getStageColor(currentStage),
              border: '1px solid',
              borderColor: alpha(getStageColor(currentStage), 0.3),
              fontSize: '0.8rem',
              px: 1,
            }}
          />
          <ArrowForwardIcon sx={{ color: 'text.secondary' }} />
          <Chip
            label={targetStage}
            sx={{
              fontWeight: 700,
              bgcolor: alpha(getStageColor(targetStage), 0.15),
              color: getStageColor(targetStage),
              border: '2px solid',
              borderColor: getStageColor(targetStage),
              fontSize: '0.8rem',
              px: 1,
            }}
          />
        </Box>

        {details && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              {details}
            </Typography>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} color="inherit" variant="outlined" sx={{ borderRadius: 2 }}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color={config.color}
          startIcon={config.icon}
          sx={{ borderRadius: 2, fontWeight: 600, px: 3 }}
        >
          Confirm Transition
        </Button>
      </DialogActions>
    </Dialog>
  );
}
