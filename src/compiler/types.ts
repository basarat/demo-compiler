export type Token =
  | { type: 'Identifier', value: string }
  | { type: 'OpenParenToken' }
  | { type: 'CloseParenToken' }
  | { type: 'NumericLiteral', value: number }
  | { type: 'PlusToken' }


export type Node =
  | { type: 'CallExpression' }
  | { type: 'BinaryExpression' }