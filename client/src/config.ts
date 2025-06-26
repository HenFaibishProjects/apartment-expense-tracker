export const isLocal = window.location.hostname === 'localhost';
export const apiBase = isLocal
  ? 'http://localhost:3000'
  : 'https://apartment-expense-tracker.onrender.com';
