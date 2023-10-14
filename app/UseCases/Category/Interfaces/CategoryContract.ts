import { DateTime } from 'luxon'

export interface CategoryContract {
  id?: string
  userid: string
  description: string
  status: boolean
  createdAt?: DateTime
  updatedAt?: DateTime
}

export interface CreateCategoryContract {
  category: CategoryContract
}

export interface UpdateCategoryContract extends CreateCategoryContract {
  id?: string
}

export interface DeleteCategoryContract {
  id?: string
}
