import * as crypto from 'crypto';

export class CryptoUtil {
  /**
   * generates random string of characters i.e salt
   * @function
   * @param {number} length - Length of the random string.
   */
  public static generateRandomString(length: number): string {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex') /** convert to hexadecimal format */
      .slice(0, length); /** return required number of characters */
  }

  public static get Crypto() {
    return crypto;
  }

  public static generateSHA1(plainText: string, key: string) {
    const hash = crypto.createHmac('sha1', key).update(plainText);
    return hash.digest('hex');
  }

  public static generateSHA512(plainText: string, key: string) {
    return crypto.createHmac('sha512', key).update(plainText).digest('hex');
  }

  public static generateSHA256(plainText: string, key: string) {
    return crypto.createHmac('sha256', key).update(plainText).digest('hex');
  }

  public static generateMD5(plainText: string) {
    return crypto.createHash('md5').update(plainText).digest('hex');
  }

  public static generateCode() {
    const salt: string = this.generateRandomString(16);
    return salt
      .match(/.{1,4}/g)
      .join('-')
      .toUpperCase();
  }

  public static generateUID(length?: number) {
    // I generate the UID from two parts here
    // to ensure the random number provide enough bits.
    let firstPart: string | number = (Math.random() * 46656) | 0;
    let secondPart: string | number = (Math.random() * 46656) | 0;
    firstPart = ('000' + firstPart.toString(36)).slice(-3);
    secondPart = ('000' + secondPart.toString(36)).slice(-3);
    return (firstPart + secondPart).substring(0, length).toUpperCase();
  }
}
