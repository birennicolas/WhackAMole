import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 0 };

const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    reset: (state) => { state.value = 0; },
  },
});

export const { increment, decrement, reset } = scoreSlice.actions;
export default scoreSlice.reducer;