import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { store } from './app/store';
import ModernLayout from './components/layout/ModernLayout';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './features/auth/LoginPage';
import Dashboard from './pages/Dashboard';
import JobRequestList from './pages/JobRequestList';
import JobRequestDetail from './pages/JobRequestDetail';
import JobRequestForm from './pages/JobRequestForm';
import AssetList from './pages/Assets/AssetList';
import AssetDetail from './pages/Assets/AssetDetail';
import AssetForm from './pages/Assets/AssetForm';
import AssignmentList from './pages/Assignments/AssignmentList';
import AssignmentDetail from './pages/Assignments/AssignmentDetail';
import AssignmentForm from './pages/Assignments/AssignmentForm';
import MaintenanceList from './pages/Maintenance/MaintenanceList';
import MaintenanceDetail from './pages/Maintenance/MaintenanceDetail';
import MaintenanceForm from './pages/Maintenance/MaintenanceForm';
import IncidentList from './pages/Incidents/IncidentList';
import IncidentDetail from './pages/Incidents/IncidentDetail';
import IncidentForm from './pages/Incidents/IncidentForm';
import RetirementList from './pages/Retirements/RetirementList';
import RetirementDetail from './pages/Retirements/RetirementDetail';
import RetirementForm from './pages/Retirements/RetirementForm';
import CostCenterList from './pages/CostCenters/CostCenterList';
import CostCenterDetail from './pages/CostCenters/CostCenterDetail';
import CostCenterForm from './pages/CostCenters/CostCenterForm';

