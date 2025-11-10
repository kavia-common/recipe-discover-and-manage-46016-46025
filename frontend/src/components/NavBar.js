import React from 'react';
import { useTheme } from '../theme/ThemeProvider';

// PUBLIC_INTERFACE
export default function NavBar({ theme, themeName, onToggleTheme, search, onSearchChange, onToggleSidebar, sidebarOpen }) {
  /** Top navigation with brand, search, theme and sidebar toggles. */
  return (
    <nav className="navbar" role="navigation" aria-label="Main">
      <div className="navbar-inner">
        <div className="brand">
          <div className="brand-mark">🌊</div>
          <div className="brand-title retro-title">Ocean Recipes</div>
        </div>

        <div className="search-wrap" role="search">
          <span aria-hidden="true" style={{ color: 'var(--text-muted)' }}>🔎</span>
          <input
            className="search-input"
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search recipes, ingredients..."
            aria-label="Search recipes"
          />
        </div>

        <button
          className="icon-btn"
          onClick={onToggleSidebar}
          aria-pressed={sidebarOpen}
          aria-label={sidebarOpen ? 'Hide favorites sidebar' : 'Show favorites sidebar'}
          title={sidebarOpen ? 'Hide favorites' : 'Show favorites'}
        >
          ⭐
        </button>

        <button
          className="icon-btn primary"
          onClick={onToggleTheme}
          aria-label={`Switch to ${themeName === 'light' ? 'dark' : 'light'} theme`}
          title="Toggle theme"
        >
          {themeName === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
}
