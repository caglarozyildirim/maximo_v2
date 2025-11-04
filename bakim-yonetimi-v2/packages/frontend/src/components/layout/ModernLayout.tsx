import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Menu, MenuItem, Divider } from '@mui/material';
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
  Logout
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
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
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

          <div className="navbar-user">
            <span className="user-name">
              {user?.firstName} {user?.lastName}
            </span>
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
