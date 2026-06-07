// TMUA topic tag definitions — mirroring real data model
export const TAG_LIST = [
  'algebra', 'quadratics_polynomials', 'inequalities', 'functions',
  'transformations_graphs', 'exponentials_logs', 'trigonometry',
  'differentiation', 'integration', 'sequences_series',
  'coordinate_geometry', 'number_theory', 'logic_proof', 'general',
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

export interface Question {
  id: string;
  text: string;
  image_url?: string;
  options: string[];
  answer: number;
  topics: TopicTag[];           // multi-topic support
  primary_topic: TopicTag;
  difficulty: 'easy' | 'medium' | 'hard';
  year: number;
  paperNumber: 1 | 2;
  questionIndex: number;
}

export interface TopicMastery {
  topic: TopicTag;
  masteryLevel: number;   // 0-100
  confidence: number;     // 0-1
  totalAttempts: number;
  totalCorrect: number;
}

export interface GeneratedPaper {
  id: string;
  title: string;
  paperNumber: 1 | 2;
  mode: 'random' | 'adaptive' | 'diagnostic';
  distribution: Partial<Record<TopicTag, number>>;
  questions: Question[];
  difficultyProfile: { easy: number; medium: number; hard: number };
  createdAt: string;
}
