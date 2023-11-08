// types/survey.ts
export type SurveyQuestionAttributes = {
    min?: number;
    max?: number;
  };
  
  export type SurveyQuestion = {
    questionId: string;
    questionType: 'text' | 'rating';
    label: string;
    required: boolean;
    attributes: SurveyQuestionAttributes | null;
  };
  
  export type SurveyAttributes = {
    title: string;
    description: string;
    questions: SurveyQuestion[];
  };
  
  export type SurveyData = {
    data: {
      type: 'surveys';
      id: string;
      attributes: SurveyAttributes;
    };
  };
  