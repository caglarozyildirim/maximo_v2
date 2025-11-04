import { Box } from '@mui/material';

export type StatusType =
  | 'approved'
  | 'pending'
  | 'rejected'
  | 'active'
  | 'inactive'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

interface StatusBadgeProps {
  status: StatusType;
  customLabel?: string;
}

const statusConfig: Record<StatusType, { label: string; bg: string; color: string }> = {
  approved: {
    label: 'Onaylandı',
    bg: '#dcfce7',
    color: '#166534',
  },
  pending: {
    label: 'Beklemede',
    bg: '#fef3c7',
    color: '#92400e',
  },
  rejected: {
    label: 'Reddedildi',
    bg: '#fee2e2',
    color: '#991b1b',
  },
  active: {
    label: 'Aktif',
    bg: '#dbeafe',
    color: '#1e40af',
  },
  inactive: {
    label: 'Pasif',
    bg: '#f3f4f6',
    color: '#4b5563',
  },
  in_progress: {
    label: 'Devam Ediyor',
    bg: '#e0e7ff',
    color: '#3730a3',
  },
  completed: {
    label: 'Tamamlandı',
    bg: '#d1fae5',
    color: '#065f46',
  },
  cancelled: {
    label: 'İptal Edildi',
    bg: '#fecaca',
    color: '#7f1d1d',
  },
};

const StatusBadge = ({ status, customLabel }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        backgroundColor: config.bg,
        color: config.color,
        textTransform: 'capitalize',
        whiteSpace: 'nowrap',
      }}
    >
      {customLabel || config.label}
    </Box>
  );
};

export default StatusBadge;
