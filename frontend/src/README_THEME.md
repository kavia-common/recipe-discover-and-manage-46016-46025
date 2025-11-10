Ocean Professional Theme Notes

- Palette
  - Primary: #2563EB
  - Secondary: #F59E0B
  - Error: #EF4444
  - Background: #f9fafb
  - Surface: #ffffff
  - Text: #111827

- Components
  - NavBar with brand, search, theme toggle, sidebar toggle
  - RecipeGrid with RecipeCard
  - RecipeModal (accessible)
  - FavoritesSidebar (collapsible)

- State
  - useRecipes: loads mock data, selected recipe state
  - useFavorites: persists favorites in localStorage

- Env
  - Uses REACT_APP_API_BASE/REACT_APP_BACKEND_URL for future API calls (see utils/apiClient.js)
