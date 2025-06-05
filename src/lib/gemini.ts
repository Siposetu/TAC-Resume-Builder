import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBte8-Q6_bIV2pMFk-M_Dgr6BypHsDcKiQ');

export async function improveResume(content: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
  
  const prompt = `As a professional resume writer, improve the following text while maintaining its core information. Make it more impactful and professional: ${content}`;
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error improving resume:', error);
    return content;
  }
}

export async function generateSummary(experience: string[]): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
  
  const prompt = `Based on the following experience, generate a professional summary: ${experience.join('\n')}`;
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating summary:', error);
    return '';
  }
}