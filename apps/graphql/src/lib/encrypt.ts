import CryptoJS from 'crypto-js'

const encrypt = (stringToEncrypt: string) => {

  const encryptedString = CryptoJS.AES.encrypt(stringToEncrypt, process.env.ENCRYPTION_KEY ?? '')

  return encryptedString.toString()
}

export default encrypt