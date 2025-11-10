import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { useRecipes } from '../hooks/useRecipes';

// PUBLIC_INTERFACE
export default function RecipeCard({ recipe }) {
  /** Card UI for a single recipe, with favorite toggle and open modal on click. */
  const { isFavorite, toggleFavorite } = useFavorites();
  const { setSelected } = useRecipes();
  const fav = isFavorite(recipe.id);

  return (
    <article className="card" role="article" aria-label={recipe.title}>
      <button
        style={{ border: 'none', padding: 0, background: 'transparent', display: 'block', width: '100%', textAlign: 'left' }}
        onClick={() => setSelected(recipe)}
        aria-label={`View details for ${recipe.title}`}
      >
        <img
          className="card-cover"
          src={recipe.image}
          alt={recipe.title}
          onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
        />
      </button>
      <div className="card-body">
        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 8 }}>
          <div>
            <h3 className="retro-title" style={{ margin: '4px 0 6px 0', fontSize: 18 }}>{recipe.title}</h3>
            <div className="small">{recipe.time} min • {recipe.difficulty} • Serves {recipe.servings}</div>
          </div>
          <button
            className="icon-btn"
            aria-pressed={fav}
            aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
            onClick={() => toggleFavorite(recipe.id)}
            title={fav ? 'Remove favorite' : 'Add favorite'}
          >
            {fav ? '⭐' : '☆'}
          </button>
        </div>
        <div className="small" style={{ marginTop: 6 }}>{recipe.description}</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
          {(recipe.tags || []).map(tag => (
            <span key={tag} className="badge">#{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
