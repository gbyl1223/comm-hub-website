import { createBrowserRouter, Navigate } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { ChangePasswordPage } from "./pages/ChangePasswordPage";
import { PortalLayout } from "./components/portal/PortalLayout";
import { DashboardPage } from "./pages/portal/DashboardPage";
import { DiscussionsPage } from "./pages/portal/DiscussionsPage";
import { TopicDetailPage } from "./pages/portal/TopicDetailPage";
import { OpportunitiesPage } from "./pages/portal/OpportunitiesPage";
import { MembersPage } from "./pages/portal/MembersPage";
import { MessagesPage } from "./pages/portal/MessagesPage";
import { ProfilePage } from "./pages/portal/ProfilePage";
import { CoordinatorDashboard } from "./pages/coordinator/CoordinatorDashboard";
import { useAuth } from "./context/AuthContext";

// Guard component for authenticated routes
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.mustChangePassword) return <Navigate to="/change-password" replace />;
  return <>{children}</>;
}

function RequireAuthForPasswordChange({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

// We can't use hooks in createBrowserRouter directly, so we use wrapper components
function PortalLayoutGuard() {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.mustChangePassword) return <Navigate to="/change-password" replace />;
  return <PortalLayout />;
}

function CoordinatorGuard() {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.mustChangePassword) return <Navigate to="/change-password" replace />;
  if (user?.role !== "coordinator" && user?.role !== "admin") {
    return <Navigate to="/portal" replace />;
  }
  return <CoordinatorDashboard />;
}

function ChangePasswordGuard() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <ChangePasswordPage />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/change-password",
    element: <ChangePasswordGuard />,
  },
  {
    path: "/portal",
    element: <PortalLayoutGuard />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "discussions", element: <DiscussionsPage /> },
      { path: "discussions/:id", element: <TopicDetailPage /> },
      { path: "opportunities", element: <OpportunitiesPage /> },
      { path: "members", element: <MembersPage /> },
      { path: "messages", element: <MessagesPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
  {
    path: "/coordinator",
    element: <CoordinatorGuard />,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
