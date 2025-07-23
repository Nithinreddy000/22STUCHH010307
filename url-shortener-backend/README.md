# URL Shortener Backend

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Start the server:
   ```
   npm start
   ```

## Endpoints

### POST /shorturls
- Body: `{ "url": "<long_url>", "validity": 30, "shortcode": "abcd1" }`
- Returns: `{ "shortLink": "http://localhost:5000/abcd1", "expiry": "<ISO8601>" }`

### GET /:code
- Redirects to the original URL if valid and not expired.

## Logging
All API calls are logged to the external logging service as required.
