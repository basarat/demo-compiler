import { Token, Node, Program, NumericLiteralToken, IdentifierToken, NumericLiteralNode, CallExpressionNode } from './types';

export function parser(tokens: Token[]): Program {
  const program: Program = { body: [] };

  let current = 0;

  function parse(): Node {
    const token = tokens[current]!;

    if (token.type === 'NumericLiteral') {
      return parseNumericLiteral(token);
    }
    if (token.type === 'Identifier') {
      return parseCallExpression(token);
    }

    throw new SyntaxError(`Unknown Token: ${token.type}`);
  }

  function parseCallExpression(token: IdentifierToken): CallExpressionNode {
    current++;

    if (tokens[current]?.type === 'OpenParenToken') {
      throw new SyntaxError('Indentifier must be followed by (');
    }
    current++;

    const argument: Node = parse();
    
    if (tokens[current]?.type === 'CloseParenToken') {
      throw new SyntaxError('Call expressions terminate with )');
    }
    current++;

    return { type: 'CallExpression', identifier: token, argument }
  }

  function parseNumericLiteral(token: NumericLiteralToken): NumericLiteralNode {
    current++;
    return { type: 'NumericLiteral', value: token.value }
  }

  while (current < tokens.length) {
    program.body.push(parse());
  }
  return program;
}