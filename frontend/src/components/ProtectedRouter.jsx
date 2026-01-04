import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/SessionContext";

const ProtectedRouter = ({ loading }) => {
  const { isLoggedIn } = useSession();
  console.log("the logged in: ", isLoggedIn);
  if (loading) {
    return <div>Loading ...</div>;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRouter;
