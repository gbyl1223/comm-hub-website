import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  MessageSquare,
  Briefcase,
  Users,
  Mail,
  User,
  LogOut,
  Shield,
  Menu,
  X,
  Bell,
  ChevronDown,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/portal", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/portal/discussions", label: "Discussions", icon: MessageSquare },
  { to: "/portal/opportunities", label: "Opportunities", icon: Briefcase },
  { to: "/portal/members", label: "Members", icon: Users },
  { to: "/portal/messages", label: "Messages", icon: Mail },
  { to: "/portal/profile", label: "My Profile", icon: User },
];

export function PortalLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const roleLabel =
    user?.role === "coordinator"
      ? "District Coordinator"
      : user?.role === "admin"
      ? "Administrator"
      : "Member";

  const roleBadgeColor =
    user?.role === "coordinator"
      ? "bg-indigo-100 text-indigo-700"
      : user?.role === "admin"
      ? "bg-purple-100 text-purple-700"
      : "bg-blue-100 text-blue-700";

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 flex flex-col bg-white border-r border-gray-100 shadow-sm transform transition-transform duration-200 lg:transform-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #1b4f8a, #2563eb)" }}
            >
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-gray-900 text-sm" style={{ fontWeight: 700, lineHeight: 1.2 }}>
                CommunityHub
              </p>
              <p className="text-gray-400" style={{ fontSize: "10px" }}>Member Portal</p>
            </div>
          </div>
          <button
            className="lg:hidden text-gray-400 hover:text-gray-600"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User card */}
        <div className="mx-3 mt-3 mb-1 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
          <div className="flex items-center gap-2.5">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-lg object-cover" />
            ) : (
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm"
                style={{ background: "linear-gradient(135deg, #1b4f8a, #2563eb)", fontWeight: 700 }}
              >
                {user?.name?.[0]}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-gray-900 text-sm truncate" style={{ fontWeight: 600 }}>
                {user?.name}
              </p>
              <span className={`inline-block text-xs px-1.5 py-0.5 rounded-md ${roleBadgeColor}`} style={{ fontWeight: 500 }}>
                {roleLabel}
              </span>
            </div>
          </div>
          <p className="text-gray-400 text-xs mt-1.5">{user?.district}</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <p className="text-gray-400 px-2 mb-1" style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Navigation
          </p>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm mb-0.5 transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
              style={{ fontWeight: 500 }}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}

          {/* Coordinator extra */}
          {(user?.role === "coordinator" || user?.role === "admin") && (
            <>
              <div className="my-3 border-t border-gray-100" />
              <p className="text-gray-400 px-2 mb-1" style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Coordinator
              </p>
              <NavLink
                to="/coordinator"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm mb-0.5 transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
                style={{ fontWeight: 500 }}
              >
                {({ isActive }) => (
                  <>
                    <Settings className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                    District Dashboard
                  </>
                )}
              </NavLink>
            </>
          )}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all"
            style={{ fontWeight: 500 }}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-4 lg:px-6 py-3.5 bg-white border-b border-gray-100 shrink-0">
          <button
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden lg:block">
            <p className="text-gray-400 text-sm">
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Notifications */}
            <button className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-lg object-cover" />
                ) : (
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs"
                    style={{ background: "linear-gradient(135deg, #1b4f8a, #2563eb)", fontWeight: 700 }}
                  >
                    {user?.name?.[0]}
                  </div>
                )}
                <span className="hidden sm:block text-sm text-gray-700" style={{ fontWeight: 500 }}>
                  {user?.name?.split(" ")[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  <button
                    onClick={() => { navigate("/portal/profile"); setProfileOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    My Profile
                  </button>
                  <div className="border-t border-gray-100 my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
