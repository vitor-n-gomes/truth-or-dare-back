import { test } from '@japa/runner'
import { EncryptionUtilService } from 'App/Services/EncryptionUtilService';

let plainTextValue = 'Lorem ipsum dolor sit amet';
let key = '';
let descriptedValue = '';

const min = 10000;
const max = 99999; 

const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

test.group("It will test the encryption method using a random number between "+min+" and "+max+" ", async () => {

  test('It creates a encrypted value that will receive this key: ' + randomNumber ,  ({ assert }) => {

    key = EncryptionUtilService.encrypt({
      payload: plainTextValue,
      purpose: String(randomNumber)
    })

    assert.notEmpty(plainTextValue);

  })


  test('It will decrypt a value that will only works using this key: ' + randomNumber ,  ({ assert }) => {

    descriptedValue = EncryptionUtilService.decrypt({
      key: key,
      purpose: String(randomNumber)
    });

    assert.notEmpty(descriptedValue);
    assert.equal(plainTextValue, descriptedValue);

  })


  test('Should break because it was set up a wrong key ' + (randomNumber + 1) ,  ({ assert }) => {

    descriptedValue = EncryptionUtilService.decrypt({
      key: key,
      purpose: String(randomNumber + 1)
    });

    assert.isNull(descriptedValue);

  })


})
