import { z } from 'zod';

export const QuestionSchema = z.object({
  id: z.string(),
  text: z.string().optional().default(''),
  image_url: z.string().optional(),
  options: z.array(z.string()),
  answer: z.number(),
  topic: z.string().optional(),
});

export const PaperSchema = z.object({
  id: z.string(),
  title: z.string(),
  subject: z.string().optional(),
  paper_number: z.number(),
  year: z.number(),
  sitting: z.string(),
  duration_minutes: z.number(),
  total_marks: z.number(),
  topics: z.array(z.string()),
  questions: z.array(QuestionSchema),
  created_at: z.string().optional(),
});

export type Paper = z.infer<typeof PaperSchema>;
export type Question = z.infer<typeof QuestionSchema>;
