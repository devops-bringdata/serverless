module.exports = {
  roots: ["<rootDir>/tests"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/src/main/**"],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/tests/setEnvVars.js"],
  transform: {
    ".+\\.ts$": "ts-jest"
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/tests/$1",
    "@/(.*)": "<rootDir>/src/$1"
  }
}
