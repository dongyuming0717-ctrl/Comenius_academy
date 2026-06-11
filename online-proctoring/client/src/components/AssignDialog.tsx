import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

interface ClassInfo {
  id: string;
  title: string;
  name: string;
  code: string;
}

interface AssignDialogProps {
  paperId: string;
  paperTitle: string;
  userId: string; // auth.uid()
  paper?: Record<string, any>; // optional full paper to save to Supabase
  onClose: () => void;
  onAssigned: (classIds: string[]) => void;
}

export function AssignDialog({ paperId, paperTitle, userId, paper, onClose, onAssigned }: AssignDialogProps) {
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchClasses() {
      setLoading(true);
      // Get user's profile id
      const { data: profile } = await supabase
        .from('users').select('id, role').eq('auth_id', userId).single();

      if (!profile) { setLoading(false); return; }

      const isAdmin = profile.role === 'admin';

      // Admin sees all classes, teacher sees own
      let query = supabase.from('classes').select('id, title, name, code');
      if (!isAdmin) {
        query = query.eq('teacher_id', profile.id);
      }
      const { data } = await query.order('title');
      if (data) setClasses(data as ClassInfo[]);
      setLoading(false);
    }
    fetchClasses();
  }, [userId]);

  const toggleClass = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleAssign = async () => {
    if (selectedIds.size === 0) return;
    setAssigning(true);
    setError('');
    try {
      const inserts = Array.from(selectedIds).map(classId => ({
        class_id: classId,
        paper_id: paperId,
      }));
      // First save paper to Supabase (with full data if available)
      const paperData = paper || {};
      await supabase.from('papers').upsert({
        id: paperId,
        title: paperTitle,
        is_generated: true,
        created_at: new Date().toISOString(),
        ...paperData,
      }, { onConflict: 'id' });
      // Then assign
      const { error: err } = await supabase.from('class_papers').upsert(inserts, { onConflict: 'class_id,paper_id' });
      if (err) throw err;
      onAssigned(Array.from(selectedIds));
    } catch (e: any) {
      setError(e.message || 'Failed to assign');
    }
    setAssigning(false);
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000,
  };

  const dialogStyle: React.CSSProperties = {
    background: '#fff', borderRadius: 12, padding: '24px 28px',
    width: 440, maxHeight: '70vh', overflow: 'auto',
    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={dialogStyle} onClick={e => e.stopPropagation()}>
        <h2 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 600 }}>Assign "{paperTitle}"</h2>
        <p style={{ margin: '0 0 16px', fontSize: 13, color: '#6b7280' }}>Select classes to assign this paper</p>

        {loading ? (
          <p style={{ fontSize: 13, color: '#9ca3af' }}>Loading your classes...</p>
        ) : classes.length === 0 ? (
          <p style={{ fontSize: 13, color: '#9ca3af' }}>No classes found. Create one first.</p>
        ) : (
          <div style={{ marginBottom: 16, maxHeight: 240, overflow: 'auto' }}>
            {classes.map(c => (
              <label key={c.id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', cursor: 'pointer',
                borderRadius: 6, marginBottom: 4,
                background: selectedIds.has(c.id) ? '#eff6ff' : '#f9fafb',
                border: selectedIds.has(c.id) ? '1px solid #3b82f6' : '1px solid transparent',
              }}>
                <input type="checkbox" checked={selectedIds.has(c.id)}
                  onChange={() => toggleClass(c.id)}
                  style={{ width: 16, height: 16, cursor: 'pointer' }} />
                <span style={{ fontSize: 13, fontWeight: 500 }}>{c.title || c.name}</span>
                <span style={{ fontSize: 11, color: '#9ca3af', marginLeft: 'auto' }}>{c.code}</span>
              </label>
            ))}
          </div>
        )}

        {error && (
          <div style={{ padding: '8px 12px', background: '#fef2f2', borderRadius: 6, color: '#dc2626', fontSize: 12, marginBottom: 12 }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{
            padding: '8px 20px', borderRadius: 6, border: '1px solid #d1d5db',
            background: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 500,
          }}>Skip</button>
          <button onClick={handleAssign} disabled={selectedIds.size === 0 || assigning}
            style={{
              padding: '8px 20px', borderRadius: 6, border: 'none',
              background: selectedIds.size === 0 ? '#d1d5db' : '#1e40af',
              color: '#fff', cursor: selectedIds.size === 0 ? 'default' : 'pointer',
              fontSize: 13, fontWeight: 600,
            }}>
            {assigning ? 'Assigning...' : `Assign to ${selectedIds.size} class${selectedIds.size > 1 ? 'es' : ''}`}
          </button>
        </div>
      </div>
    </div>
  );
}
