import { Token } from './types';

export function tokenizer(input: string): Token[] {
  let cursorPos = 0;

  const tokens: Token[] = [];

  while (cursorPos < input.length) {
    let char = input[cursorPos]!;

    if (/\s/.test(char)) {
      cursorPos++; continue;
    }

    if (char === '(') {
      tokens.push({ type: 'OpenParenToken' });
      cursorPos++; continue;
    }

    if (char === ')') {
      tokens.push({ type: 'CloseParenToken' });
      cursorPos++; continue;
    }

    if (char === '+') {
      tokens.push({ type: 'PlusToken' });
      cursorPos++; continue;
    }

    if (char === '-') {
      tokens.push({ type: 'MinusToken' });
      cursorPos++; continue;
    }

    const NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = '';
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++cursorPos]!;
      }
      tokens.push({ type: 'NumericLiteral', value: +value });
      continue;
    }

    const LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = '';
      while (LETTERS.test(char)) {
        value += char;
        char = input[++cursorPos]!;
      }
      tokens.push({ type: 'Identifier', value });
      continue;
    }

    throw new SyntaxError(`Kya kar rha hai tu??...Unexpected token: "${char}"`);
  }

  return tokens;
}