import {
    QuestionContract,
    CreateQuestionContract,
    UpdateQuestionContract,
    DeleteQuestionContract,
    SyncQuestionWithCategoriesContract
} from "App/UseCases/Question/Interfaces/QuestionContract";

import { QuestionRepository } from "../QuestionRepository";
import BadRequestException from "App/Exceptions/BadRequestException";
import { randomUUID } from 'node:crypto'
import { DateTime } from "luxon";

export class InMemoryQuestionRepository implements QuestionRepository {

    public items: QuestionContract[] = []
    public syncItems: { id: string, idCategory: string, idQuestion: string }[] = []

    async list(): Promise<QuestionContract[] | null> {
        return this.items
    }

    async sync({ questionid, categories }: SyncQuestionWithCategoriesContract): Promise<{ message: string | null}> {

        categories.forEach(

            (item) => {

                this.syncItems.push({
                    id: randomUUID(),
                    idCategory: item.id,
                    idQuestion: questionid
                }
                )
            }
        )

        return { message: 'Question has been syncronized with new categories' }

    }

    async show(id: string): Promise<QuestionContract | null> {

        const item = this.items.find((item) => item.id == id);

        if (!item) {
            return null
        }

        return item;
    }

 
    async create(data: CreateQuestionContract): Promise<QuestionContract> {

        data.question.id = randomUUID()
        
        data.question.createdAt = DateTime.now()
        data.question.updatedAt = DateTime.now()

        this.items.push(data.question);

        return this.items[this.items.length - 1]

    }

    async update(data: UpdateQuestionContract): Promise<QuestionContract> {

        const index = this.items.findIndex((item) => item.id == data.id);

        if (index < 0) {
            throw new BadRequestException('This Question not exist', 409)
        }

        data.question.id = data.id
        data.question.updatedAt = DateTime.now()

        const oldQuestion = this.items[index];

        this.items[index] = {...oldQuestion, ...data.question}

        return this.items[index]
    }

    async delete(data: DeleteQuestionContract): Promise<{ message: string; }> {

        const index = this.items.findIndex((item) => item.id === data.id);
        
        if (index == -1 || this.items.length == 0) {
            throw new Error('This Question not exist')
        }

        this.items = this.items.filter((item) => item.id != data.id);

        return { message: 'Question has been deleted successfully' }

    }


}


