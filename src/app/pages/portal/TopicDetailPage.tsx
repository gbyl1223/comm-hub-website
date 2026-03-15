import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { TOPICS } from "../../data/mockData";
import { ArrowLeft, ThumbsUp, Clock, Eye, MessageSquare, Send, Pin } from "lucide-react";

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const TYPE_COLORS: Record<string, string> = {
  "Community Development": "bg-emerald-100 text-emerald-700",
  "Events & Announcements": "bg-amber-100 text-amber-700",
  Technology: "bg-blue-100 text-blue-700",
  Mentorship: "bg-purple-100 text-purple-700",
  "Funding & Grants": "bg-green-100 text-green-700",
  "Health & Wellness": "bg-pink-100 text-pink-700",
};

export function TopicDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [topics, setTopics] = useState(TOPICS);
  const [replyContent, setReplyContent] = useState("");
  const [likedReplies, setLikedReplies] = useState<Set<string>>(new Set());

  const topic = topics.find((t) => t.id === id);

  if (!topic) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Topic not found.</p>
        <button
          onClick={() => navigate("/portal/discussions")}
          className="mt-3 text-blue-600 text-sm hover:underline"
        >
          Back to Discussions
        </button>
      </div>
    );
  }

  const handleReply = () => {
    if (!replyContent.trim()) return;
    const newReply = {
      id: `r${Date.now()}`,
      authorId: user?.id || "1",
      authorName: user?.name || "You",
      authorAvatar:
        user?.avatar ||
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
      content: replyContent,
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    setTopics((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, replies: [...t.replies, newReply] } : t
      )
    );
    setReplyContent("");
  };

  const handleLike = (replyId: string) => {
    const newSet = new Set(likedReplies);
    if (newSet.has(replyId)) {
      newSet.delete(replyId);
    } else {
      newSet.add(replyId);
    }
    setLikedReplies(newSet);
  };

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate("/portal/discussions")}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-5 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Discussions
      </button>

      {/* Topic card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:p-6 mb-5">
        {/* Category + pinned */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className={`text-xs px-2.5 py-1 rounded-lg ${TYPE_COLORS[topic.category] || "bg-gray-100 text-gray-600"}`}
            style={{ fontWeight: 500 }}
          >
            {topic.category}
          </span>
          {topic.isPinned && (
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-lg flex items-center gap-1" style={{ fontWeight: 500 }}>
              <Pin className="w-3 h-3" /> Pinned
            </span>
          )}
          {topic.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-lg">
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-gray-900 mb-4" style={{ fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.3 }}>
          {topic.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
          <img
            src={topic.authorAvatar}
            alt={topic.authorName}
            className="w-10 h-10 rounded-xl object-cover"
          />
          <div>
            <p className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>
              {topic.authorName}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" /> {timeAgo(topic.createdAt)}
              </span>
              <span className="text-gray-400 text-xs flex items-center gap-1">
                <Eye className="w-3 h-3" /> {topic.views} views
              </span>
              <span className="text-gray-400 text-xs flex items-center gap-1">
                <MessageSquare className="w-3 h-3" /> {topic.replies.length} replies
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <p className="text-gray-700 text-sm leading-relaxed">{topic.content}</p>
      </div>

      {/* Replies */}
      <div className="mb-5">
        <h2 className="text-gray-900 text-sm mb-3" style={{ fontWeight: 600 }}>
          {topic.replies.length} {topic.replies.length === 1 ? "Reply" : "Replies"}
        </h2>

        {topic.replies.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-gray-100">
            <MessageSquare className="w-8 h-8 text-gray-200 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">No replies yet. Be the first to respond!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {topic.replies.map((reply, index) => (
              <div
                key={reply.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 lg:p-5"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={reply.authorAvatar}
                    alt={reply.authorName}
                    className="w-9 h-9 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div>
                        <span className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>
                          {reply.authorName}
                        </span>
                        <span className="text-gray-400 text-xs ml-2 flex-inline items-center gap-1">
                          <Clock className="w-3 h-3 inline" /> {timeAgo(reply.createdAt)}
                        </span>
                      </div>
                      <span className="text-gray-300 text-xs">#{index + 1}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">{reply.content}</p>
                    <button
                      onClick={() => handleLike(reply.id)}
                      className={`flex items-center gap-1.5 text-xs transition-colors ${
                        likedReplies.has(reply.id)
                          ? "text-blue-600"
                          : "text-gray-400 hover:text-blue-600"
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      {reply.likes + (likedReplies.has(reply.id) ? 1 : 0)}{" "}
                      {reply.likes + (likedReplies.has(reply.id) ? 1 : 0) === 1 ? "like" : "likes"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reply input */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 lg:p-5 sticky bottom-4">
        <h3 className="text-gray-900 text-sm mb-3" style={{ fontWeight: 600 }}>
          Add your reply
        </h3>
        <div className="flex items-start gap-3">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-xl object-cover shrink-0" />
          ) : (
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm shrink-0"
              style={{ background: "linear-gradient(135deg, #1b4f8a, #2563eb)", fontWeight: 700 }}
            >
              {user?.name?.[0]}
            </div>
          )}
          <div className="flex-1">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Share your thoughts..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 resize-none transition-all"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleReply();
              }}
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-gray-400 text-xs">Ctrl+Enter to post</span>
              <button
                onClick={handleReply}
                disabled={!replyContent.trim()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm disabled:opacity-40 transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #1b4f8a, #2563eb)", fontWeight: 600 }}
              >
                <Send className="w-3.5 h-3.5" />
                Post Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
