"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatNode {
  id: string;
  message: string;
  is_end: boolean;
  action_url?: string;
  action_label?: string;
}

interface ChatOption {
  label: string;
  next_node_id: string;
}

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  options?: ChatOption[];
  action_url?: string;
  action_label?: string;
}

// Static fallback tree (mirrors the SQL data)
const fallbackNodes: Record<string, ChatNode> = {
  start: {
    id: "start",
    message:
      "Bonjour ! \u{1F44B} Je suis l'assistant de l'Agence HDS. Comment puis-je vous aider ?",
    is_end: false,
  },
  services: {
    id: "services",
    message: "Quel type de service vous int\u00e9resse ?",
    is_end: false,
  },
  tarifs: {
    id: "tarifs",
    message: "Voici nos formules adapt\u00e9es \u00e0 chaque besoin.",
    is_end: false,
  },
  contact: {
    id: "contact",
    message: "Comment souhaitez-vous nous contacter ?",
    is_end: false,
  },
  "service-web": {
    id: "service-web",
    message:
      "Nous cr\u00e9ons des sites vitrines, applications web et landing pages avec React et Next.js.",
    is_end: false,
  },
  "service-saas": {
    id: "service-saas",
    message:
      "Nous d\u00e9veloppons des plateformes SaaS multi-tenant, dashboards admin et outils m\u00e9tier sur mesure.",
    is_end: false,
  },
  "service-ia": {
    id: "service-ia",
    message:
      "Nous int\u00e9grons des chatbots IA, automatisons vos processus et connectons les API IA \u00e0 vos outils.",
    is_end: false,
  },
  "end-devis": {
    id: "end-devis",
    message:
      "Parfait ! Remplissez notre formulaire et nous vous recontacterons sous 24h.",
    is_end: true,
    action_url: "/contact",
    action_label: "Demander un devis",
  },
  "end-tarifs": {
    id: "end-tarifs",
    message:
      "Consultez notre page tarifs pour trouver la formule qui vous convient.",
    is_end: true,
    action_url: "/tarifs",
    action_label: "Voir les tarifs",
  },
  "end-email": {
    id: "end-email",
    message:
      "Envoyez-nous un email \u00e0 contact@agencehds.fr, nous r\u00e9pondons sous 24h.",
    is_end: true,
    action_url: "mailto:contact@agencehds.fr",
    action_label: "Envoyer un email",
  },
};

