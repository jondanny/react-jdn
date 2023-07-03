import { StrictMode, Suspense, useEffect } from "react";
import { Provider as StoreProvider } from "react-redux";
import { CssBaseline, Icon } from "@mui/material";
import { RouterProvider } from "react-router-dom";

import { store } from "../app/store";
import { router } from "../app/router";
import { setAuthToken } from "./core/setAuthToken";
import { loadUser } from "./auth/auth.api";

export default function App() {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
      loadUser();
    }
    // log user out from all tabs if they log out in one tab
    // window.addEventListener('storage', () => {
    //   if (!localStorage.token) store.dispatch(logout());
    // });
  }, []);

  return (
    <StrictMode>
      <CssBaseline />
      <Suspense fallback={<Icon>pending</Icon>}>
        <StoreProvider store={store}>
          <RouterProvider router={router} />
        </StoreProvider>
      </Suspense>
    </StrictMode>
  );
}
