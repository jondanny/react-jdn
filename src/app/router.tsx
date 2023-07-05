import { createBrowserRouter } from "react-router-dom";

import Login from "../features/auth/Login";
import Signup from "../features/auth/Register";
import AuthGuard from "../features/core/guards/AuthGuard";
import Profile from "../features/profile/Profile";
import PageNotFound from "../features/core/page-not-found/PageNotFound";
import RegisterSuccess from "../features/auth/RegisterSuccess";

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
    children: [
      {
        path: "",
        element: <Signup />,
      },
      {
        path: "success",
        element: <RegisterSuccess />,
      },
    ],
  },

  // Unknown Page
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
