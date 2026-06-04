// TMUA topic tag display constants
// All tags use a unified blue color scheme (#306ca0)

export const TAG_LIST = [
  'algebra',
  'quadratics_polynomials',
  'inequalities',
  'functions',
  'transformations_graphs',
  'exponentials_logs',
  'trigonometry',
  'differentiation',
  'integration',
  'sequences_series',
  'coordinate_geometry',
  'number_theory',
  'logic_proof',
  'general',
] as const;

export type TopicTag = (typeof TAG_LIST)[number];

export const TAG_LABEL: Record<TopicTag, string> = {
  algebra: 'Algebra',
  quadratics_polynomials: 'Quadratics & Polynomials',
  inequalities: 'Inequalities',
  functions: 'Functions',
  transformations_graphs: 'Transformations & Graphs',
  exponentials_logs: 'Exponentials & Logarithms',
  trigonometry: 'Trigonometry',
  differentiation: 'Differentiation',
  integration: 'Integration',
  sequences_series: 'Sequences & Series',
  coordinate_geometry: 'Coordinate Geometry',
  number_theory: 'Number Theory',
  logic_proof: 'Logic & Proof',
  general: 'General',
};

export const TAG_COLOR = '#1e40af';
export const TAG_BG = '#dbeafe';
