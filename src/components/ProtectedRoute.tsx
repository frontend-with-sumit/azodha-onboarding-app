import { useAppSelector } from "@/hooks/useActions"
import { Navigate, Outlet, useLocation } from "react-router"

const ProtectedRoute = () => {
  const location = useLocation()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const isCompleted = useAppSelector((state) => state.onboarding.isCompleted)

  if (!isAuthenticated) return <Navigate to="/login" replace />

  if (location.pathname.includes("/dashboard") && !isCompleted)
    return <Navigate to="/onboarding" replace />

  if (location.pathname.includes("/onboarding") && isCompleted)
    return <Navigate to="/dashboard" replace />

  return <Outlet />
}

export default ProtectedRoute
