import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const titleElement = screen.getByText(/Welcome to Gatr!/i);
  expect(titleElement).toBeInTheDocument();
});
