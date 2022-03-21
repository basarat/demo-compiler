import {
  AdditiveOperator, BinaryExpressionNode,
  CallExpressionNode, IdentifierToken, Node, NumericLiteralNode,
  NumericLiteralToken, Program, Token
} from './types';

export function parser(tokens: Token[]): Program {
  const program: Program = { body: [] };

  let current = 0;

  function parse(): Node {
    const token = tokens[current]!;

    if (token.type === 'Identifier') {
      return parseCallExpression(token);
    }

    if (token.type === 'NumericLiteral') {
      const next = tokens[current + 1];
      if (next?.type === 'PlusToken' || next?.type === 'MinusToken') {
        return parseBinaryExpression(token, next);
      } else {
        return parseNumericLiteral(token);
      }
    }

    throw new SyntaxError(`Unknown Token: ${token.type}`);
  }

  function parseCallExpression(token: IdentifierToken): CallExpressionNode {
    const identifier = token;
    current++;

    if (tokens[current]?.type !== 'OpenParenToken') {
      throw new SyntaxError('Indentifier must be followed by (');
    }
    current++;

    const argument: Node = parse();

    if (tokens[current]?.type !== 'CloseParenToken') {
      throw new SyntaxError('Call expressions terminate with )');
    }
    current++;

    return { type: 'CallExpression', identifier, argument }
  }

  function parseNumericLiteral(token: NumericLiteralToken): NumericLiteralNode {
    current++;
    return { type: 'NumericLiteral', value: token.value }
  }

  function parseBinaryExpression(token: NumericLiteralToken, next: AdditiveOperator): BinaryExpressionNode {
    const left = parseNumericLiteral(token);

    const operator = next;
    current++;

    const right = parse();
    return { type: 'BinaryExpression', left, operator, right };
  }

  while (current < tokens.length) {
    program.body.push(parse());
  }
  return program;
}