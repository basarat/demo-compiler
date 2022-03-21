import { emitter } from './emitter';
import { parser } from './parser';
import { tokenizer } from './tokenizer';

export function compiler(input: string): string {
  const tokens = tokenizer(input);
  const ast = parser(tokens);
  const output = emitter(ast);

  return output;
}
