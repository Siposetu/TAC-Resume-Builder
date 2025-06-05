import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBte8-Q6_bIV2pMFk-M_Dgr6BypHsDcKiQ');

// ✅ Simple function: uses prompt directly
export async function generateResumeContent(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating resume content:', error);
    return '';
  }
}

// ✅ Improved summary function with formatted prompt
export async function generateSummary(experience: string[]): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const formattedPrompt = `Based on the following experience, generate a professional summary: ${experience.join('\n')}`;

  try {
    const result = await model.generateContent(formattedPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating summary:', error);
    return '';
  }
}
