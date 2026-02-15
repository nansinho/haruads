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
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";

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
          ? "bg-cyan-500/[0.06] border border-cyan-500/20"
          : "hover:bg-white/[0.04] border border-transparent"
      }`}
    >
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-sm font-bold text-dark">
          {conversation.avatar}
        </div>
        {conversation.online && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-dark" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium truncate ${isActive ? "text-cyan-400" : "text-text-primary"}`}>
            {conversation.name}
          </span>
          <span className="text-[10px] text-text-muted flex-shrink-0 ml-2">{conversation.date}</span>
        </div>
        <p className="text-xs text-text-muted truncate mt-0.5">{conversation.lastMessage}</p>
      </div>
      {conversation.unread > 0 && (
        <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0">
          <span className="text-[10px] font-bold text-dark">{conversation.unread}</span>
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
          <span className="text-xs text-text-muted mb-1 block">{message.senderName}</span>
        )}
        <div
          className={`px-4 py-3 rounded-2xl text-sm ${
            isClient
              ? "bg-cyan-500 text-dark font-medium rounded-br-md"
              : "bg-dark-2 border border-white/[0.06] text-text-secondary rounded-bl-md"
          }`}
        >
          {message.content}
        </div>
        <span className={`text-[10px] text-text-muted mt-1 block ${isClient ? "text-right" : "text-left"}`}>
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
    <PageTransition className="space-y-6">
      {/* Header */}
      <AnimatedSection>
        <div>
          <h1 className="font-serif text-2xl text-text-primary">Messages</h1>
          <p className="text-text-secondary mt-1">Communiquez avec l&apos;equipe Agence HDS</p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-14rem)]">
          {/* Conversations list */}
          <div className="bg-dark-2 border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col">
            {/* Search */}
            <div className="p-3 border-b border-white/[0.06]">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchConv}
                  onChange={(e) => setSearchConv(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-dark border border-white/[0.06] rounded-full text-xs text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
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
                  <MessageSquare size={32} className="text-text-muted mb-2" />
                  <p className="text-text-muted text-sm text-center">Aucun message</p>
                </div>
              )}
            </div>
          </div>

          {/* Message area */}
          <div className="lg:col-span-2 bg-dark-2 border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col">
            {selectedConv ? (
              <>
                {/* Chat header */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
                  <div className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center text-sm font-bold text-dark">
                    A
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-text-primary">Agent HDS</h3>
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
                <div className="p-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <button className="p-2.5 text-text-muted hover:text-cyan-400 hover:bg-white/[0.04] rounded-lg transition-all">
                      <Paperclip size={18} />
                    </button>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ecrivez votre message..."
                      className="flex-1 px-4 py-3 bg-dark border border-white/[0.06] rounded-xl text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                    />
                    <button className="p-3 bg-cyan-500 text-dark rounded-full hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/[0.06] flex items-center justify-center mx-auto mb-4">
                    <MessageSquare size={28} className="text-text-muted" />
                  </div>
                  <h3 className="text-text-primary font-medium text-lg mb-2">Aucun message</h3>
                  <p className="text-text-muted text-sm max-w-sm">
                    Selectionnez une conversation ou demarrez-en une nouvelle pour communiquer avec l&apos;equipe.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>
    </PageTransition>
  );
}
