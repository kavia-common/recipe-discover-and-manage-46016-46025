import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchRecipesMock } from '../utils/apiClient';

const RecipesContext = createContext({
  recipes: [],
  loading: false,
  error: null,
  selected: null,
  setSelected: () => {},
  refresh: () => Promise.resolve(),
});

// PUBLIC_INTERFACE
export function useRecipes() {
  /** Access recipes, loading, selected item, and refresh method. */
  return useContext(RecipesContext);
}

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRecipesMock();
      setRecipes(data);
    } catch (e) {
      setError(e?.message || 'Failed to load recipes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  const value = useMemo(() => ({
    recipes, loading, error, selected, setSelected, refresh
  }), [recipes, loading, error, selected]);

  return <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>;
}
