import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app brand title', () => {
  render(<App />);
  const brand = screen.getByText(/Ocean Recipes/i);
  expect(brand).toBeInTheDocument();
});
