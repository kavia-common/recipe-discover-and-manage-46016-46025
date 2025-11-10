import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const FAVORITES_KEY = 'recipe-favorites';

const FavoritesContext = createContext({
  favorites: [],
  toggleFavorite: (id) => {},
  isFavorite: (id) => false,
});

// PUBLIC_INTERFACE
export function useFavorites() {
  /** Manage and query favorite recipes by id, persisted in localStorage. */
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const isFavorite = (id) => favorites.includes(id);

  const value = useMemo(() => ({ favorites, toggleFavorite, isFavorite }), [favorites]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
