module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for TypeScript files
  },
  globals: { TextEncoder: TextEncoder, TextDecoder: TextDecoder },
  moduleNameMapper: {
    "^@redux/(.*)$": "<rootDir>/src/redux/$1",
  }
  
  
  // other Jest settings
};