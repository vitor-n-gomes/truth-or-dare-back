import { test } from '@japa/runner'
import { EncryptionUtilService } from 'App/Services/EncryptionUtilService'

let plainTextValue = 'Lorem ipsum dolor sit amet'
let key = ''
let descriptedValue = ''

test.group('It test the encryption util service and your respective method compare ', () => {
  test('Should be able to create a encryption from a plain text', ({ assert }) => {
    key = EncryptionUtilService.encrypt({
      payload: plainTextValue,
    })

    assert.notEmpty(plainTextValue)
  })

  test('Should be able to decripted from a encrypted text', ({ assert }) => {
    descriptedValue = EncryptionUtilService.decrypt({
      key: key,
    })

    assert.notEmpty(descriptedValue)
    assert.equal(plainTextValue, descriptedValue)
  })
})
