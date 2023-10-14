import { test } from '@japa/runner'
import { HashUtilService } from 'App/Services/HashUtilService'

let hashedValue = ''
const plainTextValue = 'ItCouldBeAPassword'

test.group('It test the hash util service', () => {
  test('Should be able to create a hash from a plain text', async ({ assert }) => {
    hashedValue = await HashUtilService.generateHash({
      plainText: plainTextValue,
    })

    assert.notEqual(plainTextValue, hashedValue)

    if (hashedValue.length < 10) {
      assert.fail('Hash generated is not valid')
    }
  })
})
