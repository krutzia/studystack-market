import { useEffect, useState, useCallback } from "react";

const KEY = "campuskart_favorites";

const read = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => read());

  useEffect(() => {
    const handler = () => setFavorites(read());
    window.addEventListener("favorites-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("favorites-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    const current = read();
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("favorites-changed"));
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return { favorites, toggle, isFavorite };
};
