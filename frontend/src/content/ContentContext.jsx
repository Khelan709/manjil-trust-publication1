import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_CONTENT } from '../data/defaults';
import { deepMerge } from './merge';
import { api } from '../services/api';

const ContentContext = createContext({ content: DEFAULT_CONTENT, reload: async () => {} });

/**
 * Supplies site content to the whole app. Renders immediately with the built-in defaults, then
 * overlays the admin's saved edits from GET /api/content. If the API is unreachable the defaults stay.
 */
export function ContentProvider({ children }) {
  const [overrides, setOverrides] = useState({});

  const reload = useCallback(async () => {
    try {
      const { content } = await api.getContent();
      setOverrides(content || {});
    } catch {
      /* API offline: keep defaults */
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const content = useMemo(() => {
    const merged = {};
    for (const key of Object.keys(DEFAULT_CONTENT)) merged[key] = deepMerge(DEFAULT_CONTENT[key], overrides[key]);
    return merged;
  }, [overrides]);

  const value = useMemo(() => ({ content, reload }), [content, reload]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

/** Effective (defaults + admin edits) content document, e.g. useContent('home').hero */
export const useContent = (key) => useContext(ContentContext).content[key];
export const useImages = () => useContent('images');
export const useSettings = () => useContent('settings');
export const useReloadContent = () => useContext(ContentContext).reload;
