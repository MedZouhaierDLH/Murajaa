
export interface Ayah {
  number: number;
  text: string;
  surah: {
    number: number;
    name: string;
    englishName: string;
    numberOfAyahs: number;
  };
  numberInSurah: number;
  juz: number;
  hizbQuarter: number;
}

export interface QuizQuestion {
  type: 'NEXT' | 'PREVIOUS';
  referenceAyah: Ayah;
  targetAyah: Ayah;
}

export type QuizStatus = 'IDLE' | 'LOADING' | 'ACTIVE' | 'FINISHED' | 'HISTORY' | 'DETAILS';

export interface EvaluationResult {
  isCorrect: boolean;
  similarity: number;
  feedback: string;
  normalizedUserAnswer: string;
  normalizedCorrectAnswer: string;
}

export enum SelectionType {
  JUZ = 'JUZ',
  SURAH = 'SURAH'
}

export interface QuestionResult {
  question: QuizQuestion;
  isCorrect: boolean;
}

export interface TestResult {
  id: string;
  date: number;
  type: SelectionType;
  selectionId: number;
  score: number;
  totalQuestions: number;
  results: QuestionResult[];
}
