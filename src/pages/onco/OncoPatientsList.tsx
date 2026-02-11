import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  Avatar,
  InputBase,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useState, useMemo } from 'react';
import { OncologyPatient, OncoStatus } from '../../types/oncology';
import { usePatientStore } from '../../context/PatientStoreContext';

// ── Subtle status dot color (single accent per status) ──────

const statusDot: Record<OncoStatus, string> = {
  'Diagnostic Evaluation': '#E65100',
  'Treatment Planning': '#1565C0',
  Induction: '#5C6BC0',
  Consolidation: '#283593',
  Maintenance: '#2E7D32',
  'Response Assessment': '#AD1457',
  Palliative: '#BF360C',
  Observation: '#558B2F',
  Discharged: '#90A4AE',
};

const avatarPalette = [
  '#6C7A89', '#7986CB', '#4DB6AC', '#9575CD', '#A1887F',
];

// ── Helpers ─────────────────────────────────────────────────

function getInitials(name: string) {
  return name
    .split(' ')
    .filter((w) => w.length > 1)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getCycleProgress(patient: OncologyPatient) {
  if (!patient.currentProtocol) return null;
  const completed = patient.cycleOutcomes?.length ?? 0;
  const total = patient.currentProtocol.cycles;
  return { completed, total, pct: Math.round((completed / total) * 100) };
}

// ── Grid column template (ensures perfect alignment) ────────
// avatar | patient info | diagnosis | stage | status | intent | protocol
const GRID_COLS = '56px 200px 1fr 90px 160px 120px 180px';

// ── Component ───────────────────────────────────────────────

export default function OncoPatientsList() {
  const navigate = useNavigate();
  const { patients } = usePatientStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<OncoStatus | 'All'>('All');

  const filteredPatients = useMemo(() => {
    let list = patients;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.mrn.includes(q) ||
          p.cancerSite.toLowerCase().includes(q),
      );
    }
    if (statusFilter !== 'All') {
      list = list.filter((p) => p.oncoStatus === statusFilter);
    }
    return list;
  }, [patients, search, statusFilter]);

  const statusCounts = useMemo(() => {
    const map: Record<string, number> = {};
    patients.forEach((p) => {
      map[p.oncoStatus] = (map[p.oncoStatus] ?? 0) + 1;
    });
    return map;
  }, [patients]);

  const allStatuses: OncoStatus[] = [
    'Diagnostic Evaluation',
    'Treatment Planning',
    'Induction',
    'Consolidation',
    'Maintenance',
    'Response Assessment',
    'Palliative',
    'Observation',
    'Discharged',
  ];

  const activeStatuses = allStatuses.filter((s) => statusCounts[s]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F8F9FB', pb: 6 }}>
      {/* ── Header ──────────────────────────────── */}
      <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #E8EAED', py: 2, px: 3 }}>
        <Container maxWidth="xl">
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1A1A2E', letterSpacing: '-0.02em' }}>
            Oncology Patient Registry
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {/* ── Search Bar ────────────────────────── */}
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 2,
            py: 1.2,
            mb: 2,
            borderRadius: 2,
            border: '1px solid #E8EAED',
            bgcolor: '#fff',
          }}
        >
          <SearchIcon sx={{ color: '#6B7280', fontSize: 20 }} />
          <InputBase
            placeholder="Search by name, MRN, or cancer site…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1, fontSize: '0.9rem', color: '#1F2937' }}
          />
        </Paper>

        {/* ── Status Filter Chips ──────────────── */}
        <Box sx={{ display: 'flex', gap: 0.75, mb: 3, flexWrap: 'wrap' }}>
          <Chip
            label={`All (${patients.length})`}
            size="small"
            onClick={() => setStatusFilter('All')}
            sx={{
              fontWeight: 500,
              borderRadius: 1.5,
              fontSize: '0.78rem',
              height: 28,
              bgcolor: statusFilter === 'All' ? '#1A1A2E' : '#fff',
              color: statusFilter === 'All' ? '#fff' : '#6B7280',
              border: '1px solid',
              borderColor: statusFilter === 'All' ? '#1A1A2E' : '#E0E0E0',
              '&:hover': { bgcolor: statusFilter === 'All' ? '#1A1A2E' : '#F3F4F6' },
            }}
          />
          {activeStatuses.map((s) => {
            const active = statusFilter === s;
            return (
              <Chip
                key={s}
                label={`${s} (${statusCounts[s]})`}
                size="small"
                onClick={() => setStatusFilter(active ? 'All' : s)}
                sx={{
                  fontWeight: 500,
                  borderRadius: 1.5,
                  fontSize: '0.78rem',
                  height: 28,
                  bgcolor: active ? '#374151' : '#fff',
                  color: active ? '#fff' : '#6B7280',
                  border: '1px solid',
                  borderColor: active ? '#374151' : '#E0E0E0',
                  '&:hover': { bgcolor: active ? '#374151' : '#F3F4F6' },
                }}
              />
            );
          })}
        </Box>

        {/* ── Column Header ────────────────────── */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: GRID_COLS,
            alignItems: 'center',
            gap: 2,
            px: 2.5,
            pb: 1,
            mb: 0.5,
          }}
        >
          <Box /> {/* avatar placeholder */}
          <Typography variant="caption" sx={{ color: '#9CA3AF', fontWeight: 600, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: 0.8 }}>
            Patient
          </Typography>
          <Typography variant="caption" sx={{ color: '#9CA3AF', fontWeight: 600, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: 0.8 }}>
            Diagnosis
          </Typography>
          <Typography variant="caption" sx={{ color: '#9CA3AF', fontWeight: 600, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: 0.8 }}>
            Stage
          </Typography>
          <Typography variant="caption" sx={{ color: '#9CA3AF', fontWeight: 600, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: 0.8 }}>
            Status
          </Typography>
          <Typography variant="caption" sx={{ color: '#9CA3AF', fontWeight: 600, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: 0.8 }}>
            Intent
          </Typography>
          <Typography variant="caption" sx={{ color: '#9CA3AF', fontWeight: 600, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: 0.8 }}>
            Protocol
          </Typography>
        </Box>

        {/* ── Patient Rows ─────────────────────── */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {filteredPatients.map((patient, idx) => {
            const dot = statusDot[patient.oncoStatus] ?? '#90A4AE';
            const cycle = getCycleProgress(patient);

            return (
              <Paper
                key={patient.id}
                elevation={0}
                onClick={() => navigate(`/onco/patient-view/${patient.id}/summary`)}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: GRID_COLS,
                  alignItems: 'center',
                  gap: 2,
                  px: 2.5,
                  py: 2,
                  borderRadius: 2,
                  border: '1px solid #ECEDF0',
                  bgcolor: '#fff',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                  '&:hover': {
                    borderColor: '#C5CAE9',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  },
                }}
              >
                {/* Avatar */}
                <Avatar
                  sx={{
                    width: 42,
                    height: 42,
                    bgcolor: avatarPalette[idx % avatarPalette.length],
                    fontWeight: 600,
                    fontSize: '0.85rem',
                  }}
                >
                  {getInitials(patient.name)}
                </Avatar>

                {/* Patient Info */}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#1A1A2E', lineHeight: 1.3 }}>
                      {patient.name}
                    </Typography>
                    {patient.urgencyFlag && (
                      <Tooltip title="Urgent">
                        <WarningAmberIcon sx={{ fontSize: 15, color: '#E65100' }} />
                      </Tooltip>
                    )}
                  </Box>
                  <Typography sx={{ color: '#6B7280', fontSize: '0.78rem', mt: 0.25 }}>
                    {patient.age}y · {patient.gender} · {patient.mrn}
                  </Typography>
                </Box>

                {/* Diagnosis */}
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#1F2937', lineHeight: 1.3 }}>
                    {patient.cancerSite}
                  </Typography>
                  {patient.histology && (
                    <Typography sx={{ color: '#6B7280', fontSize: '0.75rem', mt: 0.25, lineHeight: 1.3 }}>
                      {patient.histology}
                    </Typography>
                  )}
                </Box>

                {/* Stage */}
                <Box>
                  {patient.stage ? (
                    <Typography sx={{ fontWeight: 600, fontSize: '0.82rem', color: '#1F2937' }}>
                      Stage {patient.stage}
                    </Typography>
                  ) : (
                    <Typography sx={{ color: '#D1D5DB', fontSize: '0.82rem' }}>—</Typography>
                  )}
                  {patient.tnmStage && (
                    <Typography sx={{ color: '#6B7280', fontSize: '0.72rem', mt: 0.15 }}>
                      {patient.tnmStage}
                    </Typography>
                  )}
                </Box>

                {/* Status */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: dot,
                      flexShrink: 0,
                    }}
                  />
                  <Typography sx={{ fontSize: '0.82rem', fontWeight: 500, color: '#1F2937' }}>
                    {patient.oncoStatus}
                  </Typography>
                </Box>

                {/* Intent */}
                <Box>
                  {patient.treatmentIntent ? (
                    <Typography sx={{ fontSize: '0.82rem', fontWeight: 500, color: '#1F2937' }}>
                      {patient.treatmentIntent}
                    </Typography>
                  ) : (
                    <Typography sx={{ color: '#D1D5DB', fontSize: '0.82rem' }}>—</Typography>
                  )}
                </Box>

                {/* Protocol / Progress */}
                <Box>
                  {cycle ? (
                    <>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.78rem', color: '#1F2937', mb: 0.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {patient.currentProtocol?.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={cycle.pct}
                          sx={{
                            flex: 1,
                            height: 4,
                            borderRadius: 2,
                            bgcolor: '#F3F4F6',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 2,
                              bgcolor: '#5C6BC0',
                            },
                          }}
                        />
                        <Typography sx={{ fontSize: '0.7rem', color: '#6B7280', fontWeight: 500, whiteSpace: 'nowrap' }}>
                          {cycle.completed}/{cycle.total}
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <Typography sx={{ color: '#D1D5DB', fontSize: '0.78rem' }}>—</Typography>
                  )}
                </Box>
              </Paper>
            );
          })}

          {filteredPatients.length === 0 && (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <Typography sx={{ color: '#6B7280', fontSize: '0.9rem' }}>
                No patients match your search.
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
