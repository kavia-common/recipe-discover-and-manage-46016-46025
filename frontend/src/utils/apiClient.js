const API_BASE = process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || '';
const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || '';
const WS_URL = process.env.REACT_APP_WS_URL || '';

/**
 * API client placeholder. In the future, replace mock fetchers with real fetch calls.
 * This module ensures no hardcoded external URLs; relies on env variables.
 */
// PUBLIC_INTERFACE
export function getApiBaseUrl() {
  /** Returns the resolved API base URL from environment variables. */
  return API_BASE;
}

// PUBLIC_INTERFACE
export function getEnvConfig() {
  /** Returns a snapshot of key env values. */
  return {
    apiBase: API_BASE,
    frontendUrl: FRONTEND_URL,
    wsUrl: WS_URL
  };
}

// PUBLIC_INTERFACE
export async function fetchRecipesMock() {
  /**
   * Placeholder for fetching recipes. Currently loads from local mock data.
   * Replace with: return fetch(`${API_BASE}/recipes`).then(r => r.json());
   */
  const { default: data } = await import('../mock/recipes');
  // simulate latency
  await new Promise(res => setTimeout(res, 200));
  return data;
}
