import { Box } from '@mui/material';

interface LoadingSkeletonProps {
  type?: 'table' | 'card' | 'form';
  rows?: number;
}

const LoadingSkeleton = ({ type = 'table', rows = 5 }: LoadingSkeletonProps) => {
  if (type === 'table') {
    return (
      <Box sx={{ padding: '1rem' }}>
        {/* Table Header Skeleton */}
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            padding: '1rem',
            background: '#f3f4f6',
            borderRadius: '8px',
            marginBottom: '0.5rem',
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <Box
              key={i}
              sx={{
                flex: 1,
                height: '1rem',
                background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                borderRadius: '4px',
                '@keyframes shimmer': {
                  '0%': { backgroundPosition: '200% 0' },
                  '100%': { backgroundPosition: '-200% 0' },
                },
              }}
            />
          ))}
        </Box>

        {/* Table Rows Skeleton */}
        {Array.from({ length: rows }).map((_, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              gap: '1rem',
              padding: '1rem',
              borderBottom: '1px solid #f3f4f6',
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  height: '0.875rem',
                  background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s infinite',
                  borderRadius: '4px',
                  '@keyframes shimmer': {
                    '0%': { backgroundPosition: '200% 0' },
                    '100%': { backgroundPosition: '-200% 0' },
                  },
                }}
              />
            ))}
          </Box>
        ))}
      </Box>
    );
  }

  if (type === 'card') {
    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', padding: '1rem' }}>
        {Array.from({ length: rows }).map((_, index) => (
          <Box
            key={index}
            sx={{
              padding: '1.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          >
            <Box
              sx={{
                height: '1.5rem',
                width: '70%',
                background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                borderRadius: '4px',
                marginBottom: '1rem',
                '@keyframes shimmer': {
                  '0%': { backgroundPosition: '200% 0' },
                  '100%': { backgroundPosition: '-200% 0' },
                },
              }}
            />
            <Box
              sx={{
                height: '1rem',
                width: '100%',
                background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                borderRadius: '4px',
                marginBottom: '0.5rem',
              }}
            />
            <Box
              sx={{
                height: '1rem',
                width: '85%',
                background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                borderRadius: '4px',
              }}
            />
          </Box>
        ))}
      </Box>
    );
  }

  // Form type
  return (
    <Box sx={{ padding: '2rem' }}>
      {Array.from({ length: rows }).map((_, index) => (
        <Box key={index} sx={{ marginBottom: '1.5rem' }}>
          <Box
            sx={{
              height: '0.875rem',
              width: '120px',
              background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
              borderRadius: '4px',
              marginBottom: '0.5rem',
              '@keyframes shimmer': {
                '0%': { backgroundPosition: '200% 0' },
                '100%': { backgroundPosition: '-200% 0' },
              },
            }}
          />
          <Box
            sx={{
              height: '2.5rem',
              width: '100%',
              background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
              borderRadius: '4px',
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default LoadingSkeleton;
