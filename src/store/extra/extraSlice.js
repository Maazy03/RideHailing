import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const initialSetupRequest = createAsyncThunk(
  'plans/initialSetupRequest',
  async data => {
    return data;
  },
);

export const confirmDropOffExtra = createAsyncThunk(
  'extra/confirmDropOffExtra',
  async data => {
    try {
      return {
        status: 'success',
        error: false,
        message: 'Success! You are logged out!',
        location: data,
      };
    } catch (error) {
      return {
        status: 'failed',
        error: true,
        message: 'Oops! Something went wrong!',
        location: false,
      };
    }
  },
);

export const clearPlans = createAsyncThunk('plans/clearPlans', async data => {
  try {
    return {
      status: 'success',
      error: false,
      message: 'Success!',
      isData: data,
    };
  } catch (error) {
    return {
      status: 'failed',
      error: true,
      message: 'Oops! Something went wrong!',
      isData: undefined,
    };
  }
});

const initialState = {
  isLoadingRequest: false,
  status: 'idle',
  error: false,
  errorMessage: '',
  plansData: undefined,
  recurringPlans: [],
  oneTimePlans: [],
  individualPlansData: [],
  dropOffLoc: undefined,
};

const extraSlice = createSlice({
  name: 'extra',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    // PLANS
    [confirmDropOffExtra.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.dropOffLoc = action.payload.location;
    },

    [clearPlans.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.plansData = undefined;
      state.recurringPlans = [];
      state.oneTimePlans = [];
      state.individualPlansData = [];
    },
  },
});

export default extraSlice.reducer;
