import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocale } from '../i18n/LocaleContext';

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

export function PreExamCheck({ onComplete, onBack }: Props) {
  const { t } = useLocale();
  const [cameraOk, setCameraOk] = useState(false);
  const [micOk, setMicOk] = useState(false);
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [micError, setMicError] = useState('');
  const micStreamRef = useRef<MediaStream | null>(null);
  const micMeterRef = useRef<HTMLDivElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Cleanup all streams
  const cleanup = useCallback(() => {
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
  }, []);

  // Camera check — only verify permission, release stream immediately.
  // The actual camera preview is shown by WebcamCapture during the exam.
  const requestCamera = useCallback(() => {
    setCameraError('');
    navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480, facingMode: 'user' },
      audio: false,
    }).then((stream) => {
      stream.getTracks().forEach((t) => t.stop());
      setCameraOk(true);
    }).catch((err: any) => {
      const name = err?.name || '';
      if (name === 'NotAllowedError') {
        setCameraError(t('preExam.cameraPermissionDenied'));
      } else if (name === 'NotFoundError') {
        setCameraError(t('preExam.cameraNotFound'));
      } else if (name === 'NotReadableError') {
        setCameraError(t('preExam.cameraInUse'));
      } else {
        setCameraError(t('preExam.cameraGenericError').replace('{message}', err?.message || 'Unknown error'));
      }
    });
  }, []);

  // Mic check with volume meter
  const requestMic = useCallback(() => {
    setMicError('');
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    }).then((stream) => {
      micStreamRef.current = stream;

      // Set up audio level meter
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const meter = micMeterRef.current;
      if (meter) {
        const animate = () => {
          analyser.getByteFrequencyData(dataArray);
          const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          const pct = Math.min(avg / 128, 1);
          meter.style.width = `${pct * 100}%`;
          if (pct > 0.01) {
            meter.style.background = '#16a34a';
            setMicOk(true);
          }
          if (micStreamRef.current) requestAnimationFrame(animate);
        };
        animate();
      }
    }).catch((err: any) => {
      const name = err?.name || '';
      if (name === 'NotAllowedError') {
        setMicError(t('preExam.micPermissionDenied'));
      } else if (name === 'NotFoundError') {
        setMicError(t('preExam.micNotFound'));
      } else {
        setMicError(t('preExam.micGenericError').replace('{message}', err?.message || 'Unknown error'));
      }
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const allOk = cameraOk && micOk && rulesAccepted;

  return (
    <div style={{
      minHeight: '100vh', fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
      background: '#ffffff', padding: 20,
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>

        {/* Blue Top Bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 20px', height: 48, marginBottom: 24, borderRadius: 4,
          background: '#1e40af',
        }}>
          <span style={{
            fontSize: 18, fontWeight: 400, color: '#ffffff',
            fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
            letterSpacing: '0.3px',
          }}>
            Test of Mathematics for University Admission
          </span>
        </div>

        <button
          onClick={() => { cleanup(); onBack(); }}
          style={{
            padding: '8px 0', background: 'none', border: 'none',
            color: '#888', cursor: 'pointer', fontSize: 13,
            display: 'flex', alignItems: 'center', gap: 4, marginBottom: 12,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          {t('preExam.backToPaperSelection')}
        </button>

        <h1 style={{ textAlign: 'center', marginBottom: 4, color: '#333', fontSize: 22, fontWeight: 400, fontFamily: "'Geist', system-ui, -apple-system, sans-serif" }}>
          {t('preExam.heading')}
        </h1>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: 32, fontSize: 14 }}>
          {t('preExam.subtitle')}
        </p>

        {/* ── Camera Check ── */}
        <div style={{
          background: '#fafafa',
          border: `2px solid ${cameraOk ? '#d1fae5' : '#e0e0e0'}`,
          borderRadius: 8, padding: 22, marginBottom: 14,
          transition: 'all 0.3s ease',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontSize: 15, color: cameraOk ? '#16a34a' : '#333', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 400, fontFamily: "'Geist', system-ui, -apple-system, sans-serif" }}>
              {cameraOk ? (
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#16a34a' }}>✓</span>
              ) : (
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#888' }}>1</span>
              )}
              {t('preExam.cameraCheck')}
            </h3>
            <button
              onClick={requestCamera}
              disabled={cameraOk}
              style={{
                padding: '8px 20px', background: '#1e40af', color: '#fff',
                border: 'none', borderRadius: 4, cursor: cameraOk ? 'default' : 'pointer', fontSize: 13,
                fontWeight: 400, fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
                opacity: cameraOk ? 0 : 1,
                pointerEvents: cameraOk ? 'none' : 'auto',
                transition: 'opacity 0.2s',
              }}
            >
              {t('preExam.allowCamera')}
            </button>
          </div>
          <div style={{
            width: '100%', padding: '40px 0', borderRadius: 8,
            background: cameraOk ? '#f0fdf4' : '#f0f0f0',
            border: `1px solid ${cameraOk ? '#bbf7d0' : '#e0e0e0'}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 8, transition: 'all 0.3s ease',
          }}>
            {cameraOk ? (
              <>
                <span style={{ fontSize: 32 }}>&#10003;</span>
                <span style={{ color: '#16a34a', fontSize: 14 }}>{t('preExam.cameraGranted')}</span>
              </>
            ) : (
              <>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5">
                  <path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                </svg>
                <span style={{ color: '#aaa', fontSize: 13 }}>
                  {cameraError || t('preExam.cameraHint')}
                </span>
              </>
            )}
          </div>
          {cameraError && (
            <p style={{ color: '#dc2626', fontSize: 12, margin: '10px 0 0 0' }}>{cameraError}</p>
          )}
        </div>

        {/* ── Mic Check ── */}
        <div style={{
          background: '#fafafa',
          border: `2px solid ${micOk ? '#d1fae5' : '#e0e0e0'}`,
          borderRadius: 8, padding: 22, marginBottom: 14,
          transition: 'all 0.3s ease',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontSize: 15, color: micOk ? '#16a34a' : '#333', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 400, fontFamily: "'Geist', system-ui, -apple-system, sans-serif" }}>
              {micOk ? (
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#16a34a' }}>✓</span>
              ) : (
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#888' }}>2</span>
              )}
              {t('preExam.microphoneCheck')}
            </h3>
            <button
              onClick={requestMic}
              disabled={micOk}
              style={{
                padding: '8px 20px', background: '#1e40af', color: '#fff',
                border: 'none', borderRadius: 4, cursor: micOk ? 'default' : 'pointer', fontSize: 13,
                fontWeight: 400, fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
                opacity: micOk ? 0 : 1,
                pointerEvents: micOk ? 'none' : 'auto',
                transition: 'opacity 0.2s',
              }}
            >
              {t('preExam.allowMic')}
            </button>
          </div>
          <div style={{
            height: 52, borderRadius: 8, background: '#f0f0f0',
            display: 'flex', alignItems: 'center', padding: '0 16px',
            border: '1px solid #e0e0e0',
          }}>
            <div style={{ flex: 1, height: 8, borderRadius: 4, background: '#e0e0e0', overflow: 'hidden' }}>
              <div ref={micMeterRef} style={{
                height: '100%', borderRadius: 4, width: '0%',
                background: '#1e40af', transition: 'width 0.1s',
              }} />
            </div>
            <span style={{ marginLeft: 14, fontSize: 12, color: micOk ? '#16a34a' : '#aaa', minWidth: 70, textAlign: 'right', fontWeight: 500 }}>
              {micOk ? t('preExam.micDetected') : t('preExam.micWaiting')}
            </span>
          </div>
          {micError && (
            <p style={{ color: '#dc2626', fontSize: 12, margin: '10px 0 0 0' }}>{micError}</p>
          )}
        </div>

        {/* ── Rules ── */}
        <div style={{
          background: '#fafafa',
          border: `2px solid ${rulesAccepted ? '#d1fae5' : '#e0e0e0'}`,
          borderRadius: 8, padding: 22, marginBottom: 28,
          transition: 'all 0.3s ease',
        }}>
          <h3 style={{ margin: '0 0 14px 0', fontSize: 15, color: rulesAccepted ? '#16a34a' : '#333', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 400, fontFamily: "'Geist', system-ui, -apple-system, sans-serif" }}>
            {rulesAccepted ? (
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#16a34a' }}>✓</span>
            ) : (
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#888' }}>3</span>
            )}
            {t('preExam.examRules')}
          </h3>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#666', lineHeight: 2 }}>
            <li>{t('preExam.ruleNoTabSwitch')}</li>
            <li>{t('preExam.ruleFaceVisible')}</li>
            <li>{t('preExam.ruleNoOtherPeople')}</li>
            <li>{t('preExam.ruleNoHeadphones')}</li>
            <li>{t('preExam.ruleNoCopyPaste')}</li>
            <li>{t('preExam.ruleFullscreen')}</li>
          </ul>
          <label style={{
            display: 'flex', alignItems: 'center', marginTop: 16, cursor: 'pointer', fontSize: 13,
            color: '#555',
          }}>
            <input
              type="checkbox"
              checked={rulesAccepted}
              onChange={(e) => setRulesAccepted(e.target.checked)}
              style={{ marginRight: 10, width: 18, height: 18, accentColor: '#1e40af' }}
            />
            {t('preExam.rulesAgreement')}
          </label>
        </div>

        {/* ── Begin Button ── */}
        <button
          disabled={!allOk}
          onClick={() => {
            cleanup();
            onComplete();
          }}
          style={{
            width: '100%', padding: '15px',
            background: allOk ? '#1e40af' : '#e0e0e0',
            color: allOk ? '#fff' : '#aaa',
            border: 'none',
            borderRadius: 4, cursor: allOk ? 'pointer' : 'not-allowed',
            fontSize: 17, fontWeight: 400,
            fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
            boxShadow: 'none',
            transition: 'all 0.2s',
          }}
        >
          {allOk ? t('preExam.beginExam') : t('preExam.completeChecks')}
        </button>

        {!allOk && (
          <p style={{ textAlign: 'center', color: '#aaa', fontSize: 12, marginTop: 10 }}>
            {!cameraOk && `${t('preExam.cameraRequired')} · `}
            {!micOk && `${t('preExam.microphoneRequired')} · `}
            {!rulesAccepted && t('preExam.rulesRequired')}
          </p>
        )}
      </div>
    </div>
  );
}
