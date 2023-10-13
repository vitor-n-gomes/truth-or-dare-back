import { test } from '@japa/runner'
import { InMemoryCategoryRepository } from 'App/Repositories/InMemory/InMemoryCategoryRepository'
import { CreateCategoryUseCase } from 'App/UseCases/Category/CreateCategoryUseCase'
import { CategoryContract } from 'App/UseCases/Category/Interfaces/CategoryContract'
import { UpdateCategoryUseCase } from 'App/UseCases/Category/UpdateCategoryUseCase'

import { randomUUID } from 'node:crypto'

let repository: InMemoryCategoryRepository
let sut: UpdateCategoryUseCase;
let categoryId: string | undefined;
let category: CategoryContract

test.group('Update Category Use Case', (group) => {

  group.each.setup( async () => {

    repository = new InMemoryCategoryRepository();
    sut = new UpdateCategoryUseCase(repository);

    const createUseCase = new CreateCategoryUseCase(repository);

    const userid = randomUUID()

    category = {
      userid: userid,
      description: 'Life & Experiences',
      status: true
    }

    const { id } = await createUseCase.execute({category});

    categoryId = id;

  })


  test('Updating a category', async ({ assert }) => {

    const newCategory = {
      userid: randomUUID(),
      description: 'New Experience',
      status: true
    }

    assert.exists(categoryId);

    const result = await sut.execute({ id: categoryId, category: newCategory });

    assert.exists(result.id);
    assert.exists(result.updatedAt);
    assert.notEqual(category.description, result.description)
  })

})

