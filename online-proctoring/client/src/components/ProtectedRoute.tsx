import { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useProctor } from '../sdk/useProctor';
import { supabase } from '../supabase';

interface Props {
  children: React.ReactNode;
  /** If provided, only users with one of these roles can access. Fetches role from users table. */
  allowedRoles?: string[];
}

/** Wraps routes that require authentication (and optionally, a specific role). */
export function ProtectedRoute({ children, allowedRoles }: Props) {
  const { user, authLoading } = useProctor();
  const [role, setRole] = useState<string | null>(null);
  const [checking, setChecking] = useState(!!allowedRoles);

  // Cache role lookup within component lifecycle (avoids module-level mutable state)
  const roleCacheRef = useRef<{ role: string; userId: string } | null>(null);

  useEffect(() => {
    if (!user || !allowedRoles) return;
    if (roleCacheRef.current?.userId === user.id) {
      setRole(roleCacheRef.current.role);
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
        roleCacheRef.current = { role: data.role, userId: user.id };
        setRole(data.role);
        setChecking(false);
      });
  }, [user, allowedRoles]);

  if (authLoading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Geist', system-ui, -apple-system, sans-serif", color: '#9ca3af', fontSize: 14,
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
        fontFamily: "'Geist', system-ui, -apple-system, sans-serif", color: '#9ca3af', fontSize: 14,
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
