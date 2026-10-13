import { createContext, useContext, useEffect, useState } from 'react';
import { api, apiEnabled } from '../api/client.js';
import * as staticData from '../data/portfolioData.js';

const KEYS = ['projects', 'experience', 'skills', 'education', 'certifications'];
const fallback = Object.fromEntries(KEYS.map((k) => [k, staticData[k]]));

const PortfolioContext = createContext(fallback);
export const usePortfolio = () => useContext(PortfolioContext);

/**
 * Starts with the content in portfolioData.js (so the site is instant and works offline),
 * then replaces each list with the database version when the API returns data for it.
 */
export function PortfolioProvider({ children }) {
  const [data, setData] = useState(fallback);

  useEffect(() => {
    if (!apiEnabled) return undefined;
    const ctrl = new AbortController();
    Promise.allSettled(KEYS.map((k) => api.get(`/api/${k}`, { signal: ctrl.signal }))).then((results) => {
      if (ctrl.signal.aborted) return;
      setData((prev) => {
        const next = { ...prev };
        results.forEach((r, i) => {
          if (r.status === 'fulfilled' && Array.isArray(r.value) && r.value.length > 0) next[KEYS[i]] = r.value;
        });
        return next;
      });
    });
    return () => ctrl.abort();
  }, []);

  return <PortfolioContext.Provider value={data}>{children}</PortfolioContext.Provider>;
}
