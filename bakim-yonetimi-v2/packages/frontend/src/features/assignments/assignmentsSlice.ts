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
    color?: string;
  };
}

interface Department {
  id: number;
  name: string;
}

interface Location {
  id: number;
  name: string;
}

export interface Assignment {
  id: number;
  assignmentNumber: string;
  assetId: number;
  assignedToUserId: number;
  assignmentDate: string;
  returnDate: string | null;
  notes: string | null;
  returnNotes: string | null;
  isActive: boolean;
  assignmentTypeId: number | null;
  departmentId: number | null;
  locationId: number | null;
  asset: Asset;
  assignedToUser: User;
  department: Department | null;
  location: Location | null;
  createdBy: User;
  returnedBy: User | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssignmentData {
  assetId: number;
  assignedToUserId: number;
  assignmentDate: string;
  notes?: string;
  assignmentTypeId?: number;
  departmentId?: number;
  locationId?: number;
}

export interface UpdateAssignmentData {
  notes?: string;
  assignmentTypeId?: number;
  departmentId?: number;
  locationId?: number;
}

export interface ReturnAssignmentData {
  returnNotes?: string;
}

interface AssignmentsState {
  assignments: Assignment[];
  current: Assignment | null;
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  statistics: {
    totalAssignments: number;
    activeAssignments: number;
    returnedAssignments: number;
    assignmentsByUser: number;
  } | null;
}

const initialState: AssignmentsState = {
  assignments: [],
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

interface FetchAssignmentsParams {
  page?: number;
  limit?: number;
  search?: string;
  assetId?: number;
  assignedToUserId?: number;
  isActive?: boolean;
  assignmentTypeId?: number;
  departmentId?: number;
  locationId?: number;
}

export const fetchAssignments = createAsyncThunk(
  'assignments/fetchAll',
  async (params: FetchAssignmentsParams = {}) => {
    const response = await api.get<ApiResponse<Assignment[]>>('/assignments', { params });
    return response.data;
  }
);

export const fetchAssignmentById = createAsyncThunk(
  'assignments/fetchById',
  async (id: number) => {
    const response = await api.get<ApiResponse<Assignment>>(`/assignments/${id}`);
    return response.data.data;
  }
);

export const createAssignment = createAsyncThunk(
  'assignments/create',
  async (data: CreateAssignmentData) => {
    const response = await api.post<ApiResponse<Assignment>>('/assignments', data);
    return response.data.data;
  }
);

export const updateAssignment = createAsyncThunk(
  'assignments/update',
  async ({ id, data }: { id: number; data: UpdateAssignmentData }) => {
    const response = await api.patch<ApiResponse<Assignment>>(`/assignments/${id}`, data);
    return response.data.data;
  }
);

export const returnAssignment = createAsyncThunk(
  'assignments/return',
  async ({ id, data }: { id: number; data: ReturnAssignmentData }) => {
    const response = await api.post<ApiResponse<Assignment>>(`/assignments/${id}/return`, data);
    return response.data.data;
  }
);

export const deleteAssignment = createAsyncThunk(
  'assignments/delete',
  async (id: number) => {
    await api.delete(`/assignments/${id}`);
    return id;
  }
);

export const fetchAssignmentStatistics = createAsyncThunk(
  'assignments/statistics',
  async () => {
    const response = await api.get<ApiResponse<AssignmentsState['statistics']>>('/assignments/statistics');
    return response.data.data;
  }
);

const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch assignments
      .addCase(fetchAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = action.payload.data;
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch assignments';
      })

      // Fetch assignment by id
      .addCase(fetchAssignmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchAssignmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch assignment';
      })

      // Create assignment
      .addCase(createAssignment.fulfilled, (state, action) => {
        state.assignments.unshift(action.payload);
      })

      // Update assignment
      .addCase(updateAssignment.fulfilled, (state, action) => {
        const index = state.assignments.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) {
          state.assignments[index] = action.payload;
        }
        if (state.current?.id === action.payload.id) {
          state.current = action.payload;
        }
      })

      // Return assignment
      .addCase(returnAssignment.fulfilled, (state, action) => {
        const index = state.assignments.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) {
          state.assignments[index] = action.payload;
        }
        if (state.current?.id === action.payload.id) {
          state.current = action.payload;
        }
      })

      // Delete assignment
      .addCase(deleteAssignment.fulfilled, (state, action) => {
        state.assignments = state.assignments.filter((a) => a.id !== action.payload);
      })

      // Fetch statistics
      .addCase(fetchAssignmentStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload;
      });
  },
});

export default assignmentsSlice.reducer;
