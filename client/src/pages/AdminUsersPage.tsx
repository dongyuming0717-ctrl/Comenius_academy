import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNav } from '../components/TopNav';

import { supabase } from '../supabase';
import { useLocale } from '../i18n/LocaleContext';
import { colors, typography, radii } from '../theme/tokens';

interface UserRow {
  id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
  session_count: number;
}

interface SessionRecord {
  id: string;
  paper_id: string;
  status: string;
  score: number | null;
  started_at: string;
  ended_at: string | null;
  papers: { title: string }[] | null;
}

const roleBadgeStyle: Record<string, React.CSSProperties> = {
  student: {
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600,
    background: '#dbeafe',
    color: '#1d4ed8',
  },
  teacher: {
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600,
    background: '#dcfce7',
    color: '#15803d',
  },
  admin: {
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600,
    background: '#fee2e2',
    color: '#dc2626',
  },
};

export function AdminUsersPage() {
  const { t } = useLocale();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const [userSessions, setUserSessions] = useState<Record<string, SessionRecord[]>>({});
  const [loadingSessions, setLoadingSessions] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');

    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('id, full_name, email, role, created_at')
      .order('created_at', { ascending: false });

    if (usersError) {
      setError(usersError.message);
      setLoading(false);
      return;
    }

    const { data: sessionsData, error: sessionsError } = await supabase
      .from('exam_sessions')
      .select('user_id');

    if (sessionsError) {
      setError(sessionsError.message);
      setLoading(false);
      return;
    }

    const sessionCounts: Record<string, number> = {};
    (sessionsData || []).forEach((s: { user_id: string }) => {
      sessionCounts[s.user_id] = (sessionCounts[s.user_id] || 0) + 1;
    });

    const rows: UserRow[] = (usersData || []).map((u: any) => ({
      id: u.id,
      full_name: u.full_name || '',
      email: u.email || '',
      role: u.role || 'student',
      created_at: u.created_at || '',
      session_count: sessionCounts[u.id] || 0,
    }));

    setUsers(rows);
    setLoading(false);
  };

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter(
      (u) => u.full_name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
    );
  }, [users, search]);

  const toggleUser = async (userId: string) => {
    if (expandedUserId === userId) {
      setExpandedUserId(null);
      return;
    }
    setExpandedUserId(userId);

    if (!userSessions[userId]) {
      setLoadingSessions(true);
      const { data, error: sessErr } = await supabase
        .from('exam_sessions')
        .select('id, paper_id, status, score, started_at, ended_at, papers(title)')
        .eq('user_id', userId)
        .order('started_at', { ascending: false })
        .limit(20);

      if (!sessErr && data) {
        setUserSessions((prev) => ({ ...prev, [userId]: data as unknown as SessionRecord[] }));
      }
      setLoadingSessions(false);
    }
  };

  const formatDate = (d?: string | null) => {
    if (!d) return '-';
    return new Date(d).toLocaleString();
  };

  const pageStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: '#f8fafc',
    fontFamily: typography.fontFamily,
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '32px 24px',
  };

  const headerRow: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 12,
  };

  const searchInputStyle: React.CSSProperties = {
    padding: '8px 14px',
    borderRadius: radii.lg,
    border: `1px solid ${colors.border}`,
    fontSize: 14,
    width: 280,
    outline: 'none',
    fontFamily: typography.fontFamily,
  };

  const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '10px 14px',
    fontSize: 12,
    fontWeight: 600,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: `2px solid ${colors.border}`,
    fontFamily: typography.fontFamily,
  };

  const tdStyle: React.CSSProperties = {
    padding: '12px 14px',
    fontSize: 14,
    borderBottom: `1px solid ${colors.border}`,
    verticalAlign: 'middle',
    fontFamily: typography.fontFamily,
  };

  return (
    <div style={pageStyle}>
      <TopNav currentPage="users" />
      <div style={containerStyle}>
        <div style={headerRow}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, fontFamily: typography.fontFamily }}>
              {t('adminUsers.title')}
            </h1>
            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 14, fontFamily: typography.fontFamily }}>
              {t('adminUsers.totalUsers').replace('{count}', String(users.length))}
            </p>
          </div>
          <input
            type="text"
            placeholder={t('adminUsers.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={searchInputStyle}
          />
        </div>

        {error && (
          <div style={{
            padding: '12px 16px',
            borderRadius: radii.lg,
            background: '#fef2f2',
            color: '#dc2626',
            marginBottom: 16,
            fontSize: 14,
            fontFamily: typography.fontFamily,
          }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: 64, color: '#94a3b8', fontFamily: typography.fontFamily }}>
            {t('adminUsers.loading')}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: 64,
            background: '#fff', borderRadius: radii.xl,
            border: `1px solid ${colors.border}`,
            fontFamily: typography.fontFamily,
          }}>
            <p style={{ fontSize: 16, fontWeight: 600, margin: '0 0 4px' }}>{t('adminUsers.noUsersFound')}</p>
            <p style={{ fontSize: 14, color: '#94a3b8', margin: 0 }}>
              {search ? t('adminUsers.tryDifferentSearch') : t('adminUsers.noRegisteredUsers')}
            </p>
          </div>
        ) : (
          <div style={{
            background: '#fff',
            borderRadius: radii.xl,
            border: `1px solid ${colors.border}`,
            overflow: 'hidden',
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>{t('adminUsers.name')}</th>
                  <th style={thStyle}>{t('adminUsers.email')}</th>
                  <th style={thStyle}>{t('adminUsers.role')}</th>
                  <th style={thStyle}>{t('adminUsers.sessions')}</th>
                  <th style={thStyle}>{t('adminUsers.registered')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <>
                    <tr
                      key={u.id}
                      onClick={() => toggleUser(u.id)}
                      style={{
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                        background: expandedUserId === u.id ? '#f1f5f9' : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (expandedUserId !== u.id)
                          (e.currentTarget as HTMLElement).style.background = '#f8fafc';
                      }}
                      onMouseLeave={(e) => {
                        if (expandedUserId !== u.id)
                          (e.currentTarget as HTMLElement).style.background = 'transparent';
                      }}
                    >
                      <td style={{ ...tdStyle, fontWeight: 600 }}>{u.full_name || '-'}</td>
                      <td style={{ ...tdStyle, color: '#64748b' }}>{u.email || '-'}</td>
                      <td style={tdStyle}>
                        <span style={roleBadgeStyle[u.role] || roleBadgeStyle.student}>
                          {u.role === 'admin' ? t('adminUsers.roleAdmin') : u.role === 'teacher' ? t('adminUsers.roleTeacher') : t('adminUsers.roleStudent')}
                        </span>
                      </td>
                      <td style={tdStyle}>{u.session_count}</td>
                      <td style={{ ...tdStyle, color: '#94a3b8', fontSize: 13 }}>
                        {u.created_at ? new Date(u.created_at).toLocaleDateString() : '-'}
                      </td>
                    </tr>
                    {expandedUserId === u.id && (
                      <tr key={`${u.id}-sessions`}>
                        <td colSpan={5} style={{ padding: '0 14px 14px', background: '#f8fafc' }}>
                          <div style={{
                            borderTop: `1px solid ${colors.border}`,
                            paddingTop: 12,
                            marginTop: 4,
                          }}>
                            <p style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: '#475569',
                              margin: '0 0 8px',
                              fontFamily: typography.fontFamily,
                            }}>
                              {t('adminUsers.examHistory')}
                            </p>
                            {loadingSessions ? (
                              <span style={{ fontSize: 13, color: '#94a3b8' }}>{t('adminUsers.loadingSessions')}</span>
                            ) : !userSessions[u.id] || userSessions[u.id].length === 0 ? (
                              <span style={{ fontSize: 13, color: '#94a3b8' }}>{t('adminUsers.noExamSessions')}</span>
                            ) : (
                              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                                <thead>
                                  <tr>
                                    <th style={{ textAlign: 'left', padding: '6px 8px', color: '#64748b', fontWeight: 600, borderBottom: `1px solid ${colors.border}` }}>{t('adminUsers.paper')}</th>
                                    <th style={{ textAlign: 'left', padding: '6px 8px', color: '#64748b', fontWeight: 600, borderBottom: `1px solid ${colors.border}` }}>{t('adminUsers.status')}</th>
                                    <th style={{ textAlign: 'left', padding: '6px 8px', color: '#64748b', fontWeight: 600, borderBottom: `1px solid ${colors.border}` }}>{t('adminUsers.score')}</th>
                                    <th style={{ textAlign: 'left', padding: '6px 8px', color: '#64748b', fontWeight: 600, borderBottom: `1px solid ${colors.border}` }}>{t('adminUsers.started')}</th>
                                    <th style={{ textAlign: 'left', padding: '6px 8px', color: '#64748b', fontWeight: 600, borderBottom: `1px solid ${colors.border}` }} />
                                  </tr>
                                </thead>
                                <tbody>
                                  {(userSessions[u.id] || []).map((s) => (
                                    <tr key={s.id} style={{ borderBottom: `1px solid #f1f5f9` }}>
                                      <td style={{ padding: '6px 8px' }}>{s.papers?.[0]?.title || '-'}</td>
                                      <td style={{ padding: '6px 8px' }}>
                                        <span style={{
                                          display: 'inline-block',
                                          padding: '1px 8px',
                                          borderRadius: 10,
                                          fontSize: 11,
                                          fontWeight: 600,
                                          background: s.status === 'completed' ? '#dcfce7' : s.status === 'active' ? '#fef3c7' : '#fee2e2',
                                          color: s.status === 'completed' ? '#15803d' : s.status === 'active' ? '#92400e' : '#dc2626',
                                        }}>
                                          {s.status === 'completed' ? t('adminUsers.statusCompleted') : s.status === 'active' ? t('adminUsers.statusActive') : t('adminUsers.statusTerminated')}
                                        </span>
                                      </td>
                                      <td style={{ padding: '6px 8px', fontWeight: 600 }}>
                                        {s.score != null ? s.score : '-'}
                                      </td>
                                      <td style={{ padding: '6px 8px', color: '#94a3b8', fontSize: 12 }}>
                                        {formatDate(s.started_at)}
                                      </td>
                                      <td style={{ padding: '6px 8px', textAlign: 'right' }}>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/admin/student/${s.id}`);
                                          }}
                                          style={{
                                            padding: '4px 10px',
                                            borderRadius: radii.md,
                                            border: `1px solid ${colors.border}`,
                                            background: '#fff',
                                            cursor: 'pointer',
                                            fontSize: 12,
                                            fontWeight: 500,
                                            fontFamily: typography.fontFamily,
                                          }}
                                        >
                                          {t('adminUsers.view')}
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
