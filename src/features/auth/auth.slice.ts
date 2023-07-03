import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar: string;
  photos: string[];
}

export interface AuthState {
  token: string | null;
  isOtpSent: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  errors: string[];
  profile?: Profile;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isOtpSent: false,
  isAuthenticated: false,
  loading: false,
  errors: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    authError: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    setErrors: (state, action: PayloadAction<string | string[]>) => {
      if (Array.isArray(action.payload)) {
        state.errors = action.payload;
      } else {
        state.errors = [action.payload];
      }
    },
    userLoaded: (state, action: PayloadAction<Profile>) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.profile = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.profile = undefined;
    },
  },
});

export const { setLoading, loginSuccess, authError, setErrors, userLoaded, logout } =
  authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectErrors = (state: RootState) => state.auth.errors;
export const selectProfile = (state: RootState) => state.auth.profile;

export default authSlice.reducer;
