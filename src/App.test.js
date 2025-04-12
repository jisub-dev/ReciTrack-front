import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the OCR Demo text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Receipt OCR Demo/i);
  expect(linkElement).toBeInTheDocument();
});
