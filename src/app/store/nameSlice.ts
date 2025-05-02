import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NameState {
  value: string;
}

const initialState: NameState = {
  value: '',
};

export const nameSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setName } = nameSlice.actions;
export default nameSlice.reducer;
