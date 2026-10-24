import { forwardRef } from "react";
import { sanitizeAmountInput } from "../../lib/utils/money";
import { cx } from "./ui";

/** Big naira input. Value is the formatted string ("12,500.5"); parse with parseAmount(). */
const AmountField = forwardRef(function AmountField({ value, onChange, invalid, disabled, id, describedBy }, ref) {
  return (
    <div
      className={cx(
        "flex items-center gap-2 rounded-2xl border-2 bg-slate-50 px-4 py-3.5 transition-colors focus-within:bg-white",
        invalid ? "border-red-300 focus-within:border-red-500" : "border-transparent focus-within:border-blue-500",
        disabled && "opacity-60"
      )}
    >
      <span className="text-2xl font-bold text-slate-400" aria-hidden="true">₦</span>
      <input
        ref={ref}
        id={id}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(sanitizeAmountInput(e.target.value))}
        inputMode="decimal"
        autoComplete="off"
        placeholder="0.00"
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className="w-full min-w-0 bg-transparent text-3xl font-bold tabular-nums tracking-tight text-slate-900 outline-none placeholder:text-slate-300"
      />
    </div>
  );
});

export default AmountField;

export const Chip = ({ active, children, ...rest }) => (
  <button
    type="button"
    {...rest}
    className={cx(
      "rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition active:scale-95 disabled:opacity-50",
      active ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
    )}
  >
    {children}
  </button>
);
