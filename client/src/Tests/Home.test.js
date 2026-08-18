// src/Home.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../components/Home';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => []
  });
});

test('renders ADX header on home screen', () => {
  render(<Home adminMode={true} />);

  // Check main title
  expect(screen.getByRole('heading', { name: /ADX — API Directory/i })).toBeInTheDocument();

  // Check sidebar label
  expect(screen.getByRole('heading', { name: /^ADX$/i })).toBeInTheDocument();

  // Check search input
  expect(screen.getByPlaceholderText(/Search APIs.../i)).toBeInTheDocument();
});
