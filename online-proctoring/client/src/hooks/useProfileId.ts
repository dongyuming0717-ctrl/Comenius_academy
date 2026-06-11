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
    supabase
      .from('users')
      .select('id')
      .eq('auth_id', user.id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setProfileId(null);
          return;
        }
        setProfileId(data.id);
      })
      .catch(() => setProfileId(null));
  }, [user]);

  return profileId;
}
