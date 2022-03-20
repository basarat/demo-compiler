import { BinaryExpressionNode, CallExpressionNode, NumericLiteralNode, Program, Node } from './types';

export function emitter(program: Program): string {
  function emit(node: Node): string {
    if (node.type === 'NumericLiteral') {
      return emitNumericLiteral(node);
    } else if (node.type === 'BinaryExpression') {
      return emitBinaryExpression(node);
    } else if (node.type === 'CallExpression') {
      return emitCallExpression(node);
    } else {
      throw new SyntaxError('Unknown Node');
    }
  }

  function emitNumericLiteral(node: NumericLiteralNode) {
    return node.value;
  }

  function emitBinaryExpression(node: BinaryExpressionNode) {
    return `${emit(node.left)} ${node.operator.type === 'PlusToken' ? '+' : '-'} ${emit(node.right)}`;
  }

  function emitCallExpression(node: CallExpressionNode) {
    if (node.identifier.value === 'log') {
      return `console.log(${emit(node.argument)})`;
    } else {
      throw new SyntaxError(`Unknown Identifier in call expression: ${node.identifier}`);
    }
  }

  const output: string[] = [];
  for (const node of program.body) {
    output.push(emit(node));
  }
  return output.join('\n');
}