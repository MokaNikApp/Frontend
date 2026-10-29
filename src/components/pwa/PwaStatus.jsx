import React, { useEffect, useState } from "react";

/** Shows an "Install app" button when the browser allows it, and an offline notice. */
export default function PwaStatus() {
  const [installEvt, setInstallEvt] = useState(null);
  const [online, setOnline] = useState(navigator.onLine);

  // iOS never fires beforeinstallprompt: show a manual "Add to Home Screen" hint instead.
  const [showIosHint, setShowIosHint] = useState(() => {
    try {
      const ua = navigator.userAgent || "";
      const isIOS =
        /iphone|ipad|ipod/i.test(ua) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      const standalone =
        window.navigator.standalone === true ||
        window.matchMedia("(display-mode: standalone)").matches;
      const dismissed = localStorage.getItem("mk_ios_hint_dismissed") === "1";
      return isIOS && !standalone && !dismissed;
    } catch {
      return false;
    }
  });
  const dismissIosHint = () => {
    setShowIosHint(false);
    try { localStorage.setItem("mk_ios_hint_dismissed", "1"); } catch {}
  };

  useEffect(() => {
    const onPrompt = (e) => { e.preventDefault(); setInstallEvt(e); };
    const onInstalled = () => setInstallEvt(null);
    const up = () => setOnline(true), down = () => setOnline(false);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
    };
  }, []);

  const install = async () => {
    installEvt.prompt();
    await installEvt.userChoice;
    setInstallEvt(null);
  };

  return (
    <>
      {!online && (
        <div className="fixed top-0 inset-x-0 z-[9999] bg-amber-500 text-white text-center text-sm py-1">
          You're offline — some features need a connection.
        </div>
      )}
      {showIosHint && (
        <div
          className="fixed inset-x-3 z-[9999] rounded-2xl bg-[#1C52AF] text-white p-4 text-sm shadow-xl"
          style={{ bottom: "max(12px, env(safe-area-inset-bottom))" }}
        >
          <p className="font-semibold mb-1">Install Mokanik on your iPhone</p>
          <p className="opacity-90">
            Tap the <b>Share</b> button (square with an arrow), then choose{" "}
            <b>Add to Home Screen</b>.
          </p>
          <button
            onClick={dismissIosHint}
            className="mt-3 rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold"
          >
            Got it
          </button>
        </div>
      )}
      {installEvt && (
        <button
          onClick={install}
          className="fixed bottom-4 right-4 z-[9999] rounded-full bg-[#1C52AF] text-white px-5 py-3 text-sm font-semibold shadow-lg"
        >
          Install Mokanik app
        </button>
      )}
    </>
  );
}
