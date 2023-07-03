import React from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../../../app/hooks";
import { selectIsAuthenticated } from "../../auth/auth.slice";

const PageNotFound: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (isAuthenticated && <Navigate to={"/profile"} />) || <Navigate to={"/login"} />;
};

export default PageNotFound;
