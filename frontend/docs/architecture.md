# Recipe Pro.

## System Overview

This document describes the architecture of the Recipe Discovery and Management web application’s frontend container. The application enables users to discover, view, and manage recipes through a modern, responsive UI aligned with the “Ocean Professional” style theme. The current implementation is a standalone React app with a mock data source; it is designed for seamless integration with a future backend via environment-configured API endpoints.

Primary capabilities:
- Discover recipes via a searchable grid.
- View recipe details in an accessible modal.
- Manage favorites, persisted locally in the browser.
- Modern theming with light/dark modes and Ocean Professional palette.

Primary users:
- Guests and authenticated users (future). The current version assumes guests without auth.

Tech stack:
- React 18 with react-scripts (Create React App baseline).
- Vanilla CSS (no heavy UI frameworks).
- Jest and React Testing Library for unit testing.

Key directories:
- src/components: UI components (NavBar, RecipeGrid, RecipeCard, RecipeModal, FavoritesSidebar).
- src/hooks: Custom hooks and context providers (useRecipes, useFavorites).
- src/utils: API client (future backend integration).
- src/theme: Theme provider and system preference hook.
- src/mock: Mock recipes data.

## Goals and Non-Goals

### Goals
- Provide a lightweight, responsive UI to browse and view recipes.
- Implement a Favorites system persisted with localStorage.
- Establish a scalable component and state architecture for future growth.
- Align theming and visuals with the Ocean Professional style guide.
- Prepare clear integration points for a backend API with environment-driven configuration.
- Ensure baseline accessibility (a11y) for keyboard and screen readers.
- Ensure foundational test coverage of main flows.

### Non-Goals
- Implement user authentication and profiles (future).
- Implement server-side persistence for favorites (future).
- Implement real-time updates via WebSockets (future).
- Implement complex state management frameworks (e.g., Redux); we use React Context and hooks for now.
- Implement internationalization (i18n) framework; we outline considerations for future.

## Container Overview

Container: frontend
- Platform: Web (React)
- UI: Single-page application (SPA)
- Build: react-scripts with CRA configuration
- Deployment: Static asset hosting
- Env variables: Configured through REACT_APP_* variables.

Entry:
- src/index.js mounts <App />.
- src/App.js sets up providers and layout.

## Component Architecture

Top-level tree overview:
- App
  - ThemeProvider
  - RecipesProvider
  - FavoritesProvider
  - AppContent
    - NavBar
    - RecipeGrid
      - RecipeCard*
    - FavoritesSidebar
    - RecipeModal

Components and responsibilities:
- App (src/App.js): Initializes theme, recipe, and favorites contexts; composes layout with sidebar and modal.
- NavBar (src/components/NavBar.js): Brand, search input, theme toggle, sidebar toggle. Responsible for top-level actions and search propagation.
- RecipeGrid (src/components/RecipeGrid.js): Reads recipes from context, filters by search, renders RecipeCard instances.
- RecipeCard (src/components/RecipeCard.js): Displays recipe summary, toggles favorite, opens modal via context.
- RecipeModal (src/components/RecipeModal.js): Displays detailed recipe content, supports keyboard Escape close, and provides ARIA attributes for accessibility.
- FavoritesSidebar (src/components/FavoritesSidebar.js): Lists favorite recipes, allows quick open/remove actions; collapsible.

Supporting modules:
- useRecipes (src/hooks/useRecipes.js): Loads recipes from mock source, exposes recipes state, selection, loading/error, and refresh. Future: replace mock with API client calls.
- useFavorites (src/hooks/useFavorites.js): Manages favorite recipe IDs with localStorage persistence, toggle methods, and query helpers.
- ThemeProvider (src/theme/ThemeProvider.js): Provides theme tokens, persists selected theme name in localStorage.
- usePrefersDark (src/theme/usePrefersDark.js): Detects system dark preference; App syncs initial theme accordingly.
- apiClient (src/utils/apiClient.js): Centralizes API base URL resolution and exposes mock fetch; future: replace with networked fetch.

## State Management

The app uses React Context + Custom Hooks.

