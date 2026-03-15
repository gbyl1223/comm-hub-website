import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { TOPICS, OPPORTUNITIES, MEMBERS, CONVERSATIONS } from "../../data/mockData";
import {
  MessageSquare,
  Briefcase,
  Users,
  Mail,
  TrendingUp,
  ArrowRight,
  Pin,
  Clock,
  Bell,
} from "lucide-react";

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const pinnedTopics = TOPICS.filter((t) => t.isPinned);
  const recentTopics = TOPICS.slice(0, 3);
  const recentOpportunities = OPPORTUNITIES.slice(0, 3);
  const totalUnread = CONVERSATIONS.reduce((sum, c) => sum + c.unreadCount, 0);

  const stats = [
    {
      label: "Members Online",
      value: MEMBERS.filter((m) => m.online).length,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      label: "Active Discussions",
      value: TOPICS.length,
      icon: MessageSquare,
      color: "bg-emerald-50 text-emerald-600",
      iconBg: "bg-emerald-100",
    },
    {
      label: "Open Opportunities",
      value: OPPORTUNITIES.length,
      icon: Briefcase,
      color: "bg-amber-50 text-amber-600",
      iconBg: "bg-amber-100",
    },
    {
      label: "Unread Messages",
      value: totalUnread,
      icon: Mail,
      color: "bg-purple-50 text-purple-600",
      iconBg: "bg-purple-100",
    },
  ];

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto">
      {/* Welcome banner */}
      <div
        className="relative rounded-2xl overflow-hidden p-6 lg:p-8 mb-6 text-white"
        style={{ background: "linear-gradient(135deg, #0f2a4a 0%, #1b4f8a 60%, #2563eb 100%)" }}
      >
        <div className="relative z-10">
          <p className="text-blue-200 text-sm mb-1">Good day 👋</p>
          <h1
            className="text-white mb-2"
            style={{ fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            Welcome back, {user?.name?.split(" ")[0]}!
          </h1>
          <p className="text-blue-100 text-sm max-w-md">
            You have {totalUnread} unread message{totalUnread !== 1 ? "s" : ""} and{" "}
            {TOPICS.filter((t) => t.replies.length > 0).length} active discussions to catch up on.
          </p>
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => navigate("/portal/discussions")}
              className="flex items-center gap-2 px-4 py-2 bg-white text-blue-800 rounded-xl text-sm hover:bg-blue-50 transition-colors"
              style={{ fontWeight: 600 }}
            >
              <MessageSquare className="w-4 h-4" /> View Discussions
            </button>
            <button
              onClick={() => navigate("/portal/messages")}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-xl text-sm hover:bg-white/20 transition-colors border border-white/20"
              style={{ fontWeight: 600 }}
            >
              <Mail className="w-4 h-4" /> Messages
              {totalUnread > 0 && (
                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {totalUnread}
                </span>
              )}
            </button>
          </div>
        </div>
        {/* Decorative */}
        <div
          className="absolute right-[-60px] top-[-60px] w-48 h-48 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }}
        />
        <div
          className="absolute right-20 bottom-[-40px] w-32 h-32 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #93c5fd 0%, transparent 70%)" }}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className={`w-9 h-9 rounded-xl ${stat.iconBg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-4 h-4 ${stat.color.split(" ")[1]}`} />
            </div>
            <p className="text-gray-900 text-2xl" style={{ fontWeight: 700 }}>
              {stat.value}
            </p>
            <p className="text-gray-500 text-xs mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Pinned Announcements */}
          {pinnedTopics.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <Pin className="w-4 h-4 text-amber-500" />
                  <h2 className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>
                    Pinned Announcements
                  </h2>
                </div>
              </div>
              {pinnedTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => navigate(`/portal/discussions/${topic.id}`)}
                  className="w-full text-left px-5 py-3.5 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="inline-block bg-amber-100 text-amber-700 text-xs px-1.5 py-0.5 rounded" style={{ fontWeight: 500 }}>
                          {topic.category}
                        </span>
                      </div>
                      <p className="text-gray-900 text-sm line-clamp-1" style={{ fontWeight: 500 }}>
                        {topic.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-gray-400 text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {timeAgo(topic.createdAt)}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {topic.replies.length} replies
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Recent Discussions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <h2 className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>
                  Recent Discussions
                </h2>
              </div>
              <button
                onClick={() => navigate("/portal/discussions")}
                className="text-xs text-blue-600 hover:underline"
                style={{ fontWeight: 500 }}
              >
                View all
              </button>
            </div>
            {recentTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => navigate(`/portal/discussions/${topic.id}`)}
                className="w-full text-left px-5 py-3.5 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={topic.authorAvatar}
                    alt={topic.authorName}
                    className="w-7 h-7 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 text-sm line-clamp-1" style={{ fontWeight: 500 }}>
                      {topic.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-gray-400 text-xs">{topic.authorName}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-gray-400 text-xs">{timeAgo(topic.createdAt)}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-gray-400 text-xs">{topic.replies.length} replies</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Online Members */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <h3 className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>
                  Online Now
                </h3>
              </div>
              <button
                onClick={() => navigate("/portal/members")}
                className="text-xs text-blue-600 hover:underline"
                style={{ fontWeight: 500 }}
              >
                All members
              </button>
            </div>
            <div className="p-4 space-y-3">
              {MEMBERS.filter((m) => m.online).slice(0, 4).map((member) => (
                <div key={member.id} className="flex items-center gap-2.5">
                  <div className="relative shrink-0">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-900 text-xs truncate" style={{ fontWeight: 500 }}>
                      {member.name}
                    </p>
                    <p className="text-gray-400 text-xs">{member.district}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Opportunities */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-500" />
                <h3 className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>
                  New Opportunities
                </h3>
              </div>
              <button
                onClick={() => navigate("/portal/opportunities")}
                className="text-xs text-blue-600 hover:underline"
                style={{ fontWeight: 500 }}
              >
                View all
              </button>
            </div>
            <div className="p-4 space-y-3">
              {recentOpportunities.map((opp) => (
                <button
                  key={opp.id}
                  onClick={() => navigate("/portal/opportunities")}
                  className="w-full text-left"
                >
                  <div className="flex items-start gap-2">
                    <div
                      className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                        opp.type === "job"
                          ? "bg-blue-100 text-blue-600"
                          : opp.type === "grant"
                          ? "bg-green-100 text-green-600"
                          : opp.type === "mentorship"
                          ? "bg-purple-100 text-purple-600"
                          : opp.type === "event"
                          ? "bg-amber-100 text-amber-600"
                          : "bg-pink-100 text-pink-600"
                      }`}
                      style={{ fontWeight: 700 }}
                    >
                      {opp.type[0].toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-gray-900 text-xs line-clamp-2 text-left" style={{ fontWeight: 500 }}>
                        {opp.title}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">{opp.district}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Notification */}
          <div className="bg-blue-50 rounded-2xl border border-blue-100 p-4">
            <div className="flex items-start gap-3">
              <Bell className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-900 text-xs" style={{ fontWeight: 600 }}>
                  AGM Coming Up
                </p>
                <p className="text-blue-600 text-xs mt-0.5">
                  Annual General Meeting on April 20, 2025. Don't forget to RSVP!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