// MAN Design Guide - Kurumsal Renk Paleti
const theme = createTheme({
  palette: {
    primary: {
      main: '#E40045',      // MAN Red
      light: '#FF1A5A',     // MAN Red Light
      dark: '#C00038',      // MAN Red Dark
      contrastText: '#fff',
    },
    secondary: {
      main: '#303C49',      // MAN Anthracite
      light: '#6E7E8D',     // MAN 60%
      dark: '#1A2128',
      contrastText: '#fff',
    },
    info: {
      main: '#4B96D2',      // MAN Blue
      light: '#E8F4FC',
      dark: '#2B76B2',
      contrastText: '#fff',
    },
    success: {
      main: '#91B900',      // MAN Green
      light: '#F0F8E6',
      dark: '#719900',
      contrastText: '#fff',
    },
    warning: {
      main: '#FFCD00',      // MAN Yellow
      light: '#FFF8DB',
      dark: '#DFAD00',
      contrastText: '#000',
    },
    error: {
      main: '#E40045',      // MAN Red
      light: '#FFE5EF',
      dark: '#C00038',
      contrastText: '#fff',
    },
    grey: {
      50: '#F8F9FA',
      100: '#F1F3F5',
      200: '#CAD0D8',       // MAN 20%
      300: '#D9DDDF',
      400: '#ADB5BC',
      500: '#6E7E8D',       // MAN 60%
      600: '#5A6872',
      700: '#475159',
      800: '#303C49',       // MAN Anthracite
      900: '#1A2128',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '10px',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #E40045 0%, #C00038 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #FF1A5A 0%, #E40045 100%)',
            boxShadow: '0 10px 25px rgba(228, 0, 69, 0.35)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          border: '1px solid #CAD0D8',
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          autoHideDuration={4000}
        >
          <BrowserRouter>
            <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <ModernLayout>
                    <Dashboard />
                  </ModernLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/job-requests"
              element={
                <PrivateRoute>
                  <ModernLayout>
                    <JobRequestList />
                  </ModernLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/job-requests/new"
              element={
                <PrivateRoute>
                  <ModernLayout>
                    <JobRequestForm />
                  </ModernLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/job-requests/:id/edit"
              element={
                <PrivateRoute>
                  <ModernLayout>
                    <JobRequestForm />
                  </ModernLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/job-requests/:id"
              element={
                <PrivateRoute>
                  <ModernLayout>
                    <JobRequestDetail />
                  </ModernLayout>
                </PrivateRoute>
              }
            />

            {/* Assets Routes */}
            <Route path="/assets" element={<PrivateRoute><ModernLayout><AssetList /></ModernLayout></PrivateRoute>} />
            <Route path="/assets/new" element={<PrivateRoute><ModernLayout><AssetForm /></ModernLayout></PrivateRoute>} />
            <Route path="/assets/:id/edit" element={<PrivateRoute><ModernLayout><AssetForm /></ModernLayout></PrivateRoute>} />
            <Route path="/assets/:id" element={<PrivateRoute><ModernLayout><AssetDetail /></ModernLayout></PrivateRoute>} />

            {/* Assignments Routes */}
            <Route path="/assignments" element={<PrivateRoute><ModernLayout><AssignmentList /></ModernLayout></PrivateRoute>} />
            <Route path="/assignments/new" element={<PrivateRoute><ModernLayout><AssignmentForm /></ModernLayout></PrivateRoute>} />
            <Route path="/assignments/:id/edit" element={<PrivateRoute><ModernLayout><AssignmentForm /></ModernLayout></PrivateRoute>} />
            <Route path="/assignments/:id" element={<PrivateRoute><ModernLayout><AssignmentDetail /></ModernLayout></PrivateRoute>} />

            {/* Maintenance Routes */}
            <Route path="/maintenance" element={<PrivateRoute><ModernLayout><MaintenanceList /></ModernLayout></PrivateRoute>} />
            <Route path="/maintenance/new" element={<PrivateRoute><ModernLayout><MaintenanceForm /></ModernLayout></PrivateRoute>} />
            <Route path="/maintenance/:id/edit" element={<PrivateRoute><ModernLayout><MaintenanceForm /></ModernLayout></PrivateRoute>} />
            <Route path="/maintenance/:id" element={<PrivateRoute><ModernLayout><MaintenanceDetail /></ModernLayout></PrivateRoute>} />

            {/* Incidents Routes */}
            <Route path="/incidents" element={<PrivateRoute><ModernLayout><IncidentList /></ModernLayout></PrivateRoute>} />
            <Route path="/incidents/new" element={<PrivateRoute><ModernLayout><IncidentForm /></ModernLayout></PrivateRoute>} />
            <Route path="/incidents/:id/edit" element={<PrivateRoute><ModernLayout><IncidentForm /></ModernLayout></PrivateRoute>} />
            <Route path="/incidents/:id" element={<PrivateRoute><ModernLayout><IncidentDetail /></ModernLayout></PrivateRoute>} />

            {/* Retirements Routes */}
            <Route path="/retirements" element={<PrivateRoute><ModernLayout><RetirementList /></ModernLayout></PrivateRoute>} />
            <Route path="/retirements/new" element={<PrivateRoute><ModernLayout><RetirementForm /></ModernLayout></PrivateRoute>} />
            <Route path="/retirements/:id/edit" element={<PrivateRoute><ModernLayout><RetirementForm /></ModernLayout></PrivateRoute>} />
            <Route path="/retirements/:id" element={<PrivateRoute><ModernLayout><RetirementDetail /></ModernLayout></PrivateRoute>} />

            {/* Cost Centers Routes */}
            <Route path="/cost-centers" element={<PrivateRoute><ModernLayout><CostCenterList /></ModernLayout></PrivateRoute>} />
            <Route path="/cost-centers/new" element={<PrivateRoute><ModernLayout><CostCenterForm /></ModernLayout></PrivateRoute>} />
            <Route path="/cost-centers/:id/edit" element={<PrivateRoute><ModernLayout><CostCenterForm /></ModernLayout></PrivateRoute>} />
            <Route path="/cost-centers/:id" element={<PrivateRoute><ModernLayout><CostCenterDetail /></ModernLayout></PrivateRoute>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
