import { test } from '@japa/runner'
import { setTimeout } from 'node:timers/promises'

import { EncryptionUtilService } from 'App/Services/EncryptionUtilService';

let plainTextValue = 'Lorem ipsum dolor sit amet';
let key = '';
let descriptedValue = '';
let expiresIn = 2;

test.group("It will test the encryption method using timeout", async () => {

  test('It creates a encrypted value that will remains for only ' + expiresIn + ' seconds', ({ assert }) => {

    key = EncryptionUtilService.encrypt({
      payload: plainTextValue,
      expiresIn
    })

    assert.notEmpty(plainTextValue);

  })


  test('It will decrypt a value that will remains for only ' + expiresIn + ' seconds', ({ assert }) => {

    descriptedValue = EncryptionUtilService.decrypt({
      key: key
    });

    assert.notEmpty(descriptedValue);
    assert.equal(plainTextValue, descriptedValue);

  })

  test('Should fail because the valid time has finished', async ({ assert }) => {

    await setTimeout((expiresIn + 1) * 1000)

    descriptedValue = EncryptionUtilService.decrypt({
      key: key
    });

    assert.isNull(descriptedValue);

  })

})
