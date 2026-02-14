"use client";

import { useState } from "react";
import {
  MessageSquare,
  Send,
  Search,
  User,
  Clock,
  Paperclip,
} from "lucide-react";

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  date: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: string;
  sender: "client" | "agent";
  senderName: string;
  content: string;
  date: string;
  time: string;
}

function ConversationItem({
  conversation,
  isActive,
  onClick,
}: {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
        isActive
          ? "bg-blue-600/15 border border-blue-500/20"
          : "hover:bg-white/5 border border-transparent"
      }`}
    >
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-sm font-bold text-white">
          {conversation.avatar}
        </div>
        {conversation.online && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0a0a0f]" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium truncate ${isActive ? "text-blue-300" : "text-white"}`}>
            {conversation.name}
          </span>
          <span className="text-[10px] text-gray-500 flex-shrink-0 ml-2">{conversation.date}</span>
        </div>
        <p className="text-xs text-gray-500 truncate mt-0.5">{conversation.lastMessage}</p>
      </div>
      {conversation.unread > 0 && (
        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
          <span className="text-[10px] font-bold text-white">{conversation.unread}</span>
        </div>
      )}
    </button>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isClient = message.sender === "client";
  return (
    <div className={`flex ${isClient ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-[70%] ${isClient ? "order-2" : "order-1"}`}>
        {!isClient && (
          <span className="text-xs text-gray-500 mb-1 block">{message.senderName}</span>
        )}
        <div
          className={`px-4 py-3 rounded-2xl text-sm ${
            isClient
              ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-md"
              : "bg-white/5 border border-white/10 text-gray-200 rounded-bl-md"
          }`}
        >
          {message.content}
        </div>
        <span className={`text-[10px] text-gray-600 mt-1 block ${isClient ? "text-right" : "text-left"}`}>
          {message.time}
        </span>
      </div>
    </div>
  );
}

export default function ClientMessagesPage() {
  const [message, setMessage] = useState("");
  const [searchConv, setSearchConv] = useState("");
  const [selectedConv, setSelectedConv] = useState<string | null>(null);

  // Placeholder data - will be replaced with API call
  const conversations: Conversation[] = [];
  const messages: Message[] = [];

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchConv.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <p className="text-gray-400 mt-1">Communiquez avec l&apos;equipe Agence HDS</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-14rem)]">
        {/* Conversations list */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
          {/* Search */}
          <div className="p-3 border-b border-white/5">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchConv}
                onChange={(e) => setSearchConv(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
              />
            </div>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto p-2">
            {filteredConversations.length > 0 ? (
              <div className="space-y-1">
                {filteredConversations.map((conv) => (
                  <ConversationItem
                    key={conv.id}
                    conversation={conv}
                    isActive={selectedConv === conv.id}
                    onClick={() => setSelectedConv(conv.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8">
                <MessageSquare size={32} className="text-gray-600 mb-2" />
                <p className="text-gray-500 text-sm text-center">Aucun message</p>
              </div>
            )}
          </div>
        </div>

        {/* Message area */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
          {selectedConv ? (
            <>
              {/* Chat header */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-sm font-bold text-white">
                  A
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Agent HDS</h3>
                  <p className="text-xs text-emerald-400">En ligne</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6">
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <button className="p-2.5 text-gray-500 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-all">
                    <Paperclip size={18} />
                  </button>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ecrivez votre message..."
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                  />
                  <button className="p-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-600/20">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare size={28} className="text-blue-400/60" />
                </div>
                <h3 className="text-white font-medium text-lg mb-2">Aucun message</h3>
                <p className="text-gray-500 text-sm max-w-sm">
                  Selectionnez une conversation ou demarrez-en une nouvelle pour communiquer avec l&apos;equipe.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
