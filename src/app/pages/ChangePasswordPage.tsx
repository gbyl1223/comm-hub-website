import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Lock, Eye, EyeOff, CheckCircle2, XCircle, Shield } from "lucide-react";

interface PasswordRule {
  label: string;
  test: (pwd: string) => boolean;
}

const PASSWORD_RULES: PasswordRule[] = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "One uppercase letter (A-Z)", test: (p) => /[A-Z]/.test(p) },
  { label: "One lowercase letter (a-z)", test: (p) => /[a-z]/.test(p) },
  { label: "One number (0-9)", test: (p) => /\d/.test(p) },
  { label: "One special character (!@#$...)", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

export function ChangePasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, changePassword } = useAuth();
  const navigate = useNavigate();

  const allRulesPassed = PASSWORD_RULES.every((r) => r.test(newPassword));
  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!allRulesPassed) {
      setError("Please meet all password requirements.");
      return;
    }
    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }
    changePassword(newPassword);
    setSuccess(true);
    setTimeout(() => {
      if (user?.role === "coordinator" || user?.role === "admin") {
        navigate("/coordinator");
      } else {
        navigate("/portal");
      }
    }, 1500);
  };

  const handleSkip = () => {
    // Only allowed if mustChangePassword is false (coordinator demo)
    if (user?.role === "coordinator" || user?.role === "admin") {
      navigate("/coordinator");
    } else {
      navigate("/portal");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%)" }}
    >
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header bar */}
          <div
            className="px-8 py-6 text-white"
            style={{ background: "linear-gradient(135deg, #0f2a4a, #2563eb)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-base" style={{ fontWeight: 700 }}>CommunityHub</span>
            </div>
            <h1 className="text-white" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
              {user?.mustChangePassword ? "Set your new password" : "Change password"}
            </h1>
            <p className="text-blue-200 text-sm mt-1">
              {user?.mustChangePassword
                ? "You must set a new password before accessing the portal."
                : "Create a strong password to secure your account."}
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            {success ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-gray-900 mb-1" style={{ fontWeight: 700 }}>Password Updated!</h3>
                <p className="text-gray-500 text-sm">Redirecting to your portal…</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {/* Greeting */}
                {user && (
                  <p className="text-gray-500 text-sm mb-5">
                    Hi <span className="text-gray-900" style={{ fontWeight: 600 }}>{user.name}</span>! Welcome to the portal.
                  </p>
                )}

                {/* New password */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm mb-1.5" style={{ fontWeight: 500 }}>
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Create a strong password"
                      className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Password rules */}
                {newPassword.length > 0 && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-xl space-y-1.5">
                    {PASSWORD_RULES.map((rule, i) => (
                      <div key={i} className="flex items-center gap-2">
                        {rule.test(newPassword) ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                        )}
                        <span
                          className="text-xs"
                          style={{ color: rule.test(newPassword) ? "#16a34a" : "#9ca3af" }}
                        >
                          {rule.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Confirm password */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm mb-1.5" style={{ fontWeight: 500 }}>
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      className={`w-full pl-10 pr-11 py-3 rounded-xl border bg-gray-50 text-gray-900 text-sm outline-none focus:ring-2 transition-all ${
                        confirmPassword.length > 0
                          ? passwordsMatch
                            ? "border-green-400 focus:border-green-500 focus:ring-green-500/10"
                            : "border-red-300 focus:border-red-400 focus:ring-red-500/10"
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/10"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmPassword.length > 0 && !passwordsMatch && (
                    <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!allRulesPassed || !passwordsMatch}
                  className="w-full py-3 rounded-xl text-white text-sm transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #1b4f8a, #2563eb)", fontWeight: 600 }}
                >
                  Set New Password & Enter Portal
                </button>

                {!user?.mustChangePassword && (
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="w-full mt-3 py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    Skip for now
                  </button>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
