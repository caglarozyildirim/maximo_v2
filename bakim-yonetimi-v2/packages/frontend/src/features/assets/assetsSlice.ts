import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

interface Asset {
  id: number;
  assetNumber: string;
  assetName: string;
  description?: string;
  assetType: {
    id: number;
    typeName: string;
  };
  assetStatus: {
    id: number;
    statusName: string;
    color?: string;
  };
  location?: {
    id: number;
    name: string;
  };
  department?: {
    id: number;
    name: string;
  };
  costCenter?: {
    id: number;
    code: string;
    name: string;
  };
  purchasePrice?: number;
  currentValue?: number;
  purchaseDate?: string;
  serialNumber?: string;
  model?: string;
  manufacturer?: string;
  createdAt: string;
  updatedAt: string;
}

interface AssetsState {
  list: Asset[];
  current: Asset | null;
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const initialState: AssetsState = {
  list: [],
  current: null,
  loading: false,
  error: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  },
};

// Fetch all assets
export const fetchAssets = createAsyncThunk(
  'assets/fetchAll',
  async (params: {
    page?: number;
    limit?: number;
    search?: string;
    assetTypeId?: number;
    assetStatusId?: number;
    locationId?: number;
    departmentId?: number;
  }) => {
    const response = await api.get('/assets', { params });
    return response.data;
  }
);

// Fetch single asset
export const fetchAssetById = createAsyncThunk(
  'assets/fetchOne',
  async (id: number) => {
    const response = await api.get(`/assets/${id}`);
    return response.data.data;
  }
);

// Create asset
export const createAsset = createAsyncThunk(
  'assets/create',
  async (data: any) => {
    const response = await api.post('/assets', data);
    return response.data.data;
  }
);

// Update asset
export const updateAsset = createAsyncThunk(
  'assets/update',
  async ({ id, data }: { id: string; data: any }) => {
    const response = await api.patch(`/assets/${id}`, data);
    return response.data.data;
  }
);

// Delete asset
export const deleteAsset = createAsyncThunk(
  'assets/delete',
  async (id: string) => {
    await api.delete(`/assets/${id}`);
    return id;
  }
);

// Get statistics
export const fetchAssetStatistics = createAsyncThunk(
  'assets/statistics',
  async () => {
    const response = await api.get('/assets/statistics');
    return response.data.data;
  }
);

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch assets';
      })
      // Fetch one
      .addCase(fetchAssetById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAssetById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      // Create
      .addCase(createAsset.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      // Update
      .addCase(updateAsset.fulfilled, (state, action) => {
        state.current = action.payload;
        const index = state.list.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      // Delete
      .addCase(deleteAsset.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.id.toString() !== action.payload);
        if (state.current?.id.toString() === action.payload) {
          state.current = null;
        }
      });
  },
});

export const { clearCurrent, clearError } = assetsSlice.actions;
export default assetsSlice.reducer;
