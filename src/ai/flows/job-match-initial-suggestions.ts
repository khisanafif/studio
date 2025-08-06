'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing initial job suggestions to new users.
 *
 * - jobMatchInitialSuggestions - A function that takes a user's skills and interests and returns initial job suggestions.
 * - JobMatchInitialSuggestionsInput - The input type for the jobMatchInitialSuggestions function.
 * - JobMatchInitialSuggestionsOutput - The return type for the jobMatchInitialSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JobMatchInitialSuggestionsInputSchema = z.object({
  skillsAndInterests: z
    .string()
    .describe('A short description of the user\'s skills and interests.'),
});
export type JobMatchInitialSuggestionsInput = z.infer<
  typeof JobMatchInitialSuggestionsInputSchema
>;

const JobMatchInitialSuggestionsOutputSchema = z.object({
  jobSuggestions: z
    .array(z.string())
    .describe('A list of job suggestions based on the user\'s skills and interests.'),
});
export type JobMatchInitialSuggestionsOutput = z.infer<
  typeof JobMatchInitialSuggestionsOutputSchema
>;

export async function jobMatchInitialSuggestions(
  input: JobMatchInitialSuggestionsInput
): Promise<JobMatchInitialSuggestionsOutput> {
  return jobMatchInitialSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'jobMatchInitialSuggestionsPrompt',
  input: {schema: JobMatchInitialSuggestionsInputSchema},
  output: {schema: JobMatchInitialSuggestionsOutputSchema},
  prompt: `You are an AI job matching assistant. A user has provided a short description of their skills and interests.  Based on this description, provide a list of job suggestions that would be relevant to them.

Skills and Interests: {{{skillsAndInterests}}}

Job Suggestions:`,
});

const jobMatchInitialSuggestionsFlow = ai.defineFlow(
  {
    name: 'jobMatchInitialSuggestionsFlow',
    inputSchema: JobMatchInitialSuggestionsInputSchema,
    outputSchema: JobMatchInitialSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
