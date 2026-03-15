import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { MEMBERS, COORDINATOR_STATS, TOPICS, OPPORTUNITIES } from "../../data/mockData";
import {
  Users,
  TrendingUp,
  MessageSquare,
  UserPlus,
  Settings,
  BarChart2,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Mail,
  ArrowLeft,
  Shield,
  Eye,
  Briefcase,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function CoordinatorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "members" | "reports">("overview");
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberName, setNewMemberName] = useState("");
  const [inviteSent, setInviteSent] = useState(false);

  if (user?.role !== "coordinator" && user?.role !== "admin") {
    return (
      <div className="p-6 text-center">
        <Shield className="w-10 h-10 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">Access restricted to coordinators.</p>
        <button onClick={() => navigate("/portal")} className="mt-3 text-blue-600 text-sm hover:underline">
          Return to portal
        </button>
      </div>
    );
  }

  const myDistrict = user?.district;
  const districtMembers = MEMBERS.filter((m) => m.district === myDistrict || user?.role === "admin");
  const districtTopics = TOPICS.filter((t) =>
    districtMembers.some((m) => m.id === t.authorId)
  );

  const handleSendInvite = () => {
    if (!newMemberEmail || !newMemberName) return;
    setInviteSent(true);
    setTimeout(() => {
      setInviteSent(false);
      setShowAddMember(false);
      setNewMemberEmail("");
      setNewMemberName("");
    }, 2000);
  };

  const stats = [
    {
      label: "District Members",
      value: districtMembers.length,
      change: "+2 this month",
      icon: <Users className="w-5 h-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
    },
    {
      label: "Active This Month",
      value: districtMembers.filter((m) => m.online).length,
      change: "of " + districtMembers.length,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      iconBg: "bg-emerald-100",
    },
    {
      label: "Discussions",
      value: districtTopics.length,
      change: "from district",
      icon: <MessageSquare className="w-5 h-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
    },
    {
      label: "Opportunities",
      value: OPPORTUNITIES.filter((o) => o.district === myDistrict || o.district === "All Districts").length,
      change: "available",
      icon: <Briefcase className="w-5 h-5" />,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      iconBg: "bg-amber-100",
    },
  ];

  const chartData = COORDINATOR_STATS.districtEngagement.map((d) => ({
    name: d.district.replace("District ", "D"),
    Members: d.members,
    Active: d.active,
  }));

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/portal")}
            className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-gray-900" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
              Coordinator Dashboard
            </h1>
            <p className="text-gray-500 text-sm">{myDistrict} · {user?.area}</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddMember(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #1b4f8a, #2563eb)", fontWeight: 600 }}
        >
          <UserPlus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div
              className="p-5 text-white"
              style={{ background: "linear-gradient(135deg, #0f2a4a, #2563eb)" }}
            >
              <h3 className="text-white" style={{ fontWeight: 700 }}>Add New Member</h3>
              <p className="text-blue-200 text-sm mt-0.5">
                Send temporary login credentials to a new member
              </p>
            </div>
            <div className="p-5">
              {inviteSent ? (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-2" />
                  <p className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>Invitation sent!</p>
                  <p className="text-gray-500 text-xs mt-1">
                    Temporary credentials have been sent to {newMemberEmail}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-700 text-sm mb-1.5" style={{ fontWeight: 500 }}>Full Name</label>
                    <input
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm mb-1.5" style={{ fontWeight: 500 }}>Email Address</label>
                    <input
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      placeholder="member@example.com"
                      type="email"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                    <p className="text-blue-700 text-xs flex items-start gap-2">
                      <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      The member will receive a temporary password and be required to change it on first login.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSendInvite}
                      disabled={!newMemberEmail || !newMemberName}
                      className="flex-1 py-2.5 rounded-xl text-white text-sm disabled:opacity-40 transition-all hover:opacity-90"
                      style={{ background: "linear-gradient(135deg, #1b4f8a, #2563eb)", fontWeight: 600 }}
                    >
                      Send Invitation
                    </button>
                    <button
                      onClick={() => setShowAddMember(false)}
                      className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        {(["overview", "members", "reports"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm capitalize transition-all ${
              activeTab === tab
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
            style={{ fontWeight: activeTab === tab ? 600 : 400 }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {stats.map((stat) => (
              <div key={stat.label} className={`rounded-2xl p-4 border border-gray-100 shadow-sm ${stat.bgColor}`}>
                <div className={`w-9 h-9 rounded-xl ${stat.iconBg} ${stat.color} flex items-center justify-center mb-3`}>
                  {stat.icon}
                </div>
                <p className="text-gray-900 text-2xl" style={{ fontWeight: 700 }}>{stat.value}</p>
                <p className="text-gray-600 text-xs mt-0.5">{stat.label}</p>
                <p className="text-gray-400 text-xs">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Chart + Recent */}
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Engagement chart */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <BarChart2 className="w-4 h-4 text-blue-600" />
                <h3 className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>
                  Membership by District
                </h3>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={chartData} barSize={10}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "12px" }}
                    cursor={{ fill: "#f3f4f6" }}
                  />
                  <Bar dataKey="Members" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Active" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <div className="w-3 h-3 rounded-sm bg-blue-600" /> Total Members
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <div className="w-3 h-3 rounded-sm bg-blue-300" /> Active
                </div>
              </div>
            </div>

            {/* Recent activity */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <h3 className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>
                  Recent District Activity
                </h3>
              </div>
              <div className="space-y-3">
                {districtTopics.slice(0, 3).map((topic) => (
                  <div key={topic.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <MessageSquare className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-gray-900 text-xs line-clamp-1" style={{ fontWeight: 500 }}>
                        {topic.title}
                      </p>
                      <p className="text-gray-400 text-xs">{topic.authorName}</p>
                    </div>
                  </div>
                ))}
                {districtTopics.length === 0 && (
                  <p className="text-gray-400 text-sm text-center py-4">No recent activity</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Members Tab */}
      {activeTab === "members" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>
              {myDistrict} Members ({districtMembers.length})
            </h3>
          </div>
          <div className="divide-y divide-gray-50">
            {districtMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                <div className="relative shrink-0">
                  <img src={member.avatar} alt={member.name} className="w-9 h-9 rounded-xl object-cover" />
                  {member.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>{member.name}</p>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-lg ${
                        member.role === "coordinator"
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                      style={{ fontWeight: 500 }}
                    >
                      {member.role === "coordinator" ? "Coordinator" : "Member"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {member.area}
                    </span>
                    <span className="text-gray-300">·</span>
                    <span className="text-gray-400 text-xs">{member.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-lg ${
                      member.online
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                    style={{ fontWeight: 500 }}
                  >
                    {member.online ? "Online" : "Offline"}
                  </span>
                  <button
                    onClick={() => navigate("/portal/messages")}
                    className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
                    title="Message"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === "reports" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-gray-900 text-sm mb-4" style={{ fontWeight: 600 }}>District Performance Report</h3>
            <div className="space-y-3">
              {[
                { label: "Member engagement rate", value: "80%", status: "good" },
                { label: "New members this quarter", value: "2", status: "good" },
                { label: "Discussion participation", value: "60%", status: "warning" },
                { label: "Opportunities posted", value: "3", status: "good" },
                { label: "Messages sent this month", value: "24", status: "good" },
              ].map((metric) => (
                <div key={metric.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-700 text-sm">{metric.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 text-sm" style={{ fontWeight: 700 }}>{metric.value}</span>
                    {metric.status === "good" ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl border border-amber-100 p-4 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-800 text-sm" style={{ fontWeight: 600 }}>Action Required</p>
              <p className="text-amber-700 text-xs mt-0.5">
                Discussion participation in your district is below the 70% target. Consider reaching out to inactive members.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
