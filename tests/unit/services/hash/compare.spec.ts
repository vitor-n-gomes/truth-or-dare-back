import { test } from '@japa/runner'
import { HashUtilService } from 'App/Services/HashUtilService'

let hashedValue = ''
let plainTextValue = 'ItCouldBeAPassword'
let wrongPlainTextValue = 'ItCouldBe'

test.group('It test the hash util service and your respective method compare ', (group) => {
  group.each.setup(async () => {
    hashedValue = await HashUtilService.generateHash({
      plainText: plainTextValue,
    })
  })

  test('Should be able to compare a hash with plain text', async ({ assert }) => {
    try {
      const result = await HashUtilService.comparePlainTextWithHash({
        plainTextValue,
        hashedValue,
      })

      assert.isTrue(result)
    } catch (error) {
      assert.fail('Ops, it was not possible compare plain text with hash')
    }
  })

  test('Should return error because the plain text is different from the hashed value', async ({
    assert,
  }) => {
    const result = await HashUtilService.comparePlainTextWithHash({
      plainTextValue: wrongPlainTextValue,
      hashedValue,
    })

    assert.isFalse(result)
  })
})
