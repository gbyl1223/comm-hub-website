import { useState } from "react";
import { OPPORTUNITIES, DISTRICTS } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import {
  Search,
  Filter,
  Briefcase,
  Users,
  Award,
  BookOpen,
  Calendar,
  Handshake,
  MapPin,
  Clock,
  ChevronRight,
  X,
  Plus,
  DollarSign,
} from "lucide-react";

const TYPE_CONFIG: Record<string, { label: string; color: string; bgColor: string; icon: React.ReactNode }> = {
  job: { label: "Job", color: "text-blue-700", bgColor: "bg-blue-100", icon: <Briefcase className="w-4 h-4" /> },
  partnership: { label: "Partnership", color: "text-pink-700", bgColor: "bg-pink-100", icon: <Handshake className="w-4 h-4" /> },
  grant: { label: "Grant", color: "text-green-700", bgColor: "bg-green-100", icon: <Award className="w-4 h-4" /> },
  mentorship: { label: "Mentorship", color: "text-purple-700", bgColor: "bg-purple-100", icon: <BookOpen className="w-4 h-4" /> },
  event: { label: "Event", color: "text-amber-700", bgColor: "bg-amber-100", icon: <Calendar className="w-4 h-4" /> },
};

function timeUntil(dateStr: string) {
  const deadline = new Date(dateStr);
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 0) return "Expired";
  if (days === 0) return "Today";
  if (days === 1) return "1 day left";
  return `${days} days left`;
}

