// TMUA raw marks → 1.0-9.0 scale score conversion tables
// Sources: 2022 — official PDF; 2023 — FoI request data

// Per-paper conversion: key = "year-paperNumber", value = map of raw mark → scale score
export const PAPER_CONVERSION: Record<string, Record<number, number>> = {
  "2022-1": {
    0: 1.0, 1: 1.0, 2: 1.0,
    3: 2.1, 4: 3.0, 5: 3.8, 6: 4.4,
    7: 5.0, 8: 5.6, 9: 6.1, 10: 6.5,
    11: 6.7, 12: 6.9, 13: 7.1, 14: 7.3,
    15: 7.5, 16: 7.8, 17: 8.1, 18: 8.5,
    19: 9.0, 20: 9.0,
  },
  "2022-2": {
    0: 1.0, 1: 1.0, 2: 1.0, 3: 1.0,
    4: 1.3, 5: 2.1, 6: 2.8, 7: 3.4,
    8: 4.0, 9: 4.6, 10: 5.2, 11: 5.8,
    12: 6.4, 13: 6.7, 14: 6.9, 15: 7.2,
    16: 7.4, 17: 7.8, 18: 8.2, 19: 8.9,
    20: 9.0,
  },
  "2023-1": {
    0: 1.0, 1: 1.0, 2: 1.0, 3: 1.0,
    4: 1.9, 5: 2.7, 6: 3.4, 7: 4.0,
    8: 4.6, 9: 5.2, 10: 5.8, 11: 6.3,
    12: 6.6, 13: 6.9, 14: 7.1, 15: 7.3,
    16: 7.6, 17: 7.9, 18: 8.3, 19: 9.0,
    20: 9.0,
  },
  "2023-2": {
    0: 1.0, 1: 1.0, 2: 1.0,
    3: 2.2, 4: 2.2,
    5: 3.0, 6: 3.7, 7: 4.4, 8: 5.0,
    9: 5.6, 10: 6.1, 11: 6.5, 12: 6.7,
    13: 7.0, 14: 7.2, 15: 7.4, 16: 7.7,
    17: 8.0, 18: 8.4, 19: 9.0, 20: 9.0,
  },
  // 2024 — estimated from 2023 trends; official tables not yet published
  "2024-1": {
    0: 1.0, 1: 1.0, 2: 1.0, 3: 1.0,
    4: 1.9, 5: 2.7, 6: 3.4, 7: 4.0,
    8: 4.6, 9: 5.2, 10: 5.8, 11: 6.3,
    12: 6.6, 13: 6.9, 14: 7.1, 15: 7.3,
    16: 7.6, 17: 7.9, 18: 8.3, 19: 9.0,
    20: 9.0,
  },
  "2024-2": {
    0: 1.0, 1: 1.0, 2: 1.0,
    3: 2.2, 4: 2.2,
    5: 3.0, 6: 3.7, 7: 4.4, 8: 5.0,
    9: 5.6, 10: 6.1, 11: 6.5, 12: 6.7,
    13: 7.0, 14: 7.2, 15: 7.4, 16: 7.7,
    17: 8.0, 18: 8.4, 19: 9.0, 20: 9.0,
  },
};

// Overall conversion: total raw marks (Paper 1 + Paper 2, max 40) → scale score
// Used when both papers are taken together
export const OVERALL_CONVERSION: Record<number, number> = {
  0: 1.0, 1: 1.0, 2: 1.0, 3: 1.0, 4: 1.0, 5: 1.0,
  6: 1.2, 7: 1.6, 8: 2.1, 9: 2.5, 10: 2.9,
  11: 3.2, 12: 3.6, 13: 3.9, 14: 4.2, 15: 4.5,
  16: 4.8, 17: 5.1, 18: 5.4, 19: 5.7, 20: 5.9,
  21: 6.2, 22: 6.5, 23: 6.6, 24: 6.7, 25: 6.8,
  26: 6.9, 27: 7.0, 28: 7.1, 29: 7.2, 30: 7.4,
  31: 7.5, 32: 7.6, 33: 7.8, 34: 8.0, 35: 8.1,
  36: 8.4, 37: 8.6, 38: 9.0, 39: 9.0, 40: 9.0,
};

/**
 * Convert a raw mark to TMUA 1.0-9.0 scale score for a specific paper.
 * Returns undefined if no conversion table exists for that year/paper.
 */
export function rawToScale(year: number, paperNumber: number, rawMark: number): number | undefined {
  const table = PAPER_CONVERSION[`${year}-${paperNumber}`];
  if (!table) return undefined;
  // Clamp raw mark to 0-20
  const clamped = Math.max(0, Math.min(20, Math.round(rawMark)));
  return table[clamped];
}

/**
 * Convert total raw marks (both papers combined) to TMUA overall scale score.
 */
export function overallRawToScale(totalRawMark: number): number {
  const clamped = Math.max(0, Math.min(40, Math.round(totalRawMark)));
  return OVERALL_CONVERSION[clamped] ?? 9.0;
}

/** Get a color for a TMUA scale score (1.0-9.0) */
export function scaleScoreColor(score: number): string {
  if (score >= 7.1) return '#16a34a'; // green
  if (score >= 6.0) return '#ca8a04'; // yellow
  if (score >= 3.5) return '#d97706'; // orange
  return '#dc2626'; // red
}

/** Get a human-readable label for a TMUA scale score */
export function scaleScoreLabel(score: number): string {
  if (score >= 7.6) return 'Exceptional';
  if (score >= 7.1) return 'Excellent';
  if (score >= 6.6) return 'Very Good';
  if (score >= 6.0) return 'Good';
  if (score >= 5.0) return 'Above Average';
  if (score >= 4.0) return 'Average';
  if (score >= 3.0) return 'Below Average';
  return 'Developing';
}
