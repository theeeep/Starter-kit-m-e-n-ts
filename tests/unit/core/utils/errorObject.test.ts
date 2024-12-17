import errorObject from '../../../../src/core/utils/errorObject';
import { createMockRequest } from '../../../helpers/testUtils';

jest.mock('../../../../src/core/config/config', () => ({
  ENV: 'development',
}));

describe('ErrorObject', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.mock('../../../../src/core/config/config', () => ({
      ENV: 'development',
    }));
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should create an error object with default status code', () => {
    // Arrange
    const req = createMockRequest();
    const error = new Error('Test error');

    // Act
    const result = errorObject(error, req);

    // Assert
    expect(result).toMatchObject({
      success: false,
      statusCode: 500,
      message: error.message,
      data: null,
      request: {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
      },
      stack: expect.any(String),
    });
  });

  it('should create an error object with custom status code', () => {
    // Arrange
    const req = createMockRequest();
    const error = new Error('Test error');
    const statusCode = 400;

    // Act
    const result = errorObject(error, req, statusCode);

    // Assert
    expect(result).toMatchObject({
      success: false,
      statusCode,
      message: error.message,
      data: null,
      request: {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
      },
      stack: expect.any(String),
    });
  });

  it('should handle non-Error objects', () => {
    // Arrange
    const req = createMockRequest();
    const error = { message: 'Test error' };

    // Act
    const result = errorObject(error, req);

    // Assert
    expect(result).toMatchObject({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
      data: null,
      request: {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
      },
    });
  });

  it('should hide stack trace in production', () => {
    // Arrange
    jest.resetModules();
    jest.mock('../../../../src/core/config/config', () => ({
      ENV: 'production',
    }));

    // Re-import with production config
    const errorObjectProd = require('../../../../src/core/utils/errorObject').default;

    const req = createMockRequest();
    const error = new Error('Test error');

    // Act
    const result = errorObjectProd(error, req);

    // Assert
    expect(result.stack).toBeUndefined();
    expect(result).toMatchObject({
      success: false,
      statusCode: 500,
      message: error.message,
      data: null,
      request: {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
      },
    });
  });
});
