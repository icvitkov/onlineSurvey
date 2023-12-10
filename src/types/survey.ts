export interface SurveyData {
  id: string
  title: string
  description: string
  questions: Question[]
}

export interface Question {
  questionId: string
  questionType: string
  label: string
  required: boolean
  attributes: SurveyAttributes | null
}

export interface SurveyAttributes {
  min: number
  max: number
}

export interface SurveyAnswer {
  data: Data
}

export interface Data {
  type: string
  attributes: AnswerAttributes
}

export interface AnswerAttributes {
  answers: AnswerElement[]
}

export interface AnswerElement {
  questionId: string
  answer: number | string
}
