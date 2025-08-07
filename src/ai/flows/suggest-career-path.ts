'use server';

/**
 * @fileOverview AI agent that suggests a personalized career path with relevant skills and certifications.
 *
 * - suggestCareerPath - A function that handles the career path suggestion process.
 * - SuggestCareerPathInput - The input type for the suggestCareerPath function.
 * - SuggestCareerPathOutput - The return type for the suggestCareerPath function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCareerPathInputSchema = z.object({
  userSkills: z
    .string()
    .describe('A comma-separated list of the user current skills.'),
  userPreferences: z
    .string()
    .describe('The user job preferences, such as job titles or industries.'),
  userExperience: z
    .string()
    .describe('A brief description of the user professional experience.'),
});
export type SuggestCareerPathInput = z.infer<typeof SuggestCareerPathInputSchema>;

const SuggestCareerPathOutputSchema = z.object({
  suggestedCareerPath: z.string().describe('A detailed suggestion for a career path.'),
  relevantSkills: z.string().describe('A comma-separated list of relevant skills to acquire.'),
  suggestedCertifications: z.string().describe('A comma-separated list of suggested certifications.'),
});
export type SuggestCareerPathOutput = z.infer<typeof SuggestCareerPathOutputSchema>;

export async function suggestCareerPath(input: SuggestCareerPathInput): Promise<SuggestCareerPathOutput> {
  return suggestCareerPathFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCareerPathPrompt',
  input: {schema: SuggestCareerPathInputSchema},
  output: {schema: SuggestCareerPathOutputSchema},
  prompt: `You are a career advisor expert specializing in personalized career path suggestions.

You will use this information to suggest a career path, relevant skills, and certifications to improve the user profile and discover new opportunities.

Consider the user's skills, preferences and experience to provide the best career path suggestion.

Please provide the output in Indonesian.

Current Skills: {{{userSkills}}}
Preferences: {{{userPreferences}}}
Experience: {{{userExperience}}}

Suggest a career path, relevant skills and certifications that are relevant to the user.
`,
});

const suggestCareerPathFlow = ai.defineFlow(
  {
    name: 'suggestCareerPathFlow',
    inputSchema: SuggestCareerPathInputSchema,
    outputSchema: SuggestCareerPathOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
