module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/migration/**",
    "!**/dist/**",
    "!**/jest/**"
  ],
  verbose: true,
  transform: {
    "^^.+\\.tsx?$": "ts-jest"
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/jest/"],
  testRegex: "/__tests__/.*.test.(js|ts|tsx)?$",
  moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
  globals: {
    "ts-jest": {
      tsConfig: "./tsconfig.json"
    }
  },
  globalSetup: "./src/jest/globalSetup.js",
  globalTeardown: "./src/jest/globalTeardown.js",
  coverageReporters: ["lcov", "html"],
  testEnvironment: "node"
};
