import { useEffect, useRef } from 'react';
import { createScope } from 'animejs';

type ScopeCallback = (self: any) => void;

/**
 * Custom React hook for Anime.js v4 createScope.
 * Automatically scopes animations to the returned ref and calls revert() on unmount/re-render.
 */
export function useAnimeScope<T extends HTMLElement = HTMLDivElement>(
  callback: ScopeCallback,
  deps: React.DependencyList = []
) {
  const root = useRef<T>(null);
  const scopeRef = useRef<any>(null);

  useEffect(() => {
    if (!root.current) return;

    // Create Anime.js scope bound to root element
    scopeRef.current = createScope({ root: root.current }).add(callback);

    return () => {
      scopeRef.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { root, scope: scopeRef };
}
