export type IdentifierToken = { type: 'Identifier', value: string }
export type OpenParenToken = { type: 'OpenParenToken' }
export type CloseParenToken = { type: 'CloseParenToken' }
export type NumericLiteralToken = { type: 'NumericLiteral', value: string }
export type PlusToken = { type: 'PlusToken' }
export type MinusToken = { type: 'MinusToken' }

export type Token =
  | IdentifierToken
  | OpenParenToken
  | CloseParenToken
  | NumericLiteralToken
  | PlusToken
  | MinusToken

export type AdditiveOperator = PlusToken | MinusToken;

export type NumericLiteralNode = { type: 'NumericLiteral', value: string }
export type CallExpressionNode = { type: 'CallExpression', identifier: IdentifierToken, argument: Node }
export type BinaryExpressionNode = { type: 'BinaryExpression', left: Node, right: Node, operator: AdditiveOperator }

export type Node =
  | NumericLiteralNode
  | CallExpressionNode
  | BinaryExpressionNode

export type Program = {
  body: Node[]
}