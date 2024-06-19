import { Navigate } from "react-router-dom";
import { UserRole } from "@/domain/UserDomain";

interface ProtectedRouteProps {
  requireAdmin?: boolean;
  element: React.ReactNode;
}

const ProtectedRoute = ({ requireAdmin, element }: ProtectedRouteProps) => {
  const useRole = window.localStorage.getItem(import.meta.env.VITE_USER_ROLE);

  if (!useRole || (requireAdmin && useRole === UserRole.USER)) {
    return <Navigate to="/" />;
  }
  return element;
};

export default ProtectedRoute;
