import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios';

// Async thunks
export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async ({ status, page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      params.append('page', page);
      params.append('limit', limit);

      const response = await api.get(`/bookings?${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch bookings'
      );
    }
  }
);

export const fetchBookingById = createAsyncThunk(
  'bookings/fetchBookingById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch booking'
      );
    }
  }
);

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await api.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create booking'
      );
    }
  }
);

export const updateBookingStatus = createAsyncThunk(
  'bookings/updateBookingStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/bookings/${id}/status`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update booking status'
      );
    }
  }
);

export const updateBooking = createAsyncThunk(
  'bookings/updateBooking',
  async ({ id, bookingData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/bookings/${id}`, bookingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update booking'
      );
    }
  }
);

export const deleteBooking = createAsyncThunk(
  'bookings/deleteBooking',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/bookings/${id}`);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete booking'
      );
    }
  }
);

export const fetchBookingStats = createAsyncThunk(
  'bookings/fetchBookingStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/bookings/stats');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch booking stats'
      );
    }
  }
);

// Initial state
const initialState = {
  bookings: [],
  currentBooking: null,
  stats: {
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    inProgressBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    todayBookings: 0,
  },
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
    count: 0,
  },
  loading: false,
  error: null,
};

// Booking slice
const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Bookings
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.bookings || [];
        state.pagination = {
          page: action.payload.page || 1,
          pages: action.payload.pages || 1,
          total: action.payload.total || 0,
          count: action.payload.count || 0,
        };
        state.error = null;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Booking By ID
      .addCase(fetchBookingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload.booking;
        state.error = null;
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.unshift(action.payload.booking);
        state.pagination.total += 1;
        state.pagination.count += 1;
        state.error = null;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Booking Status
      .addCase(updateBookingStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bookings.findIndex(
          booking => booking._id === action.payload.booking._id
        );
        if (index !== -1) {
          state.bookings[index] = action.payload.booking;
        }
        state.currentBooking = action.payload.booking;
        state.error = null;
      })
      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Booking
      .addCase(updateBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bookings.findIndex(
          booking => booking._id === action.payload.booking._id
        );
        if (index !== -1) {
          state.bookings[index] = action.payload.booking;
        }
        state.currentBooking = action.payload.booking;
        state.error = null;
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Booking
      .addCase(deleteBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = state.bookings.filter(
          booking => booking._id !== action.payload.id
        );
        state.pagination.total -= 1;
        state.pagination.count -= 1;
        state.error = null;
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Booking Stats
      .addCase(fetchBookingStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.error = null;
      })
      .addCase(fetchBookingStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentBooking, setPage } = bookingSlice.actions;
export default bookingSlice.reducer;