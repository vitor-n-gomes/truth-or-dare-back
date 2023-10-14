import Encryption from '@ioc:Adonis/Core/Encryption'

export class EncryptionUtilService {

    static  encrypt(parameters: {payload: any, expiresIn?: string | number, purpose?: string}): string{
        const {payload, expiresIn, purpose} = parameters;

        const encripted = Encryption.encrypt(payload, expiresIn, purpose)

        return encripted
    }

    static decrypt(parameters: {key: string, purpose?: string}): any | null{

        const {key,  purpose} = parameters;

        const decripted = Encryption.decrypt(key, purpose)

        return decripted
        
    }
}