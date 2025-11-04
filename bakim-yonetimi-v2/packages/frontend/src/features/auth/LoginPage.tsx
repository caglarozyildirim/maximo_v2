import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { login } from './authSlice';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await dispatch(login({ email, password })).unwrap();
      navigate('/');
    } catch (err: any) {
      setError(err || 'Giriş başarısız');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Sol Taraf - Bilgi Paneli */}
      <Box
        sx={{
          flex: 1,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          padding: '4rem',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Typography variant="h2" fontWeight={800} gutterBottom sx={{ fontSize: { md: '3rem', lg: '4rem' } }}>
            🔧
          </Typography>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Bakım Yönetimi Sistemi
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: '500px', margin: '0 auto', lineHeight: 1.8 }}>
            Varlık takibi, bakım planlaması, iş talepleri ve daha fazlası için modern çözüm
          </Typography>

          <Box sx={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
            {[
              { icon: '✅', text: 'Kapsamlı varlık ve zimmet yönetimi' },
              { icon: '📊', text: 'Gerçek zamanlı raporlama ve analiz' },
              { icon: '⚡', text: 'Hızlı iş talebi ve onay süreçleri' },
              { icon: '🔒', text: 'Güvenli ve rol tabanlı erişim' },
            ].map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Typography sx={{ fontSize: '1.5rem' }}>{item.icon}</Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Sağ Taraf - Login Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9fafb',
          padding: '2rem',
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 3,
              border: '1px solid #e5e7eb',
              backgroundColor: 'white',
            }}
          >
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700} gutterBottom color="var(--gray-900)">
                Hoş Geldiniz
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Devam etmek için giriş yapın
              </Typography>
            </Box>

            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  border: '1px solid #fecaca',
                  backgroundColor: '#fee2e2',
                }}
              >
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="E-posta Adresi"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                sx={{ mb: 2.5 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: 'var(--gray-400)' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Şifre"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: 'var(--gray-400)' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: 'var(--gray-400)' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mb: 2,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 6px rgba(102, 126, 234, 0.25)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5568d3 0%, #63408a 100%)',
                    boxShadow: '0 6px 12px rgba(102, 126, 234, 0.35)',
                  },
                  '&:disabled': {
                    background: '#d1d5db',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Giriş Yap'}
              </Button>
            </form>

            <Box
              sx={{
                mt: 4,
                p: 3,
                bgcolor: '#f9fafb',
                borderRadius: 2,
                border: '1px solid #e5e7eb',
              }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                <strong style={{ color: 'var(--gray-900)', fontSize: '0.875rem' }}>Demo Kullanıcıları:</strong>
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                {[
                  { role: 'Admin', email: 'admin@example.com' },
                  { role: 'Yönetici', email: 'manager@example.com' },
                  { role: 'Mühendis', email: 'engineer@example.com' },
                ].map((user, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      '&:hover': {
                        backgroundColor: 'white',
                      },
                    }}
                  >
                    <Typography variant="caption" sx={{ fontSize: '0.8rem' }}>
                      <strong>{user.role}:</strong> {user.email}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                      password123
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
