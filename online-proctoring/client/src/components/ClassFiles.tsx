import { useEffect, useState, useRef } from 'react';
import { supabase } from '../supabase';

interface ClassFile {
  id: string;
  class_id: string;
  teacher_id: string;
  filename: string;
  original_name: string;
  file_size: number;
  storage_path: string;
  created_at: string;
}

interface Props {
  classId: string;
  isTeacher: boolean;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

const btnStyle: React.CSSProperties = {
  padding: '6px 14px', fontSize: 12, fontWeight: 500, borderRadius: 6,
  cursor: 'pointer', border: '1px solid #d1d5db', background: '#fff',
  color: '#374151', fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
};

export function ClassFiles({ classId, isTeacher }: Props) {
  const [files, setFiles] = useState<ClassFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('class_files').select('*').eq('class_id', classId)
      .order('created_at', { ascending: false });
    if (!error && data) setFiles(data as ClassFile[]);
    setLoading(false);
  };

  useEffect(() => { fetchFiles(); }, [classId]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true); setMsg('');

    const storagePath = `${classId}/${Date.now()}-${file.name}`;

    // 1. Upload to Supabase Storage
    const { error: uploadErr } = await supabase.storage
      .from('class-files').upload(storagePath, file);

    if (uploadErr) {
      setMsg('Upload failed: ' + uploadErr.message);
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    // 2. Insert metadata
    const { error: insertErr } = await supabase.from('class_files').insert({
      class_id: classId,
      filename: file.name,
      original_name: file.name,
      file_size: file.size,
      storage_path: storagePath,
    });

    if (insertErr) {
      setMsg('Metadata save failed: ' + insertErr.message);
    } else {
      setMsg('Uploaded!');
      fetchFiles();
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDownload = async (f: ClassFile) => {
    const { data } = await supabase.storage
      .from('class-files').createSignedUrl(f.storage_path, 120);
    if (data?.signedUrl) {
      window.open(data.signedUrl, '_blank');
    }
  };

  const handleDelete = async (f: ClassFile) => {
    await supabase.storage.from('class-files').remove([f.storage_path]);
    await supabase.from('class_files').delete().eq('id', f.id);
    fetchFiles();
  };

  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#1e293b' }}>Class Files</h3>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94a3b8' }}>
            {isTeacher ? 'Upload and manage class materials' : 'Download materials shared by your teacher'}
          </p>
        </div>
        {isTeacher && (
          <div>
            <input ref={inputRef} type="file" onChange={handleUpload} style={{ display: 'none' }} id="class-file-upload" />
            <label htmlFor="class-file-upload" style={{
              padding: '8px 18px', fontSize: 13, fontWeight: 500,
              color: '#fff', background: '#1e40af', border: 'none',
              borderRadius: 8, cursor: uploading ? 'default' : 'pointer',
              opacity: uploading ? 0.5 : 1, display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}>
              {uploading ? 'Uploading...' : '+ Upload'}
            </label>
          </div>
        )}
      </div>

      {msg && (
        <div style={{ padding: '8px 24px', fontSize: 12, color: msg.includes('fail') ? '#dc2626' : '#16a34a', background: msg.includes('fail') ? '#fef2f2' : '#f0fdf4' }}>
          {msg}
        </div>
      )}

      <div style={{ padding: files.length === 0 ? '24px' : '0' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 24, color: '#94a3b8', fontSize: 13 }}>Loading...</div>
        ) : files.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
            {isTeacher ? 'No files yet. Click Upload to share materials.' : 'No files yet.'}
          </div>
        ) : (
          files.map(f => (
            <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 24px', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: 18 }}>📄</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.original_name}</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>{formatSize(f.file_size)} · {new Date(f.created_at).toLocaleDateString()}</div>
              </div>
              <button onClick={() => handleDownload(f)} style={btnStyle}>Download</button>
              {isTeacher && (
                <button onClick={() => handleDelete(f)} style={{ ...btnStyle, color: '#dc2626', borderColor: '#fca5a5' }}>Delete</button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
