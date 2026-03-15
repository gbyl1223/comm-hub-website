import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Lock, Mail, Shield, Users, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (!result.success) {
        setError(result.error || "Login failed.");
      } else {
        // We need to check the user after login — use the mock users directly
        const mockUser = [
          { email: "member@example.com", mustChangePassword: true, role: "member" },
          { email: "coordinator@example.com", mustChangePassword: false, role: "coordinator" },
          { email: "admin@example.com", mustChangePassword: false, role: "admin" },
          { email: "michael@example.com", mustChangePassword: false, role: "member" },
        ].find((u) => u.email.toLowerCase() === email.toLowerCase());

        if (mockUser?.mustChangePassword) {
          navigate("/change-password");
        } else if (mockUser?.role === "coordinator" || mockUser?.role === "admin") {
          navigate("/coordinator");
        } else {
          navigate("/portal");
        }
      }
    }, 800);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
    setTimeout(() => {
      setForgotSent(false);
      setShowForgotPassword(false);
      setForgotEmail("");
    }, 3000);
  };

  // Demo credentials helper
  const fillDemo = (role: "member" | "coordinator") => {
    if (role === "member") {
      setEmail("member@example.com");
      setPassword("Temp1234!");
    } else {
      setEmail("coordinator@example.com");
      setPassword("Temp1234!");
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Left Panel — Brand */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f2a4a 0%, #1b4f8a 50%, #2563eb 100%)",
        }}
      >
        {/* Background circles */}
        <div
          className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #60a5fa 0%, transparent 70%)" }}
        />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-xl" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              CommunityHub
            </span>
          </div>
          <p className="text-blue-200 text-sm">Member Portal</p>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <div className="mb-8">
            <div className="w-16 h-1 bg-blue-400 rounded-full mb-6" />
            <h1
              className="text-white mb-4"
              style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.03em" }}
            >
              Connect. Collaborate.
              <br />
              <span style={{ color: "#93c5fd" }}>Grow Together.</span>
            </h1>
            <p className="text-blue-100 text-base leading-relaxed max-w-md">
              A private space for verified members to connect, share opportunities, and drive real community impact across all districts.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="space-y-3">
            {[
              { icon: <Users className="w-4 h-4" />, text: "Network with members across 6 districts" },
              { icon: <Shield className="w-4 h-4" />, text: "Secure, members-only platform" },
              { icon: <ChevronRight className="w-4 h-4" />, text: "Exclusive opportunities & resources" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-blue-200">
                  {item.icon}
                </div>
                <span className="text-blue-100 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="relative z-10">
          <div className="rounded-2xl overflow-hidden opacity-40 h-32">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1762608206423-be8c07645de7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600"
              alt="Community members"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-blue-200 text-xs mt-3">
            &copy; {new Date().getFullYear()} CommunityHub. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 bg-gray-50 relative">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8 flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #1b4f8a, #2563eb)" }}
          >
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-gray-900 text-lg" style={{ fontWeight: 700 }}>
            CommunityHub
          </span>
        </div>

        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-gray-900 mb-1" style={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
              {showForgotPassword ? "Reset your password" : "Welcome back"}
            </h2>
            <p className="text-gray-500 text-sm">
              {showForgotPassword
                ? "Enter your email and we'll send a reset link"
                : "Sign in to access the member portal"}
            </p>
          </div>

          {/* Demo credentials */}
          {!showForgotPassword && (
            <div className="mb-6 p-3 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-xs text-blue-700 mb-2" style={{ fontWeight: 600 }}>
                Demo Credentials — click to autofill:
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fillDemo("member")}
                  className="flex-1 text-xs py-1.5 px-2 rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  Member (must change pw)
                </button>
                <button
                  type="button"
                  onClick={() => fillDemo("coordinator")}
                  className="flex-1 text-xs py-1.5 px-2 rounded-lg bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  Coordinator
                </button>
              </div>
            </div>
          )}

          {/* Forgot password form */}
          {showForgotPassword ? (
            <form onSubmit={handleForgotPassword}>
              {forgotSent ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-green-800 text-sm" style={{ fontWeight: 600 }}>
                    Reset link sent!
                  </p>
                  <p className="text-green-600 text-xs mt-1">Check your inbox at {forgotEmail}</p>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-1.5" style={{ fontWeight: 500 }}>
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-white text-sm transition-all"
                    style={{ background: "linear-gradient(135deg, #1b4f8a, #2563eb)", fontWeight: 600 }}
                  >
                    Send Reset Link
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Back to login
              </button>
            </form>
          ) : (
            /* Login form */
            <form onSubmit={handleLogin}>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-1.5" style={{ fontWeight: 500 }}>
                  Email / Username
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-2">
                <label className="block text-gray-700 text-sm mb-1.5" style={{ fontWeight: 500 }}>
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Forgot password link */}
              <div className="flex justify-end mb-6">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm hover:underline"
                  style={{ color: "#2563eb", fontWeight: 500 }}
                >
                  Forgot password?
                </button>
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-white text-sm transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-70 mb-3"
                style={{ background: "linear-gradient(135deg, #1b4f8a, #2563eb)", fontWeight: 600 }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Create Profile */}
              <button
                type="button"
                onClick={() => alert("Please contact your district coordinator to register as a member.")}
                className="w-full py-3 rounded-xl text-sm border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-700 transition-all"
                style={{ fontWeight: 500 }}
              >
                Create Profile
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                Access is restricted to paid members only.{" "}
                <span style={{ color: "#2563eb", cursor: "pointer" }}>
                  Contact admin
                </span>{" "}
                to request access.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}