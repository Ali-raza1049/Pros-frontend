import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios';

// Async thunks
export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/dashboard');
      return response.data;
    } catch (error) {
      console.error('Dashboard API Error:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch dashboard stats'
      );
    }
  }
);

// Initial state
const initialState = {
  stats: {
    totalServices: 0,
    activeServices: 0,
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    inProgressBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    todayBookings: 0,
    weekBookings: 0,
    monthBookings: 0,
    totalRevenue: 0,
    currentMonthRevenue: 0,
  },
  recentBookings: [],
  popularServices: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

// Dashboard slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    refreshDashboard: (state) => {
      state.loading = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Dashboard Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload.data;
        
        // Ensure all stats have default values
        state.stats = {
          totalServices: data.totalServices || 0,
          activeServices: data.activeServices || 0,
          totalBookings: data.totalBookings || 0,
          pendingBookings: data.pendingBookings || 0,
          confirmedBookings: data.confirmedBookings || 0,
          inProgressBookings: data.inProgressBookings || 0,
          completedBookings: data.completedBookings || 0,
          cancelledBookings: data.cancelledBookings || 0,
          todayBookings: data.todayBookings || 0,
          weekBookings: data.weekBookings || 0,
          monthBookings: data.monthBookings || 0,
          totalRevenue: data.totalRevenue || 0,
          currentMonthRevenue: data.currentMonthRevenue || 0,
        };
        
        state.recentBookings = data.recentBookings || [];
        state.popularServices = data.popularServices || [];
        state.lastUpdated = new Date().toISOString();
        state.error = null;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error('Dashboard fetch failed:', action.payload);
      });
  },
});

export const { clearError, refreshDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;