const fallbackOptions: Record<string, ChatOption[]> = {
  start: [
    { label: "\u{1F6E0} D\u00e9couvrir nos services", next_node_id: "services" },
    { label: "\u{1F4B0} Voir les tarifs", next_node_id: "tarifs" },
    { label: "\u{1F4EC} Nous contacter", next_node_id: "contact" },
  ],
  services: [
    { label: "\u{1F310} D\u00e9veloppement Web", next_node_id: "service-web" },
    { label: "\u2601\uFE0F Solutions SaaS", next_node_id: "service-saas" },
    { label: "\u{1F916} Intelligence Artificielle", next_node_id: "service-ia" },
  ],
  tarifs: [
    { label: "\u{1F4B0} Voir les tarifs", next_node_id: "end-tarifs" },
    { label: "\u{1F4DD} Devis personnalis\u00e9", next_node_id: "end-devis" },
  ],
  contact: [
    { label: "\u{1F4DD} Formulaire de contact", next_node_id: "end-devis" },
    { label: "\u{1F4E7} Envoyer un email", next_node_id: "end-email" },
  ],
  "service-web": [
    { label: "\u{1F4DD} Demander un devis", next_node_id: "end-devis" },
    { label: "\u{1F4B0} Voir les tarifs", next_node_id: "end-tarifs" },
  ],
  "service-saas": [
    { label: "\u{1F4DD} Demander un devis", next_node_id: "end-devis" },
    { label: "\u{1F4B0} Voir les tarifs", next_node_id: "end-tarifs" },
  ],
  "service-ia": [
    { label: "\u{1F4DD} Demander un devis", next_node_id: "end-devis" },
    { label: "\u{1F4B0} Voir les tarifs", next_node_id: "end-tarifs" },
  ],
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [nodes, setNodes] = useState<Record<string, ChatNode>>(fallbackNodes);
  const [options, setOptions] =
    useState<Record<string, ChatOption[]>>(fallbackOptions);
  const [sessionId] = useState(() =>
    typeof crypto !== "undefined"
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2)
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // Try to fetch from Supabase
  useEffect(() => {
    async function fetchChatData() {
      try {
        const { supabase } = await import("@/lib/supabase");
        if (!supabase) return;

        const [nodesRes, optionsRes] = await Promise.all([
          supabase.from("chatbot_nodes").select("*"),
          supabase
            .from("chatbot_options")
            .select("*")
            .order("sort_order", { ascending: true }),
        ]);

        if (nodesRes.data && nodesRes.data.length > 0) {
          const nodesMap: Record<string, ChatNode> = {};
          for (const n of nodesRes.data) {
            nodesMap[n.id] = n;
          }
          setNodes(nodesMap);
        }

        if (optionsRes.data && optionsRes.data.length > 0) {
          const optionsMap: Record<string, ChatOption[]> = {};
          for (const o of optionsRes.data) {
            if (!optionsMap[o.node_id]) optionsMap[o.node_id] = [];
            optionsMap[o.node_id].push({
              label: o.label,
              next_node_id: o.next_node_id,
            });
          }
          setOptions(optionsMap);
        }
      } catch {
        // Use fallback
      }
    }
    fetchChatData();
  }, []);

  // Start conversation when opened
  useEffect(() => {
    if (open && !initialized.current) {
      initialized.current = true;
      const startNode = nodes["start"];
      if (startNode) {
        setMessages([
          {
            id: "start",
            text: startNode.message,
            sender: "bot",
            options: options["start"] || [],
          },
        ]);
      }
    }
  }, [open, nodes, options]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const logSession = useCallback(
    async (nodeId: string) => {
      try {
        const { supabase } = await import("@/lib/supabase");
        if (!supabase) return;
        await supabase.from("chatbot_sessions").insert({
          session_id: sessionId,
          node_id: nodeId,
        });
      } catch {
        // silently fail
      }
    },
    [sessionId]
  );

  const handleOption = useCallback(
    (option: ChatOption) => {
      // Add user message
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        text: option.label,
        sender: "user",
      };

      const nextNode = nodes[option.next_node_id];
      if (!nextNode) return;

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        text: nextNode.message,
        sender: "bot",
        options: nextNode.is_end ? undefined : options[nextNode.id],
        action_url: nextNode.action_url || undefined,
        action_label: nextNode.action_label || undefined,
      };

      setMessages((prev) => [...prev, userMsg, botMsg]);
      logSession(nextNode.id);
    },
    [nodes, options, logSession]
  );

  const restart = useCallback(() => {
    const startNode = nodes["start"];
    if (startNode) {
      setMessages([
        {
          id: `start-${Date.now()}`,
          text: startNode.message,
          sender: "bot",
          options: options["start"] || [],
        },
      ]);
    }
  }, [nodes, options]);

  return (
    <>
      {/* Floating bubble — bottom right */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-accent text-dark flex items-center justify-center shadow-lg shadow-accent/25 cursor-pointer border-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Ouvrir le chatbot"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              viewBox="0 0 24 24"
              className="w-6 h-6 stroke-dark fill-none stroke-2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-dark"
            >
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-[9999] w-[360px] max-w-[calc(100vw-3rem)] bg-dark border border-white/10 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden flex flex-col"
            style={{ height: "min(500px, 70vh)" }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-dark font-bold text-[0.75rem]">
                    HDS
                  </span>
                </div>
                <div>
                  <div className="text-[0.85rem] font-semibold text-white">
                    Assistant HDS
                  </div>
                  <div className="text-[0.65rem] text-white/40">
                    En ligne
                  </div>
                </div>
              </div>
              <button
                onClick={restart}
                className="text-[0.7rem] text-accent hover:underline bg-transparent border-none cursor-pointer font-medium"
              >
                Recommencer
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            >
              {messages.map((msg) => (
                <div key={msg.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-[0.82rem] leading-[1.6] ${
                      msg.sender === "bot"
                        ? "bg-white/[0.06] text-white/80 rounded-tl-sm"
                        : "bg-accent text-dark rounded-tr-sm ml-auto"
                    }`}
                  >
                    {msg.text}
                  </motion.div>

                  {/* Action button (end nodes) */}
                  {msg.action_url && msg.action_label && (
                    <motion.a
                      href={msg.action_url}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-full bg-accent text-dark text-[0.78rem] font-medium hover:bg-accent-hover transition-colors"
                    >
                      {msg.action_label}
                      <svg
                        viewBox="0 0 24 24"
                        className="w-3.5 h-3.5 stroke-dark fill-none stroke-2"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </motion.a>
                  )}

                  {/* Options */}
                  {msg.options && msg.options.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {msg.options.map((opt) => (
                        <motion.button
                          key={opt.next_node_id + opt.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                          onClick={() => handleOption(opt)}
                          className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-[0.75rem] text-white/70 hover:bg-accent/10 hover:border-accent/30 hover:text-accent transition-all cursor-pointer text-left"
                        >
                          {opt.label}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-white/[0.06] shrink-0">
              <p className="text-[0.65rem] text-white/25 text-center">
                Agence HDS &mdash; Assistant guid&eacute;
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
