import Hash from '@ioc:Adonis/Core/Hash'

export class HashUtilService {
  static async generateHash(parameters: { plainText: string }): Promise<string> {
    return await Hash.make(parameters.plainText)
  }

  static async comparePlainTextWithHash(parameters: {
    plainTextValue: string
    hashedValue: string
  }): Promise<boolean> {
    const { plainTextValue, hashedValue } = parameters

    if (hashedValue.length == 0) {
      throw new Error('The hashed value is empty')
    }

    if (await Hash.verify(hashedValue, plainTextValue)) {
      return true
    }

    return false
  }
}
