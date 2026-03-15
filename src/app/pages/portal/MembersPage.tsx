import { useState } from "react";
import { useNavigate } from "react-router";
import { MEMBERS, DISTRICTS, AREAS_BY_DISTRICT } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import { Search, Filter, MapPin, Mail, MessageSquare, Shield, Users, ChevronDown } from "lucide-react";

const ROLE_BADGE: Record<string, string> = {
  member: "bg-blue-100 text-blue-700",
  coordinator: "bg-indigo-100 text-indigo-700",
  admin: "bg-purple-100 text-purple-700",
};

const ROLE_LABEL: Record<string, string> = {
  member: "Member",
  coordinator: "Coordinator",
  admin: "Admin",
};

export function MembersPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [expandedMember, setExpandedMember] = useState<string | null>(null);

  const areas = selectedDistrict !== "All Districts"
    ? ["All Areas", ...(AREAS_BY_DISTRICT[selectedDistrict] || [])]
    : ["All Areas"];

  const filtered = MEMBERS.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      (m.skills || []).some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchDistrict = selectedDistrict === "All Districts" || m.district === selectedDistrict;
    const matchArea = selectedArea === "All Areas" || m.area === selectedArea;
    const matchRole = selectedRole === "All Roles" || m.role === selectedRole;
    return matchSearch && matchDistrict && matchArea && matchRole;
  });

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-gray-900" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
            Members Directory
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {filtered.length} member{filtered.length !== 1 ? "s" : ""} ·{" "}
            {MEMBERS.filter((m) => m.online).length} online
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg border transition-colors ${viewMode === "grid" ? "border-blue-300 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-400 hover:bg-gray-50"}`}
          >
            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
              <rect x="1" y="1" width="6" height="6" rx="1" />
              <rect x="9" y="1" width="6" height="6" rx="1" />
              <rect x="1" y="9" width="6" height="6" rx="1" />
              <rect x="9" y="9" width="6" height="6" rx="1" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg border transition-colors ${viewMode === "list" ? "border-blue-300 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-400 hover:bg-gray-50"}`}
          >
            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
              <rect x="1" y="2" width="14" height="2" rx="1" />
              <rect x="1" y="7" width="14" height="2" rx="1" />
              <rect x="1" y="12" width="14" height="2" rx="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, skill..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={selectedDistrict}
            onChange={(e) => { setSelectedDistrict(e.target.value); setSelectedArea("All Areas"); }}
            className="pl-3 pr-7 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm outline-none focus:border-blue-500"
          >
            {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="pl-3 pr-7 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm outline-none focus:border-blue-500"
            disabled={selectedDistrict === "All Districts"}
          >
            {areas.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="pl-3 pr-7 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm outline-none focus:border-blue-500"
          >
            {["All Roles", "member", "coordinator"].map((r) => (
              <option key={r} value={r}>{r === "All Roles" ? "All Roles" : ROLE_LABEL[r]}</option>
            ))}
          </select>
        </div>
      </div>

      {/* District pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-5">
        {DISTRICTS.map((d) => (
          <button
            key={d}
            onClick={() => { setSelectedDistrict(d); setSelectedArea("All Areas"); }}
            className={`shrink-0 px-3 py-1.5 rounded-xl text-xs border transition-all ${
              selectedDistrict === d
                ? "border-blue-500 bg-blue-600 text-white"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
            }`}
            style={{ fontWeight: 500 }}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Empty */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Users className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">No members found for this filter</p>
        </div>
      ) : viewMode === "grid" ? (
        /* Grid view */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:border-blue-200 hover:shadow-md transition-all"
            >
              {/* Top banner */}
              <div
                className="h-16 relative"
                style={{ background: `linear-gradient(135deg, #0f2a4a, #2563eb)` }}
              >
                <div className="absolute bottom-0 left-4 translate-y-1/2">
                  <div className="relative">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-white"
                    />
                    {member.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white" />
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-8 px-4 pb-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-gray-900 text-sm" style={{ fontWeight: 700 }}>{member.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-400 text-xs">{member.area}, {member.district}</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-lg ${ROLE_BADGE[member.role]}`} style={{ fontWeight: 500 }}>
                    {ROLE_LABEL[member.role]}
                  </span>
                </div>

                <p className="text-gray-500 text-xs line-clamp-2 mb-3">{member.bio}</p>

                {/* Skills */}
                {member.skills && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {member.skills.slice(0, 2).map((skill) => (
                      <span key={skill} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg">
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 2 && (
                      <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-lg">
                        +{member.skills.length - 2}
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                {member.id !== user?.id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate("/portal/messages")}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                      style={{ fontWeight: 500 }}
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> Message
                    </button>
                    <button
                      onClick={() => navigate("/portal/discussions")}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs text-white transition-all hover:opacity-90"
                      style={{ background: "linear-gradient(135deg, #1b4f8a, #2563eb)", fontWeight: 500 }}
                    >
                      <Mail className="w-3.5 h-3.5" /> Connect
                    </button>
                  </div>
                )}
                {member.id === user?.id && (
                  <button
                    onClick={() => navigate("/portal/profile")}
                    className="w-full py-2 rounded-xl text-xs text-blue-600 border border-blue-200 hover:bg-blue-50 transition-colors"
                    style={{ fontWeight: 500 }}
                  >
                    View My Profile
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List view */
        <div className="space-y-2">
          {filtered.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-all"
            >
              <button
                className="w-full text-left p-4 flex items-center gap-4"
                onClick={() => setExpandedMember(expandedMember === member.id ? null : member.id)}
              >
                <div className="relative shrink-0">
                  <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-xl object-cover" />
                  {member.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>{member.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-lg ${ROLE_BADGE[member.role]}`} style={{ fontWeight: 500 }}>
                      {ROLE_LABEL[member.role]}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {member.district}
                    </span>
                    <span className="text-gray-300">·</span>
                    <span className="text-gray-400 text-xs">{member.area}</span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-300 shrink-0 transition-transform ${expandedMember === member.id ? "rotate-180" : ""}`}
                />
              </button>

              {expandedMember === member.id && (
                <div className="px-4 pb-4 border-t border-gray-50 pt-3">
                  <p className="text-gray-500 text-sm mb-3">{member.bio}</p>
                  {member.skills && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {member.skills.map((skill) => (
                        <span key={skill} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{skill}</span>
                      ))}
                    </div>
                  )}
                  {member.id !== user?.id && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate("/portal/messages")}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                        style={{ fontWeight: 500 }}
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> Message
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
