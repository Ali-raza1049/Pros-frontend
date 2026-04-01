import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios';

// Async thunks
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/services');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch services'
      );
    }
  }
);

export const fetchServiceById = createAsyncThunk(
  'services/fetchServiceById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/services/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch service'
      );
    }
  }
);

export const createService = createAsyncThunk(
  'services/createService',
  async (serviceData, { rejectWithValue }) => {
    try {
      const response = await api.post('/services', serviceData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create service'
      );
    }
  }
);

export const updateService = createAsyncThunk(
  'services/updateService',
  async ({ id, serviceData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/services/${id}`, serviceData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update service'
      );
    }
  }
);

export const deleteService = createAsyncThunk(
  'services/deleteService',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/services/${id}`);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete service'
      );
    }
  }
);

export const toggleServiceStatus = createAsyncThunk(
  'services/toggleServiceStatus',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/services/${id}/toggle-status`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to toggle service status'
      );
    }
  }
);

// Initial state
const initialState = {
  services: [],
  currentService: null,
  loading: false,
  error: null,
  totalServices: 0,
};

// Service slice
const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentService: (state) => {
      state.currentService = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Services
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.services || [];
        state.totalServices = action.payload.count || 0;
        state.error = null;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Service By ID
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentService = action.payload.service;
        state.error = null;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Service
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.services.unshift(action.payload.service);
        state.totalServices += 1;
        state.error = null;
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Service
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.services.findIndex(
          service => service._id === action.payload.service._id
        );
        if (index !== -1) {
          state.services[index] = action.payload.service;
        }
        state.currentService = action.payload.service;
        state.error = null;
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Service
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter(
          service => service._id !== action.payload.id
        );
        state.totalServices -= 1;
        state.error = null;
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Toggle Service Status
      .addCase(toggleServiceStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleServiceStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.services.findIndex(
          service => service._id === action.payload.service._id
        );
        if (index !== -1) {
          state.services[index] = action.payload.service;
        }
        state.error = null;
      })
      .addCase(toggleServiceStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentService } = serviceSlice.actions;
export default serviceSlice.reducer;