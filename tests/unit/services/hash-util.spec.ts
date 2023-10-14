import { test } from '@japa/runner'
import { HashUtilService } from 'App/Services/HashUtilService';

let hashedValue = '';
const plainTextValue = 'ItCouldBeAPassword';
const wrongPlainTextValue = 'ItCouldBe';

test.group('It test the hash util service', () => {

  test('Should be able to create a hash from a plain text', async ({ assert }) => {

      hashedValue = await HashUtilService.generateHash({
        plainText: plainTextValue
      });

      console.log(hashedValue);

      assert.notEqual(plainTextValue, hashedValue);
  })

  test('Should be able to compare a hash with plain text', async ({ assert }) => {

    try {

      const result = await HashUtilService.comparePlainTextWithHash({
        plainTextValue,
        hashedValue
      })

      assert.isTrue(result);


    } catch (error) {
      assert.fail('Ops, it was not possible compare plain text with hash')
    }

  })

  test('Should return error because the plain text is different from the hashed value', async ({ assert }) => {

      const result = await HashUtilService.comparePlainTextWithHash({
        plainTextValue: wrongPlainTextValue,
        hashedValue
      })

      assert.isFalse(result);

  
  })

})

