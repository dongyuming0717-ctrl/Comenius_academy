import { useState } from 'react';
import { TopNav } from '../components/TopNav';

export function PastPaperLibraryPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopNav currentPage="past-papers" />
      <div style={{ flex: 1, position: 'relative', background: '#f5f5f5' }}>
        {loading && !error && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#666', fontSize: 14,
          }}>
            Loading Past Paper Library...
          </div>
        )}
        {error && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: '#666', fontSize: 14, gap: 12,
          }}>
            <p>Failed to load Past Paper Library.</p>
            <p style={{ fontSize: 12, color: '#999' }}>
              Make sure the server is running: <code>cd ~/cie-past-paper-library && python3 app.py</code>
            </p>
            <button
              onClick={() => { setError(false); setLoading(true); }}
              style={{
                padding: '6px 16px', border: '1px solid #ccc', borderRadius: 6,
                background: '#fff', cursor: 'pointer', fontSize: 13,
              }}
            >
              Retry
            </button>
          </div>
        )}
        <iframe
          src="/cie-papers/"
          style={{
            width: '100%', height: '100%', border: 'none',
            display: loading && !error ? 'none' : 'block',
          }}
          title="Past Paper Library"
          onLoad={() => setLoading(false)}
          onError={() => { setLoading(false); setError(true); }}
        />
      </div>
    </div>
  );
}
