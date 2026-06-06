import React from "react";
import { useAuth } from "../../context/AuthContext";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  return user?.role === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

export default Dashboard;
