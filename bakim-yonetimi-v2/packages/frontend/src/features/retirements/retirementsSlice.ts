import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

interface Retirement {
  id: number;
  retirementNumber: string;
  assetId: number;
  reason: string;
  retirementDate: string;
  estimatedValue: number | null;
  actualValue: number | null;
  notes: string | null;
  statusId: number;
  asset: any;
  status: any;
  createdBy: any;
  createdAt: string;
}

interface RetirementsState {
  retirements: Retirement[];
  current: Retirement | null;
  loading: boolean;
  pagination: { total: number; page: number; limit: number; totalPages: number };
}

const initialState: RetirementsState = {
  retirements: [],
  current: null,
  loading: false,
  pagination: { total: 0, page: 1, limit: 10, totalPages: 0 },
};

export const fetchRetirements = createAsyncThunk('retirements/fetchAll', async (params: any = {}) => {
  const response = await api.get('/retirements', { params });
  return response.data;
});

export const fetchRetirementById = createAsyncThunk('retirements/fetchById', async (id: number) => {
  const response = await api.get(`/retirements/${id}`);
  return response.data.data;
});

export const createRetirement = createAsyncThunk('retirements/create', async (data: any) => {
  const response = await api.post('/retirements', data);
  return response.data.data;
});

export const updateRetirement = createAsyncThunk('retirements/update', async ({ id, data }: { id: number; data: any }) => {
  const response = await api.patch(`/retirements/${id}`, data);
  return response.data.data;
});

export const deleteRetirement = createAsyncThunk('retirements/delete', async (id: number) => {
  await api.delete(`/retirements/${id}`);
  return id;
});

const retirementsSlice = createSlice({
  name: 'retirements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRetirements.pending, (state) => { state.loading = true; })
      .addCase(fetchRetirements.fulfilled, (state, action) => { state.loading = false; state.retirements = action.payload.data; if (action.payload.pagination) state.pagination = action.payload.pagination; })
      .addCase(fetchRetirements.rejected, (state) => { state.loading = false; })
      .addCase(fetchRetirementById.pending, (state) => { state.loading = true; })
      .addCase(fetchRetirementById.fulfilled, (state, action) => { state.loading = false; state.current = action.payload; })
      .addCase(fetchRetirementById.rejected, (state) => { state.loading = false; })
      .addCase(createRetirement.fulfilled, (state, action) => { state.retirements.unshift(action.payload); })
      .addCase(updateRetirement.fulfilled, (state, action) => { const index = state.retirements.findIndex((r) => r.id === action.payload.id); if (index !== -1) state.retirements[index] = action.payload; if (state.current?.id === action.payload.id) state.current = action.payload; })
      .addCase(deleteRetirement.fulfilled, (state, action) => { state.retirements = state.retirements.filter((r) => r.id !== action.payload); });
  },
});

export default retirementsSlice.reducer;
