import { Token, Node, Program, NumericLiteralToken } from './types';

export function parser(tokens: Token[]): Program {
  const program: Program = { body: [] };

  let current = 0;

  function parse(): Node {
    const token = tokens[current]!;

    if (token.type === 'NumericLiteral') {
      return parseNumericLiteral(token);
    }

    throw new SyntaxError(`Unknown Token: ${token.type}`);
  }

  function parseCallExpression() {

  }

  function parseNumericLiteral(token: NumericLiteralToken): Node {
    current++;
    return { type: 'NumericLiteral', value: token.value }
  }

  while (current < tokens.length) {
    program.body.push(parse());
  }
  return program;
}