import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import "./wallet.css";

/** const { show, node } = useToast();  show("Saved") / show("Oops", "error");  render {node} once. */
export function useToast() {
  const [toast, setToast] = useState(null);
  const timer = useRef(null);
  const show = useCallback((message, type = "success") => {
    clearTimeout(timer.current);
    setToast({ message, type, id: Date.now() });
    timer.current = setTimeout(() => setToast(null), 4200);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);

  const node = toast ? (
    <div
      key={toast.id}
      role="status"
      aria-live="polite"
      className="wallet-toast fixed bottom-6 left-1/2 z-[120] flex max-w-[calc(100vw-2rem)] items-center gap-2.5 rounded-xl bg-slate-900 px-4 py-3 text-[13px] font-medium text-white shadow-xl"
    >
      {toast.type === "error" ? <XCircle size={18} className="shrink-0 text-red-400" /> : <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />}
      <span>{toast.message}</span>
    </div>
  ) : null;

  return { show, node };
}
