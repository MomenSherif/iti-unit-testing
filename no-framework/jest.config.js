/** @type {import('jest').Config} */
export default {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./testSetup.js'],
};
