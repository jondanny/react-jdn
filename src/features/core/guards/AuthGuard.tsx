import React from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../../../app/hooks";
import { selectIsAuthenticated } from "../../auth/auth.slice";

const AuthGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (isAuthenticated && <>{children}</>) || <Navigate to={"/login"} />;
};

export default AuthGuard;
