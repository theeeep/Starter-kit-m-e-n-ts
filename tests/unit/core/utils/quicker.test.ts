import * as os from 'node:os';
import quicker from '../../../../src/core/utils/quicker';

// Mock the entire os module
jest.mock('node:os', () => ({
  totalmem: jest.fn(),
  freemem: jest.fn(),
  loadavg: jest.fn(),
  uptime: jest.fn(),
}));

describe('Quicker Utils', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    // Setup default mock values
    jest.mocked(os.totalmem).mockReturnValue(16000000000); // 16GB
    jest.mocked(os.freemem).mockReturnValue(8000000000); // 8GB
    jest.mocked(os.loadavg).mockReturnValue([1.5, 1.2, 1.0]);
    jest.mocked(os.uptime).mockReturnValue(3600); // 1 hour
  });

  describe('getSystemHealth', () => {
    it('should return system health information', () => {
      // Act
      const result = quicker.getSystemHealth();

      // Assert
      expect(result).toMatchObject({
        totalMemory: expect.stringMatching(/MB$/),
        freeMemory: expect.stringMatching(/MB$/),
      });

      // Verify CPU usage array
      expect(Array.isArray(result.cpuUsage)).toBe(true);
      expect(result.cpuUsage).toHaveLength(3);

      for (const usage of result.cpuUsage) {
        expect(typeof usage).toBe('number');
        expect(usage).toBeGreaterThanOrEqual(0);
      }

      // Verify memory values
      expect(result.totalMemory).toMatch(/^\d+(\.\d+)?\sMB$/);
      expect(result.freeMemory).toMatch(/^\d+(\.\d+)?\sMB$/);
    });
  });

  describe('getApplicationHealth', () => {
    it('should return application health information', () => {
      // Act
      const result = quicker.getApplicationHealth();

      // Assert
      expect(result).toMatchObject({
        environment: expect.any(String),
        memoryUsage: {
          heapTotal: expect.stringMatching(/MB$/),
          heapUsed: expect.stringMatching(/MB$/),
        },
        uptime: expect.stringMatching(/Second$/),
      });

      // Verify memory values
      expect(result.memoryUsage.heapTotal).toMatch(/^\d+(\.\d+)?\sMB$/);
      expect(result.memoryUsage.heapUsed).toMatch(/^\d+(\.\d+)?\sMB$/);
      expect(result.uptime).toMatch(/^\d+(\.\d+)?\sSecond$/);
    });
  });
});
