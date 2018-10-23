const { jest: jestConfig } = require('kcd-scripts/config');

module.exports = Object.assign(jestConfig, {
  coveragePathIgnorePatterns: ['src/index.d.ts'],
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
  testEnvironment: 'node',
});
