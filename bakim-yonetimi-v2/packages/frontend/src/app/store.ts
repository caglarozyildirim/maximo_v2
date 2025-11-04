import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import jobRequestsReducer from '../features/job-requests/jobRequestsSlice';
import assetsReducer from '../features/assets/assetsSlice';
import assignmentsReducer from '../features/assignments/assignmentsSlice';
import maintenanceReducer from '../features/maintenance/maintenanceSlice';
import incidentsReducer from '../features/incidents/incidentsSlice';
import retirementsReducer from '../features/retirements/retirementsSlice';
import costCentersReducer from '../features/costCenters/costCentersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobRequests: jobRequestsReducer,
    assets: assetsReducer,
    assignments: assignmentsReducer,
    maintenance: maintenanceReducer,
    incidents: incidentsReducer,
    retirements: retirementsReducer,
    costCenters: costCentersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
