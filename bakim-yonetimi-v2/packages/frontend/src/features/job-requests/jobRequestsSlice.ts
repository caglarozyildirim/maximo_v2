import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import type { JobRequest, PaginatedResponse, ApiResponse, JobRequestFormData } from '../../types/index';

interface JobRequestsState {
  list: JobRequest[];
  current: JobRequest | null;
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const initialState: JobRequestsState = {
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

// Fetch all job requests
export const fetchJobRequests = createAsyncThunk(
  'jobRequests/fetchAll',
  async (params: { page?: number; limit?: number; status?: string; search?: string }) => {
    const response = await api.get<PaginatedResponse<JobRequest>>('/job-requests', { params });
    return response.data;
  }
);

// Fetch single job request
export const fetchJobRequestById = createAsyncThunk(
  'jobRequests/fetchOne',
  async (id: number) => {
    const response = await api.get<ApiResponse<JobRequest>>(`/job-requests/${id}`);
    return response.data.data;
  }
);

// Create job request
export const createJobRequest = createAsyncThunk(
  'jobRequests/create',
  async (data: JobRequestFormData) => {
    const response = await api.post<ApiResponse<JobRequest>>('/job-requests', data);
    return response.data.data;
  }
);

// Update job request
export const updateJobRequest = createAsyncThunk(
  'jobRequests/update',
  async ({ id, data }: { id: string; data: Partial<JobRequestFormData> }) => {
    const response = await api.patch<ApiResponse<JobRequest>>(`/job-requests/${id}`, data);
    return response.data.data;
  }
);

// Submit for approval
export const submitForApproval = createAsyncThunk(
  'jobRequests/submit',
  async (id: string) => {
    const response = await api.post<ApiResponse<JobRequest>>(`/job-requests/${id}/submit`);
    return response.data.data;
  }
);

// Approve
export const approveJobRequest = createAsyncThunk(
  'jobRequests/approve',
  async ({ id, comment }: { id: string; comment?: string }) => {
    const response = await api.post<ApiResponse<JobRequest>>(`/job-requests/${id}/approve`, {
      comment,
    });
    return response.data.data;
  }
);

// Reject
export const rejectJobRequest = createAsyncThunk(
  'jobRequests/reject',
  async ({ id, comment }: { id: string; comment: string }) => {
    const response = await api.post<ApiResponse<JobRequest>>(`/job-requests/${id}/reject`, {
      comment,
    });
    return response.data.data;
  }
);

// Delete
export const deleteJobRequest = createAsyncThunk(
  'jobRequests/delete',
  async (id: string) => {
    await api.delete(`/job-requests/${id}`);
    return id;
  }
);

const jobRequestsSlice = createSlice({
  name: 'jobRequests',
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
      .addCase(fetchJobRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchJobRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch job requests';
      })
      // Fetch one
      .addCase(fetchJobRequestById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobRequestById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      // Create
      .addCase(createJobRequest.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      // Update
      .addCase(updateJobRequest.fulfilled, (state, action) => {
        state.current = action.payload;
        const index = state.list.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      // Delete
      .addCase(deleteJobRequest.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.id.toString() !== action.payload);
        if (state.current?.id.toString() === action.payload) {
          state.current = null;
        }
      })
      // Submit, Approve, Reject
      .addCase(submitForApproval.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(approveJobRequest.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(rejectJobRequest.fulfilled, (state, action) => {
        state.current = action.payload;
      });
  },
});

export const { clearCurrent, clearError } = jobRequestsSlice.actions;
export default jobRequestsSlice.reducer;
