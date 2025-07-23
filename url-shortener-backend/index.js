import express from 'express';
import fetch from 'node-fetch';
import { nanoid } from 'nanoid';

const app = express();
const PORT = 5000;
const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJyZWRkeW5pdGhpbnJlZGR5LjIyQGlmaGVpbmRpYS5vcmciLCJleHAiOjE3NTMyNTI5MDIsImlhdCI6MTc1MzI1MjAwMiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjEwYzgyZjM3LWRmNjMtNDA2NS1iMTI2LTdmM2MwOGJkZDlhYSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InJlZGR5IG5pdGhpbiByZWRkeSIsInN1YiI6ImNiZmUwMmNjLWNkNTctNDM0My05NmZhLTg4ZDE3NDQ0ZDM3MCJ9LCJlbWFpbCI6InJlZGR5bml0aGlucmVkZHkuMjJAaWZoZWluZGlhLm9yZyIsIm5hbWUiOiJyZWRkeSBuaXRoaW4gcmVkZHkiLCJyb2xsTm8iOiIyMnN0dWNoaDAxMDMwNyIsImFjY2Vzc0NvZGUiOiJiQ3VDRlQiLCJjbGllbnRJRCI6ImNiZmUwMmNjLWNkNTctNDM0My05NmZhLTg4ZDE3NDQ0ZDM3MCIsImNsaWVudFNlY3JldCI6ImhadlpqYmdZS2dERHNVbnoifQ.DJdx-G2FSLkWnzKl497Smo_i3TTEWLyHtIxQUCNJztk";

app.use(express.json());

// In-memory store for short URLs
const urlMap = new Map();

// Logging middleware
async function logToExternalService(log) {
  try {
    await fetch('http://20.244.56.144/evaluation-service/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BEARER_TOKEN}`
      },
      body: JSON.stringify(log)
    });
  } catch (err) {
    console.error('Failed to log:', err);
  }
}

// POST /shorturls
app.post('/shorturls', async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;
  let code = shortcode || nanoid(6);
  let expiry = new Date(Date.now() + validity * 60000).toISOString();

  // Ensure unique shortcode
  if (urlMap.has(code)) {
    if (!shortcode) code = nanoid(7);
    else {
      await logToExternalService({ stack: 'backend', level: 'error', package: 'api', message: 'Shortcode already exists' });
      return res.status(400).json({ error: 'Shortcode already exists' });
    }
  }

  urlMap.set(code, { url, expiry });
  const shortLink = `http://localhost:${PORT}/${code}`;

  await logToExternalService({ stack: 'backend', level: 'info', package: 'api', message: `Short URL created: ${shortLink}` });

  res.status(201).json({ shortLink, expiry });
});

// Redirect endpoint
app.get('/:code', (req, res) => {
  const { code } = req.params;
  const entry = urlMap.get(code);
  if (!entry) return res.status(404).json({ error: 'Shortcode not found' });
  if (new Date() > new Date(entry.expiry)) return res.status(410).json({ error: 'Shortcode expired' });
  res.redirect(entry.url);
});

app.listen(PORT, () => {
  console.log(`URL Shortener backend running on http://localhost:${PORT}`);
});
