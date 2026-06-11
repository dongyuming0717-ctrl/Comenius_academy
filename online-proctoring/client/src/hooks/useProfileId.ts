import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useProctor } from '../sdk/useProctor';

/**
 * Resolves the internal users table ID from the Supabase auth user.
 * Eliminates the duplicated auth_id -> profile_id lookup pattern
 * found in 10+ pages across the codebase.
 */
export function useProfileId(): string | null {
  const { user } = useProctor();
  const [profileId, setProfileId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setProfileId(null);
      return;
    }
    let cancelled = false;
    async function resolve() {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('id')
          .eq('auth_id', user!.id)
          .single();
        if (cancelled) return;
        if (error || !data) {
          setProfileId(null);
        } else {
          setProfileId(data.id);
        }
      } catch {
        if (!cancelled) setProfileId(null);
      }
    }
    resolve();
    return () => { cancelled = true; };
  }, [user]);

  return profileId;
}
