import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { setAuthToken } from "../features/core/setAuthToken";
import authSlice from "../features/auth/auth.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

let currentState = store.getState();

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  const previousState = currentState;
  currentState = store.getState();
  // if the token changes set the value in localStorage and axios headers
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    console.log("token:", token);
    setAuthToken(token);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
