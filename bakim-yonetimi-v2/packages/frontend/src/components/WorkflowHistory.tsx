import { Box, Typography, Chip, Avatar } from '@mui/material';
import {
  CheckCircle as CompletedIcon,
  Cancel as RejectedIcon,
  HourglassEmpty as PendingIcon,
  PlayArrow as StartedIcon,
} from '@mui/icons-material';

interface WorkflowHistoryItem {
  id: number;
  action: string;
  status: string;
  comment?: string;
  performedBy: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
}

interface WorkflowHistoryProps {
  items: WorkflowHistoryItem[];
}

const getActionIcon = (action: string) => {
  const iconMap: Record<string, JSX.Element> = {
    CREATED: <StartedIcon sx={{ color: '#667eea' }} />,
    SUBMITTED: <PendingIcon sx={{ color: '#f59e0b' }} />,
    APPROVED: <CompletedIcon sx={{ color: '#10b981' }} />,
    REJECTED: <RejectedIcon sx={{ color: '#ef4444' }} />,
    CANCELLED: <RejectedIcon sx={{ color: '#9ca3af' }} />,
  };
  return iconMap[action] || <PendingIcon />;
};

const getActionLabel = (action: string) => {
  const labelMap: Record<string, string> = {
    CREATED: 'Oluşturuldu',
    SUBMITTED: 'Onaya Gönderildi',
    APPROVED: 'Onaylandı',
    REJECTED: 'Reddedildi',
    CANCELLED: 'İptal Edildi',
    ASSIGNED: 'Atandı',
    COMPLETED: 'Tamamlandı',
  };
  return labelMap[action] || action;
};

const getStatusColor = (status: string): 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' => {
  const colorMap: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'> = {
    PENDING: 'warning',
    MANAGER_APPROVAL: 'info',
    ENGINEER_TAKEOVER: 'info',
    TECHNICAL_APPROVAL: 'info',
    COST_CALCULATION: 'info',
    BUSINESS_APPROVAL: 'info',
    SOLUTION_ASSIGNMENT: 'primary',
    IMPLEMENTATION: 'primary',
    SOLUTION_APPROVAL: 'primary',
    COMPLETED: 'success',
    REJECTED: 'error',
    CANCELLED: 'default',
  };
  return colorMap[status] || 'default';
};

export default function WorkflowHistory({ items }: WorkflowHistoryProps) {
  if (!items || items.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Henüz iş akışı geçmişi yok
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Vertical line */}
      <Box
        sx={{
          position: 'absolute',
          left: 19,
          top: 20,
          bottom: 20,
          width: 2,
          bgcolor: '#e5e7eb',
        }}
      />

      {/* Timeline items */}
      {items.map((item, index) => (
        <Box key={item.id} sx={{ position: 'relative', pb: index < items.length - 1 ? 3 : 0 }}>
          {/* Icon */}
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: 'white',
              border: '2px solid #e5e7eb',
            }}
          >
            {getActionIcon(item.action)}
          </Box>

          {/* Content */}
          <Box sx={{ ml: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography variant="body1" fontWeight={600}>
                {getActionLabel(item.action)}
              </Typography>
              <Chip label={item.status} size="small" color={getStatusColor(item.status)} />
            </Box>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              {item.performedBy.firstName} {item.performedBy.lastName}
              {' • '}
              {new Date(item.createdAt).toLocaleString('tr-TR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Typography>

            {item.comment && (
              <Box
                sx={{
                  mt: 1,
                  p: 1.5,
                  bgcolor: '#f9fafb',
                  borderRadius: 1,
                  border: '1px solid #e5e7eb',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  <strong>Yorum:</strong> {item.comment}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
