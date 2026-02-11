import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  Stack,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import MicIcon from '@mui/icons-material/Mic';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import { OncologyPatient } from '../../types/oncology';
import PatientContextBar from '../../components/onco/PatientContextBar';
import ActionFooter from '../../components/onco/ActionFooter';

/* ── Tiny icon buttons ── */
const MicButton = () => (
  <IconButton
    size="small"
    sx={{
      ml: 1,
      border: '1px solid',
      borderColor: 'primary.main',
      borderRadius: 1,
      p: 0.3,
      color: 'primary.main',
      '&:hover': { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08) },
    }}
  >
    <MicIcon sx={{ fontSize: 14 }} />
  </IconButton>
);

const EditButton = () => (
  <IconButton
    size="small"
    sx={{
      ml: 0.5,
      border: '1px solid',
      borderColor: 'grey.400',
      borderRadius: 1,
      p: 0.3,
      color: 'grey.500',
      '&:hover': { bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08) },
    }}
  >
    <EditIcon sx={{ fontSize: 13 }} />
  </IconButton>
);

/* ── Section header ── */
const SectionLabel = ({ label, warning = false }: { label: string; warning?: boolean }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
    <Typography
      variant="overline"
      sx={{
        fontWeight: 700,
        color: warning ? 'warning.dark' : 'primary.main',
        fontSize: '0.75rem',
        letterSpacing: 1.5,
        lineHeight: 1,
      }}
    >
      {label}
    </Typography>
    <MicButton />
    <EditButton />
  </Box>
);

/* ── Compact key-value row ── */
const KVRow = ({ label, value, chip }: { label: string; value?: React.ReactNode; chip?: React.ReactNode }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      py: 0.6,
      minHeight: 28,
    }}
  >
    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, minWidth: 100, flexShrink: 0 }}>
      {label}
    </Typography>
    {chip || (
      <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500, textAlign: 'right' }}>
        {value}
      </Typography>
    )}
  </Box>
);

interface MDTDiscussionProps {
  patient: OncologyPatient;
  hideContextBar?: boolean;
  onBack?: () => void;
  onProceedToPlanning?: () => void;
}

/* ── Role-based avatar colors ── */
const roleColors: Record<string, string> = {
  'Medical Oncology': '#7c4dff',
  'Surgical Oncology': '#e91e63',
  'Radiology': '#ff9800',
  'Pathology': '#00bcd4',
  Consensus: '#4caf50',
};

/* ── Build discussion thread from patient data ── */
function buildDiscussionNotes(patient: OncologyPatient) {
  const { cancerSite, stage, mdtDecision, treatmentStrategy } = patient;

  // Generic but clinically plausible notes per cancer site
  const notes: { role: string; speaker: string; text: string }[] = [];

  if (cancerSite === 'Breast') {
    notes.push(
      { role: 'Medical Oncology', speaker: 'Dr. Rao', text: `Stage ${stage} Invasive Ductal Carcinoma, ER+/PR+/HER2−. Recommend neoadjuvant chemotherapy (AC-T) to down-stage before surgery.` },
      { role: 'Surgical Oncology', speaker: 'Dr. Sarah', text: 'Agree with neoadjuvant approach. Tumour currently 5.5 cm — if good response, breast-conserving surgery may be feasible. Otherwise mastectomy.' },
      { role: 'Radiology', speaker: 'Radiologist', text: 'Baseline MRI shows no distant metastases. Axillary node appears reactive. Recommend post-op RT to chest wall and regional nodes.' },
      { role: 'Pathology', speaker: 'Pathologist', text: 'Ki-67 at 30 %, confirming Luminal B subtype. Oncotype DX may add value post-surgery for adjuvant hormone therapy duration.' },
    );
  } else if (cancerSite === 'Lung') {
    notes.push(
      { role: 'Medical Oncology', speaker: 'Dr. Rao', text: `Stage ${stage} NSCLC with mediastinal involvement. Molecular profiling pending — if EGFR/ALK positive, targeted therapy preferred.` },
      { role: 'Surgical Oncology', speaker: 'Dr. Sarah', text: 'Unlikely to be resectable given mediastinal disease and pleural effusion. Concurrent chemo-RT if confined, else systemic therapy.' },
      { role: 'Radiology', speaker: 'Radiologist', text: 'PET-CT shows avid mediastinal nodes and small pleural effusion. No brain mets on MRI. Recommend pleural fluid cytology for staging.' },
      { role: 'Pathology', speaker: 'Pathologist', text: 'Biopsy shows adenocarcinoma. IHC pending for TTF-1, ALK, PDL-1. EGFR mutation analysis sent.' },
    );
  } else if (cancerSite === 'Colon') {
    notes.push(
      { role: 'Surgical Oncology', speaker: 'Dr. Sarah', text: `Stage ${stage} sigmoid adenocarcinoma — hemicolectomy completed, margins clear, 3/15 LN positive.` },
      { role: 'Pathology', speaker: 'Pathologist', text: 'Moderately differentiated. MSS, RAS wild-type. No high-risk features beyond nodal involvement.' },
      { role: 'Medical Oncology', speaker: 'Dr. Rao', text: 'Adjuvant FOLFOX recommended for 6 months. Consider 3-month course per IDEA trial given low risk within Stage III.' },
      { role: 'Radiology', speaker: 'Radiologist', text: 'Post-op CT clean. CEA baseline normal. Surveillance imaging at 12 months.' },
    );
  } else if (cancerSite === 'Pancreas') {
    notes.push(
      { role: 'Radiology', speaker: 'Radiologist', text: `CT shows 3.8 cm head mass with vascular encasement. Liver metastases present. Stage ${stage}.` },
      { role: 'Surgical Oncology', speaker: 'Dr. Sarah', text: 'Unresectable given portal vein involvement and hepatic disease. Best supportive care or palliative chemo.' },
      { role: 'Medical Oncology', speaker: 'Dr. Rao', text: 'ECOG 1 — fit for Gemcitabine + nab-Paclitaxel. Goals of care discussion completed; patient opts for active treatment.' },
      { role: 'Pathology', speaker: 'Pathologist', text: 'EUS-FNA confirms adenocarcinoma. CA 19-9 markedly elevated at 1,450.' },
    );
  } else {
    // Generic fallback
    notes.push(
      { role: 'Medical Oncology', speaker: 'Dr. Rao', text: `Reviewed staging: ${stage}. Recommending systemic therapy as first modality.` },
      { role: 'Surgical Oncology', speaker: 'Dr. Sarah', text: 'Surgical input provided. Timing to be coordinated with medical oncology.' },
      { role: 'Pathology', speaker: 'Pathologist', text: 'Histopathology reviewed and confirmed.' },
    );
  }

  // Consensus line from MDT decision
  if (mdtDecision) {
    notes.push({
      role: 'Consensus',
      speaker: 'Board Consensus',
      text: mdtDecision.summary,
    });
  }

  return notes;
}

