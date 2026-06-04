import { useEffect, useRef, useState } from 'react';
import { useProctor } from '../sdk/useProctor';
import type { ViolationType } from '../sdk/types';
import { useLocale } from '../i18n/LocaleContext';

const LABELS: Record<ViolationType, string> = {
  tab_blur: 'violationAlert.label.tabBlur',
  window_blur: 'violationAlert.label.windowBlur',
  fullscreen_exit: 'violationAlert.label.fullscreenExit',
  face_missing: 'violationAlert.label.faceMissing',
  multiple_faces: 'violationAlert.label.multipleFaces',
  copy_attempt: 'violationAlert.label.copyAttempt',
  right_click: 'violationAlert.label.rightClick',
  tab_switch: 'violationAlert.label.tabBlur',
  no_face: 'violationAlert.label.faceMissing',
  scroll_away: 'violationAlert.label.scrollAway',
};

const WARNINGS: Record<string, string> = {
  tab_blur: 'violationAlert.warning.tabBlur',
  tab_switch: 'violationAlert.warning.tabBlur',
  window_blur: 'violationAlert.warning.windowBlur',
  fullscreen_exit: 'violationAlert.warning.fullscreenExit',
  face_missing: 'violationAlert.warning.faceMissing',
  multiple_faces: 'violationAlert.warning.multipleFaces',
  no_face: 'violationAlert.warning.faceMissing',
  copy_attempt: 'violationAlert.warning.copyAttempt',
  right_click: 'violationAlert.warning.rightClick',
  scroll_away: 'violationAlert.warning.scrollAway',
};

export function ViolationAlert() {
  const { violations } = useProctor();
  const { t } = useLocale();
  const prevCount = useRef(0);
  const shownTypes = useRef<Set<string>>(new Set());
  const [alert, setAlert] = useState<{ type: ViolationType; detail: string } | null>(null);

  useEffect(() => {
    if (violations.length > prevCount.current) {
      const latest = violations[violations.length - 1];
      prevCount.current = violations.length;

      // Only show alert if this type hasn't been shown yet
      if (!shownTypes.current.has(latest.type)) {
        shownTypes.current.add(latest.type);
        setAlert({ type: latest.type, detail: latest.detail });
      }
    }
  }, [violations]);

  if (!alert) return null;

  const label = t(LABELS[alert.type] || alert.type);
  const warning = t(WARNINGS[alert.type] || 'violationAlert.fallbackWarning');

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.5)',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        style={{
          background: '#fff', borderRadius: 16, padding: '28px 32px',
          maxWidth: 420, width: '90%', textAlign: 'center',
          boxShadow: 'none',
        }}
      >
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: '#fef2f2', margin: '0 auto 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 28 }}>&#9888;</span>
        </div>

        <h2 style={{ margin: '0 0 4px 0', fontSize: 18, color: '#dc2626' }}>
          {label}
        </h2>

        <p style={{ margin: '0 0 4px 0', fontSize: 14, color: '#4b5563' }}>
          {warning}
        </p>

        {alert.detail && (
          <p style={{ margin: '0 0 12px 0', fontSize: 12, color: '#9ca3af' }}>
            {alert.detail}
          </p>
        )}

        <p style={{
          margin: '0 0 16px 0', fontSize: 13, color: '#dc2626', fontWeight: 600,
        }}>
          Total violations: {violations.length}
        </p>

        <button
          onClick={() => setAlert(null)}
          style={{
            padding: '8px 32px', background: '#1e40af', color: '#fff',
            border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 14, fontWeight: 400,
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          }}
        >
          {t('violationAlert.iUnderstand')}
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
