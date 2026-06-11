import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const MOCK_AUTH = !supabaseUrl || supabaseUrl.includes('example');

// ---------------------------------------------------------------------------
// Mock Supabase client — every query resolves instantly with empty data so
// React components never hang on `await` when there is no real backend.
// ---------------------------------------------------------------------------
function mockPromise<T = any>(data: T = null as T): Promise<{ data: T; error: null }> {
  return Promise.resolve({ data, error: null });
}

function mockBuilder() {
  const builder: Record<string, any> = {
    then: (resolve: any) => resolve({ data: null, error: null }),
  };
  // Methods that return the builder itself (chaining)
  const chainable = [
    'select', 'insert', 'update', 'delete', 'upsert',
    'eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'like', 'ilike', 'is', 'in',
    'order', 'limit', 'range', 'match', 'or', 'not', 'filter', 'textSearch',
    'set', 'over',
  ];
  for (const m of chainable) builder[m] = () => builder;
  // Terminal methods that return a Promise
  builder.single = () => mockPromise(null);
  builder.maybeSingle = () => mockPromise(null);
  builder.select = (cols?: string) => builder; // select returns builder for chaining
  return builder as any;
}

const mockSupabase = {
  from: () => mockBuilder(),
  rpc: () => mockBuilder(),
  channel: () => ({
    on: () => ({ subscribe: () => {} }),
    subscribe: () => {},
    unsubscribe: () => {},
  }),
  auth: {
    getSession: () => mockPromise({ session: null }),
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe: () => {} } },
    }),
    signOut: () => mockPromise(),
    signInWithPassword: () => mockPromise({} as any),
    signUp: () => mockPromise({} as any),
    resetPasswordForEmail: () => mockPromise(),
    updateUser: () => mockPromise({} as any),
  },
  storage: {
    from: () => ({
      upload: () => mockPromise({} as any),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
      download: () => mockPromise(new Blob()),
      list: () => mockPromise([]),
      remove: () => mockPromise([]),
    }),
  },
  functions: {
    invoke: () => mockPromise({} as any),
  },
};

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------
export const supabase = MOCK_AUTH
  ? (mockSupabase as unknown as ReturnType<typeof createClient>)
  : createClient(supabaseUrl, supabaseAnonKey, {
      realtime: { params: { eventsPerSecond: 10 } },
    });