export default function MDTDiscussion({
  patient,
  hideContextBar,
  onBack,
  onProceedToPlanning,
}: MDTDiscussionProps) {
  const mdt = patient.mdtDecision;
  const discussionNotes = buildDiscussionNotes(patient);

  // Derive participants — prefer patient data, fallback to defaults
  const participants = mdt?.participants?.length
    ? mdt.participants.map((p) => {
        // Try extracting role from "(Role)" pattern
        const match = p.match(/^(.+?)\s*\((.+?)\)$/);
        return match ? { name: match[1].trim(), role: match[2].trim() } : { name: p, role: '' };
      })
    : [
        { name: 'Dr. Rao', role: 'Medical Oncology' },
        { name: 'Dr. Sarah', role: 'Surgical Oncology' },
        { name: 'Radiologist', role: 'Radiology' },
        { name: 'Pathologist', role: 'Pathology' },
      ];

  return (
    <Box sx={{ pb: 10 }}>
      {!hideContextBar && <PatientContextBar patient={patient} />}

      <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
        {/* ── Header ── */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
          <GroupsIcon sx={{ color: 'primary.main', fontSize: 24 }} />
          <Typography variant="h6" fontWeight={700} sx={{ fontSize: '1.1rem' }}>
            MDT Discussion — {patient.cancerSite} Cancer
          </Typography>
          {mdt && (
            <Chip
              label={mdt.status}
              size="small"
              color={mdt.status === 'Approved' ? 'success' : mdt.status === 'Modified' ? 'warning' : 'default'}
              icon={mdt.status === 'Approved' ? <CheckCircleIcon /> : undefined}
              sx={{ ml: 'auto', fontWeight: 600, height: 24 }}
            />
          )}
        </Box>

        {/* ═══════════════════════════════════════════════════════════════
            ROW 1 — Participants  |  Key Findings  |  Final Decision
        ═══════════════════════════════════════════════════════════════ */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1.2fr' },
            gap: 2.5,
            mb: 2.5,
          }}
        >
          {/* ── Participants ── */}
          <Box
            sx={{
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            <SectionLabel label="Participants" />
            <Stack spacing={1}>
              {participants.map((p, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      bgcolor: roleColors[p.role] || 'grey.500',
                    }}
                  >
                    {p.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.2, fontSize: '0.82rem' }}>
                      {p.name}
                    </Typography>
                    {p.role && (
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                        {p.role}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* ── Key Findings ── */}
          <Box
            sx={{
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            <SectionLabel label="Key Findings" />
            <KVRow label="Histopathology" value={patient.histology} />
            <KVRow
              label="Tumor Subtype"
              value={
                patient.cancerSite === 'Breast'
                  ? 'ER+, PR+, HER2−'
                  : patient.cancerSite === 'Lung'
                    ? 'EGFR Wild Type'
                    : patient.cancerSite === 'Colon'
                      ? 'MSS, RAS Wild-type'
                      : 'Standard'
              }
            />
            <KVRow
              label="Stage"
              chip={
                <Stack direction="row" spacing={0.5}>
                  <Chip label={patient.tnmStage || '—'} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
                  <Chip label={`Stage ${patient.stage}`} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
                </Stack>
              }
            />
          </Box>

          {/* ── Final Decision ── */}
          {mdt && (
            <Box
              sx={{
                p: 2,
                bgcolor: mdt.status === 'Approved'
                  ? (theme) => alpha(theme.palette.success.main, 0.04)
                  : 'background.paper',
                borderRadius: 2,
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              }}
            >
              <SectionLabel label="Final Decision" />
              <KVRow
                label="Status"
                chip={
                  <Chip
                    label={mdt.status}
                    size="small"
                    color={mdt.status === 'Approved' ? 'success' : 'warning'}
                    icon={mdt.status === 'Approved' ? <CheckCircleIcon /> : undefined}
                    sx={{ fontWeight: 600, height: 22, fontSize: '0.7rem' }}
                  />
                }
              />
              <KVRow label="Date" value={mdt.date} />
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, display: 'block', mb: 0.3, fontSize: '0.7rem' }}>
                  Final Plan Summary
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.5, fontSize: '0.82rem' }}>
                  {mdt.summary}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        {/* ═══════════════════════════════════════════════════════════════
            ROW 2 — Discussion Notes (full width)
        ═══════════════════════════════════════════════════════════════ */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ px: 2, pt: 2, pb: 1 }}>
            <SectionLabel label="Discussion Notes" />
          </Box>

          {discussionNotes.map((note, idx) => {
            const isConsensus = note.role === 'Consensus';
            return (
              <Box
                key={idx}
                sx={{
                  px: 2.5,
                  py: 1.5,
                  display: 'flex',
                  gap: 1.5,
                  alignItems: 'flex-start',
                  bgcolor: isConsensus
                    ? (theme) => alpha(theme.palette.success.main, 0.05)
                    : idx % 2 === 0
                      ? 'transparent'
                      : 'action.hover',
                  '&:hover': {
                    bgcolor: isConsensus
                      ? (theme) => alpha(theme.palette.success.main, 0.08)
                      : 'action.hover',
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    bgcolor: isConsensus
                      ? 'success.main'
                      : roleColors[note.role] || 'grey.400',
                    mt: 0.2,
                    flexShrink: 0,
                  }}
                >
                  {isConsensus ? '✓' : note.speaker.charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.2 }}>
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      color={isConsensus ? 'success.dark' : 'text.primary'}
                      sx={{ fontSize: '0.82rem' }}
                    >
                      {note.speaker}
                    </Typography>
                    <Chip
                      label={note.role}
                      size="small"
                      variant="outlined"
                      sx={{
                        height: 16,
                        fontSize: '0.58rem',
                        fontWeight: 600,
                        borderColor: isConsensus ? 'success.main' : 'divider',
                        color: isConsensus ? 'success.dark' : 'text.secondary',
                        '& .MuiChip-label': { px: 0.6 },
                      }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    color={isConsensus ? 'success.dark' : 'text.secondary'}
                    sx={{ fontWeight: isConsensus ? 600 : 400, lineHeight: 1.5, fontSize: '0.82rem' }}
                  >
                    {note.text}
                  </Typography>
                </Box>
              </Box>
            );
          })}

          {/* Add note input */}
          <Box
            sx={{
              px: 2.5,
              py: 1.5,
              display: 'flex',
              gap: 1.5,
              alignItems: 'center',
              borderTop: '1px solid',
              borderColor: 'divider',
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.02),
            }}
          >
            <Avatar
              sx={{
                width: 28,
                height: 28,
                fontSize: '0.65rem',
                fontWeight: 700,
                bgcolor: 'primary.main',
                flexShrink: 0,
              }}
            >
              Y
            </Avatar>
            <TextField
              fullWidth
              size="small"
              placeholder="Add a note or observation..."
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: '0.82rem',
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  '& fieldset': { borderColor: 'divider' },
                  '&:hover fieldset': { borderColor: 'primary.light' },
                  '&.Mui-focused fieldset': { borderColor: 'primary.main', borderWidth: 1.5 },
                },
                '& .MuiOutlinedInput-input': { py: 0.9, px: 1.5 },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" color="primary" sx={{ mr: -0.5 }}>
                      <MicIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <SendIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      </Container>

      <ActionFooter
        primaryLabel="Proceed to Treatment Planning"
        onPrimaryClick={onProceedToPlanning}
        primaryEndIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
        primaryStartIcon={null}
      />
    </Box>
  );
}
