import { motion } from 'framer-motion';

interface RedeemModalProps {
  icon: string;
  title: string;
  description: string;
  cost: number;
  gradient: string;
  redeeming: boolean;
  onRedeem: () => void;
  onClose: () => void;
}

export function RedeemModal({
  icon, title, description, cost, gradient, redeeming, onRedeem, onClose,
}: RedeemModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 16, padding: '32px',
          maxWidth: 360, width: '90%', textAlign: 'center',
          boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
        }}
      >
        <div style={{
          width: 64, height: 64, borderRadius: 16, margin: '0 auto 16px',
          background: `linear-gradient(135deg, ${gradient})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32,
        }}>
          {icon}
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1f2937', margin: '0 0 8px' }}>
          {title}
        </h2>
        <p style={{ fontSize: 14, color: '#6b7280', margin: '0 0 20px', lineHeight: 1.5 }}>
          {description}
        </p>
        <div style={{
          display: 'inline-block', padding: '8px 20px', borderRadius: 20,
          background: `linear-gradient(135deg, ${gradient})`,
          color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 24,
        }}>
          {cost} XP
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={onClose}
            disabled={redeeming}
            style={{
              flex: 1, padding: '10px', borderRadius: 8,
              border: '1px solid #e5e7eb', background: '#fff',
              color: '#374151', fontSize: 14, fontWeight: 500, cursor: 'pointer',
              fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onRedeem}
            disabled={redeeming}
            style={{
              flex: 1, padding: '10px', borderRadius: 8,
              border: 'none',
              background: `linear-gradient(135deg, ${gradient})`,
              color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
              opacity: redeeming ? 0.6 : 1,
            }}
          >
            {redeeming ? 'Redeeming...' : 'Redeem'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
