import React, { useMemo } from 'react';
import { useRecipes } from '../hooks/useRecipes';
import RecipeCard from './RecipeCard';

// PUBLIC_INTERFACE
export default function RecipeGrid({ search }) {
  /** Displays a responsive grid of recipe cards, filtered by search. */
  const { recipes, loading, error } = useRecipes();

  const filtered = useMemo(() => {
    const q = (search || '').toLowerCase();
    if (!q) return recipes;
    return recipes.filter(r =>
      r.title.toLowerCase().includes(q) ||
      (r.description || '').toLowerCase().includes(q) ||
      (r.tags || []).some(t => t.toLowerCase().includes(q)) ||
      (r.ingredients || []).some(i => i.toLowerCase().includes(q))
    );
  }, [recipes, search]);

  if (loading) return <div style={{ maxWidth: 1200, margin: '16px auto' }}>Loading recipes…</div>;
  if (error) return <div style={{ maxWidth: 1200, margin: '16px auto', color: 'var(--error)' }}>Error: {error}</div>;
  if (!filtered.length) return <div style={{ maxWidth: 1200, margin: '16px auto' }}>No recipes found.</div>;

  return (
    <div className="recipe-grid" aria-live="polite">
      {filtered.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
