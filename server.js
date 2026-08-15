/**
 * ADX Backend Core
 * Serves API metadata to the React frontend.
 * Supports search, filtering, and individual API lookup.
 */

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Load API directory data from JSON file
const apis = require('./data/apis.json');

/**
 * GET /apis
 * Returns all APIs, with optional search + filtering.
 * This powers the ADX Home screen.
 */
app.get('/apis', (req, res) => {
    let results = apis;

    const { search, domain, status, method } = req.query;

    // SEARCH (name, domain, owner, status)
    if (search) {
        const term = search.toLowerCase();
        results = results.filter(api =>
            api.name.toLowerCase().includes(term) ||
            api.domain.toLowerCase().includes(term) ||
            api.owner.toLowerCase().includes(term) ||
            api.status.toLowerCase().includes(term)
        );
    }

    // FILTER: Domain
    if (domain && domain !== "All") {
        results = results.filter(api => api.domain === domain);
    }

    // FILTER: Status
    if (status && status !== "All") {
        results = results.filter(api => api.status === status);
    }

    // FILTER: Method
    if (method && method !== "All") {
        results = results.filter(api => api.method === method);
    }

    res.json(results);
});

/**
 * GET /apis/:id
 * Returns a single API object by ID.
 * This powers the API Details page.
 */
app.get('/apis/:id', (req, res) => {
    const apiId = parseInt(req.params.id);
    const api = apis.find(a => a.id === apiId);

    if (!api) {
        return res.status(404).json({ error: "API not found" });
    }

    res.json(api);
});

/**
 * PUT /apis/:id
 * Updates an existing API object.
 * This powers the Edit API page.
 */
app.put('/apis/:id', (req, res) => {
    const apiId = parseInt(req.params.id);
    const index = apis.findIndex(a => a.id === apiId);

    if (index === -1) {
        return res.status(404).json({ error: "API not found" });
    }

    // Replace the API object with the updated one
    apis[index] = req.body;

    res.json({ message: "API updated successfully", api: apis[index] });
});

/**
 * POST /apis
 * Adds a new API object.
 * This powers the Add API page.
 */
app.post('/apis', (req, res) => {
    const newApi = req.body;

    // Assign a new ID (simple auto-increment)
    newApi.id = apis.length + 1;

    apis.push(newApi);

    res.json({ message: "API added successfully", api: newApi });
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
