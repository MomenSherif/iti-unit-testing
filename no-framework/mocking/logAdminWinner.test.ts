import { logAdminWinner } from './logAdminWinner';
import { getWinner } from './utils';

// jest.mock('./utils.ts', () => ({
//   // getWinner: jest.fn().mockReturnValue(2),
//   getWinner: jest.fn((a, b) => a),
// }));

jest.mock('./utils.ts');

afterEach(() => {
  // jest.clearAllMocks();
  jest.restoreAllMocks();
});

test('Logs the winner admin', () => {
  const consoleLogSpy = jest.spyOn(console, 'log');
  logAdminWinner();

  expect(consoleLogSpy).toHaveReturnedTimes(1);
  expect(consoleLogSpy).toHaveReturnedTimes(1);
  expect(consoleLogSpy).toHaveBeenCalledWith('The winner admin is Safwat 🚀');

  // consoleLogSpy.mockRestore();
});

test('blabla', () => {
  const consoleLogSpy = jest.spyOn(console, 'log');
  logAdminWinner();
  expect(consoleLogSpy).toHaveBeenCalledTimes(1);
  // consoleLogSpy.mockRestore();
});

test('second admin win', () => {
  // change mocking implementation
  // jest.spyOn(console, 'log');

  jest.mocked(getWinner).mockImplementationOnce((a, b) => b);
  logAdminWinner();

  // expect(console.log).toHaveBeenCalledWith("The winner admin is Mo'men 🚀");
});
