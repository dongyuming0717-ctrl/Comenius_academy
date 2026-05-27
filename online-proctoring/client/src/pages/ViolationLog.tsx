import { useMemo } from 'react';
import { useProctor } from '../sdk/useProctor';
import type { ViolationType } from '../sdk/types';
import { useLocale } from '../i18n/LocaleContext';

const LABELS: Record<ViolationType, string> = {
  tab_blur: 'violationLog.label.tabBlur',
  window_blur: 'violationLog.label.windowBlur',
  fullscreen_exit: 'violationLog.label.fullscreenExit',
  face_missing: 'violationLog.label.faceMissing',
  multiple_faces: 'violationLog.label.multipleFaces',
  copy_attempt: 'violationLog.label.copyAttempt',
  right_click: 'violationLog.label.rightClick',
  tab_switch: 'violationLog.label.tabBlur',
  no_face: 'violationLog.label.faceMissing',
  scroll_away: 'violationLog.label.scrollAway',
};

export function ViolationLog() {
  const { violations } = useProctor();
  const { t } = useLocale();

  const grouped = useMemo(() => {
    const map = new Map<ViolationType, number>();
    violations.forEach((v) => {
      map.set(v.type, (map.get(v.type) || 0) + 1);
    });
    return Array.from(map.entries());
  }, [violations]);

  if (violations.length === 0) {
    return (
      <div style={{
        padding: 14, borderRadius: 8,
        background: '#fff',
        border: '1px solid #e0e0e0',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, color: '#888', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1 }}>
          {t('violationLog.noViolations')}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      padding: 14, borderRadius: 8,
      background: '#fef2f2',
      border: '1px solid #fecaca',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 8,
      }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#dc2626', textTransform: 'uppercase', letterSpacing: 1 }}>
          {t('violationLog.violationsHeading')}
        </span>
        <span style={{
          fontSize: 12, fontWeight: 700, color: '#dc2626',
          background: '#fee2e2', borderRadius: 6,
          padding: '2px 8px',
        }}>
          {violations.length}
        </span>
      </div>
      <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11 }}>
        {grouped.map(([type, count]) => (
          <li key={type} style={{ marginBottom: 5, color: '#888' }}>
            <span style={{ fontWeight: 600, color: '#dc2626' }}>
              {t(LABELS[type] || type)}
            </span>
            <span style={{ color: '#aaa' }}> &times; {count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
