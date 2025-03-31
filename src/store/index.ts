import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here as the application grows
  },
});

// Define RootState type for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 