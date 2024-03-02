import { getWinner, last } from './utils';

describe('last', () => {
  const persons = ['p1', 'p2', 'p3', 'p4', 'p5'];

  test('should run the callback with last element in the array', () => {
    // let result;
    // last(persons, p => {
    //   result = p;
    // });
    // expect(result).toBe('p5');

    // const mockFn = jest.fn((a: number, b: number) => a + b);
    // console.log(mockFn(1, 2));
    // console.log(mockFn.mock);

    const mockFn = jest.fn();
    last(persons, mockFn);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('p5');
  });
});

describe.only('getWinner', () => {
  // without mocking
  //   expect(getWinner("Mo'men", 'Safwat')).toBe(`Safwat`);

  // test('should return name one of the players', () => {
  //   const originalMathRandom = Math.random;
  //   Math.random = jest.fn(() => 1);

  //   expect(getWinner("Mo'men", 'Safwat')).toBe(`Safwat`);

  //   Math.random = originalMathRandom;
  // });

  // test('bla bla', () => {
  //   console.log(Math.random());
  // });

  test('should return name one of the players', () => {
    // const spy = jest.spyOn(Math, 'random').mockReturnValue(0);
    const spy = jest
      .spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0);

    expect(getWinner("Mo'men", 'Safwat')).toBe(`Mo'men`);
    expect(spy).toHaveBeenCalled();
    // spy.mockRestore();
  });

  test('bla bla', () => {
    console.log(Math.random());
  });
});
