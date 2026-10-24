import React, { useEffect, useState } from "react";

/** Shows an "Install app" button when the browser allows it, and an offline notice. */
export default function PwaStatus() {
  const [installEvt, setInstallEvt] = useState(null);
  const [online, setOnline] = useState(navigator.onLine);

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
