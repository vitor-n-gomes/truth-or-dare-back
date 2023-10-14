import { DateTime } from 'luxon'
export interface QuestionContract {
  id?: string
  userid: string
  description: string
  status: boolean
  type: number
  createdAt?: DateTime
  updatedAt?: DateTime
}

export interface CreateQuestionContract {
  question: QuestionContract
}

export interface UpdateQuestionContract extends CreateQuestionContract {
  id?: string
}

export interface DeleteQuestionContract {
  id?: string
}

export interface SyncQuestionWithCategoriesContract {
  questionid: string
  categories: {
    id: string
  }[]
}
