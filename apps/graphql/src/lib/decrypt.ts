import CryptoJS from 'crypto-js'

const decrypt = (stringToDecrypt: string) => {

  const decryptedString = CryptoJS.AES.decrypt(stringToDecrypt, process.env.ENCRYPTION_KEY ?? '')

  return decryptedString.toString(CryptoJS.enc.Utf8)
}

export default decrypt