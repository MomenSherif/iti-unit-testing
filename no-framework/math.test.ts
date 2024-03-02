// const { sum, subtract, sumAsync, subtractAsync } = require('./math');
import { sum, subtract, sumAsync, subtractAsync } from './math';

test('async sum adds numbers asynchronously', async () => {
  const result = await sumAsync(3, 7);
  const expected = 10;
  expect(result).toBe(expected);
});

test('async subtract subtract numbers asynchronously', async () => {
  const result = await subtractAsync(7, 3);
  const expected = 4;
  expect(result).toBe(expected);
});
