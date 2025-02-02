export default class RomanNumeralService {
  private readonly numeralTable: [string, number][] = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1],
  ];

  public convertToRoman(num: number): string {
    if (num < 1 || num > 3999) {
      throw new Error('Number must be between 1 and 3999.');
    }

    let result = '';
    let tempNum = num;

    for (const [text, value] of this.numeralTable) {
      const count = Math.floor(tempNum / value);
      if (count > 0) {
        result += text.repeat(count);
        tempNum -= value * count;
      }
    }

    return result;
  }
}
