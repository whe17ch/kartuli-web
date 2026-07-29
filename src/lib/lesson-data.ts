export interface LessonData {
  id: string;
  title: Record<string, string>;
  supportedSourceLanguages: string[];
  targetLanguage: string;
  estimatedMinutes: number;
  progressSteps: number;
  letter: {
    glyph: string;
    name: string;
    ipa: string;
    transliteration: string;
    phonetic_en: string;
    phonetic_de: string;
    mnemonic: Record<string, string>;
  };
  exercises: Exercise[];
  culturalMoment: {
    title: Record<string, string>;
    body: Record<string, string>;
    imageAsset: string;
  };
  completionMessage: Record<string, string>;
  gardenReward: {
    id: string;
    label: string;
    asset: string;
  };
}

export interface Exercise {
  id: string;
  type: string;
  prompt: Record<string, string>;
  answer: string;
  audioAsset?: string;
  imageAsset?: string;
  strokePathAsset?: string;
  alternatives?: string[];
  skipAllowed?: boolean;
  hint?: Record<string, string>;
  successFeedback?: Record<string, string>;
  retryFeedback?: Record<string, string>;
}
