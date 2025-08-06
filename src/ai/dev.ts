import { config } from 'dotenv';
config();

import '@/ai/flows/job-match-initial-suggestions.ts';
import '@/ai/flows/generate-skills-from-experience.ts';
import '@/ai/flows/suggest-career-path.ts';