import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
}

interface Asset {
  id: number;
  assetNumber: string;
  assetName: string;
  assetType: {
    id: number;
    typeName: string;
  };
  assetStatus: {
    id: number;
    statusName: string;
  };
  location?: {
    id: number;
    name: string;
  };
}

interface MaintenanceType {
  id: number;
  typeName: string;
  description?: string;
}

interface Status {
  id: number;
  statusName: string;
  color?: string;
}

export interface MaintenanceDuty {
  id: number;
  maintenanceNumber: string;
  assetId: number;
  maintenanceTypeId: number;
  description: string;
  plannedStartDate: string;
  plannedEndDate: string;
  actualStartDate: string | null;
  actualEndDate: string | null;
  assignedToUserId: number | null;
  priority: 'low' | 'medium' | 'high' | 'critical';
  statusId: number;
  estimatedCost: number | null;
  actualCost: number | null;
  notes: string | null;
  asset: Asset;
  maintenanceType: MaintenanceType;
  status: Status;
  assignedToUser: User | null;
  createdBy: User;
  tasks?: any[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateMaintenanceDutyData {
  assetId: number;
  maintenanceTypeId: number;
  description: string;
  plannedStartDate: string;
  plannedEndDate: string;
  assignedToUserId?: number;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  estimatedCost?: number;
  notes?: string;
}

export interface UpdateMaintenanceDutyData {
  description?: string;
  plannedStartDate?: string;
  plannedEndDate?: string;
  actualStartDate?: string;
  actualEndDate?: string;
  assignedToUserId?: number;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  statusId?: number;
  estimatedCost?: number;
  actualCost?: number;
  notes?: string;
}

interface MaintenanceState {
  duties: MaintenanceDuty[];
  current: MaintenanceDuty | null;
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  statistics: {
    totalDuties: number;
    plannedDuties: number;
    inProgressDuties: number;
    completedDuties: number;
    overdueCount: number;
    dutiesByPriority: any[];
  } | null;
}

const initialState: MaintenanceState = {
  duties: [],
  current: null,
  loading: false,
  error: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  },
  statistics: null,
};

interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface FetchMaintenanceDutiesParams {
  page?: number;
  limit?: number;
  search?: string;
  assetId?: number;
  maintenanceTypeId?: number;
  statusId?: number;
  assignedToUserId?: number;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  startDate?: string;
  endDate?: string;
}

export const fetchMaintenanceDuties = createAsyncThunk(
  'maintenance/fetchAll',
  async (params: FetchMaintenanceDutiesParams = {}) => {
    const response = await api.get<ApiResponse<MaintenanceDuty[]>>('/maintenance', { params });
    return response.data;
  }
);

export const fetchMaintenanceDutyById = createAsyncThunk(
  'maintenance/fetchById',
  async (id: number) => {
    const response = await api.get<ApiResponse<MaintenanceDuty>>(`/maintenance/${id}`);
    return response.data.data;
  }
);

export const createMaintenanceDuty = createAsyncThunk(
  'maintenance/create',
  async (data: CreateMaintenanceDutyData) => {
    const response = await api.post<ApiResponse<MaintenanceDuty>>('/maintenance', data);
    return response.data.data;
  }
);

export const updateMaintenanceDuty = createAsyncThunk(
  'maintenance/update',
  async ({ id, data }: { id: number; data: UpdateMaintenanceDutyData }) => {
    const response = await api.patch<ApiResponse<MaintenanceDuty>>(`/maintenance/${id}`, data);
    return response.data.data;
  }
);

export const deleteMaintenanceDuty = createAsyncThunk(
  'maintenance/delete',
  async (id: number) => {
    await api.delete(`/maintenance/${id}`);
    return id;
  }
);

export const fetchMaintenanceStatistics = createAsyncThunk(
  'maintenance/statistics',
  async () => {
    const response = await api.get<ApiResponse<MaintenanceState['statistics']>>('/maintenance/statistics');
    return response.data.data;
  }
);

const maintenanceSlice = createSlice({
  name: 'maintenance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch duties
      .addCase(fetchMaintenanceDuties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaintenanceDuties.fulfilled, (state, action) => {
        state.loading = false;
        state.duties = action.payload.data;
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(fetchMaintenanceDuties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch maintenance duties';
      })

      // Fetch duty by id
      .addCase(fetchMaintenanceDutyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaintenanceDutyById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchMaintenanceDutyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch maintenance duty';
      })

      // Create duty
      .addCase(createMaintenanceDuty.fulfilled, (state, action) => {
        state.duties.unshift(action.payload);
      })

      // Update duty
      .addCase(updateMaintenanceDuty.fulfilled, (state, action) => {
        const index = state.duties.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) {
          state.duties[index] = action.payload;
        }
        if (state.current?.id === action.payload.id) {
          state.current = action.payload;
        }
      })

      // Delete duty
      .addCase(deleteMaintenanceDuty.fulfilled, (state, action) => {
        state.duties = state.duties.filter((d) => d.id !== action.payload);
      })

      // Fetch statistics
      .addCase(fetchMaintenanceStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload;
      });
  },
});

export default maintenanceSlice.reducer;
