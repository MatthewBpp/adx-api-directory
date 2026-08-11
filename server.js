/**
 * ADX Backend Core
 * This step introduces the first data layer for the API Directory (ADX).
 * API metadata is now stored in a JSON file (data/apis.json) and served
 * through the /apis endpoint to the React frontend.
 *
 * Why it's important:
 * - Establishes a single source of truth for API documentation.
 * - Enables future enhancements: search, filtering, freshness tracking.
 * - Keeps backend logic separate from data storage.
 * - Allows easy migration to a database later without changing the frontend.
 */

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Load API directory data from JSON file
const apis = require('./data/apis.json');

// Return all APIs to the frontend
app.get('/apis', (req, res) => {
    res.json(apis);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log('Server running on port ' + PORT));

