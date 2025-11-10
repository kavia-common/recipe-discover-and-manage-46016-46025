import React, { useEffect, useRef } from 'react';
import { useRecipes } from '../hooks/useRecipes';
import { useFavorites } from '../hooks/useFavorites';

// PUBLIC_INTERFACE
export default function RecipeModal() {
  /** Displays details of the selected recipe in a modal dialog with ARIA support. */
  const { selected, setSelected } = useRecipes();
  const { isFavorite, toggleFavorite } = useFavorites();
  const closeRef = useRef();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setSelected(null);
    };
    if (selected) {
      document.addEventListener('keydown', onKey);
    }
    return () => document.removeEventListener('keydown', onKey);
  }, [selected, setSelected]);

  if (!selected) return null;

  const fav = isFavorite(selected.id);

  const stop = (e) => e.stopPropagation();

  return (
    <div
      className="modal-backdrop"
      onClick={() => setSelected(null)}
      role="presentation"
    >
      <section
        className="modal-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="recipe-modal-title"
        aria-describedby="recipe-modal-desc"
        onClick={stop}
      >
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          <h2 id="recipe-modal-title" className="retro-title" style={{ margin: 0, fontSize: 22 }}>{selected.title}</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className="icon-btn"
              aria-pressed={fav}
              aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
              onClick={() => toggleFavorite(selected.id)}
              title={fav ? 'Remove favorite' : 'Add favorite'}
            >
              {fav ? '⭐' : '☆'}
            </button>
            <button
              ref={closeRef}
              className="icon-btn secondary"
              onClick={() => setSelected(null)}
              aria-label="Close details"
            >
              ✕
            </button>
          </div>
        </header>
        <div style={{ display: 'grid', gap: 10, padding: 12 }}>
          <img
            src={selected.image}
            alt=""
            style={{ width: '100%', maxHeight: 360, objectFit: 'cover', borderRadius: 12, background: '#dbeafe' }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <p id="recipe-modal-desc" className="small">{selected.description}</p>
          <div className="badge" aria-label="Quick facts">
            ⏱ {selected.time} min • 🎯 {selected.difficulty} • 👥 {selected.servings}
          </div>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 2fr' }}>
            <div>
              <h3 className="retro-title" style={{ margin: '10px 0' }}>Ingredients</h3>
              <ul>
                {(selected.ingredients || []).map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="retro-title" style={{ margin: '10px 0' }}>Steps</h3>
              <ol>
                {(selected.steps || []).map((s, idx) => (
                  <li key={idx} style={{ marginBottom: 6 }}>{s}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
