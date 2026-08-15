/**
 * ADX Backend Core
 * Serves API metadata to the React frontend.
 * Supports search, filtering, and individual API lookup.
 */

const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');

app.use(cors());
app.use(express.json());

// Load API directory data from JSON file (in-memory store)
const apis = require('./data/apis.json');

/**
 * Utility: Write updated API array back to JSON file
 */
function saveApis() {
    fs.writeFileSync('./data/apis.json', JSON.stringify(apis, null, 2));
}

/**
 * Utility: Generate YYYY-MM-DD timestamp
 */
function getTimestamp() {
    return new Date().toISOString().split("T")[0];
}

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
 * Ensures requestParams is always an array.
 */
app.get('/apis/:id', (req, res) => {
    const apiId = parseInt(req.params.id);
    const api = apis.find(a => a.id === apiId);

    if (!api) {
        return res.status(404).json({ error: "API not found" });
    }

    // Guarantee requestParams is always an array
    api.requestParams = Array.isArray(api.requestParams) ? api.requestParams : [];

    res.json(api);
});

/**
 * PUT /apis/:id
 * Updates an existing API object.
 * Auto-updates lastUpdated timestamp.
 * Preserves requestParams so ApiDetails never breaks.
 */
app.put('/apis/:id', (req, res) => {
    const apiId = parseInt(req.params.id);
    const index = apis.findIndex(a => a.id === apiId);

    if (index === -1) {
        return res.status(404).json({ error: "API not found" });
    }

    const updated = {
        ...apis[index],          // keep existing fields
        ...req.body,             // overwrite edited fields
        requestParams: Array.isArray(apis[index].requestParams)
            ? apis[index].requestParams
            : [],                // ALWAYS preserve array
        lastUpdated: getTimestamp()
    };

    apis[index] = updated;

    saveApis();

    res.json({ message: "API updated successfully", api: updated });
});

/**
 * POST /apis
 * Adds a new API object.
 * Auto-assigns ID + auto-updates lastUpdated timestamp.
 * Ensures requestParams is always an array.
 */
app.post('/apis', (req, res) => {
    const newApi = req.body;

    // Assign a new ID (safe auto-increment)
    newApi.id = apis.length > 0 ? Math.max(...apis.map(a => a.id)) + 1 : 1;

    // Guarantee requestParams is always an array
    newApi.requestParams = Array.isArray(newApi.requestParams)
        ? newApi.requestParams
        : [];

    // AUTO TIMESTAMP
    newApi.lastUpdated = getTimestamp();

    apis.push(newApi);

    saveApis();

    res.json({ message: "API added successfully", api: newApi });
});

/**
 * DELETE /apis/:id
 * Deletes an API object.
 * This powers the Delete API button.
 */
app.delete('/apis/:id', (req, res) => {
    const apiId = parseInt(req.params.id);
    const index = apis.findIndex(a => a.id === apiId);

    if (index === -1) {
        return res.status(404).json({ error: "API not found" });
    }

    apis.splice(index, 1);

    saveApis();

    res.json({ message: "API deleted successfully" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
