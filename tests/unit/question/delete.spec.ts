import { test } from '@japa/runner'
import { InMemoryQuestionRepository } from 'App/Repositories/InMemory/InMemoryQuestionRepository'
import { CreateQuestionUseCase } from 'App/UseCases/Question/CreateQuestionUseCase'
import { QuestionContract } from 'App/UseCases/Question/Interfaces/QuestionContract'
import { DeleteQuestionUseCase } from 'App/UseCases/Question/DeleteQuestionUseCase'
import { randomUUID } from 'node:crypto'

let repository: InMemoryQuestionRepository
let sut: DeleteQuestionUseCase;
let questionId: string | undefined;
let question: QuestionContract

test.group('Delete Question Use Case', (group) => {

  group.setup( async () => {

    repository = new InMemoryQuestionRepository();
    sut = new DeleteQuestionUseCase(repository);

    const createUseCase = new CreateQuestionUseCase(repository);

    const userid = randomUUID()

    question = {
      userid: userid,
      description: 'What is your favorite food?',
      status: true,
      type: 1
    }

    const { id } = await createUseCase.execute({question});

    questionId = id;

  })


  test('Deleting a question', async ({ assert }) => {

    const result = await sut.execute({ id: questionId });

    assert.exists(result.message);

  })

  test('Deleting a question that does not exist', async ({ assert }) => {
    
    try{  
    
      await sut.execute({ id: questionId }); 

      assert.fail('Expected BadRequestException but got success');
    
    }catch(error) {
      assert.exists(error.message)
    }

  })

})

