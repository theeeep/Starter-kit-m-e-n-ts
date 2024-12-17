import { HealthController } from '../../../../src/modules/health/controllers/healthController';

describe('HealthController', () => {
  describe('check', () => {
    it('should return health status', async () => {
      const controller = new HealthController();
      const response = await controller.check();

      expect(response).toHaveProperty('status', 'ok');
      expect(response).toHaveProperty('timestamp');
      expect(response).toHaveProperty('version');
      expect(response).toHaveProperty('uptime');
      expect(response).toHaveProperty('memory');
      expect(response.memory).toHaveProperty('used');
      expect(response.memory).toHaveProperty('total');

      expect(Date.parse(response.timestamp)).not.toBeNaN();
    });
  });
});
