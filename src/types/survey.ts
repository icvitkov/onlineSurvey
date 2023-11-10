export interface SurveyData {
  id:          string;
  title:       string;
  description: string;
  questions:   Question[];
}

export interface Question {
  questionId:   string;
  questionType: string;
  label:        string;
  required:     boolean;
  attributes:   Attributes | null;
}

export interface Attributes {
  min: number;
  max: number;
}
