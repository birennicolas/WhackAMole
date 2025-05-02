import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 0 };

const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
  },
});

export const { increment, decrement } = scoreSlice.actions;
export default scoreSlice.reducer;