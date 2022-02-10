export class StringUtil {
  private static readonly _numChars: string = '0123456789';
  private static readonly _upCaseChars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private static readonly _lowerCaseChars: string =
    'abcdefghijklmnopqrstuvwxyz';

  static random(blockLength = 4) {
    let code = '';

    for (let i = 0; i < blockLength; i++) {
      code += this._numChars.charAt(
        Math.floor(Math.random() * this._numChars.length),
      );
      code += this._upCaseChars.charAt(
        Math.floor(Math.random() * this._upCaseChars.length),
      );
      code += this._lowerCaseChars.charAt(
        Math.floor(Math.random() * this._upCaseChars.length),
      );
    }

    return code;
  }
}
