import { emitter } from './emitter';
import { interpreter } from './interpreter';
import { parser } from './parser';
import { tokenizer } from './tokenizer';

export function compile(input: string): string {
  const tokens = tokenizer(input);
  const ast = parser(tokens);
  const output = emitter(ast);

  return output;
}

export function run(input: string): any {
  const output = compile(input);
  return interpreter(output);
}
