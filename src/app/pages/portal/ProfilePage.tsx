import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { User, MapPin, Mail, Phone, Calendar, Edit2, Save, X, Shield, Briefcase } from "lucide-react";

const ALL_SKILLS = [
  "Technology", "Entrepreneurship", "Leadership", "Community Development",
  "Project Management", "Public Speaking", "Finance", "Investment",
  "Healthcare", "Education", "Agriculture", "Real Estate", "Media",
  "Social Enterprise", "Law", "Consulting", "Engineering", "Research",
];

export function ProfilePage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(user?.bio || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [skills, setSkills] = useState<string[]>(["Technology", "Leadership"]);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const roleLabel =
    user?.role === "coordinator"
      ? "District Coordinator"
      : user?.role === "admin"
      ? "Administrator"
      : "Member";

  const roleBadge =
    user?.role === "coordinator"
      ? "bg-indigo-100 text-indigo-700"
      : user?.role === "admin"
      ? "bg-purple-100 text-purple-700"
      : "bg-blue-100 text-blue-700";

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-gray-900" style={{ fontSize: "1.4rem", fontWeight: 700 }}>My Profile</h1>
        {saved && (
          <span className="text-green-600 text-sm flex items-center gap-1.5">
            <Save className="w-4 h-4" /> Saved!
          </span>
        )}
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors"
            style={{ fontWeight: 500 }}
          >
            <Edit2 className="w-3.5 h-3.5" /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm"
              style={{ background: "linear-gradient(135deg, #1b4f8a, #2563eb)", fontWeight: 600 }}
            >
              <Save className="w-3.5 h-3.5" /> Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
        {/* Banner */}
        <div
          className="h-24 relative"
          style={{ background: "linear-gradient(135deg, #0f2a4a, #1b4f8a, #2563eb)" }}
        >
          <div className="absolute inset-0 opacity-10">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${60 + i * 20}px`,
                  height: `${60 + i * 20}px`,
                  background: "white",
                  top: `${-20 + i * 5}px`,
                  right: `${i * 30}px`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="px-6 pb-6 relative">
          {/* Avatar */}
          <div className="-mt-8 mb-4 flex items-end justify-between">
            <div className="relative">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-sm"
                />
              ) : (
                <div
                  className="w-16 h-16 rounded-2xl border-4 border-white shadow-sm flex items-center justify-center text-white text-xl"
                  style={{ background: "linear-gradient(135deg, #1b4f8a, #2563eb)", fontWeight: 700 }}
                >
                  {user?.name?.[0]}
                </div>
              )}
            </div>
            <span className={`text-sm px-3 py-1 rounded-xl ${roleBadge}`} style={{ fontWeight: 600 }}>
              {roleLabel}
            </span>
          </div>

          {/* Name */}
          <h2 className="text-gray-900 mb-0.5" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
            {user?.name}
          </h2>
          <p className="text-gray-500 text-sm mb-4">{user?.email}</p>

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {[
              { icon: <MapPin className="w-4 h-4" />, label: "District", value: `${user?.district}${user?.area ? ` · ${user.area}` : ""}` },
              { icon: <Calendar className="w-4 h-4" />, label: "Member since", value: new Date(user?.joinDate || "").toLocaleDateString("en-US", { month: "long", year: "numeric" }) },
              { icon: <Mail className="w-4 h-4" />, label: "Email", value: user?.email || "" },
              { icon: <Phone className="w-4 h-4" />, label: "Phone", value: phone || "Not set" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-gray-400 text-xs">{item.label}</p>
                  {item.label === "Phone" && editing ? (
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="text-gray-900 text-sm bg-white border border-blue-300 rounded-lg px-2 py-0.5 w-full outline-none"
                    />
                  ) : (
                    <p className="text-gray-900 text-sm truncate" style={{ fontWeight: 500 }}>{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div className="mb-4">
            <p className="text-gray-500 text-xs mb-2" style={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              About
            </p>
            {editing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-blue-300 bg-gray-50 text-gray-900 text-sm outline-none focus:border-blue-500 resize-none"
              />
            ) : (
              <p className="text-gray-700 text-sm leading-relaxed">{bio || "No bio yet."}</p>
            )}
          </div>

          {/* Skills */}
          <div>
            <p className="text-gray-500 text-xs mb-2" style={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Skills & Interests
            </p>
            {editing ? (
              <div className="flex flex-wrap gap-2">
                {ALL_SKILLS.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-xl text-xs border transition-all ${
                      skills.includes(skill)
                        ? "border-blue-500 bg-blue-600 text-white"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                    }`}
                    style={{ fontWeight: 500 }}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills.length > 0 ? (
                  skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 rounded-xl text-xs bg-blue-50 text-blue-700 border border-blue-100" style={{ fontWeight: 500 }}>
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No skills added yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Security card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-blue-600" />
          <h3 className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>Security Settings</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <p className="text-gray-900 text-sm" style={{ fontWeight: 500 }}>Password</p>
              <p className="text-gray-400 text-xs">Last changed: Recently</p>
            </div>
            <button className="text-blue-600 text-sm hover:underline" style={{ fontWeight: 500 }}>
              Change
            </button>
          </div>
          {(user?.role === "coordinator" || user?.role === "admin") && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="text-gray-900 text-sm" style={{ fontWeight: 500 }}>Two-Factor Authentication</p>
                <p className="text-gray-400 text-xs">
                  {user?.twoFAEnabled ? "Enabled via authenticator app" : "Not enabled — recommended for coordinators"}
                </p>
              </div>
              <button
                className={`text-sm px-3 py-1 rounded-lg ${user?.twoFAEnabled ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                style={{ fontWeight: 600 }}
              >
                {user?.twoFAEnabled ? "Enabled" : "Enable"}
              </button>
            </div>
          )}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <p className="text-gray-900 text-sm" style={{ fontWeight: 500 }}>Login Sessions</p>
              <p className="text-gray-400 text-xs">1 active session</p>
            </div>
            <button className="text-red-500 text-sm hover:underline" style={{ fontWeight: 500 }}>
              Sign out all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
