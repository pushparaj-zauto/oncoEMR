import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Chip,
  Button,
  Stack,
  Divider,
  Avatar,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import { OncologyPatient } from '../../types/oncology';
import PatientContextBar from '../../components/onco/PatientContextBar';
import ActionFooter from '../../components/onco/ActionFooter';

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

      <Container maxWidth="lg" sx={{ mt: 3, mb: 5 }}>
        {/* ── Header ── */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <GroupsIcon sx={{ color: 'primary.main', fontSize: 26 }} />
          <Typography variant="h6" fontWeight={700}>
            MDT Discussion — {patient.cancerSite} Cancer
          </Typography>
          {mdt && (
            <Chip
              label={mdt.status}
              size="small"
              color={mdt.status === 'Approved' ? 'success' : mdt.status === 'Modified' ? 'warning' : 'default'}
              icon={mdt.status === 'Approved' ? <CheckCircleIcon /> : undefined}
              sx={{ ml: 'auto', fontWeight: 600 }}
            />
          )}
        </Box>

        <Grid container spacing={3}>
          {/* ══════ Left column ══════ */}
          <Grid item xs={12} md={4}>
            {/* ── Section 1: Participants ── */}
            <Typography
              variant="overline"
              sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.8rem', letterSpacing: 1.2, mb: 1, display: 'block' }}
            >
              Participants
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 3 }}>
              <Stack spacing={1.5}>
                {participants.map((p, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        bgcolor: roleColors[p.role] || 'grey.500',
                      }}
                    >
                      {p.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.2 }}>
                        {p.name}
                      </Typography>
                      {p.role && (
                        <Typography variant="caption" color="text.secondary">
                          {p.role}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>

            {/* ── Section 2: Key Findings ── */}
            <Typography
              variant="overline"
              sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.8rem', letterSpacing: 1.2, mb: 1, display: 'block' }}
            >
              Key Findings
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Histopathology</Typography>
                  <Typography variant="body2" fontWeight={500}>{patient.histology}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Tumor Subtype</Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {patient.cancerSite === 'Breast'
                      ? 'ER+, PR+, HER2−'
                      : patient.cancerSite === 'Lung'
                        ? 'EGFR Wild Type'
                        : patient.cancerSite === 'Colon'
                          ? 'MSS, RAS Wild-type'
                          : 'Standard'}
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Stage</Typography>
                  <Stack direction="row" spacing={0.5}>
                    <Chip label={patient.tnmStage || '—'} size="small" variant="outlined" sx={{ height: 22 }} />
                    <Chip label={`Stage ${patient.stage}`} size="small" variant="outlined" sx={{ height: 22 }} />
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* ══════ Right column ══════ */}
          <Grid item xs={12} md={8}>
            {/* ── Section 3: Discussion Notes (chat-style timeline) ── */}
            <Typography
              variant="overline"
              sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.8rem', letterSpacing: 1.2, mb: 1, display: 'block' }}
            >
              Discussion Notes
            </Typography>
            <Paper variant="outlined" sx={{ p: 0, borderRadius: 2, mb: 3, overflow: 'hidden' }}>
              {discussionNotes.map((note, idx) => {
                const isConsensus = note.role === 'Consensus';
                return (
                  <Box
                    key={idx}
                    sx={{
                      px: 2.5,
                      py: 2,
                      display: 'flex',
                      gap: 1.5,
                      alignItems: 'flex-start',
                      borderBottom: idx < discussionNotes.length - 1 ? '1px solid' : 'none',
                      borderColor: 'divider',
                      bgcolor: isConsensus
                        ? (theme) => alpha(theme.palette.success.main, 0.06)
                        : 'transparent',
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        bgcolor: isConsensus
                          ? 'success.main'
                          : roleColors[note.role] || 'grey.400',
                        mt: 0.25,
                      }}
                    >
                      {isConsensus ? '✓' : note.speaker.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
                        <Typography
                          variant="body2"
                          fontWeight={700}
                          color={isConsensus ? 'success.dark' : 'text.primary'}
                        >
                          {note.speaker}
                        </Typography>
                        <Chip
                          label={note.role}
                          size="small"
                          variant="outlined"
                          sx={{
                            height: 18,
                            fontSize: '0.6rem',
                            fontWeight: 600,
                            borderColor: isConsensus ? 'success.main' : 'divider',
                            color: isConsensus ? 'success.dark' : 'text.secondary',
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        color={isConsensus ? 'success.dark' : 'text.secondary'}
                        sx={{ fontWeight: isConsensus ? 600 : 400, lineHeight: 1.6 }}
                      >
                        {note.text}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Paper>

            {/* ── Section 4: Final Decision Card ── */}
            {mdt && (
              <>
                <Typography
                  variant="overline"
                  sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.8rem', letterSpacing: 1.2, mb: 1, display: 'block' }}
                >
                  Final Decision
                </Typography>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    borderColor: mdt.status === 'Approved' ? 'success.main' : 'divider',
                    bgcolor: mdt.status === 'Approved'
                      ? (theme) => alpha(theme.palette.success.main, 0.04)
                      : 'background.paper',
                  }}
                >
                  <Stack spacing={1.5}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary" fontWeight={500}>
                        Status
                      </Typography>
                      <Chip
                        label={mdt.status}
                        size="small"
                        color={mdt.status === 'Approved' ? 'success' : 'warning'}
                        icon={mdt.status === 'Approved' ? <CheckCircleIcon /> : undefined}
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary" fontWeight={500}>
                        Date
                      </Typography>
                      <Typography variant="body2">{mdt.date}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ mb: 0.5 }}>
                        Final Plan Summary
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.6 }}>
                        {mdt.summary}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </>
            )}
          </Grid>
        </Grid>
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
