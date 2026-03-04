'use server';
/**
 * @fileOverview A Genkit flow for generating text based on a user prompt.
 *
 * - generateAIText - A function that handles the AI text generation process.
 * - AITextGenerationInput - The input type for the generateAIText function.
 * - AITextGenerationOutput - The return type for the generateAIText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AITextGenerationInputSchema = z
  .string()
  .describe('The text prompt for the AI model to generate text from.');
export type AITextGenerationInput = z.infer<typeof AITextGenerationInputSchema>;

const AITextGenerationOutputSchema = z
  .string()
  .describe('The AI-generated text based on the input prompt.');
export type AITextGenerationOutput = z.infer<typeof AITextGenerationOutputSchema>;

export async function generateAIText(input: AITextGenerationInput): Promise<AITextGenerationOutput> {
  return aiTextGenerationFlow(input);
}

const aiTextGenerationPrompt = ai.definePrompt({
  name: 'aiTextGenerationPrompt',
  input: {schema: AITextGenerationInputSchema},
  output: {schema: AITextGenerationOutputSchema},
  prompt: `Generate contextually relevant text based on the following input:

Input: {{{this}}}`,
});

const aiTextGenerationFlow = ai.defineFlow(
  {
    name: 'aiTextGenerationFlow',
    inputSchema: AITextGenerationInputSchema,
    outputSchema: AITextGenerationOutputSchema,
  },
  async input => {
    const {output} = await aiTextGenerationPrompt(input);
    return output!;
  }
);
