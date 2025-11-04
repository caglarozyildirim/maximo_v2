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

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
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
