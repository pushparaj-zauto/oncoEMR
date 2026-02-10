import { Box, Button, Fab } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import ChatIcon from '@mui/icons-material/Chat';
import LayersIcon from '@mui/icons-material/Layers';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';

const outlinedFabSx = {
  bgcolor: 'white',
  border: '2px solid',
  borderColor: 'primary.main',
  color: 'primary.main',
  width: 36,
  height: 36,
  minHeight: 36,
  '&:hover': { bgcolor: 'grey.50' },
} as const;

interface ActionFooterProps {
  /** Label for the primary action button */
  primaryLabel: string;
  /** Click handler for the primary action button */
  onPrimaryClick?: () => void;
  /** Whether to disable the primary button */
  primaryDisabled?: boolean;
  /** Optional start icon for the primary button */
  primaryStartIcon?: React.ReactNode;
  /** Optional end icon for the primary button */
  primaryEndIcon?: React.ReactNode;
  /** Override color for the primary button ('primary' | 'success' etc.) */
  primaryColor?: 'primary' | 'success' | 'error' | 'warning' | 'info';
  /** Custom sx overrides for the primary button */
  primarySx?: object;
}

export default function ActionFooter({
  primaryLabel,
  onPrimaryClick,
  primaryDisabled,
  primaryStartIcon = <Box component="span" sx={{ fontSize: '0.9rem' }}>✓</Box>,
  primaryEndIcon,
  primaryColor = 'primary',
  primarySx,
}: ActionFooterProps) {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        py: 0.75,
        px: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      {/* Left side placeholder */}
      <Box />

      {/* Right side - Action buttons + Primary CTA + Home */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        {/* Mic */}
        <Fab size="small" sx={outlinedFabSx}>
          <MicIcon sx={{ fontSize: '1rem' }} />
        </Fab>

        {/* Rx */}
        <Fab size="small" sx={outlinedFabSx}>
          <Box sx={{ fontWeight: 700, fontSize: '0.75rem' }}>Rx</Box>
        </Fab>

        {/* Layers */}
        <Fab size="small" sx={outlinedFabSx}>
          <LayersIcon sx={{ fontSize: '1rem' }} />
        </Fab>

        {/* Chat */}
        <Fab size="small" sx={outlinedFabSx}>
          <ChatIcon sx={{ fontSize: '1rem' }} />
        </Fab>

        {/* More */}
        <Fab size="small" sx={outlinedFabSx}>
          <MoreHorizIcon sx={{ fontSize: '1rem' }} />
        </Fab>

        {/* Primary CTA */}
        <Button
          variant="contained"
          color={primaryColor}
          size="small"
          disabled={primaryDisabled}
          startIcon={primaryStartIcon}
          endIcon={primaryEndIcon}
          onClick={onPrimaryClick}
          sx={{
            px: 2,
            py: 0.5,
            fontWeight: 600,
            borderRadius: 1.5,
            textTransform: 'none',
            fontSize: '0.8rem',
            ...primarySx,
          }}
        >
          {primaryLabel}
        </Button>

        {/* Home */}
        <Fab color="primary" size="small" sx={{ width: 36, height: 36, minHeight: 36 }}>
          <HomeIcon sx={{ fontSize: '1rem' }} />
        </Fab>
      </Box>
    </Box>
  );
}
