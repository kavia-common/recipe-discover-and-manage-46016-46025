import React, { useMemo, useEffect, useState } from 'react';
import './App.css';
import './index.css';
import ThemeProvider, { useTheme } from './theme/ThemeProvider';
import NavBar from './components/NavBar';
import RecipeGrid from './components/RecipeGrid';
import RecipeModal from './components/RecipeModal';
import FavoritesSidebar from './components/FavoritesSidebar';
import { RecipesProvider } from './hooks/useRecipes';
import { FavoritesProvider } from './hooks/useFavorites';
import { usePrefersDark } from './theme/usePrefersDark';

/**
 * Root content wrapped by providers to keep App.js clean.
 */
function AppContent() {
  const { themeName, setThemeName, theme } = useTheme();
  const prefersDark = usePrefersDark();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');

  // Sync theme with system preference on first load
  useEffect(() => {
    if (!localStorage.getItem('oceanpro-theme')) {
      setThemeName(prefersDark ? 'dark' : 'light');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersDark]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeName);
  }, [themeName]);

  const layoutStyle = useMemo(
    () => ({
      display: 'grid',
      gridTemplateColumns: sidebarOpen ? '1fr 340px' : '1fr 0px',
      gap: '0',
      minHeight: '100vh',
      background: theme.background,
      color: theme.text,
    }),
    [sidebarOpen, theme.background, theme.text]
  );

  return (
    <div style={layoutStyle}>
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <NavBar
          theme={theme}
          themeName={themeName}
          onToggleTheme={() => setThemeName(themeName === 'light' ? 'dark' : 'light')}
          search={search}
          onSearchChange={setSearch}
          onToggleSidebar={() => setSidebarOpen(s => !s)}
          sidebarOpen={sidebarOpen}
        />
        <div style={{ padding: '16px' }}>
          <RecipeGrid search={search} />
        </div>
      </div>
      <FavoritesSidebar open={sidebarOpen} />
      <RecipeModal />
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** Main entry with providers; no backend calls yet. */
  return (
    <ThemeProvider>
      <RecipesProvider>
        <FavoritesProvider>
          <AppContent />
        </FavoritesProvider>
      </RecipesProvider>
    </ThemeProvider>
  );
}

export default App;
