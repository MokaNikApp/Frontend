// Payments API (wallets, escrow, payouts, refunds). See "Payments API: Frontend Integration Guide".
// - Amounts are NAIRA numbers both ways. No kobo conversion anywhere.
// - Money-changing calls carry an `Idempotency-Key` header.
// - Success bodies are plain objects/arrays (no { success, data } wrapper).

import api from "./axios";
import { sleep } from "../lib/utils/apiHelpers";

const idem = (key) => ({ headers: { "Idempotency-Key": key } });

/**
 * 409 on an idempotent call means "same key is still being processed".
 * Wait a moment and retry with the SAME key (safe by design).
 */
const retryWhileProcessing = async (fn, tries = 3) => {
  for (let i = 0; ; i++) {
    try {
      return await fn();
    } catch (err) {
      const msg = String(err?.response?.data?.message || "").toLowerCase();
      const stillRunning = err?.response?.status === 409 && (msg.includes("process") || msg.includes("progress") || msg.includes("idempot"));
      if (!stillRunning || i >= tries - 1) throw err;
      await sleep(1500 * (i + 1));
    }
  }
};

export const walletApi = {
  /** customer -> user wallet, provider -> mechanic wallet. Auto-created. */
  me: () => api.get("/wallets/me").then((r) => r.data),

  transactions: ({ page = 1, limit = 20 } = {}) =>
    api.get("/wallets/me/transactions", { params: { page, limit } }).then((r) => r.data),

  /** customer. Returns { authorizationUrl, reference, ... } -> redirect to authorizationUrl */
  topUp: ({ amount, key }) =>
    retryWhileProcessing(() => api.post("/wallets/me/top-up", { amount }, idem(key)).then((r) => r.data)),

  /** Any logged-in payer. Re-checks with the gateway. */
  verifyPayment: (reference) => api.get(`/payments/verify/${encodeURIComponent(reference)}`).then((r) => r.data),

  // ── mechanic ──────────────────────────────────────────────────────────────
  pendingEscrow: () => api.get("/escrow/me/pending").then((r) => r.data),

  payoutFee: (amount, signal) =>
    api.get("/payouts/fee", { params: { amount }, signal }).then((r) => r.data),

  requestPayout: ({ amount, key }) =>
    retryWhileProcessing(() => api.post("/payouts", { amount }, idem(key)).then((r) => r.data)),

  payouts: ({ page = 1, limit = 20, status } = {}) =>
    api.get("/payouts", { params: { page, limit, ...(status ? { status } : {}) } }).then((r) => r.data),

  payout: (id) => api.get(`/payouts/${id}`).then((r) => r.data),

  // ── customer refunds ──────────────────────────────────────────────────────
  refunds: ({ page = 1, limit = 20, status } = {}) =>
    api.get("/refunds", { params: { page, limit, ...(status ? { status } : {}) } }).then((r) => r.data),
};

export default walletApi;
