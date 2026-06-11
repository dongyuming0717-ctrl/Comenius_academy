import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: '100vh', background: '#f8fafc',
          fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
        }}>
          <div style={{ textAlign: 'center', maxWidth: 400 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>😵</div>
            <h1 style={{ fontSize: 20, fontWeight: 600, color: '#1e293b', margin: '0 0 8px' }}>
              Something went wrong
            </h1>
            <p style={{ fontSize: 14, color: '#94a3b8', margin: '0 0 24px' }}>
              Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '10px 32px', fontSize: 14, fontWeight: 600,
                color: '#fff', background: '#1e40af', border: 'none',
                borderRadius: 8, cursor: 'pointer',
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
