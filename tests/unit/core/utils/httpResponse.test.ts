import httpResponse from '../../../../src/core/utils/httpResponse';
import { createMockRequest, createMockResponse } from '../../../helpers/testUtils';

jest.mock('../../../../src/core/config/config', () => ({
  ENV: 'development',
}));

describe('HttpResponse', () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    jest.resetModules();
    process.env.NODE_ENV = 'development';
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    jest.resetModules();
  });

  it('should send a success response with data', () => {
    // Arrange
    const req = createMockRequest();
    const res = createMockResponse();
    const statusCode = 200;
    const message = 'Success message';
    const data = { key: 'value' };

    // Act
    httpResponse(res, req, statusCode, message, data);

    // Assert
    expect(res.status).toHaveBeenCalledWith(statusCode);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      statusCode,
      message,
      data,
      request: {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
      },
    });
  });

  it('should send a success response without data', () => {
    // Arrange
    const req = createMockRequest();
    const res = createMockResponse();
    const statusCode = 200;
    const message = 'Success message';

    // Act
    httpResponse(res, req, statusCode, message);

    // Assert
    expect(res.status).toHaveBeenCalledWith(statusCode);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      statusCode,
      message,
      data: null,
      request: {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
      },
    });
  });

  it('should hide IP in production environment', () => {
    // Arrange
    jest.resetModules();
    jest.mock('../../../../src/core/config/config', () => ({
      ENV: 'production',
    }));
    const req = createMockRequest();
    const res = createMockResponse();
    const statusCode = 200;
    const message = 'Success message';

    // Re-import with mocked config
    const httpResponseProd = require('../../../../src/core/utils/httpResponse').default;

    // Act
    httpResponseProd(res, req, statusCode, message);

    // Assert
    expect(res.status).toHaveBeenCalledWith(statusCode);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      statusCode,
      message,
      data: null,
      request: {
        method: req.method,
        url: req.originalUrl,
        ip: null,
      },
    });
  });
});
