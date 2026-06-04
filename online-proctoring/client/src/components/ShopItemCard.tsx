import { motion } from 'framer-motion';

interface ShopItemCardProps {
  icon: string;
  gradient: string;
  title: string;
  description: string;
  cost: number;
  unlocked: boolean;
  enabled: boolean;
  canAfford: boolean;
  onToggle: () => void;
  onRedeem: () => void;
}

export function ShopItemCard({
  icon, gradient, title, description, cost, unlocked, enabled, canAfford, onToggle, onRedeem,
}: ShopItemCardProps) {
  return (
    <div style={{
      background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb',
      padding: '20px 24px', marginBottom: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 50, height: 50, borderRadius: 12,
          background: `linear-gradient(135deg, ${gradient})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24,
        }}>
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', margin: '0 0 4px' }}>
            {title}
          </h3>
          <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>
            {description}
          </p>
        </div>
        {unlocked ? (
          <button
            onClick={onToggle}
            style={{
              padding: '6px 14px', borderRadius: 8, cursor: 'pointer',
              background: enabled ? '#dcfce7' : '#f1f5f9',
              border: enabled ? '1px solid #bbf7d0' : '1px solid #e2e8f0',
              color: enabled ? '#16a34a' : '#94a3b8',
              fontSize: 13, fontWeight: 600,
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}
          >
            {enabled ? 'ON' : 'OFF'}
          </button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRedeem}
            disabled={!canAfford}
            style={{
              padding: '10px 20px', borderRadius: 10,
              border: 'none', cursor: canAfford ? 'pointer' : 'not-allowed',
              background: canAfford
                ? `linear-gradient(135deg, ${gradient})`
                : '#d1d5db',
              color: '#fff', fontSize: 14, fontWeight: 600,
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              opacity: canAfford ? 1 : 0.6,
            }}
          >
            {cost} XP
          </motion.button>
        )}
      </div>
    </div>
  );
}
