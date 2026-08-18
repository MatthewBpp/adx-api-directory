// src/Home.test.js
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../components/Home';

async function renderHome({ adminMode = false, apiData = [] } = {}) {
  const fetchResponse = { json: async () => apiData };
  global.fetch = jest.fn().mockResolvedValue(fetchResponse);

  await act(async () => {
    render(<Home adminMode={adminMode} />);
    await Promise.resolve();
  });
}

// Default mock: empty API list
beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => []
  });
});

/**
 * BASIC RENDER TEST
 * Ensures core UI elements appear correctly and verifies
 * that the component renders without crashing.
 */
test('renders ADX header on home screen', async () => {
  await renderHome({ adminMode: true });

  // Check main title
  expect(screen.getByRole('heading', { name: /ADX — API Directory/i })).toBeInTheDocument();

  // Check sidebar label
  expect(screen.getByRole('heading', { name: /^ADX$/i })).toBeInTheDocument();

  // Check search input
  expect(screen.getByPlaceholderText(/Search APIs.../i)).toBeInTheDocument();
});

/**
 * SEARCH BEHAVIOUR TEST
 * Demonstrates controlled input behaviour and verifies that
 * typing into the search box updates the input value.
 */
test('updates search input as user types', async () => {
  await renderHome();

  const searchInput = screen.getByPlaceholderText(/Search APIs/i);

  await act(async () => {
    await userEvent.type(searchInput, 'Payments');
    await Promise.resolve();
  });

  expect(searchInput).toHaveValue('Payments');
});

/**
 * FILTERING TEST
 * Ensures the search feature correctly filters API results.
 * Uses findByText to wait for React state updates triggered by fetch().
 */
test('filters API list based on search input', async () => {
  await renderHome({
    apiData: [
      { id: 1, name: 'Payments API', description: 'Payments description', status: 'Up-to-date' },
      { id: 2, name: 'Accounts API', description: 'Accounts description', status: 'Up-to-date' }
    ]
  });

  const searchInput = screen.getByPlaceholderText(/Search APIs/i);

  await act(async () => {
    await userEvent.type(searchInput, 'Payments');
    await Promise.resolve();
  });

  await waitFor(() => {
    expect(global.fetch).toHaveBeenLastCalledWith('/apis?search=Payments');
  });

  expect((await screen.findAllByText(/Payments API/i)).length).toBeGreaterThan(0);
  expect(screen.queryByText(/Accounts API/i)).not.toBeInTheDocument();
});

/**
 * LOADING STATE TEST
 * Verifies that the component shows a loading indicator before
 * fetch resolves. No async needed because fetch never resolves.
 */
test('shows loading state before APIs are fetched', async () => {
  global.fetch = jest.fn(() => new Promise(() => {})); // never resolves

  await act(async () => {
    render(<Home adminMode={false} />);
    await Promise.resolve();
  });

  expect(screen.getByText(/Loading APIs/i)).toBeInTheDocument();
});

/**
 * EMPTY STATE TEST
 * Ensures the UI communicates clearly when no APIs are returned.
 * Uses findByText to wait for fetch resolution.
 */
test('shows empty state when no APIs are returned', async () => {
  await renderHome();

  expect(await screen.findByText(/No APIs found/i)).toBeInTheDocument();
});

/**
 * ADMIN MODE TESTS
 * Demonstrates role-based UI behaviour and verifies that admin
 * controls appear only when adminMode is enabled.
 * Uses findByText to wait for fetch resolution + state update.
 */
test('shows admin controls when adminMode is true', async () => {
  await renderHome({
    adminMode: true,
    apiData: [{ id: 1, name: 'Payments API', status: 'Up-to-date' }]
  });

  await waitFor(() => {
    expect(screen.getAllByRole('link', { name: /Edit/i }).length).toBeGreaterThan(0);
  });
  expect(screen.getByRole('button', { name: /Delete API/i })).toBeInTheDocument();
});

test('hides admin controls when adminMode is false', async () => {
  await renderHome({
    apiData: [{ id: 1, name: 'Payments API', status: 'Up-to-date' }]
  });

  await waitFor(() => {
    expect(screen.getByRole('cell', { name: /Payments API/i })).toBeInTheDocument();
  });

  expect(screen.queryByRole('link', { name: /Edit/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /Delete API/i })).not.toBeInTheDocument();
});