- Recipes state (useRecipes):
  - recipes: array of Recipe objects
  - selected: Recipe | null (for modal)
  - loading, error: control flags
  - refresh: async loader
  - setSelected: controls modal recipe
  - Source: fetchRecipesMock from utils/apiClient.js (currently mock)

- Favorites state (useFavorites):
  - favorites: string[] of recipe IDs
  - toggleFavorite(id): add/remove ID
  - isFavorite(id): query helper
  - Persistence: localStorage under key 'recipe-favorites'

- Theme state (ThemeProvider):
  - themeName: 'light' | 'dark'; persisted under key 'oceanpro-theme'
  - theme: token palette (colors, background, surface)
  - usePrefersDark: aligns initial theme to system preference

Data flow:
- NavBar updates search string in AppContent state.
- RecipeGrid filters recipes by search term and renders cards.
- RecipeCard uses setSelected to open modal; toggleFavorite to update favorites.
- FavoritesSidebar filters recipes using favorites list and supports open/remove.

## Data Models

Recipe (current mock shape: src/mock/recipes.js)
- id: string
- title: string
- description: string
- image: string (URL)
- time: number (minutes)
- difficulty: string ('Easy' | 'Medium' | 'Hard' or freeform)
- servings: number
- tags?: string[]
- ingredients?: string[]
- steps?: string[]

Favorite
- favorite entry is represented implicitly as recipe id in favorites: string[]

Future persistence model:
- Favorite entity: { id: string; recipeId: string; userId: string; createdAt: string }
- User entity: out of scope for current FE; planned for backend integration.

## API Integration Strategy

Current:
- fetchRecipesMock dynamically imports mock data with simulated latency: src/utils/apiClient.js
- API base resolution uses env vars:
  - REACT_APP_API_BASE or REACT_APP_BACKEND_URL
  - getApiBaseUrl() to retrieve base for future calls
- No hardcoded network URLs; all configurable via env.

Future:
- Replace fetchRecipesMock with networked calls to `${API_BASE}/recipes`:
  - List recipes: GET /recipes
  - Get recipe by id: GET /recipes/:id
  - Search recipes: GET /recipes?query=
- Favorites (future authenticated endpoints):
  - List favorites: GET /users/me/favorites
  - Add favorite: POST /users/me/favorites { recipeId }
  - Remove favorite: DELETE /users/me/favorites/:recipeId
- Consider WebSocket URL from REACT_APP_WS_URL for live updates (e.g., featured recipes).

HTTP client:
- Use native fetch for simplicity.
- Centralize all fetches in utils/apiClient.js for consistent headers, error handling, retries, and JSON parsing.
- Add request/response wrappers and error normalization.

Error handling:
- Propagate errors from apiClient to useRecipes/useFavorites as user-friendly messages.
- Use boundary UI for error states (already implemented in RecipeGrid for list fetch).

## Environment Configuration

The frontend reads the following environment variables (exact set defined by the container):
- REACT_APP_API_BASE: Base URL for the API; preferred primary endpoint for HTTP requests.
- REACT_APP_BACKEND_URL: Fallback base URL for backend API if API_BASE is not set.
- REACT_APP_FRONTEND_URL: Public URL for the frontend; useful for CORS or links.
- REACT_APP_WS_URL: WebSocket endpoint for real-time features (future).
- REACT_APP_NODE_ENV: Node environment; used for logging and feature toggles.
- REACT_APP_NEXT_TELEMETRY_DISABLED: Disabled telemetry flag for build tools.
- REACT_APP_ENABLE_SOURCE_MAPS: Toggle source maps in production builds.
- REACT_APP_PORT: Preferred port for development server.
- REACT_APP_TRUST_PROXY: Reverse proxy trust configuration (for deployments).
- REACT_APP_LOG_LEVEL: Minimum log level for client logging.
- REACT_APP_HEALTHCHECK_PATH: Path for container health probes.
- REACT_APP_FEATURE_FLAGS: JSON or CSV string of feature flags (e.g., “favoritesV2,wsLive”).
- REACT_APP_EXPERIMENTS_ENABLED: Boolean-like string controlling experimental UI/features.

