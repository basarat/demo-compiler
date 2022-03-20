import { emitter } from './emitter';
import { parser } from './parser';
import { tokenizer } from './tokenizer';
test('it should pass', () => {
  expect(emitter(parser(tokenizer('log(1+3-4)')))).toMatchSnapshot();
});
