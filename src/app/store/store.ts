import { configureStore } from '@reduxjs/toolkit';
import scoreReducer from './scoreSlice';
import nameReducer from './nameSlice';
export const store = configureStore({
  reducer: {
    score: scoreReducer,
    name: nameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
