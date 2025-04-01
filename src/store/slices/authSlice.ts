import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Test credentials for easy access:
// Admin User: admin@example.com / password
// Therapist User: therapist@mentalspace.com / therapist123
// Client Manager: manager@mentalspace.com / manager123

// Define types for our state
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

// Test users for demo purposes
const TEST_USERS = {
  admin: {
    email: 'admin@example.com',
    password: 'password',
    userData: {
      id: 1,
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      role: 'Admin'
    }
  },
  therapist: {
    email: 'therapist@mentalspace.com',
    password: 'therapist123',
    userData: {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Thompson',
      email: 'therapist@mentalspace.com',
      role: 'Therapist'
    }
  },
  manager: {
    email: 'manager@mentalspace.com',
    password: 'manager123',
    userData: {
      id: 3,
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'manager@mentalspace.com',
      role: 'Manager'
    }
  }
};

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
};

// Create the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Export actions and reducer
export const { loginRequest, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer;

// Async thunk actions (would connect to actual API in a real app)
// These would be properly typed and implemented in a real application
export const login = (email: string, password: string) => async (dispatch: any) => {
  try {
    dispatch(loginRequest());
    
    // This is a mock API call - in a real app, you would make an actual API request here
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check against our test users
    if (email === TEST_USERS.admin.email && password === TEST_USERS.admin.password) {
      dispatch(loginSuccess({ 
        user: TEST_USERS.admin.userData,
        token: 'admin-mock-jwt-token'
      }));
      return true;
    } 
    else if (email === TEST_USERS.therapist.email && password === TEST_USERS.therapist.password) {
      dispatch(loginSuccess({ 
        user: TEST_USERS.therapist.userData,
        token: 'therapist-mock-jwt-token'
      }));
      return true;
    }
    else if (email === TEST_USERS.manager.email && password === TEST_USERS.manager.password) {
      dispatch(loginSuccess({ 
        user: TEST_USERS.manager.userData,
        token: 'manager-mock-jwt-token'
      }));
      return true;
    }
    else {
      dispatch(loginFailure('Invalid email or password'));
      return false;
    }
  } catch (error) {
    dispatch(loginFailure(error instanceof Error ? error.message : 'An unknown error occurred'));
    return false;
  }
}; 