import { useCallback, useEffect, useSyncExternalStore } from "react";
import { api, BASE_URL } from "./api";

const sessionListeners = new Set();
let sessionState = {
  status: "unknown",
  data: null,
  error: null,
};
let sessionRequest = null;

function emitSessionChange() {
  sessionListeners.forEach((listener) => listener());
}

function setSessionState(nextState) {
  sessionState = nextState;
  emitSessionChange();
}

function getSessionSnapshot() {
  return sessionState;
}

async function fetchSession({ force = false } = {}) {
  if (!force) {
    if (sessionState.status === "ready") {
      return sessionState.data;
    }
    if (sessionRequest) {
      return sessionRequest;
    }
  }

  setSessionState({
    status: "loading",
    data: sessionState.data,
    error: null,
  });

  sessionRequest = (async () => {
    try {
      const res = await fetch(`${BASE_URL}/auth/session`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 401) {
        setSessionState({
          status: "ready",
          data: null,
          error: null,
        });
        return null;
      }

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Session check failed");

      setSessionState({
        status: "ready",
        data: result,
        error: null,
      });
      return result;
    } catch (err) {
      setSessionState({
        status: "error",
        data: null,
        error: err,
      });
      throw err;
    } finally {
      sessionRequest = null;
    }
  })();

  return sessionRequest;
}

/**
 * Auth helpers backed by the Express API.
 * Session is stored in httpOnly cookie; these helpers keep React views in sync.
 */
export async function login(email, password) {
  const result = await api.post("/auth/login", { email, password });
  setSessionState({
    status: "ready",
    data: result,
    error: null,
  });
  return result;
}

export async function registerUser({ name, email, password, role = "cashier" }) {
  const result = await api.post("/auth/register", { name, email, password, role });
  setSessionState({
    status: "ready",
    data: result,
    error: null,
  });
  return result;
}

export async function logout() {
  try {
    await api.post("/auth/logout", {});
    setSessionState({
      status: "ready",
      data: null,
      error: null,
    });
  } catch (err) {
    // Ignore logout failures so UI can still proceed
    console.error("Logout failed", err);
  }
}

export function useSession() {
  const subscribe = useCallback((listener) => {
    sessionListeners.add(listener);
    return () => sessionListeners.delete(listener);
  }, []);

  const snapshot = useSyncExternalStore(subscribe, getSessionSnapshot, getSessionSnapshot);

  const refresh = useCallback(async () => fetchSession({ force: true }), []);

  useEffect(() => {
    if (snapshot.status === "unknown") {
      refresh();
    }
  }, [refresh, snapshot.status]);

  return {
    data: snapshot.data?.user ? { user: snapshot.data.user } : null,
    isPending: snapshot.status === "unknown" || snapshot.status === "loading",
    error: snapshot.error,
    refresh,
  };
}

// Backwards-compatible shape for existing imports
export const authClient = { useSession };
export const signIn = {
  email: ({ email, password }) => login(email, password),
};
export const signUp = {
  email: ({ name, email, password, role }) =>
    registerUser({ name, email, password, role }),
};
export const signOut = logout;
