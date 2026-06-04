import type { SensitivityConfig } from './types';

/**
 * Default cooldown configuration.
 * - multiple_faces / face_missing: 5000ms (face detection runs every frame,
 *   so a brief incident should not generate hundreds of violations)
 * - all other types: 3000ms
 */
export const DEFAULT_SENSITIVITY: SensitivityConfig = {
  defaultCooldownMs: 3000,
  cooldownMs: {
    multiple_faces: 5000,
    face_missing: 5000,
  },
};
