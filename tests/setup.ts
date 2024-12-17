import dotenvFlow from 'dotenv-flow';

// Mock MongoDB connection
jest.mock('../src/core/services/dbService', () => ({
  __esModule: true,
  default: {
    connect: jest.fn().mockResolvedValue({
      connection: {
        name: 'test-db',
      },
    }),
  },
}));

// Mock logger to prevent actual logging during tests
jest.mock('../src/core/utils/logger', () => ({
  __esModule: true,
  default: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));

// Load environment variables for test environment
dotenvFlow.config({
  node_env: 'test',
  default_node_env: 'test',
});

// Global test timeout
jest.setTimeout(30000);

// Clear all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});

// Cleanup after all tests
afterAll((done) => {
  done();
});