Implementation references:
- src/utils/apiClient.js resolves API_BASE, FRONTEND_URL, WS_URL and exports getApiBaseUrl/getEnvConfig.

Operational recommendations:
- Never check in .env with secrets.
- Use environment variable injection at build time for static hosting or runtime env injection strategies (e.g., window.__ENV__).

## UI/UX Layout and Ocean Professional Theming

Layout:
- Top NavBar with brand, search input, theme toggle, and favorites sidebar toggle.
- Main content as a responsive RecipeGrid (12-column CSS grid, responsive breakpoints).
- RecipeModal overlays for details.
- FavoritesSidebar collapsible on the right.

Ocean Professional theme mapping:
- Colors: primary #2563EB, secondary #F59E0B, error #EF4444, background #f9fafb, surface #ffffff, text #111827.
- Gradients and shadows: subtle ocean gradient and soft shadows for depth.
- Rounded corners and minimalist styling with adequate spacing.

Where defined:
- src/index.css: CSS variables for palette, shadow, radius, gradient, dark theme tokens, base typography.
- src/App.css: Component styles for NavBar, search, icon buttons, RecipeGrid, cards, badges, modal, and sidebar.
- src/theme/ThemeProvider.js: Theme tokens surfaced via React context.
- src/theme/usePrefersDark.js: System theme alignment.

Accessibility styling:
- Sufficient contrast ensured by palette usage; additional focus states and aria attributes applied on interactive controls.

## Accessibility (a11y) and Internationalization

Accessibility:
- Landmarks and roles:
  - NavBar uses role="navigation" and aria-label.
  - RecipeModal uses role="dialog", aria-modal, labeled by heading, and described by paragraph.
  - Live regions: RecipeGrid uses aria-live="polite" for updates as filtering changes.
- Keyboard support:
  - Escape closes modal (bound on keydown).
  - Buttons expose accessible names via aria-label or visible text.
- Images:
  - Recipe images include alt text or empty alt where decorative.
  - onError handlers hide failed media gracefully.
- Counts and status:
  - Favorites count updates are available via live text in sidebar header.

Internationalization (future considerations):
- Prepare to externalize strings used for labels, placeholders, and status messages.
- Introduce a translation library (e.g., react-intl or i18next) in a future iteration.
- Ensure number/date/time formatting where applicable; recipes currently use simple numbers and strings.

## Performance and Scalability

Current performance characteristics:
- Lightweight React app with minimal dependencies.
- Mock data import with simulated 200ms latency; no network overhead yet.

Future scaling considerations:
- Virtualization: If the recipe list grows large, introduce windowed list rendering (e.g., react-window) to minimize DOM nodes.
- Pagination and infinite scroll: Switch from full list fetch to paginated endpoints; update RecipeGrid to fetch pages by search/filter.
- Memoization: UseMemo used for search filtering; consider server-side search to reduce client computation.
- Code splitting: If features grow, consider dynamic imports for modal, grid, or details.
- Caching: Use SWR/React Query type patterns or local caching to reduce network traffic.

Static assets:
- optimize image handling with responsive image URLs or `srcset` where available.
- lazy load off-screen images when implementing larger grids.

## Security Considerations

- Environment variables: Avoid hardcoding secrets; use REACT_APP_ variables for non-secret configuration. Do not include credentials client-side.
- CORS: Backend should configure CORS to allow REACT_APP_FRONTEND_URL origin. The frontend should not bypass CORS.
- Input handling: Search input is client-only; sanitize inputs when constructing query parameters for API requests. Avoid injecting unsanitized content into the DOM; React escapes HTML by default.
- Dependencies: Keep react-scripts and dependencies up-to-date; pin versions. Enable audits in CI.
- Content Security Policy: Recommend enforcing CSP at hosting layer to reduce XSS risk. Avoid inline scripts.
- Error handling: Avoid exposing sensitive internal messages to users. Normalize errors coming from the API client.

## Testing Approach

Framework:
- Jest + React Testing Library (configured by CRA).
- src/setupTests.js includes jest-dom matchers.

Current tests:
- src/App.test.js validates the presence of the brand title “Ocean Recipes”.

