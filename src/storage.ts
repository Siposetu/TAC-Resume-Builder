import { ResumeData } from '../types';

const STORAGE_KEY = 'tac-resume-builder-data';
const SAVED_RESUMES_KEY = 'tac-resume-builder-saved';

export const saveResumeData = (data: ResumeData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving resume data to localStorage:', error);
  }
};

export const loadResumeData = (): ResumeData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading resume data from localStorage:', error);
    return null;
  }
};

export const clearResumeData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing resume data from localStorage:', error);
  }
};

export const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export interface SavedResume extends ResumeData {
  id: string;
  savedAt: string;
  name: string;
}

export const saveAsNewResume = (data: ResumeData, name: string): void => {
  try {
    const savedResumes = getSavedResumes();
    const newResume: SavedResume = {
      ...data,
      id: generateUniqueId(),
      savedAt: new Date().toISOString(),
      name
    };
    savedResumes.push(newResume);
    localStorage.setItem(SAVED_RESUMES_KEY, JSON.stringify(savedResumes));
  } catch (error) {
    console.error('Error saving new resume:', error);
  }
};

export const getSavedResumes = (): SavedResume[] => {
  try {
    const data = localStorage.getItem(SAVED_RESUMES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading saved resumes:', error);
    return [];
  }
};

export const deleteSavedResume = (id: string): void => {
  try {
    const savedResumes = getSavedResumes();
    const updatedResumes = savedResumes.filter(resume => resume.id !== id);
    localStorage.setItem(SAVED_RESUMES_KEY, JSON.stringify(updatedResumes));
  } catch (error) {
    console.error('Error deleting saved resume:', error);
  }
};

export const loadSavedResume = (id: string): SavedResume | null => {
  try {
    const savedResumes = getSavedResumes();
    return savedResumes.find(resume => resume.id === id) || null;
  } catch (error) {
    console.error('Error loading saved resume:', error);
    return null;
  }
};