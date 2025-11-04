import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

interface CostCenter {
  id: number;
  code: string;
  name: string;
}

interface Asset {
  id: number;
  assetNumber: string;
  name: string;
  serialNumber?: string;
}

interface Status {
  id: number;
  name: string;
  code: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CostCenterChange {
  id: number;
  changeNumber: string;
  assetId: number;
  asset: Asset;
  fromCostCenterId: number;
  fromCostCenter: CostCenter;
  toCostCenterId: number;
  toCostCenter: CostCenter;
  changeDate: string;
  reason: string;
  notes?: string;
  statusId: number;
  status: Status;
  requestedById: number;
  requestedBy: User;
  approvedById?: number;
  approvedBy?: User;
  approvalDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CostCenterChangeFormData {
  assetId: number;
  fromCostCenterId: number;
  toCostCenterId: number;
  changeDate: string;
  reason: string;
  notes?: string;
}

export interface UpdateCostCenterChangeData {
  reason?: string;
  notes?: string;
  statusId?: number;
}

interface CostCenterChangesState {
  changes: CostCenterChange[];
  currentChange: CostCenterChange | null;
  loading: boolean;
  error: string | null;
  totalCount: number;
  page: number;
  limit: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const initialState: CostCenterChangesState = {
  changes: [],
  currentChange: null,
  loading: false,
  error: null,
  totalCount: 0,
  page: 1,
  limit: 10,
};

export const fetchCostCenterChanges = createAsyncThunk(
  'costCenters/fetchAll',
  async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    assetId?: number;
    statusId?: number;
    fromCostCenterId?: number;
    toCostCenterId?: number;
  }) => {
    const response = await api.get<ApiResponse<PaginatedResponse<CostCenterChange>>>(
      '/cost-centers',
      { params }
    );
    return response.data.data;
  }
);

export const fetchCostCenterChangeById = createAsyncThunk(
  'costCenters/fetchById',
  async (id: number) => {
    const response = await api.get<ApiResponse<CostCenterChange>>(`/cost-centers/${id}`);
    return response.data.data;
  }
);

export const createCostCenterChange = createAsyncThunk(
  'costCenters/create',
  async (data: CostCenterChangeFormData) => {
    const response = await api.post<ApiResponse<CostCenterChange>>('/cost-centers', data);
    return response.data.data;
  }
);

export const updateCostCenterChange = createAsyncThunk(
  'costCenters/update',
  async ({ id, data }: { id: number; data: UpdateCostCenterChangeData }) => {
    const response = await api.put<ApiResponse<CostCenterChange>>(`/cost-centers/${id}`, data);
    return response.data.data;
  }
);

export const deleteCostCenterChange = createAsyncThunk(
  'costCenters/delete',
  async (id: number) => {
    await api.delete(`/cost-centers/${id}`);
    return id;
  }
);

export const approveCostCenterChange = createAsyncThunk(
  'costCenters/approve',
  async (id: number) => {
    const response = await api.post<ApiResponse<CostCenterChange>>(`/cost-centers/${id}/approve`);
    return response.data.data;
  }
);

export const rejectCostCenterChange = createAsyncThunk(
  'costCenters/reject',
  async ({ id, reason }: { id: number; reason: string }) => {
    const response = await api.post<ApiResponse<CostCenterChange>>(`/cost-centers/${id}/reject`, {
      reason,
    });
    return response.data.data;
  }
);

const costCentersSlice = createSlice({
  name: 'costCenters',
  initialState,
  reducers: {
    clearCurrentChange: (state) => {
      state.currentChange = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchCostCenterChanges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCostCenterChanges.fulfilled, (state, action) => {
        state.loading = false;
        state.changes = action.payload.data;
        state.totalCount = action.payload.pagination.total;
        state.page = action.payload.pagination.page;
        state.limit = action.payload.pagination.limit;
      })
      .addCase(fetchCostCenterChanges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Masraf merkezi değişiklikleri yüklenirken hata oluştu';
      })
      // Fetch by ID
      .addCase(fetchCostCenterChangeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCostCenterChangeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChange = action.payload;
      })
      .addCase(fetchCostCenterChangeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Masraf merkezi değişikliği yüklenirken hata oluştu';
      })
      // Create
      .addCase(createCostCenterChange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCostCenterChange.fulfilled, (state, action) => {
        state.loading = false;
        state.changes.unshift(action.payload);
        state.totalCount += 1;
      })
      .addCase(createCostCenterChange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Masraf merkezi değişikliği oluşturulurken hata oluştu';
      })
      // Update
      .addCase(updateCostCenterChange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCostCenterChange.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.changes.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.changes[index] = action.payload;
        }
        if (state.currentChange?.id === action.payload.id) {
          state.currentChange = action.payload;
        }
      })
      .addCase(updateCostCenterChange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Masraf merkezi değişikliği güncellenirken hata oluştu';
      })
      // Delete
      .addCase(deleteCostCenterChange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCostCenterChange.fulfilled, (state, action) => {
        state.loading = false;
        state.changes = state.changes.filter((c) => c.id !== action.payload);
        state.totalCount -= 1;
      })
      .addCase(deleteCostCenterChange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Masraf merkezi değişikliği silinirken hata oluştu';
      })
      // Approve
      .addCase(approveCostCenterChange.fulfilled, (state, action) => {
        const index = state.changes.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.changes[index] = action.payload;
        }
        if (state.currentChange?.id === action.payload.id) {
          state.currentChange = action.payload;
        }
      })
      // Reject
      .addCase(rejectCostCenterChange.fulfilled, (state, action) => {
        const index = state.changes.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.changes[index] = action.payload;
        }
        if (state.currentChange?.id === action.payload.id) {
          state.currentChange = action.payload;
        }
      });
  },
});

export const { clearCurrentChange, clearError } = costCentersSlice.actions;
export default costCentersSlice.reducer;
