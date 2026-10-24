import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { walletApi } from "../api/wallet";
import { getApiError } from "../lib/utils/apiHelpers";

export const WALLET_KEY = ["wallet", "me"];
export const ESCROW_KEY = ["escrow", "pending"];

/** Current user's wallet (user wallet for customers, mechanic wallet for providers). */
export function useWallet() {
  return useQuery({
    queryKey: WALLET_KEY,
    queryFn: walletApi.me,
    staleTime: 15_000,
    refetchOnWindowFocus: true,
  });
}

/** Mechanic: money paid by customers that has not been released to the wallet yet. */
export function usePendingEscrow(enabled = true) {
  return useQuery({
    queryKey: ESCROW_KEY,
    queryFn: walletApi.pendingEscrow,
    staleTime: 30_000,
    enabled,
  });
}

/**
 * Tiny "load more" paginator for `{ items, total, page, limit }` responses.
 * Plain state on purpose (no react-query version assumptions). Optional polling
 * while `shouldPoll(items)` is true (e.g. payouts that are still processing).
 */
export function usePagedList(fetcher, { limit = 15, pollMs = 0, shouldPoll } = {}) {
  const [state, setState] = useState({
    items: [],
    page: 0,
    total: 0,
    loading: true,
    loadingMore: false,
    error: null,
  });
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const loadPage = useCallback(
    async (page, { silent = false } = {}) => {
      if (!silent) {
        setState((s) => ({
          ...s,
          loading: page === 1 && s.items.length === 0,
          loadingMore: page > 1,
          error: null,
        }));
      }
      try {
        const res = await fetcherRef.current({ page, limit });
        if (!alive.current) return;
        const incoming = Array.isArray(res?.items) ? res.items : [];
        setState((s) => ({
          items:
            page === 1
              ? incoming
              : [...s.items, ...incoming.filter((i) => !s.items.some((x) => x.id === i.id))],
          page: res?.page || page,
          total: res?.total ?? incoming.length,
          loading: false,
          loadingMore: false,
          error: null,
        }));
      } catch (err) {
        if (!alive.current) return;
        // A failed silent poll should not wipe a list the user is looking at.
        if (silent) return;
        setState((s) => ({ ...s, loading: false, loadingMore: false, error: getApiError(err, "Could not load this list.") }));
      }
    },
    [limit]
  );

  useEffect(() => {
    loadPage(1);
  }, [loadPage]);

  const reload = useCallback((silent = false) => loadPage(1, { silent }), [loadPage]);
  const loadMore = useCallback(() => loadPage(state.page + 1), [loadPage, state.page]);

  const polling = !!pollMs && !!shouldPoll && shouldPoll(state.items);
  useEffect(() => {
    if (!polling) return undefined;
    const id = setInterval(() => loadPage(1, { silent: true }), pollMs);
    return () => clearInterval(id);
  }, [polling, pollMs, loadPage]);

  return {
    ...state,
    hasMore: state.items.length < state.total,
    reload,
    loadMore,
  };
}

/** Re-render every `ms` (for "releases in 4h 12m" labels). */
export function useNow(ms = 60_000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), ms);
    return () => clearInterval(id);
  }, [ms]);
  return now;
}
