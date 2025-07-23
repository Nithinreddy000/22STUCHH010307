import React from 'react';

const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJyZWRkeW5pdGhpbnJlZGR5LjIyQGlmaGVpbmRpYS5vcmciLCJleHAiOjE3NTMyNTI5MDIsImlhdCI6MTc1MzI1MjAwMiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjEwYzgyZjM3LWRmNjMtNDA2NS1iMTI2LTdmM2MwOGJkZDlhYSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InJlZGR5IG5pdGhpbiByZWRkeSIsInN1YiI6ImNiZmUwMmNjLWNkNTctNDM0My05NmZhLTg4ZDE3NDQ0ZDM3MCJ9LCJlbWFpbCI6InJlZGR5bml0aGlucmVkZHkuMjJAaWZoZWluZGlhLm9yZyIsIm5hbWUiOiJyZWRkeSBuaXRoaW4gcmVkZHkiLCJyb2xsTm8iOiIyMnN0dWNoaDAxMDMwNyIsImFjY2Vzc0NvZGUiOiJiQ3VDRlQiLCJjbGllbnRJRCI6ImNiZmUwMmNjLWNkNTctNDM0My05NmZhLTg4ZDE3NDQ0ZDM3MCIsImNsaWVudFNlY3JldCI6ImhadlpqYmdZS2dERHNVbnoifQ.DJdx-G2FSLkWnzKl497Smo_i3TTEWLyHtIxQUCNJztk";

export async function sendLog(log) {
    try {
        const response = await fetch('/evaluation-service/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${BEARER_TOKEN}`
            },
            body: JSON.stringify(log)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to send log:', error);
        return null;
    }
}

function Logger({ logs }) {
    return (
        <div>
            <h2>Logger</h2>
            <ul>
                {logs && logs.length > 0 ? (
                    logs.map((log, idx) => <li key={idx}>{log}</li>)
                ) : (
                    <li>No logs available.</li>
                )}
            </ul>
        </div>
    );
}

export default Logger;