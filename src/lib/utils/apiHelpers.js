// Small helpers for talking to the payments API.

/** One key per user action. Reuse it for retries of the SAME action only. */
export const newIdempotencyKey = () => {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  } catch {
    /* fall through */
  }
  return `k-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
};

/** NestJS errors: `message` is a string, or an array for validation errors. */
export const getApiError = (err, fallback = "Something went wrong. Please try again.") => {
  const data = err?.response?.data;
  const msg = data?.message ?? data?.error;
  if (Array.isArray(msg)) return msg.join(". ");
  if (typeof msg === "string" && msg.trim()) return msg;
  if (err?.code === "ERR_NETWORK" || (!err?.response && err?.request)) {
    return "Can't reach the server. Check your connection and try again.";
  }
  return fallback;
};

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
