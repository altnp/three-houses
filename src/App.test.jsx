import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders "Hello World" div', () => {
  render(<App />);
  const linkElement = screen.getByText(`Hello World`);
  expect(linkElement).toBeInstanceOf(HTMLDivElement);
  expect(linkElement.textContent).toBe("Hello World");
});
