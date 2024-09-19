// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './slices/globalSlice';

// Configura el store
export const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});

// Tipos para usar con TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
