module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/migration/**",
    "!**/dist/**"
  ],
  verbose: true,
  transform: {
    "^^.+\\.tsx?$": "ts-jest"
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/jest/"],
  testRegex: "/__tests__/.*.test.(js|ts|tsx)?$",
  moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
  globalSetup: "./jest/globalSetup.js",
  globalTeardown: "./jest/globalTeardown.js",
  coverageReporters: ["lcov", "html"],
  testEnvironment: "node"
};
