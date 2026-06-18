import { useState } from "react";
import { useFcmToken } from "../hooks/useFcmToken";
import api from "../../api/axios";

function StatusDot({ permission }) {
  const color =
    permission === "granted"
      ? "#22c55e"
      : permission === "denied"
      ? "#ef4444"
      : "#f59e0b";
  return (
    <span
      style={{
        display: "inline-block",
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: color,
        marginRight: 8,
        flexShrink: 0,
      }}
    />
  );
}

function statusLabel(permission) {
  if (permission === "granted") return "Notifications enabled";
  if (permission === "denied")  return "Notifications blocked by browser";
  return "Permission not yet requested";
}

export default function PushNotifications() {
  const { token, permission, error, lastMessage, requestPermissionAndToken } =
    useFcmToken();

  const [copied,       setCopied]       = useState(false);
  const [subscribed,   setSubscribed]   = useState(false);
  const [actionError,  setActionError]  = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [messages,     setMessages]     = useState([]);

  // Append incoming foreground messages to local log
  if (lastMessage && messages[0]?._raw !== lastMessage) {
    setMessages((prev) =>
      [
        {
          ...lastMessage,
          _raw: lastMessage,
          _receivedAt: new Date().toLocaleTimeString(),
        },
        ...prev,
      ].slice(0, 20)
    );
  }

  const handleCopy = async () => {
    if (!token) return;
    await navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const callBackend = async (endpoint, body) => {
    setActionError(null);
    setActionLoading(true);
    try {
      await api.post(`/notifications/${endpoint}`, body);
      return true;
    } catch (err) {
      setActionError(
        `Request failed: ${err?.response?.data?.message ?? err?.message ?? "unknown error"}`
      );
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!token) return;
    const ok = await callBackend("enable", {
      deviceType:        "WEB",
      notificationToken: token,
    });
    if (ok) setSubscribed(true);
  };

  const handleDisable = async () => {
    if (!token) return;
    const ok = await callBackend("disable", { notificationToken: token });
    if (ok) setSubscribed(false);
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        maxWidth: 480,
        margin: "0 auto",
        padding: 24,
        color: "#1a1a1a",
      }}
    >
      {/* ── Status row ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          padding: "12px 16px",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <StatusDot permission={permission} />
          <span style={{ fontSize: 14, fontWeight: 500 }}>
            {statusLabel(permission)}
          </span>
        </div>

        {permission !== "granted" && (
          <button
            onClick={requestPermissionAndToken}
            style={{
              background: "#1C52AF",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Enable
          </button>
        )}
      </div>

      {/* ── Errors ── */}
      {error && (
        <p
          style={{
            color: "#dc2626",
            fontSize: 13,
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: 8,
            padding: "8px 12px",
            marginBottom: 12,
          }}
        >
          {error}
        </p>
      )}

      {/* ── Token block ── */}
      {token && (
        <div
          style={{
            background: "#f0f9ff",
            border: "1px solid #bae6fd",
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: "#475569",
              wordBreak: "break-all",
              margin: "0 0 12px",
              fontFamily: "monospace",
              lineHeight: 1.6,
            }}
          >
            {token}
          </p>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <button
              onClick={handleCopy}
              style={{
                background: "#fff",
                border: "1px solid #cbd5e1",
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                color: "#334155",
              }}
            >
              {copied ? "✓ Copied" : "Copy token"}
            </button>

            {subscribed ? (
              <button
                onClick={handleDisable}
                disabled={actionLoading}
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: 8,
                  padding: "6px 12px",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "#dc2626",
                  opacity: actionLoading ? 0.6 : 1,
                }}
              >
                {actionLoading ? "Disabling…" : "Disable notifications"}
              </button>
            ) : (
              <button
                onClick={handleRegister}
                disabled={actionLoading}
                style={{
                  background: "#1C52AF",
                  border: "none",
                  borderRadius: 8,
                  padding: "6px 12px",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "#fff",
                  opacity: actionLoading ? 0.6 : 1,
                }}
              >
                {actionLoading ? "Registering…" : "Register with backend"}
              </button>
            )}
          </div>

          {actionError && (
            <p
              style={{
                color: "#dc2626",
                fontSize: 12,
                marginTop: 8,
                marginBottom: 0,
              }}
            >
              {actionError}
            </p>
          )}
        </div>
      )}

      {/* ── Live message feed ── */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>
            Live foreground messages
          </span>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>
            {messages.length} received
          </span>
        </div>

        {messages.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "32px 16px",
              color: "#94a3b8",
              fontSize: 13,
              background: "#f8fafc",
              borderRadius: 12,
              border: "1px dashed #e2e8f0",
            }}
          >
            No messages yet. Send a test push from your backend or Firebase
            console while this tab is open.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 10,
                  padding: "10px 14px",
                }}
              >
                <span style={{ fontSize: 11, color: "#94a3b8" }}>
                  {msg._receivedAt}
                </span>
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    margin: "4px 0 2px",
                    color: "#0f172a",
                  }}
                >
                  {msg.notification?.title ?? "(no title)"}
                </p>
                <p style={{ fontSize: 13, margin: 0, color: "#475569" }}>
                  {msg.notification?.body ?? ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}