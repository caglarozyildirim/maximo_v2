import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Menu, MenuItem, Divider, Drawer, IconButton, useMediaQuery, useTheme } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Assignment,
  Inventory,
  Build,
  Person,
  Recycling,
  AccountBalance,
  Warning,
  Factory,
  Logout,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';

const menuItems = [
  { text: 'Dashboard', Icon: DashboardIcon, path: '/' },
  { text: 'İş Talepleri', Icon: Assignment, path: '/job-requests' },
  { text: 'Varlıklar', Icon: Inventory, path: '/assets' },
  { text: 'Bakım İşleri', Icon: Build, path: '/maintenance' },
  { text: 'Zimmet', Icon: Person, path: '/assignments' },
  { text: 'Hurda', Icon: Recycling, path: '/retirements' },
  { text: 'Masraf Merkezi', Icon: AccountBalance, path: '/cost-centers' },
  { text: 'Olay Bildirimi', Icon: Warning, path: '/incidents' },
];

interface ModernLayoutProps {
  children: React.ReactNode;
}

export default function ModernLayout({ children }: ModernLayoutProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuItemClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const getUserInitials = () => {
    if (!user) return 'U';
    const firstInitial = user.firstName?.charAt(0) || '';
    const lastInitial = user.lastName?.charAt(0) || '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Box>
      {/* Modern Navigation Bar */}
      <nav className="modern-navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <div className="navbar-logo">
              <Factory sx={{ fontSize: '2rem', color: 'white' }} />
            </div>
            <div>
              <div className="brand-name">Bakım Yönetimi</div>
              <div className="brand-subtitle">Üretim Tesisleri</div>
            </div>
          </div>

          {/* Desktop Menu */}
          {!isMobile && (
            <div className="navbar-menu">
              {menuItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                  }}
                  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                >
                  <item.Icon sx={{ fontSize: '1.25rem' }} /> {item.text}
                </a>
              ))}
            </div>
          )}

          <div className="navbar-user">
            {!isMobile && (
              <span className="user-name">
                {user?.firstName} {user?.lastName}
              </span>
            )}
            {isMobile && (
              <IconButton
                onClick={handleMobileMenuToggle}
                sx={{ color: 'var(--gray-700)' }}
                edge="end"
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            )}
            <div
              className="user-avatar"
              onClick={handleMenuOpen}
              style={{ cursor: 'pointer' }}
            >
              {getUserInitials()}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        PaperProps={{
          sx: {
            width: '80%',
            maxWidth: '300px',
            pt: 2,
          },
        }}
      >
        <Box sx={{ px: 2, pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--gray-900)' }}>
              Menu
            </Box>
            <IconButton onClick={handleMobileMenuToggle} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          {menuItems.map((item) => (
            <Box
              key={item.path}
              onClick={() => handleMobileMenuItemClick(item.path)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 1.5,
                mb: 0.5,
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: isActive(item.path) ? 'var(--primary-50)' : 'transparent',
                color: isActive(item.path) ? 'var(--primary-dark)' : 'var(--gray-600)',
                fontWeight: isActive(item.path) ? 700 : 600,
                '&:hover': {
                  backgroundColor: 'var(--gray-100)',
                },
              }}
            >
              <item.Icon sx={{ fontSize: '1.25rem' }} />
              <Box>{item.text}</Box>
            </Box>
          ))}
        </Box>
      </Drawer>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
          },
        }}
      >
        <MenuItem disabled sx={{ opacity: 1 }}>
          <Box>
            <Box sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
              {user?.firstName} {user?.lastName}
            </Box>
            <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
              {user?.email}
            </Box>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <Logout sx={{ mr: 1, fontSize: '1.25rem' }} />
          Çıkış Yap
        </MenuItem>
      </Menu>

      {/* Main Content */}
      <div className="modern-container">{children}</div>
    </Box>
  );
}
