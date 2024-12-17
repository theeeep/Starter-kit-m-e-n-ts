import {
  createMockNext,
  createMockRequest,
  createMockResponse,
  mockLogger,
} from '../../helpers/testUtils';

describe('Test Utils', () => {
  describe('createMockRequest', () => {
    it('should create a mock request with default values', () => {
      const req = createMockRequest();
      expect(req.ip).toBe('127.0.0.1');
      expect(req.method).toBe('GET');
      expect(req.originalUrl).toBe('/api/v1/test');
      expect(req.headers).toEqual({});
      expect(req.body).toEqual({});
      expect(req.params).toEqual({});
      expect(req.query).toEqual({});
    });

    it('should create a mock request with overrides', () => {
      const overrides = {
        ip: '192.168.1.1',
        method: 'POST',
        originalUrl: '/api/v2/test',
        headers: { 'content-type': 'application/json' },
        body: { test: 'data' },
        params: { id: '123' },
        query: { filter: 'active' },
      };
      const req = createMockRequest(overrides);
      expect(req.ip).toBe('192.168.1.1');
      expect(req.method).toBe('POST');
      expect(req.originalUrl).toBe('/api/v2/test');
      expect(req.headers).toEqual({ 'content-type': 'application/json' });
      expect(req.body).toEqual({ test: 'data' });
      expect(req.params).toEqual({ id: '123' });
      expect(req.query).toEqual({ filter: 'active' });
    });

    it('should handle get header function', () => {
      const req = createMockRequest({
        headers: { 'content-type': 'application/json' },
      });
      expect(req.get('Content-Type')).toBe('application/json');
    });
  });

  describe('createMockResponse', () => {
    it('should create a mock response with all required methods', () => {
      const res = createMockResponse();
      expect(res.status).toBeDefined();
      expect(res.json).toBeDefined();
      expect(res.send).toBeDefined();
      expect(res.end).toBeDefined();
      expect(res.locals).toEqual({});
      expect(res.getHeader).toBeDefined();
      expect(res.setHeader).toBeDefined();
      expect(res.removeHeader).toBeDefined();
    });

    it('should chain response methods', () => {
      const res = createMockResponse();
      expect(res.status(200)).toBe(res);
      expect(res.json({ data: 'test' })).toBe(res);
      expect(res.send('test')).toBe(res);
      expect(res.end()).toBe(res);
    });
  });

  describe('createMockNext', () => {
    it('should create a mock next function', () => {
      const next = createMockNext();
      expect(typeof next).toBe('function');
      const error = new Error('test error');
      next(error);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('mockLogger', () => {
    it('should have all required logging methods', () => {
      expect(mockLogger.info).toBeDefined();
      expect(mockLogger.error).toBeDefined();
      expect(mockLogger.warn).toBeDefined();
      expect(mockLogger.debug).toBeDefined();
    });

    it('should be able to call logging methods', () => {
      const message = 'test message';
      const meta = { test: 'data' };

      mockLogger.info(message, meta);
      expect(mockLogger.info).toHaveBeenCalledWith(message, meta);

      mockLogger.error(message, meta);
      expect(mockLogger.error).toHaveBeenCalledWith(message, meta);

      mockLogger.warn(message, meta);
      expect(mockLogger.warn).toHaveBeenCalledWith(message, meta);

      mockLogger.debug(message, meta);
      expect(mockLogger.debug).toHaveBeenCalledWith(message, meta);
    });
  });
});
