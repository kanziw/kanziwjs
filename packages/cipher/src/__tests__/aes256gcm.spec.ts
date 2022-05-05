import { aes256gcm } from '../aes256gcm'

describe('AES256GCM', () => {
  // generated by crypto.randomBytes(32).toString('base64')
  const FAKE_CIPHER_KEY = Buffer.from('BtwDkWbhXBvQZiajty3yI0anMbQmLf7V4Oqn3q+wqpk=', 'base64')
  const PLAIN_TEXT = 'KANZIW\'s AGE IS SECRET'

  it('success without fixed nounce', () => {
    const cipher = aes256gcm(FAKE_CIPHER_KEY)

    const encryptedText = cipher.encrypt(PLAIN_TEXT)
    expect(cipher.decrypt(encryptedText)).toEqual(PLAIN_TEXT)

    expect(cipher.encrypt(PLAIN_TEXT)).not.toEqual(encryptedText)
  })

  it('success with fixed nounce', () => {
    // generated by generateFixedNounce().toString('base64')
    const fixedNounce = Buffer.from('heRHpH2PnO6IRiO3', 'base64')
    const cipher = aes256gcm(FAKE_CIPHER_KEY, { fixedNounce })

    const encryptedText = cipher.encrypt(PLAIN_TEXT)
    expect(encryptedText).toEqual('+MNE0QcuJJ/mUkM8QbXDTVQ2F7HzNYXkR6R9j5zuiEYjt7zXWWWDyzZqwH1sSI+fWug=')
    expect(cipher.decrypt(encryptedText)).toEqual(PLAIN_TEXT)
    expect(cipher.encrypt(PLAIN_TEXT)).toEqual(encryptedText)

    const otherCipher = aes256gcm(FAKE_CIPHER_KEY, { fixedNounce })
    expect(otherCipher.encrypt(PLAIN_TEXT)).toEqual(encryptedText)
  })
})