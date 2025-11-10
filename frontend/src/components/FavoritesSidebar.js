import React, { useMemo } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { useRecipes } from '../hooks/useRecipes';

// PUBLIC_INTERFACE
export default function FavoritesSidebar({ open }) {
  /** Sidebar listing favorites, collapsible via parent control. */
  const { favorites, toggleFavorite } = useFavorites();
  const { recipes, setSelected } = useRecipes();

  const favRecipes = useMemo(
    () => recipes.filter(r => favorites.includes(r.id)),
    [recipes, favorites]
  );

  return (
    <aside className={`sidebar ${open ? '' : 'hidden'}`} aria-label="Favorites">
      <div className="sidebar-inner">
        <div className="sidebar-header">
          <div className="retro-title" aria-live="polite">Favorites</div>
          <div className="small">{favRecipes.length}</div>
        </div>
        <div className="sidebar-list">
          {favRecipes.length === 0 && <div className="small">No favorites yet. Add some ⭐</div>}
          {favRecipes.map(r => (
            <div key={r.id} className="sidebar-item">
              <img className="sidebar-thumb" src={r.image} alt="" onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} />
              <div style={{ minWidth: 0 }}>
                <div className="retro-title" style={{ fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.title}</div>
                <div className="small">{r.time} min • {r.difficulty}</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="icon-btn" onClick={() => setSelected(r)} aria-label={`Open ${r.title}`}>↗</button>
                <button className="icon-btn" onClick={() => toggleFavorite(r.id)} aria-label={`Remove ${r.title} from favorites`}>✕</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
