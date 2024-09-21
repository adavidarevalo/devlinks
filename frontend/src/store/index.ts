// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './slices/globalSlice';
import linksReducer from './slices/linksSlice';

// Configura el store
export const store = configureStore({
  reducer: {
    global: globalReducer,
    links: linksReducer,
  },
});

// Tipos para usar con TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
