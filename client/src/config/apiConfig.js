/**
 * API Configuration
 * This file manages the base URL for all API calls.
 * Uses environment variables for flexible deployment.
 */

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

/**
 * Helper function to build API endpoints
 * @param {string} path - The API path (e.g., '/apis', '/apis/1')
 * @returns {string} - The full API URL
 */
export const buildApiUrl = (path) => `${API_BASE_URL}${path}`;

export default API_BASE_URL;
