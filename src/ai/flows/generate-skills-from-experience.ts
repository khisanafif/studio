'use server';
/**
 * @fileOverview Generates relevant skills based on user's past job experiences.
 *
 * - generateSkillsFromExperience - A function that handles the skill generation process.
 * - GenerateSkillsFromExperienceInput - The input type for the generateSkillsFromExperience function.
 * - GenerateSkillsFromExperienceOutput - The return type for the generateSkillsFromExperience function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSkillsFromExperienceInputSchema = z.object({
  jobExperience: z
    .string()
    .describe('The user past job experiences.'),
});
export type GenerateSkillsFromExperienceInput = z.infer<typeof GenerateSkillsFromExperienceInputSchema>;

const GenerateSkillsFromExperienceOutputSchema = z.object({
  skills: z.array(
    z.string().describe('A skill that is relevant to the job experience.')
  ).describe('A list of skills relevant to the job experience.'),
});
export type GenerateSkillsFromExperienceOutput = z.infer<typeof GenerateSkillsFromExperienceOutputSchema>;

export async function generateSkillsFromExperience(input: GenerateSkillsFromExperienceInput): Promise<GenerateSkillsFromExperienceOutput> {
  return generateSkillsFromExperienceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSkillsFromExperiencePrompt',
  input: {schema: GenerateSkillsFromExperienceInputSchema},
  output: {schema: GenerateSkillsFromExperienceOutputSchema},
  prompt: `You are a career advisor specializing in skill extraction.

You will use the job experience information to extract a list of relevant skills.

Job Experience: {{{jobExperience}}}`,
});

const generateSkillsFromExperienceFlow = ai.defineFlow(
  {
    name: 'generateSkillsFromExperienceFlow',
    inputSchema: GenerateSkillsFromExperienceInputSchema,
    outputSchema: GenerateSkillsFromExperienceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
