import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN || process.env.SENTRY_DSN || '',
  release: process.env.REACT_APP_SENTRY_RELEASE || process.env.SENTRY_RELEASE || undefined,
});

function App() {
  const throwException = () => {
    // unhandled exception
    throw new Error('Unhandled exception from frontend');
  };

  const rejectPromise = () => {
    // unhandled rejection
    Promise.reject(new Error('Unhandled rejection from frontend'));
  };

  const handledError = () => {
    try {
      throw new Error('Handled error from frontend');
    } catch (err) {
      Sentry.captureException(err);
      alert('Handled error captured');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Release Health Monitor</h1>
      <button onClick={throwException}>Throw Exception</button>
      <button onClick={rejectPromise} style={{ marginLeft: 10 }}>Reject Promise</button>
      <button onClick={handledError} style={{ marginLeft: 10 }}>Handled Error</button>
    </div>
  );
}

const container = document.getElementById('root');
createRoot(container).render(<App />);