export function OpportunitiesPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [selectedOpp, setSelectedOpp] = useState<string | null>(null);
  const [interested, setInterested] = useState<Set<string>>(new Set());

  const filtered = OPPORTUNITIES.filter((o) => {
    const matchSearch =
      o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.description.toLowerCase().includes(search.toLowerCase()) ||
      o.postedByName.toLowerCase().includes(search.toLowerCase());
    const matchType = selectedType === "All Types" || o.type === selectedType;
    const matchDistrict =
      selectedDistrict === "All Districts" ||
      o.district === selectedDistrict ||
      o.district === "All Districts";
    return matchSearch && matchType && matchDistrict;
  });

  const selected = OPPORTUNITIES.find((o) => o.id === selectedOpp);

  const toggleInterest = (id: string) => {
    const s = new Set(interested);
    if (s.has(id)) s.delete(id);
    else s.add(id);
    setInterested(s);
  };

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-gray-900" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
          Opportunities
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Exclusive jobs, partnerships, grants, mentorship & events for members
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search opportunities..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="pl-3 pr-7 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm outline-none focus:border-blue-500"
          >
            {["All Types", "job", "partnership", "grant", "mentorship", "event"].map((t) => (
              <option key={t} value={t}>{t === "All Types" ? "All Types" : TYPE_CONFIG[t]?.label}</option>
            ))}
          </select>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="pl-3 pr-7 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm outline-none focus:border-blue-500"
          >
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Type filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-5">
        {["All Types", "job", "partnership", "grant", "mentorship", "event"].map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs border transition-all ${
              selectedType === t
                ? "border-blue-500 bg-blue-600 text-white"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
            }`}
            style={{ fontWeight: 500 }}
          >
            {t !== "All Types" && (
              <span className={selectedType === t ? "text-white" : TYPE_CONFIG[t]?.color}>
                {TYPE_CONFIG[t]?.icon}
              </span>
            )}
            {t === "All Types" ? "All" : TYPE_CONFIG[t]?.label}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        {/* List */}
        <div className={`${selected ? "hidden lg:block lg:w-1/2" : "w-full"} space-y-3`}>
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <Briefcase className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No opportunities found</p>
            </div>
          ) : (
            filtered.map((opp) => {
              const cfg = TYPE_CONFIG[opp.type];
              const deadlineStr = timeUntil(opp.deadline);
              const isExpired = deadlineStr === "Expired";
              return (
                <button
                  key={opp.id}
                  onClick={() => setSelectedOpp(selectedOpp === opp.id ? null : opp.id)}
                  className={`w-full text-left bg-white rounded-2xl border p-4 hover:border-blue-200 hover:shadow-sm transition-all group ${
                    selectedOpp === opp.id ? "border-blue-400 shadow-md" : "border-gray-100 shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl ${cfg.bgColor} ${cfg.color} flex items-center justify-center shrink-0`}>
                      {cfg.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className={`text-xs px-2 py-0.5 rounded-lg ${cfg.bgColor} ${cfg.color} mb-1.5 inline-block`} style={{ fontWeight: 500 }}>
                            {cfg.label}
                          </span>
                          <h3 className="text-gray-900 text-sm group-hover:text-blue-700 transition-colors" style={{ fontWeight: 600, lineHeight: 1.4 }}>
                            {opp.title}
                          </h3>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-400 shrink-0 mt-4 transition-colors" />
                      </div>
                      <p className="text-gray-500 text-xs line-clamp-2 mt-1 mb-2">{opp.description}</p>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-gray-400 text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {opp.district}
                        </span>
                        {opp.salary && (
                          <span className="text-gray-400 text-xs flex items-center gap-1">
                            <DollarSign className="w-3 h-3" /> {opp.salary}
                          </span>
                        )}
                        <span className={`text-xs flex items-center gap-1 ${isExpired ? "text-red-500" : "text-amber-600"}`}>
                          <Clock className="w-3 h-3" /> {deadlineStr}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-full lg:w-1/2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-fit sticky top-4">
            {/* Header */}
            <div
              className="p-5 text-white relative"
              style={{ background: "linear-gradient(135deg, #0f2a4a, #2563eb)" }}
            >
              <button
                onClick={() => setSelectedOpp(null)}
                className="absolute top-4 right-4 p-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <div className={`w-10 h-10 rounded-xl ${TYPE_CONFIG[selected.type].bgColor} ${TYPE_CONFIG[selected.type].color} flex items-center justify-center mb-3`}>
                {TYPE_CONFIG[selected.type].icon}
              </div>
              <span className="text-blue-200 text-xs" style={{ fontWeight: 500 }}>
                {TYPE_CONFIG[selected.type].label}
              </span>
              <h2 className="text-white mt-1" style={{ fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.3 }}>
                {selected.title}
              </h2>
            </div>

            <div className="p-5 space-y-4">
              {/* Posted by */}
              <div className="flex items-center gap-3">
                <img src={selected.postedByAvatar} alt={selected.postedByName} className="w-9 h-9 rounded-xl object-cover" />
                <div>
                  <p className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>{selected.postedByName}</p>
                  <p className="text-gray-400 text-xs">{selected.district}</p>
                </div>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Deadline", value: new Date(selected.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), icon: <Clock className="w-3.5 h-3.5" /> },
                  { label: "Location", value: selected.location || "TBD", icon: <MapPin className="w-3.5 h-3.5" /> },
                  ...(selected.salary ? [{ label: "Value", value: selected.salary, icon: <DollarSign className="w-3.5 h-3.5" /> }] : []),
                  { label: "Category", value: selected.category, icon: <Briefcase className="w-3.5 h-3.5" /> },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1 text-xs">{item.icon} {item.label}</div>
                    <p className="text-gray-900 text-xs" style={{ fontWeight: 600 }}>{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <p className="text-gray-500 text-xs mb-2" style={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Description</p>
                <p className="text-gray-700 text-sm leading-relaxed">{selected.description}</p>
              </div>

              {/* Requirements */}
              <div>
                <p className="text-gray-500 text-xs mb-2" style={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Requirements</p>
                <ul className="space-y-1.5">
                  {selected.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => toggleInterest(selected.id)}
                  className={`flex-1 py-2.5 rounded-xl text-sm transition-all ${
                    interested.has(selected.id)
                      ? "bg-green-100 text-green-700 border-2 border-green-300"
                      : "text-white hover:opacity-90"
                  }`}
                  style={{
                    background: interested.has(selected.id) ? undefined : "linear-gradient(135deg, #1b4f8a, #2563eb)",
                    fontWeight: 600,
                  }}
                >
                  {interested.has(selected.id) ? "✓ Interested" : "Express Interest"}
                </button>
                <button
                  onClick={() => alert(`Contact ${selected.postedByName} via the Messages tab.`)}
                  className="px-4 py-2.5 rounded-xl text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  Message
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
