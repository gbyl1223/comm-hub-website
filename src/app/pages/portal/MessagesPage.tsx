import { useState } from "react";
import { CONVERSATIONS, MEMBERS } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import { Search, Send, ArrowLeft } from "lucide-react";

function formatTime(ts: string) {
  const d = new Date(ts);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  if (days === 1) return "Yesterday";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function MessagesPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState(CONVERSATIONS);
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [search, setSearch] = useState("");
  const [showNewMessage, setShowNewMessage] = useState(false);

  const conv = conversations.find((c) => c.id === selectedConv);

  const filtered = conversations.filter((c) =>
    c.participantName.toLowerCase().includes(search.toLowerCase())
  );

  const handleSend = () => {
    if (!messageText.trim() || !selectedConv) return;
    const newMsg = {
      id: `m${Date.now()}`,
      fromId: user?.id || "1",
      toId: conv?.participantId || "",
      content: messageText,
      timestamp: new Date().toISOString(),
      read: true,
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedConv
          ? {
              ...c,
              messages: [...c.messages, newMsg],
              lastMessage: messageText,
              lastMessageTime: newMsg.timestamp,
              unreadCount: 0,
            }
          : c
      )
    );
    setMessageText("");
  };

  const handleSelectConv = (convId: string) => {
    setSelectedConv(convId);
    // Mark as read
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, unreadCount: 0 } : c))
    );
  };

  const startNewConversation = (memberId: string) => {
    const member = MEMBERS.find((m) => m.id === memberId);
    if (!member) return;
    const existing = conversations.find((c) => c.participantId === memberId);
    if (existing) {
      setSelectedConv(existing.id);
      setShowNewMessage(false);
      return;
    }
    const newConv = {
      id: `cnew${Date.now()}`,
      participantId: memberId,
      participantName: member.name,
      participantAvatar: member.avatar,
      lastMessage: "",
      lastMessageTime: new Date().toISOString(),
      unreadCount: 0,
      messages: [],
    };
    setConversations((prev) => [newConv, ...prev]);
    setSelectedConv(newConv.id);
    setShowNewMessage(false);
  };

  const otherMembers = MEMBERS.filter((m) => m.id !== user?.id);

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Conversation list */}
        <div
          className={`${
            selectedConv ? "hidden sm:flex" : "flex"
          } flex-col w-full sm:w-72 lg:w-80 border-r border-gray-100 bg-white shrink-0`}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-gray-900 text-sm" style={{ fontWeight: 700 }}>
                Messages
              </h1>
              <button
                onClick={() => setShowNewMessage(!showNewMessage)}
                className="p-1.5 rounded-lg text-white text-xs transition-colors"
                style={{ background: "linear-gradient(135deg, #1b4f8a, #2563eb)" }}
                title="New Message"
              >
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3v10M3 8h10" />
                </svg>
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search messages..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* New message – member picker */}
          {showNewMessage && (
            <div className="border-b border-gray-100 p-3 bg-blue-50">
              <p className="text-gray-700 text-xs mb-2" style={{ fontWeight: 600 }}>Start a new conversation:</p>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {otherMembers.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => startNewConversation(m.id)}
                    className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-blue-100 transition-colors text-left"
                  >
                    <img src={m.avatar} alt={m.name} className="w-7 h-7 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0">
                      <p className="text-gray-900 text-xs truncate" style={{ fontWeight: 500 }}>{m.name}</p>
                      <p className="text-gray-400 text-xs">{m.district}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-400 text-sm">No conversations yet</p>
              </div>
            ) : (
              filtered.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleSelectConv(c.id)}
                  className={`w-full text-left flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 ${
                    selectedConv === c.id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="relative shrink-0">
                    <img src={c.participantAvatar} alt={c.participantName} className="w-10 h-10 rounded-xl object-cover" />
                    {MEMBERS.find((m) => m.id === c.participantId)?.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span
                        className={`text-sm truncate ${c.unreadCount > 0 ? "text-gray-900" : "text-gray-700"}`}
                        style={{ fontWeight: c.unreadCount > 0 ? 700 : 500 }}
                      >
                        {c.participantName}
                      </span>
                      <span className="text-gray-400 text-xs shrink-0 ml-1">{formatTime(c.lastMessageTime)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      <p className={`text-xs truncate ${c.unreadCount > 0 ? "text-gray-700" : "text-gray-400"}`}>
                        {c.lastMessage || "Start a conversation"}
                      </p>
                      {c.unreadCount > 0 && (
                        <span className="shrink-0 w-4 h-4 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs" style={{ fontWeight: 700, fontSize: "10px" }}>
                          {c.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat area */}
        {!selectedConv ? (
          <div className="hidden sm:flex flex-1 items-center justify-center bg-gray-50">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #e0e7ff, #dbeafe)" }}
              >
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-gray-700 text-sm" style={{ fontWeight: 600 }}>Select a conversation</p>
              <p className="text-gray-400 text-xs mt-1">Or start a new one using the + button</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col bg-gray-50 min-w-0">
            {/* Chat header */}
            <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
              <button
                onClick={() => setSelectedConv(null)}
                className="sm:hidden p-1 rounded-lg text-gray-400 hover:bg-gray-100"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="relative">
                <img src={conv?.participantAvatar} alt={conv?.participantName} className="w-9 h-9 rounded-xl object-cover" />
                {MEMBERS.find((m) => m.id === conv?.participantId)?.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
                )}
              </div>
              <div>
                <p className="text-gray-900 text-sm" style={{ fontWeight: 700 }}>{conv?.participantName}</p>
                <p className="text-xs text-gray-400">
                  {MEMBERS.find((m) => m.id === conv?.participantId)?.online ? (
                    <span className="text-green-500">Online</span>
                  ) : (
                    "Offline"
                  )}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {conv?.messages.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-400 text-sm">No messages yet. Say hello!</p>
                </div>
              ) : (
                conv?.messages.map((msg) => {
                  const isMe = msg.fromId === user?.id;
                  return (
                    <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[75%] ${isMe ? "items-end" : "items-start"} flex flex-col gap-1`}>
                        {!isMe && (
                          <div className="flex items-end gap-2">
                            <img
                              src={conv.participantAvatar}
                              alt=""
                              className="w-6 h-6 rounded-lg object-cover"
                            />
                            <div
                              className="px-4 py-2.5 rounded-2xl rounded-bl-md bg-white border border-gray-100 shadow-sm"
                            >
                              <p className="text-gray-900 text-sm">{msg.content}</p>
                            </div>
                          </div>
                        )}
                        {isMe && (
                          <div
                            className="px-4 py-2.5 rounded-2xl rounded-br-md text-white shadow-sm"
                            style={{ background: "linear-gradient(135deg, #1b4f8a, #2563eb)" }}
                          >
                            <p className="text-sm">{msg.content}</p>
                          </div>
                        )}
                        <p className="text-gray-400 text-xs px-1">{formatTime(msg.timestamp)}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Input */}
            <div className="bg-white border-t border-gray-100 p-3">
              <div className="flex items-end gap-3">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message..."
                  rows={1}
                  className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-blue-500 resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={!messageText.trim()}
                  className="p-3 rounded-2xl text-white disabled:opacity-40 transition-all hover:opacity-90 shrink-0"
                  style={{ background: "linear-gradient(135deg, #1b4f8a, #2563eb)" }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}