import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';

export interface TimelineEvent {
  id: string | number;
  title: string;
  description?: string;
  timestamp: string;
  user?: string;
  type?: 'success' | 'pending' | 'error' | 'info';
}

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline = ({ events }: TimelineProps) => {
  const getIcon = (type?: string) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon sx={{ color: '#10b981', fontSize: '1.5rem' }} />;
      case 'error':
        return <CancelIcon sx={{ color: '#ef4444', fontSize: '1.5rem' }} />;
      case 'pending':
        return <PendingIcon sx={{ color: '#f59e0b', fontSize: '1.5rem' }} />;
      default:
        return <InfoIcon sx={{ color: '#3b82f6', fontSize: '1.5rem' }} />;
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }),
      time: date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  if (events.length === 0) {
    return (
      <Box
        sx={{
          padding: '2rem',
          textAlign: 'center',
          color: 'var(--gray-500)',
        }}
      >
        <InfoIcon sx={{ fontSize: '3rem', opacity: 0.3, marginBottom: '1rem' }} />
        <Typography variant="body2">Henüz işlem geçmişi yok</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', padding: '1rem 0' }}>
      {events.map((event, index) => {
        const { date, time } = formatDate(event.timestamp);
        const isLast = index === events.length - 1;

        return (
          <Box
            key={event.id}
            sx={{
              display: 'flex',
              gap: '1rem',
              position: 'relative',
              paddingBottom: isLast ? 0 : '2rem',
            }}
          >
            {/* Timeline Line */}
            {!isLast && (
              <Box
                sx={{
                  position: 'absolute',
                  left: '1.75rem',
                  top: '2.5rem',
                  bottom: '0',
                  width: '2px',
                  backgroundColor: 'var(--gray-200)',
                }}
              />
            )}

            {/* Date/Time Column */}
            <Box
              sx={{
                minWidth: '80px',
                textAlign: 'right',
                paddingTop: '0.25rem',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--gray-900)',
                }}
              >
                {date}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.7rem',
                  color: 'var(--gray-500)',
                }}
              >
                {time}
              </Typography>
            </Box>

            {/* Icon Column */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: '2px solid var(--gray-200)',
                flexShrink: 0,
                zIndex: 1,
              }}
            >
              {getIcon(event.type)}
            </Box>

            {/* Content Column */}
            <Box
              sx={{
                flex: 1,
                paddingTop: '0.25rem',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color: 'var(--gray-900)',
                  marginBottom: '0.25rem',
                }}
              >
                {event.title}
              </Typography>

              {event.description && (
                <Typography
                  variant="body2"
                  sx={{
                    color: 'var(--gray-600)',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                  }}
                >
                  {event.description}
                </Typography>
              )}

              {event.user && (
                <Typography
                  variant="caption"
                  sx={{
                    color: 'var(--gray-500)',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{event.user}</span>
                  tarafından
                </Typography>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Timeline;
