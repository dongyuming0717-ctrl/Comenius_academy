import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useProctor } from '../sdk/useProctor';
import { supabase, MOCK_AUTH } from '../supabase';

interface Props {
  children: React.ReactNode;
  /** If provided, only users with one of these roles can access. Fetches role from users table. */
  allowedRoles?: string[];
}

let cachedRole: string | null = null;
let cachedRoleUserId: string | null = null;

const MOCK_ROLE = 'student';

/** Wraps routes that require authentication (and optionally, a specific role). */
export function ProtectedRoute({ children, allowedRoles }: Props) {
  const { user, authLoading } = useProctor();
  const [role, setRole] = useState<string | null>(
    cachedRoleUserId === user?.id ? cachedRole : null,
  );
  const [checking, setChecking] = useState(allowedRoles && !role && !MOCK_AUTH);

  useEffect(() => {
    if (!user || !allowedRoles) return;
    if (MOCK_AUTH) {
      setRole(MOCK_ROLE);
      setChecking(false);
      return;
    }
    if (cachedRoleUserId === user.id && cachedRole) {
      setRole(cachedRole);
      setChecking(false);
      return;
    }
    setChecking(true);
    supabase
      .from('users')
      .select('role')
      .eq('auth_id', user.id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) { setChecking(false); return; }
        cachedRole = data.role;
        cachedRoleUserId = user.id;
        setRole(data.role);
        setChecking(false);
      });
  }, [user, allowedRoles]);

  if (authLoading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: '#9ca3af', fontSize: 14,
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (checking) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: '#9ca3af', fontSize: 14,
      }}>
        Loading...
      </div>
    );
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
