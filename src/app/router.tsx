import { createBrowserRouter } from "react-router-dom";

import Login from "../features/auth/Login";
import Signup from "../features/auth/Register";
import AuthGuard from "../features/core/guards/AuthGuard";
import Profile from "../features/profile/Profile";
import PageNotFound from "../features/core/page-not-found/PageNotFound";

export const router = createBrowserRouter([
  // Protected Routes
  {
    path: "profile",
    element: (
      <AuthGuard>
        <Profile />
      </AuthGuard>
    ),
  },

  // Public Routes
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Signup />,
  },

  // Unknown Page
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
