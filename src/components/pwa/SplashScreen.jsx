import React, { useEffect, useState } from "react";

/**
 * Animated launch splash. Shows once per app launch (session), then fades out.
 * Props: minDuration (ms the splash stays visible), onDone (optional callback).
 */
export default function SplashScreen({ minDuration = 7200, onDone }) {
  const [visible, setVisible] = useState(() => {
    try {
      return !sessionStorage.getItem("mokanik_splash_seen");
    } catch {
      return true;
    }
  });
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!visible) {
      onDone?.();
      return;
    }
    const t1 = setTimeout(() => setLeaving(true), minDuration);
    const t2 = setTimeout(() => {
      try {
        sessionStorage.setItem("mokanik_splash_seen", "1");
      } catch {}
      setVisible(false);
      onDone?.();
    }, minDuration + 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [visible, minDuration, onDone]);

  if (!visible) return null;

  return (
    <div
      className={`mk-splash ${leaving ? "mk-splash--leave" : ""}`}
      role="status"
      aria-label="Loading Mokanik"
    >
      <span className="mk-ring mk-ring--1" />
      <span className="mk-ring mk-ring--2" />
      <span className="mk-ring mk-ring--3" />

      <div className="mk-logo-wrap">
        <img src="/icons/icon-192.png" alt="Mokanik" className="mk-logo" />
      </div>

      <h1 className="mk-title">Mokanik</h1>
      <p className="mk-tag">Book trusted mechanics and car services</p>

      <div className="mk-bar">
        <span />
      </div>

      <style>{`
        .mk-splash{position:fixed;inset:0;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;
          background:radial-gradient(circle at 50% 40%,#2a6bd6 0%,#1C52AF 45%,#0B2F6E 100%);color:#fff;overflow:hidden;
          transition:opacity .6s ease,transform .6s ease}
        .mk-splash--leave{opacity:0;transform:scale(1.06);pointer-events:none}
        .mk-ring{position:absolute;top:50%;left:50%;width:180px;height:180px;margin:-90px 0 0 -90px;border-radius:50%;
          border:2px solid rgba(255,255,255,.35);opacity:0;animation:mk-pulse 2.4s ease-out infinite}
        .mk-ring--2{animation-delay:.6s}.mk-ring--3{animation-delay:1.2s}
        .mk-logo-wrap{position:relative;margin-top:-60px;animation:mk-pop .9s cubic-bezier(.2,1.4,.4,1) both,mk-float 3s ease-in-out .9s infinite}
        .mk-logo{width:110px;height:110px;border-radius:26px;box-shadow:0 18px 50px rgba(0,0,0,.35)}
        .mk-title{margin:32px 0 0;font-size:34px;font-weight:800;letter-spacing:.04em;animation:mk-rise .7s ease .5s both}
        .mk-tag{margin:8px 24px 0;font-size:14px;opacity:.85;text-align:center;animation:mk-rise .7s ease .75s both}
        .mk-bar{position:absolute;bottom:14%;width:140px;height:4px;border-radius:4px;background:rgba(255,255,255,.25);overflow:hidden;animation:mk-rise .6s ease 1s both}
        .mk-bar span{display:block;height:100%;width:40%;border-radius:4px;background:#fff;animation:mk-load 1.1s ease-in-out infinite}
        @keyframes mk-pop{0%{opacity:0;transform:scale(.3) rotate(-12deg)}100%{opacity:1;transform:scale(1) rotate(0)}}
        @keyframes mk-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes mk-rise{0%{opacity:0;transform:translateY(16px)}100%{opacity:1;transform:translateY(0)}}
        @keyframes mk-pulse{0%{opacity:.7;transform:scale(.6)}100%{opacity:0;transform:scale(3.2)}}
        @keyframes mk-load{0%{transform:translateX(-120%)}100%{transform:translateX(340%)}}
        @media (prefers-reduced-motion:reduce){.mk-splash *{animation-duration:.01s!important;animation-iteration-count:1!important}}
      `}</style>
    </div>
  );
}
