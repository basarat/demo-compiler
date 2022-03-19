export type Token =
  | { type: 'Identifier', value: string }
  | { type: 'OpenParenToken' }
  | { type: 'CloseParenToken' }
  | { type: 'NumericLiteral', value: number }
  | { type: 'PlusToken' }
  | { type: 'MinusToken' }


export type Node =
  | { type: 'NumericLiteral', value: number }
  | { type: 'CallExpression' }
  | { type: 'BinaryExpression', left: Node, right: Node, operatorToken: Token }