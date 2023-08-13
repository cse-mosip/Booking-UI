import React from "react";
import { Navigate } from "react-router-dom";
import { User } from "../types";
import { useSelector } from "react-redux";
import { AppState } from "../redux/reducer";

const ProtectedRoute = ({ permissions, children }) => {
  const user: User | null = useSelector((state: AppState) => state.user.user);

  if (user) {
    if (!permissions) return children;
    else if (permissions.includes(user.role)) return children;
    else {
      return (
        <Navigate
          replace
          to={{
            pathname: "/dashboard",
          }}
        />
      );
    }
  } else {
    return (
      <Navigate
        to={{
          pathname: "/",
        }}
      />
    );
  }
};

export default ProtectedRoute;
