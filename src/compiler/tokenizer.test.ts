import { tokenizer } from './tokenizer';
test('it should pass', () => {
  expect(tokenizer('log(1+3-4)')).toMatchSnapshot();
});
