const { jest: jestConfig } = require('kcd-scripts/config');

module.exports = Object.assign(jestConfig, {
  coveragePathIgnorePatterns: ['src/index.d.ts'],
  coverageThreshold: {
    global: {
      statements: 8,
      branches: 8,
      functions: 8,
      lines: 8,
    },
  },
  testEnvironment: 'node',
});
