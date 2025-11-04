import { Box, Typography } from '@mui/material';
import { InboxOutlined } from '@mui/icons-material';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        textAlign: 'center',
      }}
    >
      <Box sx={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon || <InboxOutlined sx={{ fontSize: '4rem' }} />}
      </Box>
      <Typography variant="h6" gutterBottom sx={{ color: 'var(--gray-900)', fontWeight: 600 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" sx={{ color: 'var(--gray-500)', marginBottom: '1.5rem', maxWidth: '400px' }}>
          {description}
        </Typography>
      )}
      {action}
    </Box>
  );
};

export default EmptyState;
