module.exports = {
  clearMocks: true,
  collectCoverage: true,
  testEnvironment: "node",
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
  ],
  coverageProvider: "v8",
  moduleNameMapper: {
  },
  testMatch: [
    "<rootDir>/src/**/*.(test|spec).ts"
  ],
  testPathIgnorePatterns: [
    "/node_modules/"
  ]
};