Targets:
- Unit tests
  - Components: NavBar, RecipeGrid, RecipeCard, RecipeModal, FavoritesSidebar
  - Hooks: useFavorites, useRecipes (mock API client functions)
- Integration tests
  - Search flow filters RecipeGrid results
  - Favorite toggling reflects in sidebar and card state
  - Modal open/close behavior including Escape key handling
- Coverage goals
  - Statements/Branches/Lines > 80%
  - Critical components and hooks > 90%

CI recommendations:
- Run test scripts in CI with coverage reporting: CI=true npm test -- --coverage
- Add lint step via ESLint config present in frontend/eslint.config.mjs

## Deployment Assumptions and Previews

Assumptions:
- Built as a static SPA via npm run build.
- Deployed to static hosting (e.g., Netlify, Vercel, S3+CloudFront).
- Environment variables injected at build time.
- HEALTHCHECK endpoint for the container can be a static /health path exposing 200 OK from hosting layer or index.html if static only.

Previews:
- Enable deployment previews per Pull Request to validate UI and interactions.
- Use REACT_APP_FEATURE_FLAGS to gate experimental UI during previews.

## Future Backend Integration Plan

Integration points are centralized in src/utils/apiClient.js. Proposed REST endpoints:
- GET /recipes
  - Returns paginated list of recipes with filters: ?query, ?tags, ?difficulty
- GET /recipes/:id
  - Returns a full recipe with ingredients and steps
- POST /users/me/favorites
  - Body: { recipeId }
- DELETE /users/me/favorites/:recipeId
  - Removes favorite for the current user
- GET /users/me/favorites
  - Returns the user’s favorites as recipe IDs or full recipe references

Frontend changes:
- Replace fetchRecipesMock with real fetch calls:
  - Example:
    ```javascript
    export async function fetchRecipes() {
      const res = await fetch(`${getApiBaseUrl()}/recipes`, { credentials: 'include' });
      if (!res.ok) throw new Error(`Failed to fetch recipes: ${res.status}`);
      return res.json();
    }
    ```
- Update useRecipes to call fetchRecipes instead of fetchRecipesMock.
- Add optimistic updates or eventual consistency depending on favorites API behavior.
- Consider authentication flow and tokens:
  - Store tokens securely (httpOnly cookie preferred) and include credentials in fetch.

WebSockets (optional future):
- Use REACT_APP_WS_URL to subscribe to updates for featured recipes or real-time availability changes.

## Roadmap

Phase 1 (current):
- SPA with search, grid, modal, favorites persisted locally.
- Ocean Professional theming and accessibility basics.
- Unit test for main entry and brand presence.

Phase 2:
- Replace mock data with real API endpoints (GET /recipes).
- Expand tests for RecipeGrid filtering, modal behavior, favorites logic.
- Introduce error boundary and toast notifications.

Phase 3:
- Implement authenticated favorites with backend integration (GET/POST/DELETE).
- Add pagination or infinite scrolling and server-side search.
- Introduce i18n infrastructure.

Phase 4:
- Performance enhancements for large datasets: virtualization, code splitting.
- Real-time updates via WebSockets for featured content.
- Improved accessibility testing with automated tools (axe-core).

## Code References

Entry and Providers:
- src/index.js
- src/App.js

Components:
- src/components/NavBar.js
- src/components/RecipeGrid.js
- src/components/RecipeCard.js
- src/components/RecipeModal.js
- src/components/FavoritesSidebar.js

Hooks and State:
- src/hooks/useRecipes.js
- src/hooks/useFavorites.js

API Client and Mock:
- src/utils/apiClient.js
- src/mock/recipes.js

Theme:
- src/theme/ThemeProvider.js
- src/theme/usePrefersDark.js
- src/index.css
- src/App.css

Tests:
- src/App.test.js
- src/setupTests.js

## Integration Points Summary

- API Base URL: getApiBaseUrl() from src/utils/apiClient.js
- Replace fetchRecipesMock with real fetchRecipes call to `${API_BASE}/recipes`
- Add favorites endpoints when user auth becomes available
- Optional real-time updates via REACT_APP_WS_URL
- Feature flags via REACT_APP_FEATURE_FLAGS to stage backend-driven features

