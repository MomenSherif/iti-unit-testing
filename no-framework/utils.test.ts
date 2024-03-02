import { fn1, fn2 } from './utils';

describe('function one group', () => {
  test('test one f1', () => {});
  test('test two f1', () => {});
});

describe('function two group', () => {
  test('test one f2', () => {});
});

describe('<Header />', () => {
  describe('when user authenticated', () => {
    test('blabla', () => {});
  });
  describe('when user not authenticated', () => {
    test('blabla', () => {});
  });
});
