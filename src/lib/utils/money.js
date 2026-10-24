// Money helpers for the wallet. The API speaks NAIRA (not kobo), so nothing in
// here multiplies or divides by 100. Values are displayed exactly as received.

const nf = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatNaira = (n) => nf.format(Number(n) || 0);

/** "₦12,500.00" -> { whole: "₦12,500", decimals: ".00" } (for big balance display) */
export const splitNaira = (n) => {
  const s = nf.format(Number(n) || 0);
  const i = s.lastIndexOf(".");
  return { whole: s.slice(0, i), decimals: s.slice(i) };
};

/** Compact naira without decimals when the value is whole: "₦5,000" / "₦1,500.50" */
export const formatNairaShort = (n) => {
  const v = Number(n) || 0;
  return Number.isInteger(v) ? nf.format(v).replace(/\.00$/, "") : nf.format(v);
};

/** Turns whatever the user typed into "12,500.5" (digits, one dot, max 2 decimals). */
export const sanitizeAmountInput = (raw = "") => {
  const v = String(raw).replace(/[^\d.]/g, "");
  const [int = "", ...rest] = v.split(".");
  const intFmt = int.replace(/^0+(?=\d)/, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (rest.length) return `${intFmt || "0"}.${rest.join("").slice(0, 2)}`;
  return intFmt;
};

/** "12,500.50" -> 12500.5. Returns NaN when it is not a valid naira value. */
export const parseAmount = (str = "") => {
  const clean = String(str).replace(/,/g, "").trim();
  if (!/^\d+(\.\d{1,2})?\.?$/.test(clean)) return NaN;
  return Number(clean);
};

/** Number -> string for an input box (no trailing zeros). */
export const amountToInput = (n) => sanitizeAmountInput(String(Math.floor(Number(n) * 100) / 100));
