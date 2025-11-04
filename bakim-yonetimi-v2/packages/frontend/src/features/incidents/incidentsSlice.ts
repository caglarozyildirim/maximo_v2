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
  location?: {
    id: number;
    name: string;
  };
}

interface IncidentType {
  id: number;
  typeName: string;
}

interface Status {
  id: number;
  statusName: string;
  color?: string;
}

interface Location {
  id: number;
  name: string;
}

export interface Incident {
  id: number;
  incidentNumber: string;
  assetId: number;
  incidentTypeId: number;
  title: string;
  description: string;
  incidentDate: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  reportedByUserId: number;
  assignedToUserId: number | null;
  locationId: number | null;
  statusId: number;
  immediateAction: string | null;
  rootCause: string | null;
  correctiveAction: string | null;
  preventiveAction: string | null;
  resolvedDate: string | null;
  asset: Asset;
  incidentType: IncidentType;
  status: Status;
  reportedByUser: User;
  assignedToUser: User | null;
  location: Location | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIncidentData {
  assetId: number;
  incidentTypeId: number;
  title: string;
  description: string;
  incidentDate: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  reportedByUserId: number;
  locationId?: number;
  immediateAction?: string;
}

export interface UpdateIncidentData {
  title?: string;
  description?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  statusId?: number;
  assignedToUserId?: number;
  immediateAction?: string;
  rootCause?: string;
  correctiveAction?: string;
  preventiveAction?: string;
  resolvedDate?: string;
}

interface IncidentsState {
  incidents: Incident[];
  current: Incident | null;
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  statistics: {
    totalIncidents: number;
    reportedIncidents: number;
    inProgressIncidents: number;
    resolvedIncidents: number;
    criticalIncidents: number;
    incidentsBySeverity: any[];
  } | null;
}

const initialState: IncidentsState = {
  incidents: [],
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

interface FetchIncidentsParams {
  page?: number;
  limit?: number;
  search?: string;
  assetId?: number;
  incidentTypeId?: number;
  statusId?: number;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  reportedByUserId?: number;
  assignedToUserId?: number;
  startDate?: string;
  endDate?: string;
}

export const fetchIncidents = createAsyncThunk(
  'incidents/fetchAll',
  async (params: FetchIncidentsParams = {}) => {
    const response = await api.get<ApiResponse<Incident[]>>('/incidents', { params });
    return response.data;
  }
);

export const fetchIncidentById = createAsyncThunk(
  'incidents/fetchById',
  async (id: number) => {
    const response = await api.get<ApiResponse<Incident>>(`/incidents/${id}`);
    return response.data.data;
  }
);

export const createIncident = createAsyncThunk(
  'incidents/create',
  async (data: CreateIncidentData) => {
    const response = await api.post<ApiResponse<Incident>>('/incidents', data);
    return response.data.data;
  }
);

export const updateIncident = createAsyncThunk(
  'incidents/update',
  async ({ id, data }: { id: number; data: UpdateIncidentData }) => {
    const response = await api.patch<ApiResponse<Incident>>(`/incidents/${id}`, data);
    return response.data.data;
  }
);

export const deleteIncident = createAsyncThunk(
  'incidents/delete',
  async (id: number) => {
    await api.delete(`/incidents/${id}`);
    return id;
  }
);

export const fetchIncidentStatistics = createAsyncThunk(
  'incidents/statistics',
  async () => {
    const response = await api.get<ApiResponse<IncidentsState['statistics']>>('/incidents/statistics');
    return response.data.data;
  }
);

const incidentsSlice = createSlice({
  name: 'incidents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch incidents
      .addCase(fetchIncidents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncidents.fulfilled, (state, action) => {
        state.loading = false;
        state.incidents = action.payload.data;
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(fetchIncidents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch incidents';
      })

      // Fetch incident by id
      .addCase(fetchIncidentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncidentById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchIncidentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch incident';
      })

      // Create incident
      .addCase(createIncident.fulfilled, (state, action) => {
        state.incidents.unshift(action.payload);
      })

      // Update incident
      .addCase(updateIncident.fulfilled, (state, action) => {
        const index = state.incidents.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) {
          state.incidents[index] = action.payload;
        }
        if (state.current?.id === action.payload.id) {
          state.current = action.payload;
        }
      })

      // Delete incident
      .addCase(deleteIncident.fulfilled, (state, action) => {
        state.incidents = state.incidents.filter((i) => i.id !== action.payload);
      })

      // Fetch statistics
      .addCase(fetchIncidentStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload;
      });
  },
});

export default incidentsSlice.reducer;
