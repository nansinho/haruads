"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toast: (opts: { type: ToastType; message: string }) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(({ type, message }: { type: ToastType; message: string }) => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const icons = {
    success: <CheckCircle size={18} className="text-emerald-400" />,
    error: <XCircle size={18} className="text-red-400" />,
    info: <Info size={18} className="text-blue-400" />,
  };

  const borderColors = {
    success: "border-emerald-500/20",
    error: "border-red-500/20",
    info: "border-blue-500/20",
  };

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 bg-dark-2 border ${borderColors[t.type]} rounded-xl shadow-2xl shadow-black/30 animate-in slide-in-from-right fade-in duration-200 max-w-sm`}
          >
            {icons[t.type]}
            <span className="text-sm text-text-primary flex-1">{t.message}</span>
            <button onClick={() => removeToast(t.id)} className="text-text-muted hover:text-text-primary transition-colors">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
