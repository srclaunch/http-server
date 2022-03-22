module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,ts,tsx}',
    '!**/node_modules/**',
    '!**/src/tests/**',
    '!dist/**',
  ],
  coverageDirectory: 'coverage',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/cypress/'],
};
