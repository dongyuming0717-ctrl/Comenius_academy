import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function AdminPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/teacher', { replace: true });
  }, [navigate]);

  return null;
}
