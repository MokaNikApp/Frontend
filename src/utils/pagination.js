export function getRangeLabel({ page, limit, total }) {
    const p = Number(page) || 1;
    const l = Number(limit) || 20;
    const t = Number(total) || 0;

    if (t === 0) return { from: 0, to: 0, total: 0, label: "No results" };

    const from = (p - 1) * l + 1;
    const to = Math.min(p * l, t);

    // Safety: if page is out of range (e.g. user navigated past last page),
    // don't show a negative or backwards range.
    if (from > t) {
        return {
            from: t,
            to: t,
            total: t,
            label: `${t.toLocaleString()} result${t === 1 ? "" : "s"}`,
        };
    }

    return {
        from,
        to,
        total: t,
        label: `${from.toLocaleString()}–${to.toLocaleString()} of ${t.toLocaleString()}`,
    };
}
