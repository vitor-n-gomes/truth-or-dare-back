import { QuestionContract, CreateQuestionContract, DeleteQuestionContract, UpdateQuestionContract, SyncQuestionWithCategoriesContract } from "App/UseCases/Question/Interfaces/QuestionContract";

export interface QuestionRepository {
    list(): Promise<QuestionContract[] | null>
    show(id: string): Promise<QuestionContract | null>
    sync(data: SyncQuestionWithCategoriesContract): Promise<{message: string | null}>
    create(data: CreateQuestionContract): Promise<QuestionContract>
    update(data: UpdateQuestionContract): Promise<QuestionContract>
    delete(data: DeleteQuestionContract): Promise<{message: string}>
}